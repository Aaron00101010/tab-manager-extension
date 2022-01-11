import { LitElement, html, css } from 'lit';
import { property, query, state, customElement } from 'lit/decorators.js';
import { ColorScheme } from './utils/color-scheme';
import type { TabGroup } from './typing';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-lumo-styles/sizing';
import './setting-sidebar';
import './tab-group-item';

enum ThemeClassName {
  dark = 'dark-theme',
  light = 'light-theme',
}

@customElement('tab-manager-extension')
export class TabManagerExtension extends LitElement {
  colorScheme: ColorScheme;

  constructor() {
    super();
    this.colorScheme = new ColorScheme(isDarkMode => {
      isDarkMode
        ? this.setAttribute('theme', 'dark')
        : this.removeAttribute('theme');
      this.requestUpdate();
    });
    if (this.colorScheme.isDark) {
      this.setAttribute('theme', 'dark');
    }
  }

  static styles = css`
    :host {
      font-family: 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system',
        'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial',
        'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', 'Noto Color Emoji';
    }
    :host {
      --gray-50: #f5f8fd;
      --gray-100: #f1f5fb;
      --gray-150: #eaf0f8;
      --gray-200: #e0e9f4;
      --gray-250: #d6e0ed;
      --gray-300: #bbc9dc;
      --gray-350: #a2b4cb;
      --gray-400: #8396af;
      --gray-450: #657892;
      --gray-500: #576b85;
      --gray-550: #4d5e74;
      --gray-600: #3f4d62;
      --gray-650: #2e3c50;
      --gray-700: #232e3c;
      --gray-750: #1b2633;
      --gray-800: #121a24;
      --gray-900: #0d1219;

      --background-color: #fff;
      --border-color: var(--gray-200);
      --hover-background: var(--gray-150);
    }
    :host([theme='dark']) {
      --background-color: #fff;
    }

    .container {
      height: 100vh;
      color: var(--gray-600);
      background-color: var(--background-color);
    }
    header {
      font-weight: bold;
      font-size: 16px;
      padding: 1em;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      user-select: none;
      height: 60px;
      box-sizing: border-box;
    }
    main {
      flex-grow: 1;
      position: relative;
      width: 100%;
      overflow-x: hidden;
      height: calc(100vh - 60px);
    }
    .title {
      margin: 0;
    }
    .operate {
      margin: -3px 0;
    }
    .icon-size {
      height: 32px;
      width: 32px;
    }
    .icon {
      border-radius: 4px;
      transition: background-color 0.2s;
      cursor: pointer;
    }
    .icon:hover,
    .icon.active {
      background-color: var(--hover-background);
    }
  `;

  @state()
  private isSettingOpen: boolean = false;

  @state()
  private tabsGroupData: TabGroup[] = [
    {
      name: 'test1',
      tabs: [
        {
          name: '233',
          url: 'https://www.baidu.com',
        },
        {
          name: '666',
          url: 'https://www.google.com',
        },
      ],
    },
    {
      name: 'test1a',
      tabs: [
        {
          name: '233a',
          url: 'https://www.baidu.com',
        },
        {
          name: '666a',
          url: 'https://www.google.com',
        },
      ],
    },
  ];

  @query('#setting-button')
  private settingIcon!: Element;

  private handleSettingIconClick() {
    if (!this.isSettingOpen) {
      this.isSettingOpen = true;
      this.settingIcon.classList.add('active');
    } else {
      this.isSettingOpen = false;
      this.settingIcon.classList.remove('active');
    }
  }

  render() {
    const themeClassName = `${
      this.colorScheme.isDark ? ThemeClassName.dark : ThemeClassName.light
    } container`;
    return html`
      <div class=${themeClassName}>
        <header>
          <h3 class="title">Tab Manager</h3>
          <div class="operate">
            <vaadin-icon
              id="setting-button"
              @click=${this.handleSettingIconClick}
              title="setting"
              class="icon-size icon"
              icon="lumo:cog"
            ></vaadin-icon>
          </div>
        </header>
        <main>
          <div class="tabs-container">
            ${this.tabsGroupData.length === 0
              ? html`No Data`
              : this.tabsGroupData.map(
                  i => html`<tabs-group-item></tabs-group-item>`
                )}
          </div>
          <setting-sidebar ?open=${this.isSettingOpen}></setting-sidebar>
        </main>
      </div>
    `;
  }
}
