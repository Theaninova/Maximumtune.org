<td>
  <input {...$$props} on:change />
</td>

<style lang="scss">
  @import "../../style/theme.scss";

  input,
  td {
    padding: 0;
    margin: 0;
  }

  input {
    width: 66px;
    height: 32px;
    text-align: center;

    background: $color-secondary-container;
    color: $color-on-secondary-container;
    box-shadow: $inset-shadow;

    border: none;
    appearance: none;
  }

  td:first-child > input {
    border-radius: $border-radius-left;
  }

  td:last-child > input {
    border-radius: $border-radius-right;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
