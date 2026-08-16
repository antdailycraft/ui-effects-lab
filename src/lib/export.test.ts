import { expect, test } from "vitest";
import { buildDemo, buildCombinedDemo, codePenData, stackBlitzProject } from "./export";
import { getEffect, defaultParams } from "../registry/effects";

const demoFor = (id: string) => {
  const e = getEffect(id)!;
  return buildDemo(e, defaultParams(e), false);
};

test("a native SVG effect builds a static HTML+CSS demo keyed to .effect", () => {
  const demo = demoFor("rough-edge");
  expect(demo.kind).toBe("static");
  if (demo.kind !== "static") return;
  expect(demo.html).toContain('class="effect card"');
  expect(demo.html).toContain('<filter id="rough-edge">');
  expect(demo.css).toContain(".effect {");
});

test("a CSS effect embeds its generated rule and needs no inline SVG", () => {
  const demo = demoFor("frosted-glass");
  expect(demo.kind).toBe("static");
  if (demo.kind !== "static") return;
  expect(demo.css).toContain("backdrop-filter");
  expect(demo.html).not.toContain("<filter");
});

test("a generator builds a React demo carrying its component name and JSX", () => {
  const demo = demoFor("swirl");
  expect(demo.kind).toBe("react");
  if (demo.kind !== "react") return;
  expect(demo.componentName).toBe("Swirl");
  expect(demo.jsx).toContain("<Swirl");
});

test("an image shader export uses the real image URL, not the placeholder", () => {
  const e = getEffect("image-dithering")!;
  const demo = buildDemo(e, defaultParams(e), false, "https://cdn.example/pic.png");
  expect(demo.kind).toBe("react");
  if (demo.kind !== "react") return;
  expect(demo.jsx).toContain('image="https://cdn.example/pic.png"');
  expect(demo.jsx).not.toContain("/your-image.jpg");
});

test("a combination stack exports a static demo chaining every layer's filter", () => {
  const rough = getEffect("rough-edge")!;
  const water = getEffect("water")!;
  const chain = [
    { effectId: "rough-edge", params: defaultParams(rough) },
    { effectId: "water", params: defaultParams(water) },
  ];
  const demo = buildCombinedDemo(chain, () => false);
  expect(demo.kind).toBe("static");
  if (demo.kind !== "static") return;
  expect(demo.html).toContain('<filter id="rough-edge-1">');
  expect(demo.html).toContain('<filter id="water-2">');
  expect(demo.html).toContain('class="effect card"');
  expect(demo.css).toContain("filter: url(#rough-edge-1) url(#water-2);");
});

test("CodePen payload: static → html/css, generator → babel JS with esm.sh imports", () => {
  const staticPen = codePenData(demoFor("rough-edge"));
  expect(staticPen.html).toContain("<filter");
  expect(staticPen.js).toBeUndefined();

  const reactPen = codePenData(demoFor("swirl"));
  expect(reactPen.js_pre_processor).toBe("babel");
  expect(String(reactPen.js)).toContain("https://esm.sh/@paper-design/shaders-react");
  expect(String(reactPen.js)).toContain("createRoot");
});

test("StackBlitz project: static → html template, generator → node + Vite files with the shader dep", () => {
  const staticProj = stackBlitzProject(demoFor("rough-edge"));
  expect(staticProj.template).toBe("html");
  expect(Object.keys(staticProj.files)).toContain("index.html");
  expect(Object.keys(staticProj.files)).toContain("style.css");

  const reactProj = stackBlitzProject(demoFor("swirl"));
  expect(reactProj.template).toBe("node");
  expect(reactProj.files["package.json"]).toContain("@paper-design/shaders-react");
  expect(reactProj.files["src/main.jsx"]).toContain("<Swirl");
  expect(reactProj.files["src/main.jsx"]).not.toContain("esm.sh"); // bare specifiers for npm
});
