<script lang="ts">
  /* eslint-disable no-undef */
  import DropTarget from "$lib/components/util/DropTarget.svelte"
  import {GameInfo} from "../../../lib/tools/forge/analyzer"

  let folder: FileSystemDirectoryEntry
  $: gameInfo = folder ? new GameInfo(folder) : undefined
</script>

<DropTarget bind:folder>Game Folder</DropTarget>

{#if gameInfo}
  <div class="categories">
    {#each [["Stages", gameInfo.stages], ["Cars", gameInfo.cars], ["Music", gameInfo.music]] as [title, info]}
      <h1>{title} {#await info then info}<span>{info.length}</span>{/await}</h1>
    {/each}
  </div>
{/if}

<style lang="scss">
  .categories {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;

    max-width: calc(100vw - 64px);
    margin: 32px;
    margin-block: auto;

    > h1 {
      all: unset;

      cursor: pointer;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      aspect-ratio: 1;

      font-size: 5vh;
      font-weight: bold;

      background: rgb(128 128 128 / 20%);
      border-radius: 32px;
      outline: 4px solid rgb(128 128 128 / 20%);
      outline-offset: 8px;

      transition: all 150ms ease;

      > span {
        font-size: 0.5em;
        opacity: 0.7;
      }

      &:hover {
        transform: scale(0.9);
        background: rgb(128 128 128 / 40%);
        outline: 4px solid rgb(128 128 128 / 40%);
        outline-offset: 32px;
      }
    }
  }

  .options {
    display: flex;
  }
</style>
