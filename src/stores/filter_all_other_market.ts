import { fetchFilterList } from "@/services/ikom";
import type FilterAllOtherMarket from "@/types/FilterAllOtherMarket";
import { defineStore } from "pinia";

export const useFilterAllOtherMarket = defineStore({
  id: "filter_all_other_market",
  state: () => ({
    list: {} as FilterAllOtherMarket,
    fetching: false,
  }),
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchFilterList()
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
