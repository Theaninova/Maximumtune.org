<td>
  <input {...$$props} on:input />
</td>

<style lang="scss">
  @import "../../style/theme";

  input,
  td {
    margin: 0;
    padding: 0;
  }

  input {
    width: 66px;
    height: 32px;

    color: $color-on-secondary-container;
    text-align: center;

    appearance: none;
    background: $color-secondary-container;
    border: none;
    outline: none;
    box-shadow: $inset-shadow;

    &:focus-visible {
      color: $color-on-secondary;
      background: $color-secondary;
    }
  }

  td:first-child > input {
    border-radius: $border-radius-left;
  }

  td:last-child > input {
    border-radius: $border-radius-right;
  }
</style>
