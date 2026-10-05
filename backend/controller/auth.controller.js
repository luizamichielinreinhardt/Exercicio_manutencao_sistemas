const Usuario = require('../models/Usuario')
const { descriptografar } = require('../utils/crypto')
const { gerarToken } = require('../middleware/auth')

const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios!' })
    }

    try {
        const usuario = await Usuario.findOne({ where: { email: email } })
        // mensagem genérica: não revela se o erro foi no e-mail ou na senha
        const erro = { message: 'E-mail ou senha inválidos!' }

        if (!usuario) {
            return res.status(401).json(erro)
        }

        const senhaBanco = descriptografar(usuario.senha)
        if (senhaBanco !== senha) {
            return res.status(401).json(erro)
        }

        const token = gerarToken(usuario)
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            expiraEm: '90 minutos',
            usuario: { codUsuario: usuario.codUsuario, nome: usuario.nome, email: usuario.email }
        })
    } catch (err) {
        console.error('Erro ao realizar o login', err)
        res.status(500).json({ message: 'Não foi possível realizar o login' })
    }
}

module.exports = { login }
