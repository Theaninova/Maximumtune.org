<script>
</script>

<div />

<style lang="scss">
  @import "../assets/images";
  @import "../style/theme";

  div {
    position: absolute;
    z-index: -100;

    width: 100vw;
    height: 100vh;

    background: url("$lib/assets/backdrop/backdrop.svg") center;
    background-size: cover;
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
