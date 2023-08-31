<template>
  <TheSlider :ikom_content="content_ikom" />

  <Brands />

  <section class="trending-product section pt-3 bg-gray">
    <div class="container">
      <div class="market-category">
        <div class="title">
          <img src="/public/images/logo/logo-header.png" alt="#" />
          <RouterLink :to="`/products`">
            <span>{{ $t("View all") }} <i class="lni lni-arrow-right"></i></span>
          </RouterLink>
        </div>
        <TheStar :star="5" class="mt-1 ms-3" />
        <div class="text">{{ descriptionIkom || $t("Empty") }}</div>
        <div class="line-category bg-ikom"></div>
        <div class="row">
          <ProductCard
            v-for="(item, index) in list_top.trending"
            :key="index"
            :item="item"
            :fetching="fetching"
            custom="col-lg-3 col-md-6 col-12"
          />
        </div>
      </div>
      <div class="row"></div>
    </div>
  </section>

  <TopList :list_top="list_top" :fetching="fetching" />

  <BannerSale :ikom_content="content_ikom" />

  <OtherMarketCategories />

  <LatestNews />

  <ShippingService />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheSlider from "@/views/Home/TheSlider.vue";
// import CategoryItem from "./CategoryItem.vue";
import { mapState } from "pinia";
import { useCategoryStore } from "@/stores/categories";
import { useProductStore } from "@/stores/products";
import ProductCard from "@/views/Product/ProductCard.vue";
// import TitleTop from "./TitleTop.vue";
import BannerSale from "./BannerSale.vue";
import TopList from "./TopList.vue";
import Brands from "./Brands.vue";
import LatestNews from "./LatestNews.vue";
import ShippingService from "./ShippingService.vue";
// import SpecialOffer from "./SpecialOffer.vue";
import OtherMarketCategories from "./OtherMarketCategories.vue";
import { useContentIkom } from "@/stores/content_ikom";
import TheStar from "@/components/TheStar.vue";
import { getActiveLocale } from "@/i18n/translation";

export default defineComponent({
  components: {
    TheSlider,
    // CategoryItem,
    ProductCard,
    // TitleTop,
    BannerSale,
    TopList,
    Brands,
    LatestNews,
    ShippingService,
    // SpecialOffer,
    OtherMarketCategories,
    TheStar,
  },

  data() {
    return {
      include: "origin,categories,reviewsCount",
    };
  },

  computed: {
    ...mapState(useCategoryStore, { categories: "list" }),
    ...mapState(useProductStore, ["list_top", "fetching"]),

    featured_categories() {
      const x = JSON.parse(JSON.stringify(this.categories));
      return x.slice(0, 6);
    },

    trending() {
      if (this.list_top.trending.length) {
        return JSON.parse(JSON.stringify(useProductStore().list_top.trending)).slice(0, 8);
      } else {
        return 0;
      }
    },
    content_ikom() {
      return useContentIkom().content_ikom;
    },

    descriptionIkom() {
      if (Object.keys(this.content_ikom).length) {
        const content_ikom = JSON.parse(JSON.stringify(this.content_ikom));
        const language = getActiveLocale();
        return language ? content_ikom.description[language] : content_ikom.description.vi;
      } else return "";
    },
  },

  created() {
    if (Object.keys(this.list_top).length === 0) {
      useProductStore().fetchTopProductsForSale();
    }

    !Object.keys(this.content_ikom).length && useContentIkom().fetch();
  },
});
</script>
