<script>
  export let showBackButton = false
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 1024 1024"
  xmlns="http://www.w3.org/2000/svg"
  xml:space="preserve"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;{showBackButton
    ? 'background: transparent'
    : ''}"
  ><path
    d="M512,82.551c-237.019,0 -429.449,192.43 -429.449,429.449c0,237.019 192.43,429.449 429.449,429.449c237.019,-0 429.449,-192.43 429.449,-429.449c-0,-237.019 -192.43,-429.449 -429.449,-429.449Zm0,30.898c219.966,-0 398.551,178.585 398.551,398.551c0,219.966 -178.585,398.551 -398.551,398.551c-219.966,0 -398.551,-178.585 -398.551,-398.551c-0,-219.966 178.585,-398.551 398.551,-398.551Z"
    style="fill:url(#_Linear1); filter: blur(10px) drop-shadow(0 0 10px #ffacef)"
    class="rotate"
  />
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
    <linearGradient
      id="_Linear1"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(828,0,0,828,98,512)"
      ><stop offset="0" style="stop-color:#ffacef;stop-opacity:1" />
      <stop offset="0.1" style="stop-color:#ba4daf;stop-opacity:1" />
      <stop offset="0.5" style="stop-color:#83007c;stop-opacity:1" />
      <stop offset="0.92" style="stop-color:#c156b6;stop-opacity:1" />
      <stop offset="1" style="stop-color:#ffacef;stop-opacity:1" /></linearGradient
    >
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

  svg {
    background-image: url($mt_logo_inner);
    background-size: contain;
  }

  .rotate {
    transform-origin: 512px 512px;
    animation: rotate 4s linear infinite;
  }
</style>
