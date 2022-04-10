<script context="module">
  export let prerender = true
</script>

<script>
  import {calculateStoryRank} from "$lib/rank-calculator.ts"
  import RankTitle from "$lib/components/RankTitle.svelte"
  import "$lib/style/table.scss"
  import "$lib/style/rank-themes.scss"

  export let rankConfig
  export let input = Object.fromEntries(Object.entries(rankConfig).map(([key]) => [key, 0]))

  const themes = {
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

  $: result = calculateStoryRank(input, rankConfig)
</script>

<main>
  <form>
    <table class="input">
      <thead>
        <tr>
          {#each Object.values(rankConfig) as { name }}
            <th>{name}</th>
          {/each}
        </tr>
      </thead>
      <tr>
        {#each Object.keys(rankConfig) as medalName}
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

  <section class="center">
    <RankTitle class="rank-theme-{themes[result.name]}">{result.name}{result.number ?? ""}</RankTitle>
  </section>
</main>
