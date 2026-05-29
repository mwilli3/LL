import { useState, useEffect, useRef } from "react";
import {
  trackQuizStarted, trackQuestionAnswered, trackQuizCompleted, trackEmailCaptured,
  trackResultsViewed, trackOfferBlockViewed, trackCheckoutOpened, trackProfileExpanded,
} from "./analytics.js";

/* ─────────────────────────────────────────────────────────────
   LoveLarice Archetype Quiz
   Brand-aligned with /preview/index.html and /sections/lovelarice-home.liquid:
     – Cream / warm-beige / taupe / warm-brown / gold / dark-brown / near-black
     – Cormorant Garamond (display, italic emphasis) + Outfit (body)
     – Custom easing curves (Emil), :active scale feedback
     – No side-stripe borders, no em dashes, no identical card grids
     – Per-archetype hues match the home-page archetype cards (teal/olive/burgundy),
       used as accent rules only, never as drenched surfaces.
   ───────────────────────────────────────────────────────────── */

const T = {
  cream:     "#f7f5f2",
  warmBeige: "#eae3dc",
  taupe:     "#cbb8a9",
  warmBrown: "#a47c63",
  gold:      "#c6a77d",
  darkBrown: "#4a3a32",
  nearBlack: "#2b2b2b",
  white:     "#ffffff",
  ink:       "#3a2e28",
  ink60:     "#6a574c",
  ink40:     "#9a8779",

  // Archetype accents (mirrored from the home page archetype cards)
  reg:  "#2C6E6A",
  root: "#5A7F3C",
  rec:  "#8B3A4A",
};

const F = "'Outfit', system-ui, sans-serif";
const H = "'Cormorant Garamond', Georgia, serif";

const EASE_OUT_QUART = "cubic-bezier(0.23,1,0.32,1)";
const EASE_IN_OUT_QUINT = "cubic-bezier(0.77,0,0.175,1)";

