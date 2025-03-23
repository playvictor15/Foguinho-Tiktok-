import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors()); // Permitir requisições do frontend
app.use(express.json());

// Rota para iniciar o login do TikTok
app.get('/auth/tiktok', (req, res) => {
    const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${process.env.CLIENT_KEY}&scope=user.info.basic&response_type=code&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;
    res.redirect(authUrl);
});

// Rota para obter o token de acesso após login
app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Código de autenticação ausente' });
    }

    try {
        const response = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
            client_key: process.env.CLIENT_KEY,
            client_secret: process.env.CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.REDIRECT_URI,
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter token', details: error.response?.data || error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

  
