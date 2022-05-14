<div class="horizontal">
  <a href="/tools/battle-grade-calculator" class="battle-grade">
    <span>BATTLE </span><span>GRADE</span>
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
    aspect-ratio: 1;
    display: block;
    position: relative;

    transform: scale(1);
    transition: transform 0.2s $mt-interpolation;

    background-position: center;

    @include hover() {
      transform: scale(1.1);
    }
  }

  a > * {
    position: absolute;
    top: 0;
  }

  a > span {
    left: 50%;
    top: 50%;
    color: #dedede;
    font-weight: bolder;
    text-align: center;
    text-shadow: #000 0 0 6px;
  }

  a > span:nth-child(1) {
    font-size: 1.7em;
    transform: translate(-50%, -170%);
  }

  a > span:nth-child(2) {
    font-size: 1.2em;
    transform: translate(-50%, -120%);
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
