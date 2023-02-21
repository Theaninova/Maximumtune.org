<script lang="ts">
  import "$lib/style/global.scss"
  import PageTransition from "$lib/components/PageTransition.svelte"
  import Backdrop from "$lib/components/art/Backdrop.svelte"
  import {pwaInfo} from "virtual:pwa-info"
  import {fallbackLocale, locales} from "$lib/translations/translations"
  import {t} from "$lib/translations/translations"
  import {tPage} from "$lib/translations/translations"
  import {page} from "$app/stores"

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
  <title>{$t(`${$tPage}.meta.title`, $page.params)}</title>
  <meta
    name="description"
    content="{$t(`${$tPage}.meta.description`, $page.params)} - {$t(
      `${$tPage}.meta.description_suffix`,
      $page.params,
    )}"
  />
</svelte:head>

<PageTransition pathname={data.pathname}>
  <slot />
</PageTransition>

<Backdrop />
