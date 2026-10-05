const jwt = require('jsonwebtoken')

const SEGREDO = process.env.JWT_SECRET || 'footwear-tech-jwt-secreto'
const EXPIRACAO = '90m' // 1,5 hora

const gerarToken = (usuario) => {
    return jwt.sign(
        { codUsuario: usuario.codUsuario, email: usuario.email },
        SEGREDO,
        { expiresIn: EXPIRACAO }
    )
}

// Middleware: exige o header  Authorization: Bearer <token>
const autenticar = (req, res, next) => {
    const cabecalho = req.headers['authorization']
    const token = cabecalho && cabecalho.startsWith('Bearer ') ? cabecalho.slice(7) : null

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! Token não informado.' })
    }

    try {
        req.usuario = jwt.verify(token, SEGREDO)
        next()
    } catch (err) {
        const msg = err.name === 'TokenExpiredError'
            ? 'Sessão expirada! Faça login novamente.'
            : 'Token inválido!'
        return res.status(401).json({ message: msg })
    }
}

module.exports = { gerarToken, autenticar }
