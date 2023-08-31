<template>
  <div class="other-market-carousel">
    <div :class="getClass('/products')">
      <RouterLink :to="`/products`" class="d-flex align-items-center">
        <img src="../../../public/images/logo/logo-ikom.png" alt="#" />
        <span class="ms-2 text-dark fw-bold">IKOM</span>
      </RouterLink>
    </div>
    <div :class="getClass(item.path)" v-for="item in list" :key="item.path">
      <RouterLink :to="`/other-markets/${item.path}`">
        <img :src="item.image_uri" alt="#" />
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useOtherMarketStore } from "@/stores/other_markets";

export default defineComponent({
  data() {
    return {};
  },

  created() {
    !this.list.length && useOtherMarketStore().fetch();
  },

  computed: {
    list() {
      return useOtherMarketStore().list;
    },
  },

  methods: {
    getClass(shop: string) {
      return this.$route.path == shop || this.$route.params.id == shop ? "item-carousel active" : "item-carousel";
    },
  },
});
</script>
@/stores/other_markets