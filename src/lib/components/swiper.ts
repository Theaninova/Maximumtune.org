import type {ActionReturn} from "svelte/action"
import {register} from "swiper/element/bundle"

export function swiper(node: HTMLElement): ActionReturn {
  register()

  node.shadowRoot!.querySelector(".swiper-wrapper")!.setAttribute("part", "wrapper")
  node.shadowRoot!.querySelector(".swiper-button-next")?.setAttribute("part", "button-next")
  node.shadowRoot!.querySelector(".swiper-button-prev")?.setAttribute("part", "button-prev")

  return {}
}
