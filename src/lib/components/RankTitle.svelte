<h2 {...$$props}><slot /></h2>

<style lang="scss">
  @import "../style/theme.scss";

  h2 {
    min-height: 32px;
    padding: 8px 32px;

    border-radius: 20px;
    border-width: 10px;
    border-style: double solid;

    font-stretch: 150%;
  }
</style>
