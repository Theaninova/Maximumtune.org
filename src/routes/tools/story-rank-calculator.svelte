<script>
  import "$lib/style/table.scss"
  import "$lib/style/rank-themes.scss"

  import RankHeader from "$lib/components/RankHeader.svelte"
  import CalculatorHeader from "$lib/components/CalculatorFooter.svelte"

  import {calculateStoryRank} from "$lib/tools/rank-calculator.ts"
  import {rankNames} from "$lib/tools/data/story-rank.ts"
  import Input from "../../lib/components/table/Input.svelte"

  export let input = Object.fromEntries(rankNames.map(key => [key, 0]))

  const themes = {
    N: "neutral",
    C: "blue",
    B: "green",
    A: "yellow",
    S: "orange",
    SS: "red",
    SSS: "pink",
    SSSS: "gold",
    SSSSS: "rainbow",
    SSSSSS: "leather",
  }

  $: result = calculateStoryRank(input)
</script>

<svelte:head>
  <title>Story RankCalculator</title>
  <meta name="description" content="Story Rank Calculator for Wangan Midnight Maximum Tune" />
</svelte:head>

<div class="subtitle">
  <h1>Story Rank Calculator</h1>
</div>

<form>
  <table>
    <thead>
      <RankHeader />
    </thead>
    <tr>
      {#each rankNames as medalName}
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

<section class="center">
  <h2 class="rank-theme-{themes[result.name]}">
    {result.name}{result.number ?? ""}
  </h2>
</section>

<CalculatorHeader />

<style lang="scss">
  @import "../../lib/style/theme.scss";

  h2 {
    min-height: 32px;

    border-radius: 16px;
    font-stretch: 150%;
    padding: 0 60px;
    box-shadow: $inset-shadow;
  }

  @media (min-width: 398px) {
    .subtitle > h1 {
      min-height: 43px;
    }
  }

  @media (max-width: 397px) {
    .subtitle > h1 {
      min-height: 86px;
    }
  }
</style>
