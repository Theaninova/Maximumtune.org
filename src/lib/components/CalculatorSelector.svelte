<script>
  import Badge from "$lib/components/Badge.svelte"
  import StoryRank from "$lib/assets/story-mode.webp"
  import TimeSplits from "$lib/assets/time-trial.webp"
</script>

<div class="horizontal">
  <Badge href="/tools/battle-grade-calculator" title="Battle" subtitle="Grade" color="red" />
  <Badge href="/tools/story-rank-calculator" title="Story" subtitle="Rank" imageHref={StoryRank} />
  <Badge href="/tools/splits-calculator" title="Time" subtitle="Splits" imageHref={TimeSplits} />
</div>

<style lang="scss">
  @import "../style/theme";

  .horizontal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
</style>
