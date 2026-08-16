export interface CursorDef {
  value: string;
  note: string;
}

/** The CSS `cursor` keyword values, with a short note each. */
export const CURSORS: CursorDef[] = [
  { value: "default", note: "Default arrow" },
  { value: "pointer", note: "Link / clickable" },
  { value: "grab", note: "Draggable (idle)" },
  { value: "grabbing", note: "Dragging" },
  { value: "move", note: "Move in any direction" },
  { value: "text", note: "Selectable text" },
  { value: "vertical-text", note: "Vertical text" },
  { value: "crosshair", note: "Precision select" },
  { value: "not-allowed", note: "Action unavailable" },
  { value: "no-drop", note: "Can't drop here" },
  { value: "wait", note: "Busy (blocking)" },
  { value: "progress", note: "Busy (non-blocking)" },
  { value: "help", note: "Help available" },
  { value: "zoom-in", note: "Zoom in" },
  { value: "zoom-out", note: "Zoom out" },
  { value: "copy", note: "Copy on drop" },
  { value: "alias", note: "Create alias" },
  { value: "cell", note: "Table-cell select" },
  { value: "context-menu", note: "Context menu" },
  { value: "col-resize", note: "Resize column" },
  { value: "row-resize", note: "Resize row" },
  { value: "n-resize", note: "Resize ↑" },
  { value: "e-resize", note: "Resize →" },
  { value: "s-resize", note: "Resize ↓" },
  { value: "w-resize", note: "Resize ←" },
  { value: "ew-resize", note: "Resize ↔" },
  { value: "ns-resize", note: "Resize ↕" },
  { value: "nesw-resize", note: "Resize ⤢" },
  { value: "nwse-resize", note: "Resize ⤡" },
  { value: "all-scroll", note: "Scroll any way" },
  { value: "none", note: "Hidden cursor" },
];
