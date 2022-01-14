export class BrowserExtension {
  constructor() {
    console.log(chrome);
  }
  getCurrentTabs() {
    console.log(chrome);
  }
}

export const extension = new BrowserExtension();
