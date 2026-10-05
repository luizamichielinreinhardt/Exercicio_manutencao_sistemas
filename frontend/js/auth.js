// Gerencia o token de sessão (expira em 90 minutos no servidor)
const API = 'http://localhost:3000'

function salvarSessao(token) {
    localStorage.setItem('token', token)
}

function sair() {
    localStorage.removeItem('token')
    window.location.href = window.location.pathname.includes('/html/') ? './login.html' : './html/login.html'
}

// Adiciona o header Authorization nas requisições ao backend
const fetchOriginal = window.fetch
window.fetch = function (url, opcoes = {}) {
    const token = localStorage.getItem('token')
    if (token && String(url).startsWith(API)) {
        opcoes.headers = { ...(opcoes.headers || {}), Authorization: `Bearer ${token}` }
    }
    return fetchOriginal(url, opcoes).then(res => {
        // token ausente/expirado -> volta para o login
        if (res.status === 401 && !String(url).endsWith('/login') && !(String(url).endsWith('/usuario') && opcoes.method === 'POST')) {
            localStorage.removeItem('token')
            alert('Sessão expirada ou inválida. Faça login novamente.')
            window.location.href = window.location.pathname.includes('/html/') ? './login.html' : './html/login.html'
        }
        return res
    })
}
