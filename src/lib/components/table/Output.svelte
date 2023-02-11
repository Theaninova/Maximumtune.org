<script>
  import Lightbar from "../Lightbar.svelte"
</script>

<td>
  <div class="content-container">
    <div class="slot">
      <slot />
    </div>
    <Lightbar orientation="vertical" />
  </div>
</td>

<style lang="scss">
  @use "sass:color";
  @import "../../style/theme";

  td {
    width: 66px;
    height: 32px;
    margin: 0;
    padding: 0;

    color: $color-on-surface-variant;
    text-align: center;

    background-image: $black-3d-panel;
    box-shadow: color.adjust($color-on-surface-variant, $lightness: -60%) 0 0 3px 1px inset;
  }

  .content-container {
    display: grid;
    grid-template-columns: auto auto;
    justify-items: end;
    height: 100%;
  }

  .content-container > :global(*) {
    transform: translateX(2px);
  }

  .slot {
    align-self: center;
  }

  td:first-child {
    border-radius: $border-radius-left;
  }

  td:last-child {
    border-radius: $border-radius-right;
  }

  td:last-child > .content-container > :global(.light-bar) {
    display: none;
  }
</style>
