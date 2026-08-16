import type { EffectDefinition, Params } from "../types/effects";
import { generateSvg, generateCss, generateReact } from "./codegen";

/** A self-contained, runnable demo of one effect. */
export type Demo =
  | {
      kind: "static";
      title: string;
      description: string;
      html: string;
      css: string;
    }
  | {
      kind: "react";
      title: string;
      description: string;
      componentName: string;
      jsx: string;
    };

const SHADERS_PKG = "@paper-design/shaders-react";

/** Sample card the native effect is applied to (class `effect`). */
const DEMO_HTML = `<div class="effect card">
  <div class="banner"></div>
  <div class="pad">
    <p class="k">Local Advertisement</p>
    <h3>Harbor Roastery</h3>
    <p class="body">Small-batch coffee, roasted on the pier every morning.</p>
    <div class="row"><span class="price">$12</span><span class="cta">Order now</span></div>
  </div>
</div>`;

/** Base page styling — a vivid backdrop so backdrop-filter effects have something to blur. */
const DEMO_CSS_BASE = `body {
  margin: 0; min-height: 100vh; display: grid; place-items: center;
  font-family: system-ui, -apple-system, sans-serif;
  background:
    radial-gradient(60% 80% at 20% 15%, #ffd36e, transparent 60%),
    radial-gradient(70% 90% at 85% 25%, #ff6a9c, transparent 55%),
    radial-gradient(90% 90% at 60% 100%, #5b7bff, transparent 60%),
    linear-gradient(160deg, #241a3a, #101a33);
}
.card {
  width: 300px; background: linear-gradient(160deg, #fbf6ec, #f0e6d2);
  border-radius: 14px; overflow: hidden; color: #2a2318; text-align: left;
}
.card .banner { height: 120px; background: linear-gradient(135deg, #ff8a3d, #ff5d73 55%, #c0417a); }
.card .pad { padding: 16px 18px 20px; }
.card .k { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #b5642a; font-weight: 700; margin: 0; }
.card h3 { margin: 6px 0; font-size: 19px; }
.card .body { font-size: 12.5px; color: #6a5f4c; line-height: 1.55; margin: 0; }
.card .row { display: flex; align-items: center; justify-content: space-between; margin-top: 15px; }
.card .price { font-size: 22px; font-weight: 800; }
.card .cta { background: #24201a; color: #fff; font-size: 12px; font-weight: 600; padding: 9px 16px; border-radius: 8px; }`;

/** Split a generateReact() snippet into its component name and its JSX body. */
function parseReactSnippet(snippet: string): { componentName: string; jsx: string } {
  const nameMatch = snippet.match(/import\s*\{\s*(\w+)/);
  const componentName = nameMatch ? nameMatch[1] : "Shader";
  const parts = snippet.split("\n\n");
  const jsx = (parts.length > 1 ? parts.slice(1).join("\n\n") : snippet).trim();
  return { componentName, jsx };
}

export function buildDemo(effect: EffectDefinition, params: Params, animate: boolean): Demo {
  const title = `UI Effects Lab — ${effect.name}`;
  const description = effect.description;

  if (effect.kind === "generator") {
    const { componentName, jsx } = parseReactSnippet(generateReact(effect, params, animate));
    return { kind: "react", title, description, componentName, jsx };
  }

  // svg / css / retro — a static HTML+CSS pen keyed to the `.effect` selector.
  const rule = generateCss(effect, params, animate); // `.effect { ... }`
  if (effect.kind === "css") {
    return { kind: "static", title, description, html: DEMO_HTML, css: `${DEMO_CSS_BASE}\n\n${rule}` };
  }
  const svg = generateSvg(effect, params, animate);
  return {
    kind: "static",
    title,
    description,
    html: `${svg}\n\n${DEMO_HTML}`,
    css: `${DEMO_CSS_BASE}\n\n${rule}`,
  };
}

/** Indent a JSX body and drop it inside an <App> that fills the viewport. */
function reactEntry(componentName: string, jsx: string, esm: boolean, rootId: string): string {
  const spec = (p: string) => (esm ? `https://esm.sh/${p}` : p);
  const body = jsx
    .split("\n")
    .map((l) => "      " + l)
    .join("\n");
  return `import React from "${spec("react@18")}";
import { createRoot } from "${spec("react-dom@18/client")}";
import { ${componentName} } from "${spec(SHADERS_PKG)}";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
${body}
    </div>
  );
}

createRoot(document.getElementById("${rootId}")).render(<App />);
`;
}

/* ---------- CodePen (prefill define API) ---------- */

/** The JSON payload CodePen's /pen/define endpoint expects. */
export function codePenData(demo: Demo): Record<string, unknown> {
  if (demo.kind === "static") {
    return { title: demo.title, description: demo.description, html: demo.html, css: demo.css };
  }
  return {
    title: demo.title,
    description: demo.description,
    html: `<div id="app"></div>`,
    css: "html, body, #app { margin: 0; height: 100%; }",
    js: reactEntry(demo.componentName, demo.jsx, /* esm */ true, "app"),
    js_pre_processor: "babel",
  };
}

/* ---------- StackBlitz (run form) ---------- */

const VITE_CONFIG = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()] });
`;

function stackBlitzReactFiles(demo: Extract<Demo, { kind: "react" }>): Record<string, string> {
  const pkg = {
    name: "ui-effects-lab-demo",
    private: true,
    type: "module",
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: { react: "^18.3.1", "react-dom": "^18.3.1", [SHADERS_PKG]: "latest" },
    devDependencies: { vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0" },
  };
  return {
    "package.json": JSON.stringify(pkg, null, 2),
    "vite.config.js": VITE_CONFIG,
    "index.html": `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>${demo.title}</title></head>
  <body style="margin:0">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
    "src/main.jsx": reactEntry(demo.componentName, demo.jsx, /* esm */ false, "root"),
  };
}

function stackBlitzStaticFiles(demo: Extract<Demo, { kind: "static" }>): Record<string, string> {
  return {
    "index.html": `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>${demo.title}</title><link rel="stylesheet" href="style.css" /></head>
  <body>
${demo.html}
  </body>
</html>
`,
    "style.css": demo.css,
  };
}

/** { template, files } for StackBlitz's run form. */
export function stackBlitzProject(demo: Demo): {
  template: "html" | "node";
  files: Record<string, string>;
} {
  return demo.kind === "react"
    ? { template: "node", files: stackBlitzReactFiles(demo) }
    : { template: "html", files: stackBlitzStaticFiles(demo) };
}

/* ---------- Form submission (browser only) ---------- */

function submitForm(action: string, fields: Record<string, string>): void {
  if (typeof document === "undefined") return;
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;
  form.target = "_blank";
  form.style.display = "none";
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  form.remove();
}

export function openInCodePen(demo: Demo): void {
  submitForm("https://codepen.io/pen/define", { data: JSON.stringify(codePenData(demo)) });
}

export function openInStackBlitz(demo: Demo): void {
  const { template, files } = stackBlitzProject(demo);
  const fields: Record<string, string> = {
    "project[title]": demo.title,
    "project[description]": demo.description,
    "project[template]": template,
  };
  for (const [path, content] of Object.entries(files)) {
    fields[`project[files][${path}]`] = content;
  }
  submitForm("https://stackblitz.com/run", fields);
}
