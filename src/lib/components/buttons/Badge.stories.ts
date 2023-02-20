import type {Meta, StoryObj} from "@storybook/svelte"
import Badge from "./Badge.svelte"

export default {
  title: "Badge",
  component: Badge,
  parameters: {
    viewport: {
      viewports: {
        name: "Badge",
        styles: {
          width: "256px",
          height: "256px",
        },
      },
    },
  },
} satisfies Meta

export const Normal = {
  render: () => ({
    Component: Badge,
    props: {
      title: "Badge",
      subtitle: "Title",
    },
  }),
} satisfies StoryObj
