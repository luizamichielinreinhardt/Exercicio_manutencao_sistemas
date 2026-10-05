// Monta o menu hambúrguer (inspirado no site_iot) e o rodapé em todas as páginas
(function () {
    const dentroDeHtml = window.location.pathname.includes('/html/')
    const pasta = dentroDeHtml ? './' : './html/'
    const home = dentroDeHtml ? '../index.html' : './index.html'

    const header = document.querySelector('header')
    if (!header) return

    header.innerHTML = `
        <div class="off-screen-menu">
            <ul>
                <li><a href="${home}">Início</a></li>
                <li><a href="${pasta}login.html">Login</a></li>
                <li><a href="#" id="link_sair">Sair</a></li>
            </ul>
            <ul>
                <span class="titulo_menu">Usuários</span>
                <li><a href="${pasta}usuario_cadastrar.html">Cadastrar</a></li>
                <li><a href="${pasta}usuario_listar.html">Listar</a></li>
                <li><a href="${pasta}usuario_consultar.html">Consultar</a></li>
                <li><a href="${pasta}usuario_atualizar.html">Atualizar</a></li>
                <li><a href="${pasta}usuario_apagar.html">Apagar</a></li>
            </ul>
            <ul>
                <span class="titulo_menu">Produtos</span>
                <li><a href="${pasta}produto_cadastrar.html">Cadastrar</a></li>
                <li><a href="${pasta}produto_listar.html">Listar</a></li>
                <li><a href="${pasta}produto_consultar.html">Consultar</a></li>
                <li><a href="${pasta}produto_atualizar.html">Atualizar</a></li>
                <li><a href="${pasta}produto_apagar.html">Apagar</a></li>
            </ul>
            <ul>
                <span class="titulo_menu">Operações</span>
                <li><a href="${pasta}movimento_cadastrar.html">Cadastrar Movimento</a></li>
                <li><a href="${pasta}movimento_listar.html">Listar Movimento</a></li>
                <li><a href="${pasta}mov_categoria_listar.html">Listar Por Categoria</a></li>
                <li><a href="${pasta}mov_historico_saida.html">Histórico de Saídas</a></li>
            </ul>
        </div>
        <nav>
            <div class="ham-menu"><span></span><span></span><span></span></div>
            <h1 class="marca">FootWear Tech</h1>
        </nav>
    `

    const ham = header.querySelector('.ham-menu')
    const menu = header.querySelector('.off-screen-menu')
    ham.addEventListener('click', () => {
        ham.classList.toggle('active')
        menu.classList.toggle('active')
    })
    header.querySelector('#link_sair').addEventListener('click', (e) => {
        e.preventDefault()
        sair()
    })

    if (!document.querySelector('footer')) {
        const footer = document.createElement('footer')
        footer.textContent = 'FootWear Tech - E-commerce de Tênis'
        document.body.appendChild(footer)
    }
})()