const LOGO = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1100\" zoomAndPan=\"magnify\" viewBox=\"0 0 824.88 374.999991\" height=\"500\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.0\"><defs><g/><clipPath id=\"3f1f396328\"><rect x=\"0\" width=\"325\" y=\"0\" height=\"87\"/></clipPath></defs><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(43.97147, 207.372096)\"><g><path d=\"M 63.203125 9.125 C 60.898438 10.6875 58.613281 11.972656 56.34375 12.984375 C 54.082031 13.992188 51.5 14.5 48.59375 14.5 C 46.351562 14.5 44.269531 14.144531 42.34375 13.4375 C 40.414062 12.726562 38.539062 11.832031 36.71875 10.75 C 34.894531 9.664062 33.085938 8.5 31.296875 7.25 C 29.503906 6 27.644531 4.832031 25.71875 3.75 C 23.789062 2.664062 21.707031 1.769531 19.46875 1.0625 C 17.238281 0.351562 14.804688 0 12.171875 0 L 3.34375 0 C 4.90625 -0.332031 5.9375 -1.160156 6.4375 -2.484375 C 6.945312 -3.804688 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.625 C 7.203125 -44.96875 6.929688 -46.234375 6.390625 -47.421875 C 5.847656 -48.609375 4.832031 -49.367188 3.34375 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.367188 14.539062 -48.609375 14 -47.421875 C 13.457031 -46.234375 13.1875 -44.96875 13.1875 -43.625 L 13.1875 -0.90625 C 16.632812 -0.769531 19.976562 -0.078125 23.21875 1.171875 C 26.46875 2.421875 29.664062 3.785156 32.8125 5.265625 C 35.957031 6.753906 39.132812 8.09375 42.34375 9.28125 C 45.5625 10.46875 48.859375 11.0625 52.234375 11.0625 C 54.203125 11.0625 56.03125 10.875 57.71875 10.5 C 59.40625 10.125 61.128906 9.5 62.890625 8.625 Z M 63.203125 9.125 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(64.460622, 207.372096)\"><g><path d=\"M 53.765625 -24.859375 C 53.765625 -21.398438 53.101562 -18.148438 51.78125 -15.109375 C 50.46875 -12.066406 48.675781 -9.410156 46.40625 -7.140625 C 44.144531 -4.878906 41.488281 -3.085938 38.4375 -1.765625 C 35.394531 -0.453125 32.148438 0.203125 28.703125 0.203125 C 25.253906 0.203125 22.007812 -0.453125 18.96875 -1.765625 C 15.925781 -3.085938 13.269531 -4.878906 11 -7.140625 C 8.738281 -9.410156 6.945312 -12.066406 5.625 -15.109375 C 4.3125 -18.148438 3.65625 -21.398438 3.65625 -24.859375 C 3.65625 -28.304688 4.3125 -31.550781 5.625 -34.59375 C 6.945312 -37.632812 8.738281 -40.285156 11 -42.546875 C 13.269531 -44.816406 15.925781 -46.609375 18.96875 -47.921875 C 22.007812 -49.242188 25.253906 -49.90625 28.703125 -49.90625 C 32.148438 -49.90625 35.394531 -49.242188 38.4375 -47.921875 C 41.488281 -46.609375 44.144531 -44.816406 46.40625 -42.546875 C 48.675781 -40.285156 50.46875 -37.632812 51.78125 -34.59375 C 53.101562 -31.550781 53.765625 -28.304688 53.765625 -24.859375 Z M 10.65625 -26.0625 C 10.65625 -23.425781 11.09375 -20.601562 11.96875 -17.59375 C 12.84375 -14.582031 14.109375 -11.8125 15.765625 -9.28125 C 17.429688 -6.75 19.460938 -4.648438 21.859375 -2.984375 C 24.253906 -1.328125 26.976562 -0.5 30.03125 -0.5 C 32.863281 -0.5 35.363281 -1.242188 37.53125 -2.734375 C 39.695312 -4.222656 41.488281 -6.117188 42.90625 -8.421875 C 44.320312 -10.722656 45.382812 -13.222656 46.09375 -15.921875 C 46.8125 -18.628906 47.171875 -21.203125 47.171875 -23.640625 C 47.171875 -26.410156 46.742188 -29.28125 45.890625 -32.25 C 45.046875 -35.226562 43.78125 -37.96875 42.09375 -40.46875 C 40.40625 -42.976562 38.359375 -45.039062 35.953125 -46.65625 C 33.554688 -48.28125 30.769531 -49.09375 27.59375 -49.09375 C 24.75 -49.09375 22.28125 -48.347656 20.1875 -46.859375 C 18.09375 -45.367188 16.332031 -43.472656 14.90625 -41.171875 C 13.488281 -38.878906 12.425781 -36.394531 11.71875 -33.71875 C 11.007812 -31.050781 10.65625 -28.5 10.65625 -26.0625 Z M 10.65625 -26.0625 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(110.916314, 207.372096)\"><g><path d=\"M 50.921875 -49.703125 C 49.296875 -49.160156 47.992188 -48.414062 47.015625 -47.46875 C 46.035156 -46.519531 45.238281 -45.269531 44.625 -43.71875 L 26.671875 0 L 8.515625 -43.21875 C 7.972656 -44.363281 7.3125 -45.59375 6.53125 -46.90625 C 5.757812 -48.226562 4.765625 -49.160156 3.546875 -49.703125 L 17.65625 -49.703125 C 16.769531 -49.367188 16.070312 -48.757812 15.5625 -47.875 C 15.0625 -47 14.8125 -46.085938 14.8125 -45.140625 C 14.8125 -44.796875 15.128906 -43.742188 15.765625 -41.984375 C 16.410156 -40.234375 17.222656 -38.140625 18.203125 -35.703125 C 19.179688 -33.265625 20.265625 -30.644531 21.453125 -27.84375 C 22.640625 -25.039062 23.789062 -22.367188 24.90625 -19.828125 C 26.019531 -17.296875 27 -15.046875 27.84375 -13.078125 C 28.6875 -11.117188 29.242188 -9.800781 29.515625 -9.125 C 29.859375 -9.9375 30.453125 -11.335938 31.296875 -13.328125 C 32.140625 -15.328125 33.101562 -17.628906 34.1875 -20.234375 C 35.269531 -22.835938 36.398438 -25.554688 37.578125 -28.390625 C 38.765625 -31.234375 39.847656 -33.875 40.828125 -36.3125 C 41.804688 -38.75 42.617188 -40.828125 43.265625 -42.546875 C 43.910156 -44.273438 44.234375 -45.304688 44.234375 -45.640625 C 44.234375 -46.660156 43.828125 -47.539062 43.015625 -48.28125 C 42.203125 -49.03125 41.320312 -49.503906 40.375 -49.703125 Z M 50.921875 -49.703125 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(160.821452, 207.372096)\"><g><path d=\"M 23.03125 -0.8125 C 26.207031 -0.8125 29.316406 -1.554688 32.359375 -3.046875 C 35.398438 -4.535156 37.695312 -6.734375 39.25 -9.640625 L 36.921875 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.035156 -49.296875 3.546875 -49.703125 L 36.21875 -49.703125 L 38.234375 -40.171875 C 36.679688 -43.140625 34.601562 -45.332031 32 -46.75 C 29.394531 -48.175781 26.4375 -48.890625 23.125 -48.890625 L 13.390625 -48.890625 L 13.390625 -25.65625 L 19.671875 -25.65625 C 21.503906 -25.65625 23.195312 -26.046875 24.75 -26.828125 C 26.300781 -27.609375 27.347656 -28.976562 27.890625 -30.9375 L 27.890625 -19.78125 C 27.347656 -21.738281 26.300781 -23.070312 24.75 -23.78125 C 23.195312 -24.5 21.503906 -24.859375 19.671875 -24.859375 L 13.390625 -24.859375 L 13.390625 -0.8125 Z M 23.03125 -0.8125 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(199.163067, 207.372096)\"><g><path d=\"M 63.203125 9.125 C 60.898438 10.6875 58.613281 11.972656 56.34375 12.984375 C 54.082031 13.992188 51.5 14.5 48.59375 14.5 C 46.351562 14.5 44.269531 14.144531 42.34375 13.4375 C 40.414062 12.726562 38.539062 11.832031 36.71875 10.75 C 34.894531 9.664062 33.085938 8.5 31.296875 7.25 C 29.503906 6 27.644531 4.832031 25.71875 3.75 C 23.789062 2.664062 21.707031 1.769531 19.46875 1.0625 C 17.238281 0.351562 14.804688 0 12.171875 0 L 3.34375 0 C 4.90625 -0.332031 5.9375 -1.160156 6.4375 -2.484375 C 6.945312 -3.804688 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.625 C 7.203125 -44.96875 6.929688 -46.234375 6.390625 -47.421875 C 5.847656 -48.609375 4.832031 -49.367188 3.34375 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.367188 14.539062 -48.609375 14 -47.421875 C 13.457031 -46.234375 13.1875 -44.96875 13.1875 -43.625 L 13.1875 -0.90625 C 16.632812 -0.769531 19.976562 -0.078125 23.21875 1.171875 C 26.46875 2.421875 29.664062 3.785156 32.8125 5.265625 C 35.957031 6.753906 39.132812 8.09375 42.34375 9.28125 C 45.5625 10.46875 48.859375 11.0625 52.234375 11.0625 C 54.203125 11.0625 56.03125 10.875 57.71875 10.5 C 59.40625 10.125 61.128906 9.5 62.890625 8.625 Z M 63.203125 9.125 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(219.652219, 207.372096)\"><g><path d=\"M 10.546875 -4.671875 C 10.546875 -3.378906 10.914062 -2.359375 11.65625 -1.609375 C 12.40625 -0.867188 13.351562 -0.332031 14.5 0 L 3.65625 0 C 4.875 -0.40625 6.019531 -1.148438 7.09375 -2.234375 C 8.175781 -3.316406 8.957031 -4.5 9.4375 -5.78125 L 26.671875 -50.3125 L 44.03125 -5.78125 C 44.5625 -4.5625 45.25 -3.394531 46.09375 -2.28125 C 46.945312 -1.164062 48.015625 -0.40625 49.296875 0 L 34.6875 0 C 35.570312 -0.269531 36.300781 -0.859375 36.875 -1.765625 C 37.445312 -2.679688 37.734375 -3.546875 37.734375 -4.359375 C 37.734375 -4.898438 37.492188 -5.847656 37.015625 -7.203125 C 36.546875 -8.554688 36.003906 -10.007812 35.390625 -11.5625 C 34.785156 -13.113281 34.195312 -14.597656 33.625 -16.015625 C 33.050781 -17.441406 32.628906 -18.492188 32.359375 -19.171875 L 15.625 -19.171875 C 15.351562 -18.492188 14.945312 -17.492188 14.40625 -16.171875 C 13.863281 -14.859375 13.304688 -13.472656 12.734375 -12.015625 C 12.160156 -10.566406 11.648438 -9.164062 11.203125 -7.8125 C 10.765625 -6.457031 10.546875 -5.410156 10.546875 -4.671875 Z M 15.828125 -19.984375 L 31.953125 -19.984375 L 23.9375 -40.875 Z M 15.828125 -19.984375 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(264.586698, 207.372096)\"><g><path d=\"M 13.390625 -6.296875 C 13.390625 -4.941406 13.660156 -3.671875 14.203125 -2.484375 C 14.742188 -1.296875 15.691406 -0.46875 17.046875 0 L 3.65625 0 C 5.070312 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.070312 -49.296875 3.65625 -49.703125 L 20.890625 -49.703125 C 23.328125 -49.703125 25.710938 -49.429688 28.046875 -48.890625 C 30.378906 -48.347656 32.457031 -47.484375 34.28125 -46.296875 C 36.113281 -45.117188 37.585938 -43.566406 38.703125 -41.640625 C 39.816406 -39.710938 40.375 -37.363281 40.375 -34.59375 C 40.375 -30.601562 39.171875 -27.351562 36.765625 -24.84375 C 34.367188 -22.34375 31.3125 -20.65625 27.59375 -19.78125 L 36.828125 -4.875 C 37.566406 -3.789062 38.441406 -2.804688 39.453125 -1.921875 C 40.472656 -1.046875 41.554688 -0.40625 42.703125 0 L 33.265625 0 L 21.203125 -19.578125 L 13.390625 -19.578125 Z M 13.390625 -20.28125 L 20.28125 -20.28125 C 24.539062 -20.28125 27.90625 -21.597656 30.375 -24.234375 C 32.84375 -26.878906 34.078125 -30.332031 34.078125 -34.59375 C 34.078125 -39.050781 32.894531 -42.546875 30.53125 -45.078125 C 28.164062 -47.617188 24.75 -48.890625 20.28125 -48.890625 L 13.390625 -48.890625 Z M 13.390625 -20.28125 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(306.478521, 207.372096)\"><g><path d=\"M 13.390625 -6.484375 C 13.390625 -5.140625 13.625 -3.835938 14.09375 -2.578125 C 14.570312 -1.328125 15.519531 -0.46875 16.9375 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.3125 6.484375 -2.53125 C 6.960938 -3.75 7.203125 -5.066406 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.117188 6.484375 -47.265625 C 6.015625 -48.421875 5.035156 -49.234375 3.546875 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.234375 14.570312 -48.421875 14.09375 -47.265625 C 13.625 -46.117188 13.390625 -44.867188 13.390625 -43.515625 Z M 13.390625 -6.484375 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(322.504577, 207.372096)\"><g><path d=\"M 47.375 -7.203125 C 46.21875 -6.191406 44.894531 -5.242188 43.40625 -4.359375 C 41.925781 -3.484375 40.375 -2.707031 38.75 -2.03125 C 37.125 -1.351562 35.484375 -0.8125 33.828125 -0.40625 C 32.171875 0 30.566406 0.203125 29.015625 0.203125 C 25.492188 0.203125 22.175781 -0.4375 19.0625 -1.71875 C 15.957031 -3.007812 13.253906 -4.769531 10.953125 -7 C 8.648438 -9.226562 6.835938 -11.863281 5.515625 -14.90625 C 4.203125 -17.945312 3.546875 -21.265625 3.546875 -24.859375 C 3.546875 -28.441406 4.203125 -31.753906 5.515625 -34.796875 C 6.835938 -37.835938 8.648438 -40.472656 10.953125 -42.703125 C 13.253906 -44.929688 15.957031 -46.6875 19.0625 -47.96875 C 22.175781 -49.257812 25.492188 -49.90625 29.015625 -49.90625 C 31.785156 -49.90625 34.65625 -49.550781 37.625 -48.84375 C 40.601562 -48.132812 43.175781 -46.898438 45.34375 -45.140625 L 45.34375 -37.03125 C 44.332031 -38.445312 43.164062 -39.863281 41.84375 -41.28125 C 40.519531 -42.707031 39.097656 -43.992188 37.578125 -45.140625 C 36.054688 -46.285156 34.414062 -47.210938 32.65625 -47.921875 C 30.90625 -48.640625 29.113281 -49 27.28125 -49 C 24.375 -49 21.875 -48.300781 19.78125 -46.90625 C 17.6875 -45.519531 15.945312 -43.757812 14.5625 -41.625 C 13.175781 -39.5 12.160156 -37.117188 11.515625 -34.484375 C 10.867188 -31.847656 10.546875 -29.28125 10.546875 -26.78125 C 10.546875 -24.007812 10.914062 -21.082031 11.65625 -18 C 12.40625 -14.925781 13.554688 -12.117188 15.109375 -9.578125 C 16.671875 -7.046875 18.648438 -4.953125 21.046875 -3.296875 C 23.453125 -1.640625 26.3125 -0.8125 29.625 -0.8125 C 31.507812 -0.8125 33.28125 -1.164062 34.9375 -1.875 C 36.601562 -2.582031 38.128906 -3.507812 39.515625 -4.65625 C 40.898438 -5.8125 42.148438 -7.132812 43.265625 -8.625 C 44.378906 -10.113281 45.34375 -11.632812 46.15625 -13.1875 Z M 47.375 -7.203125 \"/></g></g></g><g fill=\"#4a3a32\" fill-opacity=\"1\"><g transform=\"translate(369.06237, 207.372096)\"><g><path d=\"M 23.03125 -0.8125 C 26.207031 -0.8125 29.316406 -1.554688 32.359375 -3.046875 C 35.398438 -4.535156 37.695312 -6.734375 39.25 -9.640625 L 36.921875 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.035156 -49.296875 3.546875 -49.703125 L 36.21875 -49.703125 L 38.234375 -40.171875 C 36.679688 -43.140625 34.601562 -45.332031 32 -46.75 C 29.394531 -48.175781 26.4375 -48.890625 23.125 -48.890625 L 13.390625 -48.890625 L 13.390625 -25.65625 L 19.671875 -25.65625 C 21.503906 -25.65625 23.195312 -26.046875 24.75 -26.828125 C 26.300781 -27.609375 27.347656 -28.976562 27.890625 -30.9375 L 27.890625 -19.78125 C 27.347656 -21.738281 26.300781 -23.070312 24.75 -23.78125 C 23.195312 -24.5 21.503906 -24.859375 19.671875 -24.859375 L 13.390625 -24.859375 L 13.390625 -0.8125 Z M 23.03125 -0.8125 \"/></g></g></g><g transform=\"matrix(1, 0, 0, 1, 465, 144)\"><g clip-path=\"url(#3f1f396328)\"><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(55.929985, 33.95204)\"><g><path d=\"M 5.578125 -9.140625 L 5.578125 0 L 3.015625 0 L 3.015625 -21.96875 L 9.046875 -21.96875 C 11.742188 -21.96875 13.734375 -21.453125 15.015625 -20.421875 C 16.304688 -19.390625 16.953125 -17.835938 16.953125 -15.765625 C 16.953125 -12.859375 15.476562 -10.894531 12.53125 -9.875 L 18.5 0 L 15.484375 0 L 10.15625 -9.140625 Z M 5.578125 -11.328125 L 9.078125 -11.328125 C 10.878906 -11.328125 12.203125 -11.6875 13.046875 -12.40625 C 13.890625 -13.125 14.3125 -14.195312 14.3125 -15.625 C 14.3125 -17.082031 13.878906 -18.128906 13.015625 -18.765625 C 12.160156 -19.410156 10.785156 -19.734375 8.890625 -19.734375 L 5.578125 -19.734375 Z M 5.578125 -11.328125 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(81.10696, 33.95204)\"><g><path d=\"M 15.265625 0 L 3.015625 0 L 3.015625 -21.96875 L 15.265625 -21.96875 L 15.265625 -19.703125 L 5.578125 -19.703125 L 5.578125 -12.625 L 14.6875 -12.625 L 14.6875 -10.375 L 5.578125 -10.375 L 5.578125 -2.28125 L 15.265625 -2.28125 Z M 15.265625 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(104.375852, 33.95204)\"><g><path d=\"M 12.6875 -11.515625 L 20.15625 -11.515625 L 20.15625 -0.828125 C 18.988281 -0.453125 17.800781 -0.171875 16.59375 0.015625 C 15.394531 0.203125 14.007812 0.296875 12.4375 0.296875 C 9.101562 0.296875 6.507812 -0.691406 4.65625 -2.671875 C 2.800781 -4.648438 1.875 -7.421875 1.875 -10.984375 C 1.875 -13.265625 2.332031 -15.265625 3.25 -16.984375 C 4.164062 -18.703125 5.484375 -20.015625 7.203125 -20.921875 C 8.929688 -21.835938 10.953125 -22.296875 13.265625 -22.296875 C 15.609375 -22.296875 17.796875 -21.863281 19.828125 -21 L 18.828125 -18.75 C 16.847656 -19.582031 14.941406 -20 13.109375 -20 C 10.429688 -20 8.335938 -19.203125 6.828125 -17.609375 C 5.328125 -16.015625 4.578125 -13.804688 4.578125 -10.984375 C 4.578125 -8.015625 5.300781 -5.765625 6.75 -4.234375 C 8.195312 -2.703125 10.328125 -1.9375 13.140625 -1.9375 C 14.660156 -1.9375 16.144531 -2.113281 17.59375 -2.46875 L 17.59375 -9.234375 L 12.6875 -9.234375 Z M 12.6875 -11.515625 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(132.933291, 33.95204)\"><g><path d=\"M 19.609375 -21.96875 L 19.609375 -7.75 C 19.609375 -5.25 18.851562 -3.28125 17.34375 -1.84375 C 15.832031 -0.414062 13.753906 0.296875 11.109375 0.296875 C 8.460938 0.296875 6.414062 -0.421875 4.96875 -1.859375 C 3.519531 -3.304688 2.796875 -5.289062 2.796875 -7.8125 L 2.796875 -21.96875 L 5.34375 -21.96875 L 5.34375 -7.640625 C 5.34375 -5.804688 5.84375 -4.394531 6.84375 -3.40625 C 7.851562 -2.425781 9.328125 -1.9375 11.265625 -1.9375 C 13.117188 -1.9375 14.546875 -2.429688 15.546875 -3.421875 C 16.554688 -4.410156 17.0625 -5.828125 17.0625 -7.671875 L 17.0625 -21.96875 Z M 19.609375 -21.96875 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(161.490729, 33.95204)\"><g><path d=\"M 3.015625 0 L 3.015625 -21.96875 L 5.578125 -21.96875 L 5.578125 -2.3125 L 15.265625 -2.3125 L 15.265625 0 Z M 3.015625 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(183.617776, 33.95204)\"><g><path d=\"M 16.828125 0 L 14.09375 -6.984375 L 5.296875 -6.984375 L 2.578125 0 L 0 0 L 8.6875 -22.0625 L 10.84375 -22.0625 L 19.484375 0 Z M 13.296875 -9.28125 L 10.75 -16.09375 C 10.414062 -16.957031 10.070312 -18.015625 9.71875 -19.265625 C 9.5 -18.304688 9.1875 -17.25 8.78125 -16.09375 L 6.1875 -9.28125 Z M 13.296875 -9.28125 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(209.24548, 33.95204)\"><g><path d=\"M 9.78125 0 L 7.234375 0 L 7.234375 -19.703125 L 0.265625 -19.703125 L 0.265625 -21.96875 L 16.75 -21.96875 L 16.75 -19.703125 L 9.78125 -19.703125 Z M 9.78125 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(232.424226, 33.95204)\"><g><path d=\"M 15.265625 0 L 3.015625 0 L 3.015625 -21.96875 L 15.265625 -21.96875 L 15.265625 -19.703125 L 5.578125 -19.703125 L 5.578125 -12.625 L 14.6875 -12.625 L 14.6875 -10.375 L 5.578125 -10.375 L 5.578125 -2.28125 L 15.265625 -2.28125 Z M 15.265625 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(255.693117, 33.95204)\"><g><path d=\"M 2.28125 -1.59375 C 2.28125 -2.257812 2.429688 -2.765625 2.734375 -3.109375 C 3.046875 -3.460938 3.488281 -3.640625 4.0625 -3.640625 C 4.644531 -3.640625 5.097656 -3.460938 5.421875 -3.109375 C 5.742188 -2.765625 5.90625 -2.257812 5.90625 -1.59375 C 5.90625 -0.9375 5.738281 -0.429688 5.40625 -0.078125 C 5.082031 0.265625 4.632812 0.4375 4.0625 0.4375 C 3.550781 0.4375 3.125 0.28125 2.78125 -0.03125 C 2.445312 -0.351562 2.28125 -0.875 2.28125 -1.59375 Z M 2.28125 -1.59375 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(2.036351, 76.917761)\"><g><path d=\"M 5.578125 -9.140625 L 5.578125 0 L 3.015625 0 L 3.015625 -21.96875 L 9.046875 -21.96875 C 11.742188 -21.96875 13.734375 -21.453125 15.015625 -20.421875 C 16.304688 -19.390625 16.953125 -17.835938 16.953125 -15.765625 C 16.953125 -12.859375 15.476562 -10.894531 12.53125 -9.875 L 18.5 0 L 15.484375 0 L 10.15625 -9.140625 Z M 5.578125 -11.328125 L 9.078125 -11.328125 C 10.878906 -11.328125 12.203125 -11.6875 13.046875 -12.40625 C 13.890625 -13.125 14.3125 -14.195312 14.3125 -15.625 C 14.3125 -17.082031 13.878906 -18.128906 13.015625 -18.765625 C 12.160156 -19.410156 10.785156 -19.734375 8.890625 -19.734375 L 5.578125 -19.734375 Z M 5.578125 -11.328125 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(27.213326, 76.917761)\"><g><path d=\"M 22.09375 -11.015625 C 22.09375 -7.492188 21.203125 -4.726562 19.421875 -2.71875 C 17.648438 -0.707031 15.179688 0.296875 12.015625 0.296875 C 8.773438 0.296875 6.273438 -0.691406 4.515625 -2.671875 C 2.753906 -4.648438 1.875 -7.441406 1.875 -11.046875 C 1.875 -14.617188 2.753906 -17.390625 4.515625 -19.359375 C 6.285156 -21.328125 8.789062 -22.3125 12.03125 -22.3125 C 15.1875 -22.3125 17.648438 -21.3125 19.421875 -19.3125 C 21.203125 -17.3125 22.09375 -14.546875 22.09375 -11.015625 Z M 4.578125 -11.015625 C 4.578125 -8.035156 5.210938 -5.773438 6.484375 -4.234375 C 7.753906 -2.703125 9.597656 -1.9375 12.015625 -1.9375 C 14.441406 -1.9375 16.273438 -2.703125 17.515625 -4.234375 C 18.765625 -5.765625 19.390625 -8.023438 19.390625 -11.015625 C 19.390625 -13.972656 18.769531 -16.210938 17.53125 -17.734375 C 16.289062 -19.265625 14.457031 -20.03125 12.03125 -20.03125 C 9.601562 -20.03125 7.753906 -19.257812 6.484375 -17.71875 C 5.210938 -16.1875 4.578125 -13.953125 4.578125 -11.015625 Z M 4.578125 -11.015625 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(57.333289, 76.917761)\"><g><path d=\"M 22.09375 -11.015625 C 22.09375 -7.492188 21.203125 -4.726562 19.421875 -2.71875 C 17.648438 -0.707031 15.179688 0.296875 12.015625 0.296875 C 8.773438 0.296875 6.273438 -0.691406 4.515625 -2.671875 C 2.753906 -4.648438 1.875 -7.441406 1.875 -11.046875 C 1.875 -14.617188 2.753906 -17.390625 4.515625 -19.359375 C 6.285156 -21.328125 8.789062 -22.3125 12.03125 -22.3125 C 15.1875 -22.3125 17.648438 -21.3125 19.421875 -19.3125 C 21.203125 -17.3125 22.09375 -14.546875 22.09375 -11.015625 Z M 4.578125 -11.015625 C 4.578125 -8.035156 5.210938 -5.773438 6.484375 -4.234375 C 7.753906 -2.703125 9.597656 -1.9375 12.015625 -1.9375 C 14.441406 -1.9375 16.273438 -2.703125 17.515625 -4.234375 C 18.765625 -5.765625 19.390625 -8.023438 19.390625 -11.015625 C 19.390625 -13.972656 18.769531 -16.210938 17.53125 -17.734375 C 16.289062 -19.265625 14.457031 -20.03125 12.03125 -20.03125 C 9.601562 -20.03125 7.753906 -19.257812 6.484375 -17.71875 C 5.210938 -16.1875 4.578125 -13.953125 4.578125 -11.015625 Z M 4.578125 -11.015625 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(87.453253, 76.917761)\"><g><path d=\"M 9.78125 0 L 7.234375 0 L 7.234375 -19.703125 L 0.265625 -19.703125 L 0.265625 -21.96875 L 16.75 -21.96875 L 16.75 -19.703125 L 9.78125 -19.703125 Z M 9.78125 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(110.631999, 76.917761)\"><g><path d=\"M 2.28125 -1.59375 C 2.28125 -2.257812 2.429688 -2.765625 2.734375 -3.109375 C 3.046875 -3.460938 3.488281 -3.640625 4.0625 -3.640625 C 4.644531 -3.640625 5.097656 -3.460938 5.421875 -3.109375 C 5.742188 -2.765625 5.90625 -2.257812 5.90625 -1.59375 C 5.90625 -0.9375 5.738281 -0.429688 5.40625 -0.078125 C 5.082031 0.265625 4.632812 0.4375 4.0625 0.4375 C 3.550781 0.4375 3.125 0.28125 2.78125 -0.03125 C 2.445312 -0.351562 2.28125 -0.875 2.28125 -1.59375 Z M 2.28125 -1.59375 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(124.976469, 76.917761)\"><g/></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(139.125625, 76.917761)\"><g><path d=\"M 5.578125 -9.140625 L 5.578125 0 L 3.015625 0 L 3.015625 -21.96875 L 9.046875 -21.96875 C 11.742188 -21.96875 13.734375 -21.453125 15.015625 -20.421875 C 16.304688 -19.390625 16.953125 -17.835938 16.953125 -15.765625 C 16.953125 -12.859375 15.476562 -10.894531 12.53125 -9.875 L 18.5 0 L 15.484375 0 L 10.15625 -9.140625 Z M 5.578125 -11.328125 L 9.078125 -11.328125 C 10.878906 -11.328125 12.203125 -11.6875 13.046875 -12.40625 C 13.890625 -13.125 14.3125 -14.195312 14.3125 -15.625 C 14.3125 -17.082031 13.878906 -18.128906 13.015625 -18.765625 C 12.160156 -19.410156 10.785156 -19.734375 8.890625 -19.734375 L 5.578125 -19.734375 Z M 5.578125 -11.328125 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(164.3026, 76.917761)\"><g><path d=\"M 15.265625 0 L 3.015625 0 L 3.015625 -21.96875 L 15.265625 -21.96875 L 15.265625 -19.703125 L 5.578125 -19.703125 L 5.578125 -12.625 L 14.6875 -12.625 L 14.6875 -10.375 L 5.578125 -10.375 L 5.578125 -2.28125 L 15.265625 -2.28125 Z M 15.265625 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(187.571492, 76.917761)\"><g><path d=\"M 12.4375 -20 C 10.019531 -20 8.109375 -19.195312 6.703125 -17.59375 C 5.304688 -15.988281 4.609375 -13.785156 4.609375 -10.984375 C 4.609375 -8.109375 5.28125 -5.882812 6.625 -4.3125 C 7.976562 -2.75 9.90625 -1.96875 12.40625 -1.96875 C 13.9375 -1.96875 15.679688 -2.242188 17.640625 -2.796875 L 17.640625 -0.5625 C 16.117188 0.0078125 14.242188 0.296875 12.015625 0.296875 C 8.773438 0.296875 6.273438 -0.679688 4.515625 -2.640625 C 2.753906 -4.609375 1.875 -7.398438 1.875 -11.015625 C 1.875 -13.273438 2.296875 -15.257812 3.140625 -16.96875 C 3.992188 -18.675781 5.21875 -19.988281 6.8125 -20.90625 C 8.414062 -21.832031 10.296875 -22.296875 12.453125 -22.296875 C 14.765625 -22.296875 16.78125 -21.875 18.5 -21.03125 L 17.421875 -18.828125 C 15.753906 -19.609375 14.09375 -20 12.4375 -20 Z M 12.4375 -20 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(213.139099, 76.917761)\"><g><path d=\"M 3.015625 0 L 3.015625 -21.96875 L 5.578125 -21.96875 L 5.578125 -2.3125 L 15.265625 -2.3125 L 15.265625 0 Z M 3.015625 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(235.266145, 76.917761)\"><g><path d=\"M 16.828125 0 L 14.09375 -6.984375 L 5.296875 -6.984375 L 2.578125 0 L 0 0 L 8.6875 -22.0625 L 10.84375 -22.0625 L 19.484375 0 Z M 13.296875 -9.28125 L 10.75 -16.09375 C 10.414062 -16.957031 10.070312 -18.015625 9.71875 -19.265625 C 9.5 -18.304688 9.1875 -17.25 8.78125 -16.09375 L 6.1875 -9.28125 Z M 13.296875 -9.28125 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(260.893849, 76.917761)\"><g><path d=\"M 3.015625 0 L 3.015625 -21.96875 L 5.578125 -21.96875 L 5.578125 0 Z M 3.015625 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(275.628951, 76.917761)\"><g><path d=\"M 12.75 0 L 5.296875 -19.484375 L 5.171875 -19.484375 C 5.304688 -17.941406 5.375 -16.109375 5.375 -13.984375 L 5.375 0 L 3.015625 0 L 3.015625 -21.96875 L 6.875 -21.96875 L 13.828125 -3.84375 L 13.953125 -3.84375 L 20.96875 -21.96875 L 24.78125 -21.96875 L 24.78125 0 L 22.234375 0 L 22.234375 -14.15625 C 22.234375 -15.78125 22.300781 -17.546875 22.4375 -19.453125 L 22.3125 -19.453125 L 14.796875 0 Z M 12.75 0 \"/></g></g></g><g fill=\"#a47c63\" fill-opacity=\"1\"><g transform=\"translate(309.565081, 76.917761)\"><g><path d=\"M 2.28125 -1.59375 C 2.28125 -2.257812 2.429688 -2.765625 2.734375 -3.109375 C 3.046875 -3.460938 3.488281 -3.640625 4.0625 -3.640625 C 4.644531 -3.640625 5.097656 -3.460938 5.421875 -3.109375 C 5.742188 -2.765625 5.90625 -2.257812 5.90625 -1.59375 C 5.90625 -0.9375 5.738281 -0.429688 5.40625 -0.078125 C 5.082031 0.265625 4.632812 0.4375 4.0625 0.4375 C 3.550781 0.4375 3.125 0.28125 2.78125 -0.03125 C 2.445312 -0.351562 2.28125 -0.875 2.28125 -1.59375 Z M 2.28125 -1.59375 \"/></g></g></g></g></g><path stroke-linecap=\"butt\" transform=\"matrix(0.00000000130881, 0.749891, -0.749891, 0.00000000130881, 438.056207, 142.33078)\" fill=\"none\" stroke-linejoin=\"miter\" d=\"M 0.00166885 0.502099 L 120.48274 0.5021 \" stroke=\"#4a3a32\" stroke-width=\"1\" stroke-opacity=\"1\" stroke-miterlimit=\"4\"/></svg>";

