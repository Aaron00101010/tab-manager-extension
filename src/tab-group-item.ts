import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TabGroup } from './typing';
import './tab-item';

@customElement('tab-group-item')
export class TabGroupItem extends LitElement {
  static styles = css`
    :host {
    }
    header {
      display: grid;
      height: 40px;
      grid-template-columns: 1fr auto;
      line-height: 40px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .left-part {
      display: grid;
      grid-template-columns: 30px 30px 1fr;
    }
    .title {
      margin: 0;
      text-overflow: nowarp;
      font-weight: normal;
      transition: color 0.2s;
      user-select: none;
    }
    .fold-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--lumo-contrast-50pct);
      transition: color, transform 0.2s;
    }

    .left-part:hover .fold-icon,
    :host([open]) .fold-icon {
      color: var(--lumo-primary-color-50pct);
    }
    .left-part:hover .title,
    :host([open]) .title {
      color: var(--lumo-primary-text-color);
    }
    :host([open]) .fold-icon {
      transform: rotate(90deg);
    }

    main {
      height: 0;
      overflow: hidden;
    }

    :host([open]) main {
      height: unset;
      padding: var(--lumo-space-m);
    }

    .operate {
      padding: 0 var(--lumo-space-m);
      opacity: 0;
      transition: opacity 0.2s;
    }
    header:hover .operate {
      opacity: 1;
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
  `;

  @property({ type: Object })
  data!: TabGroup;

  @property({ attribute: true, type: Boolean, reflect: true })
  open: boolean = false;

  handleClick() {
    this.open = !this.open;
  }

  render() {
    return html`
      <div class="container">
        <header>
          <div class="left-part" @click=${this.handleClick}>
            <div class="fold-icon">
              <vaadin-icon icon="lumo:chevron-right"></vaadin-icon>
            </div>
            <h3 class="title">${this.data.name}</h3>
          </div>
          <div class="operate">
            <vaadin-icon class="icon" icon="lumo:edit"></vaadin-icon>
          </div>
        </header>
        <main>
          ${this.data.tabs.map(
            data => html`<tab-item .data=${data}></tab-item>`
          )}
        </main>
      </div>
    `;
  }
}
