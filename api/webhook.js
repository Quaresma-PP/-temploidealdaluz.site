const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Mapeamento: ID do produto na Hubla → ID interno do sistema
const PRODUTO_MAP = {
  'pmiKfK6Lz5YcmqkBVhsz': 'novena-principal',
  'ssAM2zyuwU6SK0Fo1U6u': 'novena-principal',          // cópia
  'WeAcNLV7Hhl9S4NRIUV6': 'poder-dos-arcanjos',
  'WeAcNLV7HhI9S4NRIUV6': 'poder-dos-arcanjos',        // variação I/l
  'i8LXH2dOBuL6wEZIz5v5': '30-oracoes-sao-francisco',
  'CFdJHqyqxBjY98hvXjC2': 'musicas-dos-anjos-premium',
  'NHS7pPLumtEtB4SG3iAA': 'musicas-dos-anjos-premium', // cópia
  'NtNiitqo1uV2XbQQEtgl': 'grimorio-dos-arcanjos',
  'NtNiitqo1uV2XbQQEtgI': 'grimorio-dos-arcanjos',     // variação I/l
  'ji7HQCwQADUSC7DhuRst': 'grimorio-dos-arcanjos',     // cópia

  // Novena - outras ofertas/variações
  'liP6lbWyRSxTlFcprUNS': 'novena-principal',          // 240
  '6oxjiChogjr9rPWaW235': 'novena-principal',          // 220
  'ww4OLcEuaD0mwaIpWKIx': 'novena-principal',          // Glenn Facebook 197
  '9ZgNCVIIDa3mLIPfLtZI': 'novena-principal',          // Glenn Facebook 97
  'VTVcnia3NOvniDvLfiRz': 'novena-principal',          // 147 de 220
  '7FNx8UFTxOkWP17fDovE': 'novena-principal',          // 147 de 240

  // Oração sagrada dos 4 arcanjos - outras ofertas/variações
  'HcWiIv1KGRRpewddIK42': 'poder-dos-arcanjos',        // Glenn Facebook
  'yLWlpDV6QznUJag5kUrv': 'poder-dos-arcanjos',        // upsell 167
  'df5CeL8kvoEetL3oxAvM': 'poder-dos-arcanjos',        // variação não mapeada
  '3TTnMTnVgHpQldYN6pzu': 'poder-dos-arcanjos',        // Glenn Facebook Recorrência 127

  // Novena - Recorrência
  'Oh7elagTB5VGCWcyJl2S': 'novena-principal',          // Glenn Facebook Recorrência 197
  'zHchXsYUfwS0sMyB7wn6': 'novena-principal',          // Glenn Facebook Recorrência 97

  // Músicas dos Anjos - Recorrência
  'wMD1OC2tRzAu46TEigth': 'musicas-dos-anjos-premium', // Glenn Facebook Recorrência 69
  'W80fE4AQkncSQOgcWhLc': 'musicas-dos-anjos-premium', // Glenn Facebook Recorrência 19
  '69WaXkxk43YqQ4NkfSIe': 'musicas-dos-anjos-premium', // Rian1 69
  'rH3WNbstKILhQRhRiKIp': 'musicas-dos-anjos-premium', // Rian2 19
  'r3ntjUzIgQpmlJC0zcLC': 'musicas-dos-anjos-premium', // Glenn - ARC Rafael 69
  'Gsx5VnyFYJfQYrYoYcw1': 'musicas-dos-anjos-premium', // Glenn - ARC Rafael 19

  // 30 Orações - Recorrência
  'ol3Lxl9rtfkffE4h29Lw': '30-oracoes-sao-francisco',  // Glenn Facebook Recorrência 29.90
  'dlHdT1VfpwB9OKI54SS1': '30-oracoes-sao-francisco',  // Rian
  'npMiGw184lBnHYos0NkG': '30-oracoes-sao-francisco',  // Glenn Facebook
  'NZwngFhhfJi7Mm1vure1': '30-oracoes-sao-francisco',  // Glenn - ARC Rafael Cópia

  // Grimório dos Arcanjos - Recorrência
  'BpzsTijdxiSnifY7RLDZ': 'grimorio-dos-arcanjos',     // Glenn Facebook Recorrência 67.90
  'ZCooGALeHY0AtGnjTT0E': 'grimorio-dos-arcanjos',     // Glenn Facebook Recorrência 27.90
  'g5H8shk4I5nXXnKC6yfY': 'grimorio-dos-arcanjos',     // Glenn Facebook 67.90
  'SzWgfihymNu96dXChKOk': 'grimorio-dos-arcanjos',     // Glenn Facebook 27.90

  // Corrente de oração e milagres (entrega via WhatsApp)
  'sPSbXKEBLqu6VXjArjB8': 'corrente-oracao-milagres',  // Glenn Facebook Recorrência 39.90

  // Recorrência - lote extra
  '99S2EIDKDZHc4nuPUCfo': '30-oracoes-sao-francisco',  // Glenn Facebook Recorrência
  'YezHy7jqHgSXj9b62fqx': 'musicas-dos-anjos-premium', // Glenn Facebook Recorrência
  'bN29XGhnotvhy3mjPo8o': 'musicas-dos-anjos-premium', // Glenn Facebook Recorrência
  'o4XxUNqPSYFA6thoPzJg': 'poder-dos-arcanjos',        // Glenn Facebook Recorrência
  '1W89YGfRD4QFzoRAIGrx': 'grimorio-dos-arcanjos',     // Glenn Facebook Recorrência
  'zCxQawxlxUoDtkx19y8n': 'grimorio-dos-arcanjos',     // Glenn Facebook Recorrência

  // [ Carlos Facebook ] - libera acesso a TODOS os produtos
  'Fs3G49OPDC932Pa1HYFk': 'all',                       // Novena 197
  '81ywZFOKb2HrgQRlwQs5': 'all',                       // Novena (Cópia) 97
  'QVoL6N9a5krRHfYjZTlQ': 'all',                       // Recorrência Músicas dos Anjos 69
  'WQPif5fnKWhPBNuv5KWU': 'all',                       // Recorrência Músicas dos Anjos 19
  'DlaPJrKNapFXuvb9Ugoi': 'all',                       // Recorrência 30 Orações 29.90
  '6ZqmTVpQW9wb00c8CcNe': 'all',                       // Recorrência Oração 4 Arcanjos 167
  'ef4KBQPgtagH2EQFB2S6': 'all',                       // Recorrência Grimório 27.90
  'xCQdVaE60jtjcrDFbKCF': 'all',                       // Recorrência Grimório 67.90
  'f10vtph8mna1ozCPUYP9': 'all',                       // teste Recorrência Corrente de oração 39.90
};

