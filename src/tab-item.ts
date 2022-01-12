import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TabItem } from './typing';

@customElement('tab-item')
export class TabItemComponent extends LitElement {
  static styles = css`
    :host {
    }
    :host([open]) {
      right: 0;
    }
  `;

  @property({ type: Object })
  data!: TabItem;

  render() {
    return html` <div>${this.data.name}</div> `;
  }
}
