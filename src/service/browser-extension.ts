import type { StorageConfig, Lang, Theme } from '../typing';

export class BrowserExtension {
  STORAGE_KEY = 'STORAGE_CONFIG';
  config: StorageConfig = {
    lang: 'EN',
    theme: 'system',
    tabs: [],
  };
  constructor() {
    broswer.storage.sync.get(this.STORAGE_KEY, config => {
      this.config = { ...this.config, ...config.key };
    });
  }
  setConfig(config: any) {
    broswer.storage.sync.set({ [this.STORAGE_KEY]: config }, () => {
      console.log(233);
    });
  }
  getConfig() {
    console.log();
  }
}

export const extension = new BrowserExtension();
