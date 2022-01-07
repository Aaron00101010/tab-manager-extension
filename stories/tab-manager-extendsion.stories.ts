import { html, TemplateResult } from 'lit';
import '../src/tab-manager-extendsion.js';

export default {
  title: 'TabManagerExtendsion',
  component: 'tab-manager-extendsion',
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

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <tab-manager-extendsion style="--tab-manager-extendsion-background-color: ${backgroundColor}" .title=${title}></tab-manager-extendsion>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
