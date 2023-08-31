import { defineStore } from "pinia";
import {
  fetchHardOffItems,
  fetchPaypayItems,
  fetchRakumaItems,
  fetchRakutenitems,
  fetchYahooItems,
  getHardOffDetailItem,
  getPaypayDetailItem,
  getRakumaDetailItem,
  getRakutenDetailItem,
  getYahooDetailItem,
  fetchMercariItems,
  getMercariDetailItem,
  fetchAmazonItems,
  getAmazonDetailItem,
} from "@/services/ikom";
import type ProductInListOtherMarket from "@/types/ProductInListOtherMarket";
import type ProductDetailOtherMarket from "@/types/ProductDetailOtherMarket";
import type SubCategoryOtherMarket from "@/types/SubCategoryOtherMarket";
import type PaginationOtherMarket from "@/types/PaginationItemsOtherMarket";

export const useProductOtherMarket = defineStore({
  id: "product_other_market",
  state: () => ({
    list: [] as Array<ProductInListOtherMarket>,
    fetching: false,
    detail: {} as ProductDetailOtherMarket,
    sub_categories: [] as Array<SubCategoryOtherMarket>,
    paginate: {} as PaginationOtherMarket,
  }),
  actions: {
    fetch(params?: object, name?: string) {
      switch (name) {
        case "paypay":
          return this.fetchPaypayList(params);
        case "rakuma":
          return this.fetchRakumaList(params);
        case "rakuten":
          return this.fetchRakutenList(params);
        case "mercari":
          return this.fetchMercariList(params);
        case "hardoff":
          return this.fetchHardOffList(params);
        case "yahoo-shopping":
          return this.fetchYahooList(params);
        case "amazon":
          return this.fetchAmazonList(params);
        default:
          return;
      }
    },

    get(id: string, name: string, append?: string) {
      switch (name) {
        case "paypay":
          return this.getPaypayDetail(id);
        case "rakuma":
          return this.getRakumaDetail(id);
        case "rakuten":
          return this.getRakutenDetail({ url: append });
        case "mercari":
          return this.getMercariDetail({ id });
        case "hardoff":
          return this.getHardOffDetail({ id });
        case "yahoo-shopping":
          return this.getYahooDetail({ id: id, shop_id: append });
        case "amazon":
          return this.getAmazonDetail({ id });
        default:
          return;
      }
    },

    handleUpdateState(data: any) {
      this.fetching = false;
      this.list = data.items;
      this.sub_categories = data.sub_categories;
      this.paginate = data.pagination;
    },

    // Paypay

    fetchPaypayList(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchPaypayItems(params)
          .then(({ data }) => {
            this.handleUpdateState(data);
            resolve(data.items);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    getPaypayDetail(id: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getPaypayDetailItem({ id })
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    //Rakuma

    fetchRakumaList(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchRakumaItems(params)
          .then(({ data }) => {
            this.handleUpdateState(data);
            resolve(data.items);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    getRakumaDetail(id: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getRakumaDetailItem({ id: id })
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    // Rakuten

    fetchRakutenList(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchRakutenitems(params)
          .then(({ data }) => {
            this.handleUpdateState(data);
            resolve(data.items);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    getRakutenDetail(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getRakutenDetailItem(params)
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    // Yahoo

    fetchYahooList(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchYahooItems(params)
          .then(({ data }) => {
            this.handleUpdateState(data);
            resolve(data.items);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    getYahooDetail(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getYahooDetailItem(params)
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    // Hard off

    fetchHardOffList(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchHardOffItems(params)
          .then(({ data }) => {
            this.handleUpdateState(data);
            resolve(data.items);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    getHardOffDetail(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getHardOffDetailItem(params)
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    // Mercari
    fetchMercariList(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchMercariItems(params)
          .then(({ data }) => {
            this.handleUpdateState(data);
            resolve(data.items);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    getMercariDetail(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getMercariDetailItem(params)
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    // Amazon
    fetchAmazonList(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchAmazonItems(params)
          .then(({ data }) => {
            this.handleUpdateState(data);
            resolve(data.items);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },

    getAmazonDetail(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getAmazonDetailItem(params)
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
  },
});
