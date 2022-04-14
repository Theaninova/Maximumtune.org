<script>
  import "../../lib/style/table.scss"
  import "../../lib/style/rank-themes.scss"

  import CalculatorFooter from "../../lib/components/CalculatorFooter.svelte"
  import MedalHeader from "../../lib/components/MedalHeader.svelte"
  import RankTitle from "../../lib/components/RankTitle.svelte"

  import {calculateRank} from "../../lib/tools/aura-calculator.ts"
  import {medalValues} from "../../lib/tools/data/medal-values.ts"
  import Output from "../../lib/components/table/Output.svelte"
  import Input from "../../lib/components/table/Input.svelte"

  let input = Object.fromEntries(Object.entries(medalValues).map(([key]) => [key, 0]))

  $: result = calculateRank(input)
</script>

<svelte:head>
  <title>Battle Grade Calculator</title>
  <meta name="description" content="Battle Grade Calculator for Wangan Midnight Maximum Tune" />
</svelte:head>

<div class="subtitle">
  <h1>Battle Grade Calculator</h1>
</div>

<form>
  <table>
    <thead>
      <tr>
        <MedalHeader />
      </tr>
    </thead>
    <tr>
      {#each Object.entries(medalValues) as [medalName]}
        <Input
          on:change={event => (input = {...input, [medalName]: Number(event.target.value)})}
          id={medalName}
          type="number"
          placeholder="0"
          name={medalName}
        />
      {/each}
    </tr>
  </table>
</form>

<hr />

<section class="center">
  <RankTitle class="rank-theme-gold">{result.rankName}</RankTitle>

  <table>
    <caption>Total</caption>
    <thead>
      <tr>
        <th style="height: 21px">Score</th>
        <th style="height: 21px">Medals</th>
      </tr>
    </thead>
    <tr>
      <Output>{result.totalScore}</Output>
      <Output>{result.totalMedals}</Output>
    </tr>
  </table>
  {#if result.nextRank}
    <table>
      <caption>Score until next rank</caption>
      <thead>
        <tr>
          <th>Total</th>
          <MedalHeader />
        </tr>
      </thead>
      <tr>
        <Output>{result.nextRank.nextRankDifference}</Output>
        {#each result.nextRank.differences as [name, value]}
          <Output>{value}</Output>
        {/each}
      </tr>
    </table>
  {/if}

  <p><a href="/tools/battle-grade-info">See how we calculate your rank</a></p>
</section>

<CalculatorFooter />

<style>
  caption {
    min-height: 26px;
  }

  @media (min-width: 425px) {
    .subtitle > h1 {
      min-height: 43px;
    }
  }

  @media (max-width: 424px) {
    .subtitle > h1 {
      min-height: 86px;
    }
  }
</style>
