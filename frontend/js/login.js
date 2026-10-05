let resposta = document.getElementById('resposta')
let btn_login = document.getElementById('btn_login')

btn_login.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, senha: senha })
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.token) {
            salvarSessao(dados.token)
            window.location.href = '../index.html'
        } else {
            resposta.innerHTML = `<p>${dados.message}</p>`
        }
    })
    .catch((err) => {
        console.error('Erro ao fazer login', err)
        resposta.innerHTML = '<p>Erro ao tentar fazer login.</p>'
    })
})
