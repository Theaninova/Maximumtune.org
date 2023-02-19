<svelte:options immutable={true} />

<script>
  import {storyRank} from "$lib/tools/data/story-rank"
  import transform from "$lib/tools/data/ranks.ts?raw"
  import {ranks} from "$lib/tools/data/ranks"
  import StoryRank from "$lib/components/StoryRank.svelte"
  import Meta from "$lib/components/page/Meta.svelte"

  $: longestList = [
    ...Object.values(storyRank)
      .map(it => it.initial)
      .reduce((a, b) => (a.length > b.length ? a : b)),
    undefined,
    undefined,
  ]

  $: rankGroups = ranks.reduce((accumulator, current) => {
    accumulator[current.name] = accumulator[current.name] || []
    accumulator[current.name].push(current)
    return accumulator
  }, {})

  $: rankList = Array.from({length: 9})
</script>

<Meta title="Story Rank Info" />

<div class="subtitle">
  <h1>Story Rank Info</h1>
</div>

<h2>How we calculate your story rank</h2>

<p>
  The full source code is available on <a
    href="https://github.com/Theaninova/mmtorg/blob/master/src/lib/tools/story-calculator.ts">GitHub</a
  >
</p>

<p>Story rank is based on three independent sets of ranks, that each individually can trigger a rank up</p>

<table>
  <caption>Thresholds</caption>
  <thead>
    <tr>
      {#each Object.values(storyRank) as { name }}
        <th>{name}</th>
      {/each}
    </tr>
  </thead>
  {#each longestList as _, i}
    <tr>
      {#each Object.values(storyRank) as { initial, increment }}
        <td
          >{initial[i] ||
            (initial.length === i ? `+${increment}` : initial.length + 1 === i ? "..." : "")}</td
        >
      {/each}
    </tr>
  {/each}
</table>

<p>We also generate the rank names, which can be seen below</p>

<pre>
  <code>
{transform}
  </code>
</pre>

<table>
  <thead>
    <tr>
      {#each Object.keys(rankGroups) as name}
        <th>{name}</th>
      {/each}
    </tr>
  </thead>
  {#each rankList as _, i}
    <tr>
      {#each Object.values(rankGroups) as list}
        <td style="zoom: 50%">
          {#if list[i]}
            <StoryRank rank={list[i]} style="width: 120px; margin: 0; padding: 0 8px" />
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</table>

<br />

<style>
  tr {
    text-align: center;
  }
</style>
