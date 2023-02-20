<script>
  import "$lib/style/table.scss"
  import RankHeader from "$lib/components/tools/story-rank/RankHeader.svelte"
  import CalculatorHeader from "$lib/components/CalculatorFooter.svelte"
  import {calculateStoryRank} from "$lib/tools/rank-calculator"
  import {rankNames} from "$lib/tools/data/story-rank"
  import Input from "$lib/components/table/Input.svelte"
  import StoryRank from "$lib/components/tools/story-rank/StoryRank.svelte"
  import HeaderPadding from "$lib/components/HeaderPadding.svelte"

  export let data

  $: result = calculateStoryRank(data)
</script>

<section class="center">
  <HeaderPadding />

  <form>
    <table>
      <thead>
        <RankHeader />
      </thead>
      <tr>
        {#each rankNames as medalName}
          <Input
            on:input={event => (data = {...data, [medalName]: Number(event.target.value)})}
            id={medalName}
            type="number"
            placeholder="0"
            aria-label={medalName.replace(/(?<=[a-z])[A-Z]/, it => ` ${it.toLowerCase()}`)}
            name={medalName}
          />
        {/each}
      </tr>
    </table>
  </form>

  <StoryRank rank={result} />
</section>

<div><a href="/tools/story-rank-info">See how we calculate your rank</a></div>
<CalculatorHeader />

<style lang="scss">
  section {
    margin-block: auto;
  }
</style>
