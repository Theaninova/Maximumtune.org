<script lang="ts">
  export let direction: "normal" | "reverse" = "normal"
  export let duration = 3
</script>

<div class="light-bar-container">
  <div class="light-bar" style="animation-direction: {direction}; animation-duration: {duration}s" />
</div>

<style lang="scss">
  @import "../style/theme";

  @keyframes light-bar-transform {
    0% {
      transform: translateX(-66%);
    }
    66% {
      transform: translateX(0%);
    }
  }

  @function light-bar-double($rotation, $a, $b, $darken: 30%) {
    @return linear-gradient(
      $rotation,
      mix($color-tertiary-container, $color-surface-variant, $darken) 0%,
      mix($color-tertiary-container, $color-surface-variant, $darken) 33%,
      mix($color-tertiary-container, $color-surface-variant, $darken) ($a / 3 + 33%),
      $color-tertiary ($b / 3 + 33%),
      mix($color-tertiary-container, $color-surface-variant, $darken) 66%,
      mix($color-tertiary-container, $color-surface-variant, $darken) 100%
    );
  }

  .light-bar-container {
    border-radius: 2px;
    overflow: hidden;
    height: 4px;

    filter: blur(1px);
  }

  .light-bar {
    background-image: light-bar-double(90deg, 40%, 60%);
    box-shadow: $color-tertiary-container 0 0 20px;
    border: none;
    width: 300%;
    height: 100%;

    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: light-bar-transform;
  }
</style>
