<script>
  import {GRADE_DATA} from "$lib/tools/data/grades-data"
  import MedalHeader from "$lib/components/MedalHeader.svelte"
  import {medalValues} from "$lib/tools/data/medal-values"
  import {t} from "$lib/translations/translations"
</script>

<h2>{$t("@page=>subtitle")}</h2>

<p>
  {@html $t("@page=>github", {
    link: "https://github.com/Theaninova/mmtorg/blob/master/src/lib/tools/aura-calculator.ts",
  })}
</p>

<section>
  <table style="border-spacing: 8px">
    <caption>{$t("@page=>medal_values")}</caption>
    <thead>
      <tr>
        <MedalHeader />
      </tr>
    </thead>
    <tr>
      {#each Object.entries(medalValues) as [_, points]}
        <td>{$t("aura.points", {points})}</td>
      {/each}
    </tr>
  </table>
</section>

<table>
  <caption>{@html $t("@page=>grade_data_title", {source: "https://wikiwiki.jp/wmmt"})}</caption>
  <thead>
    <tr>
      <th>{$t("aura.rank_name")}</th>
      <th>{$t("aura.aura_name")}</th>
      <th>{$t("aura.title_name")}</th>
      {#each GRADE_DATA[0] as _, level}
        <th>{$t(`aura.level.${level}`)}</th>
      {/each}
    </tr>
  </thead>
  {#each GRADE_DATA as levels, rank}
    <tr>
      <td>{$t(`aura.rank.${rank}`)}</td>
      <td>{$t(`aura.aura.${rank}`)}</td>
      <td>{$t(`aura.title_formatted`, {title: $t(`aura.title.${rank}`)})}</td>
      {#each levels as threshold}
        <td>{threshold}</td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  td {
    text-align: center;
  }
</style>
