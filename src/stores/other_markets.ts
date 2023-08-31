import { fetchListOtherMarkets } from "@/services/ikom";
import type MarketCategory from "@/types/MarketCategory";
import { defineStore } from "pinia";

export const useOtherMarketStore = defineStore({
  id: "other_markets",
  state: () => ({
    list: [] as Array<MarketCategory>,
    fetching: false,
  }),
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchListOtherMarkets()
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
