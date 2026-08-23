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
      {
        name: "Stitch",
        url: "https://stitch.withgoogle.com/docs",
        desc: "Google's AI tool that turns prompts into UI designs & front-end code.",
      },
      {
        name: "Whimsical MCP",
        url: "https://whimsical.com/learn/integrations/mcp",
        desc: "Connect AI tools to Whimsical for diagrams, mind maps, wireframes & visual planning.",
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
      {
        name: "Dribbble",
        url: "https://dribbble.com/",
        desc: "The world's top designers & creative work — daily shots.",
      },
      {
        name: "Godly",
        url: "https://godly.website/",
        desc: "Astronomically good web design inspiration.",
      },
      {
        name: "Webzibition",
        url: "https://tympanus.net/codrops/webzibition/",
        desc: "Codrops' curated exhibition of standout creative websites.",
      },
      {
        name: "Sketchbook",
        url: "https://github.com/MengTo/sketchbook",
        desc: "Open-source page-turning sketchbook with paper bending, magnification & parallax.",
      },
      {
        name: "Animagraffs",
        url: "https://animagraffs.com/wankel-rotary-engine/",
        desc: "A richly animated, interactive explainer showing how a rotary engine works.",
      },
      {
        name: "Liquid Logo",
        url: "https://github.com/paper-design/liquid-logo",
        desc: "Paper Shaders experiment that turns a logo into animated liquid metal.",
      },
    ],
  },
  {
    label: "Components",
    items: [
      {
        name: "shadcn/ui",
        url: "https://ui.shadcn.com/",
        desc: "Copy-paste React components — the de facto design-system foundation.",
      },
      {
        name: "21st.dev",
        url: "https://21st.dev/home",
        desc: "UI building blocks & registry for the agentic web.",
      },
    ],
  },
  {
    label: "Libraries",
    items: [
      {
        name: "Rete.js",
        url: "https://retejs.org/examples/",
        desc: "Framework for node-based visual editors & visual programming.",
      },
      {
        name: "React Flow",
        url: "https://reactflow.dev/",
        desc: "Node-based editors & interactive diagrams for React (by xyflow).",
      },
      {
        name: "tldraw",
        url: "https://tldraw.dev/",
        desc: "Infinite-canvas whiteboard SDK you can embed and extend.",
      },
      {
        name: "Motion",
        url: "https://motion.dev/",
        desc: "Production animation for JS & React (formerly Framer Motion).",
      },
      {
        name: "GSAP",
        url: "https://gsap.com/",
        desc: "Professional-grade web animation toolkit.",
      },
      {
        name: "Three.js",
        url: "https://threejs.org/",
        desc: "3D graphics in the browser via WebGL.",
      },
      {
        name: "p5.js",
        url: "https://p5js.org/",
        desc: "Creative coding — generative art & interaction on canvas.",
      },
      {
        name: "dnd kit",
        url: "https://dndkit.com/",
        desc: "Modern, accessible drag-and-drop toolkit for React.",
      },
      {
        name: "PixiJS",
        url: "https://pixijs.com/showcase",
        desc: "Fast 2D WebGL renderer for interactive graphics, games & effects.",
      },
      {
        name: "Liquid Glass JS",
        url: "https://github.com/dashersw/liquid-glass-js",
        desc: "WebGL-powered Apple-style glass effects with refraction, blur & masking.",
      },
    ],
  },
  {
    label: "Learn",
    items: [
      {
        name: "Laws of UX",
        url: "https://lawsofux.com/",
        desc: "UX principles & psychology laws, each with examples.",
      },
      {
        name: "DESIGN.md",
        url: "https://github.com/google-labs-code/design.md",
        desc: "Google Labs spec for describing a visual identity to coding agents (tokens + docs).",
      },
      {
        name: "ko-design-md",
        url: "https://github.com/CaesiumY/ko-design-md",
        desc: "Open catalog of Korean brand design systems in DESIGN.md format — a skill agents can pull tokens from.",
      },
      {
        name: "Unicode Emoji List",
        url: "https://unicode.org/emoji/charts/full-emoji-list.html",
        desc: "The official full emoji chart — every codepoint with vendor renderings.",
      },
      {
        name: "Diagram Design",
        url: "https://github.com/cathrynlavery/diagram-design",
        desc: "Agent skill with 38 editorial diagram patterns rendered as self-contained HTML & SVG.",
      },
      {
        name: "Emil's UI Skills",
        url: "https://emilkowal.ski/skill",
        desc: "Design-engineering skills for building, reviewing & improving interface animation.",
      },
      {
        name: "Hallmark",
        url: "https://www.usehallmark.com/",
        desc: "Opinionated agent skill for building and auditing less generic, more intentional interfaces.",
      },
    ],
  },
  {
    label: "Colors & Themes",
    items: [
      {
        name: "getdesign.kr",
        url: "https://getdesign.kr/",
        desc: "Live catalog of Korean brand design systems — real color palettes, typography & themes (behind ko-design-md).",
      },
      {
        name: "Accent Palette",
        url: `${import.meta.env.BASE_URL}badge-palette.html`,
        desc: "This project's Tailwind accent swatches & badges with AA contrast scores (dark/light).",
      },
      {
        name: "Realtime Colors",
        url: "https://www.realtimecolors.com/",
        desc: "Preview colors and fonts on a real site, check contrast & export the resulting palette.",
      },
      {
        name: "Coolors",
        url: "https://coolors.co/",
        desc: "Fast palette generator with browsing, image extraction & accessibility tools.",
      },
    ],
  },
  {
    label: "Assets",
    items: [
      {
        name: "Kenney",
        url: "https://kenney.nl/",
        desc: "Thousands of free CC0 game & UI assets — sprites, 3D, audio, fonts.",
      },
      {
        name: "Blush",
        url: "https://blush.design/",
        desc: "Customizable illustration collections from independent artists.",
      },
      {
        name: "Open Doodles",
        url: "https://www.opendoodles.com/",
        desc: "Free open-source illustrations in SVG, PNG & animated GIF formats.",
      },
      {
        name: "Storyset",
        url: "https://storyset.com/",
        desc: "Customize, animate & download illustration scenes for products and presentations.",
      },
      {
        name: "unDraw",
        url: "https://undraw.co/",
        desc: "Open-source SVG illustrations with live brand-color customization.",
      },
      {
        name: "Lucide",
        url: "https://lucide.dev/",
        desc: "Consistent, customizable open-source SVG icons with framework packages.",
      },
    ],
  },
];
