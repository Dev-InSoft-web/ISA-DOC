import type { ComponentColor } from "$lib/UlConst";

export const demoStatus: Record<string, ComponentColor> = {
   Button: "success",
   IconButton: "success",
   CheckboxIcon: "success",
   Switch: "success",
   Card: "success",
   BlockLayout: "danger",
   FlexLayout: "success",
   GridLayout: "success",
   OverlayModal: "success",
   OverlayActionDrawer: "success",
   OverlayLoading: "success",
   Iconify: "success",
   Spinner: "success",
   Text: "success",
   Headings: "success",
   Badge: "danger",
};

export function statusDotsFor(labels: string[]): ComponentColor[] {
   return labels.map((l) => demoStatus[l]).filter((c): c is ComponentColor => !!c);
}

export function statusDotFor(label: string): ComponentColor | undefined {
   return demoStatus[label];
}
