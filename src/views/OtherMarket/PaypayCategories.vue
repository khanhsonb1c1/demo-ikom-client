<template>
  <div class="container mt-5 mb-5">
    <BannerCategory />
    <div class="paypay-categories">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <router-link :to="`/other-markets/shop/paypay?category_id=${item.id}`" class="shadow-sm rounded border">
            <h6 class="title text-truncate-1">
              <img :src="item.icon" alt="" class="me-3" />
              {{ getNameCategory(item.lang) }}
            </h6>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCategoryOtherMarketStore } from "@/stores/category_other_market";
import { mapState } from "pinia";
import { getActiveLocale } from "@/i18n/translation";
import BannerCategory from "./BannerCategory.vue";

export default defineComponent({
  components: { BannerCategory },
  computed: {
    ...mapState(useCategoryOtherMarketStore, ["list", "fetching"]),

    local() {
      return getActiveLocale() || "vi";
    },
  },
  created() {
    useCategoryOtherMarketStore().fetch("paypay");
  },
  methods: {
    getNameCategory(obj: any) {
      return obj[this.local];
    },
  },
});
</script>
