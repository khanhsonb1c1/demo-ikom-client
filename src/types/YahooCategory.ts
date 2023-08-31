import type Language from "./Language";

export default interface YahooCategory {
  id: string;
  name: string;
  parent_id: string;
  lang: Language;
}
