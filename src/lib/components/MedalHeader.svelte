<script context="module">
  export const hydrate = false
</script>

<th class="gold-medal"><span class="a11y-hidden">Gold Medal</span></th>
<th class="silver-medal"><span class="a11y-hidden">Silver Medal</span></th>
<th class="bronze-medal"><span class="a11y-hidden">Bronze Medal</span></th>
<th class="black-medal"><span class="a11y-hidden">Black Medal</span></th>

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

  th {
    width: 44px;
    height: 66px;
    padding: 0;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
