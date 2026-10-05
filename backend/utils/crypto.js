const CryptoJS = require('crypto-js')

// Chave secreta: em produção defina a variável de ambiente CRYPTO_KEY
const CHAVE = process.env.CRYPTO_KEY || 'footwear-tech-chave-secreta'

// Criptografa um texto com AES (crypto-js)
const criptografar = (texto) => {
    return CryptoJS.AES.encrypt(String(texto), CHAVE).toString()
}

// Descriptografa um texto gerado por criptografar()
const descriptografar = (cifra) => {
    const bytes = CryptoJS.AES.decrypt(cifra, CHAVE)
    return bytes.toString(CryptoJS.enc.Utf8)
}

module.exports = { criptografar, descriptografar }
