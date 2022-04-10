<script>
  import {calculateRank} from "$lib/aura-calculator"

  import GoldMedal from "$lib/assets/gold_medal_64w.base64.txt?raw"
  import SilverMedal from "$lib/assets/silver_medal_64w.base64.txt?raw"
  import BronzeMedal from "$lib/assets/bronze_medal_64w.base64.txt?raw"
  import BlackMedal from "$lib/assets/black_medal_64w.base64.txt?raw"

  let images = {
    "Gold Medals": GoldMedal,
    "Silver Medals": SilverMedal,
    "Bronze Medals": BronzeMedal,
    "Black Medals": BlackMedal,
  }

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

  <form>
    <table>
      <thead>
        <tr>
          {#each Object.entries(medals) as [medalName]}
            <td>
              <img src={images[medalName]} alt={medalName} />
            </td>
          {/each}
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
            {#each result.nextRank.differences as [name, value]}
              <th><img src={images[name]} alt={name} /></th>
            {/each}
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
    width: 60px;
    height: 30px;
    border-radius: 8px;

    text-align: center;
    margin: 0;

    background: $color-secondary-container;
    color: $color-on-secondary-container;
    border: none;
    appearance: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .output {
    td {
      background: $color-surface-variant;
      color: $color-on-surface-variant;
      width: 64px;
      height: 32px;
    }
    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
    }

    th {
      padding: 4px;
    }
  }

  caption {
    font-size: 20px;
    margin: 8px;
    font-weight: 600;
    font-stretch: 140%;
    color: $color-secondary;
  }

  td {
    text-align: center;
  }

  table {
    margin: 16px auto;
  }

  img {
    width: 48px;
  }

  h2 {
    padding: 8px 32px;

    border-radius: 20px;
    border: 10px solid $color-primary;
    border-bottom-style: double;
    border-top-style: double;

    box-shadow: $color-primary 0 0 20px;

    background: $color-primary-container;
    color: $color-on-primary-container;

    font-stretch: 150%;
  }
</style>
