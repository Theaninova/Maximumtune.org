<script>
  import Badge from "$lib/components/Badge.svelte"
</script>

<div class="horizontal">
  <Badge href="/tools/battle-grade-calculator" title="Battle" subtitle="Grade" color="#de441a" />
  <Badge href="/tools/story-rank-calculator" title="Story" subtitle="Rank" color="#342829" />
  <Badge href="/tools/splits-calculator" title="Time" subtitle="Splits" color="#342829" />
</div>

<style lang="scss">
  @import "../assets/images";
  @import "../style/theme";

  .horizontal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  a > span {
    font-weight: bolder;

    // transform: translate(-50%, -50%);
    color: #dedede;
    text-align: center;
    filter: drop-shadow(0 0 6px black);
  }

  .battle-grade > span {
    top: 65%;
  }

  a {
    @include hover {
      transform: scale(1.1);
    }

    all: unset;

    will-change: transform;
    cursor: pointer;

    transform: scale(1);

    display: grid;

    aspect-ratio: 1;

    background-position: center;

    transition: transform 0.2s $mt-interpolation;
  }

  a > * {
    grid-column: 1;
    grid-row: 1;
  }

  a > span:nth-child(1) {
    transform: translateY(15%);
    font-size: 1.7em;
  }

  a > span:nth-child(2) {
    transform: translateY(32%);
    font-size: 1.2em;
  }

  a > div {
    aspect-ratio: 1;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .battle-grade {
    background-image: url($battle-grade-button);
  }

  .story-rank,
  .time-splits {
    background-image: url($big-button-round);
  }

  .story-rank > div {
    background-image: url($story-mode);
  }

  .time-splits > div {
    background-image: url($time-trial);
  }
</style>
