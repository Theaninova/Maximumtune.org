<a {...$$props}>
  <h3 class="center">
    <slot />
    <span><slot name="sub" /></span>
    <div class="box center">
      <slot name="box" />
    </div>
  </h3>
</a>

<style lang="scss">
  @import "../style/theme.scss";

  a {
    transform: scale(1);
    transition: transform 0.2s cubic-bezier(0.1, 0.75, 0.23, 1.77);

    @include hover() {
      transform: scale(1.2);
    }
  }

  a {
    display: flex;
    height: 150px;
    width: 150px;
    background: radial-gradient(circle at 50% -40%, #fff2, #fff2 60%, #fff0 61%),
      radial-gradient(circle at 50% 40%, #cecece, #111 50%, #000 80%);
    border-radius: 50%;
    border-style: ridge;
    border-width: 6px;
    border-color: #f1f1f1;
    text-decoration: unset;

    box-shadow: #000 0 0 10px, #000 0 0 6px inset;

    margin: 8px;
  }

  .box {
    background: linear-gradient(to top, #c2c2c2 20%, #fefefe 60%);
    height: 50px;
    width: 90px;
    border-radius: 4px;
    color: #2d2d2d;
    text-shadow: #aaa 0 0 10px;

    box-shadow: $inset-shadow;
    text-align: center;
  }

  h3 {
    transform: translateY(-3px);
    font-size: 26px;
    font-weight: bolder;
    font-stretch: 110%;
    color: #dedede;

    text-align: center;
    text-shadow: #000 0 0 6px;

    margin: auto;
  }

  span {
    font-size: 16px;
  }
</style>
