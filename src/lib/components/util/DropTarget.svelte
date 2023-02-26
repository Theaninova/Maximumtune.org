<!-- @hmr:keep-all -->
<script lang="ts">
  /* eslint-disable no-undef */
  let dragging = false
  export let folder: FileSystemDirectoryEntry | undefined
  export let files: File[] | undefined

  function fileChange(itemList: DataTransferItemList) {
    if (itemList.length > 0) {
      files = []
      for (const entry of itemList) {
        files.push(entry.getAsFile())
      }
    } else {
      const webkitEntry = itemList[0].webkitGetAsEntry()
      if (!webkitEntry) {
        window.alert("Could not find anything here :(")
        return
      }

      folder = webkitEntry as FileSystemDirectoryEntry
    }

    dragging = false
  }
</script>

<svelte:window
  on:dragenter={() => (dragging = true)}
  on:dragleave={() => (dragging = false)}
  on:dragend={() => (dragging = false)}
  on:drop|preventDefault={event => fileChange(event.dataTransfer.items)}
  on:dragover|preventDefault={() => (dragging = true)}
/>
<div class="file-box" class:dragging class:has-content={!!folder || !!files}>
  <span><slot /></span>
</div>

<style lang="scss">
  .file-box {
    $drag-box-color: gray;
    $plus-size: 10vh;

    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;

    width: 100vw;
    margin-inline: 0;

    transition: all 120ms ease;

    &::after,
    &::before,
    & > span {
      content: "";

      position: absolute;
      top: 0;
      left: 0;

      opacity: 0.5;

      transition: all 120ms ease;
    }

    &::after {
      right: 0;
      bottom: 0;

      margin: 32px;

      background: rgba($drag-box-color, 0.3);
      border-radius: 16px;
      outline: 2px dashed $drag-box-color;
      outline-offset: 16px;
    }

    span,
    &::before {
      content: "+";

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      font-size: $plus-size;
      color: $drag-box-color;
    }

    span {
      transform: translate(-50%, calc(-50% + ($plus-size / 2 + 16px)));
      font-size: 32px;
    }

    &.has-content {
      opacity: 0;
    }

    &.dragging,
    &.dragging::before,
    &.dragging::after {
      opacity: 1;
    }
  }
</style>
