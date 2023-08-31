<template>
  <div class="cart-items #panier me-3">
    <a href="javascript:void(0)" class="main-btn">
      <i class="lni lni-heart"></i>
      <span class="total-items">{{ items_count }}</span>
    </a>
    <div class="shopping-item">
      <div class="dropdown-cart-header">
        <span>{{ items_count }} - {{ $t("Product") }}</span>
      </div>
      <ul class="shopping-list scroll-y scroll-tiny">
        <li v-for="(item, index) in wishlist" :key="index">
          <a
            href="javascript:void(0)"
            class="remove"
            title="Remove this item"
            @click="removeItem(String(item?.product_id))"
            ><i class="lni lni-close"></i
          ></a>
          <div class="cart-img-head">
            <a class="cart-img"><img :src="item?.detail.image_uri" alt="#" /></a>
          </div>
          <div class="content">
            <span>{{ item?.shop }}</span>
            <h4>
              <router-link class="text-truncate-2" :to="`/products/${item?.product_id}`">
                {{ item?.detail.name || item?.detail.id }}</router-link
              >
            </h4>
            <TextMoney :amount="Number(item?.detail.price)" currency="JPY" />
            <p class="text-danger">
              {{ item?.product_id ? "" : $t("Product not found") }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useWishlistStore } from "@/stores/wishlist";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import TextMoney from "@/components/TextMoney.vue";

export default defineComponent({
  components: { TextMoney },

  computed: {
    ...mapState(useWishlistStore, ["wishlist", "items_count"]),
  },

  methods: {
    removeItem(id: string) {
      useWishlistStore().removeWishlistItem(id);
    },
  },
});
</script>
