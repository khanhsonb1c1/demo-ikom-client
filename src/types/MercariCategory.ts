import type Language from "./Language";

export default interface MercariCategory {
  id: string;
  name: string;
  lang: Language;
  level: string;
  level0ParentId: string;
  level1ParentId: string;
  parent_id: string;
}
