<script>
  import highlight from "highlight.js"
  import "highlight.js/scss/github-dark.scss"
  export let data
</script>

<h1>Kaitai File</h1>

<div>
  <a download={data.fileName} href={data.url}>Download</a>
  <a rel="noreferrer" target="_blank" href="https://kaitai.io/#what-is-it">What's Kaitai?</a>
</div>

<pre><button on:click={navigator.clipboard.writeText(data.file)}>copy</button><code class="language-yaml"
    >{@html highlight.highlight(data.file, {language: "yaml"}).value}<code /></code
  ></pre>

<style lang="scss">
  @import "src/lib/style/theme";

  pre {
    position: relative;

    padding: 16px;

    background: rgb(0 0 0 / 60%);
    border: 6px ridge #cecece;
    border-radius: 32px;
  }

  button {
    cursor: pointer;

    position: absolute;
    top: 8px;
    right: 8px;

    color: $color-tertiary;

    background: none;
    border: none;

    &:hover {
      color: $color-tertiary-container;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
  }
</style>
