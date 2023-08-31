<template>
  <div class="brands">
    <div class="container">
      <div class="brands-logo-wrapper">
        <div class="brands-logo-carousel d-flex align-items-center justify-content-between">
          <div class="brand-logo">
            <router-link :to="`/products`">
              <img :src="ikom_brand.image_uri || `https://via.placeholder.com/220x160`" alt="#" />
            </router-link>
          </div>
          <div class="brand-logo" v-for="(item, index) in other_branchs" :key="index">
            <router-link :to="`/other-markets/${item.path}`">
              <img :src="item.image_uri || `https://via.placeholder.com/220x160`" alt="#" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useOtherMarketStore } from "@/stores/other_markets";
import type MarketCategory from "@/types/MarketCategory";
import { defineComponent } from "vue";
import banner_ikom from "../../../public/images/logo/logo-header.png";

export default defineComponent({
  name: "brands-component",
  data() {
    return {
      list: [] as MarketCategory[],
      ikom_brand: {
        name: "IKOM",
        image_uri: banner_ikom,
      },
    };
  },
  computed: {
    other_branchs() {
      return useOtherMarketStore().list;
    },
  },
});
</script>
