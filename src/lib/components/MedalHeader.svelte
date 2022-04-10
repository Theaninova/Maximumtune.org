<script context="module">
  export const prerender = true
  export const hydrate = false
</script>

<td class="gold-medal"><span class="a11y-hidden">Gold Medal</span></td>
<td class="silver-medal"><span class="a11y-hidden">Silver Medal</span></td>
<td class="bronze-medal"><span class="a11y-hidden">Bronze Medal</span></td>
<td class="black-medal"><span class="a11y-hidden">Black Medal</span></td>

<style lang="scss">
  @import "../assets/images.scss";

  .gold-medal {
    background-image: url($gold_medal_64w);
  }
  .silver-medal {
    background-image: url($silver_medal_64w);
  }
  .bronze-medal {
    background-image: url($bronze_medal_64w);
  }
  .black-medal {
    background-image: url($black_medal_64w);
  }

  td {
    width: 48px;
    height: 64px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
