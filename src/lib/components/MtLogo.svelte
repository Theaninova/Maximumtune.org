<script>
  import InnerLogo from "../assets/raw/maximumtune_org_logo_inner.svg"

  export let showBackButton = false
</script>

<div class="container">
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="white"
      style:opacity={showBackButton ? "0" : "1"}
      d="M117.61,780.99c-52.41,-76.614 -83.059,-169.251 -83.059,-268.99c0,-263.511 213.938,-477.449 477.449,-477.449c186.619,0 348.374,107.3 426.859,263.538l-106.907,7.296c-67.877,-104.857 -185.871,-174.286 -319.952,-174.286c-210.225,0 -380.901,170.676 -380.901,380.901c0,46.733 8.434,91.512 23.891,132.913l-37.38,136.077Zm848.51,-416.592c15.152,46.464 23.329,96.086 23.329,147.602c-0,48.697 -7.306,95.701 -20.903,139.973l-88.131,-43.034c8.155,-30.965 12.486,-63.45 12.486,-96.939c-0,-35.486 -4.863,-69.845 -13.977,-102.443l87.196,-45.159Z"
    />

    <circle
      cx="512"
      cy="512"
      r="480"
      stroke-width="50"
      stroke="white"
      style:opacity={showBackButton ? "1" : "0"}
    />
  </svg>

  <div class="circle container">
    <div />
  </div>

  <img src={InnerLogo} alt="Maximumtune.org" style:opacity={showBackButton ? "0" : "1"} />

  <svg width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M576.707,395.347l-165.166,116.653l165.166,116.653l-0,74.688l-270.914,-191.341l270.914,-191.341l-0,74.688Z"
      style="filter: blur(8px) drop-shadow(0 0 80px #ffacef); fill:url('#back-fill')"
      style:opacity={showBackButton ? "1" : "0"}
    />

    <defs>
      <linearGradient
        id="back-fill"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(412.5,0,0,223.86,235,512)"
      >
        <stop offset="0" style="stop-color:#ffacef;stop-opacity:1" />
        <stop offset="0.25" style="stop-color:#ba4daf;stop-opacity:1" />
        <stop offset="0.63" style="stop-color:#c156b6;stop-opacity:1" />
        <stop offset="1" style="stop-color:#ffacef;stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>
</div>

<style lang="scss">
  @import "../assets/images";

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .container {
    display: grid;
    align-items: center;
    justify-items: center;

    width: 100%;
    height: 100%;

    > * {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .circle {
    aspect-ratio: 1;
    width: 88%;

    background: linear-gradient(to right, #ffacef 0%, #ba4daf 10%, #83007c 50%, #c156b6 90%, #ffacef 100%);
    border-radius: 50%;
    mix-blend-mode: multiply;

    animation: rotate 4s linear infinite;
  }

  svg,
  img {
    aspect-ratio: 1;
    width: 90%;
  }

  img {
    transform: scale(-1);
    filter: brightness(100%);
  }
</style>
