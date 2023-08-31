import type Language from "./Language";

export default interface SortOtherMarket {
  paypay: Array<SortItem>;
  rakuma: Array<SortItem>;
  mercari: Array<SortItem>;
  rakuten: Array<SortItem>;
  "yahoo-shopping": Array<SortItem>;
  netmall: Array<SortItem>;
}

interface SortItem {
  name: string;
  key: string;
  value: any;
  lang: Language;
}
