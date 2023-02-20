<script lang="ts">
  import {tableOrder} from "./file-format-list"
  import type {FileFormat} from "./file-format-list"

  export let format: FileFormat
</script>

{#each tableOrder as { field, type, transform }, i}
  {@const content = transform?.(format[field]) ?? format[field] ?? ""}
  {#if i === 0}
    <th>{content}</th>
  {:else}
    <td solved={type === "solved state" ? content : false}>
      {#if type !== "solved state" && format[field]}
        {#if type === "link"}
          <a href={format[field]}>{content}</a>
        {:else}
          {content}
        {/if}
      {/if}</td
    >
  {/if}
{/each}

<style lang="scss">
  th {
    text-align: start;
  }

  td:not(:first-child) {
    text-align: center;
  }

  td[unknown]::after {
    content: "?";
    color: red;
  }

  td[solved="yes"]::after {
    content: "✓";
    color: green;
  }

  td[solved="no"]::after {
    content: "✗";
    color: red;
  }

  td[solved="partial"]::after {
    content: "(✓)";
    color: orange;
  }

  td[solved="wip"]::after {
    content: "WIP";
    color: orange;
  }

  td[binary]::after {
    content: "bin";
  }

  td[text]::after {
    content: "text";
    color: green;
  }
</style>
