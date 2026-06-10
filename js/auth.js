// auth.js — verificação de acesso premium
// Quando o backend estiver pronto, os tokens JWT serão gerados pelo servidor.
// Por enquanto, usa localStorage para simular acesso (substituível sem mudar o HTML).

const AUTH_KEY = 'conexao_token';

function _decodeJWT(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch { return null; }
}

function temAcesso(produtoId) {
  const token = localStorage.getItem(AUTH_KEY);
  if (!token) return false;
  const payload = _decodeJWT(token);
  if (!payload) return false;
  const agora = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < agora) {
    localStorage.removeItem(AUTH_KEY);
    return false;
  }
  // 'all' = acesso a tudo; ou lista de produtos específicos
  return payload.produtos === 'all' || (Array.isArray(payload.produtos) && payload.produtos.includes(produtoId));
}

function getEmailLogado() {
  const token = localStorage.getItem(AUTH_KEY);
  if (!token) return null;
  const payload = _decodeJWT(token);
  return payload ? payload.email : null;
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = '/login/';
}

// Proteção de página: chama na página protegida
async function protegerPagina(produtoId) {
  const content = document.getElementById('conteudo-premium');
  const wall = document.getElementById('premium-wall');
  if (!content || !wall) return;

  const liberar = () => {
    content.style.display = 'block';
    wall.style.display = 'none';
    const emailEl = document.getElementById('email-logado');
    if (emailEl) emailEl.textContent = getEmailLogado() || '';
  };

  if (temAcesso(produtoId)) {
    liberar();
    return;
  }

  // Token atual não tem esse produto: pode ter comprado um upsell depois
  // do login. Tenta atualizar o token consultando o acesso atual.
  const email = getEmailLogado();
  if (email) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem(AUTH_KEY, data.token);
          if (temAcesso(produtoId)) {
            liberar();
            return;
          }
        }
      }
    } catch (_) {}
  }

  content.style.display = 'none';
  wall.style.display = 'block';
}
