<div class="content">
  <div class="backdrop" />
  <div class="backdrop-shade" />

  <div class="backdrop-rects" style="height: 120px; background-color:  rgb(0 0 0 / 30%)" />
  <div class="backdrop-rects" style="height: 30px; background-color:  rgb(0 0 0 / 30%)" />

  <div class="flowing-rects">
    <div class="rect" />
    <div class="rect" />
    <div class="rect last-rect" />
    <div class="rect" />
    <div class="rect" />
    <div class="rect last-rect" />
  </div>
</div>

<style lang="scss">
  @import "../assets/images";
  @import "../style/theme";

  * {
    will-change: transform;
  }

  @keyframes rects {
    from {
      transform: translateX(-25%) translateY(-100%);
    }

    to {
      transform: translateX(25%) translateY(-100%);
    }
  }

  @keyframes background {
    from {
      transform: translateX(-25%);
    }

    to {
      transform: translateX(25%);
    }
  }

  .content {
    z-index: -100;

    overflow: hidden;
    display: grid;
    grid-column: 1;
    grid-row: 1 / span 2;
    align-items: center;
    justify-items: center;

    > * {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .backdrop-rects {
    z-index: 5;
    width: 120%;
  }

  .backdrop {
    width: 200%;
    height: 100%;

    background-image: url($grid);
    background-size: 30px;

    animation: background 24s linear infinite;
  }

  .backdrop-shade {
    background: linear-gradient(to bottom, black, #13131377, #131313dd 30%, #131313dd 70%, #13131377, black);
    width: 100%;
    height: 100%;
  }

  .flowing-rects {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    width: 200%;

    animation: rects 6s linear infinite;
  }

  @media (min-width: 768px) {
    .flowing-rects {
      animation-duration: 12s;
    }

    .backdrop {
      animation-duration: 96s;
    }
  }

  @media (min-width: 1024px) {
    .flowing-rects {
      animation-duration: 18s;
    }
  }

  @media (min-width: 1280px) {
    .flowing-rects {
      animation-duration: 24s;
    }
  }

  .rect {
    transform: skew(-15deg);

    width: clamp(40px, 32vw, 400px);
    height: 80px;

    opacity: 0.6;
    background-color: black;
  }

  .last-rect {
    margin-inline: 10%;
  }
</style>
