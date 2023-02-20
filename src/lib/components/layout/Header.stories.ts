import type {Meta, StoryObj} from "@storybook/svelte"
import Header from "./Header.svelte"

export default {
  title: "Header",
  component: Header,
} satisfies Meta

export const Normal = {
  render: () => ({
    Component: Header,
    props: {
      pathname: "/",
    },
  }),
} satisfies StoryObj

export const BackButton = {
  render: () => ({
    Component: Header,
    props: {
      pathname: "/back/",
    },
  }),
} satisfies StoryObj
