<script lang="ts">
  import type {LumenAnimation} from "./lumen-types.ts"

  export let animation: LumenAnimation
</script>

{#if animation.key !== "skewY"}
  <animateTransform
    attributeName="transform"
    attributeType="XML"
    type={animation.key === "position" ? "translate" : animation.key}
    calcMode={animation.interpolation}
    dur="{animation.duration}s"
    keyTimes={animation.keyTimes.join(";")}
    values={animation.values.join(";")}
    repeatCount="indefinite"
    additive="sum"
  />
{/if}
