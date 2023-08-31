<template>
  <section class="product-grids section">
    <div class="container">
      <div class="tab-pane show active fade">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12" v-for="(item, index) in list" :key="index">
            <div class="market-category">
              <img class="banner" :src="item.banner" />

              <div class="title">
                <img :src="item.image_uri" alt="#" />
                <RouterLink :to="`/other-markets/${item.path}`">
                  <span>{{ $t("View all") }} <i class="lni lni-arrow-right"></i></span>
                </RouterLink>
              </div>
              <TheStar :star="item.star" class="mt-1" />
              <div class="text">{{ item.description }}</div>
              <div class="line-category" :style="getStyleItem(item.color)"></div>
              <div class="row">
                <TheProductCardOtherMarket
                  :item="product"
                  v-for="product in item.top_products"
                  :key="product.id"
                  :path="item.path"
                  :name="item.name"
                  custom_class="col-lg-3 col-md-6 col-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useOtherMarketStore } from "@/stores/other_markets";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import TheStar from "@/components/TheStar.vue";
import TheProductCardOtherMarket from "../OtherMarket/TheProductCardOtherMarket.vue";

export default defineComponent({
  components: {
    TheStar,
    TheProductCardOtherMarket,
  },

  created() {
    !this.list.length && useOtherMarketStore().fetch();
  },

  computed: {
    ...mapState(useOtherMarketStore, ["list", "fetching"]),
  },

  methods: {
    getStyleItem(color: string) {
      return `background: ${color}`;
    },
  },
});
</script>

<style scoped></style>
@/stores/other_markets