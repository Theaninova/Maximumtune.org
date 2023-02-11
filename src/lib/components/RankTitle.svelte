<h2 {...$$props}><slot /></h2>

<style lang="scss">
  @import "../style/theme";

  h2 {
    min-height: 32px;
    padding: 8px 32px;

    font-stretch: 150%;

    border-style: double solid;
    border-width: 10px;
    border-radius: 20px;
  }
</style>
