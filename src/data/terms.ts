export type TermCategory =
  | "Layout"
  | "Components"
  | "Interaction"
  | "Motion"
  | "UX Laws"
  | "Accessibility"
  | "Typography"
  | "Process";

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
  "Process",
];

/** A curated glossary of UI/UX vocabulary and component names. */
export const TERMS: Term[] = [
  // Layout
  { term: "Whitespace", category: "Layout", def: "Empty space between elements that creates grouping and breathing room.", example: "Padding inside a card; gaps in a grid." },
  { term: "Gutter", category: "Layout", def: "The consistent space between columns in a grid.", example: "24px gutters in a 12-column layout." },
  { term: "Above the fold", category: "Layout", def: "The area visible before any scrolling.", example: "Hero + primary CTA placed above the fold." },
  { term: "Hero section", category: "Layout", def: "The large, prominent banner at the top of a page — usually a headline, short subtext, and a primary CTA, often over an image or gradient. The first thing visitors see (above the fold). Also called a hero banner or main banner.", example: "This app's landing: the big title + 'Open the Lab' CTA over a live gradient." },
  { term: "Header", category: "Layout", def: "The full-width bar at the top of a page — usually the logo and primary nav on the left, and account/notifications/search on the right. The base for navigating the UI.", example: "This app's top bar." },
  { term: "Footer", category: "Layout", def: "The region at the bottom of every page, below the main content — company info, links, legal, and contact. The navigation part of it is the FNB.", example: "About / Terms / Contact and a copyright line." },
  { term: "Status bar", category: "Layout", def: "The strip at the very top of a mobile device showing system info — time, signal, battery. Owned by the OS, not the app.", example: "The clock and battery row on a phone." },
  { term: "Bento grid", category: "Layout", def: "A grid of differently-sized rounded cards, like a bento box.", example: "Feature sections as mixed-size tiles." },
  { term: "Z-index / stacking", category: "Layout", def: "The front-to-back order of overlapping elements.", example: "A modal above a sticky header." },
  { term: "GNB (Global Navigation Bar)", category: "Layout", def: "The top-level menu shown on every page, linking a site's main sections. The parent of LNB/SNB. Common shorthand in Korean/Japanese web design.", example: "The primary menu bar across the top of every page." },
  { term: "LNB (Local Navigation Bar)", category: "Layout", def: "Secondary navigation scoped to one section — the sub-menu that appears only inside a GNB area or a specific page.", example: "A left sub-menu within 'Docs' listing its pages." },
  { term: "SNB (Side Navigation Bar)", category: "Layout", def: "A supplementary menu pinned to the left or right edge of the screen, often collapsible.", example: "A sidebar of tools, filters, or shortcuts." },
  { term: "FNB (Footer Navigation Bar)", category: "Layout", def: "Links and info gathered at the very bottom (footer) — company details, terms, and secondary links.", example: "About / Terms / Contact in the page footer." },

  // Components
  { term: "Toast", category: "Components", def: "A brief, auto-dismissing message that doesn't block the UI.", example: '"Copied to clipboard" sliding in.' },
  { term: "Snackbar", category: "Components", def: "A toast that can carry a single action (e.g. Undo).", example: '"Item deleted — Undo".' },
  { term: "Skeleton", category: "Components", def: "A gray placeholder that mimics content shape while loading.", example: "Shimmering bars before text loads." },
  { term: "Tooltip", category: "Components", def: "A small label on hover/focus that explains an element.", example: "Icon-button hint." },
  { term: "Popover", category: "Components", def: "A small floating panel anchored to a trigger, richer than a tooltip. A container pattern — a dropdown menu, select, or combobox list is often built as one.", example: "A date picker under a field." },
  { term: "Dropdown menu", category: "Components", def: "A trigger that opens a list of actions/commands (not form values). Colloquially just 'a dropdown'; often built as a popover, with ARIA menu semantics.", example: "A ⋯ menu with Rename / Duplicate / Delete." },
  { term: "Select", category: "Components", def: "A control for choosing one value from a list to submit in a form. The native picker isn't type-to-filter — for that use a combobox. Also called a drop-down list, drop-down, or select box.", example: "Country: Korea." },
  { term: "Combobox", category: "Components", def: "A text input joined to a filterable list — type to autocomplete and/or pick from the dropdown. An editable, searchable select; when list-driven it's also called autocomplete or keyword-suggest.", example: "An autocomplete city field." },
  { term: "Modal / Dialog", category: "Components", def: "A focused overlay that blocks the page until dismissed.", example: "A confirm dialog." },
  { term: "Drawer / Sheet", category: "Components", def: "A panel that slides in from an edge; a bottom sheet rises from below. A modal sheet has a scrim and blocks the page; a non-modal one lets you keep using the screen behind it.", example: "Mobile nav drawer; filter bottom sheet." },
  { term: "Accordion", category: "Components", def: "Stacked sections that expand/collapse one at a time.", example: "An FAQ list." },
  { term: "Grid", category: "Components", def: "A layout primitive arranging children into rows and columns (CSS Grid). Use it for two-dimensional layouts where items align on both axes.", example: "A responsive card gallery or dashboard." },
  { term: "Stack", category: "Components", def: "A layout primitive that lays children in one direction with consistent spacing — vertical (VStack) or horizontal (HStack). One-dimensional, unlike a grid.", example: "Form fields stacked with even gaps." },
  { term: "Table", category: "Components", def: "A data table — rows and columns of structured data with a header row, often sortable and row-selectable. For layout use a grid; a table is for tabular data. Also called a data grid, grid view, or table view.", example: "A list of users with Name / Role / Status columns." },
  { term: "Segmented control", category: "Components", def: "A row of mutually-exclusive options styled as one control.", example: "Off / Split / Slider compare toggle." },
  { term: "Toggle / Switch", category: "Components", def: "A control that flips a single setting on or off, sliding a knob between two states. Use it for instant on/off options — not for choosing among several (that's a segmented control) or for a form you submit (that's a checkbox).", example: "Dark mode on/off; animation enabled." },
  { term: "Checkbox", category: "Components", def: "A box that turns one option on/off or selects several from a list; also supports a third indeterminate (partial) state. Use it in forms you submit — for an instant setting prefer a switch.", example: "Accept terms; select rows; a 'select all' shown partial." },
  { term: "Radio button", category: "Components", def: "A set of circles for picking exactly one option from a short, visible list — choosing one clears the rest. Use it over a switch (on/off) or checkboxes (multi-select) when the choices are mutually exclusive.", example: "Choose a shipping speed: Standard / Express." },
  { term: "Toggle button", category: "Components", def: "A button that stays pressed to show an active state (aria-pressed) instead of firing once. Use it for a formatting-style on/off, often tied to the current selection.", example: "Bold / Italic in a text toolbar." },
  { term: "Toggle button group", category: "Components", def: "A set of toggle buttons acting as one control — single-select (like a segmented control) or multi-select. Unlike a segmented control it can allow several active at once and is often icon-only.", example: "Text-align left/center/right; multi-select filters." },
  { term: "Leading / Trailing icon", category: "Components", def: "An icon before (leading) or after (trailing) a label inside a button, chip, or input. 'Leading/trailing' is the Material Design term and is preferred because it stays correct in right-to-left layouts; the same idea is called prefix/suffix icon (Ant Design, Element Plus inputs) or left/right icon (Chakra UI buttons).", example: "A field with a leading magnifier; a select with a trailing chevron." },
  { term: "Icon button", category: "Components", def: "A button whose whole content is a single icon with no visible text — it needs an accessible name (aria-label or tooltip). Differs from a leading/trailing icon, which sits next to a text label.", example: "A ⋯ overflow button; a toolbar's bold button." },
  { term: "Command palette", category: "Components", def: "A searchable action launcher, usually opened with ⌘K.", example: "Quickly jump to any command." },
  { term: "Chip / Tag / Badge", category: "Components", def: "A compact pill for a value, filter, or status/count. Filter chips toggle a filter (a checkbox/button alternative); action chips trigger a related action.", example: "Selected filters; a notification count." },
  { term: "Breadcrumb", category: "Components", def: "A trail showing the current location in a hierarchy.", example: "Home / Docs / API." },
  { term: "Stepper", category: "Components", def: "A component that guides through ordered steps, or a number input with up/down arrows to increment a value (a.k.a. a spinner).", example: "Checkout steps; a quantity +/− stepper." },
  { term: "Avatar Chip", category: "Components", def: "A user's avatar and name combined into one rounded chip/tag, often removable.", example: "Assignee pills on a task." },
  { term: "Avatar Stack", category: "Components", def: "Several user avatars overlapped in a row (a.k.a. avatar group), often with a +N overflow.", example: "Collaborators on a document." },
  { term: "Pagination", category: "Components", def: "Splitting content into pages with controls (numbers and/or prev/next) to move between them.", example: "‹ 1 2 3 › under a table or search results." },
  { term: "Pagination dots", category: "Components", def: "A row of dots showing how many pages/slides exist and which is active — a.k.a. dot indicator, page control (iOS), or bullets (carousels).", example: "The dots under an onboarding carousel." },
  { term: "Button", category: "Components", def: "The most basic component — a control that performs an action on click/tap, styled as primary, secondary, ghost, etc. Icon-only is an icon button; an icon beside text is a leading/trailing icon.", example: "A 'Save' primary button." },
  { term: "Text field / Input", category: "Components", def: "A box for typing text — one line is a text field/input, multi-line is a textarea. Usually has a label, placeholder, and helper/error text.", example: "An email input with a placeholder." },
  { term: "List box", category: "Components", def: "An always-visible list you pick items from — single- or multi-select. Unlike a select/dropdown, the options stay open on screen.", example: "A multi-select list of tags." },
  { term: "Slider", category: "Components", def: "A thumb dragged along a track to pick a value in a fixed range, so out-of-range input is impossible and the range is visible at a glance.", example: "Volume, brightness, or a video scrubber." },
  { term: "Dial / Knob", category: "Components", def: "A rotary control you drag or click to change a value — a skeuomorphic knob, common in audio tools.", example: "A volume or gain knob in a DAW." },
  { term: "Scrollbar", category: "Components", def: "A track-and-thumb control shown when content overflows its area; the thumb's size and position reflect how much is visible and where you are.", example: "The bar down the side of a long list." },
  { term: "Tabs", category: "Components", def: "A row of labels that switch between sections of related content in the same space, with the active tab highlighted. Can nest by depth (1-/2-/3-depth).", example: "Overview / Specs / Reviews on a product page." },
  { term: "Tree view", category: "Components", def: "A list that shows hierarchy through indented, expandable/collapsible nodes.", example: "A file explorer's folder tree." },
  { term: "Ribbon menu", category: "Components", def: "A toolbar organized into tabs, each revealing a different set of grouped commands. Dense but discoverable; typical of MS Office.", example: "Word's Home / Insert / Layout ribbon." },
  { term: "Carousel", category: "Components", def: "A rotating strip that shows one slide at a time, advanced by arrows, swipe, or autoplay — signal that more slides exist.", example: "A hero banner or onboarding slides." },
  { term: "Progress indicator", category: "Components", def: "Shows how far a longer task has gone — determinate (a bar with a known %) or indeterminate (an animation when the end is unknown). A.k.a. progress bar.", example: "An upload progress bar." },
  { term: "Loading spinner", category: "Components", def: "An indeterminate loading indicator — a spinning icon shown while waiting, when there's no meaningful percentage. A.k.a. loader, throbber, spinner.", example: "A spinner while a page loads." },
  { term: "Bottom navigation", category: "Components", def: "A bar of 3–5 top-level destinations pinned to the bottom of a mobile screen for quick thumb access. A.k.a. tab bar or bottom app bar — distinct from a web FNB footer.", example: "Home / Search / Profile tabs on a phone app." },
  { term: "Hamburger button", category: "Components", def: "The ☰ three-line button that opens a hidden navigation menu, saving space on narrow screens. A.k.a. menu button/icon.", example: "The top-left menu toggle on mobile." },
  { term: "Popup", category: "Components", def: "Content shown in a new window/layer over the page. Classically a separate browser window (now often blocked), today usually replaced by a modal; alerts and confirms are simple popups.", example: "A browser popup window; an alert/confirm." },
  { term: "Form", category: "Components", def: "A set of inputs a user fills in and submits to send information to the system — fields, labels, validation, and a submit action.", example: "A checkout's payment and address form." },
  { term: "Divider", category: "Components", def: "A thin, faint line that separates or groups content within a layout.", example: "A hairline between list rows or menu sections." },
  { term: "Kebab / Meatballs / Bento / Döner menu", category: "Components", def: "The icon-menu family named by shape: kebab (⋮ vertical dots) for item options, meatballs (⋯ horizontal dots) for more actions, bento (3×3 dots, a.k.a. chocolate menu) to switch apps, and döner (uneven stacked lines) for filters — cousins of the hamburger (☰) menu.", example: "A ⋮ row menu; a ⋯ overflow; Google's 3×3 app switcher." },
  { term: "Notification badge", category: "Components", def: "A small dot or count overlaid on an icon to flag something new or unread. A count badge shows a number; a dot badge just signals 'new'.", example: "A red dot on a bell; '3' on an inbox." },
  { term: "Splash screen", category: "Components", def: "A brief (1–5s) branded loading screen shown at app launch — sets first impression and covers startup time.", example: "A logo screen while an app boots." },
  { term: "Launcher / Springboard", category: "Components", def: "A hub grid of app/section icons as the entry point to features. Simple to scan but flattens priority and doesn't scale past a screenful. A.k.a. dashboard or springboard.", example: "A phone home screen's app grid." },
  { term: "Mega menu", category: "Components", def: "A large dropdown panel opened from a top-nav (GNB) item that shows many links in categorized columns — for big sites like shopping malls.", example: "A store's 'Categories' menu opening a full panel." },

  // Interaction
  { term: "CTA (Call to action)", category: "Interaction", def: "The button or copy that drives the user's next step; the Primary CTA is the one action you most want them to take on a screen.", example: '"Get started" as the primary button.' },
  { term: "Speed bump", category: "Interaction", def: "A small, deliberate delay or extra step just before a hard-to-undo action — like a road bump, it slows without fully blocking, curbing impulsive clicks.", example: 'A "Delete anyway?" confirm step.' },
  { term: "Intentional friction", category: "Interaction", def: "Deliberately adding friction where it helps — confirmation, reflection, or security before risky/irreversible actions. Not 'friction = bad', but 'friction in the wrong place = bad'.", example: "2-step verification; a cooldown before a risky action." },
  { term: "Affordance", category: "Interaction", def: "A visual cue that suggests how an element can be used.", example: "A raised button looks pressable." },
  { term: "Signifier", category: "Interaction", def: "An explicit marker that communicates an affordance.", example: "An underline signifying a link." },
  { term: "Disclosure", category: "Interaction", def: "Progressively revealing content to reduce upfront complexity.", example: "A 'Show more' expander." },
  { term: "Hit target", category: "Interaction", def: "The clickable/tappable area of a control (min ~44px on touch).", example: "Padding that enlarges a small icon's tap area." },
  { term: "Empty state", category: "Interaction", def: "What a screen shows when there's no data yet. Good ones don't just say 'no data' — they explain what belongs here and how to add the first item.", example: '"No presets — tune it, then Save."' },
  { term: "Optimistic UI", category: "Interaction", def: "Updating the UI before the server confirms, for perceived speed.", example: "A like fills instantly, syncs after." },
  { term: "Onboarding", category: "Interaction", def: "The first-run experience that helps new users learn an app's features — intro screens shown when patterns are unfamiliar or a feature needs explaining.", example: "A few intro slides on first launch." },
  { term: "Coach marks", category: "Interaction", def: "Brief first-run tips drawn over a dimmed screen, pointing at each key control. Shown once on entry, then tucked into settings to recall later.", example: "Callouts highlighting new buttons." },
  { term: "Walkthrough", category: "Interaction", def: "A more detailed, multi-step guided intro (wizard-style) than coach marks. Always give a skip path straight to the home screen.", example: "A 3-step guided setup on first use." },
  { term: "Pull to refresh", category: "Interaction", def: "A gesture that reloads content by dragging the screen down and releasing — freeing the corner space an on-screen refresh button would take.", example: "Tugging a feed down to fetch new posts." },
  { term: "Hover", category: "Interaction", def: "The state when a pointer rests over a button or link without clicking — usually shows a visual change or a tooltip. Pointer-only; absent on touch.", example: "A button darkening under the cursor." },
  { term: "MRU (Most Recently Used)", category: "Interaction", def: "Surfacing the user's last-used items so they're one tap away — the last folder, recent files, recent apps.", example: "A save dialog defaulting to the last folder." },

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

  // Process
  { term: "Wireframe", category: "Process", def: "A low-fidelity, grayscale layout sketch that fixes structure and content priority before visual design — placeholders stand in for real images/text.", example: "A boxes-and-lines screen in Figma." },
  { term: "Storyboard", category: "Process", def: "A sequence of sketches that walks through a user's experience of a flow, borrowed from film — used to predict and explore UX.", example: "Frames showing a first-time purchase." },
  { term: "Detailed spec (기획서)", category: "Process", def: "The final planning deliverable built around the storyboard — every screen's structure, function, and policy in one document.", example: "The hand-off doc engineering builds from." },
  { term: "IA (Information Architecture)", category: "Process", def: "The structure map of a whole service — how content and screens are organized and connected. Used to survey the product's outline.", example: "A sitemap of every screen and its links." },
  { term: "Flow chart", category: "Process", def: "A diagram of a feature or service flow drawn with ordered steps and standard symbols.", example: "Login → verify → home decision paths." },
  { term: "WBS (Work Breakdown Structure)", category: "Process", def: "A hierarchical breakdown of a project's scope, schedule, and deliverables into smaller work items.", example: "Phases → tasks → subtasks with owners." },
  { term: "Funnel", category: "Process", def: "An analysis that visualizes how many users drop off at each step toward a conversion (signup, purchase), narrowing like a funnel — reveals weak pages.", example: "Visit → cart → checkout → paid drop-off." },
  { term: "User journey map", category: "Process", def: "A step-by-step visualization of a user's path through a service, capturing goals, time, emotions, and pain points at each stage.", example: "Discover → try → decide → buy, with feelings." },
  { term: "Persona", category: "Process", def: "A fictional but concrete character representing a typical user — age, job, context, needs, and frustrations — given a narrative to design against.", example: "'Jina, 29, busy commuter who…'." },
  { term: "End user", category: "Process", def: "The person who ultimately uses the product — distinct from the buyer/customer, who may be someone else.", example: "The employee using software their company bought." },
  { term: "MVP (Minimum Viable Product)", category: "Process", def: "The smallest release that fully delivers the core function and tests a key business hypothesis — few features, but the essential ones work completely.", example: "A one-flow app that validates demand." },
  { term: "OKR (Objectives & Key Results)", category: "Process", def: "A goal framework: an Objective (what to achieve) with quantitative Key Results (measurable milestones).", example: "Objective: grow activation; KR: +20% signups." },
  { term: "A/B test", category: "Process", def: "Showing randomly-split groups different UI/UX and measuring which performs better — a quantitative decision tool.", example: "Two CTA colors, compared by click-through." },
  { term: "Agile", category: "Process", def: "A methodology that ships a small product fast, gathers feedback, and improves continuously — versus planning everything up front (waterfall).", example: "Iterating in short cycles on real feedback." },
  { term: "Scrum", category: "Process", def: "A common agile framework: prioritize features, work in fixed cycles, and produce a working result each cycle.", example: "Backlog → sprint → increment." },
  { term: "Sprint", category: "Process", def: "The repeating 1–4 week development cycle in Scrum, with daily stand-ups to share progress and blockers.", example: "A two-week sprint toward a demo." },
  { term: "Product backlog", category: "Process", def: "The prioritized list of requirements to build, each with requester, timing, detail, and priority.", example: "Ranked features and fixes awaiting a sprint." },
  { term: "Front-end", category: "Process", def: "The part of a web/app the user sees and interacts with.", example: "The UI rendered in the browser." },
  { term: "Back-end", category: "Process", def: "The hidden server side that handles data and processing.", example: "The API and database behind a screen." },
  { term: "Native app", category: "Process", def: "An app built with a platform's own language/APIs (Android, iOS) for best device fit.", example: "A Swift iOS app." },
  { term: "Web app", category: "Process", def: "An app built with web tech, then wrapped for app-store distribution.", example: "A site packaged as an installable app." },
  { term: "Hybrid app", category: "Process", def: "A mix of native and web — a native shell hosting web content.", example: "Native navigation around web screens." },
  { term: "Responsive web", category: "Process", def: "A page whose layout adapts to the display — desktop, tablet, or phone.", example: "Columns collapsing to one on mobile." },
  { term: "Deploy", category: "Process", def: "Delivering a built service to users — shipping the release.", example: "Pushing the build to production." },
  { term: "QA (Quality Assurance)", category: "Process", def: "Testing a product's features and environments so it works reliably — finding bugs and coordinating release timing.", example: "A pre-release pass over every flow." },
];
