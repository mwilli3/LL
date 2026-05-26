import { useState, useEffect, useRef } from "react";

const B = { pri:"#A84A30", sec:"#D4856A", acc:"#5C5470", bg:"#FAF6F2", tx:"#3A2018", txm:"#6B5B52", txl:"#A69890", accL:"#EEEDF5", wh:"#FFFFFF", fill:"#F5E8E1", accent:"#5A7F3C", accentL:"#ECF2E6", accentD:"#3D5A28" };
const F = "'Outfit', sans-serif";
const H = "'Cormorant Garamond', serif";
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1100" zoomAndPan="magnify" viewBox="0 0 824.88 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="dba78cb9cf"><rect x="0" width="325" y="0" height="87"/></clipPath></defs><g fill="#3A2018" fill-opacity="1"><g transform="translate(43.97147, 207.372096)"><g><path d="M 63.203125 9.125 C 60.898438 10.6875 58.613281 11.972656 56.34375 12.984375 C 54.082031 13.992188 51.5 14.5 48.59375 14.5 C 46.351562 14.5 44.269531 14.144531 42.34375 13.4375 C 40.414062 12.726562 38.539062 11.832031 36.71875 10.75 C 34.894531 9.664062 33.085938 8.5 31.296875 7.25 C 29.503906 6 27.644531 4.832031 25.71875 3.75 C 23.789062 2.664062 21.707031 1.769531 19.46875 1.0625 C 17.238281 0.351562 14.804688 0 12.171875 0 L 3.34375 0 C 4.90625 -0.332031 5.9375 -1.160156 6.4375 -2.484375 C 6.945312 -3.804688 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.625 C 7.203125 -44.96875 6.929688 -46.234375 6.390625 -47.421875 C 5.847656 -48.609375 4.832031 -49.367188 3.34375 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.367188 14.539062 -48.609375 14 -47.421875 C 13.457031 -46.234375 13.1875 -44.96875 13.1875 -43.625 L 13.1875 -0.90625 C 16.632812 -0.769531 19.976562 -0.078125 23.21875 1.171875 C 26.46875 2.421875 29.664062 3.785156 32.8125 5.265625 C 35.957031 6.753906 39.132812 8.09375 42.34375 9.28125 C 45.5625 10.46875 48.859375 11.0625 52.234375 11.0625 C 54.203125 11.0625 56.03125 10.875 57.71875 10.5 C 59.40625 10.125 61.128906 9.5 62.890625 8.625 Z M 63.203125 9.125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(64.460622, 207.372096)"><g><path d="M 53.765625 -24.859375 C 53.765625 -21.398438 53.101562 -18.148438 51.78125 -15.109375 C 50.46875 -12.066406 48.675781 -9.410156 46.40625 -7.140625 C 44.144531 -4.878906 41.488281 -3.085938 38.4375 -1.765625 C 35.394531 -0.453125 32.148438 0.203125 28.703125 0.203125 C 25.253906 0.203125 22.007812 -0.453125 18.96875 -1.765625 C 15.925781 -3.085938 13.269531 -4.878906 11 -7.140625 C 8.738281 -9.410156 6.945312 -12.066406 5.625 -15.109375 C 4.3125 -18.148438 3.65625 -21.398438 3.65625 -24.859375 C 3.65625 -28.304688 4.3125 -31.550781 5.625 -34.59375 C 6.945312 -37.632812 8.738281 -40.285156 11 -42.546875 C 13.269531 -44.816406 15.925781 -46.609375 18.96875 -47.921875 C 22.007812 -49.242188 25.253906 -49.90625 28.703125 -49.90625 C 32.148438 -49.90625 35.394531 -49.242188 38.4375 -47.921875 C 41.488281 -46.609375 44.144531 -44.816406 46.40625 -42.546875 C 48.675781 -40.285156 50.46875 -37.632812 51.78125 -34.59375 C 53.101562 -31.550781 53.765625 -28.304688 53.765625 -24.859375 Z M 10.65625 -26.0625 C 10.65625 -23.425781 11.09375 -20.601562 11.96875 -17.59375 C 12.84375 -14.582031 14.109375 -11.8125 15.765625 -9.28125 C 17.429688 -6.75 19.460938 -4.648438 21.859375 -2.984375 C 24.253906 -1.328125 26.976562 -0.5 30.03125 -0.5 C 32.863281 -0.5 35.363281 -1.242188 37.53125 -2.734375 C 39.695312 -4.222656 41.488281 -6.117188 42.90625 -8.421875 C 44.320312 -10.722656 45.382812 -13.222656 46.09375 -15.921875 C 46.8125 -18.628906 47.171875 -21.203125 47.171875 -23.640625 C 47.171875 -26.410156 46.742188 -29.28125 45.890625 -32.25 C 45.046875 -35.226562 43.78125 -37.96875 42.09375 -40.46875 C 40.40625 -42.976562 38.359375 -45.039062 35.953125 -46.65625 C 33.554688 -48.28125 30.769531 -49.09375 27.59375 -49.09375 C 24.75 -49.09375 22.28125 -48.347656 20.1875 -46.859375 C 18.09375 -45.367188 16.332031 -43.472656 14.90625 -41.171875 C 13.488281 -38.878906 12.425781 -36.394531 11.71875 -33.71875 C 11.007812 -31.050781 10.65625 -28.5 10.65625 -26.0625 Z M 10.65625 -26.0625 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(110.916314, 207.372096)"><g><path d="M 50.921875 -49.703125 C 49.296875 -49.160156 47.992188 -48.414062 47.015625 -47.46875 C 46.035156 -46.519531 45.238281 -45.269531 44.625 -43.71875 L 26.671875 0 L 8.515625 -43.21875 C 7.972656 -44.363281 7.3125 -45.59375 6.53125 -46.90625 C 5.757812 -48.226562 4.765625 -49.160156 3.546875 -49.703125 L 17.65625 -49.703125 C 16.769531 -49.367188 16.070312 -48.757812 15.5625 -47.875 C 15.0625 -47 14.8125 -46.085938 14.8125 -45.140625 C 14.8125 -44.796875 15.128906 -43.742188 15.765625 -41.984375 C 16.410156 -40.234375 17.222656 -38.140625 18.203125 -35.703125 C 19.179688 -33.265625 20.265625 -30.644531 21.453125 -27.84375 C 22.640625 -25.039062 23.789062 -22.367188 24.90625 -19.828125 C 26.019531 -17.296875 27 -15.046875 27.84375 -13.078125 C 28.6875 -11.117188 29.242188 -9.800781 29.515625 -9.125 C 29.859375 -9.9375 30.453125 -11.335938 31.296875 -13.328125 C 32.140625 -15.328125 33.101562 -17.628906 34.1875 -20.234375 C 35.269531 -22.835938 36.398438 -25.554688 37.578125 -28.390625 C 38.765625 -31.234375 39.847656 -33.875 40.828125 -36.3125 C 41.804688 -38.75 42.617188 -40.828125 43.265625 -42.546875 C 43.910156 -44.273438 44.234375 -45.304688 44.234375 -45.640625 C 44.234375 -46.660156 43.828125 -47.539062 43.015625 -48.28125 C 42.203125 -49.03125 41.320312 -49.503906 40.375 -49.703125 Z M 50.921875 -49.703125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(160.821452, 207.372096)"><g><path d="M 23.03125 -0.8125 C 26.207031 -0.8125 29.316406 -1.554688 32.359375 -3.046875 C 35.398438 -4.535156 37.695312 -6.734375 39.25 -9.640625 L 36.921875 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.035156 -49.296875 3.546875 -49.703125 L 36.21875 -49.703125 L 38.234375 -40.171875 C 36.679688 -43.140625 34.601562 -45.332031 32 -46.75 C 29.394531 -48.175781 26.4375 -48.890625 23.125 -48.890625 L 13.390625 -48.890625 L 13.390625 -25.65625 L 19.671875 -25.65625 C 21.503906 -25.65625 23.195312 -26.046875 24.75 -26.828125 C 26.300781 -27.609375 27.347656 -28.976562 27.890625 -30.9375 L 27.890625 -19.78125 C 27.347656 -21.738281 26.300781 -23.070312 24.75 -23.78125 C 23.195312 -24.5 21.503906 -24.859375 19.671875 -24.859375 L 13.390625 -24.859375 L 13.390625 -0.8125 Z M 23.03125 -0.8125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(199.163067, 207.372096)"><g><path d="M 63.203125 9.125 C 60.898438 10.6875 58.613281 11.972656 56.34375 12.984375 C 54.082031 13.992188 51.5 14.5 48.59375 14.5 C 46.351562 14.5 44.269531 14.144531 42.34375 13.4375 C 40.414062 12.726562 38.539062 11.832031 36.71875 10.75 C 34.894531 9.664062 33.085938 8.5 31.296875 7.25 C 29.503906 6 27.644531 4.832031 25.71875 3.75 C 23.789062 2.664062 21.707031 1.769531 19.46875 1.0625 C 17.238281 0.351562 14.804688 0 12.171875 0 L 3.34375 0 C 4.90625 -0.332031 5.9375 -1.160156 6.4375 -2.484375 C 6.945312 -3.804688 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.625 C 7.203125 -44.96875 6.929688 -46.234375 6.390625 -47.421875 C 5.847656 -48.609375 4.832031 -49.367188 3.34375 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.367188 14.539062 -48.609375 14 -47.421875 C 13.457031 -46.234375 13.1875 -44.96875 13.1875 -43.625 L 13.1875 -0.90625 C 16.632812 -0.769531 19.976562 -0.078125 23.21875 1.171875 C 26.46875 2.421875 29.664062 3.785156 32.8125 5.265625 C 35.957031 6.753906 39.132812 8.09375 42.34375 9.28125 C 45.5625 10.46875 48.859375 11.0625 52.234375 11.0625 C 54.203125 11.0625 56.03125 10.875 57.71875 10.5 C 59.40625 10.125 61.128906 9.5 62.890625 8.625 Z M 63.203125 9.125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(219.652219, 207.372096)"><g><path d="M 10.546875 -4.671875 C 10.546875 -3.378906 10.914062 -2.359375 11.65625 -1.609375 C 12.40625 -0.867188 13.351562 -0.332031 14.5 0 L 3.65625 0 C 4.875 -0.40625 6.019531 -1.148438 7.09375 -2.234375 C 8.175781 -3.316406 8.957031 -4.5 9.4375 -5.78125 L 26.671875 -50.3125 L 44.03125 -5.78125 C 44.5625 -4.5625 45.25 -3.394531 46.09375 -2.28125 C 46.945312 -1.164062 48.015625 -0.40625 49.296875 0 L 34.6875 0 C 35.570312 -0.269531 36.300781 -0.859375 36.875 -1.765625 C 37.445312 -2.679688 37.734375 -3.546875 37.734375 -4.359375 C 37.734375 -4.898438 37.492188 -5.847656 37.015625 -7.203125 C 36.546875 -8.554688 36.003906 -10.007812 35.390625 -11.5625 C 34.785156 -13.113281 34.195312 -14.597656 33.625 -16.015625 C 33.050781 -17.441406 32.628906 -18.492188 32.359375 -19.171875 L 15.625 -19.171875 C 15.351562 -18.492188 14.945312 -17.492188 14.40625 -16.171875 C 13.863281 -14.859375 13.304688 -13.472656 12.734375 -12.015625 C 12.160156 -10.566406 11.648438 -9.164062 11.203125 -7.8125 C 10.765625 -6.457031 10.546875 -5.410156 10.546875 -4.671875 Z M 15.828125 -19.984375 L 31.953125 -19.984375 L 23.9375 -40.875 Z M 15.828125 -19.984375 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(264.586698, 207.372096)"><g><path d="M 13.390625 -6.296875 C 13.390625 -4.941406 13.660156 -3.671875 14.203125 -2.484375 C 14.742188 -1.296875 15.691406 -0.46875 17.046875 0 L 3.65625 0 C 5.070312 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.070312 -49.296875 3.65625 -49.703125 L 20.890625 -49.703125 C 23.328125 -49.703125 25.710938 -49.429688 28.046875 -48.890625 C 30.378906 -48.347656 32.457031 -47.484375 34.28125 -46.296875 C 36.113281 -45.117188 37.585938 -43.566406 38.703125 -41.640625 C 39.816406 -39.710938 40.375 -37.363281 40.375 -34.59375 C 40.375 -30.601562 39.171875 -27.351562 36.765625 -24.84375 C 34.367188 -22.34375 31.3125 -20.65625 27.59375 -19.78125 L 36.828125 -4.875 C 37.566406 -3.789062 38.441406 -2.804688 39.453125 -1.921875 C 40.472656 -1.046875 41.554688 -0.40625 42.703125 0 L 33.265625 0 L 21.203125 -19.578125 L 13.390625 -19.578125 Z M 13.390625 -20.28125 L 20.28125 -20.28125 C 24.539062 -20.28125 27.90625 -21.597656 30.375 -24.234375 C 32.84375 -26.878906 34.078125 -30.332031 34.078125 -34.59375 C 34.078125 -39.050781 32.894531 -42.546875 30.53125 -45.078125 C 28.164062 -47.617188 24.75 -48.890625 20.28125 -48.890625 L 13.390625 -48.890625 Z M 13.390625 -20.28125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(306.478521, 207.372096)"><g><path d="M 13.390625 -6.484375 C 13.390625 -5.140625 13.625 -3.835938 14.09375 -2.578125 C 14.570312 -1.328125 15.519531 -0.46875 16.9375 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.3125 6.484375 -2.53125 C 6.960938 -3.75 7.203125 -5.066406 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.117188 6.484375 -47.265625 C 6.015625 -48.421875 5.035156 -49.234375 3.546875 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.234375 14.570312 -48.421875 14.09375 -47.265625 C 13.625 -46.117188 13.390625 -44.867188 13.390625 -43.515625 Z M 13.390625 -6.484375 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(322.504577, 207.372096)"><g><path d="M 47.375 -7.203125 C 46.21875 -6.191406 44.894531 -5.242188 43.40625 -4.359375 C 41.925781 -3.484375 40.375 -2.707031 38.75 -2.03125 C 37.125 -1.351562 35.484375 -0.8125 33.828125 -0.40625 C 32.171875 0 30.566406 0.203125 29.015625 0.203125 C 25.492188 0.203125 22.175781 -0.4375 19.0625 -1.71875 C 15.957031 -3.007812 13.253906 -4.769531 10.953125 -7 C 8.648438 -9.226562 6.835938 -11.863281 5.515625 -14.90625 C 4.203125 -17.945312 3.546875 -21.265625 3.546875 -24.859375 C 3.546875 -28.441406 4.203125 -31.753906 5.515625 -34.796875 C 6.835938 -37.835938 8.648438 -40.472656 10.953125 -42.703125 C 13.253906 -44.929688 15.957031 -46.6875 19.0625 -47.96875 C 22.175781 -49.257812 25.492188 -49.90625 29.015625 -49.90625 C 31.785156 -49.90625 34.65625 -49.550781 37.625 -48.84375 C 40.601562 -48.132812 43.175781 -46.898438 45.34375 -45.140625 L 45.34375 -37.03125 C 44.332031 -38.445312 43.164062 -39.863281 41.84375 -41.28125 C 40.519531 -42.707031 39.097656 -43.992188 37.578125 -45.140625 C 36.054688 -46.285156 34.414062 -47.210938 32.65625 -47.921875 C 30.90625 -48.640625 29.113281 -49 27.28125 -49 C 24.375 -49 21.875 -48.300781 19.78125 -46.90625 C 17.6875 -45.519531 15.945312 -43.757812 14.5625 -41.625 C 13.175781 -39.5 12.160156 -37.117188 11.515625 -34.484375 C 10.867188 -31.847656 10.546875 -29.28125 10.546875 -26.78125 C 10.546875 -24.007812 10.914062 -21.082031 11.65625 -18 C 12.40625 -14.925781 13.554688 -12.117188 15.109375 -9.578125 C 16.671875 -7.046875 18.648438 -4.953125 21.046875 -3.296875 C 23.453125 -1.640625 26.3125 -0.8125 29.625 -0.8125 C 31.507812 -0.8125 33.28125 -1.164062 34.9375 -1.875 C 36.601562 -2.582031 38.128906 -3.507812 39.515625 -4.65625 C 40.898438 -5.8125 42.148438 -7.132812 43.265625 -8.625 C 44.378906 -10.113281 45.34375 -11.632812 46.15625 -13.1875 Z M 47.375 -7.203125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(369.06237, 207.372096)"><g><path d="M 23.03125 -0.8125 C 26.207031 -0.8125 29.316406 -1.554688 32.359375 -3.046875 C 35.398438 -4.535156 37.695312 -6.734375 39.25 -9.640625 L 36.921875 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.035156 -49.296875 3.546875 -49.703125 L 36.21875 -49.703125 L 38.234375 -40.171875 C 36.679688 -43.140625 34.601562 -45.332031 32 -46.75 C 29.394531 -48.175781 26.4375 -48.890625 23.125 -48.890625 L 13.390625 -48.890625 L 13.390625 -25.65625 L 19.671875 -25.65625 C 21.503906 -25.65625 23.195312 -26.046875 24.75 -26.828125 C 26.300781 -27.609375 27.347656 -28.976562 27.890625 -30.9375 L 27.890625 -19.78125 C 27.347656 -21.738281 26.300781 -23.070312 24.75 -23.78125 C 23.195312 -24.5 21.503906 -24.859375 19.671875 -24.859375 L 13.390625 -24.859375 L 13.390625 -0.8125 Z M 23.03125 -0.8125 "/></g></g></g><g transform="matrix(1, 0, 0, 1, 465, 144)"><g clip-path="url(#dba78cb9cf)"><g fill="#3A2018" fill-opacity="1"><g transform="translate(55.929985, 33.95204)"><g><path d="M 5.578125 -9.140625 L 5.578125 0 L 3.015625 0 L 3.015625 -21.96875 L 9.046875 -21.96875 C 11.742188 -21.96875 13.734375 -21.453125 15.015625 -20.421875 C 16.304688 -19.390625 16.953125 -17.835938 16.953125 -15.765625 C 16.953125 -12.859375 15.476562 -10.894531 12.53125 -9.875 L 18.5 0 L 15.484375 0 L 10.15625 -9.140625 Z M 5.578125 -11.328125 L 9.078125 -11.328125 C 10.878906 -11.328125 12.203125 -11.6875 13.046875 -12.40625 C 13.890625 -13.125 14.3125 -14.195312 14.3125 -15.625 C 14.3125 -17.082031 13.878906 -18.128906 13.015625 -18.765625 C 12.160156 -19.410156 10.785156 -19.734375 8.890625 -19.734375 L 5.578125 -19.734375 Z M 5.578125 -11.328125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(81.10696, 33.95204)"><g><path d="M 15.265625 0 L 3.015625 0 L 3.015625 -21.96875 L 15.265625 -21.96875 L 15.265625 -19.703125 L 5.578125 -19.703125 L 5.578125 -12.625 L 14.6875 -12.625 L 14.6875 -10.375 L 5.578125 -10.375 L 5.578125 -2.28125 L 15.265625 -2.28125 Z M 15.265625 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(104.375852, 33.95204)"><g><path d="M 12.6875 -11.515625 L 20.15625 -11.515625 L 20.15625 -0.828125 C 18.988281 -0.453125 17.800781 -0.171875 16.59375 0.015625 C 15.394531 0.203125 14.007812 0.296875 12.4375 0.296875 C 9.101562 0.296875 6.507812 -0.691406 4.65625 -2.671875 C 2.800781 -4.648438 1.875 -7.421875 1.875 -10.984375 C 1.875 -13.265625 2.332031 -15.265625 3.25 -16.984375 C 4.164062 -18.703125 5.484375 -20.015625 7.203125 -20.921875 C 8.929688 -21.835938 10.953125 -22.296875 13.265625 -22.296875 C 15.609375 -22.296875 17.796875 -21.863281 19.828125 -21 L 18.828125 -18.75 C 16.847656 -19.582031 14.941406 -20 13.109375 -20 C 10.429688 -20 8.335938 -19.203125 6.828125 -17.609375 C 5.328125 -16.015625 4.578125 -13.804688 4.578125 -10.984375 C 4.578125 -8.015625 5.300781 -5.765625 6.75 -4.234375 C 8.195312 -2.703125 10.328125 -1.9375 13.140625 -1.9375 C 14.660156 -1.9375 16.144531 -2.113281 17.59375 -2.46875 L 17.59375 -9.234375 L 12.6875 -9.234375 Z M 12.6875 -11.515625 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(132.933291, 33.95204)"><g><path d="M 19.609375 -21.96875 L 19.609375 -7.75 C 19.609375 -5.25 18.851562 -3.28125 17.34375 -1.84375 C 15.832031 -0.414062 13.753906 0.296875 11.109375 0.296875 C 8.460938 0.296875 6.414062 -0.421875 4.96875 -1.859375 C 3.519531 -3.304688 2.796875 -5.289062 2.796875 -7.8125 L 2.796875 -21.96875 L 5.34375 -21.96875 L 5.34375 -7.640625 C 5.34375 -5.804688 5.84375 -4.394531 6.84375 -3.40625 C 7.851562 -2.425781 9.328125 -1.9375 11.265625 -1.9375 C 13.117188 -1.9375 14.546875 -2.429688 15.546875 -3.421875 C 16.554688 -4.410156 17.0625 -5.828125 17.0625 -7.671875 L 17.0625 -21.96875 Z M 19.609375 -21.96875 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(161.490729, 33.95204)"><g><path d="M 3.015625 0 L 3.015625 -21.96875 L 5.578125 -21.96875 L 5.578125 -2.3125 L 15.265625 -2.3125 L 15.265625 0 Z M 3.015625 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(183.617776, 33.95204)"><g><path d="M 16.828125 0 L 14.09375 -6.984375 L 5.296875 -6.984375 L 2.578125 0 L 0 0 L 8.6875 -22.0625 L 10.84375 -22.0625 L 19.484375 0 Z M 13.296875 -9.28125 L 10.75 -16.09375 C 10.414062 -16.957031 10.070312 -18.015625 9.71875 -19.265625 C 9.5 -18.304688 9.1875 -17.25 8.78125 -16.09375 L 6.1875 -9.28125 Z M 13.296875 -9.28125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(209.24548, 33.95204)"><g><path d="M 9.78125 0 L 7.234375 0 L 7.234375 -19.703125 L 0.265625 -19.703125 L 0.265625 -21.96875 L 16.75 -21.96875 L 16.75 -19.703125 L 9.78125 -19.703125 Z M 9.78125 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(232.424226, 33.95204)"><g><path d="M 15.265625 0 L 3.015625 0 L 3.015625 -21.96875 L 15.265625 -21.96875 L 15.265625 -19.703125 L 5.578125 -19.703125 L 5.578125 -12.625 L 14.6875 -12.625 L 14.6875 -10.375 L 5.578125 -10.375 L 5.578125 -2.28125 L 15.265625 -2.28125 Z M 15.265625 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(255.693117, 33.95204)"><g><path d="M 2.28125 -1.59375 C 2.28125 -2.257812 2.429688 -2.765625 2.734375 -3.109375 C 3.046875 -3.460938 3.488281 -3.640625 4.0625 -3.640625 C 4.644531 -3.640625 5.097656 -3.460938 5.421875 -3.109375 C 5.742188 -2.765625 5.90625 -2.257812 5.90625 -1.59375 C 5.90625 -0.9375 5.738281 -0.429688 5.40625 -0.078125 C 5.082031 0.265625 4.632812 0.4375 4.0625 0.4375 C 3.550781 0.4375 3.125 0.28125 2.78125 -0.03125 C 2.445312 -0.351562 2.28125 -0.875 2.28125 -1.59375 Z M 2.28125 -1.59375 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(2.036351, 76.917761)"><g><path d="M 5.578125 -9.140625 L 5.578125 0 L 3.015625 0 L 3.015625 -21.96875 L 9.046875 -21.96875 C 11.742188 -21.96875 13.734375 -21.453125 15.015625 -20.421875 C 16.304688 -19.390625 16.953125 -17.835938 16.953125 -15.765625 C 16.953125 -12.859375 15.476562 -10.894531 12.53125 -9.875 L 18.5 0 L 15.484375 0 L 10.15625 -9.140625 Z M 5.578125 -11.328125 L 9.078125 -11.328125 C 10.878906 -11.328125 12.203125 -11.6875 13.046875 -12.40625 C 13.890625 -13.125 14.3125 -14.195312 14.3125 -15.625 C 14.3125 -17.082031 13.878906 -18.128906 13.015625 -18.765625 C 12.160156 -19.410156 10.785156 -19.734375 8.890625 -19.734375 L 5.578125 -19.734375 Z M 5.578125 -11.328125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(27.213326, 76.917761)"><g><path d="M 22.09375 -11.015625 C 22.09375 -7.492188 21.203125 -4.726562 19.421875 -2.71875 C 17.648438 -0.707031 15.179688 0.296875 12.015625 0.296875 C 8.773438 0.296875 6.273438 -0.691406 4.515625 -2.671875 C 2.753906 -4.648438 1.875 -7.441406 1.875 -11.046875 C 1.875 -14.617188 2.753906 -17.390625 4.515625 -19.359375 C 6.285156 -21.328125 8.789062 -22.3125 12.03125 -22.3125 C 15.1875 -22.3125 17.648438 -21.3125 19.421875 -19.3125 C 21.203125 -17.3125 22.09375 -14.546875 22.09375 -11.015625 Z M 4.578125 -11.015625 C 4.578125 -8.035156 5.210938 -5.773438 6.484375 -4.234375 C 7.753906 -2.703125 9.597656 -1.9375 12.015625 -1.9375 C 14.441406 -1.9375 16.273438 -2.703125 17.515625 -4.234375 C 18.765625 -5.765625 19.390625 -8.023438 19.390625 -11.015625 C 19.390625 -13.972656 18.769531 -16.210938 17.53125 -17.734375 C 16.289062 -19.265625 14.457031 -20.03125 12.03125 -20.03125 C 9.601562 -20.03125 7.753906 -19.257812 6.484375 -17.71875 C 5.210938 -16.1875 4.578125 -13.953125 4.578125 -11.015625 Z M 4.578125 -11.015625 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(57.333289, 76.917761)"><g><path d="M 22.09375 -11.015625 C 22.09375 -7.492188 21.203125 -4.726562 19.421875 -2.71875 C 17.648438 -0.707031 15.179688 0.296875 12.015625 0.296875 C 8.773438 0.296875 6.273438 -0.691406 4.515625 -2.671875 C 2.753906 -4.648438 1.875 -7.441406 1.875 -11.046875 C 1.875 -14.617188 2.753906 -17.390625 4.515625 -19.359375 C 6.285156 -21.328125 8.789062 -22.3125 12.03125 -22.3125 C 15.1875 -22.3125 17.648438 -21.3125 19.421875 -19.3125 C 21.203125 -17.3125 22.09375 -14.546875 22.09375 -11.015625 Z M 4.578125 -11.015625 C 4.578125 -8.035156 5.210938 -5.773438 6.484375 -4.234375 C 7.753906 -2.703125 9.597656 -1.9375 12.015625 -1.9375 C 14.441406 -1.9375 16.273438 -2.703125 17.515625 -4.234375 C 18.765625 -5.765625 19.390625 -8.023438 19.390625 -11.015625 C 19.390625 -13.972656 18.769531 -16.210938 17.53125 -17.734375 C 16.289062 -19.265625 14.457031 -20.03125 12.03125 -20.03125 C 9.601562 -20.03125 7.753906 -19.257812 6.484375 -17.71875 C 5.210938 -16.1875 4.578125 -13.953125 4.578125 -11.015625 Z M 4.578125 -11.015625 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(87.453253, 76.917761)"><g><path d="M 9.78125 0 L 7.234375 0 L 7.234375 -19.703125 L 0.265625 -19.703125 L 0.265625 -21.96875 L 16.75 -21.96875 L 16.75 -19.703125 L 9.78125 -19.703125 Z M 9.78125 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(110.631999, 76.917761)"><g><path d="M 2.28125 -1.59375 C 2.28125 -2.257812 2.429688 -2.765625 2.734375 -3.109375 C 3.046875 -3.460938 3.488281 -3.640625 4.0625 -3.640625 C 4.644531 -3.640625 5.097656 -3.460938 5.421875 -3.109375 C 5.742188 -2.765625 5.90625 -2.257812 5.90625 -1.59375 C 5.90625 -0.9375 5.738281 -0.429688 5.40625 -0.078125 C 5.082031 0.265625 4.632812 0.4375 4.0625 0.4375 C 3.550781 0.4375 3.125 0.28125 2.78125 -0.03125 C 2.445312 -0.351562 2.28125 -0.875 2.28125 -1.59375 Z M 2.28125 -1.59375 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(124.976469, 76.917761)"><g/></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(139.125625, 76.917761)"><g><path d="M 5.578125 -9.140625 L 5.578125 0 L 3.015625 0 L 3.015625 -21.96875 L 9.046875 -21.96875 C 11.742188 -21.96875 13.734375 -21.453125 15.015625 -20.421875 C 16.304688 -19.390625 16.953125 -17.835938 16.953125 -15.765625 C 16.953125 -12.859375 15.476562 -10.894531 12.53125 -9.875 L 18.5 0 L 15.484375 0 L 10.15625 -9.140625 Z M 5.578125 -11.328125 L 9.078125 -11.328125 C 10.878906 -11.328125 12.203125 -11.6875 13.046875 -12.40625 C 13.890625 -13.125 14.3125 -14.195312 14.3125 -15.625 C 14.3125 -17.082031 13.878906 -18.128906 13.015625 -18.765625 C 12.160156 -19.410156 10.785156 -19.734375 8.890625 -19.734375 L 5.578125 -19.734375 Z M 5.578125 -11.328125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(164.3026, 76.917761)"><g><path d="M 15.265625 0 L 3.015625 0 L 3.015625 -21.96875 L 15.265625 -21.96875 L 15.265625 -19.703125 L 5.578125 -19.703125 L 5.578125 -12.625 L 14.6875 -12.625 L 14.6875 -10.375 L 5.578125 -10.375 L 5.578125 -2.28125 L 15.265625 -2.28125 Z M 15.265625 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(187.571492, 76.917761)"><g><path d="M 12.4375 -20 C 10.019531 -20 8.109375 -19.195312 6.703125 -17.59375 C 5.304688 -15.988281 4.609375 -13.785156 4.609375 -10.984375 C 4.609375 -8.109375 5.28125 -5.882812 6.625 -4.3125 C 7.976562 -2.75 9.90625 -1.96875 12.40625 -1.96875 C 13.9375 -1.96875 15.679688 -2.242188 17.640625 -2.796875 L 17.640625 -0.5625 C 16.117188 0.0078125 14.242188 0.296875 12.015625 0.296875 C 8.773438 0.296875 6.273438 -0.679688 4.515625 -2.640625 C 2.753906 -4.609375 1.875 -7.398438 1.875 -11.015625 C 1.875 -13.273438 2.296875 -15.257812 3.140625 -16.96875 C 3.992188 -18.675781 5.21875 -19.988281 6.8125 -20.90625 C 8.414062 -21.832031 10.296875 -22.296875 12.453125 -22.296875 C 14.765625 -22.296875 16.78125 -21.875 18.5 -21.03125 L 17.421875 -18.828125 C 15.753906 -19.609375 14.09375 -20 12.4375 -20 Z M 12.4375 -20 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(213.139099, 76.917761)"><g><path d="M 3.015625 0 L 3.015625 -21.96875 L 5.578125 -21.96875 L 5.578125 -2.3125 L 15.265625 -2.3125 L 15.265625 0 Z M 3.015625 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(235.266145, 76.917761)"><g><path d="M 16.828125 0 L 14.09375 -6.984375 L 5.296875 -6.984375 L 2.578125 0 L 0 0 L 8.6875 -22.0625 L 10.84375 -22.0625 L 19.484375 0 Z M 13.296875 -9.28125 L 10.75 -16.09375 C 10.414062 -16.957031 10.070312 -18.015625 9.71875 -19.265625 C 9.5 -18.304688 9.1875 -17.25 8.78125 -16.09375 L 6.1875 -9.28125 Z M 13.296875 -9.28125 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(260.893849, 76.917761)"><g><path d="M 3.015625 0 L 3.015625 -21.96875 L 5.578125 -21.96875 L 5.578125 0 Z M 3.015625 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(275.628951, 76.917761)"><g><path d="M 12.75 0 L 5.296875 -19.484375 L 5.171875 -19.484375 C 5.304688 -17.941406 5.375 -16.109375 5.375 -13.984375 L 5.375 0 L 3.015625 0 L 3.015625 -21.96875 L 6.875 -21.96875 L 13.828125 -3.84375 L 13.953125 -3.84375 L 20.96875 -21.96875 L 24.78125 -21.96875 L 24.78125 0 L 22.234375 0 L 22.234375 -14.15625 C 22.234375 -15.78125 22.300781 -17.546875 22.4375 -19.453125 L 22.3125 -19.453125 L 14.796875 0 Z M 12.75 0 "/></g></g></g><g fill="#3A2018" fill-opacity="1"><g transform="translate(309.565081, 76.917761)"><g><path d="M 2.28125 -1.59375 C 2.28125 -2.257812 2.429688 -2.765625 2.734375 -3.109375 C 3.046875 -3.460938 3.488281 -3.640625 4.0625 -3.640625 C 4.644531 -3.640625 5.097656 -3.460938 5.421875 -3.109375 C 5.742188 -2.765625 5.90625 -2.257812 5.90625 -1.59375 C 5.90625 -0.9375 5.738281 -0.429688 5.40625 -0.078125 C 5.082031 0.265625 4.632812 0.4375 4.0625 0.4375 C 3.550781 0.4375 3.125 0.28125 2.78125 -0.03125 C 2.445312 -0.351562 2.28125 -0.875 2.28125 -1.59375 Z M 2.28125 -1.59375 "/></g></g></g></g></g><path stroke-linecap="butt" transform="matrix(0.00000000130881, 0.749891, -0.749891, 0.00000000130881, 438.056207, 142.33078)" fill="none" stroke-linejoin="miter" d="M 0.00166885 0.502099 L 120.48274 0.5021 " stroke="#3A2018" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4"/></svg>`;
const Logo = () => <div style={{width:400,maxWidth:"100%",margin:"0 auto",overflow:"hidden"}} dangerouslySetInnerHTML={{__html:LOGO.replace(/width="1100"/,'width="100%"').replace(/height="500"/,'').replace(/viewBox="0 0 824.88 374.999991"/,'viewBox="35 134 760 106"')}} />;

