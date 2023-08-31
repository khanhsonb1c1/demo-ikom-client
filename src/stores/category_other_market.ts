import {
  fetchAmazonCategories,
  fetchHardOffCategories,
  fetchMercariCategories,
  fetchPaypayCategories,
  fetchRakumaCategories,
  fetchRakutenCategories,
  fetchYahooCategories,
} from "@/services/ikom";
import { defineStore } from "pinia";

export const useCategoryOtherMarketStore = defineStore({
  id: "category_other_market",
  state: () => ({
    list: [] as any,
    fetching: false,
  }),
  actions: {
    fetch(shop_id: string) {
      switch (shop_id) {
        case "amazon":
          return this.fetchCategoryAmazon();
        case "mercari":
          return this.fetchCategoryMercari();
        case "hardoff":
          return this.fetchCategoryHardoff();
        case "rakuma":
          return this.fetchCategoryRakuma();
        case "rakuten":
          return this.fetchCategoryRakuten();
        case "paypay":
          return this.fetchCategoryPaypay();
        case "yahoo-shopping":
          return this.fetchCategoryYahoo();
        default:
          return;
      }
    },

    fetchCategoryAmazon() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchAmazonCategories()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
    fetchCategoryPaypay() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchPaypayCategories()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
    fetchCategoryRakuma() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchRakumaCategories()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
    fetchCategoryRakuten() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchRakutenCategories()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
    fetchCategoryMercari() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchMercariCategories()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
    fetchCategoryHardoff() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchHardOffCategories()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
    fetchCategoryYahoo() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchYahooCategories()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
  },
});
