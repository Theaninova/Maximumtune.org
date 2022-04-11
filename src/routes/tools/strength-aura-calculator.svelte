<script context="module">
  export let prerender = true
</script>

<script>
  import {calculateRank} from "$lib/aura-calculator"
  import MedalHeader from "../../lib/components/MedalHeader.svelte"
  import RankTitle from "../../lib/components/RankTitle.svelte"
  import "../../lib/style/table.scss"
  import CalculatorHeader from "../../lib/components/CalculatorHeader.svelte"

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

  <CalculatorHeader />

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
    <RankTitle class="rank-theme-gold">{result.rankName}</RankTitle>
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
