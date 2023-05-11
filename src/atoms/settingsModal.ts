import { atom } from "recoil";

export interface SettingsState {
  darkMode: boolean;
}

const defaultSettingsState: SettingsState = {
  darkMode: true,
};

export const settingsState = atom<SettingsState>({
  key: "settingState",
  default: defaultSettingsState,
});
