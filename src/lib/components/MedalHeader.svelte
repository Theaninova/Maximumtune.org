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
    background-image: url($gold_medal_66h);
  }
  .silver-medal {
    background-image: url($silver_medal_66h);
  }
  .bronze-medal {
    background-image: url($bronze_medal_66h);
  }
  .black-medal {
    background-image: url($black_medal_66h);
  }

  td {
    width: 44px;
    height: 66px;
    padding: 0;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
