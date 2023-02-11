<script lang="ts">
  import TimeInput from "./TimeInput.svelte"
  import type {Stage, StageSaveState, TimeSplit} from "../../tools/splits-calculator"
  import {onMount} from "svelte"
  import {formatTimeSplit, latest, sumTimes, timeDifference} from "../../tools/splits-calculator"

  export let stage: Stage
  let saveState: StageSaveState | undefined

  onMount(() => {
    if (localStorage) {
      saveState = JSON.parse(localStorage.getItem(stage.key) || "{}")
    }
  })

  const savePb = (value: TimeSplit) => {
    saveState = saveState || {}
    saveState.pb = saveState.pb || []
    saveState.pb.push({
      value,
      time: Date.now(),
    })

    console.log("commit pb", stage.key, saveState)

    localStorage.setItem(stage.key, JSON.stringify(saveState))
  }

  const saveSplit = (value: TimeSplit, index: number) => {
    saveState = saveState || {}
    saveState.sections = saveState.sections || []
    saveState.sections[index] = saveState.sections[index] || []
    saveState.sections[index].push({
      value,
      time: Date.now(),
    })

    console.log("commit split", stage.key, index, saveState)

    localStorage.setItem(stage.key, JSON.stringify(saveState))
  }

  $: theoryTime = sumTimes(saveState?.sections?.map(latest))
  $: timeDiff = timeDifference(theoryTime, latest(saveState?.pb))
</script>

<form>
  <div class="table">
    <em class="green">Personal Best</em>
    <TimeInput value={latest(saveState?.pb)} on:submit={event => savePb(event.detail)} />
    <em class="purple">Theory Time</em>
    <div>{formatTimeSplit(theoryTime)}</div>
    <em class="orange">Difference</em>
    <div>{formatTimeSplit(timeDiff)}</div>
    <hr />
    <hr />
    {#each Array.from({length: stage.sections}) as _, section}
      <div>Section {section + 1}</div>
      <TimeInput
        value={latest(saveState?.sections?.[section])}
        on:submit={event => saveSplit(event.detail, section)}
      />
    {/each}
    <hr />
    <hr />
    <em class="grey">Total Time</em>
    <div>{formatTimeSplit(theoryTime)}</div>
  </div>
</form>

<style lang="scss">
  @import "../../assets/images";
  @import "../../style/theme";

  form {
    // center
    display: flex;
    flex-direction: column;
    justify-content: center;

    max-width: 16.5cm;
    height: 100%;
    margin: auto;
  }

  .table {
    display: grid;
    grid-gap: 4px 0;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;

    margin-inline: 8px;

    > :global(*) {
      font-size: 20px;
      font-weight: bold;
      font-style: italic;
      text-shadow: 0 0 4px black;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    > div:nth-child(even) {
      color: $color-primary;
    }

    > hr {
      width: 100%;
      height: 1px;
      margin-block: 16px;

      background: $color-outline;
      box-shadow: unset;
    }

    > em {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 192px;
      height: 28px;

      border-radius: 14px;
      box-shadow: 0 0 2px black inset;
    }
  }

  .orange {
    background: #934b00 $shine-3d;
  }

  .green {
    background: #0a5a0c $shine-3d;
  }

  .purple {
    background: #502f8a $shine-3d;
  }

  .grey {
    background: #484546 $shine-3d;
  }
</style>
