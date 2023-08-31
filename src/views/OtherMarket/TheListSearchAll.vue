<template>
  <section class="product-grids section paypay-product">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-12">
          <div class="product-grids-head">
            <div class="product-grid-topbar">
              <div class="row align-items-center">
                <TheSlideOtherMarket />
                <div class="product-sorting">
                  <label for="sorting">{{ $t("Sort by") }}:</label>
                  <select name="" id="" class="form-control" v-model="sort">
                    <option v-for="(sort, index) in sort_field" :key="index" :value="sort.value">
                      {{ sort.name }}
                    </option>
                  </select>
                  <TheLoading v-if="loading" />
                </div>
                <div class="mt-3"></div>
              </div>
            </div>
            <div class="row">
              <TheProductCardOtherMarket
                v-for="item in list_render"
                :key="item.id"
                :item="item"
                :path="item.supplier_id"
                :shop_name="item.supplier_name"
                custom_class="col-lg-3 col-md-6 col-12"
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
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import TheProductCardOtherMarket from "./TheProductCardOtherMarket.vue";
import TheBasicPagination from "@/components/TheBasicPaginate.vue";
import TheSlideOtherMarket from "./TheSlideOtherMarket.vue";
import { fetchWithSearchAll } from "@/services/ikom";
import type ProductInListOtherMarket from "@/types/ProductInListOtherMarket";

interface Product extends ProductInListOtherMarket {
  supplier_name: string;
  supplier_id: string;
}

export default defineComponent({
  components: {
    TheProductCardOtherMarket,
    TheLoading,
    TheBasicPagination,
    TheSlideOtherMarket,
  },

  data() {
    return {
      list: [] as Array<Product>,
      loading: false,
      page_size: 30,
      sort: "price_asc",
      sort_field: [
        {
          name: "Price up",
          value: "price_asc",
        },
        {
          name: "Price down",
          value: "price_desc",
        },
      ],
    };
  },

  computed: {
    search() {
      return this.$route.query.search_name;
    },
    query() {
      return this.$route.query;
    },

    list_render() {
      let list: Array<Product> = JSON.parse(JSON.stringify(this.list));
      const page = this.query.page ? Number(this.query.page) : 1;
      if (this.$route.query.sort == "price_desc") {
        list = list.sort((a, b) => b.price - a.price);
      }
      if (this.$route.query.sort == "price_asc") {
        list = list.sort((a, b) => a.price - b.price);
      }
      const start_item = (page - 1) * this.page_size;
      const end_item = start_item + this.page_size;
      return list.slice(start_item, end_item);
    },

    paginate() {
      const total_page = Math.ceil(this.list.length / this.page_size);
      const page = this.query.page ? Number(this.query.page) : 1;

      return {
        is_allow_next: page < total_page ? true : false,
        page: page,
      };
    },
  },

  created() {
    this.fetch();
    this.query.sort && (this.sort = String(this.query.sort));
  },

  watch: {
    sort(newValue) {
      this.handleSort(newValue);
    },
  },

  methods: {
    fetch() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        fetchWithSearchAll({
          query: String(this.search),
        })
          .then(({ data }) => {
            this.list = data;
            this.loading = false;
            resolve(data);
          })
          .catch((error) => {
            this.loading = false;
            reject(error);
          });
      });
    },

    handleSort(sort: string) {
      this.$router.push({
        query: {
          ...this.query,
          sort: sort,
        },
      });
    },

    changePage(page: number) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.$router.push({
        query: {
          ...this.query,
          page: page,
        },
      });
    },
  },
});
</script>
