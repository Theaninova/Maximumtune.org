<script lang="ts">
  export let direction: "normal" | "reverse" = "normal"
  export let orientation: "horizontal" | "vertical" = "horizontal"
  export let duration = 3
  export let type: "fade" | "slide" = "fade"
</script>

<div
  class:horizontal={orientation === "horizontal"}
  class:vertical={orientation === "vertical"}
  class="light-bar"
>
  <div
    class:fade={type === "fade"}
    class:slide={type === "slide"}
    class="light-bar-animation"
    style=" animation-duration: {duration}s;animation-direction: {direction};"
  />
</div>

<style lang="scss">
  @use "sass:color";
  @import "../style/theme";

  @keyframes light-bar-slide {
    0% {
      transform: translateX(-66%);
    }

    66% {
      transform: translateX(0%);
    }
  }

  @keyframes light-bar-fade {
    0% {
      opacity: 0;
      animation-timing-function: ease-in-out;
    }

    33% {
      opacity: 1;
      animation-timing-function: ease-in-out;
    }

    66% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @function light-bar-double($rotation, $a, $b) {
    @return linear-gradient(
      $rotation,
      transparent 0%,
      transparent 33%,
      transparent calc($a / 3 + 33%),
      $color-tertiary calc($b / 3 + 33%),
      transparent 66%,
      transparent 100%
    );
  }

  .fade {
    animation-name: light-bar-fade;
  }

  .slide {
    width: 300%;
    animation-name: light-bar-slide;
    animation-timing-function: linear;
  }

  .horizontal {
    height: 4px;

    > .fade {
      background-image: linear-gradient(to right, transparent, $color-tertiary, transparent);
    }

    > .slide {
      background-image: light-bar-double(to right, 40%, 60%);
    }
  }

  .vertical {
    width: 4px;
    height: 100%;

    > .fade {
      background-image: linear-gradient(to bottom, transparent, $color-tertiary, transparent);
    }

    > .slide {
      background-image: light-bar-double(to bottom, 40%, 60%);
    }
  }

  .light-bar {
    overflow: hidden;
    background-color: color.mix($color-tertiary-container, $color-surface-variant, 30%);
    border-radius: 2px;
  }

  .light-bar-animation {
    height: 100%;
    border: none;
    animation-iteration-count: infinite;
  }
</style>
