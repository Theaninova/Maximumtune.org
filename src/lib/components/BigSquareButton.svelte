<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shinyBorder" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#fff" />
      <stop offset="25%" stop-color="#424242" />
      <stop offset="50%" stop-color="#cbcbcb" />
      <stop offset="75%" stop-color="#424242" />
      <stop offset="100%" stop-color="#fff" />
    </linearGradient>
    <linearGradient id="shinyBorderAccent" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#b1afb1" />
      <stop offset="25%" stop-color="#424242" />
      <stop offset="50%" stop-color="#cbcbcb" />
      <stop offset="75%" stop-color="#424242" />
      <stop offset="100%" stop-color="#b1afb1" />
    </linearGradient>
    <filter id="shadow" x="0" y="0" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="#000" flood-opacity="1" />
    </filter>
    <filter id="insetShadow">
      <feGaussianBlur stdDeviation="1" result="offset-blur" />
      <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
      <feFlood flood-color="black" flood-opacity="1" result="color" />
      <feComposite operator="in" in="color" in2="inverse" result="shadow" />
      <feComponentTransfer in="shadow" result="shadow">
        <feFuncA type="linear" slope="1" />
      </feComponentTransfer>
    </filter>
    <pattern id="leather" viewBox="0 0 10 10" width="1.5%" height="1.5%">
      <rect width="5" height="2" fill="#312829" />
      <rect x="5" y="5" width="5" height="2" fill="#312829" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="white" />

  <rect x="5" y="5" width="90" height="90" rx="10" fill="#423d39" />
  <rect x="5" y="5" width="90" height="90" rx="10" fill="url(#leather)" />
  <rect x="5" y="5" width="90" height="90" rx="10" fill="none" filter="url(#insetShadow)" />
  <rect
    x="5"
    y="5"
    width="90"
    height="90"
    rx="10"
    fill="none"
    stroke-width="2"
    stroke="url(#shinyBorder)"
    style="filter: drop-shadow(0 0 1px black);"
  />
  <rect
    x="5"
    y="5"
    width="90"
    height="90"
    rx="10"
    fill="none"
    stroke-width="0.6"
    stroke="url(#shinyBorderAccent)"
  />
</svg>
