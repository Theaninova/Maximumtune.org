/** @type {Partial<import("vite-plugin-pwa").ManifestOptions>} */
export const manifest = {
  name: "Maximumtune.org",
  short_name: "Maximumtune",
  description:
    "The no. 1 resource for maximum tune. Built with ❤️, high quality, free, no ads, no tracking, no bullshit.",
  start_url: "/",
  theme_color: "#1C1B1F",
  background_color: "#290021",
  display: "standalone",
  orientation: "portrait-primary",
  categories: ["games"],
  shortcuts: [
    {
      name: "Battle Grade",
      short_name: "Grade",
      url: "/tools/battle-grade-calculator/",
      description: "Battle Grade Calculator",
      icons: [
        {
          src: "/shortcuts/icon_battle_grade.png",
          sizes: "96x96",
          purpose: "any",
        },
      ],
    },
    {
      name: "Story Rank",
      short_name: "Story",
      url: "/tools/story-rank-calculator/",
      description: "Story Rank Calculator",
      icons: [
        {
          src: "/shortcuts/icon_story_rank.png",
          sizes: "96x96",
          purpose: "any",
        },
      ],
    },
    {
      name: "Time Splits",
      short_name: "Splits",
      url: "/tools/splits-calculator/",
      description: "Time Splits Calculator",
      icons: [
        {
          src: "/shortcuts/icon_time_splits.png",
          sizes: "96x96",
          purpose: "any",
        },
      ],
    },
  ],
  screenshots: [
    {
      src: "/screenshots/narrow/splits.png",
      type: "image/png",
      sizes: "828x1792",
      platform: "narrow",
      label: "Time Splits Calculator",
    },
    {
      src: "/screenshots/narrow/grade.png",
      type: "image/png",
      sizes: "828x1792",
      platform: "narrow",
      label: "Battle Grade Calculator",
    },
    {
      src: "/screenshots/narrow/home.png",
      type: "image/png",
      sizes: "828x1792",
      platform: "narrow",
      label: "Home Screen",
    },
  ],
  icons: [
    {
      src: "icons/icon-v2-1-128x128.png",
      sizes: "128x128",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "icons/icon-v2-1-256x256.png",
      sizes: "256x256",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "icons/icon-v2-1-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "icons/icon-v2-2-128x128.png",
      sizes: "128x128",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "icons/icon-v2-2-256x256.png",
      sizes: "256x256",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "icons/icon-v2-2-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
}