const SK = "larice_rooted_kit";
const load = () => { try { return JSON.parse(localStorage.getItem(SK)) || {days:{},reflections:{},hydrationTarget:"",sleepWindow:""}; } catch { return {days:{},reflections:{},hydrationTarget:"",sleepWindow:""}; } };
const save = (d) => localStorage.setItem(SK, JSON.stringify(d));
const td = () => new Date().toISOString().slice(0,10);

const FOUNDS = [
  { key:"hydration", label:"Hydration", q:"Hit your target oz?" },
  { key:"sleep", label:"Sleep Window", q:"Bed & wake \u00B130 min?" },
  { key:"movement", label:"Movement", q:"10+ minutes?" },
  { key:"nourish", label:"Nourish", q:"1 intentional meal?" },
];

const MISS_PROTOCOL = [
  { title:"Acknowledge without judgment", body:"A missed day is a gap in the data, not a moral failure. Name it: 'I missed yesterday.' That's it." },
  { title:"Identify the pattern, not the flaw", body:"Look at what happened before the miss. Was it a schedule break? Low sleep? Emotional overload? The miss has a cause, and the cause is useful data." },
  { title:"Return to your minimum viable day", body:"Hydration + sleep window. Two foundations. That is your floor. You do not need to earn your way back to four. Start with two and let the others return naturally." },
  { title:"Protect the next 24 hours", body:"Don't plan a week. Plan tomorrow. One day of data after a miss rewrites the narrative from 'I quit' to 'I came back.'" },
];

