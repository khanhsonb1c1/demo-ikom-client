<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center">
      <div class="logo-shop">
        <img :src="shop_banner_data?.image_uri" alt="" class="img" />
      </div>
    </div>
    <div class="banner-category d-flex justify-content-center">
      <img :src="shop_banner_data?.banner" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useOtherMarketStore } from "@/stores/other_markets";
import type MarketCategory from "@/types/MarketCategory";
export default defineComponent({
  computed: {
    shop_id() {
      const regex = /\/other-markets\/([^?]*)(?:\?|$)/;
      const match = String(this.$route.fullPath).match(regex);
      return match ? match[1] : "";
    },

    shop_list() {
      return useOtherMarketStore().list;
    },

    shop_banner_data() {
      const shops = JSON.parse(JSON.stringify(this.shop_list));
      return shops.find((i: MarketCategory) => i.path == this.shop_id);
    },
  },

  created() {
    !this.shop_list.length && useOtherMarketStore().fetch();
  },
});
</script>
