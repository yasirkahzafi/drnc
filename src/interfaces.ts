export interface Task {
  fileName: string;
  type: "prepare" | "download" | "upload";
  currentState: number;
  total: number;
}