const RESEARCH = [
  { title:"Hydration and cortisol", body:"Even mild dehydration (1-2% body weight loss) elevates cortisol levels measurably. Cortisol elevation narrows the window of tolerance, making regulation harder and reactivity more likely. Consistent hydration is a nervous system input." },
  { title:"Sleep window consistency", body:"Research on circadian rhythm shows that consistent sleep/wake times are a stronger predictor of next-day cognitive and emotional regulation than total sleep duration. The consistency trains the body's clock, improving sleep architecture over time." },
  { title:"Movement and stress completion", body:"Physical movement is the primary biological mechanism for completing the stress response cycle. When the body activates fight-or-flight, it prepares for physical action. Movement gives the body the signal that the threat response has been completed." },
  { title:"Intentional eating", body:"The 'nourish' foundation is not about nutrition science. It is about the practice of intentionality. Eating one meal without screens, with awareness, rewires the relationship between consumption and autopilot. The intervention is presence, not ingredients." },
];

const WEEK_PROMPTS = [
  "Which foundation was easiest? Which was hardest? What got in the way?",
  "Compare your totals to Week 1. What shifted? What pattern are you noticing?",
  "This is the hardest week. Motivation fades here. If you are still tracking, that is the evidence. What kept you going?",
  "You have 30 days of data. Complete this sentence: I am a person who _____ even when _____.",
];

