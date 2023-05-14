import { atom } from "recoil";

export interface BoardMobileModalState {
  open: boolean;
}
const defaultBoardMobileModalState: BoardMobileModalState = {
  open: false,
};

export const boardMobileModalState = atom<BoardMobileModalState>({
  key: "boardMobileModalState",
  default: defaultBoardMobileModalState,
});