const PRODUTO_NOME = {
  'novena-principal': 'Novena de Nossa Senhora Desatadora de Nós',
  'poder-dos-arcanjos': 'Poder dos 4 Arcanjos',
  '30-oracoes-sao-francisco': '30 Orações de São Francisco',
  'musicas-dos-anjos-premium': 'Músicas dos Anjos Premium',
  'grimorio-dos-arcanjos': 'Grimório dos Arcanjos',
};

async function enviarEmailAcesso(email, nomeCliente, produtoId) {
  if (!process.env.BREVO_API_KEY) return;
  const nomeProduto = PRODUTO_NOME[produtoId] || 'seu produto';
  const nomeExibido = nomeCliente ? nomeCliente.split(' ')[0] : 'amigo(a)';
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a2e;color:#ffffff;padding:40px;border-radius:12px;">
      <div style="text-align:center;margin-bottom:30px;">
        <h1 style="color:#d4af37;font-size:28px;margin:0;">✨ Seu acesso está liberado!</h1>
      </div>
      <p style="font-size:16px;line-height:1.6;">Olá, <strong>${nomeExibido}</strong>!</p>
      <p style="font-size:16px;line-height:1.6;">Seu acesso ao <strong style="color:#d4af37;">${nomeProduto}</strong> foi liberado com sucesso.</p>
      <p style="font-size:16px;line-height:1.6;">Para acessar, clique no botão abaixo e entre com o seu e-mail de compra:</p>
      <div style="text-align:center;margin:30px 0;">
        <a href="https://temploidealdaluz.site/login/" style="background:#d4af37;color:#0a0a2e;padding:15px 35px;border-radius:8px;text-decoration:none;font-size:18px;font-weight:bold;">
          Acessar agora →
        </a>
      </div>
      <div style="background:#1a1a4e;border-radius:8px;padding:20px;margin:20px 0;">
        <p style="margin:0;font-size:14px;color:#aaa;">Seu e-mail de acesso:</p>
        <p style="margin:5px 0 0;font-size:16px;color:#d4af37;font-weight:bold;">${email}</p>
      </div>
      <p style="font-size:14px;color:#aaa;line-height:1.6;">Se tiver qualquer dúvida, responda este e-mail que te ajudamos.</p>
      <p style="font-size:14px;color:#aaa;">Que Nossa Senhora Desatadora de Nós abençoe você! 🙏</p>
    </div>
  `;
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Novena de Nossa Senhora', email: 'suportepadrelucaslima@gmail.com' },
        to: [{ email, name: nomeCliente || email }],
        subject: `✨ Seu acesso ao ${nomeProduto} está liberado!`,
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Brevo erro ${res.status}: ${body}`);
    } else {
      console.log(`Email enviado para ${email}`);
    }
  } catch (err) {
    console.error('Erro ao enviar email Brevo:', err.message);
  }
}

