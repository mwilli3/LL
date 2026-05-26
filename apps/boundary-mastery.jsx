import { useState, useEffect, useRef } from "react";

const B = { pri:"#A84A30", sec:"#D4856A", acc:"#5C5470", bg:"#FAF6F2", tx:"#3A2018", txm:"#6B5B52", txl:"#A69890", accL:"#EEEDF5", wh:"#FFFFFF", fill:"#F5E8E1", accent:"#8B3A4A", accentL:"#F5ECF0", accentD:"#6B2A38" };
const F = "'Outfit', sans-serif";
const H = "'Cormorant Garamond', serif";
const LOGO = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1100\" zoomAndPan=\"magnify\" viewBox=\"0 0 824.88 374.999991\" height=\"500\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.0\"><defs><g/></defs><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(171.424323, 194.17699)\"><g><path d=\"M 63.203125 9.125 C 60.898438 10.6875 58.613281 11.972656 56.34375 12.984375 C 54.082031 13.992188 51.5 14.5 48.59375 14.5 C 46.351562 14.5 44.269531 14.144531 42.34375 13.4375 C 40.414062 12.726562 38.539062 11.832031 36.71875 10.75 C 34.894531 9.664062 33.085938 8.5 31.296875 7.25 C 29.503906 6 27.644531 4.832031 25.71875 3.75 C 23.789062 2.664062 21.707031 1.769531 19.46875 1.0625 C 17.238281 0.351562 14.804688 0 12.171875 0 L 3.34375 0 C 4.90625 -0.332031 5.9375 -1.160156 6.4375 -2.484375 C 6.945312 -3.804688 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.625 C 7.203125 -44.96875 6.929688 -46.234375 6.390625 -47.421875 C 5.847656 -48.609375 4.832031 -49.367188 3.34375 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.367188 14.539062 -48.609375 14 -47.421875 C 13.457031 -46.234375 13.1875 -44.96875 13.1875 -43.625 L 13.1875 -0.90625 C 16.632812 -0.769531 19.976562 -0.078125 23.21875 1.171875 C 26.46875 2.421875 29.664062 3.785156 32.8125 5.265625 C 35.957031 6.753906 39.132812 8.09375 42.34375 9.28125 C 45.5625 10.46875 48.859375 11.0625 52.234375 11.0625 C 54.203125 11.0625 56.03125 10.875 57.71875 10.5 C 59.40625 10.125 61.128906 9.5 62.890625 8.625 Z M 63.203125 9.125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(191.913475, 194.17699)\"><g><path d=\"M 10.546875 -4.671875 C 10.546875 -3.378906 10.914062 -2.359375 11.65625 -1.609375 C 12.40625 -0.867188 13.351562 -0.332031 14.5 0 L 3.65625 0 C 4.875 -0.40625 6.019531 -1.148438 7.09375 -2.234375 C 8.175781 -3.316406 8.957031 -4.5 9.4375 -5.78125 L 26.671875 -50.3125 L 44.03125 -5.78125 C 44.5625 -4.5625 45.25 -3.394531 46.09375 -2.28125 C 46.945312 -1.164062 48.015625 -0.40625 49.296875 0 L 34.6875 0 C 35.570312 -0.269531 36.300781 -0.859375 36.875 -1.765625 C 37.445312 -2.679688 37.734375 -3.546875 37.734375 -4.359375 C 37.734375 -4.898438 37.492188 -5.847656 37.015625 -7.203125 C 36.546875 -8.554688 36.003906 -10.007812 35.390625 -11.5625 C 34.785156 -13.113281 34.195312 -14.597656 33.625 -16.015625 C 33.050781 -17.441406 32.628906 -18.492188 32.359375 -19.171875 L 15.625 -19.171875 C 15.351562 -18.492188 14.945312 -17.492188 14.40625 -16.171875 C 13.863281 -14.859375 13.304688 -13.472656 12.734375 -12.015625 C 12.160156 -10.566406 11.648438 -9.164062 11.203125 -7.8125 C 10.765625 -6.457031 10.546875 -5.410156 10.546875 -4.671875 Z M 15.828125 -19.984375 L 31.953125 -19.984375 L 23.9375 -40.875 Z M 15.828125 -19.984375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(236.847953, 194.17699)\"><g><path d=\"M 13.390625 -6.296875 C 13.390625 -4.941406 13.660156 -3.671875 14.203125 -2.484375 C 14.742188 -1.296875 15.691406 -0.46875 17.046875 0 L 3.65625 0 C 5.070312 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.070312 -49.296875 3.65625 -49.703125 L 20.890625 -49.703125 C 23.328125 -49.703125 25.710938 -49.429688 28.046875 -48.890625 C 30.378906 -48.347656 32.457031 -47.484375 34.28125 -46.296875 C 36.113281 -45.117188 37.585938 -43.566406 38.703125 -41.640625 C 39.816406 -39.710938 40.375 -37.363281 40.375 -34.59375 C 40.375 -30.601562 39.171875 -27.351562 36.765625 -24.84375 C 34.367188 -22.34375 31.3125 -20.65625 27.59375 -19.78125 L 36.828125 -4.875 C 37.566406 -3.789062 38.441406 -2.804688 39.453125 -1.921875 C 40.472656 -1.046875 41.554688 -0.40625 42.703125 0 L 33.265625 0 L 21.203125 -19.578125 L 13.390625 -19.578125 Z M 13.390625 -20.28125 L 20.28125 -20.28125 C 24.539062 -20.28125 27.90625 -21.597656 30.375 -24.234375 C 32.84375 -26.878906 34.078125 -30.332031 34.078125 -34.59375 C 34.078125 -39.050781 32.894531 -42.546875 30.53125 -45.078125 C 28.164062 -47.617188 24.75 -48.890625 20.28125 -48.890625 L 13.390625 -48.890625 Z M 13.390625 -20.28125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(278.739776, 194.17699)\"><g><path d=\"M 13.390625 -6.484375 C 13.390625 -5.140625 13.625 -3.835938 14.09375 -2.578125 C 14.570312 -1.328125 15.519531 -0.46875 16.9375 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.3125 6.484375 -2.53125 C 6.960938 -3.75 7.203125 -5.066406 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.117188 6.484375 -47.265625 C 6.015625 -48.421875 5.035156 -49.234375 3.546875 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.234375 14.570312 -48.421875 14.09375 -47.265625 C 13.625 -46.117188 13.390625 -44.867188 13.390625 -43.515625 Z M 13.390625 -6.484375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(294.765822, 194.17699)\"><g><path d=\"M 47.375 -7.203125 C 46.21875 -6.191406 44.894531 -5.242188 43.40625 -4.359375 C 41.925781 -3.484375 40.375 -2.707031 38.75 -2.03125 C 37.125 -1.351562 35.484375 -0.8125 33.828125 -0.40625 C 32.171875 0 30.566406 0.203125 29.015625 0.203125 C 25.492188 0.203125 22.175781 -0.4375 19.0625 -1.71875 C 15.957031 -3.007812 13.253906 -4.769531 10.953125 -7 C 8.648438 -9.226562 6.835938 -11.863281 5.515625 -14.90625 C 4.203125 -17.945312 3.546875 -21.265625 3.546875 -24.859375 C 3.546875 -28.441406 4.203125 -31.753906 5.515625 -34.796875 C 6.835938 -37.835938 8.648438 -40.472656 10.953125 -42.703125 C 13.253906 -44.929688 15.957031 -46.6875 19.0625 -47.96875 C 22.175781 -49.257812 25.492188 -49.90625 29.015625 -49.90625 C 31.785156 -49.90625 34.65625 -49.550781 37.625 -48.84375 C 40.601562 -48.132812 43.175781 -46.898438 45.34375 -45.140625 L 45.34375 -37.03125 C 44.332031 -38.445312 43.164062 -39.863281 41.84375 -41.28125 C 40.519531 -42.707031 39.097656 -43.992188 37.578125 -45.140625 C 36.054688 -46.285156 34.414062 -47.210938 32.65625 -47.921875 C 30.90625 -48.640625 29.113281 -49 27.28125 -49 C 24.375 -49 21.875 -48.300781 19.78125 -46.90625 C 17.6875 -45.519531 15.945312 -43.757812 14.5625 -41.625 C 13.175781 -39.5 12.160156 -37.117188 11.515625 -34.484375 C 10.867188 -31.847656 10.546875 -29.28125 10.546875 -26.78125 C 10.546875 -24.007812 10.914062 -21.082031 11.65625 -18 C 12.40625 -14.925781 13.554688 -12.117188 15.109375 -9.578125 C 16.671875 -7.046875 18.648438 -4.953125 21.046875 -3.296875 C 23.453125 -1.640625 26.3125 -0.8125 29.625 -0.8125 C 31.507812 -0.8125 33.28125 -1.164062 34.9375 -1.875 C 36.601562 -2.582031 38.128906 -3.507812 39.515625 -4.65625 C 40.898438 -5.8125 42.148438 -7.132812 43.265625 -8.625 C 44.378906 -10.113281 45.34375 -11.632812 46.15625 -13.1875 Z M 47.375 -7.203125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(341.323625, 194.17699)\"><g><path d=\"M 23.03125 -0.8125 C 26.207031 -0.8125 29.316406 -1.554688 32.359375 -3.046875 C 35.398438 -4.535156 37.695312 -6.734375 39.25 -9.640625 L 36.921875 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.035156 -49.296875 3.546875 -49.703125 L 36.21875 -49.703125 L 38.234375 -40.171875 C 36.679688 -43.140625 34.601562 -45.332031 32 -46.75 C 29.394531 -48.175781 26.4375 -48.890625 23.125 -48.890625 L 13.390625 -48.890625 L 13.390625 -25.65625 L 19.671875 -25.65625 C 21.503906 -25.65625 23.195312 -26.046875 24.75 -26.828125 C 26.300781 -27.609375 27.347656 -28.976562 27.890625 -30.9375 L 27.890625 -19.78125 C 27.347656 -21.738281 26.300781 -23.070312 24.75 -23.78125 C 23.195312 -24.5 21.503906 -24.859375 19.671875 -24.859375 L 13.390625 -24.859375 L 13.390625 -0.8125 Z M 23.03125 -0.8125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(453.619704, 160.779442)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(471.019481, 160.779442)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(487.100496, 160.779442)\"><g><path d=\"M 8.765625 -7.953125 L 13.921875 -7.953125 L 13.921875 -0.578125 C 13.117188 -0.316406 12.300781 -0.125 11.46875 0 C 10.644531 0.132812 9.6875 0.203125 8.59375 0.203125 C 6.289062 0.203125 4.5 -0.476562 3.21875 -1.84375 C 1.9375 -3.207031 1.296875 -5.125 1.296875 -7.59375 C 1.296875 -9.164062 1.613281 -10.546875 2.25 -11.734375 C 2.882812 -12.921875 3.796875 -13.828125 4.984375 -14.453125 C 6.171875 -15.085938 7.566406 -15.40625 9.171875 -15.40625 C 10.785156 -15.40625 12.296875 -15.101562 13.703125 -14.5 L 13.015625 -12.953125 C 11.640625 -13.535156 10.316406 -13.828125 9.046875 -13.828125 C 7.203125 -13.828125 5.757812 -13.273438 4.71875 -12.171875 C 3.6875 -11.066406 3.171875 -9.539062 3.171875 -7.59375 C 3.171875 -5.539062 3.671875 -3.984375 4.671875 -2.921875 C 5.671875 -1.867188 7.140625 -1.34375 9.078125 -1.34375 C 10.128906 -1.34375 11.15625 -1.460938 12.15625 -1.703125 L 12.15625 -6.375 L 8.765625 -6.375 Z M 8.765625 -7.953125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(506.83668, 160.779442)\"><g><path d=\"M 13.546875 -15.1875 L 13.546875 -5.359375 C 13.546875 -3.628906 13.023438 -2.269531 11.984375 -1.28125 C 10.941406 -0.289062 9.503906 0.203125 7.671875 0.203125 C 5.847656 0.203125 4.4375 -0.289062 3.4375 -1.28125 C 2.4375 -2.28125 1.9375 -3.65625 1.9375 -5.40625 L 1.9375 -15.1875 L 3.703125 -15.1875 L 3.703125 -5.28125 C 3.703125 -4.007812 4.046875 -3.035156 4.734375 -2.359375 C 5.421875 -1.679688 6.4375 -1.34375 7.78125 -1.34375 C 9.0625 -1.34375 10.046875 -1.679688 10.734375 -2.359375 C 11.429688 -3.046875 11.78125 -4.023438 11.78125 -5.296875 L 11.78125 -15.1875 Z M 13.546875 -15.1875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(526.572864, 160.779442)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 -1.59375 L 10.546875 -1.59375 L 10.546875 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(541.864695, 160.779442)\"><g><path d=\"M 11.625 0 L 9.734375 -4.828125 L 3.65625 -4.828125 L 1.78125 0 L 0 0 L 6 -15.25 L 7.484375 -15.25 L 13.453125 0 Z M 9.1875 -6.421875 L 7.421875 -11.125 C 7.191406 -11.71875 6.957031 -12.445312 6.71875 -13.3125 C 6.5625 -12.644531 6.34375 -11.914062 6.0625 -11.125 L 4.28125 -6.421875 Z M 9.1875 -6.421875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(559.575992, 160.779442)\"><g><path d=\"M 6.765625 0 L 5 0 L 5 -13.609375 L 0.1875 -13.609375 L 0.1875 -15.1875 L 11.5625 -15.1875 L 11.5625 -13.609375 L 6.765625 -13.609375 Z M 6.765625 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(575.594703, 160.779442)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(591.675718, 160.779442)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(416.382935, 190.025186)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(433.782713, 190.025186)\"><g><path d=\"M 15.265625 -7.609375 C 15.265625 -5.179688 14.648438 -3.269531 13.421875 -1.875 C 12.191406 -0.488281 10.484375 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.476562 3.109375 -1.84375 C 1.898438 -3.207031 1.296875 -5.132812 1.296875 -7.625 C 1.296875 -10.101562 1.90625 -12.019531 3.125 -13.375 C 4.34375 -14.738281 6.070312 -15.421875 8.3125 -15.421875 C 10.5 -15.421875 12.203125 -14.726562 13.421875 -13.34375 C 14.648438 -11.957031 15.265625 -10.046875 15.265625 -7.609375 Z M 3.171875 -7.609375 C 3.171875 -5.554688 3.609375 -4 4.484375 -2.9375 C 5.359375 -1.875 6.628906 -1.34375 8.296875 -1.34375 C 9.972656 -1.34375 11.238281 -1.867188 12.09375 -2.921875 C 12.957031 -3.984375 13.390625 -5.546875 13.390625 -7.609375 C 13.390625 -9.648438 12.960938 -11.195312 12.109375 -12.25 C 11.253906 -13.3125 9.988281 -13.84375 8.3125 -13.84375 C 6.632812 -13.84375 5.359375 -13.3125 4.484375 -12.25 C 3.609375 -11.1875 3.171875 -9.640625 3.171875 -7.609375 Z M 3.171875 -7.609375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(454.598832, 190.025186)\"><g><path d=\"M 15.265625 -7.609375 C 15.265625 -5.179688 14.648438 -3.269531 13.421875 -1.875 C 12.191406 -0.488281 10.484375 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.476562 3.109375 -1.84375 C 1.898438 -3.207031 1.296875 -5.132812 1.296875 -7.625 C 1.296875 -10.101562 1.90625 -12.019531 3.125 -13.375 C 4.34375 -14.738281 6.070312 -15.421875 8.3125 -15.421875 C 10.5 -15.421875 12.203125 -14.726562 13.421875 -13.34375 C 14.648438 -11.957031 15.265625 -10.046875 15.265625 -7.609375 Z M 3.171875 -7.609375 C 3.171875 -5.554688 3.609375 -4 4.484375 -2.9375 C 5.359375 -1.875 6.628906 -1.34375 8.296875 -1.34375 C 9.972656 -1.34375 11.238281 -1.867188 12.09375 -2.921875 C 12.957031 -3.984375 13.390625 -5.546875 13.390625 -7.609375 C 13.390625 -9.648438 12.960938 -11.195312 12.109375 -12.25 C 11.253906 -13.3125 9.988281 -13.84375 8.3125 -13.84375 C 6.632812 -13.84375 5.359375 -13.3125 4.484375 -12.25 C 3.609375 -11.1875 3.171875 -9.640625 3.171875 -7.609375 Z M 3.171875 -7.609375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(475.414952, 190.025186)\"><g><path d=\"M 6.765625 0 L 5 0 L 5 -13.609375 L 0.1875 -13.609375 L 0.1875 -15.1875 L 11.5625 -15.1875 L 11.5625 -13.609375 L 6.765625 -13.609375 Z M 6.765625 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(491.433663, 190.025186)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(501.34658, 190.025186)\"><g/></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(511.1245, 190.025186)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(528.524277, 190.025186)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(544.605292, 190.025186)\"><g><path d=\"M 8.59375 -13.828125 C 6.914062 -13.828125 5.59375 -13.269531 4.625 -12.15625 C 3.664062 -11.039062 3.1875 -9.519531 3.1875 -7.59375 C 3.1875 -5.601562 3.648438 -4.066406 4.578125 -2.984375 C 5.515625 -1.898438 6.84375 -1.359375 8.5625 -1.359375 C 9.625 -1.359375 10.832031 -1.550781 12.1875 -1.9375 L 12.1875 -0.390625 C 11.132812 0.00390625 9.835938 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.472656 3.109375 -1.828125 C 1.898438 -3.179688 1.296875 -5.109375 1.296875 -7.609375 C 1.296875 -9.171875 1.585938 -10.539062 2.171875 -11.71875 C 2.753906 -12.894531 3.597656 -13.800781 4.703125 -14.4375 C 5.804688 -15.082031 7.109375 -15.40625 8.609375 -15.40625 C 10.203125 -15.40625 11.59375 -15.113281 12.78125 -14.53125 L 12.03125 -13.015625 C 10.882812 -13.554688 9.738281 -13.828125 8.59375 -13.828125 Z M 8.59375 -13.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(562.275053, 190.025186)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 -1.59375 L 10.546875 -1.59375 L 10.546875 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(577.566884, 190.025186)\"><g><path d=\"M 11.625 0 L 9.734375 -4.828125 L 3.65625 -4.828125 L 1.78125 0 L 0 0 L 6 -15.25 L 7.484375 -15.25 L 13.453125 0 Z M 9.1875 -6.421875 L 7.421875 -11.125 C 7.191406 -11.71875 6.957031 -12.445312 6.71875 -13.3125 C 6.5625 -12.644531 6.34375 -11.914062 6.0625 -11.125 L 4.28125 -6.421875 Z M 9.1875 -6.421875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(595.278182, 190.025186)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(605.461083, 190.025186)\"><g><path d=\"M 8.8125 0 L 3.65625 -13.453125 L 3.578125 -13.453125 C 3.671875 -12.390625 3.71875 -11.125 3.71875 -9.65625 L 3.71875 0 L 2.09375 0 L 2.09375 -15.1875 L 4.75 -15.1875 L 9.546875 -2.65625 L 9.640625 -2.65625 L 14.484375 -15.1875 L 17.125 -15.1875 L 17.125 0 L 15.359375 0 L 15.359375 -9.78125 C 15.359375 -10.90625 15.40625 -12.125 15.5 -13.4375 L 15.421875 -13.4375 L 10.234375 0 Z M 8.8125 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(628.914752, 190.025186)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g></svg>";
const Logo = () => <div style={{width:500,maxWidth:"100%",margin:"0 auto",overflow:"hidden"}} dangerouslySetInnerHTML={{__html:LOGO.replace(/width="1100"/,'width="100%"').replace(/height="500"/,'').replace(/viewBox="0 0 824.88 374.999991"/,'viewBox="0 110 824.88 110"')}} />;

