import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('setting-sidebar')
export class SettingSidebar extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      height: 100%;
      border-left: 1px solid var(--border-color);
      width: 300px;
      top: 0;
      right: -300px;
      transition: right 0.2s;
      padding: var(--lumo-space-m);
      box-sizing: border-box;
      background-color: var(--lumo-base-color);
    }
    :host([open]) {
      right: 0;
    }
    h3 {
      margin: 0;
    }
  `;
  render() {
    return html`<h3>Settings</h3> `;
  }
}