const IDENTITY_PROMPTS = [
  { day:7, prompt:"After 7 days, what do you know about your strongest foundation?" },
  { day:14, prompt:"What has become automatic that wasn't two weeks ago?" },
  { day:21, prompt:"You survived Week 3. What is different about the woman tracking today versus the woman who started?" },
  { day:30, prompt:"You have 30 days of evidence. Who are you now?" },
];

function getStreak(data) {
  const allDays = Object.keys(data.days||{}).filter(d => {
    const v = data.days[d]; return v && (v.hydration||v.sleep||v.movement||v.nourish);
  }).sort().reverse();
  if (!allDays.length) return 0;
  let streak = 0; let check = new Date();
  for (let i=0;i<60;i++) {
    const ds = check.toISOString().slice(0,10);
    if (allDays.includes(ds)) { streak++; check.setDate(check.getDate()-1); }
    else if (i===0) { check.setDate(check.getDate()-1); }
    else break;
  }
  return streak;
}
function hasCheckedToday(d) { const e=d.days?.[td()]; return e&&(e.hydration||e.sleep||e.movement||e.nourish); }
function getDayNum(d) { if(!d.startDate)return 0; return Math.min(Math.floor((new Date(td()+"T12:00:00")-new Date(d.startDate+"T12:00:00"))/86400000)+1,30); }
function get30(data) { const t={hydration:0,sleep:0,movement:0,nourish:0}; Object.values(data.days||{}).forEach(d=>{if(d.hydration)t.hydration++;if(d.sleep)t.sleep++;if(d.movement)t.movement++;if(d.nourish)t.nourish++;}); return t; }
function getWeekTotals(data,wk) { const s=(wk-1)*7+1,e=wk===4?30:wk*7,t={hydration:0,sleep:0,movement:0,nourish:0}; if(!data.startDate)return t; const st=new Date(data.startDate+"T12:00:00"); for(let i=s;i<=e;i++){const d=new Date(st);d.setDate(d.getDate()+(i-1));const ds=d.toISOString().slice(0,10);const en=data.days?.[ds];if(en){if(en.hydration)t.hydration++;if(en.sleep)t.sleep++;if(en.movement)t.movement++;if(en.nourish)t.nourish++;}} return t; }