const SK = "larice_boundary_mastery";
const load = () => { try { return JSON.parse(localStorage.getItem(SK)) || {entries:{},energy:{},reflections:{}}; } catch { return {entries:{},energy:{},reflections:{}}; } };
const save = (d) => localStorage.setItem(SK, JSON.stringify(d));
const td = () => new Date().toISOString().slice(0,10);
const fmtD = (d) => new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});

const EVENING_QS = [
  { key:"no", q:"What did I say no to today?", ph:"A request, obligation, or expectation you released...", starters:["I declined…","I said no to…","I let go of the expectation that…"] },
  { key:"protect", q:"What did I protect?", ph:"Your time, energy, peace, a commitment to yourself...", starters:["I protected my…","I kept space for…","I held a boundary around…"] },
  { key:"claim", q:"What will I claim for myself tomorrow?", ph:"One thing you will choose, protect, or prioritize...", starters:["Tomorrow I will…","I'm choosing…","I will prioritize…"] },
];

const WEEKS = [
  { num:1, name:"Notice", desc:"This week, simply notice. Where do you give energy you don't have? Where do you say yes when your body says no? Don't change anything yet. Just observe.", prompt:"What patterns did you notice about where your energy goes?" },
  { num:2, name:"Small no's", desc:"Begin with the easy ones. The optional meeting. The favor that costs you more than it costs them. The scroll session that steals your evening. Practice the small no.", prompt:"What small no felt the biggest? What happened when you said it?" },
  { num:3, name:"Hard conversations", desc:"This is the week you name it out loud. The boundary you've been avoiding with a specific person. You don't need to be perfect. You need to be honest.", prompt:"What conversation did you have? What did it cost you? What did it give you?" },
  { num:4, name:"Identity shift", desc:"You are no longer becoming someone who holds boundaries. You are someone who holds boundaries. This week, act from that identity before the feeling catches up.", prompt:"Complete: I am a woman who _____ and I no longer _____." },
];

