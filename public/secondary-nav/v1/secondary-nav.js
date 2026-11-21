/*!
 * Stoneroller Secondary Navigation for Squarespace 7.1
 * Version 1.1.0
 * Built by Stoneroller Cooperative (stonerollercoop.com) for Saint Barnabas Episcopal Church.
 *
 * Label icons: Font Awesome Free 6 by Fonticons, Inc. (fontawesome.com),
 * licensed CC BY 4.0. Social icons: Simple Icons (simpleicons.org), CC0.
 *
 * Each navigation is written as a <template data-sb-nav> element placed in
 * Code Injection or in a Code Block. This script reads those templates and
 * builds the navigation bars. See the installation guide for every option.
 */
(function () {
  "use strict";
  if (window.SBSecondaryNav) return;

  var VERSION = "1.1.0";
  var MAJOR = parseInt(VERSION, 10);
  var HOST = "https://stoneroller-plugins.episcohub.workers.dev";
  var SCRIPT = document.currentScript;
  // True when the site loads the plugin from the Stoneroller address,
  // false when the self-contained copy is pasted into the site.
  var HOSTED = !!(SCRIPT && SCRIPT.src && SCRIPT.src.indexOf(HOST) === 0);
  var ICONS = {"facebook":"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z","instagram":"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077","youtube":"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z","vimeo":"M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.409 0-2.578-1.294-3.553-3.881l-1.9179-7.1138c-.719-2.584-1.488-3.878-2.312-3.878-.179 0-.806.378-1.8809 1.132l-1.129-1.457a315.06 315.06 0 003.501-3.1279c1.579-1.368 2.765-2.085 3.5539-2.159 1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.5069.5389 2.45 1.1309 3.674 1.7759 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.8679 3.434-5.7568 6.7619-5.6368 2.4729.06 3.6279 1.664 3.4929 4.7969z","x":"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z","spotify":"M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z","tiktok":"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z","threads":"M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z","bluesky":"M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026"};
  var LABEL_ICONS = {"calendar":{"v":"0 0 448 512","d":"M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"},"livestream":{"v":"0 0 576 512","d":"M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"},"video":{"v":"0 0 576 512","d":"M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"},"directory":{"v":"0 0 640 512","d":"M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"},"people":{"v":"0 0 640 512","d":"M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"},"subscribe":{"v":"0 0 512 512","d":"M215.4 96L144 96l-36.2 0L96 96l0 8.8L96 144l0 40.4 0 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3 48 96c0-26.5 21.5-48 48-48l76.6 0 49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48 416 48c26.5 0 48 21.5 48 48l0 44.3 22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4l0-89 0-40.4 0-39.2 0-8.8-11.8 0L368 96l-71.4 0-81.3 0zM0 448L0 242.1 217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1 512 448s0 0 0 0c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64c0 0 0 0 0 0zM176 160l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"},"newsletter":{"v":"0 0 512 512","d":"M96 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L80 480c-44.2 0-80-35.8-80-80L0 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 272c0 8.8 7.2 16 16 16s16-7.2 16-16L96 96zm64 24l0 80c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24l0-80c0-13.3-10.7-24-24-24L184 96c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16z"},"envelope":{"v":"0 0 512 512","d":"M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"},"contact":{"v":"0 0 512 512","d":"M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"},"give":{"v":"0 0 576 512","d":"M163.9 136.9c-29.4-29.8-29.4-78.2 0-108s77-29.8 106.4 0l17.7 18 17.7-18c29.4-29.8 77-29.8 106.4 0s29.4 78.2 0 108L310.5 240.1c-6.2 6.3-14.3 9.4-22.5 9.4s-16.3-3.1-22.5-9.4L163.9 136.9zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z"},"donate":{"v":"0 0 576 512","d":"M312 24l0 10.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3s0 0 0 0c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8l0 10.6c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-11.4c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2L264 24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z"},"heart":{"v":"0 0 512 512","d":"M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"},"location":{"v":"0 0 384 512","d":"M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"},"map":{"v":"0 0 576 512","d":"M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152l0 270.8c0 9.8-6 18.6-15.1 22.3L416 503l0-302.6zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6l0 251.4L32.9 502.7C17.1 509 0 497.4 0 480.4L0 209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77l0 249.3L192 449.4 192 255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"},"search":{"v":"0 0 512 512","d":"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"},"clock":{"v":"0 0 512 512","d":"M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"},"church":{"v":"0 0 640 512","d":"M344 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 24-32 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l32 0 0 46.4L183.3 210c-14.5 8.7-23.3 24.3-23.3 41.2L160 512l96 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 96 0 0-260.8c0-16.9-8.8-32.5-23.3-41.2L344 142.4 344 96l32 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-32 0 0-24zM24.9 330.3C9.5 338.8 0 354.9 0 372.4L0 464c0 26.5 21.5 48 48 48l80 0 0-238.4L24.9 330.3zM592 512c26.5 0 48-21.5 48-48l0-91.6c0-17.5-9.5-33.6-24.9-42.1L512 273.6 512 512l80 0z"},"cross":{"v":"0 0 384 512","d":"M176 0c-26.5 0-48 21.5-48 48l0 80-80 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l80 0 0 208c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-208 80 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-80 0 0-80c0-26.5-21.5-48-48-48L176 0z"},"bible":{"v":"0 0 448 512","d":"M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zM208 80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 48 48 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-48 0 0 112c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-112-48 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l48 0 0-48z"},"book":{"v":"0 0 576 512","d":"M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z"},"music":{"v":"0 0 512 512","d":"M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"},"prayer":{"v":"0 0 640 512","d":"M351.2 4.8c3.2-2 6.6-3.3 10-4.1c4.7-1 9.6-.9 14.1 .1c7.7 1.8 14.8 6.5 19.4 13.6L514.6 194.2c8.8 13.1 13.4 28.6 13.4 44.4l0 73.5c0 6.9 4.4 13 10.9 15.2l79.2 26.4C631.2 358 640 370.2 640 384l0 96c0 9.9-4.6 19.3-12.5 25.4s-18.1 8.1-27.7 5.5L431 465.9c-56-14.9-95-65.7-95-123.7L336 224c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 8.8 7.2 16 16 16s16-7.2 16-16l0-84.9c0-7-1.8-13.8-5.3-19.8L340.3 48.1c-1.7-3-2.9-6.1-3.6-9.3c-1-4.7-1-9.6 .1-14.1c1.9-8 6.8-15.2 14.3-19.9zm-62.4 0c7.5 4.6 12.4 11.9 14.3 19.9c1.1 4.6 1.2 9.4 .1 14.1c-.7 3.2-1.9 6.3-3.6 9.3L213.3 199.3c-3.5 6-5.3 12.9-5.3 19.8l0 84.9c0 8.8 7.2 16 16 16s16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 118.2c0 58-39 108.7-95 123.7l-168.7 45c-9.6 2.6-19.9 .5-27.7-5.5S0 490 0 480l0-96c0-13.8 8.8-26 21.9-30.4l79.2-26.4c6.5-2.2 10.9-8.3 10.9-15.2l0-73.5c0-15.8 4.7-31.2 13.4-44.4L245.2 14.5c4.6-7.1 11.7-11.8 19.4-13.6c4.6-1.1 9.4-1.2 14.1-.1c3.5 .8 6.9 2.1 10 4.1z"},"info":{"v":"0 0 512 512","d":"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"},"home":{"v":"0 0 576 512","d":"M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"},"child":{"v":"0 0 640 512","d":"M160 0a64 64 0 1 1 0 128A64 64 0 1 1 160 0zM88 480l0-80-17.8 0c-10.9 0-18.6-10.7-15.2-21.1l31.1-93.4L57.5 323.3c-10.7 14.1-30.8 16.8-44.8 6.2s-16.8-30.7-6.2-44.8L65.4 207c22.4-29.6 57.5-47 94.6-47s72.2 17.4 94.6 47l58.9 77.7c10.7 14.1 7.9 34.2-6.2 44.8s-34.2 7.9-44.8-6.2l-28.6-37.8L265 378.9c3.5 10.4-4.3 21.1-15.2 21.1L232 400l0 80c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-80-16 0 0 80c0 17.7-14.3 32-32 32s-32-14.3-32-32zM480 0a64 64 0 1 1 0 128A64 64 0 1 1 480 0zm-8 384l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-179.5L395.1 321c-9.4 15-29.2 19.4-44.1 10s-19.4-29.2-10-44.1l51.7-82.1c17.6-27.9 48.3-44.9 81.2-44.9l12.3 0c33 0 63.7 16.9 81.2 44.9L619.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L552 300.5 552 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-16 0z"},"bell":{"v":"0 0 448 512","d":"M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"},"question":{"v":"0 0 512 512","d":"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"},"link":{"v":"0 0 512 512","d":"M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"}};
  ICONS.email = "M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.4l10 6.25L22 6.4V6H2zm20 2.75-9.47 5.92a1 1 0 0 1-1.06 0L2 8.75V18h20V8.75z";
  ICONS.phone = "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z";

  var LAYOUTS = ["links-right", "links-left", "links-center", "title-center"];
  var POSITIONS = ["above-header", "below-header", "section"];
  var MOBILE = ["hide", "show", "menu-top", "menu-bottom"];

  var CSS = ".sbnav { --sbnav-bg: var(--siteBackgroundColor, #181146); --sbnav-text: var(--navigationLinkColor, var(--headingMediumColor, #ffffff)); --sbnav-btn-bg: var(--primaryButtonBackgroundColor, var(--sbnav-text)); --sbnav-btn-text: var(--primaryButtonTextColor, var(--sbnav-bg)); position: relative; z-index: 20; width: 100%; box-sizing: border-box; background-color: var(--sbnav-bg); color: var(--sbnav-text); font-family: var(--site-navigation-font-font-family, inherit); font-size: 0.95rem; line-height: 1.4; } .sbnav *, .sbnav *::before, .sbnav *::after { box-sizing: border-box; } .sbnav__inner { display: flex; align-items: center; gap: 0.5rem 1.75rem; padding: 0.55rem var(--sqs-site-gutter, 4vw); } .sbnav__title, .sbnav__links, .sbnav__actions { display: flex; align-items: center; flex-wrap: wrap; gap: 0.35rem 1.5rem; margin: 0; } .sbnav__title { font-weight: 600; } .sbnav a { color: inherit; text-decoration: none; background: none; letter-spacing: 0.02em; } .sbnav a:hover, .sbnav a[aria-current=\"page\"] { text-decoration: underline; text-underline-offset: 0.25em; } .sbnav a:focus-visible, .sbnav button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; } .sbnav--links-right .sbnav__inner { justify-content: flex-end; } .sbnav--links-right .sbnav__title { margin-right: auto; } .sbnav--links-left .sbnav__inner { justify-content: flex-start; } .sbnav--links-left .sbnav__actions { margin-left: auto; } .sbnav--links-center .sbnav__inner, .sbnav--title-center .sbnav__inner { display: grid; grid-template-columns: 1fr auto 1fr; } .sbnav--links-center .sbnav__title { grid-column: 1; justify-self: start; } .sbnav--links-center .sbnav__links { grid-column: 2; justify-content: center; } .sbnav--links-center .sbnav__actions { grid-column: 3; justify-self: end; } .sbnav--title-center .sbnav__links { grid-column: 1; justify-self: start; } .sbnav--title-center .sbnav__title { grid-column: 2; justify-content: center; text-align: center; } .sbnav--title-center .sbnav__actions { grid-column: 3; justify-self: end; } .sbnav--links-center .sbnav__inner > *, .sbnav--title-center .sbnav__inner > * { grid-row: 1; } .sbnav a.sbnav__has-icon, .sbnav__dropdown-toggle.sbnav__has-icon { display: inline-flex; align-items: center; gap: 0.45em; } .sbnav .sbnav__icon { width: 0.95em; height: 0.95em; flex: 0 0 auto; fill: currentColor; } .sbnav a.sbnav__button { display: inline-block; padding: 0.4em 1.1em; border-radius: var(--primaryButtonBorderRadius, 300px); background-color: var(--sbnav-btn-bg); color: var(--sbnav-btn-text); font-weight: 600; text-decoration: none; } .sbnav a.sbnav__button.sbnav__has-icon { display: inline-flex; } .sbnav a.sbnav__button:hover { opacity: 0.85; text-decoration: none; } .sbnav a.sbnav__social { display: inline-flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; } .sbnav a.sbnav__social svg { width: 1.1rem; height: 1.1rem; fill: currentColor; } .sbnav a.sbnav__social:hover { opacity: 0.75; } .sbnav__dropdown { position: relative; } .sbnav__dropdown-toggle { display: inline-flex; align-items: center; gap: 0.4em; margin: 0; padding: 0; border: 0; background: none; color: inherit; font: inherit; letter-spacing: 0.02em; cursor: pointer; } .sbnav__dropdown-toggle svg { width: 0.7em; height: 0.7em; transition: transform 0.15s ease; } .sbnav__dropdown.is-open .sbnav__dropdown-toggle svg { transform: rotate(180deg); } .sbnav__dropdown-panel { position: absolute; top: 100%; left: -1rem; z-index: 30; min-width: 13rem; margin-top: 0.4rem; padding: 0.5rem 0; background-color: var(--sbnav-bg); color: var(--sbnav-text); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18); border-radius: 4px; } .sbnav__dropdown-panel::before { content: \"\"; position: absolute; left: 0; right: 0; top: -0.5rem; height: 0.5rem; } .sbnav__dropdown-panel--right { left: auto; right: -1rem; } .sbnav__dropdown-panel[hidden] { display: none; } .sbnav__dropdown-panel a { display: block; padding: 0.45rem 1rem; white-space: nowrap; } .sbnav--pos-section .sbnav__inner { padding-left: 1rem; padding-right: 1rem; } .sbnav-sticky-section { position: sticky; z-index: 15; } .sbnav--is-mobile.sbnav--mobile-hide, .sbnav--is-mobile.sbnav--mobile-menu-top, .sbnav--is-mobile.sbnav--mobile-menu-bottom { display: none; } .sbnav--is-mobile .sbnav__inner { display: flex; flex-wrap: wrap; justify-content: center; text-align: center; } .sbnav--is-mobile .sbnav__title, .sbnav--is-mobile .sbnav__links, .sbnav--is-mobile .sbnav__actions { justify-content: center; margin: 0; width: 100%; } .sbnav-menu-items[hidden] { display: none !important; } .sbnav-menu-items--menu-top { padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid currentColor; } .sbnav-menu-items--menu-bottom { padding-top: 1rem; margin-top: 1rem; border-top: 1px solid currentColor; } #sbnav-notice { position: fixed; left: 1rem; bottom: 1rem; z-index: 2147483000; max-width: min(32rem, calc(100vw - 2rem)); padding: 1rem 1.2rem; background: #fff8e6; color: #1d1d1f; border: 2px solid #c98a12; border-radius: 8px; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2); font: 16px/1.5 Georgia, serif; } #sbnav-notice p { margin: 0.5rem 0; } #sbnav-notice .sbnav-notice__small { font-size: 13px; color: #555; } #sbnav-notice button { font: inherit; font-size: 14px; padding: 0.35rem 0.9rem; border: 1px solid #c98a12; background: #fff; border-radius: 4px; cursor: pointer; }";

  var instances = [];
  var uid = 0;

  function injectStyles() {
    if (document.getElementById("sbnav-styles")) return;
    var style = document.createElement("style");
    style.id = "sbnav-styles";
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function pick(value, allowed, fallback) {
    return allowed.indexOf(value) > -1 ? value : fallback;
  }

  function readOptions(tpl) {
    var d = tpl.dataset;
    return {
      position: pick(d.position, POSITIONS, "above-header"),
      layout: pick(d.layout, LAYOUTS, "links-right"),
      theme: (d.theme || "").trim(),
      mobile: pick(d.mobile, MOBILE, "hide"),
      breakpoint: parseInt(d.breakpoint, 10) || 767,
      sticky: d.sticky === "true",
      label: d.label || "Secondary navigation"
    };
  }

  function makeSvg(viewBox, path, cls) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (cls) svg.setAttribute("class", cls);
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    return svg;
  }

  function makeIcon(name) {
    var path = ICONS[name];
    return path ? makeSvg("0 0 24 24", path) : null;
  }

  function makeLabelIcon(name) {
    var icon = LABEL_ICONS[(name || "").toLowerCase().trim()];
    return icon ? makeSvg(icon.v, icon.d, "sbnav__icon") : null;
  }

  function addLabelIcon(el, name) {
    var icon = makeLabelIcon(name);
    if (icon) {
      el.insertBefore(icon, el.firstChild);
      el.classList.add("sbnav__has-icon");
    }
  }

  function buildDropdown(source) {
    var id = "sbnav-dd-" + (++uid);
    var label = source.getAttribute("data-sb-dropdown") || "More";
    var wrap = document.createElement("div");
    wrap.className = "sbnav__dropdown";

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "sbnav__dropdown-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", id);
    toggle.innerHTML = '<span></span><svg viewBox="0 0 12 8" aria-hidden="true" focusable="false"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
    toggle.firstChild.textContent = label;
    if (source.hasAttribute("data-sb-icon")) addLabelIcon(toggle, source.getAttribute("data-sb-icon"));

    var panel = document.createElement("div");
    panel.className = "sbnav__dropdown-panel";
    panel.id = id;
    panel.hidden = true;
    Array.prototype.slice.call(source.querySelectorAll("a")).forEach(function (a) {
      panel.appendChild(a);
    });

    wrap.appendChild(toggle);
    wrap.appendChild(panel);

    var hoverOpenedAt = 0;
    function open() {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      wrap.classList.add("is-open");
      panel.classList.remove("sbnav__dropdown-panel--right");
      var rect = panel.getBoundingClientRect();
      if (rect.right > document.documentElement.clientWidth - 8) {
        panel.classList.add("sbnav__dropdown-panel--right");
      }
    }
    function close() {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      wrap.classList.remove("is-open");
    }

    toggle.addEventListener("click", function () {
      // A click right after hover opened the panel should keep it open.
      if (!panel.hidden && Date.now() - hoverOpenedAt < 500) return;
      if (panel.hidden) open(); else close();
    });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) {
        close();
        toggle.focus();
      }
    });
    wrap.addEventListener("focusout", function (e) {
      if (!wrap.contains(e.relatedTarget)) close();
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) close();
    });
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      wrap.addEventListener("mouseenter", function () {
        if (panel.hidden) { open(); hoverOpenedAt = Date.now(); }
      });
      wrap.addEventListener("mouseleave", close);
    }
    return wrap;
  }

  function decorate(zone) {
    Array.prototype.slice.call(zone.querySelectorAll("[data-sb-dropdown]")).forEach(function (dd) {
      dd.parentNode.replaceChild(buildDropdown(dd), dd);
    });
    Array.prototype.slice.call(zone.querySelectorAll("a[data-sb-icon]")).forEach(function (a) {
      addLabelIcon(a, a.getAttribute("data-sb-icon"));
    });
    Array.prototype.slice.call(zone.querySelectorAll("a[data-sb-button]")).forEach(function (a) {
      a.classList.add("sbnav__button");
    });
    Array.prototype.slice.call(zone.querySelectorAll("a[data-sb-social]")).forEach(function (a) {
      var name = a.getAttribute("data-sb-social").toLowerCase();
      var icon = makeIcon(name);
      if (!icon) return;
      var text = (a.textContent || "").trim() || name;
      a.textContent = "";
      a.setAttribute("aria-label", text);
      a.classList.add("sbnav__social");
      a.appendChild(icon);
    });
    Array.prototype.slice.call(zone.querySelectorAll("a")).forEach(function (a) {
      if (a.getAttribute("target") === "_blank" && !a.rel) a.rel = "noopener";
      var href = a.getAttribute("href");
      if (href && href.charAt(0) !== "#" && a.host === location.host &&
          a.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  function build(tpl) {
    var opts = readOptions(tpl);
    var frag = tpl.content.cloneNode(true);

    var nav = document.createElement("nav");
    nav.className = "sbnav sbnav--" + opts.layout + " sbnav--pos-" + opts.position +
      " sbnav--mobile-" + opts.mobile;
    nav.setAttribute("aria-label", opts.label);
    if (opts.theme) {
      nav.setAttribute("data-section-theme", opts.theme);
      nav.classList.add(opts.theme);
    }

    var inner = document.createElement("div");
    inner.className = "sbnav__inner";

    [["data-sb-title", "sbnav__title"], ["data-sb-links", "sbnav__links"], ["data-sb-actions", "sbnav__actions"]]
      .forEach(function (zone) {
        var el = frag.querySelector("[" + zone[0] + "]");
        if (!el) return;
        el.classList.add(zone[1]);
        decorate(el);
        inner.appendChild(el);
      });

    nav.appendChild(inner);
    return { tpl: tpl, nav: nav, opts: opts, menuItems: null, section: null, empty: !inner.children.length };
  }

  function getHeader() {
    return document.getElementById("header") || document.querySelector("header");
  }

  function mount(inst) {
    var header = getHeader();
    var pos = inst.opts.position;

    if (pos === "section" && inst.tpl.parentNode && inst.tpl.parentNode !== document.head &&
        document.body.contains(inst.tpl)) {
      inst.tpl.parentNode.insertBefore(inst.nav, inst.tpl);
      if (inst.opts.sticky) {
        inst.section = inst.nav.closest(".page-section") || inst.nav.parentNode;
        inst.section.classList.add("sbnav-sticky-section");
        updateStickyOffsets();
      }
    } else if (header) {
      if (pos === "below-header") header.appendChild(inst.nav);
      else header.insertBefore(inst.nav, header.firstChild);
    } else {
      return;
    }
    mountMobileMenu(inst);
    applyBreakpoint(inst);
  }

  function findMenuRoot() {
    return document.querySelector('.header-menu-nav-folder[data-folder="root"] .header-menu-nav-folder-content') ||
           document.querySelector(".header-menu-nav-folder-content") ||
           document.querySelector(".header-menu-nav-list");
  }

  function mountMobileMenu(inst) {
    var mode = inst.opts.mobile;
    if (mode !== "menu-top" && mode !== "menu-bottom") return;
    var root = findMenuRoot();
    if (!root) return;
    if (inst.menuItems && root.contains(inst.menuItems)) return;

    var box = document.createElement("div");
    box.className = "sbnav-menu-items sbnav-menu-items--" + mode;
    Array.prototype.slice.call(inst.nav.querySelectorAll("a")).forEach(function (a) {
      var item = document.createElement("div");
      item.className = "container header-menu-nav-item";
      var link = document.createElement("a");
      link.href = a.href;
      if (a.target) { link.target = a.target; link.rel = "noopener"; }
      var content = document.createElement("div");
      content.className = "header-menu-nav-item-content";
      content.textContent = a.getAttribute("aria-label") || a.textContent.trim();
      link.appendChild(content);
      item.appendChild(link);
      box.appendChild(item);
    });
    if (mode === "menu-top") root.insertBefore(box, root.firstChild);
    else root.appendChild(box);
    inst.menuItems = box;
  }

  function applyBreakpoint(inst) {
    var small = window.innerWidth <= inst.opts.breakpoint;
    inst.nav.classList.toggle("sbnav--is-mobile", small);
    if (inst.menuItems) inst.menuItems.hidden = !small;
  }

  function headerOffset() {
    var header = getHeader();
    if (!header) return 0;
    var cs = window.getComputedStyle(header);
    if (cs.position !== "fixed" && cs.position !== "sticky") return 0;
    var rect = header.getBoundingClientRect();
    return Math.max(0, Math.round(rect.bottom));
  }

  function updateStickyOffsets() {
    var top = headerOffset();
    instances.forEach(function (inst) {
      if (inst.section) inst.section.style.top = top + "px";
    });
  }

  var resizeQueued = false;
  function onResize() {
    if (resizeQueued) return;
    resizeQueued = true;
    window.requestAnimationFrame(function () {
      resizeQueued = false;
      instances.forEach(applyBreakpoint);
      updateStickyOffsets();
    });
  }

  function ensureMounted() {
    instances.forEach(function (inst) {
      if (!document.body.contains(inst.nav)) mount(inst);
      else mountMobileMenu(inst);
    });
  }


  /* ---------- Self-check, problem reports and editor notices ---------- */

  function inEditorFrame() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }

  function isLocal() {
    return location.protocol === "file:" || /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname);
  }

  // Editors see notices; ordinary visitors never do.
  // An editor can switch notices on for one browser by visiting any page with ?sbnav-editor=on
  function isEditor() {
    try {
      if (/[?&]sbnav-editor=on\b/.test(location.search)) localStorage.setItem("sbnav-editor", "on");
      if (/[?&]sbnav-editor=off\b/.test(location.search)) localStorage.removeItem("sbnav-editor");
      if (localStorage.getItem("sbnav-editor") === "on") return true;
    } catch (e) {}
    try {
      var ctx = window.Static && window.Static.SQUARESPACE_CONTEXT;
      if (ctx && ctx.authenticatedAccount) return true;
    } catch (e) {}
    return false;
  }

  function selfCheck() {
    var issues = [];
    instances.forEach(function (inst, i) {
      var name = "Bar " + (i + 1) + " (" + inst.opts.label + ")";
      if (inst.empty) {
        issues.push(name + ": no title, links or actions were found inside the template");
        return;
      }
      if (!document.body.contains(inst.nav)) {
        issues.push(name + ": could not be placed on the page" +
          (inst.opts.position === "section" ? "" : " (Squarespace header not found)"));
        return;
      }
      if (!inst.nav.classList.contains("sbnav--is-mobile") && inst.nav.offsetHeight === 0) {
        issues.push(name + ": was placed but is not visible");
      }
      if (inst.opts.theme) {
        var bg = window.getComputedStyle(inst.nav).getPropertyValue("--siteBackgroundColor").trim();
        if (!bg) issues.push(name + ': colors for theme "' + inst.opts.theme + '" were not found');
      }
      if ((inst.opts.mobile === "menu-top" || inst.opts.mobile === "menu-bottom") && !findMenuRoot()) {
        issues.push(name + ": the Squarespace phone menu was not found");
      }
    });
    return issues;
  }

  function reportProblems(issues) {
    if (!issues.length) return;
    if (window.console) console.warn("[Stoneroller Secondary Nav " + VERSION + "] " + issues.join(" | "));
    if (inEditorFrame() || isLocal()) return;

    // Report each distinct problem at most once a day from each browser.
    var today = new Date().toISOString().slice(0, 10);
    var key = "sbnav-report-" + today + "-" + issues.join("|").slice(0, 300);
    try {
      if (localStorage.getItem(key)) return;
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var k = localStorage.key(i);
        if (k && k.indexOf("sbnav-report-") === 0 && k.indexOf("sbnav-report-" + today) !== 0) localStorage.removeItem(k);
      }
      localStorage.setItem(key, "1");
    } catch (e) {}

    var body = JSON.stringify({
      site: location.hostname,
      page: location.pathname,
      version: VERSION,
      hosted: HOSTED,
      issues: issues.slice(0, 10)
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(HOST + "/report", new Blob([body], { type: "text/plain" }));
      } else {
        fetch(HOST + "/report", { method: "POST", body: body, mode: "no-cors", keepalive: true });
      }
    } catch (e) {}
  }

  function isNewer(a, b) {
    var x = String(a).split("."), y = String(b).split(".");
    for (var i = 0; i < 3; i++) {
      var p = parseInt(x[i], 10) || 0, q = parseInt(y[i], 10) || 0;
      if (p !== q) return p > q;
    }
    return false;
  }

  function showNotice(lines) {
    var dismissKey = "sbnav-notice-dismissed-" + lines.join("|").slice(0, 200);
    try { if (Date.now() < Number(localStorage.getItem(dismissKey) || 0)) return; } catch (e) {}
    if (document.getElementById("sbnav-notice")) return;

    var box = document.createElement("div");
    box.id = "sbnav-notice";
    box.setAttribute("role", "status");
    var title = document.createElement("strong");
    title.textContent = "Secondary navigation plugin";
    box.appendChild(title);
    lines.forEach(function (line) {
      var p = document.createElement("p");
      p.textContent = line;
      box.appendChild(p);
    });
    var small = document.createElement("p");
    small.className = "sbnav-notice__small";
    small.textContent = "Only site editors see this notice.";
    box.appendChild(small);
    var close = document.createElement("button");
    close.type = "button";
    close.textContent = "Hide for a week";
    close.addEventListener("click", function () {
      try { localStorage.setItem(dismissKey, String(Date.now() + 7 * 86400000)); } catch (e) {}
      box.parentNode.removeChild(box);
    });
    box.appendChild(close);
    document.body.appendChild(box);
  }

  function editorNotices(issues) {
    if (!isEditor()) return;
    var lines = [];
    if (issues.length) {
      lines.push("Something on this page needs attention: " + issues.join("; ") + ".");
    }
    function finish() { if (lines.length) showNotice(lines); }
    if (!window.fetch) return finish();
    fetch(HOST + "/secondary-nav/latest.json", { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (info) {
        if (!HOSTED && info.version && isNewer(info.version, VERSION)) {
          lines.push("Version " + info.version + " is available. This site uses the self-contained copy (version " +
            VERSION + "), which does not update itself. Paste a fresh copy from the guide into Code Injection to update.");
        }
        if (info.latestMajor && info.latestMajor > MAJOR) {
          lines.push("Version " + info.latestMajor + " of the plugin is available. It changes how bars are written, so read the guide before switching.");
        }
        if (info.message) lines.push(info.message);
        finish();
      })
      .catch(finish);
  }

  function runChecks() {
    var issues = selfCheck();
    reportProblems(issues);
    editorNotices(issues);
  }

  function init() {
    injectStyles();
    var templates = document.querySelectorAll("template[data-sb-nav]");
    Array.prototype.slice.call(templates).forEach(function (tpl) {
      if (tpl.getAttribute("data-sb-built")) return;
      tpl.setAttribute("data-sb-built", "true");
      var inst = build(tpl);
      instances.push(inst);
      mount(inst);
    });
    if (!instances.length) return;

    // Check the finished bars once the page has settled.
    setTimeout(runChecks, 2500);

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });

    // Ask Squarespace to recalculate header height now that the bars are in place.
    window.dispatchEvent(new Event("resize"));

    // Squarespace sometimes redraws the header (for example in the editor).
    // Put the bars back if that happens.
    var timer = null;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(ensureMounted, 150);
    }).observe(document.body, { childList: true, subtree: true });
  }

  window.SBSecondaryNav = {
    version: VERSION,
    refresh: init,
    icons: Object.keys(LABEL_ICONS),
    renderIcon: function (name) { return makeLabelIcon(name) || makeIcon(name); },
    hosted: HOSTED,
    check: selfCheck,
    socialIcons: Object.keys(ICONS)
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