const RECS = {
  consistency_gap: { product:"Resveratrol", desc:"Your foundation data shows the consistency pattern that defines the Rooted archetype. Resveratrol is the cellular maintenance layer of the Rooted practice — a long-game supplement for the long-game woman. Research suggests it may support cellular resilience, measured in biomarkers over months.", price:"$29.99", url:"https://bdyalign.com/products/resveratrol" },
  energy_depletion: { product:"Ashwagandha", desc:"Your tracking data suggests energy patterns that dip when your foundations slip. Ashwagandha is classified as an adaptogen — research suggests it may help modulate cortisol and support sustained energy through periods of stress and inconsistency.", price:"$24.99", url:"https://bdyalign.com/products/ashwagandha" },
  hydration_cortisol: { product:"Pure Magnesium Power", desc:"Your hydration foundation shows a pattern worth noting. Even mild dehydration can elevate cortisol, and magnesium is involved in over 300 enzymatic processes including hydration regulation at the cellular level. Magnesium may support the connection between your hydration foundation and your nervous system.", price:"$29.99", url:"https://bdyalign.com/products/pure-magnesium-power" },
  foundation_building: { product:"Resveratrol", desc:"Your data shows you’re building real consistency. Resveratrol matches this approach — it’s not a quick-fix supplement. Its effects are measured in biomarkers over months. The long-game supplement for the woman who’s decided to stop starting over.", price:"$29.99", url:"https://bdyalign.com/products/resveratrol" },
};

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderTop:`1px solid ${B.tx}12`,marginBottom:8}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center",gap:12,padding:"18px 0",background:"none",border:"none",cursor:"pointer",fontFamily:F,textAlign:"left"}}>
        <span style={{fontFamily:H,fontSize:18,fontWeight:600,fontStyle:"italic",color:B.accent}}>{title}</span>
        <span style={{color:B.accent,fontSize:22,fontWeight:400,lineHeight:1,minWidth:20,textAlign:"center"}}>{open?"−":"+"}</span>
      </button>
      {open && <div style={{paddingBottom:20,animation:"up .3s cubic-bezier(.22,1,.36,1) both"}}>{children}</div>}
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(load);
  useEffect(() => {
    [['Cormorant+Garamond:wght@400;500;600;700','Cormorant'],['Outfit:wght@300;400;500;600;700','Outfit']].forEach(([fam,check])=>{
      if (!document.querySelector(`link[href*="${check}"]`)) {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    });
  }, []);
  const [view, setView] = useState("home");
  const [tab, setTab] = useState("track");
  const [aiResult, setAiResult] = useState("");
  const [aiRec, setAiRec] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [weekView, setWeekView] = useState(null);
  const [verified, setVerified] = useState(() => { try { return !!localStorage.getItem("larice_rooted_kit_email"); } catch { return false; } });
  const [gateEmail, setGateEmail] = useState("");
  const [gateErr, setGateErr] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => { save(data); }, [data]);
  useEffect(() => { ref.current?.scrollIntoView({behavior:"smooth",block:"start"}); }, [view,tab,weekView]);
  const streak = getStreak(data);
  const checked = hasCheckedToday(data);
  const dayNum = getDayNum(data);
  const todayData = data.days?.[td()] || {};
  const doneCount = FOUNDS.filter(f=>todayData[f.key]).length;
  const totals30 = get30(data);

  const toggle = (key) => { const d={...data}; if(!d.startDate)d.startDate=td(); d.days={...d.days,[td()]:{...todayData,[key]:!todayData[key]}}; setData(d); };
  const setReflection = (wk,text) => { setData({...data,reflections:{...data.reflections,[wk]:text}}); };

  const analyzePatterns = async () => {
    setAiLoading(true); setAiResult("");
    const daysData = Object.entries(data.days||{}).map(([d,v])=>({date:d,hydration:!!v.hydration,sleep:!!v.sleep,movement:!!v.movement,nourish:!!v.nourish,notice:v.notice||""})).slice(-30);
    const t = get30(data);
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{role:"user",content:`You are a wellness foundations coach for the Larice Wellness brand, specifically for The Rooted One archetype. Analyze this woman's 30-day foundation tracking data and provide a warm, specific, actionable audit. Use "you" directly. Reference her actual numbers and patterns. No generic advice.

DAILY TRACKING DATA (last 30 days): ${JSON.stringify(daysData)}
30-DAY TOTALS: Hydration ${t.hydration}/30, Sleep ${t.sleep}/30, Movement ${t.movement}/30, Nourish ${t.nourish}/30
CURRENT STREAK: ${streak} days
CURRENT DAY: ${dayNum} of 30

Provide:
1. Her strongest foundation with specific evidence from the data
2. Her most vulnerable foundation and when it tends to drop (day of week, time patterns)
3. A personalized miss recovery strategy based on her actual miss patterns
4. An identity-affirming statement using her own data as evidence ("You've shown up X of Y days — that is not inconsistency, that is...")

Keep it under 200 words. Warm but direct. No bullet points \u2014 flowing paragraphs.\n\nFinally, on a NEW line at the very end, write exactly one of these tags based on the PRIMARY pattern you identified (parsed programmatically, write ONLY the tag):\n[CONSISTENCY_GAP] [ENERGY_DEPLETION] [HYDRATION_CORTISOL] [FOUNDATION_BUILDING]`}]
        })
      });
      const d = await res.json();
      let text = d.content?.map(c=>c.text||"").join("") || "Unable to analyze at this time.";
      const tagMatch = text.match(/\[(CONSISTENCY_GAP|ENERGY_DEPLETION|HYDRATION_CORTISOL|FOUNDATION_BUILDING)\]/);
      if (tagMatch) { text = text.replace(/\n?\[.*\]\s*$/, '').trim(); setAiRec(RECS[tagMatch[1].toLowerCase()]); }
      else { setAiRec(RECS.consistency_gap); }
      setAiResult(text);
    } catch(e) { setAiResult("Unable to connect. Please try again."); }
    setAiLoading(false);
  };

  const verifyPurchase = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gateEmail.trim())) { setGateErr("Please enter a valid email address."); return; }
    setGateLoading(true); setGateErr("");
    try {
      const res = await fetch("/.netlify/functions/verify-purchase", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gateEmail.trim(), product: "Rooted Reset Challenge Kit" })
      });
      const d = await res.json();
      if (d.verified) { setVerified(true); localStorage.setItem("larice_rooted_kit_email", gateEmail.trim()); }
      else { setGateErr("No purchase found for this email. Please use the email you purchased with."); }
    } catch {
      setVerified(true); localStorage.setItem("larice_rooted_kit_email", gateEmail.trim());
    }
    setGateLoading(false);
  };

  const css = { fontFamily:F, background:B.bg, minHeight:"100vh", color:B.tx, WebkitFontSmoothing:"antialiased" };
  const wrap = { maxWidth:500, margin:"0 auto", padding:"0 24px" };
  const Lbl = ({children}) => <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:18}}><span style={{height:1,width:26,background:B.accent,opacity:.45,transform:"translateY(-5px)"}} /><span style={{fontFamily:H,fontSize:20,fontWeight:600,fontStyle:"italic",color:B.accent,letterSpacing:.2}}>{children}</span></div>;




  if (!verified) return (
    <div style={css}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} input::placeholder{color:${B.txl}}`}</style>
      <div ref={ref} style={{...wrap,paddingTop:60,paddingBottom:56}}>
        <div style={{textAlign:"center",marginBottom:40,animation:"up .6s cubic-bezier(.22,1,.36,1) both"}}><Logo /></div>
        <div style={{textAlign:"center",marginBottom:36,animation:"up .6s cubic-bezier(.22,1,.36,1) .1s both"}}>
          <h1 style={{fontFamily:H,fontSize:"clamp(34px,9vw,46px)",fontWeight:600,lineHeight:1,letterSpacing:-.5,marginBottom:14}}>Rooted Reset<br/><span style={{fontStyle:"italic",color:B.accent}}>Challenge Kit</span></h1>
          <p style={{fontSize:14,color:B.txm,lineHeight:1.7}}>Enter the email you used to purchase.</p>
        </div>
        <div style={{animation:"up .6s cubic-bezier(.22,1,.36,1) .2s both",background:B.wh,padding:"32px 28px",borderRadius:12,border:`1px solid ${B.accent}20`}}>
          <input type="email" value={gateEmail} onChange={e=>{setGateEmail(e.target.value);setGateErr("");}} onKeyDown={e=>e.key==="Enter"&&verifyPurchase()} placeholder="you@email.com"
            style={{width:"100%",padding:"14px 0 12px",fontSize:16,fontFamily:F,border:"none",borderBottom:`2px solid ${gateErr?B.pri:B.txl+"50"}`,background:"transparent",color:B.tx,outline:"none",boxSizing:"border-box"}}
            onFocus={e=>{if(!gateErr)e.target.style.borderBottomColor=B.accent}} onBlur={e=>{if(!gateErr)e.target.style.borderBottomColor=B.txl+"50"}} />
          {gateErr && <p style={{fontSize:12,color:B.pri,marginTop:8,fontWeight:500,lineHeight:1.5}}>{gateErr}</p>}
          <button onClick={verifyPurchase} disabled={gateLoading} style={{width:"100%",marginTop:24,padding:"15px 0",fontSize:14,fontWeight:600,fontFamily:F,color:B.wh,background:gateLoading?B.txl:B.accent,border:"none",borderRadius:8,cursor:gateLoading?"default":"pointer",letterSpacing:1,textTransform:"uppercase",transition:"all .2s"}}
            onMouseEnter={e=>{if(!gateLoading)e.target.style.background=B.accentD}} onMouseLeave={e=>{if(!gateLoading)e.target.style.background=gateLoading?B.txl:B.accent}}>
            {gateLoading ? "Verifying..." : "Verify purchase"}
          </button>
        </div>
      </div>
    </div>
  );


  if (view==="week" && weekView) {
    const wk=weekView, totals=getWeekTotals(data,wk), daysInWeek=wk===4?9:7;
    return (
      <div style={css}>
        <style>{`@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div ref={ref} style={{...wrap,paddingTop:28,paddingBottom:48}}>
          <button onClick={()=>{setView("home");setWeekView(null);}} style={{fontSize:12,fontFamily:F,fontWeight:500,color:B.txl,background:"none",border:"none",cursor:"pointer",padding:"8px 0",marginBottom:24,borderBottom:`1.5px solid ${B.txl}30`}}>Back</button>
          <h2 style={{fontSize:22,fontWeight:600,fontFamily:H,marginBottom:20,}}>Week {wk} audit</h2>
          {FOUNDS.map((f,i)=>{const c=totals[f.key],pct=Math.round((c/daysInWeek)*100);return(
            <div key={i} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:500}}>{f.label}</span><span style={{fontSize:13,color:B.txm}}>{c}/{daysInWeek}</span></div>
            <div style={{height:6,background:B.tx+"0c",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",background:B.accent,borderRadius:3,width:pct+"%",transition:"width .4s"}} /></div></div>
          );})}
          <div style={{marginTop:24,padding:"22px 20px",borderRadius:10,background:B.accentL,border:`1px solid ${B.accent}18`}}>
            <Lbl>Week {wk} reflection</Lbl>
            <p style={{fontSize:13,color:B.txm,lineHeight:1.65,marginBottom:14,fontStyle:"italic"}}>{WEEK_PROMPTS[wk-1]}</p>
            <textarea value={data.reflections?.[wk]||""} onChange={e=>setReflection(wk,e.target.value)} placeholder="Write here..."
              style={{width:"100%",minHeight:100,padding:14,fontSize:14,fontFamily:F,border:`1px solid ${B.accent}20`,borderRadius:8,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7}}
              onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"20"} />
          </div>
        </div>
      </div>
    );
  }

  const activeIdentity = IDENTITY_PROMPTS.filter(p=>dayNum>=p.day);

  return (
    <div style={css}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
      <div ref={ref} style={{...wrap,paddingTop:40,paddingBottom:56}}>
        <div style={{textAlign:"center",marginBottom:28,animation:"up .5s cubic-bezier(.22,1,.36,1) both"}}><Logo /></div>

        <div style={{textAlign:"center",marginBottom:28}}>
          {dayNum>0 && (
            <div style={{display:"flex",justifyContent:"center",alignItems:"baseline",gap:8,marginBottom:14}}>
              <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:1}}>Day {dayNum}</span>
              <span style={{fontFamily:F,fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:B.txl}}>of thirty</span>
            </div>
          )}
          <h1 style={{fontFamily:H,fontSize:"clamp(38px,11vw,52px)",fontWeight:600,lineHeight:.98,letterSpacing:-1,marginBottom:16}}>
            Rooted Reset<br/><span style={{fontStyle:"italic",color:B.accent}}>Challenge Kit</span>
          </h1>
          <p style={{fontSize:15,color:B.txm,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>The system that makes your foundations permanent. Track, audit, recover, and build the identity of someone who follows through.</p>
        </div>

        {/* Streak reward */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:28,padding:"16px 0",borderTop:`1px solid ${B.tx}12`,borderBottom:`1px solid ${B.tx}12`}}>
          <span style={{fontFamily:H,fontSize:46,fontWeight:600,color:B.accent,lineHeight:.85}}>{streak}</span>
          <span style={{fontSize:12,letterSpacing:2,textTransform:"uppercase",fontWeight:600,color:B.txl,maxWidth:120,lineHeight:1.5}}>consecutive days rooted</span>
        </div>

        <div style={{display:"flex",gap:6,marginBottom:28}}>
          {[{k:"track",l:"Track"},{k:"system",l:"System"},{k:"research",l:"Research"}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",fontSize:12,fontWeight:600,fontFamily:F,letterSpacing:1,textTransform:"uppercase",color:tab===t.k?B.wh:B.accent,background:tab===t.k?B.accent:"transparent",border:`1.5px solid ${B.accent}`,borderRadius:6,cursor:"pointer",transition:"all .2s"}}>{t.l}</button>
          ))}
        </div>

        {tab==="track" && <>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:12,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"baseline",gap:12}}>
              <span style={{height:1,width:26,background:B.accent,opacity:.45,transform:"translateY(-5px)"}} />
              <span style={{fontFamily:H,fontSize:20,fontWeight:600,fontStyle:"italic",color:B.accent,letterSpacing:.2}}>Today's foundations</span>
            </div>
            <span style={{fontFamily:F,fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:doneCount===4?B.accent:B.txl}}>{doneCount===4?"Complete ✓":`${doneCount} of 4`}</span>
          </div>
          <div style={{background:B.wh,borderRadius:12,padding:"20px",border:`1px solid ${B.accent}15`,marginBottom:24}}>
            {FOUNDS.map((f,i)=>{const isDone=todayData[f.key];return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,marginBottom:i<3?16:0,paddingBottom:i<3?16:0,borderBottom:i<3?`1px solid ${B.tx}08`:"none"}}>
                <button onClick={()=>toggle(f.key)} style={{width:28,height:28,minWidth:28,borderRadius:6,border:`2px solid ${isDone?B.accent:B.txl+"60"}`,background:isDone?B.accent:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                  {isDone && <span style={{color:B.wh,fontSize:14,fontWeight:700}}>{"✓"}</span>}
                </button>
                <div style={{flex:1}}><p style={{fontSize:15,fontWeight:600}}>{f.label}</p><p style={{fontSize:12,color:B.txm}}>{f.q}</p></div>
              </div>
            );})}
          </div>

          <Lbl>What I noticed</Lbl>
          <textarea value={todayData.notice||""} onChange={e=>{const d={...data};if(!d.startDate)d.startDate=td();d.days={...d.days,[td()]:{...todayData,notice:e.target.value}};setData(d);}} placeholder="Energy, mood, patterns..."
            style={{width:"100%",minHeight:80,padding:14,fontSize:14,fontFamily:F,border:`1px solid ${B.accent}15`,borderRadius:10,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7,marginBottom:24}}
            onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"15"} />

          <Accordion title="Your targets">
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}><label style={{fontSize:11,fontWeight:600,color:B.txm,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Hydration target</label>
              <input value={data.hydrationTarget||""} onChange={e=>setData({...data,hydrationTarget:e.target.value})} placeholder="e.g. 80 oz" style={{width:"100%",padding:"10px 0 8px",fontSize:14,fontFamily:F,border:"none",borderBottom:`2px solid ${B.txl}50`,background:"transparent",color:B.tx,outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderBottomColor=B.accent} onBlur={e=>e.target.style.borderBottomColor=B.txl+"50"} /></div>
              <div style={{flex:1}}><label style={{fontSize:11,fontWeight:600,color:B.txm,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Sleep window</label>
              <input value={data.sleepWindow||""} onChange={e=>setData({...data,sleepWindow:e.target.value})} placeholder="e.g. 10pm-6am" style={{width:"100%",padding:"10px 0 8px",fontSize:14,fontFamily:F,border:"none",borderBottom:`2px solid ${B.txl}50`,background:"transparent",color:B.tx,outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderBottomColor=B.accent} onBlur={e=>e.target.style.borderBottomColor=B.txl+"50"} /></div>
            </div>
          </Accordion>

          <Lbl>Weekly habit audits</Lbl>
          {[1,2,3,4].map(wk=>{const isActive=dayNum>=((wk-1)*7+1);const totals=getWeekTotals(data,wk);const dw=wk===4?9:7;const tc=totals.hydration+totals.sleep+totals.movement+totals.nourish;return(
            <button key={wk} onClick={()=>{if(isActive){setWeekView(wk);setView("week");}}} disabled={!isActive}
              style={{display:"flex",width:"100%",alignItems:"baseline",gap:18,padding:"20px 0",background:"none",border:"none",borderBottom:wk<4?`1px solid ${B.tx}12`:"none",cursor:isActive?"pointer":"default",fontFamily:F,opacity:isActive?1:.4,transition:"opacity .2s"}}
              onMouseEnter={e=>{if(isActive){e.currentTarget.style.opacity=.6}}} onMouseLeave={e=>{if(isActive){e.currentTarget.style.opacity=1}}}>
              <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:.9,minWidth:38}}>{`0${wk}`}</span>
              <div style={{flex:1,textAlign:"left"}}><p style={{fontSize:15,fontWeight:600}}>Week {wk}</p><p style={{fontSize:12,color:B.txm}}>Days {(wk-1)*7+1}–{wk===4?30:wk*7}</p></div>
              <span style={{fontSize:14,fontWeight:600,color:B.accent,alignSelf:"center"}}>{tc}/{dw*4}</span>
            </button>
          );})}

          {activeIdentity.length > 0 && <>
            <div style={{marginTop:24}}><Lbl>Identity prompts</Lbl></div>
            {activeIdentity.map((ip,i)=>(
              <div key={i} style={{padding:"18px 20px",borderRadius:10,background:B.accentL,border:`1px solid ${B.accent}15`,marginBottom:8}}>
                <p style={{fontSize:12,color:B.accent,fontWeight:600,marginBottom:6}}>Day {ip.day}</p>
                <p style={{fontSize:14,lineHeight:1.7,fontStyle:"italic",marginBottom:10}}>{ip.prompt}</p>
                <textarea value={data.reflections?.[`id${ip.day}`]||""} onChange={e=>setReflection(`id${ip.day}`,e.target.value)} placeholder="Write here..."
                  style={{width:"100%",minHeight:60,padding:12,fontSize:13,fontFamily:F,border:`1px solid ${B.accent}20`,borderRadius:8,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.65}}
                  onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"20"} />
              </div>
            ))}
          </>}
        </>}

        {tab==="system" && <>
          <div style={{marginBottom:28}}>
            <Lbl>Audit my foundations</Lbl>
            <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginBottom:16}}>Your tracking data is analyzed to surface your strongest foundation, your vulnerability patterns, and a personalized recovery strategy.</p>
            <button onClick={analyzePatterns} disabled={aiLoading} style={{width:"100%",padding:"16px",fontSize:14,fontWeight:600,fontFamily:F,color:B.wh,background:aiLoading?B.txl:B.accent,border:"none",borderRadius:8,cursor:aiLoading?"default":"pointer",letterSpacing:.5,transition:"all .2s"}}
              onMouseEnter={e=>{if(!aiLoading)e.target.style.background=B.accentD}} onMouseLeave={e=>{if(!aiLoading)e.target.style.background=aiLoading?B.txl:B.accent}}>
              {aiLoading ? "Auditing your foundations..." : "Audit my foundations"}
            </button>
            {aiResult && (
              <div style={{marginTop:16,padding:"22px 20px",borderRadius:12,background:B.accentL,border:`1px solid ${B.accent}20`}}>
                <p style={{fontSize:14,lineHeight:1.85,color:B.tx,whiteSpace:"pre-wrap"}}>{aiResult}</p>
              </div>
            )}
            {aiRec && aiResult && (
              <div style={{marginTop:12,padding:"22px 20px",borderRadius:12,background:B.fill,border:`1px solid ${B.pri}20`}}>
                <p style={{fontSize:10,fontWeight:600,letterSpacing:2.5,textTransform:"uppercase",color:B.pri,marginBottom:8}}>BdyAlign recommendation</p>
                <p style={{fontSize:16,fontWeight:600,marginBottom:6,fontFamily:H}}>{aiRec.product}</p>
                <p style={{fontSize:13,lineHeight:1.75,color:B.txm,marginBottom:12}}>{aiRec.desc}</p>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <a href={aiRec.url} target="_blank" rel="noopener noreferrer" style={{padding:"10px 20px",fontSize:13,fontWeight:600,fontFamily:F,color:B.wh,background:B.pri,border:"none",borderRadius:6,cursor:"pointer",textDecoration:"none",letterSpacing:.5}}>Learn more</a>
                  <span style={{fontSize:14,fontWeight:600,color:B.pri}}>{aiRec.price}</span>
                </div>
              </div>
            )}
          </div>

          <Lbl>Miss protocol</Lbl>
          <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginBottom:16}}>When you miss a day, this is your recovery sequence. Follow it in order.</p>
          {MISS_PROTOCOL.map((m,i)=>(
            <div key={i} style={{display:"flex",gap:18,alignItems:"baseline",padding:"20px 0",borderBottom:i<MISS_PROTOCOL.length-1?`1px solid ${B.tx}12`:"none"}}>
              <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:.9,minWidth:38}}>{`0${i+1}`}</span>
              <div><p style={{fontSize:15,fontWeight:600,marginBottom:4}}>{m.title}</p><p style={{fontSize:13,lineHeight:1.7,color:B.txm}}>{m.body}</p></div>
            </div>
          ))}

          <div style={{marginTop:28}}><Lbl>30-day summary</Lbl></div>
          <div style={{display:"flex",borderTop:`1px solid ${B.tx}12`,borderBottom:`1px solid ${B.tx}12`,marginBottom:24}}>
            {FOUNDS.map((f,i)=>(
              <div key={i} style={{flex:1,textAlign:"center",padding:"20px 6px",borderLeft:i>0?`1px solid ${B.tx}12`:"none"}}>
                <p style={{fontFamily:H,fontSize:38,fontWeight:600,color:B.accent,lineHeight:1}}>{totals30[f.key]}</p>
                <p style={{fontSize:9,color:B.txm,marginTop:6,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{f.label}</p>
                <p style={{fontSize:10,color:B.txl,marginTop:2}}>of 30</p>
              </div>
            ))}
          </div>

          <div style={{padding:"22px 20px",borderRadius:12,background:B.accentL,border:`1px solid ${B.accent}18`}}>
            <Lbl>The rule</Lbl>
            <p style={{fontSize:14,lineHeight:1.8}}>If you miss a day, you do not restart. A missed day is a gap in the data, not a reason to quit. If everything falls apart, track two: hydration and sleep window. Two is infinitely better than zero.</p>
          </div>
        </>}

        {tab==="research" && <>
          <Lbl>The science behind each foundation</Lbl>
          {RESEARCH.map((r,i)=>(
            <div key={i} style={{display:"flex",gap:18,alignItems:"baseline",padding:"20px 0",borderBottom:i<RESEARCH.length-1?`1px solid ${B.tx}12`:"none"}}>
              <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:.9,minWidth:38}}>{`0${i+1}`}</span>
              <div>
                <p style={{fontSize:15,fontWeight:600,marginBottom:4}}>{r.title}</p>
                <p style={{fontSize:13,lineHeight:1.7,color:B.txm}}>{r.body}</p>
              </div>
            </div>
          ))}
        </>}

        <div style={{textAlign:"center",paddingTop:20}}>
          <p style={{fontSize:11,color:B.txl,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>Consistency beats intensity, always.</p>
          <p style={{fontSize:11,color:B.txl,marginTop:8,letterSpacing:2}}>@lovelarice</p>
        </div>
      </div>
    </div>
  );
}
