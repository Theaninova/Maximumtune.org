<td>
  <slot />
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

  td:first-child {
    border-radius: $border-radius-left;
  }

  td:last-child {
    border-radius: $border-radius-right;
  }

  td:after {
    content: "";
    display: block;
    position: absolute;
    width: 3px;
    height: 24px;
    transform: translate(-50%, -22px);
    animation: light-bar-vertical 1s ease infinite;
    background-image: light-bar(180deg, 1%, 25%, 10%);
    background-size: 100% 200%;
  }

  td:first-child:after {
    display: none;
  }
</style>
