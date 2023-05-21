import { atom } from "recoil";

export interface SettingsState {
  darkMode: boolean;
  isSidebarOpen: boolean;
  activeBoard: string;
}

const defaultSettingsModalState: SettingsState = {
  darkMode: true,
  isSidebarOpen: true,
  activeBoard: "",
};

export const settingsModalState = atom<SettingsState>({
  key: "settingModalState",
  default: defaultSettingsModalState,
});
