import { css, html, LitElement } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import Sortable from 'sortablejs';

import { move } from './utils/helper';
import type { TabGroup } from './typing';

import './tab-group-item';

@customElement('tab-group')
export class TabGroupComponent extends LitElement {
  static styles = css`
    .wrapper {
      display: grid;
      grid-template-columns: 20px 1fr;
    }
    .drag-icon {
      display: flex;
      align-self: flex-start;
      margin-top: 8px;
      justify-content: center;
      color: var(--lumo-contrast-50pct);
      cursor: grabbing;
      opacity: 0;
      transition: opacity 0.2s, background-color 0.2s;
      margin-right: -5px;
    }
    .wrapper:hover .drag-icon {
      opacity: 1;
    }

    .drag-icon:hover {
      background-color: var(--hover-background);
      border-radius: var(--lumo-border-radius-m);
    }
    .sortable-ghost {
      opacity: 1;
    }
    .sortable-chosen {
      opacity: 0.4;
    }
    .sortable-over {
      border: 1px solid;
    }
  `;

  @state()
  private tabsGroupData: TabGroup[] = [
    {
      id: '1',
      name: 'aaa',
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
      id: '2',
      name: 'bbb',
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
  @query('.container')
  container!: HTMLElement;
  @state()
  sortable!: Sortable;

  connectedCallback(): void {
    super.connectedCallback();
    requestAnimationFrame(() => {
      this.sortable = new Sortable(this.container, {
        handle: '.drag-icon',
        swapThreshold: 0.5,
        animation: 150,
        onEnd: e => {
          this.tabsGroupData = move(
            this.tabsGroupData,
            e.oldIndex!,
            e.newIndex!
          );
        },
      });
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.sortable.destroy();
  }

  render() {
    return html`
      <div class="container">
        ${this.tabsGroupData.length === 0
          ? html`No Data`
          : repeat(
              this.tabsGroupData,
              item => item.id,
              item => html`
                <div class="wrapper">
                  <div class="drag-icon" title="drag to sort">
                    <vaadin-icon icon="lumo:menu"></vaadin-icon>
                  </div>
                  <tab-group-item .data=${item}></tab-group-item>
                </div>
              `
            )}
      </div>
    `;
  }
}
