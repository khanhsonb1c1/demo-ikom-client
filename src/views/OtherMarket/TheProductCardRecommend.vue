<template>
  <div class="col-lg-2 col-md-6 col-6">
    <div class="single-product product-recommend">
      <div class="product-image aspect-ratio">
        <router-link :to="`/other-markets/${name}/${item.id}`">
          <img :src="item.image_uri" alt="#" />
        </router-link>
      </div>
      <div class="product-info">
        <h4 class="title">
          <router-link :to="`/other-markets/${name}/${item.id}`" class="text-truncate-2">
            {{ item.name }}
          </router-link>
        </h4>
        <TextMoney :amount="item.price" color="primary" currency="JPY" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextMoney from "@/components/TextMoney.vue";
import type ProductItemRecommend from "@/types/ProductItemRecommend";

export default defineComponent({
  props: {
    item: {
      type: Object as () => ProductItemRecommend,
      default: {} as ProductItemRecommend,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
  },
  components: { TextMoney },
});
</script>
