<div class="content">
  <div class="backdrop" />

  <div class="backdrop-rects" style="height: 120px; background-color:  rgba(0,0,0,0.3)" />
  <div class="backdrop-rects" style="height: 30px; background-color:  rgba(0,0,0,0.3)" />

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
    grid-row: 1 / span 2;
    grid-column: 1;

    display: grid;
    align-items: center;
    justify-items: center;
    > * {
      grid-row: 1;
      grid-column: 1;
    }

    z-index: -100;

    overflow: hidden;
  }

  .backdrop-rects {
    width: 120%;
    z-index: 5;
  }

  .backdrop {
    width: 200%;
    height: 100%;
    background-image: linear-gradient(
        to bottom,
        black,
        #13131377,
        #131313dd 30%,
        #131313dd 70%,
        #13131377,
        black
      ),
      url($grid);
    background-size: 30px;

    animation: background 24s linear infinite;
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
    width: clamp(40px, 32vw, 400px);
    height: 80px;

    background-color: black;
    opacity: 0.6;
    transform: skew(-15deg);
  }

  .last-rect {
    margin-inline: 10%;
  }
</style>
