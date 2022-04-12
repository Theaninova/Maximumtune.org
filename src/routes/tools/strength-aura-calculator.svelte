<script>
  import "$lib/style/table.scss"
  import "$lib/style/rank-themes.scss"

  import CalculatorFooter from "$lib/components/CalculatorFooter.svelte"
  import MedalHeader from "$lib/components/MedalHeader.svelte"
  import RankTitle from "$lib/components/RankTitle.svelte"

  import {calculateRank} from "$lib/tools/aura-calculator.ts"
  import {medalValues} from "$lib/tools/data/medal-values.ts"

  let input = Object.fromEntries(Object.entries(medalValues).map(([key]) => [key, 0]))

  $: result = calculateRank(input)
</script>

<svelte:head>
  <title>Medal, Strength Aura & Grade Calculator</title>
  <meta
    name="description"
    content="Medal, Strength Aura & Grade Calculator for Wangan Midnight Maximum Tune"
  />
</svelte:head>

<main>
  <h1 style="min-height: 86px">Medal, Strength Aura, & Grade Calculator</h1>

  <form>
    <table class="input">
      <thead>
        <tr>
          <MedalHeader />
        </tr>
      </thead>
      <tr>
        {#each Object.entries(medalValues) as [medalName]}
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
    <div style="cursor: pointer">
      <RankTitle class="rank-theme-gold">{result.rankName}</RankTitle>
    </div>
    <table class="output">
      <caption>Total</caption>
      <thead>
        <tr>
          <th style="height: 21px">Score</th>
          <th style="height: 21px">Medals</th>
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
  <CalculatorFooter />
</main>

<style>
  caption {
    min-height: 26px;
  }
</style>
