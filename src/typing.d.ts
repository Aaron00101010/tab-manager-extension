export interface TabItem {
  name: string;
  url: string;
}

export interface TabGroup {
  id: string;
  name: string;
  tabs: TabItem[];
}

export type Theme = 'light' | 'dark' | 'system';
export type Lang = 'EN' | 'CN';

export interface StorageConfig {
  lang: Lang;
  theme: Theme;
  tabs: TabGroup[];
}

declare global {
  var broswer: typeof chrome;
}
