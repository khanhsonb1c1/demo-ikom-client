<template>
  <div :class="custom_class">
    <div class="single-product product-other-market">
      <div class="product-image">
        <img :src="item.image_uri" alt="#" class="aspect-ratio" />
        <div class="button">
          <router-link
            :to="query ? `/other-markets/${path}/${item.id}?append=${query}` : `/other-markets/${path}/${item.id}`"
            class="btn"
            ><i class="lni lni-cart"></i>{{ $t("Buy now") }}</router-link
          >
        </div>
      </div>
      <div class="product-info">
        <h4 class="title">
          <router-link
            :to="query ? `/other-markets/${path}/${item.id}?append=${query}` : `/other-markets/${path}/${item.id}`"
            class="text-truncate-2"
          >
            {{ item.name }}
          </router-link>
        </h4>
        <TheStar :star="5" class="mt-1" />
        <div class="d-flex justify-content-between align-items-baseline">
          <TextMoney :amount="item.price" color="primary" currency="JPY" />
          <i
            :class="[is_in_wish_list ? 'text-danger' : '', 'lni lni-heart cursor-pointer fw-bold']"
            @click="handleWishlist"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextMoney from "@/components/TextMoney.vue";
import TheStar from "@/components/TheStar.vue";
import type ProductInListOtherMarket from "@/types/ProductInListOtherMarket";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  components: { TextMoney, TheStar },

  props: {
    item: {
      type: Object as () => ProductInListOtherMarket,
      default: {} as ProductInListOtherMarket,
    },
    path: {
      type: String,
      default: "",
      required: true,
    },
    shop_name: {
      type: String,
      default: "",
      required: false,
    },
    custom_class: {
      type: String,
      default: "col-lg-4 col-md-6 col-12",
      required: false,
    },
  },

  computed: {
    query() {
      return this.path == "rakuten"
        ? encodeURIComponent(String(this.item?.url))
        : this.path == "yahoo-shopping"
        ? this.item?.shop?.id
        : undefined;
    },
    is_in_wish_list() {
      return useWishlistStore().product_ids_all.includes(this.item.id);
    },
  },

  methods: {
    handleWishlist() {
      if (this.is_in_wish_list) {
        useWishlistStore().removeWishlistItem(this.item.id);
      } else {
        useWishlistStore().addProductToWishlist(this.item.id, this.shop_name, this.item);
      }
    },
  },
});
</script>
