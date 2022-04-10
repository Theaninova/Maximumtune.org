<script context="module">
  export let prerender = true
</script>

<script>
  import {calculateRank} from "$lib/aura-calculator"
  import MedalHeader from "../../lib/components/MedalHeader.svelte"

  export let grades = []
  export let medals = {}
  let input = Object.fromEntries(Object.entries(medals).map(([key]) => [key, 0]))

  $: result = calculateRank({
    grades: grades,
    medalValues: medals,
    input: input,
  })
</script>

<svelte:head>
  <title>Medal, Strength Aura & Grade Calculator</title>
  <meta
    name="description"
    content="Medal, Strength Aura & Grade Calculator for Wangan Midnight Maximum Tune"
  />
</svelte:head>

<main>
  <h1>Medal, Strength Aura, & Grade Calculator</h1>

  <noscript><p>This is a calculator, and if you had JavaScript enabled, you could use it too!</p></noscript>

  <form>
    <table class="input">
      <thead>
        <tr>
          <MedalHeader />
        </tr>
      </thead>
      <tr>
        {#each Object.entries(medals) as [medalName]}
          <td
            ><input
              on:change={event => (input = {...input, [medalName]: Number(event.target.value)})}
              id={medalName}
              type="number"
              placeholder="0"
              name={medalName}
            /></td
          >
        {/each}
      </tr>
    </table>
  </form>

  <hr />

  <section class="center">
    <h2>{result.rankName}</h2>
    <table class="output">
      <caption>Total</caption>
      <thead>
        <tr>
          <th>Score</th>
          <th>Medals</th>
        </tr>
      </thead>
      <tr>
        <td>{result.totalScore}</td>
        <td>{result.totalMedals}</td>
      </tr>
    </table>
    {#if result.nextRank}
      <table class="output">
        <caption>Score until next rank</caption>
        <thead>
          <tr>
            <th>Total</th>
            <MedalHeader />
          </tr>
        </thead>
        <tr>
          <td>{result.nextRank.nextRankDifference}</td>
          {#each result.nextRank.differences as [name, value]}
            <td>{value}</td>
          {/each}
        </tr>
      </table>
    {/if}
  </section>
</main>

<style lang="scss">
  @import "../../lib/style/theme.scss";

  input {
    text-align: center;
    border: none;
    appearance: none;
  }

  input,
  td,
  th {
    padding: 0;
    margin: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input input {
    background: $color-secondary-container;
    color: $color-on-secondary-container;
  }

  .output td {
    background: $color-surface-variant;
    color: $color-on-surface-variant;
  }

  td,
  input {
    width: 66px;
    height: 32px;
    text-align: center;
  }

  td:first-child,
  td:first-child > input {
    border-radius: $border-radius-left;
  }

  td:last-child,
  td:last-child > input {
    border-radius: $border-radius-right;
  }

  caption {
    font-size: 20px;
    margin: 8px;
    font-weight: 600;
    font-stretch: 140%;
    color: $color-secondary;
  }

  table {
    margin: 16px auto;
    border-spacing: 2px;
  }

  h2 {
    padding: 8px 32px;

    border-radius: 20px;
    border: 10px $color-primary;
    border-style: double solid;

    box-shadow: $color-primary 0 0 20px;

    background: $color-primary-container;
    color: $color-on-primary-container;

    font-stretch: 150%;
  }
</style>
