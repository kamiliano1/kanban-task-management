import { atom } from "recoil";

export interface SettingsState {
  darkMode: boolean;
  isSidebarOpen: boolean;
  isLoaded: boolean;
  activeBoard: string;
  isBoardModalListOpen: boolean;
  activateColumn: number;
  activateTask: number;
  activateTaskName: string;
}

const defaultSettingsModalState: SettingsState = {
  darkMode: true,
  isSidebarOpen: true,
  isLoaded: false,
  activeBoard: "",
  isBoardModalListOpen: false,
  activateColumn: 0,
  activateTask: 0,
  activateTaskName: "",
};

export const settingsModalState = atom<SettingsState>({
  key: "settingModalState",
  default: defaultSettingsModalState,
});
