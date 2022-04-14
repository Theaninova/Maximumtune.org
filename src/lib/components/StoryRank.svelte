<script lang="ts">
  import "../../lib/style/rank-themes.scss"
  import type {Rank} from "../tools/data/ranks"

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
  {rank.name}{rank.number ?? ""}
</h2>

<style lang="scss">
  @import "../style/theme.scss";

  h2 {
    min-height: 32px;

    border-radius: 16px;
    font-stretch: 150%;
    padding: 0 60px;
    box-shadow: $inset-shadow;
  }
</style>
