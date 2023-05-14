import { atom } from "recoil";

export interface SettingsState {
  darkMode: boolean;
  isSidebarOpen: boolean;
}

const defaultSettingsState: SettingsState = {
  darkMode: true,
  isSidebarOpen: true,
};

export const settingsState = atom<SettingsState>({
  key: "settingState",
  default: defaultSettingsState,
});
