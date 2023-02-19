<script>
  import GoldMedal from "$lib/assets/gold_medal.webp"
  import SilverMedal from "$lib/assets/silver_medal.webp"
  import BronzeMedal from "$lib/assets/bronze_medal.webp"
  import BlackMedal from "$lib/assets/black_medal.webp"
</script>

<th style:background-image="url('{GoldMedal}')"><span class="a11y-hidden">Gold Medal</span></th>
<th style:background-image="url('{SilverMedal}')"><span class="a11y-hidden">Silver Medal</span></th>
<th style:background-image="url('{BronzeMedal}')"><span class="a11y-hidden">Bronze Medal</span></th>
<th style:background-image="url('{BlackMedal}')"><span class="a11y-hidden">Black Medal</span></th>

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
