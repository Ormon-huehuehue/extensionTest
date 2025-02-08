import { atom } from "recoil";

export type panel = 'Tasks' | 'Insights' | 'Connections';

export const panelStateAtom = atom<panel>({
  key: "panelState",
  default: "Tasks", 
});
