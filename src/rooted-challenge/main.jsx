import React from "react";
import { createRoot } from "react-dom/client";
import App from "../../apps/rooted-challenge.jsx";

// Gating lives inside the app's own styled gate screen, which calls
// /.netlify/functions/verify-purchase and redirects non-buyers to Shopify
// (fail closed). See apps/rooted-challenge.jsx → verifyPurchase().
createRoot(document.getElementById("root")).render(React.createElement(App));
