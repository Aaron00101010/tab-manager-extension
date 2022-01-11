import { html, TemplateResult } from 'lit';
import '../src/tab-manager-extension.js';

export default {
  title: 'TabManagerExtension',
  component: 'tab-manager-extension',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  title,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <tab-manager-extension
    style="--tab-manager-extension-background-color: ${backgroundColor}"
    .title=${title}
  ></tab-manager-extension>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
