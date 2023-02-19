<script>
  import GhostTrophy from "$lib/assets/ghost_trophy_66h.webp"
  import BattleStar from "$lib/assets/battle_star_66h.webp"
  import StoryModeSelect from "$lib/assets/story_mode_select_66h.webp"
</script>

<th style:background-image="url('{BattleStar}')"><span class="a11y-hidden">Battle Stars</span></th>
<th style:background-image="url('{StoryModeSelect}')"><span class="a11y-hidden">Story Episodes</span></th>
<th style:background-image="url('{GhostTrophy}')"><span class="a11y-hidden">Ghost Trophies</span></th>

<style lang="scss">
  span {
    display: none;
  }

  th {
    width: 44px;
    height: 66px;
    padding: 0;

    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>
