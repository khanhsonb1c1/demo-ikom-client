<template>
  <div class="container mt-5 mb-5">
    <BannerCategory />
    <div class="paypay-categories">
      <ul>
        <li
          class="cursor-pointer"
          v-for="(item, index) in categories"
          :key="index"
          @click="handleChooseCategory(item.id)"
        >
          <a class="shadow-sm rounded border">
            <h6 class="title text-truncate-1">
              {{ getNameCategory(item.lang) }}
            </h6>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { getActiveLocale } from "@/i18n/translation";
import { useCategoryOtherMarketStore } from "@/stores/category_other_market";
import type HardOffCategory from "@/types/HardOffCategory";
import BannerCategory from "./BannerCategory.vue";

export default defineComponent({
  components: { BannerCategory },

  data() {
    return {
      category_id: this.$route.query.category_id,
    };
  },
  computed: {
    ...mapState(useCategoryOtherMarketStore, ["list", "fetching"]),
    local() {
      return getActiveLocale() || "vi";
    },
    categories() {
      if (this.list.length) {
        const list = JSON.parse(JSON.stringify(this.list));
        return this.category_id
          ? list.filter((item: HardOffCategory) => item.parent_id == this.category_id)
          : list.filter((item: HardOffCategory) => item.parent_id == undefined);
      } else return [];
    },
  },
  created() {
    useCategoryOtherMarketStore().fetch("hardoff");
  },
  watch: {
    "$route.query.category_id": {
      immediate: true,
      handler(newValue) {
        newValue ? (this.category_id = newValue) : (this.category_id = "");
      },
    },
  },
  methods: {
    getNameCategory(obj: any) {
      return obj[this.local];
    },
    handleChooseCategory(id: string) {
      this.category_id = id;
      if (this.categories.length) {
        this.$router.push({
          path: "/other-markets/shop/hardoff",
          query: { category_id: id },
        });
      } else {
        this.$router.push({
          path: "/other-markets/hardoff",
          query: {
            category_id: id,
          },
        });
      }
    },
  },
});
</script>