const SCRIPTS = [
  { cat:"Work", scripts:["I'm not available for that timeline. Here's what I can do.", "I need to decline this meeting. I'll review the notes.", "I've reached my capacity this week. Let's revisit Monday.", "That's outside my scope. Have you tried [redirect]?"] },
  { cat:"Family", scripts:["I love you and I need some time to myself tonight.", "I'm not going to be able to help with that this weekend.", "I hear you, and I'm not the right person to solve this.", "I need you to respect this boundary even if you don't understand it."] },
  { cat:"Partner", scripts:["I need 30 minutes alone before we talk about this.", "I can't be your only support system for this. Can we find someone else to help?", "When you [behavior], I feel [feeling]. I need [need].", "I'm choosing to protect my peace right now. I'll come back to this."] },
  { cat:"Friends", scripts:["I can't make it, but I hope you have a great time.", "I don't have the bandwidth to hold this for you right now.", "I need to say no to this even though I know you'd love for me to say yes.", "I'm protecting my energy this week. Rain check?"] },
];

const RESEARCH = [
  { title:"Why no feels dangerous", body:"The nervous system encodes social rejection as physical threat. For women especially, the fawn response, a trauma-informed people-pleasing pattern, can make boundary-setting feel like a survival risk rather than a choice. This is neurological, not a character flaw." },
  { title:"Depletion and the HPA axis", body:"Chronic overextension keeps the hypothalamic-pituitary-adrenal axis in sustained activation. The same cortisol cascade that powers the Regulator's reactivity drives the Reclaimer's depletion. The systems overlap. The intervention is the same: signal safety through practiced boundaries." },
  { title:"Boundaries as vagal toning", body:"Holding a boundary is a form of nervous system exercise. It requires tolerating the discomfort of another's reaction while maintaining your own regulated state. Each successful boundary expands the window of tolerance for the next one." },
];

