import { atom } from "recoil";
import { BoardType } from "../components/Board/BoardType";

export type BoardsAtom = BoardType[];

export const boardsState = atom<BoardsAtom>({
  key: "boardsState",
  default: [],
});

// export interface BoardType {
//   name: string;
//   id: string;
//   columns: ColumnType[];
// }

// export interface ColumnType {
//   name: string;
//   id: string;
//   tasks: TaskType[];
// }

// export interface TaskType {
//   title: string;
//   id: string;
//   description: string;
//   status: string;
//   subtask: SubtasksType[];
// }

// export interface SubtasksType {
//   title: string;
//   id: string;
//   isCompleted: boolean;
// }
