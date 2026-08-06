# Branding — Wevitria

Este diretório contém o Brand Kit e instruções para usar a assinatura de e‑mail da Wevitria.

Arquivos incluídos:

- `email-signature.html` — Assinatura HTML otimizada (versão clara) apontando para as imagens hospedadas em https://wevitria.com.br/assets/
- `email-signature-dark.html` — Versão para temas escuros
- `vcard.vcf` — vCard para Vitor Costa

Contatos
- Contato direto (assinatura): vitor@wevitria.com.br
- Contato administrativo: admin@wevitria.com.br

Instalação rápida (Zoho Mail)
1. Entre no Zoho Mail com a conta administrativa.
2. Configurações → Assinaturas → Criar nova assinatura.
3. Clique no editor HTML (ou ícone "</>") e cole o conteúdo de `email-signature.html`.
4. Salve.

Gmail (Web)
1. Gmail → Configurações → Ver todas as configurações → Assinatura.
2. Criar nova assinatura → usar o editor e colar o HTML.
3. Se o Gmail transformar o HTML, verifique se as imagens apontam para https://wevitria.com.br/assets/ e ajuste se necessário.

Outlook Web
1. Outlook → Configurações → Ver todas as configurações → Email → Redigir e responder.
2. Cole o HTML da assinatura.

Observações
- As imagens na assinatura apontam para `https://wevitria.com.br/assets/` — certifique-se de que os arquivos de imagem foram publicados nesse caminho no seu site (ou ajuste os src no HTML para apontar para os locais corretos).
- Se preferir hospedar as imagens no GitHub Pages, atualize o `src` no HTML para o caminho raw do GitHub ou para o domínio do Pages.

Atualizações futuras
- Para alterar telefone, cargo, ou e‑mail, edite `email-signature.html` e `email-signature-dark.html` e atualize o vCard se aplicável.