const Logo = ({ w = 460 }) => (
  <div
    role="img"
    aria-label="LoveLarice"
    style={{ width: w, maxWidth: "100%", margin: "0 auto" }}
    dangerouslySetInnerHTML={{
      __html: LOGO
        .replace(/width="1100"/, 'width="100%"')
        .replace(/height="500"/, "")
        .replace('clip-path="url(#3f1f396328)"', "")
        .replace(/viewBox="0 0 824.88 374.999991"/, 'viewBox="0 132 824.88 110"')
    }} />
);

/* Copy: every em dash collapsed to comma/colon/period per impeccable rules. */
const QS = [
  { q: "When you think about your wellness, which word feels most true?", a: [
    { t: "Scattered.", k: "reg" },
    { t: "Inconsistent.", k: "root" },
    { t: "Overextended.", k: "rec" } ] },
  { q: "Which sentence sounds most like your inner voice on a hard day?", a: [
    { t: "‘Why can’t I just calm down?’", k: "reg" },
    { t: "‘Why can’t I just stay consistent?’", k: "root" },
    { t: "‘Why can’t I just say no?’", k: "rec" } ] },
  { q: "What does your relationship with rest look like?", a: [
    { t: "I can’t settle. My mind won’t stop even when my body is exhausted.", k: "reg" },
    { t: "I rest, but never feel fully recharged.", k: "root" },
    { t: "I rarely rest. There’s always someone who needs me first.", k: "rec" } ] },
  { q: "Which has someone said to you?", a: [
    { t: "‘You seem anxious, or like you’re always on edge.’", k: "reg" },
    { t: "‘You always start strong but can’t seem to maintain it.’", k: "root" },
    { t: "‘You give so much. Why won’t you let someone take care of you?’", k: "rec" } ] },
  { q: "Which wellness experience do you relate to most?", a: [
    { t: "I’ve tried relaxation strategies, but my body won’t cooperate.", k: "reg" },
    { t: "I’ve started dozens of programs and never finished one.", k: "root" },
    { t: "I prioritize everyone else’s health before my own.", k: "rec" } ] },
  { q: "When your day starts to feel overwhelming, what happens first?", a: [
    { t: "You get reactive: snapping, shutting down, or cycling through worst-case scenarios.", k: "reg" },
    { t: "You abandon the healthy habits you were building. The plan dissolves.", k: "root" },
    { t: "You take on more to feel in control, and end up depleted by evening.", k: "rec" } ] },
  { q: "What does your most desired future state feel like?", a: [
    { t: "Waking up calm and focused. No racing thoughts, no tension before the day begins.", k: "reg" },
    { t: "Having habits that actually stick past the first two weeks.", k: "root" },
    { t: "Living in full alignment, protecting my time and energy without guilt.", k: "rec" } ] },
  { q: "What would change everything for you right now?", a: [
    { t: "Finally feeling calm and in control of my own nervous system.", k: "reg" },
    { t: "Building habits that last more than thirty days.", k: "root" },
    { t: "Having the courage and permission to put myself first.", k: "rec" } ] },
];

