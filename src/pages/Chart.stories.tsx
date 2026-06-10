import type { Meta, StoryObj } from '@storybook/react-vite';

import Chart from './Chart';

const meta = {
  component: Chart,
} satisfies Meta<typeof Chart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};