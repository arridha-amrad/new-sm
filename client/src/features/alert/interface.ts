export interface Alert {
  text: string;
  type: "success" | "error";
}

export interface AlertState {
  alert: Alert | null;
}
