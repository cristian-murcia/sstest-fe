import { SweetAlertPosition } from "sweetalert2";

export interface ISweetAlert {
  icon: typeIconSweet,
  title: string,
  position?: SweetAlertPosition
}

export enum typeIconSweet {
  success = "success",
  error = "error"
}
