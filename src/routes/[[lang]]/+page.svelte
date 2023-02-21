<script lang="ts">
  import Posts from "$lib/components/Posts.svelte"
  import {browser} from "$app/environment"
  import Lightbar from "$lib/components/Lightbar.svelte"
  import {onMount} from "svelte"
  import {pwaInfo} from "virtual:pwa-info"
  import {t} from "$lib/translations/translations"
  import Badge from "$lib/components/buttons/Badge.svelte"
  import StoryRank from "$lib/assets/badge_overlay_story.webp"
  import TimeSplits from "$lib/assets/badge_overlay_time_attack.webp"
  import Vs from "$lib/assets/badge_overlay_vs.webp"
  import {fallbackLocale, locale} from "$lib/translations/translations"
  import HeaderPadding from "$lib/components/HeaderPadding.svelte"
  import Slider from "$lib/components/Slider.svelte"

  onMount(async () => {
    pwaInfo && (InstallNotice = (await import("$lib/components/InstallNotice.svelte")).default)
  })

  export let data
  export let online = browser ? window.navigator.onLine : true
  let InstallNotice
</script>

<svelte:window on:offline={(online = false)} on:online={(online = true)} />

<div>
  <Slider horizontal={true}>
    <Badge
      href="./tools/battle-grade-calculator/"
      title={$t("/.calculators.battle_grade.title")}
      subtitle={$t("/.calculators.battle_grade.subtitle")}
      imageHref={Vs}
      color="red"
    />
    <Badge
      href="./tools/story-rank-calculator/"
      title={$t("/.calculators.story_rank.title")}
      subtitle={$t("/.calculators.story_rank.subtitle")}
      imageHref={StoryRank}
    />
    <Badge
      href="./tools/splits-calculator/"
      title={$t("/.calculators.time_splits.title")}
      subtitle={$t("/.calculators.time_splits.subtitle")}
      imageHref={TimeSplits}
      color="blue"
    />
  </Slider>
  <!--<section>
    <h2>{$t("/.calculators.title")}</h2>
    <Lightbar />
    <div class="calculator-grid">
      <Badge
        href="./tools/battle-grade-calculator/"
        title={$t("/.calculators.battle_grade.title")}
        subtitle={$t("/.calculators.battle_grade.subtitle")}
        imageHref={Vs}
        color="red"
      />
      <Badge
        href="./tools/story-rank-calculator/"
        title={$t("/.calculators.story_rank.title")}
        subtitle={$t("/.calculators.story_rank.subtitle")}
        imageHref={StoryRank}
      />
      <Badge
        href="./tools/splits-calculator/"
        title={$t("/.calculators.time_splits.title")}
        subtitle={$t("/.calculators.time_splits.subtitle")}
        imageHref={TimeSplits}
        color="blue"
      />
    </div>
  </section>-->
  <section>
    <p>{$t("/.slogan")}</p>
    <p>
      {@html $t("/.issues", {
        email: `<a href="mailto:ama@maximumtune.org">ama@maximumtune.org</a>`,
        github: `<a rel="noreferrer" target="_blank" href="https://github.com/Theaninova/mmtorg/issues/new">GitHub</a>`,
      })}
    </p>
    {#if $locale !== fallbackLocale}
      <p>
        {@html $t("/.translations_info", {
          email: `<a href="mailto:ama@maximumtune.org">ama@maximumtune.org</a>`,
        })}
      </p>
    {/if}
    <p><em>{$t("/.disclaimer")}</em></p>

    {#if InstallNotice}
      <svelte:component this={InstallNotice} />
    {/if}
  </section>

  <section>
    <h2>{$t("/.info.title")}</h2>
    <Lightbar />
    <a href="./faq/">{$t("/.info.faq")}</a>
    <a href="./about/">{$t("/.info.about")}</a>
  </section>

  <section>
    {#if online}
      <h2>{$t("/.posts.title")}</h2>
      <Lightbar />
      <Posts posts={data.posts} />
    {:else}
      <h2>{$t("/.posts.offline.title")}</h2>
      <Lightbar />
      <p>Posts aren't available while you're offline :(</p>
    {/if}
  </section>
</div>

<style lang="scss">
  section > h2 {
    transform: skew(-10deg);
    margin-bottom: 8px;
  }

  section > :global(.light-bar) {
    width: 60px;
    margin: 0;
  }

  .calculator-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
</style>
