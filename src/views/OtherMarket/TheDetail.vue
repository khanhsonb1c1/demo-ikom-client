<template>
  <section class="item-details section item-detail-other-market">
    <div class="container">
      <div class="top-area">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-12">
            <div class="product-images">
              <main id="gallery">
                <div class="main-img position-relative">
                  <img
                    class="aspect-ratio-4-3"
                    :src="
                      detail?.item?.image_list.length
                        ? detail?.item?.image_list[0]
                        : 'https://via.placeholder.com/1000x670'
                    "
                    id="current"
                    alt="#"
                  />
                </div>

                <div class="images scroll-x scroll-hidden">
                  <img
                    v-for="(img, index) in detail?.item?.image_list"
                    :key="index"
                    :src="img || 'https://via.placeholder.com/1000x670'"
                    class="img aspect-ratio-4-3"
                    alt="#"
                    @click="handleClick"
                  />
                </div>
              </main>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-12">
            <div class="product-info">
              <TheLoading v-if="fetching" class="fs-4" />
              <h2 class="title line-clamp-2">
                {{ detail?.item?.name || "..." }}
              </h2>
              <div class="d-flex mb-1">
                <TheStar :star="5" />
              </div>
              <h3 class="price">
                <TextMoney :amount="detail?.item?.price" currency="JPY" />
              </h3>
              <RouterLink :to="`/other-markets/${shop}`" class="d-block mt-1 mb-2">
                <img class="logo-market" :src="market?.image_uri" />
              </RouterLink>
              <div class="d-flex mt-1 mb-2 flex-wrap">
                <TagProduct v-for="tag in detail?.item?.categories" :key="tag.id" :title="tag.name" />
              </div>

              <div class="border-top mt-3"></div>

              <div class="supplier" v-if="detail?.item?.shop?.id">
                <div class="col-lg-1 col-2">
                  <img :src="detail?.item?.shop?.image_uri" />
                </div>
                <div class="col-lg-11 col-10">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="ps-3">
                      <h6>{{ detail?.item?.shop?.name }}</h6>
                      <TheStar :star="detail?.item?.shop?.rate?.ratio" />
                    </div>
                    <div>
                      <i class="lni lni-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group quantity d-flex">
                    <span class="d-flex align-items-center col-3">{{ $t("Quantity") }}</span>
                    <button class="btn btn-link px-2 ms-4 me-2" @click="decrease">
                      <i class="lni lni-minus"></i>
                    </button>

                    <input
                      id="form1"
                      min="1"
                      name="quantity"
                      type="number"
                      class="form-control form-control-sm"
                      v-model="quantity"
                      onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                    />

                    <button class="btn btn-link px-2 ms-2" @click="increase">
                      <i class="lni lni-plus"></i>
                    </button>
                  </div>
                </div>
                <!-- <div class="col-lg-2 col-md-4 col-12"></div> -->
                <div class="col-lg-3 col-md-3 col-6 d-flex">
                  <div class="wish-button d-flex justify-content-end flex-column">
                    <button :class="[is_in_wish_list ? 'text-danger' : '', 'btn']" @click="handleWishlist()">
                      <i class="lni lni-heart"></i> {{ $t("To wishlist") }}
                    </button>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-6 d-flex">
                  <div class="wish-button d-flex justify-content-end flex-column">
                    <button class="btn btn-share" @click="handleCoppyLink()">
                      <i class="lni lni-share"></i>
                      {{ is_show_coppy_link ? $t("Coppied") : $t("Share") }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="bottom-content">
                <div class="row align-items-end">
                  <div class="col-lg-6 col-md-6 col-12 mt-2">
                    <div class="cart-button">
                      <button class="btn btn-danger w-100" @click="handleBuyNow">
                        {{ $t("Buy now") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-details-info">
        <div class="single-block">
          <div class="row">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="mb-3">{{ $t("Description") }}</h5>
              <TranslateSwitcher @update:lang="translate_to = $event" />
            </div>
            <p class="info-text text-dark" v-html="descriptionTranslate"></p>
          </div>
        </div>
      </div>
      <div class="product-details-info">
        <div class="single-block">
          <div class="row">
            <h4>{{ $t("Products recommend") }}</h4>
            <TheProductCardRecommend
              v-for="item in detail?.recommends"
              :key="item.id"
              :item="item"
              :name="String(shop)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useProductOtherMarket } from "@/stores/product_other_market";
import { defineComponent } from "vue";
import TagProduct from "@/views/Product/TagProduct.vue";
import TheStar from "@/components/TheStar.vue";
import TextMoney from "@/components/TextMoney.vue";
import { mapState } from "pinia";
import TheLoading from "@/components/TheLoading.vue";
import TheProductCardRecommend from "./TheProductCardRecommend.vue";
import { useWishlistStore } from "@/stores/wishlist";
import { useOtherMarketStore } from "@/stores/other_markets";
import translate from "@/helper/translate";
import TranslateSwitcher from "@/components/TranslateSwitcher.vue";

export default defineComponent({
  components: {
    TagProduct,
    TheStar,
    TextMoney,
    TheLoading,
    TheProductCardRecommend,
    TranslateSwitcher,
  },

  data() {
    return {
      quantity: 1,
      is_show_coppy_link: false,
      translate_to: "jp",
      descriptionTranslate: "",
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },

    shop() {
      return this.$route.params.shop;
    },

    ...mapState(useProductOtherMarket, ["detail", "fetching"]),

    is_in_wish_list() {
      return useWishlistStore().product_ids_all.includes(String(this.id));
    },

    market() {
      const shop_list = useOtherMarketStore().list;
      return shop_list.find((i) => i.path == this.shop);
    },

    product_url() {
      return this.$route.query.append;
    },
  },

  created() {
    this.fetch();
    !useOtherMarketStore().list.length && useOtherMarketStore().fetch();
  },

  watch: {
    "$route.params.id": {
      handler(newValue) {
        if (newValue && this.$route.params.shop) this.fetch();
      },
    },

    detail() {
      this.descriptionTranslate = this.detail?.item?.description_html;
    },

    translate_to: {
      async handler(newValue) {
        if (newValue == "vi") {
          this.descriptionTranslate = await translate(this.detail?.item?.description_text, "vi");
        } else {
          this.descriptionTranslate = this.detail?.item?.description_html;
        }
      },
    },
  },

  methods: {
    fetch() {
      const shopHasExceptionalParams = ["rakuten", "yahoo-shopping"];
      if (shopHasExceptionalParams.includes(String(this.shop))) {
        useProductOtherMarket().get(String(this.id), String(this.shop), String(this.product_url));
      } else useProductOtherMarket().get(String(this.id), String(this.shop));
    },
    handleBuyNow() {
      //
    },

    getProductCondition(list: Array<string>) {
      return list.toString().toUpperCase();
    },

    decrease() {
      this.quantity > 1 && this.quantity--;
    },

    increase() {
      this.quantity++;
    },
    handleClick() {
      const current = document.getElementById("current") as HTMLImageElement;
      const opacity = 0.6;
      const imgs = document.querySelectorAll(".img");

      imgs.forEach((img: Element) => {
        img.addEventListener("click", (e: Event) => {
          imgs.forEach((img: Element) => {
            (img as HTMLElement).style.opacity = "1";
          });
          current.src = (e.target as HTMLImageElement).src;
          (e.target as HTMLImageElement).style.opacity = opacity.toString();
        });
      });
    },

    handleWishlist() {
      if (this.is_in_wish_list) {
        useWishlistStore().removeWishlistItem(String(this.id));
      } else {
        const detailProduct = {
          id: this.detail.item.id,
          name: this.detail.item.name,
          price: this.detail.item.price,
          image_uri: this.detail.item.image_list[0],
        };
        useWishlistStore().addProductToWishlist(String(this.id), String(this.shop), detailProduct);
      }
    },

    handleCoppyLink() {
      const searchURL = window.location.href;
      navigator.clipboard.writeText(searchURL);
      this.is_show_coppy_link = true;
      setTimeout(() => {
        this.is_show_coppy_link = false;
      }, 2000);
    },
  },
});
</script>
