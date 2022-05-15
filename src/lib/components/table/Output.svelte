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
  @import "../../style/theme.scss";

  td {
    padding: 0;
    margin: 0;

    width: 66px;
    height: 32px;
    text-align: center;

    background-image: $black-3d-panel;
    box-shadow: darken($color-on-surface-variant, 60%) 0 0 3px 1px inset;
    color: $color-on-surface-variant;
  }

  .content-container {
    height: 100%;

    display: grid;
    grid-template-columns: auto auto;
    justify-items: end;
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
