<script lang="ts">
  import "$lib/style/global.scss"
  import PageTransition from "$lib/components/PageTransition.svelte"
  import Backdrop from "$lib/components/art/Backdrop.svelte"
  import {pwaInfo} from "virtual:pwa-info"
  import {fallbackLocale, locales} from "$lib/translations/translations"
  import {t} from "$lib/translations/translations"

  export let data
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ""
</script>

<svelte:head>
  {@html webManifest}
  {#each locales as locale}
    <link
      rel="alternate"
      hreflang={locale}
      href="{locale === fallbackLocale ? '' : `/${locale}`}{data.pathname}"
    />
  {/each}
  <title>{$t(`${data.routeId}.meta.title`, data.params)}</title>
  <meta
    name="description"
    content="{$t(`${data.routeId}.meta.description`, data.params)} - {$t(
      `${data.routeId}.meta.description_suffix`,
      data.params,
    )}"
  />
</svelte:head>

<PageTransition pathname={data.pathname}>
  <slot />
</PageTransition>

<Backdrop />
