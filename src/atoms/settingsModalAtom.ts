import { atom } from "recoil";

export interface SettingsState {
  darkMode: boolean;
  isSidebarOpen: boolean;
  activeBoard: string;
  activateColumn: number;
  activateTask: number;
  activateTaskName: string;
}

const defaultSettingsModalState: SettingsState = {
  darkMode: true,
  isSidebarOpen: true,
  activeBoard: "",
  activateColumn: 0,
  activateTask: 0,
  activateTaskName: "",
};

export const settingsModalState = atom<SettingsState>({
  key: "settingModalState",
  default: defaultSettingsModalState,
});
