import type { StorageConfig, Lang, Theme } from '../typing';
import browser from 'webextension-polyfill';

export class BrowserExtension {
  STORAGE_KEY = 'STORAGE_CONFIG';
  config: StorageConfig = {
    lang: 'EN',
    theme: 'system',
    tabs: [],
  };
  constructor() {
    browser.storage.sync.get(this.STORAGE_KEY).then(config => {
      this.config = { ...this.config, ...config.key };
    });
  }
  setConfig(config: any) {
    browser.storage.sync.set({ [this.STORAGE_KEY]: config });
  }
  getConfig() {
    console.log();
  }
}

export const extension = new BrowserExtension();
