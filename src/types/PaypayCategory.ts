import type Language from "./Language";

export default interface PaypayCategory {
  id: string;
  name: string;
  icon: string;
  isWearCategory: boolean;
  purchaseProhibitedGenreUnder18: boolean;
  lang: Language | any;
}