function getStreak(data) {
  const allDays = Object.keys(data.entries||{}).filter(d=>{const v=data.entries[d];return v&&(v.no||v.protect||v.claim);}).sort().reverse();
  if(!allDays.length) return 0;
  let streak=0,check=new Date();
  for(let i=0;i<60;i++){const ds=check.toISOString().slice(0,10);if(allDays.includes(ds)){streak++;check.setDate(check.getDate()-1);}else if(i===0){check.setDate(check.getDate()-1);}else break;}
  return streak;
}
function hasCheckedToday(d){const e=d.entries?.[td()];return e&&(e.no||e.protect||e.claim);}
function getDayNum(d){if(!d.startDate)return 0;return Math.min(Math.floor((new Date(td()+"T12:00:00")-new Date(d.startDate+"T12:00:00"))/86400000)+1,30);}
function getWeek(dn){return Math.min(Math.ceil(dn/7),4);}


const RECS = {
  chronic_depletion: { product:"Nervous System Bundle", desc:"Your boundary and energy data shows a depletion pattern — giving consistently more than you receive. The Nervous System Bundle pairs Magnesium (parasympathetic support) with Ashwagandha (HPA axis modulation) to address the physiological cost of chronic overextension.", price:"$44.99", url:"https://bdyalign.com/products/nervous-system-bundle" },
  fawn_activation: { product:"Ashwagandha", desc:"Your journal patterns suggest the fawn response is still activating regularly. Ashwagandha is classified as an adaptogen — research suggests it may help modulate the cortisol spikes that fire when your nervous system interprets boundary-setting as a threat.", price:"$24.99", url:"https://bdyalign.com/products/ashwagandha" },
  energy_imbalance: { product:"Nervous System Bundle", desc:"Your energy audit shows a sustained imbalance between what you give and what you receive. This pattern shares the same HPA axis cascade as the Regulator’s chronic activation. The Nervous System Bundle addresses both the depletion and the recovery.", price:"$44.99", url:"https://bdyalign.com/products/nervous-system-bundle" },
  nervous_system_fatigue: { product:"Pure Magnesium Power", desc:"Your data suggests nervous system fatigue from sustained boundary work. Magnesium is involved in the parasympathetic processes that support recovery after high-demand interactions. It may help your nervous system process the cost of holding boundaries.", price:"$29.99", url:"https://bdyalign.com/products/pure-magnesium-power" },
};

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
  const [tab, setTab] = useState("journal");
  const [aiResult, setAiResult] = useState("");
  const [aiRec, setAiRec] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [scriptCat, setScriptCat] = useState(null);
  const [verified, setVerified] = useState(() => { try { return !!localStorage.getItem("larice_boundary_mastery_email"); } catch { return false; } });
  const [gateEmail, setGateEmail] = useState("");
  const [gateErr, setGateErr] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{save(data);},[data]);
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth",block:"start"});},[view,tab,scriptCat]);
  const streak = getStreak(data);
  const checked = hasCheckedToday(data);
  const dayNum = getDayNum(data);
  const week = getWeek(dayNum);
  const todayEntry = data.entries?.[td()] || {no:"",protect:"",claim:""};
  const answeredCount = EVENING_QS.filter(q=>todayEntry[q.key]&&todayEntry[q.key].trim()).length;
  const todayEnergy = data.energy?.[td()] || {gave:0,received:0};

  const updateEntry = (key,val) => {const d={...data};if(!d.startDate)d.startDate=td();d.entries={...d.entries,[td()]:{...todayEntry,[key]:val}};setData(d);};
  const updateEnergy = (key,val) => {setData({...data,energy:{...data.energy,[td()]:{...todayEnergy,[key]:parseInt(val)||0}}});};
  const setReflection = (wk,text) => {setData({...data,reflections:{...data.reflections,[wk]:text}});};

  const analyzePatterns = async () => {
    setAiLoading(true); setAiResult("");
    const entriesData = Object.entries(data.entries||{}).filter(([_,v])=>v.no||v.protect||v.claim).map(([d,v])=>({date:d,saidNo:v.no||"",protected:v.protect||"",claiming:v.claim||""})).slice(-30);
    const energyData = Object.entries(data.energy||{}).filter(([_,v])=>v.gave||v.received).map(([d,v])=>({date:d,gave:v.gave,received:v.received})).slice(-30);
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{role:"user",content:`You are a boundary and reclamation coach for the Larice Wellness brand, specifically for The Power Reclaimer archetype. Analyze this woman's boundary journal and energy audit data. Be warm, specific, and reference her actual entries. No generic advice.

BOUNDARY JOURNAL ENTRIES (last 30 days): ${JSON.stringify(entriesData)}
ENERGY AUDIT DATA (gave vs received, 1-10): ${JSON.stringify(energyData)}
CURRENT STREAK: ${streak} days
CURRENT DAY: ${dayNum} of 30, Week ${getWeek(dayNum)}

Provide:
1. The boundary theme emerging from her journal (what kinds of boundaries she's practicing most)
2. Her energy pattern (is she giving more than receiving? Is the gap closing?)
3. Her growth edge — what the journal reveals about where she's ready to push further
4. An identity-affirming closing that reflects her actual boundary-setting evidence back to her

Keep it under 200 words. Warm but direct. No bullet points \u2014 flowing paragraphs.\n\nFinally, on a NEW line at the very end, write exactly one of these tags based on the PRIMARY pattern you identified (parsed programmatically, write ONLY the tag):\n[CHRONIC_DEPLETION] [FAWN_ACTIVATION] [ENERGY_IMBALANCE] [NERVOUS_SYSTEM_FATIGUE]`}]
        })
      });
      const d = await res.json();
      let text = d.content?.map(c=>c.text||"").join("") || "Unable to analyze at this time.";
      const tagMatch = text.match(/\[(CHRONIC_DEPLETION|FAWN_ACTIVATION|ENERGY_IMBALANCE|NERVOUS_SYSTEM_FATIGUE)\]/);
      if (tagMatch) { text = text.replace(/\n?\[.*\]\s*$/, '').trim(); setAiRec(RECS[tagMatch[1].toLowerCase()]); }
      else { setAiRec(RECS.chronic_depletion); }
      setAiResult(text);
    } catch(e) { setAiResult("Unable to connect. Please try again."); }
    setAiLoading(false);
  };

  const pastEntries = Object.entries(data.entries||{}).filter(([d,v])=>d!==td()&&(v.no||v.protect||v.claim)).sort((a,b)=>b[0].localeCompare(a[0]));
  const energyEntries = Object.entries(data.energy||{}).filter(([_,v])=>v.gave||v.received).sort((a,b)=>a[0].localeCompare(b[0])).slice(-14);

  const verifyPurchase = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gateEmail.trim())) { setGateErr("Please enter a valid email address."); return; }
    setGateLoading(true); setGateErr("");
    try {
      const res = await fetch("/.netlify/functions/verify-purchase", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gateEmail.trim(), product: "Boundary Mastery Kit" })
      });
      const d = await res.json();
      if (d.verified) { setVerified(true); localStorage.setItem("larice_boundary_mastery_email", gateEmail.trim()); }
      else { setGateErr("No purchase found for this email. Please use the email you purchased with."); }
    } catch {
      setVerified(true); localStorage.setItem("larice_boundary_mastery_email", gateEmail.trim());
    }
    setGateLoading(false);
  };

  const css = {fontFamily:F,background:B.bg,minHeight:"100vh",color:B.tx,WebkitFontSmoothing:"antialiased"};
  const wrap = {maxWidth:500,margin:"0 auto",padding:"0 24px"};
  const Lbl = ({children})=><div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:18}}><span style={{height:1,width:26,background:B.accent,opacity:.45,transform:"translateY(-5px)"}} /><span style={{fontFamily:H,fontSize:20,fontWeight:600,fontStyle:"italic",color:B.accent,letterSpacing:.2}}>{children}</span></div>;




  if (!verified) return (
    <div style={css}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} input::placeholder{color:${B.txl}}`}</style>
      <div ref={ref} style={{...wrap,paddingTop:60,paddingBottom:56}}>
        <div style={{textAlign:"center",marginBottom:40,animation:"up .6s cubic-bezier(.22,1,.36,1) both"}}><Logo /></div>
        <div style={{textAlign:"center",marginBottom:36,animation:"up .6s cubic-bezier(.22,1,.36,1) .1s both"}}>
          <h1 style={{fontFamily:H,fontSize:"clamp(34px,9vw,46px)",fontWeight:600,lineHeight:1,letterSpacing:-.5,marginBottom:14}}>Boundary<br/><span style={{fontStyle:"italic",color:B.accent}}>Mastery Kit</span></h1>
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


  if (view==="scripts" && scriptCat) {
    const s = SCRIPTS.find(x=>x.cat===scriptCat);
    return (
      <div style={css}>
        <style>{`@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div ref={ref} style={{...wrap,paddingTop:28,paddingBottom:48}}>
          <button onClick={()=>{setView("home");setScriptCat(null);}} style={{fontSize:12,fontFamily:F,fontWeight:500,color:B.txl,background:"none",border:"none",cursor:"pointer",padding:"8px 0",marginBottom:24,borderBottom:`1.5px solid ${B.txl}30`}}>Back</button>
          <h2 style={{fontSize:22,fontWeight:600,fontFamily:H,marginBottom:8,animation:"up .4s cubic-bezier(.22,1,.36,1) both",}}>{s.cat} scripts</h2>
          <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginBottom:24}}>Copy, adapt, and use. These are starting points, not scripts to memorize.</p>
          {s.scripts.map((sc,i)=>(
            <div key={i} style={{padding:"18px 20px",borderRadius:10,background:B.wh,border:`1px solid ${B.accent}12`,marginBottom:10,borderLeft:`4px solid ${B.accent}`,animation:`up .3s ease ${i*.08}s both`}}>
              <p style={{fontSize:14,lineHeight:1.7}}>{sc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={css}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
      <div ref={ref} style={{...wrap,paddingTop:40,paddingBottom:56}}>
        <div style={{textAlign:"center",marginBottom:28,animation:"up .5s cubic-bezier(.22,1,.36,1) both"}}><Logo /></div>

        <div style={{textAlign:"center",marginBottom:28}}>
          {dayNum>0 && (
            <div style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"baseline",gap:8}}>
                <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:1}}>Day {dayNum}</span>
                <span style={{fontFamily:F,fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:B.txl}}>of thirty</span>
              </div>
              <p style={{fontSize:11,color:B.txl,letterSpacing:1.5,textTransform:"uppercase",fontWeight:600,marginTop:8}}>Week {week} · {WEEKS[Math.min(week,4)-1]?.name}</p>
            </div>
          )}
          <h1 style={{fontFamily:H,fontSize:"clamp(38px,11vw,52px)",fontWeight:600,lineHeight:.98,letterSpacing:-1,marginBottom:16}}>
            Boundary<br/><span style={{fontStyle:"italic",color:B.accent}}>Mastery Kit</span>
          </h1>
          <p style={{fontSize:15,color:B.txm,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>30 days of boundary building. From noticing to naming to holding. With scripts, tracking, and the science of why saying no rewires your nervous system.</p>
        </div>

        {/* Streak reward */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:28,padding:"16px 0",borderTop:`1px solid ${B.tx}12`,borderBottom:`1px solid ${B.tx}12`}}>
          <span style={{fontFamily:H,fontSize:46,fontWeight:600,color:B.accent,lineHeight:.85}}>{streak}</span>
          <span style={{fontSize:12,letterSpacing:2,textTransform:"uppercase",fontWeight:600,color:B.txl,maxWidth:120,lineHeight:1.5}}>consecutive nights held</span>
        </div>

        <div style={{display:"flex",gap:6,marginBottom:28}}>
          {[{k:"journal",l:"Journal"},{k:"program",l:"Program"},{k:"tools",l:"Tools"}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",fontSize:12,fontWeight:600,fontFamily:F,letterSpacing:1,textTransform:"uppercase",color:tab===t.k?B.wh:B.accent,background:tab===t.k?B.accent:"transparent",border:`1.5px solid ${B.accent}`,borderRadius:6,cursor:"pointer",transition:"all .2s"}}>{t.l}</button>
          ))}
        </div>

        {tab==="journal" && <>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:12,marginBottom:18}}>
            <div style={{display:"flex",alignItems:"baseline",gap:12}}>
              <span style={{height:1,width:26,background:B.accent,opacity:.45,transform:"translateY(-5px)"}} />
              <span style={{fontFamily:H,fontSize:20,fontWeight:600,fontStyle:"italic",color:B.accent,letterSpacing:.2}}>Tonight's boundary check</span>
            </div>
            <span style={{fontFamily:F,fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:answeredCount>0?B.accent:B.txl}}>{answeredCount>0?(answeredCount===3?"Complete ✓":`${answeredCount} of 3`):"Optional"}</span>
          </div>
          {EVENING_QS.map((q,i)=>(
            <div key={i} style={{marginBottom:20}}>
              <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:10}}>
                <span style={{fontFamily:H,fontSize:24,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:.9}}>{`0${i+1}`}</span>
                <p style={{fontSize:15,fontWeight:600,lineHeight:1.4}}>{q.q}</p>
              </div>
              <textarea value={todayEntry[q.key]||""} onChange={e=>updateEntry(q.key,e.target.value)} placeholder={q.ph}
                style={{width:"100%",minHeight:70,padding:14,fontSize:14,fontFamily:F,border:`1px solid ${B.accent}15`,borderRadius:10,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7}}
                onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"15"} />
              {!(todayEntry[q.key]||"").trim() && (
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:10}}>
                  <span style={{fontSize:11,color:B.txl,fontWeight:500,alignSelf:"center",marginRight:2}}>Start with</span>
                  {q.starters.map((s,j)=>(
                    <button key={j} onClick={()=>updateEntry(q.key, s.replace(/…$/,"")+" ")}
                      style={{fontSize:12,fontFamily:F,fontWeight:500,color:B.accent,background:"none",border:`1px solid ${B.accent}40`,borderRadius:6,padding:"6px 12px",cursor:"pointer",transition:"all .2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background=B.accentL;e.currentTarget.style.borderColor=B.accent;}}
                      onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor=B.accent+"40";}}>{s}</button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{marginTop:8,marginBottom:28}}>
            <Lbl>Energy audit — today</Lbl>
            <div style={{display:"flex",gap:12}}>
              <div style={{flex:1}}>
                <label style={{fontSize:11,fontWeight:600,color:B.txm,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Energy given</label>
                <div style={{display:"flex",gap:3}}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                    <button key={n} onClick={()=>updateEnergy("gave",n)} style={{flex:1,padding:"8px 0",fontSize:11,fontWeight:todayEnergy.gave===n?700:500,fontFamily:F,color:todayEnergy.gave===n?B.wh:B.accent,background:todayEnergy.gave===n?B.accent:B.wh,border:`1px solid ${todayEnergy.gave>=n?B.accent:B.accent+"30"}`,borderRadius:4,cursor:"pointer",transition:"all .15s"}}>{n}</button>
                  ))}
                </div>
              </div>
              <div style={{flex:1}}>
                <label style={{fontSize:11,fontWeight:600,color:B.txm,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Energy received</label>
                <div style={{display:"flex",gap:3}}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                    <button key={n} onClick={()=>updateEnergy("received",n)} style={{flex:1,padding:"8px 0",fontSize:11,fontWeight:todayEnergy.received===n?700:500,fontFamily:F,color:todayEnergy.received===n?B.wh:B.accent,background:todayEnergy.received===n?B.accent:B.wh,border:`1px solid ${todayEnergy.received>=n?B.accent:B.accent+"30"}`,borderRadius:4,cursor:"pointer",transition:"all .15s"}}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {pastEntries.length>0 && <>
            <Lbl>Past entries</Lbl>
            {pastEntries.slice(0,5).map(([date,entry],i)=>(
              <div key={i} style={{padding:"14px 18px",marginBottom:6,background:B.wh,border:`1px solid ${B.accent}10`,borderRadius:10}}>
                <p style={{fontSize:13,fontWeight:600,marginBottom:4}}>{fmtD(date)}</p>
                <p style={{fontSize:12,color:B.txm,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{(entry.no||entry.protect||entry.claim||"").slice(0,80)}</p>
              </div>
            ))}
          </>}
        </>}

        {tab==="program" && <>
          <Lbl>30-day boundary building program</Lbl>
          {WEEKS.map((wk,i)=>{
            const isActive = dayNum >= ((wk.num-1)*7+1);
            const isCurrent = week === wk.num;
            return (
              <div key={i} style={{display:"flex",alignItems:"baseline",gap:18,padding:"20px 0",borderBottom:i<WEEKS.length-1?`1px solid ${B.tx}12`:"none",opacity:isActive?1:.4}}>
                <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:.9,minWidth:38}}>{`0${wk.num}`}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:10,marginBottom:4}}>
                    <p style={{fontSize:16,fontWeight:600,fontFamily:H,color:isCurrent?B.accent:B.tx}}>Week {wk.num}: {wk.name}</p>
                    {isCurrent && <span style={{fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:B.accent,whiteSpace:"nowrap"}}>Current</span>}
                  </div>
                  <p style={{fontSize:13,lineHeight:1.7,color:B.txm,marginBottom:isActive?14:0}}>{wk.desc}</p>
                  {isActive && <>
                    <p style={{fontSize:12,fontWeight:600,color:B.accent,marginBottom:8,fontStyle:"italic"}}>{wk.prompt}</p>
                    <textarea value={data.reflections?.[wk.num]||""} onChange={e=>setReflection(wk.num,e.target.value)} placeholder="Write here..."
                      style={{width:"100%",minHeight:70,padding:12,fontSize:13,fontFamily:F,border:`1px solid ${B.accent}20`,borderRadius:8,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.65}}
                      onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"20"} />
                  </>}
                </div>
              </div>
            );
          })}
        </>}

        {tab==="tools" && <>
          <div style={{marginBottom:28}}>
            <Lbl>Read my patterns</Lbl>
            <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginBottom:16}}>Your journal entries and energy data are analyzed to reveal your boundary themes, depletion triggers, and growth edge.</p>
            <button onClick={analyzePatterns} disabled={aiLoading} style={{width:"100%",padding:"16px",fontSize:14,fontWeight:600,fontFamily:F,color:B.wh,background:aiLoading?B.txl:B.accent,border:"none",borderRadius:8,cursor:aiLoading?"default":"pointer",letterSpacing:.5,transition:"all .2s"}}
              onMouseEnter={e=>{if(!aiLoading)e.target.style.background=B.accentD}} onMouseLeave={e=>{if(!aiLoading)e.target.style.background=aiLoading?B.txl:B.accent}}>
              {aiLoading ? "Reading your patterns..." : "Read my patterns"}
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

          <Lbl>Boundary scripts</Lbl>
          <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginBottom:16}}>Pre-written language for the moments when you know what you need to say but can't find the words.</p>
          {SCRIPTS.map((s,i)=>(
            <button key={i} onClick={()=>{setScriptCat(s.cat);setView("scripts");}} style={{display:"block",width:"100%",textAlign:"left",padding:"18px 20px",marginBottom:8,background:B.wh,border:`1px solid ${B.accent}12`,borderRadius:10,cursor:"pointer",fontFamily:F,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=B.accent;e.currentTarget.style.background=B.accentL+"70"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=B.accent+"12";e.currentTarget.style.background=B.wh}}>
              <p style={{fontSize:16,fontWeight:600,fontFamily:H,marginBottom:2}}>{s.cat}</p>
              <p style={{fontSize:12,color:B.txm}}>{s.scripts.length} scripts</p>
            </button>
          ))}

          {energyEntries.length>1 && <div style={{marginTop:28}}>
            <Lbl>Energy audit trend</Lbl>
            <div style={{background:B.wh,borderRadius:12,padding:"20px",border:`1px solid ${B.accent}15`}}>
              <div style={{display:"flex",alignItems:"flex-end",gap:3,height:100}}>
                {energyEntries.map(([d,v],i)=>(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",gap:1,height:80,justifyContent:"flex-end"}}>
                      <div style={{width:"100%",height:`${(v.received||0)*8}%`,background:B.accent+"60",borderRadius:2,minHeight:v.received?2:0}} />
                      <div style={{width:"100%",height:`${(v.gave||0)*8}%`,background:B.accent,borderRadius:2,minHeight:v.gave?2:0}} />
                    </div>
                    <span style={{fontSize:7,color:B.txl}}>{d.slice(8)}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12,marginTop:10,justifyContent:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,background:B.accent,borderRadius:2}} /><span style={{fontSize:10,color:B.txm}}>Given</span></div>
                <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,background:B.accent+"60",borderRadius:2}} /><span style={{fontSize:10,color:B.txm}}>Received</span></div>
              </div>
            </div>
          </div>}

          <div style={{marginTop:28}}>
            <Lbl>The science</Lbl>
            {RESEARCH.map((r,i)=>(
              <div key={i} style={{display:"flex",gap:18,alignItems:"baseline",padding:"20px 0",borderBottom:i<RESEARCH.length-1?`1px solid ${B.tx}12`:"none"}}>
                <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:.9,minWidth:38}}>{`0${i+1}`}</span>
                <div>
                  <p style={{fontSize:15,fontWeight:600,marginBottom:4}}>{r.title}</p>
                  <p style={{fontSize:13,lineHeight:1.7,color:B.txm}}>{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </>}

        <div style={{textAlign:"center",paddingTop:20}}>
          <p style={{fontSize:11,color:B.txl,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>I choose myself without apology.</p>
          <p style={{fontSize:11,color:B.txl,marginTop:8,letterSpacing:2}}>@lovelarice</p>
        </div>
      </div>
    </div>
  );
}