const ARCH = {
  reg: {
    name: "The Regulator", italic: "Regulator", pillar: "Regulated Living",
    c: T.reg,
    id: "The woman who chooses intentional calm over reactive chaos. She is not immune to stress; she has built the tools to move through it without being consumed by it.",
    now: "Living on autopilot. Chronically reactive, snapping at people she loves, shutting down under pressure, or swinging between anxious hyperactivity and total collapse.",
    pattern: "Your primary dysregulation pattern is chronic sympathetic activation without parasympathetic recovery. You can function at high capacity, which is exactly why this pattern goes unnoticed until burnout, insomnia, or an unexpected emotional collapse forces the issue. The work is not learning to calm down. It is teaching your nervous system that it is safe to actually rest.",
    offer: { name: "Regulation Mastery Kit", desc: "AI-guided analysis of your specific regulation patterns, a 30-day downregulation protocol with four interactive breathing practices, window-of-tolerance tracking, and a stress-cycle completion system built for high-capacity nervous systems that do not respond to generic relaxation advice." },
    old: ["This is just who I am.", "I perform better under pressure.", "I don’t have time to slow down."],
    nw: ["Peace is power.", "Regulation is not weakness; it is the foundation of everything.", "My calm is contagious."],
    mantras: ["I regulate before I react.", "Calm is a practice, not a personality.", "My nervous system is safe to rest."],
    ritual: { name: "The five-minute morning regulation practice",
      steps: ["Sixty seconds of extended-exhale breathing before you check your phone.", "Two minutes of body-scan awareness.", "Two minutes of affirmation journaling."],
      note: "This signals your nervous system that the day begins from regulation, not reaction." },
    supp: "Pure Magnesium Power supports the magnesium-dependent processes your nervous system runs on. The Nervous System Bundle ($44.99) pairs it with Ashwagandha for HPA-axis support.",
    content: ["Your exhaustion isn’t laziness. Your nervous system is overloaded.", "The real reason you can’t focus after 2pm.", "You don’t need more motivation. You need a regulated brain."],
    shopifyUrl: "https://lovelarice.com/cart/61863893467506:1"
  },
  root: {
    name: "The Rooted One", italic: "Rooted One", pillar: "Rooted Wellness",
    c: T.root,
    id: "The woman who builds health that lasts. She is not chasing the next program; she is cultivating it. Slowly, deliberately, with evidence at her back.",
    now: "Frustrated and defeated by wellness culture. Significant money and energy spent on programs that promised results and delivered nothing lasting.",
    pattern: "Your primary pattern is the start-stop cycle. You begin strong, build momentum for ten to fourteen days, then something disrupts the rhythm and the whole system collapses. This is not a discipline failure. It is an identity gap. You have not yet built enough evidence that you are someone who follows through, so every disruption triggers the old story. The work is not finding the right program. It is building a streak long enough that consistency becomes who you are.",
    offer: { name: "Rooted Reset Challenge Kit", desc: "AI-powered foundation audit of your specific tracking data, a 30-day system with miss-recovery protocol, identity prompts that unlock at days 7, 14, 21, and 30, weekly habit audits, and the science behind why your previous programs failed." },
    old: ["I just need to find the right program.", "I don’t have the discipline others have.", "My body is working against me."],
    nw: ["Consistency beats intensity, always.", "Real health is built on foundations, not trends.", "I nourish my body. I do not punish it."],
    mantras: ["I root to rise.", "Consistency is my superpower.", "Foundations before fads."],
    ritual: { name: "The daily foundation tracker",
      steps: ["Track four things daily: hydration, sleep window, movement, one nourishing meal.", "No calorie counting. No perfection metrics.", "Foundation behavior tracking only."],
      note: "The streak becomes your identity anchor. Every day you track is evidence that you follow through." },
    supp: "Resveratrol is the cellular-maintenance layer of the Rooted practice. Effects are measured in biomarkers over months: the long-game supplement for the long-game woman.",
    content: ["Here’s why every plan you’ve tried hasn’t stuck, and it has nothing to do with discipline.", "The wellness industry profits from your inconsistency.", "You don’t need a new program. You need a foundation."],
    shopifyUrl: "https://lovelarice.com/cart/61863893500274:1"
  },
  rec: {
    name: "The Power Reclaimer", italic: "Reclaimer", pillar: "Reclaimed Power",
    c: T.rec,
    id: "The woman who has stopped asking permission to take care of herself. She protects her energy, holds her boundaries, and leads from abundance rather than depletion.",
    now: "Running on empty and resentful about it. The person everyone leans on, who has not yet learned to say no. Chronically overextended.",
    pattern: "Your primary pattern is nervous-system depletion through chronic overextension. The reason saying no feels physically dangerous has nothing to do with your personality. It is a fawn response encoded in your nervous system. You have been giving more than you receive for so long that your body treats self-preservation as a threat. The work is not learning to set boundaries intellectually. It is teaching your nervous system that holding a boundary will not result in abandonment.",
    offer: { name: "Boundary Mastery Kit", desc: "AI-powered pattern analysis of your boundary journal and energy data, a 30-day boundary-escalation program (notice, small no’s, hard conversations, identity shift), pre-written scripts for work, family, partner, and friends, and the neuroscience of why no feels dangerous." },
    old: ["Putting myself first is selfish.", "If I say no, people will leave or be angry.", "I can handle it. I always do."],
    nw: ["Boundaries are freedom.", "I am no longer available for burnout.", "Choosing myself is not selfish. It is sovereign."],
    mantras: ["I choose myself without apology.", "My power is reclaimed, not given.", "Boundaries protect my peace and my energy."],
    ritual: { name: "The evening boundary check",
      steps: ["What did I say no to today?", "What did I protect?", "What will I claim for myself tomorrow?"],
      note: "This builds daily evidence that you hold boundaries." },
    supp: "The Nervous System Bundle (Magnesium plus Ashwagandha, $44.99) addresses the depletion pattern most Power Reclaimers share with the Regulator.",
    content: ["The reason saying no feels physically dangerous, and it has nothing to do with your personality.", "You cannot pour from an empty vessel, and yet here we are.", "We are not in our burnout era anymore."],
    shopifyUrl: "https://lovelarice.com/cart/61863893533042:1"
  },
};

