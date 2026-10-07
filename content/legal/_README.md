# Policy pages

One Markdown file per policy. The page is served at the `url` written at the top of the file,
and it appears in the footer, on /legal and in the sitemap automatically.

    ---
    title: Privacy Policy
    url: /privacy-policy
    updated: 10 September 2026
    order: 1
    ---

    ## 1. Who we are
    ...

Do not write these by hand: export the policy document from Google Docs
(File → Download → Markdown) and run

    npm run policies:import -- path/to/10X-Engage-Policy-Pages.md

Files whose name starts with "_" (like this one) are ignored by the site.
