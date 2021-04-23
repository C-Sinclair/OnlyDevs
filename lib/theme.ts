export const theme = {
  colours: {
    pastel: [
      // pastel-y as fuck
      "#FFCBF2",
      "#F3C4FB",
      "#ECBCFD",
      "#E5B3FE",
      "#E2AFFF",
      "#DEAAFF",
      "#D8BBFF",
      "#D0D1FF",
      "#C8E7FF",
      "#C0FDFF",
    ] as const,
    background: ["#181a1b"] as const,
  },
  sizes: {
    topbar: {
      height: 80,
    },
    sidebar: {
      width: 250,
    },
  },
};

export type Theme = typeof theme;
