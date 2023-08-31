import type Language from "./Language";

export default interface HardOffCategory {
  id: string;
  name: string;
  lang: Language;
  parent_id: string;
}
