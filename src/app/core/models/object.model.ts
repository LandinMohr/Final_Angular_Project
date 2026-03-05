export interface InventoryObject {
  id?: string;
  name: string;
  data?: {
    color?: string;
    price?: number;
  } | null;
}