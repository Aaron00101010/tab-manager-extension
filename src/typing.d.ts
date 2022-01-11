export interface TabItem {
  name: string;
  url: string;
}

export interface TabGroup {
  name: string;
  tabs: TabItem[];
}