function score(ans) {
  const c = { reg: 0, root: 0, rec: 0 };
  ans.forEach(a => { if (a) c[a]++; });
  return Object.entries(c).sort((a, b) => b[1] - a[1])[0][0];
}

export default function App() {
  const [v, setV] = useState("welcome");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [qi, setQi] = useState(0);
  const [ans, setAns] = useState(Array(8).fill(null));
  const [res, setRes] = useState(null);
  const [ld, setLd] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const offerRef = useRef(null);

  /* Analytics: funnel top (PostHog is initialized once in src/quiz/main.jsx) */
  useEffect(() => { trackQuizStarted(); }, []);

  /* Global styles: reduced-motion, focus-visible, narrow-viewport overrides */
  useEffect(() => {
    if (document.getElementById("ll-globals")) return;
    const s = document.createElement("style");
    s.id = "ll-globals";
    s.textContent = `
      :where(button, input, a):focus-visible {
        outline: 2px solid ${T.warmBrown};
        outline-offset: 3px;
        border-radius: 2px;
      }
      .ll-cta-light:focus-visible { outline-color: ${T.gold}; }

      @media (prefers-reduced-motion: reduce) {
        /* Gentler, not zero: stop looping/entrance movement but keep short
           opacity/color transitions that aid comprehension (nervous-system audience). */
        *, *::before, *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 200ms !important;
          scroll-behavior: auto !important;
        }
      }

      /* Narrow-viewport adjustments (phones ≤ 480px) */
      @media (max-width: 480px) {
        .ll-bleed { margin-left: 0 !important; margin-right: 0 !important; }
        .ll-opt { padding: 16px 18px !important; font-size: 15px !important; }
        .ll-opt-mark { top: 14px !important; right: 16px !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* Fonts */
  useEffect(() => {
    [
      ["Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600", "Cormorant"],
      ["Outfit:wght@300;400;500;600", "Outfit"]
    ].forEach(([fam, check]) => {
      if (!document.querySelector(`link[href*="${check}"]`)) {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
    });
  }, []);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [v, qi]);

  useEffect(() => {
    if (v === "result" && res) trackResultsViewed(res);
  }, [v, res]);

  useEffect(() => {
    if (v !== "result") return;
    return trackOfferBlockViewed(offerRef.current, res);
  }, [v, res]);

  const begin = () => { setErr(""); setV("quiz"); };

  const pick = k => {
    const n = [...ans]; n[qi] = k; setAns(n);
    trackQuestionAnswered(qi + 1, k);
    if (qi < 7) { setTimeout(() => setQi(qi + 1), 450); return; }
    setLd(true);
    setTimeout(() => {
      const archetype = score(n);
      setRes(archetype); setLd(false); setV("email");
      trackQuizCompleted(archetype);
    }, 1500);
  };

  // Email captured at peak intent, right before the reveal.
  const reveal = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setErr("Please enter a valid email address."); return; }
    setErr("");
    const e = email.trim();
    trackEmailCaptured(res);
    fetch("https://a.klaviyo.com/api/track", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: "YOUR_KLAVIYO_PUBLIC_KEY", event: "Archetype Revealed",
        customer_properties: { "$email": e },
        properties: { archetype: res, archetype_name: ARCH[res].name, pillar: ARCH[res].pillar }
      })
    }).catch(() => {});
    setV("result");
  };

  /* ── Shared styles ───────────────────────────────── */
  const page = {
    fontFamily: F, background: T.cream, color: T.ink,
    minHeight: "100dvh", WebkitFontSmoothing: "antialiased",
    fontFeatureSettings: '"kern","liga","calt"',
    textRendering: "optimizeLegibility",
  };
  const wrap = { maxWidth: 560, margin: "0 auto", paddingLeft: 24, paddingRight: 24 };

  /* ─────────────────────────────────────────────────
     LOADING
     ───────────────────────────────────────────────── */
  if (ld) return (
    <div style={page}>
      <style>{`
        @keyframes breathe { 0%,100%{transform:scale(1);opacity:.55} 50%{transform:scale(1.18);opacity:1} }
        @keyframes fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div
        role="status"
        aria-live="polite"
        style={{ ...wrap, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh" }}>
        <div aria-hidden="true" style={{
          width: 56, height: 56, borderRadius: "50%",
          border: `1px solid ${T.warmBrown}`,
          animation: "breathe 4.2s " + EASE_IN_OUT_QUINT + " infinite",
          marginBottom: 28,
        }} />
        <p style={{
          fontFamily: H, fontStyle: "italic", fontSize: 18,
          color: T.warmBrown, fontWeight: 500, animation: "fade .6s ease both",
        }}>Reading your pattern</p>
      </div>
    </div>
  );

  /* ─────────────────────────────────────────────────
     WELCOME
     ───────────────────────────────────────────────── */
  if (v === "welcome") return (
    <div style={page}>
      <style>{`
        @keyframes up { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: ${T.ink40} }
        .ll-cta { position: relative; overflow: hidden; isolation: isolate; }
        .ll-cta::before {
          content: ""; position: absolute; inset: 0; background: ${T.darkBrown};
          clip-path: inset(0 0 100% 0);
          transition: clip-path 380ms ${EASE_OUT_QUART}; z-index: -1;
        }
        .ll-cta:hover::before { clip-path: inset(0 0 0 0); }
        .ll-cta:hover { box-shadow: 0 10px 32px rgba(74,58,50,0.18); }
        .ll-cta:active { transform: scale(0.97); }
      `}</style>

      <div ref={ref} style={{ ...wrap, paddingTop: 56, paddingBottom: 72 }}>
        <div style={{ textAlign: "center", animation: "up .7s " + EASE_OUT_QUART + " both" }}>
          <Logo />

          <p style={{
            marginTop: 36, fontFamily: F, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.32em", textTransform: "uppercase", color: T.warmBrown,
            display: "inline-flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 24, height: 1, background: T.warmBrown, opacity: 0.6 }} />
            A nervous system assessment
          </p>

          <h1 style={{
            marginTop: 18,
            fontFamily: H, fontSize: "clamp(2.1rem, 6vw, 2.8rem)",
            fontWeight: 300, lineHeight: 1.08, color: T.nearBlack,
            letterSpacing: "-0.018em",
          }}>
            Which Wellness <em style={{
              fontStyle: "italic", fontWeight: 500, color: T.warmBrown,
              letterSpacing: "-0.014em"
            }}>Archetype</em> are you?
          </h1>

          <p style={{
            marginTop: 18, fontSize: 15.5, lineHeight: 1.75, fontWeight: 300,
            color: T.ink60, maxWidth: 420, margin: "18px auto 0",
          }}>
            Eight questions. No wrong answers. The truth about how your body responds to stress.
          </p>
        </div>

        <div style={{
          marginTop: 40, textAlign: "center",
          animation: "up .7s " + EASE_OUT_QUART + " .15s both",
        }}>
          <button
            type="button"
            className="ll-cta"
            onClick={begin}
            style={{
              display: "block", width: "100%", maxWidth: 300, margin: "0 auto",
              padding: "16px 0",
              fontFamily: F, fontSize: 12, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: T.cream, background: T.warmBrown,
              border: "none", cursor: "pointer",
              transition: `transform 220ms ${EASE_OUT_QUART}, box-shadow 220ms ${EASE_OUT_QUART}`,
            }}>
            Begin
          </button>
        </div>

        <div style={{
          marginTop: 40, textAlign: "center",
          animation: "up .7s " + EASE_OUT_QUART + " .3s both",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 36 }}>
            {[
              { c: T.reg,  l: "Regulator" },
              { c: T.root, l: "Rooted" },
              { c: T.rec,  l: "Reclaimer" }
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: a.c, opacity: 0.8,
                }} />
                <span style={{
                  fontSize: 11, color: T.ink60, fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>{a.l}</span>
              </div>
            ))}
          </div>
          <p style={{
            marginTop: 22, fontFamily: H, fontStyle: "italic",
            fontSize: 15, color: T.taupe, fontWeight: 400,
          }}>Eight questions, about three minutes.</p>
        </div>
      </div>
    </div>
  );

  /* ─────────────────────────────────────────────────
     QUIZ
     ───────────────────────────────────────────────── */
  if (v === "quiz") {
    const q = QS[qi];
    return (
      <div style={page}>
        <style>{`
          @keyframes slide { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
          .ll-opt {
            position: relative; display: block; width: 100%; text-align: left;
            padding: 20px 24px;
            font-family: ${F}; font-size: 15.5; line-height: 1.6;
            color: ${T.ink}; background: ${T.white};
            border: 1px solid ${T.taupe}66; cursor: pointer; box-sizing: border-box;
            transition: transform 280ms ${EASE_OUT_QUART},
                        border-color 280ms ${EASE_OUT_QUART},
                        background 280ms ${EASE_OUT_QUART};
          }
          .ll-opt:hover { border-color: ${T.warmBrown}; background: ${T.warmBeige}66; }
          .ll-opt:active { transform: scale(0.985); }
          .ll-opt[data-sel="1"] {
            border-color: ${T.warmBrown};
            background: ${T.warmBeige};
            box-shadow: inset 0 0 0 1px ${T.warmBrown};
          }
          .ll-opt-mark {
            position: absolute; top: 18px; right: 22px;
            font-family: ${H}; font-style: italic; font-size: 12.5;
            color: ${T.taupe}; letter-spacing: 0.08em;
          }
        `}</style>

        <div ref={ref} style={{ ...wrap, paddingTop: 36, paddingBottom: 64 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Logo w={180} />
          </div>

          {/* Progress: paired counter + tick row */}
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: 14,
          }}>
            <span style={{
              fontFamily: F, fontSize: 10.5, fontWeight: 500,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: T.warmBrown,
            }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: T.warmBrown, opacity: 0.6, marginRight: 10, transform: "translateY(-3px)" }} />
              Question
            </span>
            <span style={{
              fontFamily: H, fontStyle: "italic", fontSize: 18,
              color: T.warmBrown, fontWeight: 500,
            }}>
              {String(qi + 1).padStart(2, "0")}
              <span style={{ color: T.taupe, margin: "0 6px" }}>/</span>
              <span style={{ color: T.taupe }}>08</span>
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuemin={1} aria-valuemax={8} aria-valuenow={qi + 1}
            aria-label={`Question ${qi + 1} of 8`}
            style={{ display: "flex", gap: 6, marginBottom: 44 }}>
            {Array(8).fill(0).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 1.5,
                background: i <= qi ? T.warmBrown : T.taupe + "55",
                transition: `background 420ms ${EASE_OUT_QUART}`,
              }} />
            ))}
          </div>

          <div
            key={qi}
            aria-live="polite"
            aria-atomic="true"
            style={{ animation: `slide 380ms ${EASE_OUT_QUART}` }}>
            <h2 id={`ll-q-${qi}`} style={{
              fontFamily: H, fontSize: "clamp(1.55rem, 4.5vw, 1.95rem)",
              fontWeight: 400, lineHeight: 1.25, letterSpacing: "-0.012em",
              color: T.nearBlack, marginBottom: 32, textWrap: "balance",
            }}>{q.q}</h2>

            <div role="radiogroup" aria-labelledby={`ll-q-${qi}`} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.a.map((opt, i) => {
                const sel = ans[qi] === opt.k;
                return (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={sel}
                    className="ll-opt"
                    data-sel={sel ? "1" : "0"}
                    onClick={() => pick(opt.k)}
                  >
                    <span style={{ paddingRight: 36, display: "inline-block" }}>{opt.t}</span>
                    <span className="ll-opt-mark" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {qi > 0 && (
            <button
              onClick={() => setQi(qi - 1)}
              style={{
                marginTop: 22, fontFamily: F, fontSize: 11.5, fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: T.ink60, background: "none", border: "none",
                cursor: "pointer", padding: "8px 0",
                transition: `color 220ms ${EASE_OUT_QUART}`,
              }}
              onMouseEnter={e => e.currentTarget.style.color = T.warmBrown}
              onMouseLeave={e => e.currentTarget.style.color = T.ink60}>
              ← Previous question
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────
     EMAIL TO REVEAL (captured at peak intent)
     ───────────────────────────────────────────────── */
  if (v === "email" && res) {
    const a = ARCH[res];
    return (
      <div style={page}>
        <style>{`
          @keyframes up { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
          input::placeholder { color: ${T.ink40} }
          .ll-cta { position: relative; overflow: hidden; isolation: isolate; }
          .ll-cta::before {
            content: ""; position: absolute; inset: 0; background: ${T.darkBrown};
            clip-path: inset(0 0 100% 0);
            transition: clip-path 380ms ${EASE_OUT_QUART}; z-index: -1;
          }
          .ll-cta:hover::before { clip-path: inset(0 0 0 0); }
          .ll-cta:hover { box-shadow: 0 10px 32px rgba(74,58,50,0.18); }
          .ll-cta:active { transform: scale(0.97); }
        `}</style>

        <div ref={ref} style={{ ...wrap, minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 56, paddingBottom: 72 }}>
          <div style={{ textAlign: "center", animation: "up .7s " + EASE_OUT_QUART + " both" }}>
            <Logo w={160} />

            <p style={{
              marginTop: 32, fontFamily: F, fontSize: 11, fontWeight: 500,
              letterSpacing: "0.32em", textTransform: "uppercase", color: a.c,
              display: "inline-flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ width: 22, height: 1, background: a.c, opacity: 0.6 }} />
              Your pattern is ready
            </p>

            <h1 style={{
              marginTop: 16, fontFamily: H, fontSize: "clamp(1.9rem, 5.6vw, 2.5rem)",
              fontWeight: 300, lineHeight: 1.12, color: T.nearBlack, letterSpacing: "-0.018em",
              textWrap: "balance",
            }}>
              Where should we send your <em style={{ fontStyle: "italic", fontWeight: 500, color: a.c }}>full profile</em>?
            </h1>

            <p style={{
              marginTop: 16, fontSize: 15, lineHeight: 1.75, fontWeight: 300,
              color: T.ink60, maxWidth: 400, margin: "16px auto 0",
            }}>
              Enter your email to reveal your archetype and receive your matched guide.
            </p>
          </div>

          <form
            noValidate
            onSubmit={e => { e.preventDefault(); reveal(); }}
            style={{
              marginTop: 36, padding: "32px 30px",
              background: T.white, border: `1px solid ${T.taupe}55`,
              animation: "up .7s " + EASE_OUT_QUART + " .12s both",
            }}>
            <label htmlFor="ll-email" style={{
              display: "block", fontFamily: F, fontSize: 10.5, fontWeight: 500,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: T.warmBrown, marginBottom: 10,
            }}>Email address</label>

            <input
              id="ll-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              spellCheck="false"
              autoFocus
              aria-invalid={!!err}
              aria-describedby={err ? "ll-email-err" : "ll-email-help"}
              required
              value={email}
              onChange={e => { setEmail(e.target.value); setErr(""); }}
              placeholder="you@email.com"
              style={{
                width: "100%", padding: "12px 0",
                fontSize: 16, fontFamily: F, fontWeight: 300,
                border: "none", borderBottom: `1px solid ${err ? T.rec : T.ink40}`,
                background: "transparent", color: T.ink, outline: "none",
                boxSizing: "border-box",
                transition: `border-color 220ms ${EASE_OUT_QUART}`,
              }}
              onFocus={e => { if (!err) e.target.style.borderBottomColor = T.warmBrown; }}
              onBlur={e => { if (!err) e.target.style.borderBottomColor = T.ink40; }}
            />

            {err && <p id="ll-email-err" role="alert" style={{ fontSize: 12, color: T.rec, marginTop: 10, fontWeight: 500 }}>{err}</p>}

            <p id="ll-email-help" style={{ fontSize: 12, color: T.ink40, marginTop: 12, lineHeight: 1.65 }}>
              Your archetype profile and matched guide will be delivered here.
            </p>

            <button
              type="submit"
              className="ll-cta"
              style={{
                display: "block", width: "100%", marginTop: 26,
                padding: "16px 0",
                fontFamily: F, fontSize: 12, fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: T.cream, background: a.c,
                border: "none", cursor: "pointer",
                transition: `transform 220ms ${EASE_OUT_QUART}, box-shadow 220ms ${EASE_OUT_QUART}`,
              }}>
              Reveal my archetype
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────
     RESULT
     ───────────────────────────────────────────────── */
  if (v === "result" && res) {
    const a = ARCH[res];

    const Eyebrow = ({ children, accent }) => (
      <p style={{
        display: "inline-flex", alignItems: "center", gap: 12,
        fontFamily: F, fontSize: 10.5, fontWeight: 500,
        letterSpacing: "0.28em", textTransform: "uppercase",
        color: accent || T.warmBrown, marginBottom: 14,
      }}>
        <span style={{ display: "inline-block", width: 22, height: 1, background: accent || T.warmBrown, opacity: 0.6 }} />
        {children}
      </p>
    );

    return (
      <div style={page}>
        <style>{`
          @keyframes up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes draw { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
          .ll-cta-light { position: relative; overflow: hidden; isolation: isolate; }
          .ll-cta-light::before {
            content: ""; position: absolute; inset: 0; background: ${T.gold};
            clip-path: inset(0 0 100% 0);
            transition: clip-path 380ms ${EASE_OUT_QUART}; z-index: -1;
          }
          .ll-cta-light:hover::before { clip-path: inset(0 0 0 0); }
          .ll-cta-light:hover { box-shadow: 0 10px 32px rgba(74,58,50,0.22); }
          .ll-cta-light:active { transform: scale(0.985); }
        `}</style>

        <div ref={ref} style={{ ...wrap, paddingTop: 48, paddingBottom: 72 }}>

          {/* ── ZONE 1 — Reveal */}
          <div style={{
            textAlign: "center", marginBottom: 56,
            animation: `up 700ms ${EASE_OUT_QUART} both`,
          }}>
            <Logo w={280} />

            <div style={{ marginTop: 36 }}>
              <Eyebrow accent={a.c}>Your archetype</Eyebrow>
            </div>

            <div role="img" aria-label={`${a.name} symbol`} style={{ width: 80, height: 80, margin: "8px auto 22px" }}>
              {res === "reg" && (
                <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
                  <circle cx="40" cy="40" r="4" fill={a.c} />
                  <circle cx="40" cy="40" r="14" fill="none" stroke={a.c} strokeWidth="1" opacity="0.7" />
                  <circle cx="40" cy="40" r="24" fill="none" stroke={a.c} strokeWidth="0.7" opacity="0.4" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke={a.c} strokeWidth="0.5" opacity="0.18" />
                </svg>
              )}
              {res === "root" && (
                <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
                  <circle cx="40" cy="22" r="4" fill={a.c} />
                  <line x1="40" y1="26" x2="40" y2="56" stroke={a.c} strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="40" y1="44" x2="26" y2="62" stroke={a.c} strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
                  <line x1="40" y1="44" x2="54" y2="62" stroke={a.c} strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
                  <line x1="40" y1="56" x2="32" y2="72" stroke={a.c} strokeWidth="0.7" strokeLinecap="round" opacity="0.45" />
                  <line x1="40" y1="56" x2="48" y2="72" stroke={a.c} strokeWidth="0.7" strokeLinecap="round" opacity="0.45" />
                  <line x1="26" y1="62" x2="20" y2="74" stroke={a.c} strokeWidth="0.6" strokeLinecap="round" opacity="0.3" />
                  <line x1="54" y1="62" x2="60" y2="74" stroke={a.c} strokeWidth="0.6" strokeLinecap="round" opacity="0.3" />
                </svg>
              )}
              {res === "rec" && (
                <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
                  <circle cx="40" cy="40" r="28" fill="none" stroke={a.c} strokeWidth="1" opacity="0.35" />
                  <path d="M40 14 L58 38 L52 38 L52 66 L28 66 L28 38 L22 38 Z"
                    fill="none" stroke={a.c} strokeWidth="1.3" strokeLinejoin="round" />
                  <line x1="40" y1="44" x2="40" y2="56" stroke={a.c} strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="34" y1="50" x2="46" y2="50" stroke={a.c} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
            </div>

            <h1 style={{
              fontFamily: H, fontSize: "clamp(2.4rem, 7vw, 3.2rem)",
              fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.022em",
              color: T.nearBlack,
            }}>
              The <em style={{ fontStyle: "italic", fontWeight: 500, color: a.c, letterSpacing: "-0.016em" }}>{a.italic}</em>
            </h1>

            <p style={{
              marginTop: 12, fontFamily: F, fontSize: 12.5, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase", color: T.ink60,
            }}>{a.pillar}</p>

            <div style={{ width: 32, height: 1, background: T.gold, margin: "30px auto 0" }} />
          </div>

          {/* ── ZONE 2 — Mirror */}
          <div style={{ animation: `up 700ms ${EASE_OUT_QUART} 80ms both` }}>
            <section style={{ marginBottom: 40 }}>
              <Eyebrow accent={a.c}>Core identity</Eyebrow>
              <p style={{
                fontFamily: H, fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(1.25rem, 3.2vw, 1.45rem)", lineHeight: 1.55,
                letterSpacing: "-0.008em", color: T.nearBlack,
                textWrap: "balance",
              }}>{a.id}</p>
            </section>

            <section style={{ marginBottom: 44, paddingTop: 32, borderTop: `1px solid ${T.taupe}55` }}>
              <Eyebrow>Where you are now</Eyebrow>
              <p style={{
                fontSize: 15.5, lineHeight: 1.8, fontWeight: 300,
                color: T.darkBrown, maxWidth: "62ch",
              }}>{a.now}</p>
            </section>
          </div>

          {/* ── ZONE 3 — Pattern insight (key analytical block) */}
          <div className="ll-bleed" style={{
            animation: `up 700ms ${EASE_OUT_QUART} 140ms both`,
            margin: "12px -8px 44px",
            padding: "32px 32px 30px",
            background: T.warmBeige,
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 56, height: 2,
              background: a.c,
            }} />
            <Eyebrow accent={a.c}>Your dysregulation pattern</Eyebrow>
            <p style={{
              fontSize: 15.5, lineHeight: 1.85, fontWeight: 300,
              color: T.darkBrown,
            }}>{a.pattern}</p>
          </div>

          {/* ── ZONE 4 — Offer */}
          <div
            ref={offerRef}
            className="ll-bleed"
            style={{
              animation: `up 700ms ${EASE_OUT_QUART} 200ms both`,
              margin: "0 -8px 48px",
              padding: "44px 32px 36px",
              background: T.darkBrown, color: T.cream,
              position: "relative", overflow: "hidden",
            }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${a.c} 0%, ${T.gold} 100%)`,
            }} />

            <p style={{
              fontFamily: F, fontSize: 10.5, fontWeight: 500,
              letterSpacing: "0.32em", textTransform: "uppercase",
              color: T.gold, marginBottom: 10,
            }}>Built for the {a.italic}</p>

            <h3 style={{
              fontFamily: H, fontSize: "clamp(1.7rem, 4.8vw, 2.1rem)",
              fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.012em",
              color: T.cream, marginBottom: 16,
            }}>{a.offer.name}</h3>

            <p style={{
              fontSize: 14, lineHeight: 1.75, fontWeight: 300,
              color: "rgba(247,245,242,0.78)", marginBottom: 28,
              maxWidth: "60ch",
            }}>{a.offer.desc}</p>

            <div className="ll-offer-pricerow" style={{
              display: "flex", alignItems: "baseline", gap: 14,
              paddingTop: 22, borderTop: "1px solid rgba(198,167,125,0.25)",
            }}>
              <span style={{
                fontFamily: H, fontSize: 38, fontWeight: 500,
                color: T.cream, letterSpacing: "-0.02em",
              }}>$47</span>
              <span style={{
                fontFamily: H, fontStyle: "italic", fontSize: 20,
                color: T.taupe, textDecoration: "line-through",
                textDecorationThickness: "1px",
              }}>$57</span>
            </div>

            <p style={{
              marginTop: 8, fontSize: 11.5, color: "rgba(247,245,242,0.55)",
              letterSpacing: "0.06em", fontWeight: 300,
            }}>Your first-visit discovery price.</p>

            <button
              type="button"
              className="ll-cta-light"
              aria-label={`Claim your ${a.offer.name}`}
              onClick={() => {
                trackCheckoutOpened(res);
                const url = (a.shopifyUrl || "#") + "?discount=ARCHETYPE10";
                window.open(url, "_blank");
              }}
              style={{
                display: "block", width: "100%", marginTop: 26,
                padding: "16px 0",
                fontFamily: F, fontSize: 12, fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: T.darkBrown, background: T.cream,
                border: "none", cursor: "pointer",
                transition: `transform 220ms ${EASE_OUT_QUART}, box-shadow 220ms ${EASE_OUT_QUART}, color 320ms ${EASE_OUT_QUART}`,
              }}>
              Claim your kit
            </button>

            {/* Trust line: refund + delivery, kept editorial, no badges or stars */}
            <ul style={{
              listStyle: "none", padding: 0, margin: "18px 0 0",
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              {[
                "Instant access. Delivered to your inbox the moment you check out.",
                "Secure checkout via Shopify."
              ].map((t, i) => (
                <li key={i} style={{
                  display: "flex", gap: 10, alignItems: "baseline",
                  fontFamily: F, fontSize: 12, fontWeight: 300,
                  color: "rgba(247,245,242,0.7)", lineHeight: 1.55,
                }}>
                  <span aria-hidden="true" style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: T.gold, opacity: 0.8, transform: "translateY(-2px)",
                    flexShrink: 0,
                  }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Progressive disclosure: the full profile is collapsed by default */}
          {!expanded && (
            <button
              type="button"
              aria-expanded={false}
              onClick={() => { setExpanded(true); trackProfileExpanded(res); }}
              style={{
                display: "block", width: "100%", marginBottom: 8, padding: "16px 0",
                fontFamily: F, fontSize: 11.5, fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: a.c, background: "transparent",
                border: `1px solid ${a.c}40`, cursor: "pointer",
                transition: `background 220ms ${EASE_OUT_QUART}, border-color 220ms ${EASE_OUT_QUART}`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = a.c + "0d"; e.currentTarget.style.borderColor = a.c + "80"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = a.c + "40"; }}>
              Read your full profile
            </button>
          )}

          {expanded && (
          <div style={{ animation: `up 600ms ${EASE_OUT_QUART} both` }}>

          {/* ── ZONE 5 — Beliefs (paired, varied) */}
          <div style={{ animation: `up 700ms ${EASE_OUT_QUART} 60ms both`, marginBottom: 44 }}>
            <section style={{ marginBottom: 22 }}>
              <Eyebrow>The voice you are leaving behind</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {a.old.map((b, i) => (
                  <p key={i} style={{
                    fontFamily: H, fontStyle: "italic",
                    fontSize: "clamp(1.05rem, 2.6vw, 1.18rem)", lineHeight: 1.55,
                    color: T.ink40, fontWeight: 400,
                    textDecoration: "line-through", textDecorationColor: T.taupe + "80",
                    textDecorationThickness: "1px", textUnderlineOffset: "4px",
                  }}>{b}</p>
                ))}
              </div>
            </section>

            <section style={{
              padding: "26px 28px",
              background: T.white,
              border: `1px solid ${a.c}33`,
              borderLeft: `1px solid ${a.c}33`, /* keep full borders; no side stripe */
            }}>
              <Eyebrow accent={a.c}>The voice you are building</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {a.nw.map((b, i) => (
                  <p key={i} style={{
                    fontSize: 14.5, lineHeight: 1.65, fontWeight: 500,
                    color: T.nearBlack,
                  }}>{b}</p>
                ))}
              </div>
            </section>
          </div>

          {/* ── ZONE 6 — Mantras (no side-stripes, numbered + italic) */}
          <section style={{
            animation: `up 700ms ${EASE_OUT_QUART} 320ms both`,
            marginBottom: 44, paddingTop: 32, borderTop: `1px solid ${T.taupe}55`,
          }}>
            <Eyebrow accent={a.c}>Three mantras</Eyebrow>
            <ol style={{ listStyle: "none", padding: 0, margin: "12px 0 0",
              display: "flex", flexDirection: "column", gap: 18,
            }}>
              {a.mantras.map((m, i) => (
                <li key={i} style={{
                  display: "grid", gridTemplateColumns: "32px 1fr", gap: 14, alignItems: "baseline",
                }}>
                  <span style={{
                    fontFamily: H, fontStyle: "italic", fontWeight: 500,
                    color: a.c, fontSize: 18, letterSpacing: "0.04em",
                  }}>0{i + 1}</span>
                  <p style={{
                    fontFamily: H, fontStyle: "italic",
                    fontSize: "clamp(1.2rem, 3vw, 1.35rem)", lineHeight: 1.45,
                    fontWeight: 500, color: T.nearBlack,
                    letterSpacing: "-0.008em",
                  }}>{m}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── ZONE 7 — Ritual */}
          <div className="ll-bleed" style={{
            animation: `up 700ms ${EASE_OUT_QUART} 360ms both`,
            margin: "0 -8px 44px",
            padding: "32px 32px 28px",
            background: T.warmBeige,
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 56, height: 2, background: a.c,
            }} />
            <Eyebrow accent={a.c}>Your daily ritual</Eyebrow>
            <h3 style={{
              fontFamily: H, fontSize: "clamp(1.35rem, 3.8vw, 1.55rem)",
              fontWeight: 400, lineHeight: 1.3, letterSpacing: "-0.01em",
              color: T.nearBlack, marginBottom: 22, textWrap: "balance",
            }}>{a.ritual.name}</h3>

            <ol style={{ listStyle: "none", padding: 0, margin: 0,
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {a.ritual.steps.map((s, i) => (
                <li key={i} style={{
                  display: "grid", gridTemplateColumns: "28px 1fr", gap: 14, alignItems: "baseline",
                }}>
                  <span style={{
                    fontFamily: H, fontStyle: "italic", fontSize: 15, fontWeight: 500,
                    color: a.c, paddingTop: 2,
                  }}>{String(i + 1).padStart(2, "0")}</span>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, fontWeight: 300, color: T.darkBrown }}>{s}</p>
                </li>
              ))}
            </ol>

            <p style={{
              marginTop: 22, paddingTop: 18,
              borderTop: `1px solid ${a.c}25`,
              fontFamily: H, fontStyle: "italic", fontSize: 14.5,
              lineHeight: 1.65, color: T.ink60, fontWeight: 400,
            }}>{a.ritual.note}</p>
          </div>

          {/* ── ZONE 8 — Supplement + Content */}
          <section style={{
            animation: `up 700ms ${EASE_OUT_QUART} 420ms both`, marginBottom: 36,
          }}>
            <Eyebrow>BdyAlign connection</Eyebrow>
            <p style={{
              fontSize: 14.5, lineHeight: 1.8, fontWeight: 300,
              color: T.darkBrown, maxWidth: "62ch",
            }}>{a.supp}</p>
          </section>

          <section style={{
            animation: `up 700ms ${EASE_OUT_QUART} 460ms both`,
            marginBottom: 36, paddingTop: 28, borderTop: `1px solid ${T.taupe}55`,
          }}>
            <Eyebrow accent={a.c}>Content you will recognize yourself in</Eyebrow>
            <ul style={{ listStyle: "none", padding: 0, margin: 0,
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {a.content.map((c, i) => (
                <li key={i} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "baseline",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: a.c, opacity: 0.8, transform: "translateY(2px)",
                  }} />
                  <p style={{
                    fontFamily: H, fontStyle: "italic",
                    fontSize: 16, lineHeight: 1.55, fontWeight: 400,
                    color: T.nearBlack, letterSpacing: "-0.006em",
                  }}>{c}</p>
                </li>
              ))}
            </ul>
          </section>

          </div>
          )}

          {/* ── Footer */}
          <div style={{
            textAlign: "center", marginTop: 48, paddingTop: 32,
            borderTop: `1px solid ${T.taupe}55`,
            animation: `up 700ms ${EASE_OUT_QUART} 520ms both`,
          }}>
            <p style={{
              fontFamily: H, fontStyle: "italic", fontSize: 16,
              color: T.darkBrown, fontWeight: 400, lineHeight: 1.6,
            }}>
              Your welcome sequence is on its way to <span style={{
                fontStyle: "normal", fontWeight: 500, color: T.warmBrown,
              }}>{email}</span>
            </p>

            <div style={{ width: 32, height: 1, background: T.gold, margin: "26px auto" }} />

            <p style={{
              fontFamily: F, fontSize: 10.5, fontWeight: 500,
              letterSpacing: "0.32em", textTransform: "uppercase",
              color: T.taupe,
            }}>@lovelarice</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
