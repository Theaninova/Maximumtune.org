<script>
  import {GRADES} from "../../../lib/tools/data/grades-data"
  import {grades} from "../../../lib/tools/data/grades"
  import transform from "../../../lib/tools/data/grades.ts?raw"
  import MedalHeader from "../../../lib/components/MedalHeader.svelte"
  import {medalValues} from "../../../lib/tools/data/medal-values"
</script>

<svelte:head>
  <title>Battle Grade Info</title>
  <meta name="description" content="How to calculate Battle Grade in Wangan Midnight Maximum Tune" />
</svelte:head>

<div class="subtitle">
  <h1>Battle Grade Info</h1>
</div>

<h2>How we calculate your battle grade</h2>

<p>
  The full source code is available on <a
    href="https://github.com/Theaninova/mmtorg/blob/master/src/lib/tools/aura-calculator.ts">GitHub</a
  >
</p>

<section>
  <table style="border-spacing: 8px">
    <caption>Medal Values</caption>
    <thead>
      <tr>
        <MedalHeader />
      </tr>
    </thead>
    <tr>
      {#each Object.entries(medalValues) as [_, value]}
        <td>{value}</td>
      {/each}
    </tr>
  </table>
</section>

<table>
  <caption>Grade Data (<a href="https://wikiwiki.jp/wmmt">Source</a>)</caption>
  <thead>
    <tr>
      <th>Grade</th>
      <th>Title</th>
      <th>VS</th>
      <th>Ace</th>
      <th>Pro</th>
    </tr>
  </thead>
  {#each Object.entries(GRADES) as [grade, points], i}
    <tr>
      <td>{i + 1}</td>
      <td>{grade}</td>
      {#each points as point}
        <td>{point}</td>
      {/each}
    </tr>
  {/each}
</table>

<p>These are then transformed using the function below to the following list</p>

<pre>
  <code>
{transform.replace(/^[^\n]*\n/, "").replace(/(^|\n) *(\n|$)/g, "")}
  </code>
</pre>

<table>
  <thead>
    <tr>
      <th>Points</th>
      <th>Name</th>
    </tr>
  </thead>
  {#each grades as [points, name]}
    <tr>
      <td>{points}</td>
      <td>{name}</td>
    </tr>
  {/each}
</table>

<style>
  td {
    text-align: center;
  }
</style>
