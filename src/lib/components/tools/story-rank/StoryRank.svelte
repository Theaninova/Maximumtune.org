<script lang="ts">
  import "$lib/style/rank-themes.scss"
  import type {Rank} from "../../../tools/data/ranks"
  import {t} from "$lib/translations/translations.js"

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

  export let rank: Rank
</script>

<h2 {...$$props} class="rank-theme-{themes[rank.name]}">
  {$t("@tools/story-rank/StoryRank.label", {name: rank.name, number: rank.number})}
</h2>

<style lang="scss">
  @import "../../../style/theme";

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 256px;
    height: 48px;
    padding: 0;

    font-size: 20px;
    font-weight: bold;
    font-stretch: 150%;
    letter-spacing: 6px;

    filter: none;
    border: 4px #d3dcd1 groove;
    border-radius: 24px;
    box-shadow: $inset-shadow;
  }
</style>
