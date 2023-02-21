<script>
  import "$lib/style/table.scss"
  import "$lib/style/rank-themes.scss"

  import MedalHeader from "$lib/components/MedalHeader.svelte"
  import RankTitle from "$lib/components/tools/story-rank/RankTitle.svelte"

  import {calculateRank} from "$lib/tools/aura-calculator"
  import {medalValues} from "$lib/tools/data/medal-values"
  import Output from "$lib/components/table/Output.svelte"
  import Input from "$lib/components/table/Input.svelte"
  import Lightbar from "$lib/components/Lightbar.svelte"
  import HeaderPadding from "$lib/components/HeaderPadding.svelte"
  import {t} from "$lib/translations/translations"

  let data = Object.fromEntries(Object.entries(medalValues).map(([key]) => [key, 0]))

  $: result = calculateRank(data)
</script>

<HeaderPadding />

<section class="center">
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
            on:input={event => (data = {...data, [medalName]: Number(event.target.value)})}
            id={medalName}
            type="number"
            placeholder="0"
            name={medalName}
          />
        {/each}
      </tr>
    </table>
  </form>

  <Lightbar />

  <RankTitle class="rank-theme-gold"
    >{result.currentRank.rank !== -1
      ? $t("aura.full_rank", {
          rank: $t(`aura.rank.${result.currentRank.rank}`),
          level: $t(`aura.level.${result.currentRank.level}`),
        })
      : $t("aura.no_rank")}</RankTitle
  >

  <table>
    <caption>{$t("/tools/battle-grade-calculator/.output.total.title")}</caption>
    <thead>
      <tr>
        <th style="height: 21px">{$t("/tools/battle-grade-calculator/.output.total.points")}</th>
        <th style="height: 21px">{$t("/tools/battle-grade-calculator/.output.total.medals")}</th>
      </tr>
    </thead>
    <tr>
      <Output>{result.totalScore}</Output>
      <Output>{result.totalMedals}</Output>
    </tr>
  </table>
  {#if result.nextRank}
    <table>
      <caption
        >{result.nextRank.rank !== -1
          ? $t("@page=>output.points_until_next_rank.title", {
              rank: $t("aura.full_rank", {
                rank: $t(`aura.rank.${result.nextRank.rank}`),
                level: $t(`aura.level.${result.nextRank.level}`),
              }),
            })
          : $t("@page=>output.points_until_next_rank.max_rank")}</caption
      >
      <thead>
        <tr>
          <th>{$t("/tools/battle-grade-calculator/.output.points_until_next_rank.total")}</th>
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
</section>

<div><a href="info/">{$t("@page=>calculator_info")}</a></div>
<p class="disclaimer"><em>{$t("@page=>disclaimer")}</em></p>

<style lang="scss">
  @import "../../../../lib/style/theme";

  .disclaimer {
    color: $color-outline;
  }

  section {
    margin-block: auto;

    > :global(.light-bar) {
      width: 128px;
      margin-block: 16px;
    }
  }

  caption {
    min-height: 26px;
  }
</style>