const TODOS_PRODUTOS = [
  'novena-principal',
  'poder-dos-arcanjos',
  '30-oracoes-sao-francisco',
  'musicas-dos-anjos-premium',
  'grimorio-dos-arcanjos',
];

async function registrarAcesso(email, produtoId) {
  if (produtoId === 'all') {
    for (const p of TODOS_PRODUTOS) {
      await supabase
        .from('compradores')
        .upsert({ email, produto_id: p, ativo: true }, { onConflict: 'email,produto_id' });
    }
    return;
  }
  await supabase
    .from('compradores')
    .upsert({ email, produto_id: produtoId, ativo: true }, { onConflict: 'email,produto_id' });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const body = req.body || {};

  // Ignora eventos que não são de pagamento confirmado
  const evento = body?.type || body?.event_type || body?.status || '';
  if (evento && !['invoice.payment_succeeded', 'purchase_approved', 'purchase.approved', 'customer.member_added', 'order.paid', 'payment.approved', 'approved', 'paid', 'APPROVED', 'authorized'].includes(evento)) {
    return res.status(200).json({ ok: true, ignorado: true });
  }

  // Hubla v2.0: dados estão dentro de body.event
  const email =
    body?.event?.user?.email ||
    body?.event?.invoice?.payer?.email ||
    body?.event?.customer?.email ||
    body?.customer?.email ||
    body?.email ||
    null;

  const produtoHubla =
    body?.event?.product?.id ||
    body?.event?.products?.[0]?.id ||
    body?.product?.id ||
    null;

  if (!email) {
    console.error('Webhook sem email:', JSON.stringify(body));
    return res.status(400).json({ erro: 'Email do comprador não encontrado no webhook' });
  }

  const emailNorm = email.toLowerCase().trim();
  const nomeCliente = body?.purchase?.client?.name || body?.customer?.name || body?.buyer?.name || '';
  const produtoId = produtoHubla ? (PRODUTO_MAP[produtoHubla] || produtoHubla) : 'all';

  try {
    await registrarAcesso(emailNorm, produtoId);
    console.log(`Acesso liberado: ${emailNorm} → ${produtoId}`);
    await enviarEmailAcesso(emailNorm, nomeCliente, produtoId);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erro ao registrar acesso:', err.message);
    return res.status(500).json({ erro: 'Erro interno' });
  }
};
