/**
 * LoveLarice — Shared Motion Tokens (JS mirror of motion-tokens.css)
 * Source: emil-design-eng skill. Keep these in sync with the CSS.
 *
 * Springs feel more natural than durations for: drag/gesture, anything
 * that should feel "alive," and interactions the user can interrupt
 * mid-motion (springs keep velocity; keyframes restart from zero).
 */
export const ease = {
  out:    [0.23, 1, 0.32, 1] as const,     // enter/exit, default
  inOut:  [0.77, 0, 0.175, 1] as const,    // on-screen movement/morph
  drawer: [0.32, 0.72, 0, 1] as const,     // iOS-like drawers/sheets
};

export const duration = {
  press:    0.14,
  tooltip:  0.18,
  dropdown: 0.22,
  modal:    0.32,
  reveal:   0.48,
};

/** Apple-style spring config — easier to reason about than mass/stiffness.
 *  Keep bounce subtle (0.1–0.3); reserve bounce for playful/drag moments. */
export const spring = {
  gentle:  { type: "spring", duration: 0.5, bounce: 0.15 } as const,
  drag:    { type: "spring", duration: 0.5, bounce: 0.25 } as const, // dismissable sheets
  snappy:  { type: "spring", duration: 0.35, bounce: 0.1 } as const,
};

export const pressScale = 0.97; // on tap/press
export const enterScale = 0.95; // never animate from 0
