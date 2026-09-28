# CTIT Institutional Landing Page v2

Files:
- index.html
- styles.css
- script.js
- logo-ctit.svg (official uploaded CTIT logo)

## Webhook
The landing page is already configured to POST to:

`https://n8n-n8n.ltdnzr.easypanel.host/webhook/b4d5a016-1a1b-496c-ab33-11d51f1194a0`

The form sends JSON by POST:
- source
- form
- name
- email
- submitted_at
- page_url
- referrer
- user_agent

The UI displays success for HTTP 2xx and an error message for network/non-2xx responses.

If the webhook is on another domain, it must allow CORS requests from ctitexas.org.

## Logo
The header uses the official uploaded SVG directly.
The footer uses the same official SVG with a CSS light/gold treatment for the dark footer.
