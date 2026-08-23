import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResourcesMenu } from "./ResourcesMenu";
import { RESOURCE_GROUPS } from "../../data/resources";

const ALL = RESOURCE_GROUPS.flatMap((g) => g.items);

test("menu is closed until the trigger is clicked", () => {
  render(<ResourcesMenu />);
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("opening the menu reveals every resource as a new-tab link", async () => {
  render(<ResourcesMenu />);
  await userEvent.click(screen.getByRole("button", { name: /resources/i }));

  expect(screen.getByRole("menu")).toBeInTheDocument();
  // Match by unique href (resource names/descriptions can share words).
  const byHref = new Map(
    screen.getAllByRole("menuitem").map((a) => [a.getAttribute("href"), a])
  );
  for (const r of ALL) {
    const link = byHref.get(r.url);
    expect(link, `missing menuitem for ${r.name}`).toBeTruthy();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link!.getAttribute("rel")).toContain("noopener");
  }
});

test("includes all curated sites across every group", () => {
  expect(ALL).toHaveLength(44);
  expect(ALL.map((r) => r.name)).toEqual([
    "MagicPattern", "Variant", "Stitch", "Whimsical MCP",
    "SEESAW", "Refero", "Recent", "Awwwards", "Land-book", "Dribbble", "Godly", "Webzibition", "Sketchbook", "Animagraffs", "Liquid Logo",
    "shadcn/ui", "21st.dev",
    "Rete.js", "React Flow", "tldraw", "Motion", "GSAP", "Three.js", "p5.js", "dnd kit", "PixiJS", "Liquid Glass JS",
    "Laws of UX", "DESIGN.md", "ko-design-md", "Unicode Emoji List", "Diagram Design", "Emil's UI Skills", "Hallmark",
    "getdesign.kr", "Accent Palette", "Realtime Colors", "Coolors",
    "Kenney", "Blush", "Open Doodles", "Storyset", "unDraw", "Lucide",
  ]);
  expect(RESOURCE_GROUPS.map((g) => g.label)).toEqual([
    "Tools", "Inspiration", "Components", "Libraries", "Learn", "Colors & Themes", "Assets",
  ]);
});
