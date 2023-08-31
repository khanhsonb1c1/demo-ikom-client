import { fetchContentIkom } from "@/services/ikom";
import { defineStore } from "pinia";
import type IkomContent from "@/types/IkomContent";

export const useContentIkom = defineStore({
  id: "content-ikom",
  state: () => ({
    content_ikom: {} as IkomContent,
    fetching: false,
  }),

  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchContentIkom()
          .then(({ data }) => {
            this.content_ikom = data;
            this.fetching = false;
            resolve(data);
          })
          .catch((err) => {
            this.fetching = false;
            reject(err);
          });
      });
    },
  },
});
