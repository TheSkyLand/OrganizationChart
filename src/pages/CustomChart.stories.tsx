import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomChart from './CustomChart';

const meta = {
  component: CustomChart,
} satisfies Meta<typeof CustomChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};