<script context="module">
  export const prerender = true
  export const hydrate = false
</script>

<th class="battle-star"><span class="a11y-hidden">Battle Stars</span></th>
<th class="story-episodes"><span class="a11y-hidden">Story Episodes</span></th>
<th class="ghost-trophy"><span class="a11y-hidden">Ghost Trophies</span></th>

<style lang="scss">
  @import "../assets/images.scss";

  .ghost-trophy {
    background-image: url($ghost_trophy_66h);
  }
  .battle-star {
    background-image: url($battle_star_66h);
  }
  .story-episodes {
    background-image: url($story_mode_select_66h);
  }

  th {
    width: 44px;
    height: 66px;
    padding: 0;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
