import { useState, useEffect, useRef } from "react";

const B = { pri:"#A84A30", sec:"#D4856A", acc:"#5C5470", bg:"#FAF6F2", tx:"#3A2018", txm:"#6B5B52", txl:"#A69890", accL:"#EEEDF5", wh:"#FFFFFF", fill:"#F5E8E1", accent:"#2C6E6A", accentL:"#E0EFED", accentD:"#1A4A47" };
const F = "'Outfit', sans-serif";
const H = "'Cormorant Garamond', serif";
const LOGO = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1100\" zoomAndPan=\"magnify\" viewBox=\"0 0 824.88 374.999991\" height=\"500\" preserveAspectRatio=\"xMidYMid meet\" version=\"1.0\"><defs><g/></defs><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(171.424323, 194.17699)\"><g><path d=\"M 63.203125 9.125 C 60.898438 10.6875 58.613281 11.972656 56.34375 12.984375 C 54.082031 13.992188 51.5 14.5 48.59375 14.5 C 46.351562 14.5 44.269531 14.144531 42.34375 13.4375 C 40.414062 12.726562 38.539062 11.832031 36.71875 10.75 C 34.894531 9.664062 33.085938 8.5 31.296875 7.25 C 29.503906 6 27.644531 4.832031 25.71875 3.75 C 23.789062 2.664062 21.707031 1.769531 19.46875 1.0625 C 17.238281 0.351562 14.804688 0 12.171875 0 L 3.34375 0 C 4.90625 -0.332031 5.9375 -1.160156 6.4375 -2.484375 C 6.945312 -3.804688 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.625 C 7.203125 -44.96875 6.929688 -46.234375 6.390625 -47.421875 C 5.847656 -48.609375 4.832031 -49.367188 3.34375 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.367188 14.539062 -48.609375 14 -47.421875 C 13.457031 -46.234375 13.1875 -44.96875 13.1875 -43.625 L 13.1875 -0.90625 C 16.632812 -0.769531 19.976562 -0.078125 23.21875 1.171875 C 26.46875 2.421875 29.664062 3.785156 32.8125 5.265625 C 35.957031 6.753906 39.132812 8.09375 42.34375 9.28125 C 45.5625 10.46875 48.859375 11.0625 52.234375 11.0625 C 54.203125 11.0625 56.03125 10.875 57.71875 10.5 C 59.40625 10.125 61.128906 9.5 62.890625 8.625 Z M 63.203125 9.125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(191.913475, 194.17699)\"><g><path d=\"M 10.546875 -4.671875 C 10.546875 -3.378906 10.914062 -2.359375 11.65625 -1.609375 C 12.40625 -0.867188 13.351562 -0.332031 14.5 0 L 3.65625 0 C 4.875 -0.40625 6.019531 -1.148438 7.09375 -2.234375 C 8.175781 -3.316406 8.957031 -4.5 9.4375 -5.78125 L 26.671875 -50.3125 L 44.03125 -5.78125 C 44.5625 -4.5625 45.25 -3.394531 46.09375 -2.28125 C 46.945312 -1.164062 48.015625 -0.40625 49.296875 0 L 34.6875 0 C 35.570312 -0.269531 36.300781 -0.859375 36.875 -1.765625 C 37.445312 -2.679688 37.734375 -3.546875 37.734375 -4.359375 C 37.734375 -4.898438 37.492188 -5.847656 37.015625 -7.203125 C 36.546875 -8.554688 36.003906 -10.007812 35.390625 -11.5625 C 34.785156 -13.113281 34.195312 -14.597656 33.625 -16.015625 C 33.050781 -17.441406 32.628906 -18.492188 32.359375 -19.171875 L 15.625 -19.171875 C 15.351562 -18.492188 14.945312 -17.492188 14.40625 -16.171875 C 13.863281 -14.859375 13.304688 -13.472656 12.734375 -12.015625 C 12.160156 -10.566406 11.648438 -9.164062 11.203125 -7.8125 C 10.765625 -6.457031 10.546875 -5.410156 10.546875 -4.671875 Z M 15.828125 -19.984375 L 31.953125 -19.984375 L 23.9375 -40.875 Z M 15.828125 -19.984375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(236.847953, 194.17699)\"><g><path d=\"M 13.390625 -6.296875 C 13.390625 -4.941406 13.660156 -3.671875 14.203125 -2.484375 C 14.742188 -1.296875 15.691406 -0.46875 17.046875 0 L 3.65625 0 C 5.070312 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.070312 -49.296875 3.65625 -49.703125 L 20.890625 -49.703125 C 23.328125 -49.703125 25.710938 -49.429688 28.046875 -48.890625 C 30.378906 -48.347656 32.457031 -47.484375 34.28125 -46.296875 C 36.113281 -45.117188 37.585938 -43.566406 38.703125 -41.640625 C 39.816406 -39.710938 40.375 -37.363281 40.375 -34.59375 C 40.375 -30.601562 39.171875 -27.351562 36.765625 -24.84375 C 34.367188 -22.34375 31.3125 -20.65625 27.59375 -19.78125 L 36.828125 -4.875 C 37.566406 -3.789062 38.441406 -2.804688 39.453125 -1.921875 C 40.472656 -1.046875 41.554688 -0.40625 42.703125 0 L 33.265625 0 L 21.203125 -19.578125 L 13.390625 -19.578125 Z M 13.390625 -20.28125 L 20.28125 -20.28125 C 24.539062 -20.28125 27.90625 -21.597656 30.375 -24.234375 C 32.84375 -26.878906 34.078125 -30.332031 34.078125 -34.59375 C 34.078125 -39.050781 32.894531 -42.546875 30.53125 -45.078125 C 28.164062 -47.617188 24.75 -48.890625 20.28125 -48.890625 L 13.390625 -48.890625 Z M 13.390625 -20.28125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(278.739776, 194.17699)\"><g><path d=\"M 13.390625 -6.484375 C 13.390625 -5.140625 13.625 -3.835938 14.09375 -2.578125 C 14.570312 -1.328125 15.519531 -0.46875 16.9375 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.3125 6.484375 -2.53125 C 6.960938 -3.75 7.203125 -5.066406 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.117188 6.484375 -47.265625 C 6.015625 -48.421875 5.035156 -49.234375 3.546875 -49.703125 L 16.9375 -49.703125 C 15.519531 -49.234375 14.570312 -48.421875 14.09375 -47.265625 C 13.625 -46.117188 13.390625 -44.867188 13.390625 -43.515625 Z M 13.390625 -6.484375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(294.765822, 194.17699)\"><g><path d=\"M 47.375 -7.203125 C 46.21875 -6.191406 44.894531 -5.242188 43.40625 -4.359375 C 41.925781 -3.484375 40.375 -2.707031 38.75 -2.03125 C 37.125 -1.351562 35.484375 -0.8125 33.828125 -0.40625 C 32.171875 0 30.566406 0.203125 29.015625 0.203125 C 25.492188 0.203125 22.175781 -0.4375 19.0625 -1.71875 C 15.957031 -3.007812 13.253906 -4.769531 10.953125 -7 C 8.648438 -9.226562 6.835938 -11.863281 5.515625 -14.90625 C 4.203125 -17.945312 3.546875 -21.265625 3.546875 -24.859375 C 3.546875 -28.441406 4.203125 -31.753906 5.515625 -34.796875 C 6.835938 -37.835938 8.648438 -40.472656 10.953125 -42.703125 C 13.253906 -44.929688 15.957031 -46.6875 19.0625 -47.96875 C 22.175781 -49.257812 25.492188 -49.90625 29.015625 -49.90625 C 31.785156 -49.90625 34.65625 -49.550781 37.625 -48.84375 C 40.601562 -48.132812 43.175781 -46.898438 45.34375 -45.140625 L 45.34375 -37.03125 C 44.332031 -38.445312 43.164062 -39.863281 41.84375 -41.28125 C 40.519531 -42.707031 39.097656 -43.992188 37.578125 -45.140625 C 36.054688 -46.285156 34.414062 -47.210938 32.65625 -47.921875 C 30.90625 -48.640625 29.113281 -49 27.28125 -49 C 24.375 -49 21.875 -48.300781 19.78125 -46.90625 C 17.6875 -45.519531 15.945312 -43.757812 14.5625 -41.625 C 13.175781 -39.5 12.160156 -37.117188 11.515625 -34.484375 C 10.867188 -31.847656 10.546875 -29.28125 10.546875 -26.78125 C 10.546875 -24.007812 10.914062 -21.082031 11.65625 -18 C 12.40625 -14.925781 13.554688 -12.117188 15.109375 -9.578125 C 16.671875 -7.046875 18.648438 -4.953125 21.046875 -3.296875 C 23.453125 -1.640625 26.3125 -0.8125 29.625 -0.8125 C 31.507812 -0.8125 33.28125 -1.164062 34.9375 -1.875 C 36.601562 -2.582031 38.128906 -3.507812 39.515625 -4.65625 C 40.898438 -5.8125 42.148438 -7.132812 43.265625 -8.625 C 44.378906 -10.113281 45.34375 -11.632812 46.15625 -13.1875 Z M 47.375 -7.203125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(341.323625, 194.17699)\"><g><path d=\"M 23.03125 -0.8125 C 26.207031 -0.8125 29.316406 -1.554688 32.359375 -3.046875 C 35.398438 -4.535156 37.695312 -6.734375 39.25 -9.640625 L 36.921875 0 L 3.546875 0 C 5.035156 -0.46875 6.015625 -1.328125 6.484375 -2.578125 C 6.960938 -3.835938 7.203125 -5.140625 7.203125 -6.484375 L 7.203125 -43.515625 C 7.203125 -44.867188 6.960938 -46.132812 6.484375 -47.3125 C 6.015625 -48.5 5.035156 -49.296875 3.546875 -49.703125 L 36.21875 -49.703125 L 38.234375 -40.171875 C 36.679688 -43.140625 34.601562 -45.332031 32 -46.75 C 29.394531 -48.175781 26.4375 -48.890625 23.125 -48.890625 L 13.390625 -48.890625 L 13.390625 -25.65625 L 19.671875 -25.65625 C 21.503906 -25.65625 23.195312 -26.046875 24.75 -26.828125 C 26.300781 -27.609375 27.347656 -28.976562 27.890625 -30.9375 L 27.890625 -19.78125 C 27.347656 -21.738281 26.300781 -23.070312 24.75 -23.78125 C 23.195312 -24.5 21.503906 -24.859375 19.671875 -24.859375 L 13.390625 -24.859375 L 13.390625 -0.8125 Z M 23.03125 -0.8125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(453.619704, 160.779442)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(471.019481, 160.779442)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(487.100496, 160.779442)\"><g><path d=\"M 8.765625 -7.953125 L 13.921875 -7.953125 L 13.921875 -0.578125 C 13.117188 -0.316406 12.300781 -0.125 11.46875 0 C 10.644531 0.132812 9.6875 0.203125 8.59375 0.203125 C 6.289062 0.203125 4.5 -0.476562 3.21875 -1.84375 C 1.9375 -3.207031 1.296875 -5.125 1.296875 -7.59375 C 1.296875 -9.164062 1.613281 -10.546875 2.25 -11.734375 C 2.882812 -12.921875 3.796875 -13.828125 4.984375 -14.453125 C 6.171875 -15.085938 7.566406 -15.40625 9.171875 -15.40625 C 10.785156 -15.40625 12.296875 -15.101562 13.703125 -14.5 L 13.015625 -12.953125 C 11.640625 -13.535156 10.316406 -13.828125 9.046875 -13.828125 C 7.203125 -13.828125 5.757812 -13.273438 4.71875 -12.171875 C 3.6875 -11.066406 3.171875 -9.539062 3.171875 -7.59375 C 3.171875 -5.539062 3.671875 -3.984375 4.671875 -2.921875 C 5.671875 -1.867188 7.140625 -1.34375 9.078125 -1.34375 C 10.128906 -1.34375 11.15625 -1.460938 12.15625 -1.703125 L 12.15625 -6.375 L 8.765625 -6.375 Z M 8.765625 -7.953125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(506.83668, 160.779442)\"><g><path d=\"M 13.546875 -15.1875 L 13.546875 -5.359375 C 13.546875 -3.628906 13.023438 -2.269531 11.984375 -1.28125 C 10.941406 -0.289062 9.503906 0.203125 7.671875 0.203125 C 5.847656 0.203125 4.4375 -0.289062 3.4375 -1.28125 C 2.4375 -2.28125 1.9375 -3.65625 1.9375 -5.40625 L 1.9375 -15.1875 L 3.703125 -15.1875 L 3.703125 -5.28125 C 3.703125 -4.007812 4.046875 -3.035156 4.734375 -2.359375 C 5.421875 -1.679688 6.4375 -1.34375 7.78125 -1.34375 C 9.0625 -1.34375 10.046875 -1.679688 10.734375 -2.359375 C 11.429688 -3.046875 11.78125 -4.023438 11.78125 -5.296875 L 11.78125 -15.1875 Z M 13.546875 -15.1875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(526.572864, 160.779442)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 -1.59375 L 10.546875 -1.59375 L 10.546875 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(541.864695, 160.779442)\"><g><path d=\"M 11.625 0 L 9.734375 -4.828125 L 3.65625 -4.828125 L 1.78125 0 L 0 0 L 6 -15.25 L 7.484375 -15.25 L 13.453125 0 Z M 9.1875 -6.421875 L 7.421875 -11.125 C 7.191406 -11.71875 6.957031 -12.445312 6.71875 -13.3125 C 6.5625 -12.644531 6.34375 -11.914062 6.0625 -11.125 L 4.28125 -6.421875 Z M 9.1875 -6.421875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(559.575992, 160.779442)\"><g><path d=\"M 6.765625 0 L 5 0 L 5 -13.609375 L 0.1875 -13.609375 L 0.1875 -15.1875 L 11.5625 -15.1875 L 11.5625 -13.609375 L 6.765625 -13.609375 Z M 6.765625 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(575.594703, 160.779442)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(591.675718, 160.779442)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(416.382935, 190.025186)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(433.782713, 190.025186)\"><g><path d=\"M 15.265625 -7.609375 C 15.265625 -5.179688 14.648438 -3.269531 13.421875 -1.875 C 12.191406 -0.488281 10.484375 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.476562 3.109375 -1.84375 C 1.898438 -3.207031 1.296875 -5.132812 1.296875 -7.625 C 1.296875 -10.101562 1.90625 -12.019531 3.125 -13.375 C 4.34375 -14.738281 6.070312 -15.421875 8.3125 -15.421875 C 10.5 -15.421875 12.203125 -14.726562 13.421875 -13.34375 C 14.648438 -11.957031 15.265625 -10.046875 15.265625 -7.609375 Z M 3.171875 -7.609375 C 3.171875 -5.554688 3.609375 -4 4.484375 -2.9375 C 5.359375 -1.875 6.628906 -1.34375 8.296875 -1.34375 C 9.972656 -1.34375 11.238281 -1.867188 12.09375 -2.921875 C 12.957031 -3.984375 13.390625 -5.546875 13.390625 -7.609375 C 13.390625 -9.648438 12.960938 -11.195312 12.109375 -12.25 C 11.253906 -13.3125 9.988281 -13.84375 8.3125 -13.84375 C 6.632812 -13.84375 5.359375 -13.3125 4.484375 -12.25 C 3.609375 -11.1875 3.171875 -9.640625 3.171875 -7.609375 Z M 3.171875 -7.609375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(454.598832, 190.025186)\"><g><path d=\"M 15.265625 -7.609375 C 15.265625 -5.179688 14.648438 -3.269531 13.421875 -1.875 C 12.191406 -0.488281 10.484375 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.476562 3.109375 -1.84375 C 1.898438 -3.207031 1.296875 -5.132812 1.296875 -7.625 C 1.296875 -10.101562 1.90625 -12.019531 3.125 -13.375 C 4.34375 -14.738281 6.070312 -15.421875 8.3125 -15.421875 C 10.5 -15.421875 12.203125 -14.726562 13.421875 -13.34375 C 14.648438 -11.957031 15.265625 -10.046875 15.265625 -7.609375 Z M 3.171875 -7.609375 C 3.171875 -5.554688 3.609375 -4 4.484375 -2.9375 C 5.359375 -1.875 6.628906 -1.34375 8.296875 -1.34375 C 9.972656 -1.34375 11.238281 -1.867188 12.09375 -2.921875 C 12.957031 -3.984375 13.390625 -5.546875 13.390625 -7.609375 C 13.390625 -9.648438 12.960938 -11.195312 12.109375 -12.25 C 11.253906 -13.3125 9.988281 -13.84375 8.3125 -13.84375 C 6.632812 -13.84375 5.359375 -13.3125 4.484375 -12.25 C 3.609375 -11.1875 3.171875 -9.640625 3.171875 -7.609375 Z M 3.171875 -7.609375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(475.414952, 190.025186)\"><g><path d=\"M 6.765625 0 L 5 0 L 5 -13.609375 L 0.1875 -13.609375 L 0.1875 -15.1875 L 11.5625 -15.1875 L 11.5625 -13.609375 L 6.765625 -13.609375 Z M 6.765625 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(491.433663, 190.025186)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(501.34658, 190.025186)\"><g/></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(511.1245, 190.025186)\"><g><path d=\"M 3.859375 -6.3125 L 3.859375 0 L 2.09375 0 L 2.09375 -15.1875 L 6.25 -15.1875 C 8.113281 -15.1875 9.488281 -14.828125 10.375 -14.109375 C 11.269531 -13.398438 11.71875 -12.328125 11.71875 -10.890625 C 11.71875 -8.878906 10.695312 -7.523438 8.65625 -6.828125 L 12.78125 0 L 10.6875 0 L 7.015625 -6.3125 Z M 3.859375 -7.828125 L 6.265625 -7.828125 C 7.515625 -7.828125 8.429688 -8.070312 9.015625 -8.5625 C 9.597656 -9.0625 9.890625 -9.804688 9.890625 -10.796875 C 9.890625 -11.796875 9.59375 -12.519531 9 -12.96875 C 8.40625 -13.414062 7.453125 -13.640625 6.140625 -13.640625 L 3.859375 -13.640625 Z M 3.859375 -7.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(528.524277, 190.025186)\"><g><path d=\"M 10.546875 0 L 2.09375 0 L 2.09375 -15.1875 L 10.546875 -15.1875 L 10.546875 -13.609375 L 3.859375 -13.609375 L 3.859375 -8.71875 L 10.140625 -8.71875 L 10.140625 -7.171875 L 3.859375 -7.171875 L 3.859375 -1.578125 L 10.546875 -1.578125 Z M 10.546875 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(544.605292, 190.025186)\"><g><path d=\"M 8.59375 -13.828125 C 6.914062 -13.828125 5.59375 -13.269531 4.625 -12.15625 C 3.664062 -11.039062 3.1875 -9.519531 3.1875 -7.59375 C 3.1875 -5.601562 3.648438 -4.066406 4.578125 -2.984375 C 5.515625 -1.898438 6.84375 -1.359375 8.5625 -1.359375 C 9.625 -1.359375 10.832031 -1.550781 12.1875 -1.9375 L 12.1875 -0.390625 C 11.132812 0.00390625 9.835938 0.203125 8.296875 0.203125 C 6.054688 0.203125 4.328125 -0.472656 3.109375 -1.828125 C 1.898438 -3.179688 1.296875 -5.109375 1.296875 -7.609375 C 1.296875 -9.171875 1.585938 -10.539062 2.171875 -11.71875 C 2.753906 -12.894531 3.597656 -13.800781 4.703125 -14.4375 C 5.804688 -15.082031 7.109375 -15.40625 8.609375 -15.40625 C 10.203125 -15.40625 11.59375 -15.113281 12.78125 -14.53125 L 12.03125 -13.015625 C 10.882812 -13.554688 9.738281 -13.828125 8.59375 -13.828125 Z M 8.59375 -13.828125 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(562.275053, 190.025186)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 -1.59375 L 10.546875 -1.59375 L 10.546875 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(577.566884, 190.025186)\"><g><path d=\"M 11.625 0 L 9.734375 -4.828125 L 3.65625 -4.828125 L 1.78125 0 L 0 0 L 6 -15.25 L 7.484375 -15.25 L 13.453125 0 Z M 9.1875 -6.421875 L 7.421875 -11.125 C 7.191406 -11.71875 6.957031 -12.445312 6.71875 -13.3125 C 6.5625 -12.644531 6.34375 -11.914062 6.0625 -11.125 L 4.28125 -6.421875 Z M 9.1875 -6.421875 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(595.278182, 190.025186)\"><g><path d=\"M 2.09375 0 L 2.09375 -15.1875 L 3.859375 -15.1875 L 3.859375 0 Z M 2.09375 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(605.461083, 190.025186)\"><g><path d=\"M 8.8125 0 L 3.65625 -13.453125 L 3.578125 -13.453125 C 3.671875 -12.390625 3.71875 -11.125 3.71875 -9.65625 L 3.71875 0 L 2.09375 0 L 2.09375 -15.1875 L 4.75 -15.1875 L 9.546875 -2.65625 L 9.640625 -2.65625 L 14.484375 -15.1875 L 17.125 -15.1875 L 17.125 0 L 15.359375 0 L 15.359375 -9.78125 C 15.359375 -10.90625 15.40625 -12.125 15.5 -13.4375 L 15.421875 -13.4375 L 10.234375 0 Z M 8.8125 0 \"/></g></g></g><g fill=\"#000000\" fill-opacity=\"1\"><g transform=\"translate(628.914752, 190.025186)\"><g><path d=\"M 1.578125 -1.09375 C 1.578125 -1.5625 1.679688 -1.914062 1.890625 -2.15625 C 2.109375 -2.394531 2.410156 -2.515625 2.796875 -2.515625 C 3.203125 -2.515625 3.515625 -2.394531 3.734375 -2.15625 C 3.960938 -1.914062 4.078125 -1.5625 4.078125 -1.09375 C 4.078125 -0.644531 3.960938 -0.300781 3.734375 -0.0625 C 3.503906 0.175781 3.191406 0.296875 2.796875 0.296875 C 2.453125 0.296875 2.160156 0.1875 1.921875 -0.03125 C 1.691406 -0.25 1.578125 -0.601562 1.578125 -1.09375 Z M 1.578125 -1.09375 \"/></g></g></g></svg>";
const Logo = () => <div style={{width:500,maxWidth:"100%",margin:"0 auto",overflow:"hidden"}} dangerouslySetInnerHTML={{__html:LOGO.replace(/width="1100"/,'width="100%"').replace(/height="500"/,'').replace(/viewBox="0 0 824.88 374.999991"/,'viewBox="0 110 824.88 110"')}} />;

