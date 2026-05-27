import React from "react";
import { createRoot } from "react-dom/client";
import App from "../../apps/regulation-mastery.jsx";

// Gating lives inside the app's own styled gate screen, which calls
// /.netlify/functions/verify-purchase and redirects non-buyers to Shopify
// (fail closed). See apps/regulation-mastery.jsx → verifyPurchase().
createRoot(document.getElementById("root")).render(React.createElement(App));
