export type CatalogCategory =
  | "PHONE"
  | "LAPTOP"
  | "AUDIO"
  | "ENTERPRISE"
  | "GAMING_CONSOLE";

export interface CatalogModel {
  name: string;
  category: CatalogCategory | string;
  brand: string;
  model: string;
  spec: string;
  iqScore: number;
  highlightTag?: string;
  tacPrefixes?: string[]; // 8-digit TAC prefixes for IMEI auto-matching
  releaseYear?: number;
}
