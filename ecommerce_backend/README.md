# Pastel Outfit Ecommerce Backend

Express.js backend providing REST APIs for:
- Authentication and user accounts (JWT)
- Product catalog management
- Shopping cart operations
- Orders
- Checkout via Stripe

Quick start:
1) Copy .env.example to .env and fill in JWT_SECRET and optional STRIPE_SECRET_KEY and SITE_URL.
2) Install deps: npm install
3) Dev: npm run dev
4) Docs: open /docs

Security:
- JWT Bearer authentication on protected routes
- Helmet and rate limiting enabled

OpenAPI:
- Inline swagger JSDoc comments are compiled at /docs.
- Regenerate static interface file with: npm run openapi
