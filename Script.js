const CLIENT_ID = "awempqehalsuqcnc";  // Client ID do TikTok
const REDIRECT_URI = "https://playvictor15.github.io/Foguinho-Tiktok-/";  // Substitua pela URL do seu site

document.getElementById("login-btn").addEventListener("click", function () {
    const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${CLIENT_ID}&scope=user.info.basic&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
});

// Verifica se há código de autenticação na URL
const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get("code");

if (authCode) {
    console.log("Código de autenticação recebido:", authCode);
    fetchToken(authCode);
}

// Troca o código por um token de acesso (precisa de backend)
async function fetchToken(code) {
    const TOKEN_URL = "https://open-api.tiktok.com/oauth/access_token/";

    const data = {
        client_key: CLIENT_ID,
        client_secret: "SUA_CHAVE_SECRETA_AQUI",  // Nunca exponha sua chave secreta no frontend
        code: code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI
    };

    console.log("Solicitando token...");

    try {
        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Token de acesso:", result);
        
        if (result.data && result.data.access_token) {
            fetchUserInfo(result.data.access_token);
        }
    } catch (error) {
        console.error("Erro ao obter token:", error);
    }
}

// Obtém os dados do usuário autenticado
async function fetchUserInfo(accessToken) {
    const USER_INFO_URL = "https://open-api.tiktok.com/user/info/";

    try {
        const response = await fetch(USER_INFO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: accessToken, fields: ["display_name", "avatar_url"] })
        });

        const result = await response.json();
        console.log("Usuário:", result);

        if (result.data) {
            document.body.innerHTML = `<h1>Bem-vindo, ${result.data.display_name}!</h1>
                                       <img src="${result.data.avatar_url}" width="100" height="100">`;
        }
    } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
    }
}
