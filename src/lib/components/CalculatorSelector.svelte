<div class="horizontal">
  <a href="/tools/battle-grade-calculator" class="battle-grade">
    <span>BATTLE </span><span>GRADE</span>
    <div />
  </a>
  <a href="/tools/story-rank-calculator" class="story-rank"
    ><span>STORY</span><span>RANK</span>
    <div />
  </a>
  <a href="/tools/splits-calculator" class="time-splits"
    ><span>TIME</span><span>SPLITS</span>
    <div />
  </a>
</div>

<style lang="scss">
  @import "../assets/images";
  @import "../style/theme";

  .horizontal {
    display: grid;
    grid-template-columns: repeat(auto-fit, 180px);
  }

  a {
    all: unset;
    cursor: pointer;

    aspect-ratio: 1;
    display: grid;

    transition: transform 0.2s $mt-interpolation;
    will-change: transform;
    transform: scale(1);

    background-position: center;

    @include hover() {
      transform: scale(1.1);
    }
  }

  a > * {
    grid-column: 1;
    grid-row: 1;
  }

  a > span {
    // transform: translate(-50%, -50%);
    color: #dedede;
    font-weight: bolder;
    text-align: center;
    filter: drop-shadow(0 0 6px black);
  }

  a > span:nth-child(1) {
    font-size: 1.7em;
    transform: translateY(15%);
  }

  a > span:nth-child(2) {
    font-size: 1.2em;
    transform: translateY(32%);
  }

  a > div {
    width: 100%;
    aspect-ratio: 1;
    background-repeat: no-repeat;
    background-position: center;
  }

  .battle-grade > span {
    top: 65%;
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