const SK = "larice_reg_mastery";
const load = () => { try { return JSON.parse(localStorage.getItem(SK)) || {days:{},wot:{},cycles:[],reflections:{}}; } catch { return {days:{},wot:{},cycles:[],reflections:{}}; } };
const save = (d) => localStorage.setItem(SK, JSON.stringify(d));
const td = () => new Date().toISOString().slice(0,10);
const fmtD = (d) => new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});

const PERIODS = [
  { key:"morning", label:"Morning", task:"5 extended exhale breaths + 2-min body scan", note:"Before your phone. Day begins from regulation." },
  { key:"midday", label:"Midday", task:"Physiological sigh + name your state", note:"2pm or energy dip. Build interoceptive awareness." },
  { key:"evening", label:"Evening", task:"5 exhale breaths + journal one sentence", note:"30 min before bed. Close the stress cycle." },
];

const PRACTICES = [
  { id:"exhale", name:"Extended Exhale", desc:"In 4, out 7. The foundation practice.", inC:4, outC:7, rounds:6 },
  { id:"box", name:"Box Breathing", desc:"In 4, hold 4, out 4, hold 4. Builds nervous system flexibility.", inC:4, holdC:4, outC:4, hold2C:4, rounds:4 },
  { id:"478", name:"4-7-8 Breathing", desc:"In 4, hold 7, out 8. The deepest parasympathetic activation.", inC:4, holdC:7, outC:8, rounds:4 },
  { id:"sigh", name:"Physiological Sigh", desc:"Double inhale + long exhale. Fastest acute reset.", steps:["First inhale","Second inhale","Long exhale"], durs:[2,1.5,5], rounds:3 },
];

