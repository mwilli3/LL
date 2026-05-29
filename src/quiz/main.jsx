import React from "react";
import { createRoot } from "react-dom/client";
import { initAnalytics } from "../../apps/analytics.js";
import App from "../../apps/archetype-quiz.jsx";

initAnalytics(); // no-ops if VITE_POSTHOG_KEY is unset
createRoot(document.getElementById("root")).render(React.createElement(App));
