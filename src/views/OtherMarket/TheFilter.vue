<template>
  <div class="product-sidebar">
    <div class="single-widget search">
      <h3>{{ $t("Search product") }}</h3>
      <form @submit.prevent="handleSearch">
        <input type="text" :placeholder="search_placeholder" v-model="search" />
        <button type="submit">
          <i class="lni lni-search-alt"></i>
        </button>
      </form>
    </div>

    <div class="single-widget" v-if="sub_categories">
      <h3>
        {{ $t("Category") }}
        <TheLoading class="ms-1 mb-1" v-if="fetching" />
      </h3>
      <ul class="list">
        <li v-for="category in sub_categories" :key="category.id">
          <a href="#" @click="handleFiltercategory(category)">{{ category.name }}</a>
        </li>
      </ul>
    </div>
    <!-- !Filter by price -->
    <div class="single-widget condition">
      <h3>{{ $t("Filter by price") }}</h3>

      <div class="form-check" v-for="(price, index) in filter_list?.price" :key="index">
        <input
          class="form-check-input"
          type="checkbox"
          name="checkbox_price"
          :id="price.value"
          :checked="String(query.price) == price.value"
          @click="handleFilterCheckBox($event, price.value, 'price', 'checkbox_price')"
        />
        <label class="form-check-label" :for="price.value">
          {{ convertNameForLocal(price.lang) }}
        </label>
      </div>
    </div>
    <!-- !Filter by colors -->
    <div class="single-widget condition" v-if="filter_list?.colors">
      <h3>{{ $t("Filter by colors") }}</h3>

      <div class="form-group color-option">
        <div :class="getClassNameColor(color.value)" v-for="color in filter_list?.colors" :key="color.value">
          <input
            type="checkbox"
            :id="color.value"
            name="checkbox_color"
            :checked="String(query.color) == color.value"
            @click="handleFilterCheckBox($event, color.value, 'color', 'checkbox_color')"
          />
          <label :for="color.value"><span></span></label>
        </div>
      </div>
    </div>

    <!-- !Filter by status -->
    <div class="single-widget condition" v-if="filter_list?.status">
      <h3>{{ $t("Status") }}</h3>

      <div class="form-check" v-for="(status, index) in filter_list?.status" :key="index">
        <input
          class="form-check-input"
          type="checkbox"
          name="checkbox_status"
          :id="status.value"
          :checked="String(query.status) == status.value"
          @click="handleFilterCheckBox($event, status.value, 'status', 'checkbox_status')"
        />
        <label class="form-check-label" :for="status.value">
          {{ convertNameForLocal(status.lang) }}
        </label>
      </div>
    </div>
    <!-- !Filter by shipping fee -->
    <div class="single-widget condition" v-if="filter_list?.shipping">
      <h3>{{ $t("Shipping fee") }}</h3>

      <div class="form-check" v-for="(ship, index) in filter_list?.shipping" :key="index">
        <input
          class="form-check-input"
          type="checkbox"
          name="checkbox_status"
          :id="ship.value"
          :checked="String(query.ship) == ship.value"
          @click="handleFilterCheckBox($event, ship.value, 'shipping', 'checkbox_ship')"
        />
        <label class="form-check-label" :for="ship.value">
          {{ convertNameForLocal(ship.lang) }}
        </label>
      </div>
    </div>

    <!-- !Filter by reviews star -->
    <div class="single-widget condition" v-if="filter_list?.reviews">
      <h3>{{ $t("Review") }}</h3>
      <div
        class="reviews d-inline-flex w-100 pb-1"
        v-for="(star, index) in filter_list?.reviews"
        :key="index"
        @click="handleFilterReviewStar(star.value)"
      >
        <TheStar :star="star.view" />
        <div :class="[query?.reviews == star.value ? 'text-dark' : '', 'ms-3 cursor-pointer']">
          {{ convertNameForLocal(star.lang) }}
        </div>
      </div>
    </div>

    <!-- !Filter New arrivals ( amazon ) -->
    <div class="single-widget condition" v-if="filter_list?.new_arrivals">
      <h3>{{ $t("New arrivals") }}</h3>

      <div class="form-check" v-for="(ship, index) in filter_list?.new_arrivals" :key="index">
        <input
          class="form-check-input"
          type="checkbox"
          name="checkbox_new_arrivals"
          :id="ship.value"
          :checked="String(query.ship) == ship.value"
          @click="handleFilterCheckBox($event, ship.value, 'new_arrivals', 'checkbox_new_arrivals')"
        />
        <label class="form-check-label" :for="ship.value">
          {{ convertNameForLocal(ship.lang) }}
        </label>
      </div>
    </div>

    <!-- !Filter by discount -->
    <div class="single-widget condition" v-if="filter_list?.discount">
      <h3>{{ $t("Discount") }}</h3>
      <div class="form-check" v-for="(discount, index) in filter_list?.discount" :key="index">
        <input
          class="form-check-input"
          type="checkbox"
          name="checkbox_discount"
          :id="discount.value"
          :checked="String(query.discount) == discount.value"
          @click="handleFilterCheckBox($event, discount.value, 'discount', 'checkbox_discount')"
        />
        <label class="form-check-label" :for="discount.value">
          {{ convertNameForLocal(discount.lang) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useFilterAllOtherMarket } from "@/stores/filter_all_other_market";
import { useProductOtherMarket } from "@/stores/product_other_market";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { getActiveLocale } from "@/i18n/translation";
import TheStar from "@/components/TheStar.vue";

export default defineComponent({
  components: { TheStar },
  props: {
    search_placeholder: {
      type: String,
      default: "Search",
    },
  },
  data() {
    return {
      params: this.$route.params,
      search: "",
    };
  },

  created() {
    //
  },

  computed: {
    ...mapState(useProductOtherMarket, ["fetching", "sub_categories"]),
    filter_list() {
      const id = String(this.$route.params.id);
      const data: any = useFilterAllOtherMarket().list;
      return data[id];
    },
    local() {
      return getActiveLocale();
    },
    query() {
      return this.$route.query;
    },
    shop_id() {
      return this.$route.params.id;
    },
  },

  methods: {
    convertNameForLocal(value: any) {
      return this.local ? value[this.local] : value.en;
    },

    getClassNameColor(color: string) {
      return `single-checkbox checkbox-style-${color}`;
    },

    handleFiltercategory(category: { id: string; name: string }) {
      this.query.category_id = category.id;
    },
    handleSearch() {
      if (this.search) {
        this.$router.push({
          query: {
            // ...this.query,
            category_id: undefined,
            search: this.search,
          },
        });
      }
    },
    handleFilterCheckBox(checkbox: any, value: string, key: string, id: string) {
      if (checkbox.target.checked == true) {
        this.$router.push({
          query: {
            ...this.query,
            [key]: value,
          },
        });
      } else {
        this.$router.push({
          query: {
            ...this.query,
            [key]: undefined,
          },
        });
      }
      const checkboxes = document.getElementsByName(id);
      checkboxes.forEach((item: any) => {
        if (item !== checkbox.target) {
          item.checked = false;
        }
      });
    },

    handleFilterReviewStar(value: string) {
      if (this.query?.reviews != value) {
        this.$router.push({
          query: {
            ...this.query,
            reviews: value,
          },
        });
      } else {
        this.$router.push({
          query: {
            ...this.query,
            reviews: undefined,
          },
        });
      }
    },
  },
});
</script>
