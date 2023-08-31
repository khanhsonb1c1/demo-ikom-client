<template>
  <section class="product-grids section paypay-product">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-12">
          <aside-bar>
            <TheFilter :search_placeholder="`${$t('Search with')} ${shop_id[0].toUpperCase() + shop_id.slice(1)}`" />
          </aside-bar>
        </div>
        <div class="col-lg-9 col-12">
          <div class="product-grids-head">
            <div class="product-grid-topbar">
              <div class="row align-items-center">
                <TheSlideOtherMarket />
                <TheBackButton title="Back to category" :path="`/other-markets/${shop_id}`" />

                <div class="product-sorting">
                  <label for="sorting">{{ $t("Sort by") }}:</label>
                  <select class="form-control" @change="handleSort">
                    <option v-for="(sort, index) in list_sort_by_route" :key="index" :value="sort.value">
                      {{ convertNameForLocal(sort.lang) }}
                    </option>
                  </select>
                  <TheLoading v-if="fetching" class="ms-3 mb-1" />
                </div>
                <div class="mt-3"></div>
              </div>
            </div>
            <div class="row">
              <TheProductCardOtherMarket
                v-for="item in list"
                :key="item.id"
                :item="item"
                :path="String(shop_id)"
                :shop_name="String(shop_name)"
              />
            </div>
            <TheBasicPagination @change-page="changePage" :paginate="paginate" v-if="list.length" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import AsideBar from "@/components/AsideBar.vue";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import TheLoading from "@/components/TheLoading.vue";
import { useProductOtherMarket } from "@/stores/product_other_market";
import TheBackButton from "@/components/TheBackButton.vue";
import TheProductCardOtherMarket from "./TheProductCardOtherMarket.vue";
import { useSortAllOtherMarket } from "@/stores/sort_all_other_market";
import { getActiveLocale } from "@/i18n/translation";
import TheFilter from "./TheFilter.vue";
import TheBasicPagination from "@/components/TheBasicPaginate.vue";
import TheSlideOtherMarket from "./TheSlideOtherMarket.vue";
import { useOtherMarketStore } from "@/stores/other_markets";
import { useFilterAllOtherMarket } from "@/stores/filter_all_other_market";

export default defineComponent({
  components: {
    AsideBar,
    TheBackButton,
    TheProductCardOtherMarket,
    TheFilter,
    TheLoading,
    TheBasicPagination,
    TheSlideOtherMarket,
  },

  data() {
    return {
      query: {
        page: this.$route.query?.page || 1,
        search: this.$route.query?.search || undefined,
        category_id: this.$route.query?.category_id || undefined,
        sort: undefined,
        price: undefined,
        color: undefined,
        status: undefined,
        shipping: undefined,
        reviews: undefined,
        discount: undefined,
        new_arrivals: undefined,
      },
      category_name: ("" as string) || undefined,
    };
  },

  computed: {
    sort_list() {
      return useSortAllOtherMarket().list;
    },

    shop_id() {
      return this.$route.params.id;
    },

    ...mapState(useProductOtherMarket, ["list", "fetching", "paginate"]),

    route() {
      return this.$route.query;
    },

    local() {
      return getActiveLocale();
    },

    list_sort_by_route() {
      return this.sort_list[String(this.shop_id)];
    },

    shop_list() {
      return useOtherMarketStore().list;
    },

    shop_name() {
      const shop = this.shop_list.find((i) => i.path === this.shop_id);
      return shop ? shop.name : this.shop_id;
    },
  },

  created() {
    this.fetch();
    !this.sort_list.length && useSortAllOtherMarket().fetch();
    !this.shop_list.length && useOtherMarketStore().fetch();
    !Object.keys(useFilterAllOtherMarket().list).length && useFilterAllOtherMarket().fetch();
  },

  watch: {
    route: {
      deep: true,
      handler(newValue) {
        this.query.page = newValue.page;
        this.query.search = newValue.search;
        this.query.category_id = newValue.category_id;
        this.query.sort = newValue.sort;
        this.query.price = newValue.price;
        this.query.color = newValue.color;
        this.query.status = newValue.status;
        this.query.shipping = newValue.shipping;

        this.fetch();
      },
    },
  },

  methods: {
    fetch() {
      if (this.$route.query.category_id || this.$route.query.search)
        useProductOtherMarket().fetch(this.query, String(this.shop_id));
    },

    convertNameForLocal(value: any) {
      return this.local ? value[this.local] : value.en;
    },

    changePage(page: number) {
      this.$router.push({
        query: {
          ...this.query,
          page: page,
        },
      });
    },

    handleSort(value: Event | any) {
      if (value.target.value) {
        this.$router.push({
          query: {
            ...this.query,
            sort: String(value.target.value),
          },
        });
      }
    },
  },
});
</script>
@/stores/other_markets