import type {Meta, StoryObj} from "@storybook/svelte"
import SplitsInput from "./SplitsInput.svelte"
import type {Stage} from "../../../tools/splits-calculator"

export default {
  title: "Splits Input",
  component: SplitsInput,
} satisfies Meta

export const Empty = {
  render: () => ({
    Component: SplitsInput,
    props: {
      stage: {
        name: "Test Stage",
        title: "Test Stage",
        area: "Test",
        imageIndex: -1,
        key: "test_stage",
        sections: 5,
      } satisfies Stage,
    },
  }),
} satisfies StoryObj
