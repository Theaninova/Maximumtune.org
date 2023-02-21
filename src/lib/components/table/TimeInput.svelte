<script lang="ts">
  import type {TimeSplit} from "../../tools/splits-calculator"
  import {formatTimePart} from "../../tools/splits-calculator"
  import {createEventDispatcher} from "svelte"

  export let value: TimeSplit = [undefined, undefined, undefined]
  const eventEmitter = createEventDispatcher<{submit: TimeSplit}>()

  const commit = (index: number) => {
    presses = []
    inputs[index].blur()
    eventEmitter("submit", value)
    flash()
  }

  const flash = () => {
    container.classList.remove("flash-time-input")
    void container.offsetWidth
    container.classList.add("flash-time-input")
  }

  const onInput = (data: string, length: number, max: number, index: number) => {
    value ||= [undefined, undefined, undefined]

    if (data <= "9" && data >= "0") {
      if (value[0] == undefined) {
        value = [0, 0, 0]
      }
      presses.push(data)
    }

    value[index] = Math.min(Number(presses.slice(-1 * length).join("")), max)

    if (presses.length >= length) {
      if (inputs[index + 1]) {
        inputs[index + 1].focus()
        presses = []
      } else {
        commit(index)
      }
    }
  }

  const onKeydown = (event: KeyboardEvent, length: number, max: number, index: number) => {
    if (event.key <= "9" && event.key >= "0") return onInput(event.key, length, max, index)
    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft": {
        inputs[index + (event.key === "ArrowRight" ? 1 : -1)]?.focus()
        presses = []
        return
      }
      case "Backspace": {
        presses = []
        value = [undefined, undefined, undefined]
        return
      }
      case "Escape": {
        presses = []
        inputs[index].blur()
        return
      }
      case "Enter": {
        commit(index)
        return
      }
    }
  }

  let presses = []

  let container: HTMLSpanElement
  $: inputs = container?.querySelectorAll("input") as HTMLInputElement[]
</script>

<span class="flash" bind:this={container}>
  <input
    type="number"
    placeholder="--"
    style="width: 26px"
    value={formatTimePart(value?.[0])}
    on:keydown|preventDefault={event => onKeydown(event, 2, 99, 0)}
    on:beforeinput|preventDefault={event => onInput(event.data, 2, 99, 0)}
  />'
  <input
    type="number"
    placeholder="--"
    style="width: 26px"
    value={formatTimePart(value?.[1])}
    on:keydown|preventDefault={event => onKeydown(event, 2, 59, 1)}
    on:beforeinput|preventDefault={event => onInput(event.data, 2, 59, 1)}
  />"
  <input
    type="number"
    placeholder="---"
    style="width: 40px"
    value={formatTimePart(value?.[2], 3)}
    on:keydown|preventDefault={event => onKeydown(event, 3, 999, 2)}
    on:beforeinput|preventDefault={event => onInput(event.data, 3, 999, 2)}
  />
</span>

<style lang="scss">
  @import "../../style/theme";

  @keyframes flash {
    from {
      background-color: $color-primary;
    }

    to {
      background-color: transparent;
    }
  }

  :global(.flash-time-input) {
    animation: flash 1s ease-out;
  }

  span {
    cursor: default;
  }

  input {
    all: unset;

    cursor: default;

    transform: skewX(-20deg);

    font-style: normal;
    text-align: end;

    outline: 0 solid transparent;
    caret-color: transparent;

    &:empty {
      text-align: center;
    }

    &:focus {
      background-color: $color-primary-container;
    }
  }
</style>
