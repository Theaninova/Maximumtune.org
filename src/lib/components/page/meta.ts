import {writable} from "svelte/store"

export const title = writable<string>("")

export const displayTitle = writable<string | undefined>(undefined)

export const parent = writable("/")
