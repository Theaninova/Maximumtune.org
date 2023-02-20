import type {Meta, StoryObj} from "@storybook/svelte"
import Backdrop from "./Backdrop.svelte"

export default {
  title: "Backdrop",
  component: Backdrop,
} satisfies Meta

export const Default = {
  render: () => ({
    Component: Backdrop,
  }),
} satisfies StoryObj
