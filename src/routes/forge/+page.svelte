<!-- @hmr:keep-all -->
<script lang="ts">
  /* eslint-disable no-undef */
  import DropTarget from "$lib/components/util/DropTarget.svelte"
  import {GameInfo} from "$lib/forge/analyzer"
  import type {Info} from "$lib/forge/analyzer"
  import ForgeContent from "$lib/forge/ForgeContent.svelte"

  let folder: FileSystemDirectoryEntry
  let selected: Info
  $: gameInfo = folder ? new GameInfo(folder) : undefined
  $: interfaceConfig = gameInfo
    ? [
        ["Stages", gameInfo.stages],
        ["Cars", gameInfo.cars],
        ["Music", gameInfo.music],
      ]
    : undefined
</script>

<DropTarget bind:folder>Game Folder</DropTarget>

{#if interfaceConfig}
  {#if selected}
    <ForgeContent {selected} />
  {/if}
  <div class="interface">
    {#each interfaceConfig as [title, info]}
      <section>
        <h2>{title}</h2>
        {#await info then info}
          {#each info as info}
            <li>
              <label
                >{info.fileSystem.name}<input
                  value={info}
                  name="selection"
                  type="radio"
                  bind:group={selected}
                /></label
              >
            </li>
          {/each}
        {/await}
      </section>
    {/each}
  </div>
{/if}

<style lang="scss">
  :global(::-webkit-scrollbar) {
    width: 8px;
    background-color: transparent;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: rgba(128 128 128 / 40%);
    transition: background 150ms ease;

    &:hover {
      background: rgba(128 128 128 / 80%);
    }
  }

  .interface {
    scrollbar-gutter: stable;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    overflow-x: hidden;
    overflow-y: scroll;

    width: min-content;
    margin: 0;
    padding: 16px;

    background: rgba(0 0 0 / 60%);
    background-blend-mode: darken;
  }

  li {
    list-style: none;
  }

  label:has(input[type="radio"]) {
    cursor: pointer;
    user-select: none;
    display: block;
    transition: all 200ms ease;

    &:has(:checked) {
      padding: 4px;
      background: rgba(128 128 128 / 30%);
    }

    &:has(:checked) > *,
    &:hover > * {
      transform: translateX(16px);
    }

    input {
      display: none;
    }
  }

  .options {
    display: flex;
  }
</style>
