<script lang="ts">
  const onKeydown = (event: KeyboardEvent, length: number, max: number, index: number) => {
    if (event.key <= "9" && event.key >= "0") {
      presses.push(event.key)
    }
    if (event.key === "Backspace") {
      presses = []
    }

    const value = presses.slice(-1 * length).join("")
    ;(event.target as HTMLInputElement).value = Math.min(Number(value), max).toString().padStart(length, "0")

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      inputs[index + (event.key === "ArrowRight" ? 1 : -1)]?.focus()
    }

    if (presses.length >= length) {
      if (inputs[index + 1]) {
        inputs[index + 1].focus()
      } else {
        // remove focus from input
        inputs[index].blur()
      }
    }
  }

  const onBlur = () => {
    presses = []
  }

  let presses = []

  let container: HTMLSpanElement
  $: inputs = container?.querySelectorAll("input") as HTMLInputElement[]
</script>

<span bind:this={container}>
  <input
    type="number"
    style="width: 26px"
    value="00"
    on:blur={onBlur}
    on:keydown|preventDefault={event => onKeydown(event, 2, 99, 0)}
  />'
  <input
    type="number"
    style="width: 26px"
    value="00"
    on:blur={onBlur}
    on:keydown|preventDefault={event => onKeydown(event, 2, 59, 1)}
  />"
  <input
    type="number"
    style="width: 40px"
    value="000"
    on:blur={onBlur}
    on:keydown|preventDefault={event => onKeydown(event, 3, 999, 2)}
  />
</span>

<style lang="scss">
  span {
    cursor: default;
  }

  input {
    all: unset;
    caret-color: transparent;
    outline: 0 solid transparent;
    cursor: default;
    text-align: start;
  }

  input:focus {
    background-color: red;
  }
</style>
