import { products } from "@/services/product";
import type Product from "@/types/Product";
import type WishItem from "@/types/WishItem";
import { defineStore } from "pinia";

export const useWishlistStore = defineStore({
  id: "wishlist",

  state: () => ({
    wishlist_local: [] as Array<WishItem>,
    product_items: [] as Array<Product>,
  }),

  getters: {
    product_ids_ikom: (state) => {
      const list = state.wishlist_local.filter((i) => i.shop == import.meta.env.VITE_APP_ORGANIZATION);
      return list.length ? list.map((i) => i.product_id) : [];
    },

    product_ids_all: (state) => {
      return state.wishlist_local.map((i) => i.product_id);
    },

    wishlist(state) {
      return state.wishlist_local.map((i) => {
        if (i.shop == import.meta.env.VITE_APP_ORGANIZATION) {
          const product = state.product_items.find((x) => x.id == i.product_id);
          return (
            product && {
              product_id: i.product_id,
              shop: i.shop,
              detail: {
                id: product.id,
                name: product.name,
                price: product.price,
                star: product.star,
                image_uri: product.image_url,
              },
            }
          );
        } else return i;
      });
    },

    items_count(): number {
      return this.wishlist.length;
    },
  },
  actions: {
    fetchWishlist() {
      if (import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST in localStorage) {
        this.wishlist_local = JSON.parse(String(localStorage.getItem(import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST)));
        this.product_ids_ikom.length && this.fetchProductItems();
      }
    },

    fetchProductItems(page = 1) {
      return new Promise((resolve, reject) => {
        products
          .all({
            [`filter[id]`]: String(this.product_ids_ikom),
            page,
          })
          .then(({ data }) => {
            this.product_items.push(...data.data);
            if (data.current_page < data.last_page) {
              this.fetchProductItems(data.current_page + 1);
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    fetchProductItem(product_id: string) {
      return new Promise((resolve, reject) => {
        products
          .get(product_id)
          .then(({ data }) => {
            if (!this.product_items.find((product_item) => product_item.id === data.id)) {
              this.product_items.push(data);
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    addProductToWishlist(product_id: string, shop: string, detail?: any) {
      if (!this.product_ids_ikom.includes(product_id)) {
        this.wishlist_local.push({
          product_id: product_id,
          shop: shop,
          detail: detail,
        });

        localStorage.setItem(import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST, JSON.stringify(this.wishlist_local));
        !detail && this.fetchProductItem(product_id);
      }
    },

    removeWishlistItem(product_id: string) {
      const filtered = this.wishlist_local.filter((wish_product) => {
        return wish_product.product_id != product_id;
      });

      this.wishlist_local = filtered;

      localStorage.setItem(import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST, JSON.stringify(this.wishlist_local));
      // this.product_items = this.wishlist.map((item) => {
      //   return item;
      // });
    },
  },
});
