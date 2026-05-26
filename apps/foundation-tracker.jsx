import { useState, useEffect, useRef } from "react";

const B = { pri:"#A84A30", sec:"#D4856A", acc:"#5C5470", bg:"#FAF6F2", tx:"#3A2018", txm:"#6B5B52", txl:"#A69890", accL:"#EEEDF5", wh:"#FFFFFF", fill:"#F5E8E1", accent:"#5A7F3C", accentL:"#ECF2E6", accentD:"#3D5A28" };
const F = "'Outfit', sans-serif";
const H = "'Cormorant Garamond', serif";
const LOGO = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1100\" zoomAndPan=\"magnify\" viewBox=\"0 0 824.88 374.999991\" height=\"500\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.0\"><defs><g/></defs><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(171.424323, 194.17699)\"><g><path d=\"M 63.203125 9.125 C 60.898438 10.6875 58.613281 11.972656 56.34375 12.984375 C 54.082031 13.992188 51.5 14.5 48.59375 14.5 C 46.351562 14.5 44.269531 14.144531 42.34375 13.4375 C 40.414062 12.726562 38.539062 11.832031 36.71875 10.75 C 34.894531 9.664062 33.085938 8.5 31.296875 7.25 C 29.503906 6 27.644531 4.832031 25.71875 3.75 C 23.789062 2.664062 21.707031 1.769531 19.46875 1.0625 C 17.238281 0.351562 14.804688 0 12.171875 0 L 3.34375 0 C 4.90625 -0.332031 5.9375 -1.160156 6.4375 -2.484375 C 6.945312 -3.804688 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.625 C 7.203125 -44.96875 6.929688 -46.234375 6.390625 -47.421875 C 5.847656 -48.609375 4.832031 -49.367188 3.34375 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.367188 14.539062 -48.609375 14 -47.421875 C 13.457031 -46.234375 13.1875 -44.96875 13.1875 -43.625 L 13.1875 -0.90625 C 16.632812 -0.769531 19.976562 -0.078125 23.21875 1.171875 C 26.46875 2.421875 29.664062 3.785156 32.8125 5.265625 C 35.957031 6.753906 39.132812 8.09375 42.34375 9.28125 C 45.5625 10.46875 48.859375 11.0625 52.234375 11.0625 C 54.203125 11.0625 56.03125 10.875 57.71875 10.5 C 59.40625 10.125 61.128906 9.5 62.890625 8.625 Z M 63.203125 9.125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(191.913475, 194.17699)\"><g><path d=\"M 10.546875 -4.671875 C 10.546875 -3.378906 10.914062 -2.359375 11.65625 -1.609375 C 12.40625 -0.867188 13.351562 -0.332031 14.5 0 L 3.65625 0 C 4.875 -0.40625 6.019531 -1.148438 7.09375 -2.234375 C 8.175781 -3.316406 8.957031 -4.5 9.4375 -5.78125 L 26.671875 -50.3125 L 44.03125 -5.78125 C 44.5625 -4.5625 45.25 -3.394531 46.09375 -2.28125 C 46.945312 -1.164062 48.015625 -0.40625 49.296875 0 L 34.6875 0 C 35.570312 -0.269531 36.300781 -0.859375 36.875 -1.765625 C 37.445312 -2.679688 37.734375 -3.546875 37.734375 -4.359375 C 37.734375 -4.898438 37.492188 -5.847656 37.015625 -7.203125 C 36.546875 -8.554688 36.003906 -10.007812 35.390625 -11.5625 C 34.785156 -13.113281 34.195312 -14.597656 33.625 -16.015625 C 33.050781 -17.441406 32.628906 -18.492188 32.359375 -19.171875 L 15.625 -19.171875 C 15.351562 -18.492188 14.945312 -17.492188 14.40625 -16.171875 C 13.863281 -14.859375 13.304688 -13.472656 12.734375 -12.015625 C 12.160156 -10.566406 11.648438 -9.164062 11.203125 -7.8125 C 10.765625 -6.457031 10.546875 -5.410156 10.546875 -4.671875 Z M 15.828125 -19.984375 L 31.953125 -19.984375 L 23.9375 -40.875 Z M 15.828125 -19.984375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(236.847953, 194.17699)\"><g><path d=\"M 13.390625 -6.296875 C 13.390625 -4.941406 13.660156 -3.671875 14.203125 -2.484375 C 14.742188 -1.296875 15.691406 -0.46875 17.046875 0 L 3.65625 0 C 5.070312 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.070312 -49.296875 3.65625 -49.703125 L 20.890625 -49.703125 C 23.328125 -49.703125 25.710938 -49.429688 28.046875 -48.890625 C 30.378906 -48.347656 32.457031 -47.484375 34.28125 -46.296875 C 36.113281 -45.117188 37.585938 -43.566406 38.703125 -41.640625 C 39.816406 -39.710938 40.375 -37.363281 40.375 -34.59375 C 40.375 -30.601562 39.171875 -27.351562 36.765625 -24.84375 C 34.367188 -22.34375 31.3125 -20.65625 27.59375 -19.78125 L 36.828125 -4.875 C 37.566406 -3.789062 38.441406 -2.804688 39.453125 -1.921875 C 40.472656 -1.046875 41.554688 -0.40625 42.703125 0 L 33.265625 0 L 21.203125 -19.578125 L 13.390625 -19.578125 Z M 13.390625 -20.28125 L 20.28125 -20.28125 C 24.539062 -20.28125 27.90625 -21.597656 30.375 -24.234375 C 32.84375 -26.878906 34.078125 -30.332031 34.078125 -34.59375 C 34.078125 -39.050781 32.894531 -42.546875 30.53125 -45.078125 C 28.164062 -47.617188 24.75 -48.890625 20.28125 -48.890625 L 13.390625 -48.890625 Z M 13.390625 -20.28125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(278.739776, 194.17699)\"><g><path d=\"M 13.390625 -6.484375 C 13.390625 -5.140625 13.625 -3.835938 14.09375 -2.578125 C 14.570312 -1.328125 15.519531 -0.46875 16.9375 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.3125 6.484375 -2.53125 C 6.960938 -3.75 7.203125 -5.066406 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.117188 6.484375 -47.265625 C 6.015625 -48.421875 5.035156 -49.234375 3.546875 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.234375 14.570312 -48.421875 14.09375 -47.265625 C 13.625 -46.117188 13.390625 -44.867188 13.390625 -43.515625 Z M 13.390625 -6.484375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(294.765822, 194.17699)\"><g><path d=\"M 47.375 -7.203125 C 46.21875 -6.191406 44.894531 -5.242188 43.40625 -4.359375 C 41.925781 -3.484375 40.375 -2.707031 38.75 -2.03125 C 37.125 -1.351562 35.484375 -0.8125 33.828125 -0.40625 C 32.171875 0 30.566406 0.203125 29.015625 0.203125 C 25.492188 0.203125 22.175781 -0.4375 19.0625 -1.71875 C 15.957031 -3.007812 13.253906 -4.769531 10.953125 -7 C 8.648438 -9.226562 6.835938 -11.863281 5.515625 -14.90625 C 4.203125 -17.945312 3.546875 -21.265625 3.546875 -24.859375 C 3.546875 -28.441406 4.203125 -31.753906 5.515625 -34.796875 C 6.835938 -37.835938 8.648438 -40.472656 10.953125 -42.703125 C 13.253906 -44.929688 15.957031 -46.6875 19.0625 -47.96875 C 22.175781 -49.257812 25.492188 -49.90625 29.015625 -49.90625 C 31.785156 -49.90625 34.65625 -49.550781 37.625 -48.84375 C 40.601562 -48.132812 43.175781 -46.898438 45.34375 -45.140625 L 45.34375 -37.03125 C 44.332031 -38.445312 43.164062 -39.863281 41.84375 -41.28125 C 40.519531 -42.707031 39.097656 -43.992188 37.578125 -45.140625 C 36.054688 -46.285156 34.414062 -47.210938 32.65625 -47.921875 C 30.90625 -48.640625 29.113281 -49 27.28125 -49 C 24.375 -49 21.875 -48.300781 19.78125 -46.90625 C 17.6875 -45.519531 15.945312 -43.757812 14.5625 -41.625 C 13.175781 -39.5 12.160156 -37.117188 11.515625 -34.484375 C 10.867188 -31.847656 10.546875 -29.28125 10.546875 -26.78125 C 10.546875 -24.007812 10.914062 -21.082031 11.65625 -18 C 12.40625 -14.925781 13.554688 -12.117188 15.109375 -9.578125 C 16.671875 -7.046875 18.648438 -4.953125 21.046875 -3.296875 C 23.453125 -1.640625 26.3125 -0.8125 29.625 -0.8125 C 31.507812 -0.8125 33.28125 -1.164062 34.9375 -1.875 C 36.601562 -2.582031 38.128906 -3.507812 39.515625 -4.65625 C 40.898438 -5.8125 42.148438 -7.132812 43.265625 -8.625 C 44.378906 -10.113281 45.34375 -11.632812 46.15625 -13.1875 Z M 47.375 -7.203125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(341.323625, 194.17699)\"><g><path d=\"M 23.03125 -0.8125 C 26.207031 -0.8125 29.316406 -1.554688 32.359375 -3.046875 C 35.398438 -4.535156 37.695312 -6.734375 39.25 -9.640625 L 36.921875 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.035156 -49.296875 3.546875 -49.703125 L 36.21875 -49.703125 L 38.234375 -40.171875 C 36.679688 -43.140625 34.601562 -45.332031 32 -46.75 C 29.394531 -48.175781 26.4375 -48.890625 23.125 -48.890625 L 13.390625 -48.890625 L 13.390625 -25.65625 L 19.671875 -25.65625 C 21.503906 -25.65625 23.195312 -26.046875 24.75 -26.828125 C 26.300781 -27.609375 27.347656 -28.976562 27.890625 -30.9375 L 27.890625 -19.78125 C 27.347656 -21.738281 26.300781 -23.070312 24.75 -23.78125 C 23.195312 -24.5 21.503906 -24.859375 19.671875 -24.859375 L 13.390625 -24.859375 L 13.390625 -0.8125 Z M 23.03125 -0.8125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(453.619704, 160.779442)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(471.019481, 160.779442)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(487.100496, 160.779442)\"><g><path d=\"M 8.765625 -7.953125 L 13.921875 -7.953125 L 13.921875 -0.578125 C 13.117188 -0.316406 12.300781 -0.125 11.46875 0 C 10.644531 0.132812 9.6875 0.203125 8.59375 0.203125 C 6.289062 0.203125 4.5 -0.476562 3.21875 -1.84375 C 1.9375 -3.207031 1.296875 -5.125 1.296875 -7.59375 C 1.296875 -9.164062 1.613281 -10.546875 2.25 -11.734375 C 2.882812 -12.921875 3.796875 -13.828125 4.984375 -14.453125 C 6.171875 -15.085938 7.566406 -15.40625 9.171875 -15.40625 C 10.785156 -15.40625 12.296875 -15.101562 13.703125 -14.5 L 13.015625 -12.953125 C 11.640625 -13.535156 10.316406 -13.828125 9.046875 -13.828125 C 7.203125 -13.828125 5.757812 -13.273438 4.71875 -12.171875 C 3.6875 -11.066406 3.171875 -9.539062 3.171875 -7.59375 C 3.171875 -5.539062 3.671875 -3.984375 4.671875 -2.921875 C 5.671875 -1.867188 7.140625 -1.34375 9.078125 -1.34375 C 10.128906 -1.34375 11.15625 -1.460938 12.15625 -1.703125 L 12.15625 -6.375 L 8.765625 -6.375 Z M 8.765625 -7.953125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(506.83668, 160.779442)\"><g><path d=\"M 13.546875 -15.1875 L 13.546875 -5.359375 C 13.546875 -3.628906 13.023438 -2.269531 11.984375 -1.28125 C 10.941406 -0.289062 9.503906 0.203125 7.671875 0.203125 C 5.847656 0.203125 4.4375 -0.289062 3.4375 -1.28125 C 2.4375 -2.28125 1.9375 -3.65625 1.9375 -5.40625 L 1.9375 -15.1875 L 3.703125 -15.1875 L 3.703125 -5.28125 C 3.703125 -4.007812 4.046875 -3.035156 4.734375 -2.359375 C 5.421875 -1.679688 6.4375 -1.34375 7.78125 -1.34375 C 9.0625 -1.34375 10.046875 -1.679688 10.734375 -2.359375 C 11.429688 -3.046875 11.78125 -4.023438 11.78125 -5.296875 L 11.78125 -15.1875 Z M 13.546875 -15.1875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(526.572864, 160.779442)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 -1.59375 L 10.546875 -1.59375 L 10.546875 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(541.864695, 160.779442)\"><g><path d=\"M 11.625 0 L 9.734375 -4.828125 L 3.65625 -4.828125 L 1.78125 0 L 0 0 L 6 -15.25 L 7.484375 -15.25 L 13.453125 0 Z M 9.1875 -6.421875 L 7.421875 -11.125 C 7.191406 -11.71875 6.957031 -12.445312 6.71875 -13.3125 C 6.5625 -12.644531 6.34375 -11.914062 6.0625 -11.125 L 4.28125 -6.421875 Z M 9.1875 -6.421875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(559.575992, 160.779442)\"><g><path d=\"M 6.765625 0 L 5 0 L 5 -13.609375 L 0.1875 -13.609375 L 0.1875 -15.1875 L 11.5625 -15.1875 L 11.5625 -13.609375 L 6.765625 -13.609375 Z M 6.765625 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(575.594703, 160.779442)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(591.675718, 160.779442)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(416.382935, 190.025186)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(433.782713, 190.025186)\"><g><path d=\"M 15.265625 -7.609375 C 15.265625 -5.179688 14.648438 -3.269531 13.421875 -1.875 C 12.191406 -0.488281 10.484375 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.476562 3.109375 -1.84375 C 1.898438 -3.207031 1.296875 -5.132812 1.296875 -7.625 C 1.296875 -10.101562 1.90625 -12.019531 3.125 -13.375 C 4.34375 -14.738281 6.070312 -15.421875 8.3125 -15.421875 C 10.5 -15.421875 12.203125 -14.726562 13.421875 -13.34375 C 14.648438 -11.957031 15.265625 -10.046875 15.265625 -7.609375 Z M 3.171875 -7.609375 C 3.171875 -5.554688 3.609375 -4 4.484375 -2.9375 C 5.359375 -1.875 6.628906 -1.34375 8.296875 -1.34375 C 9.972656 -1.34375 11.238281 -1.867188 12.09375 -2.921875 C 12.957031 -3.984375 13.390625 -5.546875 13.390625 -7.609375 C 13.390625 -9.648438 12.960938 -11.195312 12.109375 -12.25 C 11.253906 -13.3125 9.988281 -13.84375 8.3125 -13.84375 C 6.632812 -13.84375 5.359375 -13.3125 4.484375 -12.25 C 3.609375 -11.1875 3.171875 -9.640625 3.171875 -7.609375 Z M 3.171875 -7.609375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(454.598832, 190.025186)\"><g><path d=\"M 15.265625 -7.609375 C 15.265625 -5.179688 14.648438 -3.269531 13.421875 -1.875 C 12.191406 -0.488281 10.484375 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.476562 3.109375 -1.84375 C 1.898438 -3.207031 1.296875 -5.132812 1.296875 -7.625 C 1.296875 -10.101562 1.90625 -12.019531 3.125 -13.375 C 4.34375 -14.738281 6.070312 -15.421875 8.3125 -15.421875 C 10.5 -15.421875 12.203125 -14.726562 13.421875 -13.34375 C 14.648438 -11.957031 15.265625 -10.046875 15.265625 -7.609375 Z M 3.171875 -7.609375 C 3.171875 -5.554688 3.609375 -4 4.484375 -2.9375 C 5.359375 -1.875 6.628906 -1.34375 8.296875 -1.34375 C 9.972656 -1.34375 11.238281 -1.867188 12.09375 -2.921875 C 12.957031 -3.984375 13.390625 -5.546875 13.390625 -7.609375 C 13.390625 -9.648438 12.960938 -11.195312 12.109375 -12.25 C 11.253906 -13.3125 9.988281 -13.84375 8.3125 -13.84375 C 6.632812 -13.84375 5.359375 -13.3125 4.484375 -12.25 C 3.609375 -11.1875 3.171875 -9.640625 3.171875 -7.609375 Z M 3.171875 -7.609375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(475.414952, 190.025186)\"><g><path d=\"M 6.765625 0 L 5 0 L 5 -13.609375 L 0.1875 -13.609375 L 0.1875 -15.1875 L 11.5625 -15.1875 L 11.5625 -13.609375 L 6.765625 -13.609375 Z M 6.765625 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(491.433663, 190.025186)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(501.34658, 190.025186)\"><g/></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(511.1245, 190.025186)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(528.524277, 190.025186)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(544.605292, 190.025186)\"><g><path d=\"M 8.59375 -13.828125 C 6.914062 -13.828125 5.59375 -13.269531 4.625 -12.15625 C 3.664062 -11.039062 3.1875 -9.519531 3.1875 -7.59375 C 3.1875 -5.601562 3.648438 -4.066406 4.578125 -2.984375 C 5.515625 -1.898438 6.84375 -1.359375 8.5625 -1.359375 C 9.625 -1.359375 10.832031 -1.550781 12.1875 -1.9375 L 12.1875 -0.390625 C 11.132812 0.00390625 9.835938 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.472656 3.109375 -1.828125 C 1.898438 -3.179688 1.296875 -5.109375 1.296875 -7.609375 C 1.296875 -9.171875 1.585938 -10.539062 2.171875 -11.71875 C 2.753906 -12.894531 3.597656 -13.800781 4.703125 -14.4375 C 5.804688 -15.082031 7.109375 -15.40625 8.609375 -15.40625 C 10.203125 -15.40625 11.59375 -15.113281 12.78125 -14.53125 L 12.03125 -13.015625 C 10.882812 -13.554688 9.738281 -13.828125 8.59375 -13.828125 Z M 8.59375 -13.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(562.275053, 190.025186)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 -1.59375 L 10.546875 -1.59375 L 10.546875 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(577.566884, 190.025186)\"><g><path d=\"M 11.625 0 L 9.734375 -4.828125 L 3.65625 -4.828125 L 1.78125 0 L 0 0 L 6 -15.25 L 7.484375 -15.25 L 13.453125 0 Z M 9.1875 -6.421875 L 7.421875 -11.125 C 7.191406 -11.71875 6.957031 -12.445312 6.71875 -13.3125 C 6.5625 -12.644531 6.34375 -11.914062 6.0625 -11.125 L 4.28125 -6.421875 Z M 9.1875 -6.421875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(595.278182, 190.025186)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(605.461083, 190.025186)\"><g><path d=\"M 8.8125 0 L 3.65625 -13.453125 L 3.578125 -13.453125 C 3.671875 -12.390625 3.71875 -11.125 3.71875 -9.65625 L 3.71875 0 L 2.09375 0 L 2.09375 -15.1875 L 4.75 -15.1875 L 9.546875 -2.65625 L 9.640625 -2.65625 L 14.484375 -15.1875 L 17.125 -15.1875 L 17.125 0 L 15.359375 0 L 15.359375 -9.78125 C 15.359375 -10.90625 15.40625 -12.125 15.5 -13.4375 L 15.421875 -13.4375 L 10.234375 0 Z M 8.8125 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(628.914752, 190.025186)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g></svg>";
const Logo = () => <div style={{width:500,maxWidth:"100%",margin:"0 auto",overflow:"hidden"}} dangerouslySetInnerHTML={{__html:LOGO.replace(/width="1100"/,'width="100%"').replace(/height="500"/,'').replace(/viewBox="0 0 824.88 374.999991"/,'viewBox="0 110 824.88 110"')}} />;

