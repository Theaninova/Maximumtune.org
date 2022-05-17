<script>
  export let showBackButton = false
</script>

<div class="container">
  <div class="circle container">
    <div />
    <div />
  </div>

  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;{showBackButton
      ? 'background: transparent'
      : ''}"
  >
    <circle cx="512" cy="512" r="410.5" style="fill:url(#_Radial2);" />
    <path
      d="M576.707,395.347l-165.166,116.653l165.166,116.653l-0,74.688l-270.914,-191.341l270.914,-191.341l-0,74.688Z"
      style="fill:url(#back-fill); filter: blur(8px) drop-shadow(0 0 80px #ffacef); opacity: {showBackButton
        ? '1'
        : '0'}"
    />
    <!-- back icon -->

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
      <radialGradient
        id="_Radial2"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(292.443,-145.217,90.3011,181.851,417,311)"
        ><stop offset="0" style="stop-color:#fff;stop-opacity:0.44" />
        <stop offset="1" style="stop-color:#a6a6a6;stop-opacity:0" /></radialGradient
      ></defs
    >
  </svg>
</div>

<style lang="scss">
  @import "../assets/images.scss";

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
    > * {
      grid-row: 1;
      grid-column: 1;
    }
  }

  .circle {
    width: 88%;
    aspect-ratio: 1;
    filter: blur(1px);

    animation: rotate 4s linear infinite;

    > div {
      background: linear-gradient(to right, #ffacef 0%, #ba4daf 10%, #83007c 50%, #c156b6 90%, #ffacef 100%);
      border-radius: 50%;
      width: 100%;
      aspect-ratio: 1;
    }

    > div:last-child {
      width: calc(100% - 10px);
      background: black;
    }
  }

  svg {
    background-image: url($mt_logo_inner);
    background-size: contain;
  }
</style>
