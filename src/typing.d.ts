export interface TabItem {
  name: string;
  url: string;
}

export interface TabGroup {
  id: string;
  name: string;
  tabs: TabItem[];
}

declare global {
  interface Sortable {}
}
