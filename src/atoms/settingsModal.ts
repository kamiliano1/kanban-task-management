import { atom } from "recoil";

export interface SettingsState {
  darkMode: boolean;
  isSidebarOpen: boolean;
  activeBoard: string;
}

const defaultSettingsState: SettingsState = {
  darkMode: true,
  isSidebarOpen: true,
  activeBoard: "",
};

export const settingsState = atom<SettingsState>({
  key: "settingState",
  default: defaultSettingsState,
});
