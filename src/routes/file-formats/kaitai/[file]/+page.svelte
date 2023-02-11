<script>
  import highlight from "highlight.js"
  import "highlight.js/scss/github-dark.scss"
  export let data
</script>

<h1>Kaitai File</h1>

<div>
  <a download={data.fileName} href="/kaitai/raw/{data.fileName}">Download</a>
  <a rel="noreferrer" target="_blank" href="https://kaitai.io/#what-is-it">What's Kaitai?</a>
</div>

<pre><button on:click={navigator.clipboard.writeText(data.file)}>copy</button><code class="language-yaml"
    >{@html highlight.highlight(data.file, {language: "yaml"}).value}<code /></code
  ></pre>

<style lang="scss">
  @import "src/lib/style/theme.scss";

  pre {
    position: relative;
  }

  button {
    position: absolute;
    right: 8px;
    top: 8px;
    border: none;
    background: none;
    color: $color-tertiary;
    cursor: pointer;

    &:hover {
      color: $color-tertiary-container;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  pre {
    background: rgba(0, 0, 0, 0.6);
    padding: 16px;
    border-radius: 32px;
    border: 6px ridge #cecece;
  }
</style>
