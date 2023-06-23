import { Api } from "telegram";
import { Task } from "../interfaces.js";

interface GlobalState {
  startTime: number;
  progressMessage?: Api.Message;
  tasks: Map<string, Task>;
  progressDelay: number;
}
const globalState: GlobalState = {
  startTime: Date.now(),
  tasks: new Map(),
  progressDelay: 5000,
};

export default globalState;
