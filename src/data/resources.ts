export interface Resource {
  name: string;
  url: string;
  desc: string;
}

export interface ResourceGroup {
  label: string;
  items: Resource[];
}

/** External design tools & inspiration, surfaced in the top-bar Resources menu. */
export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    label: "Tools",
    items: [
      {
        name: "MagicPattern",
        url: "https://www.magicpattern.design/tools/css-backgrounds",
        desc: "CSS background pattern generator.",
      },
      {
        name: "Variant",
        url: "https://variant.com/",
        desc: "AI design generation — keep scrolling for variants, Style Dropper to lift a look.",
      },
    ],
  },
  {
    label: "Inspiration",
    items: [
      {
        name: "SEESAW",
        url: "https://www.seesaw.website/",
        desc: "Curated website & font directory, updated daily.",
      },
      {
        name: "Refero",
        url: "https://refero.design/",
        desc: "Real product web/iOS UI library — search by pattern, Figma plugin + MCP.",
      },
      {
        name: "Recent",
        url: "https://recent.design/websites",
        desc: "Daily gallery of recently shipped web & app design.",
      },
      {
        name: "Awwwards",
        url: "https://www.awwwards.com/websites/nominees/",
        desc: "Award nominees — high interaction & motion craft.",
      },
      {
        name: "Land-book",
        url: "https://land-book.com/design/landing-page",
        desc: "Landing-page gallery with fine-grained filters.",
      },
    ],
  },
];
