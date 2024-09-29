import type { StorybookConfig } from '@storybook/react-vite'
import { InlineConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite')

    const c: InlineConfig = {}

    if (configType === 'PRODUCTION') {
      c.base = '/react-tagged/'
    }

    return mergeConfig(config, c)
  },
}
export default config