const SK = "larice_7day_tracker";
const load = () => { try { return JSON.parse(localStorage.getItem(SK)) || {days:{},hydrationTarget:"",sleepWindow:""}; } catch { return {days:{},hydrationTarget:"",sleepWindow:""}; } };
const save = (d) => localStorage.setItem(SK, JSON.stringify(d));
const td = () => new Date().toISOString().slice(0,10);

const FOUNDS = [
  { key:"hydration", label:"Hydration", q:"Hit your target oz?" },
  { key:"sleep", label:"Sleep Window", q:"Bed & wake within 30 min?" },
  { key:"movement", label:"Movement", q:"10+ minutes?" },
  { key:"nourish", label:"Nourish", q:"1 intentional meal?" },
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

function hasCheckedToday(data) {
  const d = data.days?.[td()];
  return d && (d.hydration||d.sleep||d.movement||d.nourish);
}

function getDayNumber(data) {
  if (!data.startDate) return 0;
  return Math.min(Math.floor((new Date(td()+"T12:00:00")-new Date(data.startDate+"T12:00:00"))/86400000)+1, 7);
}

function getDayDates(data) {
  if (!data.startDate) return [];
  const start = new Date(data.startDate+"T12:00:00");
  const dates = [];
  for (let i=0;i<7;i++) {
    const d = new Date(start); d.setDate(d.getDate()+i);
    dates.push(d.toISOString().slice(0,10));
  }
  return dates;
}

function getDay3Insight(data) {
  const names = { hydration:"Hydration", sleep:"Sleep window", movement:"Movement", nourish:"Nourishment" };
  const counts = { hydration:0, sleep:0, movement:0, nourish:0 };
  Object.values(data.days||{}).forEach(d => Object.keys(counts).forEach(k => { if (d[k]) counts[k]++; }));
  const ranked = Object.entries(counts).sort((a,b) => b[1]-a[1]);
  const top = names[ranked[0][0]], low = names[ranked[ranked.length-1][0]];
  return `${top} is your steadiest foundation so far, and ${low} is where the rhythm slips — that's your highest-leverage focus this week.`;
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
  const ref = useRef(null);

  useEffect(() => { save(data); }, [data]);
  useEffect(() => { ref.current?.scrollIntoView({behavior:"smooth",block:"start"}); }, []);

  const streak = getStreak(data);
  const checked = hasCheckedToday(data);
  const dayNum = getDayNumber(data);
  const todayData = data.days?.[td()] || {};
  const dayDates = getDayDates(data);
  const dayLabel = (d) => new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"});

  const toggle = (key) => {
    const d = {...data};
    if (!d.startDate) d.startDate = td();
    d.days = {...d.days, [td()]: {...todayData, [key]:!todayData[key]}};
    setData(d);
  };

  const css = { fontFamily:F, background:B.bg, minHeight:"100vh", color:B.tx, WebkitFontSmoothing:"antialiased" };
  const wrap = { maxWidth:500, margin:"0 auto", padding:"0 24px" };
  const Lbl = ({children}) => (
    <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:18}}>
      <span style={{height:1,width:26,background:B.accent,opacity:.45,transform:"translateY(-5px)"}} />
      <span style={{fontFamily:H,fontSize:20,fontWeight:600,fontStyle:"italic",color:B.accent,letterSpacing:.2}}>{children}</span>
    </div>
  );

  return (
    <div style={css}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
      <div ref={ref} style={{...wrap,paddingTop:40,paddingBottom:56}}>
        <div style={{textAlign:"center",marginBottom:28,animation:"up .5s cubic-bezier(.22,1,.36,1) both"}}><Logo /></div>

        {/* Reminder */}
        {!checked && (
          <div style={{background:B.pri,borderRadius:10,padding:"16px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:14,animation:"up .4s cubic-bezier(.22,1,.36,1) .1s both"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:B.wh,animation:"pulse 2s ease-in-out infinite",minWidth:8}} />
            <p style={{fontSize:14,color:B.wh,fontWeight:500}}>You haven't checked in today</p>
          </div>
        )}
        {checked && (
          <div style={{background:B.accentL,borderRadius:10,padding:"16px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:14,border:`1px solid ${B.accent}20`}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:B.accent,minWidth:8}} />
            <p style={{fontSize:14,color:B.accent,fontWeight:500}}>Checked in today</p>
          </div>
        )}

        {/* Title */}
        <div style={{textAlign:"center",marginBottom:40,animation:"up .6s cubic-bezier(.22,1,.36,1) .15s both"}}>
          {dayNum > 0 && (
            <div style={{display:"flex",justifyContent:"center",alignItems:"baseline",gap:8,marginBottom:14}}>
              <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:1}}>Day {dayNum}</span>
              <span style={{fontFamily:F,fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:B.txl}}>of seven</span>
            </div>
          )}
          <h1 style={{fontFamily:H,fontSize:"clamp(40px,13vw,58px)",fontWeight:600,lineHeight:.96,letterSpacing:-1,marginBottom:18}}>
            Four foundations.<br/><span style={{fontStyle:"italic",color:B.accent}}>Seven days.</span>
          </h1>
          <p style={{fontSize:15,color:B.txm,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>No perfection required. This is your proof of concept that consistency is possible.</p>
        </div>

        {/* Settings */}
        <div style={{animation:"up .5s cubic-bezier(.22,1,.36,1) .2s both",marginBottom:28}}>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1}}>
              <label style={{fontSize:11,fontWeight:600,color:B.txm,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Hydration target</label>
              <input value={data.hydrationTarget||""} onChange={e=>setData({...data,hydrationTarget:e.target.value})} placeholder="e.g. 80 oz"
                style={{width:"100%",padding:"10px 0 8px",fontSize:14,fontFamily:F,border:"none",borderBottom:`2px solid ${B.txl}50`,background:"transparent",color:B.tx,outline:"none",boxSizing:"border-box"}}
                onFocus={e=>e.target.style.borderBottomColor=B.accent} onBlur={e=>e.target.style.borderBottomColor=B.txl+"50"} />
            </div>
            <div style={{flex:1}}>
              <label style={{fontSize:11,fontWeight:600,color:B.txm,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Sleep window</label>
              <input value={data.sleepWindow||""} onChange={e=>setData({...data,sleepWindow:e.target.value})} placeholder="e.g. 10pm-6am"
                style={{width:"100%",padding:"10px 0 8px",fontSize:14,fontFamily:F,border:"none",borderBottom:`2px solid ${B.txl}50`,background:"transparent",color:B.tx,outline:"none",boxSizing:"border-box"}}
                onFocus={e=>e.target.style.borderBottomColor=B.accent} onBlur={e=>e.target.style.borderBottomColor=B.txl+"50"} />
            </div>
          </div>
        </div>

        {/* Today's check-in */}
        <div style={{animation:"up .5s cubic-bezier(.22,1,.36,1) .25s both",marginBottom:28}}>
          <Lbl>Today's foundations</Lbl>
          <div style={{background:B.wh,borderRadius:12,padding:"20px",border:`1px solid ${B.accent}15`}}>
            {FOUNDS.map((f,i)=>{
              const isDone = todayData[f.key];
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:14,marginBottom:i<3?16:0,paddingBottom:i<3?16:0,borderBottom:i<3?`1px solid ${B.tx}08`:"none"}}>
                  <button onClick={()=>toggle(f.key)} style={{width:28,height:28,minWidth:28,borderRadius:6,border:`2px solid ${isDone?B.accent:B.txl+"60"}`,background:isDone?B.accent:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                    {isDone && <span style={{color:B.wh,fontSize:14,fontWeight:700}}>{"✓"}</span>}
                  </button>
                  <div style={{flex:1}}>
                    <p style={{fontSize:15,fontWeight:600}}>{f.label}</p>
                    <p style={{fontSize:12,color:B.txm}}>{f.q}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What I noticed */}
        <div style={{animation:"up .5s cubic-bezier(.22,1,.36,1) .3s both",marginBottom:28}}>
          <Lbl>What I noticed today</Lbl>
          <textarea value={todayData.notice||""} onChange={e=>{
            const d={...data,days:{...data.days,[td()]:{...todayData,notice:e.target.value}}};
            if(!d.startDate)d.startDate=td();
            setData(d);
          }} placeholder="Any observations about energy, mood, or patterns..."
            style={{width:"100%",minHeight:80,padding:14,fontSize:14,fontFamily:F,border:`1px solid ${B.accent}15`,borderRadius:10,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7}}
            onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"15"} />
        </div>

        {/* 7-day progress */}
        {dayDates.length > 0 && (
          <div style={{animation:"up .5s cubic-bezier(.22,1,.36,1) .35s both",marginBottom:32}}>
            <Lbl>Your 7-day progress</Lbl>
            <div style={{background:B.wh,borderRadius:12,padding:"20px",border:`1px solid ${B.accent}15`}}>
              <div style={{display:"flex",gap:6}}>
                {dayDates.map((date,i)=>{
                  const entry = data.days?.[date] || {};
                  const count = [entry.hydration,entry.sleep,entry.movement,entry.nourish].filter(Boolean).length;
                  const isToday = date === td();
                  const isPast = date < td();
                  return (
                    <div key={i} style={{flex:1,textAlign:"center"}}>
                      <p style={{fontSize:10,color:isToday?B.accent:B.txm,fontWeight:isToday?600:400,marginBottom:6}}>{dayLabel(date)}</p>
                      <div style={{display:"flex",flexDirection:"column",gap:2}}>
                        {[0,1,2,3].map(j=>(
                          <div key={j} style={{height:8,borderRadius:2,background:count>j?B.accent:(isPast||isToday)?`${B.tx}0c`:`${B.tx}06`,transition:"background .3s"}} />
                        ))}
                      </div>
                      <p style={{fontSize:10,color:count>0?B.accent:B.txl,fontWeight:500,marginTop:4}}>{count}/4</p>
                    </div>
                  );
                })}
              </div>
              <div style={{display:"flex",gap:10,marginTop:14,justifyContent:"center",borderTop:`1px solid ${B.tx}08`,paddingTop:10}}>
                {FOUNDS.map((f,i)=>{
                  const total = dayDates.reduce((sum,d)=>(data.days?.[d]?.[f.key]?sum+1:sum),0);
                  return <div key={i} style={{textAlign:"center",flex:1}}>
                    <p style={{fontSize:18,fontWeight:600,color:B.accent,lineHeight:1}}>{total}</p>
                    <p style={{fontSize:8,color:B.txm,marginTop:2,fontWeight:600,letterSpacing:.5,textTransform:"uppercase"}}>{f.label}</p>
                  </div>;
                })}
              </div>
            </div>
          </div>
        )}

        {/* End-of-week reflection */}
        {dayNum >= 7 && (
          <div style={{animation:"up .5s cubic-bezier(.22,1,.36,1) .4s both",marginBottom:32}}>
            <Lbl>Day 7 reflection</Lbl>
            <div style={{padding:"22px 20px",borderRadius:10,background:B.accentL,border:`1px solid ${B.accent}18`}}>
              <p style={{fontSize:13,color:B.txm,lineHeight:1.65,marginBottom:14,fontStyle:"italic"}}>Which foundation was easiest? Which was hardest? What got in the way?</p>
              <textarea value={data.reflection||""} onChange={e=>setData({...data,reflection:e.target.value})} placeholder="Write here..."
                style={{width:"100%",minHeight:100,padding:14,fontSize:14,fontFamily:F,border:`1px solid ${B.accent}20`,borderRadius:8,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7}}
                onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"20"} />
            </div>
          </div>
        )}

        {/* The rule */}
        <div style={{animation:"up .5s cubic-bezier(.22,1,.36,1) .4s both",padding:"22px 20px",borderRadius:12,background:B.accentL,border:`1px solid ${B.accent}18`,marginBottom:32}}>
          <Lbl>The rule</Lbl>
          <p style={{fontSize:14,lineHeight:1.8}}>If you miss a day, you do not restart. You pick up the next day. A missed day is a gap in the data, not a reason to quit.</p>
          <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginTop:12,fontStyle:"italic"}}>If everything falls apart, track two foundations: hydration and sleep window. Two is infinitely better than zero.</p>
        </div>

        {/* Why these four */}
        <div style={{animation:"up .5s cubic-bezier(.22,1,.36,1) .45s both",marginBottom:32}}>
          <Lbl>Why these four</Lbl>
          {[
            { name:"Hydration", why:"Even mild dehydration elevates cortisol and narrows your window of tolerance." },
            { name:"Sleep window", why:"Consistency is a stronger predictor of next-day regulation than total hours." },
            { name:"Movement", why:"Movement completes the stress response cycle. Walking counts. Stretching counts." },
            { name:"Nourish", why:"No calorie counting. Intentionality is the intervention, not the ingredients." },
          ].map((f,i)=>(
            <div key={i} style={{display:"flex",gap:18,alignItems:"baseline",padding:"20px 0",borderBottom:i<3?`1px solid ${B.tx}12`:"none"}}>
              <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:.9,minWidth:38}}>{`0${i+1}`}</span>
              <div>
                <p style={{fontSize:15,fontWeight:600,marginBottom:4}}>{f.name}</p>
                <p style={{fontSize:13,color:B.txm,lineHeight:1.65}}>{f.why}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Day-3 AI insight + paid CTA */}
        {dayNum >= 3 && (
          <div style={{padding:"28px 24px",background:B.accent,borderRadius:12,marginBottom:32,animation:"up .5s cubic-bezier(.22,1,.36,1) both"}}>
            <p style={{fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.55)",marginBottom:12}}>Day 3 · Your first pattern</p>
            <p style={{fontSize:15,fontWeight:500,lineHeight:1.6,color:B.wh,marginBottom:18}}>{getDay3Insight(data)}</p>
            <p style={{fontSize:13,lineHeight:1.7,color:"rgba(255,255,255,.75)",marginBottom:20}}>The <strong style={{fontWeight:600,color:B.wh}}>Rooted Reset Challenge Kit</strong> turns this into a 30-day protocol — miss-day recovery, identity prompts, and weekly AI foundation analysis.</p>
            <button style={{padding:"14px 36px",fontSize:13,fontWeight:600,fontFamily:F,color:B.accent,background:B.wh,border:"none",borderRadius:8,cursor:"pointer",letterSpacing:1,textTransform:"uppercase",transition:"transform .2s"}}
              onMouseEnter={e=>{e.target.style.transform="translateY(-1px)"}} onMouseLeave={e=>{e.target.style.transform="translateY(0)"}}>Get the full challenge</button>
          </div>
        )}

        {/* Streak */}
        <div style={{display:"flex",alignItems:"center",gap:20,margin:"8px 0 28px",padding:"28px 0",borderTop:`1px solid ${B.tx}12`,borderBottom:`1px solid ${B.tx}12`}}>
          <p style={{fontFamily:H,fontSize:"clamp(72px,24vw,108px)",fontWeight:600,color:B.accent,lineHeight:.8,letterSpacing:-3}}>{streak}</p>
          <div>
            <p style={{fontSize:13,letterSpacing:2.5,textTransform:"uppercase",fontWeight:600,color:B.tx}}>consecutive</p>
            <p style={{fontSize:13,letterSpacing:2.5,textTransform:"uppercase",fontWeight:600,color:B.txl}}>days rooted</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{textAlign:"center",paddingTop:20}}>
          <p style={{fontSize:11,color:B.txl,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>I root to rise.</p>
          <p style={{fontSize:11,color:B.txl,marginTop:8,letterSpacing:2}}>@lovelarice</p>
        </div>
      </div>
    </div>
  );
}
