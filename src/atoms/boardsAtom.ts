import { atom } from "recoil";
import { BoardType } from "../components/Board/BoardType";

export type BoardsAtom = BoardType[];

export const boardsState = atom<BoardsAtom>({
  key: "boardsState",
  default: [],
});