const RESEARCH = [
  { title:"Ventral vagal regulation", body:"The ventral vagal complex enables social engagement, clear thinking, and emotional regulation. When active, heart rate variability increases, breathing deepens, and the body signals safety to itself and others. This is the state where every wellness practice works." },
  { title:"Sympathetic activation", body:"Cortisol and adrenaline flood the system within 3 seconds of perceived threat. Chronic activation keeps the HPA axis in overdrive, narrowing the window of tolerance and making regulation progressively harder without intervention." },
  { title:"Extended exhale science", body:"Making the exhale longer than the inhale stimulates the vagus nerve, shifting heart rate variability toward parasympathetic dominance. Research on respiratory patterns confirms this as one of the most accessible interventions for acute sympathetic activation." },
  { title:"Window of tolerance", body:"Originally described by Dan Siegel, the window of tolerance is the zone of arousal within which a person can function effectively. It narrows with sleep deprivation, hunger, isolation, and unprocessed stress. It widens with consistent co-regulation and vagal toning practices." },
];

function getStreak(data) {
  const allDays = Object.keys(data.days||{}).filter(d => {
    const v = data.days[d]; return v && (v.morning||v.midday||v.evening);
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
function hasCheckedToday(d) { const e=d.days?.[td()]; return e&&(e.morning||e.midday||e.evening); }
function getDayNum(d) { if(!d.startDate)return 0; return Math.min(Math.floor((new Date(td()+"T12:00:00")-new Date(d.startDate+"T12:00:00"))/86400000)+1,30); }

function BreathTimer({ practice, onDone }) {
  const [phase, setPhase] = useState("ready");
  const [round, setRound] = useState(0);
  const [count, setCount] = useState(0);
  const [label, setLabel] = useState("");
  const iv = useRef(null);
  useEffect(() => () => { if(iv.current) clearInterval(iv.current); }, []);

  const start = () => {
    setPhase("go"); setRound(1);
    const p = practice;
    if (p.id === "sigh") {
      let r = 1;
      const runR = (rn) => {
        let si = 0; setLabel(p.steps[0]); setCount(Math.ceil(p.durs[0])); let el = 0;
        iv.current = setInterval(() => {
          el += 0.5; setCount(Math.max(0, Math.ceil(p.durs[si] - el)));
          if (el >= p.durs[si]) { si++; if (si >= p.steps.length) { clearInterval(iv.current); const nr = rn+1; if(nr>p.rounds){setPhase("done");onDone();return;} setRound(nr); setTimeout(()=>runR(nr),600); return; } el=0; setLabel(p.steps[si]); setCount(Math.ceil(p.durs[si])); }
        }, 500);
      };
      runR(1); return;
    }
    // Box or standard
    const seq = p.id==="box" ? [{l:"Breathe in",c:p.inC},{l:"Hold",c:p.holdC},{l:"Breathe out",c:p.outC},{l:"Hold",c:p.hold2C}]
      : p.holdC ? [{l:"Breathe in",c:p.inC},{l:"Hold",c:p.holdC},{l:"Breathe out",c:p.outC}]
      : [{l:"Breathe in",c:p.inC},{l:"Breathe out",c:p.outC}];
    let si=0, cc=seq[0].c, cr=1;
    setLabel(seq[0].l); setCount(seq[0].c);
    iv.current = setInterval(() => {
      cc--;
      if (cc <= 0) { si++; if (si>=seq.length) { cr++; if(cr>p.rounds){clearInterval(iv.current);setPhase("done");onDone();return;} si=0; setRound(cr); } cc=seq[si].c; setLabel(seq[si].l); setCount(seq[si].c); } else { setCount(cc); }
    }, 1000);
  };

  if (phase==="ready") return <button onClick={start} style={{width:"100%",padding:"14px",fontSize:14,fontWeight:600,fontFamily:F,color:B.wh,background:B.accent,border:"none",borderRadius:8,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>e.target.style.background=B.accentD} onMouseLeave={e=>e.target.style.background=B.accent}>Start practice</button>;
  if (phase==="done") return <div style={{textAlign:"center",padding:"20px 0"}}><p style={{fontSize:18,fontWeight:600,color:B.accent}}>Practice complete</p></div>;
  const scale = label.includes("in")?1.12:label.includes("out")?0.88:1.02;
  return (
    <div style={{textAlign:"center",padding:"16px 0"}}>
      <p style={{fontSize:11,color:B.txl,letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:16}}>Round {round} of {practice.rounds}</p>
      <div style={{width:100,height:100,borderRadius:"50%",border:`3px solid ${B.accent}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",transition:"transform .8s ease",transform:`scale(${scale})`}}>
        <span style={{fontSize:32,fontWeight:600,color:B.accent}}>{count}</span>
      </div>
      <p style={{fontSize:15,fontWeight:500}}>{label}</p>
    </div>
  );
}


const RECS = {
  sympathetic_activation: { product:"Nervous System Bundle", desc:"Your analysis surfaced a pattern of sympathetic activation without adequate recovery support. Magnesium glycinate supports the parasympathetic recovery pathways your nervous system relies on, while Ashwagandha may help modulate the HPA axis response driving your chronic activation.", price:"$44.99", url:"https://bdyalign.com/products/nervous-system-bundle" },
  sleep_disruption: { product:"Pure Magnesium Power", desc:"Your regulation data shows a pattern connected to sleep disruption. Magnesium is involved in over 300 enzymatic processes, including those that support the transition from sympathetic to parasympathetic dominance at the end of the day.", price:"$29.99", url:"https://bdyalign.com/products/pure-magnesium-power" },
  hpa_overload: { product:"Ashwagandha", desc:"Your stress cycle data suggests sustained HPA axis activation. Ashwagandha is classified as an adaptogen — research suggests it may help modulate cortisol levels and support the body’s stress response over time.", price:"$24.99", url:"https://bdyalign.com/products/ashwagandha" },
  stress_incomplete: { product:"Nervous System Bundle", desc:"Your patterns suggest stress cycles that activate but don’t fully complete. The Nervous System Bundle pairs Magnesium (parasympathetic support) with Ashwagandha (HPA axis modulation) to address both the activation and recovery sides of incomplete stress cycles.", price:"$44.99", url:"https://bdyalign.com/products/nervous-system-bundle" },
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
  const [practiceId, setPracticeId] = useState(null);
  const [tab, setTab] = useState("track");
  const [aiResult, setAiResult] = useState("");
  const [aiRec, setAiRec] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [cycleTrigger, setCycleTrigger] = useState("");
  const [cycleResponse, setCycleResponse] = useState("");
  const [cycleRecovery, setCycleRecovery] = useState("");
  const [verified, setVerified] = useState(() => { try { return !!localStorage.getItem("larice_reg_mastery_email"); } catch { return false; } });
  const [gateEmail, setGateEmail] = useState("");
  const [gateErr, setGateErr] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => { save(data); }, [data]);
  useEffect(() => { ref.current?.scrollIntoView({behavior:"smooth",block:"start"}); }, [view, tab, practiceId]);
  const streak = getStreak(data);
  const checked = hasCheckedToday(data);
  const dayNum = getDayNum(data);
  const todayData = data.days?.[td()] || {};
  const todayWot = data.wot?.[td()] || 0;

  const togglePeriod = (key) => {
    const d = {...data}; if(!d.startDate) d.startDate=td();
    d.days = {...d.days, [td()]:{...todayData, [key]:!todayData[key]}};
    setData(d);
  };
  const setWot = (val) => { setData({...data, wot:{...data.wot, [td()]:val}}); };
  const addCycle = (trigger, response, recovery) => {
    setData({...data, cycles:[...data.cycles, {date:td(), trigger, response, recovery, ts:Date.now()}]});
  };
  const setReflection = (wk, text) => { setData({...data, reflections:{...data.reflections,[wk]:text}}); };

  const analyzePatterns = async () => {
    setAiLoading(true); setAiResult("");
    const daysData = Object.entries(data.days||{}).map(([d,v])=>({date:d,morning:!!v.morning,midday:!!v.midday,evening:!!v.evening,journal:v.journal||""})).slice(-30);
    const wotData = Object.entries(data.wot||{}).map(([d,v])=>({date:d,rating:v})).slice(-30);
    const cyclesData = (data.cycles||[]).slice(-10).map(c=>({date:c.date,trigger:c.trigger,response:c.response,recovery:c.recovery}));
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{role:"user",content:`You are a nervous system regulation coach for the Larice Wellness brand. Analyze this woman's regulation data and provide a warm, specific, actionable insight. Use "you" directly. Be specific about patterns you see in the data. No generic advice — reference her actual numbers and patterns.

REGULATION CHECK-INS (last 30 days): ${JSON.stringify(daysData)}
WINDOW OF TOLERANCE RATINGS (1-10): ${JSON.stringify(wotData)}
STRESS CYCLES LOGGED: ${JSON.stringify(cyclesData)}
CURRENT STREAK: ${streak} days

Provide:
1. Her strongest regulation pattern (specific to her data)
2. Her vulnerability pattern (when/where regulation drops)
3. One specific, personalized recommendation based on what you see
4. An identity-affirming closing statement based on her actual progress

Keep it under 200 words. Warm but direct. No bullet points \u2014 write in flowing paragraphs.\n\nFinally, on a NEW line at the very end, write exactly one of these tags based on the PRIMARY pattern you identified (this will be parsed programmatically, so write ONLY the tag on its own line):\n[SYMPATHETIC_ACTIVATION] [SLEEP_DISRUPTION] [HPA_OVERLOAD] [STRESS_INCOMPLETE]`}]
        })
      });
      const d = await res.json();
      let text = d.content?.map(c=>c.text||"").join("") || "Unable to analyze at this time.";
      const tagMatch = text.match(/\[(SYMPATHETIC_ACTIVATION|SLEEP_DISRUPTION|HPA_OVERLOAD|STRESS_INCOMPLETE)\]/);
      if (tagMatch) { text = text.replace(/\n?\[.*\]\s*$/, '').trim(); setAiRec(RECS[tagMatch[1].toLowerCase()]); }
      else { setAiRec(RECS.sympathetic_activation); }
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
        body: JSON.stringify({ email: gateEmail.trim(), product: "Regulation Mastery Kit" })
      });
      const d = await res.json();
      if (d.verified) { setVerified(true); localStorage.setItem("larice_reg_mastery_email", gateEmail.trim()); }
      else { setGateErr("No purchase found for this email. Please use the email you purchased with."); }
    } catch {
      setVerified(true); localStorage.setItem("larice_reg_mastery_email", gateEmail.trim());
    }
    setGateLoading(false);
  };

  const css = { fontFamily:F, background:B.bg, minHeight:"100vh", color:B.tx, WebkitFontSmoothing:"antialiased" };
  const wrap = { maxWidth:500, margin:"0 auto", padding:"0 24px" };
  const Lbl = ({children}) => <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:18}}><span style={{height:1,width:26,background:B.accent,opacity:.45,transform:"translateY(-5px)"}} /><span style={{fontFamily:H,fontSize:20,fontWeight:600,fontStyle:"italic",color:B.accent,letterSpacing:.2}}>{children}</span></div>;


  /* ── PRACTICE VIEW ── */

  if (!verified) return (
    <div style={css}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} input::placeholder{color:${B.txl}}`}</style>
      <div ref={ref} style={{...wrap,paddingTop:60,paddingBottom:56}}>
        <div style={{textAlign:"center",marginBottom:40,animation:"up .6s cubic-bezier(.22,1,.36,1) both"}}><Logo /></div>
        <div style={{textAlign:"center",marginBottom:36,animation:"up .6s cubic-bezier(.22,1,.36,1) .1s both"}}>
          <h1 style={{fontFamily:H,fontSize:"clamp(34px,9vw,46px)",fontWeight:600,lineHeight:1,letterSpacing:-.5,marginBottom:14}}>Regulation<br/><span style={{fontStyle:"italic",color:B.accent}}>Mastery Kit</span></h1>
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


  if (view === "practice" && practiceId) {
    const p = PRACTICES.find(x=>x.id===practiceId);
    return (
      <div style={css}>
        <style>{`@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div ref={ref} style={{...wrap,paddingTop:28,paddingBottom:48}}>
          <button onClick={()=>{setView("home");setPracticeId(null);}} style={{fontSize:12,fontFamily:F,fontWeight:500,color:B.txl,background:"none",border:"none",cursor:"pointer",padding:"8px 0",marginBottom:24,borderBottom:`1.5px solid ${B.txl}30`}}>Back</button>
          <div style={{animation:"up .4s cubic-bezier(.22,1,.36,1) both"}}>
            <h2 style={{fontSize:22,fontWeight:600,fontFamily:H,marginBottom:6,}}>{p.name}</h2>
            <p style={{fontSize:14,color:B.txm,lineHeight:1.7,marginBottom:24}}>{p.desc}</p>
            <div style={{background:B.wh,borderRadius:12,padding:"24px",border:`1px solid ${B.accent}20`}}>
              <BreathTimer practice={p} onDone={()=>{}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── STRESS CYCLE VIEW ── */
  if (view === "cycle") {
    return (
      <div style={css}>
        <style>{`@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div ref={ref} style={{...wrap,paddingTop:28,paddingBottom:48}}>
          <button onClick={()=>{setView("home");setCycleTrigger("");setCycleResponse("");setCycleRecovery("");}} style={{fontSize:12,fontFamily:F,fontWeight:500,color:B.txl,background:"none",border:"none",cursor:"pointer",padding:"8px 0",marginBottom:24,borderBottom:`1.5px solid ${B.txl}30`}}>Back</button>
          <div style={{animation:"up .4s cubic-bezier(.22,1,.36,1) both"}}>
            <h2 style={{fontSize:22,fontWeight:600,fontFamily:H,marginBottom:8,}}>Stress Cycle Protocol</h2>
            <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginBottom:24}}>Identify the trigger, name your response, then record how you completed the cycle.</p>
            {[{l:"What triggered the activation?",v:cycleTrigger,s:setCycleTrigger,ph:"The event, thought, or interaction..."},
              {l:"How did your body respond?",v:cycleResponse,s:setCycleResponse,ph:"Racing thoughts, tension, shutdown, reactivity..."},
              {l:"How did you complete the cycle?",v:cycleRecovery,s:setCycleRecovery,ph:"Movement, breathing, connection, rest..."}].map((q,i)=>(
              <div key={i} style={{marginBottom:16}}>
                <p style={{fontSize:14,fontWeight:600,marginBottom:8,paddingLeft:14,borderLeft:`3px solid ${B.accent}40`}}>{q.l}</p>
                <textarea value={q.v} onChange={e=>q.s(e.target.value)} placeholder={q.ph}
                  style={{width:"100%",minHeight:70,padding:14,fontSize:14,fontFamily:F,border:`1px solid ${B.accent}15`,borderRadius:10,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7}}
                  onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"15"} />
              </div>
            ))}
            <button onClick={()=>{if(cycleTrigger||cycleResponse||cycleRecovery){addCycle(cycleTrigger,cycleResponse,cycleRecovery);setCycleTrigger("");setCycleResponse("");setCycleRecovery("");setView("home");}}}
              style={{width:"100%",padding:"14px",fontSize:14,fontWeight:600,fontFamily:F,color:B.wh,background:B.accent,border:"none",borderRadius:8,cursor:"pointer",transition:"all .2s"}}
              onMouseEnter={e=>e.target.style.background=B.accentD} onMouseLeave={e=>e.target.style.background=B.accent}>Save cycle</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── HOME ── */
  const wotEntries = Object.entries(data.wot||{}).filter(([_,v])=>v>0).sort((a,b)=>a[0].localeCompare(b[0])).slice(-14);

  return (
    <div style={css}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
      <div ref={ref} style={{...wrap,paddingTop:40,paddingBottom:56}}>
        <div style={{textAlign:"center",marginBottom:28,animation:"up .5s cubic-bezier(.22,1,.36,1) both"}}><Logo /></div>

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

        <div style={{textAlign:"center",marginBottom:40,animation:"up .5s cubic-bezier(.22,1,.36,1) .15s both"}}>
          {dayNum > 0 && (
            <div style={{display:"flex",justifyContent:"center",alignItems:"baseline",gap:8,marginBottom:14}}>
              <span style={{fontFamily:H,fontSize:30,fontWeight:600,fontStyle:"italic",color:B.accent,lineHeight:1}}>Day {dayNum}</span>
              <span style={{fontFamily:F,fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:B.txl}}>of thirty</span>
            </div>
          )}
          <h1 style={{fontFamily:H,fontSize:"clamp(38px,11vw,52px)",fontWeight:600,lineHeight:.98,letterSpacing:-1,marginBottom:16}}>
            Regulation<br/><span style={{fontStyle:"italic",color:B.accent}}>Mastery Kit</span>
          </h1>
          <p style={{fontSize:15,color:B.txm,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>30 days of nervous system regulation. Track, practice, and build the evidence that calm is a skill you own.</p>
        </div>

        {/* Tab nav */}
        <div style={{display:"flex",gap:6,marginBottom:28,animation:"up .5s cubic-bezier(.22,1,.36,1) .2s both"}}>
          {[{k:"track",l:"Track"},{k:"practice",l:"Practices"},{k:"insights",l:"Insights"}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",fontSize:12,fontWeight:600,fontFamily:F,letterSpacing:1,textTransform:"uppercase",color:tab===t.k?B.wh:B.accent,background:tab===t.k?B.accent:"transparent",border:`1.5px solid ${B.accent}`,borderRadius:6,cursor:"pointer",transition:"all .2s"}}>{t.l}</button>
          ))}
        </div>

        {/* TRACK TAB */}
        {tab==="track" && <>
          <div style={{marginBottom:28}}>
            <Lbl>Today's regulation check-in</Lbl>
            <div style={{background:B.wh,borderRadius:12,padding:"20px",border:`1px solid ${B.accent}15`}}>
              {PERIODS.map((p,i)=>{
                const isDone = todayData[p.key];
                return (
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:i<2?16:0,paddingBottom:i<2?16:0,borderBottom:i<2?`1px solid ${B.tx}08`:"none"}}>
                    <button onClick={()=>togglePeriod(p.key)} style={{width:28,height:28,minWidth:28,borderRadius:6,border:`2px solid ${isDone?B.accent:B.txl+"60"}`,background:isDone?B.accent:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",marginTop:2}}>
                      {isDone && <span style={{color:B.wh,fontSize:14,fontWeight:700}}>{"✓"}</span>}
                    </button>
                    <div>
                      <p style={{fontSize:14,fontWeight:600,marginBottom:2}}>{p.label}</p>
                      <p style={{fontSize:13,color:B.txm,lineHeight:1.6}}>{p.task}</p>
                      <p style={{fontSize:11,color:B.txl,marginTop:3,fontStyle:"italic"}}>{p.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{marginBottom:28}}>
            <Lbl>Window of tolerance — today</Lbl>
            <p style={{fontSize:13,color:B.txm,marginBottom:12}}>Rate your window right now. 1 = very narrow, 10 = wide and resilient.</p>
            <div style={{display:"flex",gap:4}}>
              {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                <button key={n} onClick={()=>setWot(n)} style={{flex:1,padding:"10px 0",fontSize:13,fontWeight:todayWot===n?700:500,fontFamily:F,color:todayWot===n?B.wh:B.accent,background:todayWot===n?B.accent:B.wh,border:`1.5px solid ${todayWot>=n?B.accent:B.accent+"30"}`,borderRadius:6,cursor:"pointer",transition:"all .15s"}}>{n}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:28}}>
            <Lbl>Journal</Lbl>
            <textarea value={todayData.journal||""} onChange={e=>{const d={...data};if(!d.startDate)d.startDate=td();d.days={...d.days,[td()]:{...todayData,journal:e.target.value}};setData(d);}} placeholder="Today, my nervous system felt..."
              style={{width:"100%",minHeight:80,padding:14,fontSize:14,fontFamily:F,border:`1px solid ${B.accent}15`,borderRadius:10,background:B.wh,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7}}
              onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"15"} />
          </div>

          <button onClick={()=>setView("cycle")} style={{width:"100%",padding:"16px",fontSize:14,fontWeight:600,fontFamily:F,color:B.accent,background:B.accentL,border:`1px solid ${B.accent}20`,borderRadius:10,cursor:"pointer",transition:"all .2s",marginBottom:28}}
            onMouseEnter={e=>{e.target.style.background=B.accent;e.target.style.color=B.wh}} onMouseLeave={e=>{e.target.style.background=B.accentL;e.target.style.color=B.accent}}>
            Log a stress cycle
          </button>

          {/* Weekly reviews */}
          <Lbl>Weekly regulation audits</Lbl>
          {[1,2,3,4].map(wk => {
            const isActive = dayNum >= ((wk-1)*7+1);
            return (
              <div key={wk} style={{padding:"16px 18px",marginBottom:8,background:isActive?B.wh:B.bg,border:`1px solid ${isActive?B.accent+"15":B.tx+"08"}`,borderRadius:10,opacity:isActive?1:.5}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:isActive?12:0}}>
                  <p style={{fontSize:15,fontWeight:600}}>Week {wk}</p>
                  <p style={{fontSize:12,color:B.txm}}>Days {(wk-1)*7+1}{"–"}{wk===4?30:wk*7}</p>
                </div>
                {isActive && <textarea value={data.reflections?.[wk]||""} onChange={e=>setReflection(wk,e.target.value)} placeholder={wk===1?"What patterns are you noticing in your regulation?":wk===2?"Which time of day is hardest to stay regulated?":wk===3?"What has changed about how you respond to stress?":"Complete: I am a person who regulates because..."}
                  style={{width:"100%",minHeight:60,padding:12,fontSize:13,fontFamily:F,border:`1px solid ${B.accent}12`,borderRadius:8,background:B.bg,color:B.tx,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.65}}
                  onFocus={e=>e.target.style.borderColor=B.accent} onBlur={e=>e.target.style.borderColor=B.accent+"12"} />}
              </div>
            );
          })}
        </>}

        {/* PRACTICES TAB */}
        {tab==="practice" && <>
          <Lbl>Breathing practices</Lbl>
          {PRACTICES.map((p,i)=>(
            <button key={i} onClick={()=>{setPracticeId(p.id);setView("practice");}} style={{display:"block",width:"100%",textAlign:"left",padding:"20px",marginBottom:10,background:B.wh,border:`1px solid ${B.accent}12`,borderRadius:10,cursor:"pointer",fontFamily:F,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=B.accent;e.currentTarget.style.background=B.accentL+"70"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=B.accent+"12";e.currentTarget.style.background=B.wh}}>
              <p style={{fontSize:16,fontWeight:600,fontFamily:H,marginBottom:4}}>{p.name}</p>
              <p style={{fontSize:13,color:B.txm}}>{p.desc}</p>
            </button>
          ))}

          <div style={{marginTop:24}}>
            <Lbl>Stress cycle protocol</Lbl>
            <button onClick={()=>setView("cycle")} style={{display:"block",width:"100%",textAlign:"left",padding:"20px",background:B.accentL,border:`1px solid ${B.accent}18`,borderRadius:10,cursor:"pointer",fontFamily:F,transition:"all .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=B.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=B.accent+"18"}>
              <p style={{fontSize:16,fontWeight:600,fontFamily:H,marginBottom:4}}>Log a stress cycle</p>
              <p style={{fontSize:13,color:B.txm}}>Identify → activate → complete → recover</p>
            </button>
            {data.cycles.length > 0 && <p style={{fontSize:12,color:B.txm,marginTop:8}}>{data.cycles.length} cycle{data.cycles.length>1?"s":""} logged</p>}
          </div>
        </>}

        {/* INSIGHTS TAB */}
        {tab==="insights" && <>
          <div style={{marginBottom:28}}>
            <Lbl>Analyze my regulation</Lbl>
            <p style={{fontSize:13,color:B.txm,lineHeight:1.7,marginBottom:16}}>Your tracking data is analyzed to surface patterns, strengths, and specific recommendations personalized to your nervous system.</p>
            <button onClick={analyzePatterns} disabled={aiLoading} style={{width:"100%",padding:"16px",fontSize:14,fontWeight:600,fontFamily:F,color:B.wh,background:aiLoading?B.txl:B.accent,border:"none",borderRadius:8,cursor:aiLoading?"default":"pointer",letterSpacing:.5,transition:"all .2s"}}
              onMouseEnter={e=>{if(!aiLoading)e.target.style.background=B.accentD}} onMouseLeave={e=>{if(!aiLoading)e.target.style.background=aiLoading?B.txl:B.accent}}>
              {aiLoading ? "Analyzing your patterns..." : "Analyze my regulation"}
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

          {wotEntries.length > 1 && (
            <div style={{marginBottom:28}}>
              <Lbl>Window of tolerance trend</Lbl>
              <div style={{background:B.wh,borderRadius:12,padding:"20px",border:`1px solid ${B.accent}15`}}>
                <div style={{display:"flex",alignItems:"flex-end",gap:4,height:120}}>
                  {wotEntries.map(([d,v],i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <span style={{fontSize:10,color:B.txm,fontWeight:600}}>{v}</span>
                      <div style={{width:"100%",height:`${v*10}%`,background:B.accent,borderRadius:3,minHeight:4,transition:"height .3s"}} />
                      <span style={{fontSize:8,color:B.txl}}>{d.slice(5)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{marginBottom:28}}>
            <div style={{marginBottom:28}}>
              <Lbl>Nervous system states</Lbl>
              <div style={{background:B.wh,borderRadius:12,padding:"24px 16px",border:`1px solid ${B.accent}15`}}>
                <svg width="100%" viewBox="0 0 400 320" style={{display:"block"}}>
                  <rect x="60" y="10" width="280" height="80" rx="8" fill={B.fill} stroke={B.pri} strokeWidth="0.5" strokeOpacity="0.3"/>
                  <text x="200" y="36" textAnchor="middle" style={{fontSize:11,fontWeight:600,fill:B.pri,fontFamily:"Outfit"}}>HYPERAROUSAL</text>
                  <text x="200" y="52" textAnchor="middle" style={{fontSize:9,fill:B.txm,fontFamily:"Outfit"}}>Sympathetic activation</text>
                  <text x="200" y="68" textAnchor="middle" style={{fontSize:8,fill:B.txl,fontFamily:"Outfit"}}>Racing thoughts · tension · reactivity · can't sleep</text>
                  <text x="38" y="44" textAnchor="middle" style={{fontSize:8,fill:B.pri,fontFamily:"Outfit",fontWeight:500}}>{"↑"}</text>
                  <text x="38" y="58" textAnchor="middle" style={{fontSize:7,fill:B.txl,fontFamily:"Outfit",letterSpacing:"0.5px"}}>FIGHT</text>
                  <rect x="40" y="100" width="320" height="100" rx="10" fill={B.accentL} stroke={B.accent} strokeWidth="1.5"/>
                  <text x="200" y="128" textAnchor="middle" style={{fontSize:13,fontWeight:600,fill:B.accent,fontFamily:"Outfit"}}>WINDOW OF TOLERANCE</text>
                  <text x="200" y="146" textAnchor="middle" style={{fontSize:10,fill:B.accent,fontFamily:"Outfit"}}>Ventral vagal — regulated</text>
                  <text x="200" y="164" textAnchor="middle" style={{fontSize:8,fill:B.txm,fontFamily:"Outfit"}}>Clear thinking · connection · calm · can handle stress</text>
                  <line x1="35" y1="105" x2="35" y2="195" stroke={B.accent} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="35" y1="105" x2="40" y2="105" stroke={B.accent} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="35" y1="195" x2="40" y2="195" stroke={B.accent} strokeWidth="1.5" strokeLinecap="round"/>
                  <text x="22" y="153" textAnchor="middle" style={{fontSize:7,fill:B.accent,fontFamily:"Outfit",fontWeight:600}} transform="rotate(-90,22,153)">SAFE ZONE</text>
                  <line x1="120" y1="185" x2="280" y2="185" stroke={B.accent} strokeWidth="0.5" strokeDasharray="3 2" strokeOpacity="0.5"/>
                  <text x="200" y="196" textAnchor="middle" style={{fontSize:7,fill:B.accent,fontFamily:"Outfit",fontStyle:"italic"}}>Width expands with consistent practice</text>
                  <rect x="60" y="210" width="280" height="80" rx="8" fill={B.accL} stroke={B.acc} strokeWidth="0.5" strokeOpacity="0.3"/>
                  <text x="200" y="236" textAnchor="middle" style={{fontSize:11,fontWeight:600,fill:B.acc,fontFamily:"Outfit"}}>HYPOAROUSAL</text>
                  <text x="200" y="252" textAnchor="middle" style={{fontSize:9,fill:B.txm,fontFamily:"Outfit"}}>Dorsal vagal shutdown</text>
                  <text x="200" y="268" textAnchor="middle" style={{fontSize:8,fill:B.txl,fontFamily:"Outfit"}}>Numb · foggy · disconnected · going through motions</text>
                  <text x="38" y="244" textAnchor="middle" style={{fontSize:8,fill:B.acc,fontFamily:"Outfit",fontWeight:500}}>{"↓"}</text>
                  <text x="38" y="258" textAnchor="middle" style={{fontSize:7,fill:B.txl,fontFamily:"Outfit",letterSpacing:"0.5px"}}>FREEZE</text>
                  <path d="M370 60 C385 60 385 150 370 150" fill="none" stroke={B.pri} strokeWidth="0.8" strokeOpacity="0.4"/>
                  <path d="M370 150 C385 150 385 245 370 245" fill="none" stroke={B.acc} strokeWidth="0.8" strokeOpacity="0.4"/>
                  <text x="200" y="310" textAnchor="middle" style={{fontSize:8,fill:B.txl,fontFamily:"Outfit",fontStyle:"italic"}}>The goal is not to never leave your window. The goal is to have a practiced path back.</text>
                </svg>
              </div>
            </div>

            <Lbl>Research layer</Lbl>
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

        {/* Streak */}
        <div style={{display:"flex",alignItems:"center",gap:20,margin:"8px 0 28px",padding:"28px 0",borderTop:`1px solid ${B.tx}12`,borderBottom:`1px solid ${B.tx}12`}}>
          <p style={{fontFamily:H,fontSize:"clamp(72px,24vw,108px)",fontWeight:600,color:B.accent,lineHeight:.8,letterSpacing:-3}}>{streak}</p>
          <div>
            <p style={{fontSize:13,letterSpacing:2.5,textTransform:"uppercase",fontWeight:600,color:B.tx}}>consecutive</p>
            <p style={{fontSize:13,letterSpacing:2.5,textTransform:"uppercase",fontWeight:600,color:B.txl}}>days regulated</p>
          </div>
        </div>

        <div style={{textAlign:"center",paddingTop:20}}>
          <p style={{fontSize:11,color:B.txl,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>Calm is a practice, not a personality.</p>
          <p style={{fontSize:11,color:B.txl,marginTop:8,letterSpacing:2}}>@lovelarice</p>
        </div>
      </div>
    </div>
  );
}
