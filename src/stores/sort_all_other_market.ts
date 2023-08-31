import { fetchSortList } from "@/services/ikom";
import type SortOtherMarket from "@/types/SortOtherMarket";
import { defineStore } from "pinia";

export const useSortAllOtherMarket = defineStore({
  id: "sort_all_other_market",
  state: () => ({
    list: {} as SortOtherMarket | any,
    fetching: false,
  }),
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchSortList()
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
