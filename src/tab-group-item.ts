import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TabItem } from './typing';

@customElement('tab-group-item')
export class TabsGroupItem extends LitElement {
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
    console.log(html`span`);
    return html`
      <div>
        <header>${this.data.name}</header>
      </div>
    `;
  }
}
