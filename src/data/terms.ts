export type TermCategory =
  | "Layout"
  | "Components"
  | "Interaction"
  | "Motion"
  | "UX Laws"
  | "Accessibility"
  | "Typography";

export interface Term {
  term: string;
  category: TermCategory;
  def: string;
  example?: string;
}

export const TERM_CATEGORIES: TermCategory[] = [
  "Layout",
  "Components",
  "Interaction",
  "Motion",
  "UX Laws",
  "Accessibility",
  "Typography",
];

/** A curated glossary of UI/UX vocabulary and component names. */
export const TERMS: Term[] = [
  // Layout
  { term: "Whitespace", category: "Layout", def: "Empty space between elements that creates grouping and breathing room.", example: "Padding inside a card; gaps in a grid." },
  { term: "Gutter", category: "Layout", def: "The consistent space between columns in a grid.", example: "24px gutters in a 12-column layout." },
  { term: "Above the fold", category: "Layout", def: "The area visible before any scrolling.", example: "Hero + primary CTA placed above the fold." },
  { term: "Bento grid", category: "Layout", def: "A grid of differently-sized rounded cards, like a bento box.", example: "Feature sections as mixed-size tiles." },
  { term: "Z-index / stacking", category: "Layout", def: "The front-to-back order of overlapping elements.", example: "A modal above a sticky header." },

  // Components
  { term: "Toast", category: "Components", def: "A brief, auto-dismissing message that doesn't block the UI.", example: '"Copied to clipboard" sliding in.' },
  { term: "Snackbar", category: "Components", def: "A toast that can carry a single action (e.g. Undo).", example: '"Item deleted — Undo".' },
  { term: "Skeleton", category: "Components", def: "A gray placeholder that mimics content shape while loading.", example: "Shimmering bars before text loads." },
  { term: "Tooltip", category: "Components", def: "A small label on hover/focus that explains an element.", example: "Icon-button hint." },
  { term: "Popover", category: "Components", def: "A small floating panel anchored to a trigger, richer than a tooltip.", example: "A date picker under a field." },
  { term: "Modal / Dialog", category: "Components", def: "A focused overlay that blocks the page until dismissed.", example: "A confirm dialog." },
  { term: "Drawer / Sheet", category: "Components", def: "A panel that slides in from an edge; a bottom sheet rises from below.", example: "Mobile nav drawer; filter bottom sheet." },
  { term: "Accordion", category: "Components", def: "Stacked sections that expand/collapse one at a time.", example: "An FAQ list." },
  { term: "Segmented control", category: "Components", def: "A row of mutually-exclusive options styled as one control.", example: "Off / Split / Slider compare toggle." },
  { term: "Command palette", category: "Components", def: "A searchable action launcher, usually opened with ⌘K.", example: "Quickly jump to any command." },
  { term: "Chip / Tag / Badge", category: "Components", def: "A compact pill for a value, filter, or status/count.", example: "Selected filters; a notification count." },
  { term: "Breadcrumb", category: "Components", def: "A trail showing the current location in a hierarchy.", example: "Home / Docs / API." },
  { term: "Stepper", category: "Components", def: "A component that guides through ordered steps or increments a value.", example: "Checkout steps; a quantity +/−." },
  { term: "Avatar Chip", category: "Components", def: "A user's avatar and name combined into one rounded chip/tag, often removable.", example: "Assignee pills on a task." },
  { term: "Avatar Stack", category: "Components", def: "Several user avatars overlapped in a row (a.k.a. avatar group), often with a +N overflow.", example: "Collaborators on a document." },
  { term: "Pagination", category: "Components", def: "Splitting content into pages with controls (numbers and/or prev/next) to move between them.", example: "‹ 1 2 3 › under a table or search results." },
  { term: "Pagination dots", category: "Components", def: "A row of dots showing how many pages/slides exist and which is active — a.k.a. dot indicator, page control (iOS), or bullets (carousels).", example: "The dots under an onboarding carousel." },

  // Interaction
  { term: "CTA (Call to action)", category: "Interaction", def: "The button or copy that drives the user's next step; the Primary CTA is the one action you most want them to take on a screen.", example: '"Get started" as the primary button.' },
  { term: "Speed bump", category: "Interaction", def: "A small, deliberate delay or extra step just before a hard-to-undo action — like a road bump, it slows without fully blocking, curbing impulsive clicks.", example: 'A "Delete anyway?" confirm step.' },
  { term: "Intentional friction", category: "Interaction", def: "Deliberately adding friction where it helps — confirmation, reflection, or security before risky/irreversible actions. Not 'friction = bad', but 'friction in the wrong place = bad'.", example: "2-step verification; a cooldown before a risky action." },
  { term: "Affordance", category: "Interaction", def: "A visual cue that suggests how an element can be used.", example: "A raised button looks pressable." },
  { term: "Signifier", category: "Interaction", def: "An explicit marker that communicates an affordance.", example: "An underline signifying a link." },
  { term: "Disclosure", category: "Interaction", def: "Progressively revealing content to reduce upfront complexity.", example: "A 'Show more' expander." },
  { term: "Hit target", category: "Interaction", def: "The clickable/tappable area of a control (min ~44px on touch).", example: "Padding that enlarges a small icon's tap area." },
  { term: "Empty state", category: "Interaction", def: "What a screen shows when there's no data yet.", example: '"No presets — tune it, then Save."' },
  { term: "Optimistic UI", category: "Interaction", def: "Updating the UI before the server confirms, for perceived speed.", example: "A like fills instantly, syncs after." },

  // Motion
  { term: "Easing", category: "Motion", def: "The rate of change of an animation over time.", example: "ease-out for entrances." },
  { term: "Spring", category: "Motion", def: "Physics-based motion defined by stiffness/damping, not duration.", example: "A bouncy drawer settle." },
  { term: "Stagger", category: "Motion", def: "Offsetting the start of items' animations for a cascade.", example: "List items fading in one after another." },
  { term: "Parallax", category: "Motion", def: "Layers moving at different speeds to imply depth.", example: "Background drifts slower than foreground on scroll." },

  // UX Laws
  { term: "Fitts's Law", category: "UX Laws", def: "Time to hit a target grows with distance and shrinks with size.", example: "Big, close primary buttons are faster." },
  { term: "Hick's Law", category: "UX Laws", def: "More choices means longer decision time.", example: "Trim menu options to speed decisions." },
  { term: "Jakob's Law", category: "UX Laws", def: "Users expect your site to work like the others they know.", example: "Put the cart icon top-right." },
  { term: "Miller's Law", category: "UX Laws", def: "People hold ~7 (±2) items in working memory.", example: "Chunk phone numbers and steps." },
  { term: "Doherty Threshold", category: "UX Laws", def: "Keep response under ~400ms to hold attention & flow.", example: "Instant feedback on interactions." },
  { term: "Aesthetic-Usability", category: "UX Laws", def: "People perceive attractive design as more usable.", example: "Polish raises trust and forgiveness." },

  // Accessibility
  { term: "Focus trap", category: "Accessibility", def: "Keeping keyboard focus inside an open overlay until it closes.", example: "Tab cycles within a modal." },
  { term: "Skip link", category: "Accessibility", def: "A hidden link that jumps past nav straight to main content.", example: '"Skip to content" on first Tab.' },
  { term: "ARIA live region", category: "Accessibility", def: "A region screen readers announce when its content changes.", example: 'aria-live="polite" for a toast.' },
  { term: "Contrast ratio", category: "Accessibility", def: "Luminance difference of text vs background; AA needs 4.5:1.", example: "Body text passes 4.5:1." },
  { term: "Reduced motion", category: "Accessibility", def: "Honoring users who request less animation.", example: "prefers-reduced-motion pauses effects." },

  // Typography
  { term: "Leading", category: "Typography", def: "The vertical space between lines of text (line-height).", example: "1.5 leading for body copy." },
  { term: "Tracking", category: "Typography", def: "Uniform spacing across a run of letters (letter-spacing).", example: "Slight negative tracking on big headings." },
  { term: "Kerning", category: "Typography", def: "Adjusting space between specific letter pairs.", example: "Tightening 'AV'." },
  { term: "x-height", category: "Typography", def: "Height of lowercase letters; larger reads better small.", example: "Fonts with tall x-heights feel legible." },
  { term: "Widow / Orphan", category: "Typography", def: "A lone last word (widow) or a stranded first line (orphan).", example: "Avoid a single word on the last line." },
];
