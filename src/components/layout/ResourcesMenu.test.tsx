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
  for (const r of ALL) {
    const link = screen.getByRole("menuitem", { name: new RegExp(r.name, "i") });
    expect(link).toHaveAttribute("href", r.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  }
});

test("includes all curated sites across Tools / Inspiration / Components / Learn", () => {
  expect(ALL).toHaveLength(12);
  expect(ALL.map((r) => r.name)).toEqual([
    "MagicPattern", "Variant",
    "SEESAW", "Refero", "Recent", "Awwwards", "Land-book", "Dribbble", "Godly",
    "shadcn/ui", "21st.dev",
    "Laws of UX",
  ]);
  expect(RESOURCE_GROUPS.map((g) => g.label)).toEqual([
    "Tools", "Inspiration", "Components", "Learn",
  ]);
});
