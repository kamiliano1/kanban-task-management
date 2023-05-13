import { atom } from "recoil";

export interface ModalState {
  open: boolean;
  view:
    | "viewTask"
    | "addTask"
    | "editTask"
    | "addBoard"
    | "editBoard"
    | "allBoardsMobile"
    | "deleteBoard"
    | "deleteTask"
    | "register"
    | "login";
}

const defaultModalState: ModalState = {
  open: false,
  view: "viewTask",
};

export const modalState = atom<ModalState>({
  key: "modalState",
  default: defaultModalState,
});
