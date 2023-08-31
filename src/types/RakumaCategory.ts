import type Language from "./Language";

export default interface RakumaCategory {
  has_origin_id: boolean;
  id: string;
  name: string;
  lang: Language;
  parent_id: string;
}
