# Brand Kit — Wevitria

Pull Request: Add Brand Kit — email signature, logos, assets

This PR adds a small Brand Kit for Wevitria with an optimized email signature, dark variant, vCard, logos and icons.

Files added:
- /branding/email-signature.html — optimized HTML fragment for email clients (Gmail/Zoho/Outlook)
- /branding/email-signature-dark.html
- /branding/vcard.vcf
- /branding/README.md — instructions for installing the signature and notes on hosting assets
- /assets/logo/* — logo SVGs and favicon
- /assets/icons/* — whatsapp, linkedin, globe, phone, mail
- index.html — simple preview and copy button

Testing notes:
- The signature HTML uses absolute asset URLs at https://wevitria.com.br/assets/. Ensure these files are published at that path for images to load in email clients.
- If you prefer to host images on GitHub Pages, update the src attributes to point to the GitHub Pages URLs.

How to review:
- Preview branding/email-signature.html and branding/email-signature-dark.html in a browser and copy the HTML into your mail client signature editor to test.
- Verify images load correctly and links (tel:, mailto:, website, LinkedIn) work as expected.

Merge plan:
- Merge into `main` after review. This PR does not change any production code.

