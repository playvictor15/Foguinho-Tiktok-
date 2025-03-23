require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const CLIENT_KEY = process.env.CLIENT_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/tiktok/callback";

app.get('/auth/tiktok', (req, res) => {
    const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    res.redirect(authUrl);
});

app.get('/auth/tiktok/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const tokenResponse = await axios.post('https://open.tiktokapis.com/v2/oauth/token/', {
            client_key: CLIENT_KEY,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
        });

        const accessToken = tokenResponse.data.access_token;

        // Buscar dados do usuário
        const userResponse = await axios.get('https://open.tiktokapis.com/v2/user/info/', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        res.json(userResponse.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter token' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
