import { LitElement, html, css } from 'lit';
import { query, state, customElement } from 'lit/decorators.js';
import './utils/vaddin';
import { ColorScheme } from './utils/color-scheme';
// import { extension } from './service/browser-extension';

import './setting-sidebar';
import './tab-group';

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
      --background-color: var(--lumo-base-color);
      --border-color: var(--lumo-contrast-20pct);
      --hover-background: var(--lumo-contrast-20pct);
    }

    .container {
      height: 100vh;
      color: var(--lumo-body-text-color);
      background-color: var(--background-color);
    }
    header {
      font-weight: bold;
      font-size: var(--lumo-font-size-l);
      font-weight: normal;
      padding: var(--lumo-space-m);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      user-select: none;
      height: 60px;
      box-sizing: border-box;
      color: var(--lumo-header-text-color);
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
      border-radius: var(--lumo-border-radius-m);
      transition: background-color 0.2s;
      cursor: pointer;
    }
    .icon:hover,
    .icon.active {
      background-color: var(--hover-background);
    }

    .tabs-container {
      padding: var(--lumo-space-m);
    }
  `;

  @state()
  private isSettingOpen: boolean = false;

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
            <tab-group></tab-group>
          </div>
          <setting-sidebar ?open=${this.isSettingOpen}></setting-sidebar>
        </main>
      </div>
    `;
  }
}
