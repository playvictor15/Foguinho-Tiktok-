import { iniciarLoginTikTok, usuarioLogado, obterFoquinhosDoUsuario } from './login.js';
import { criarMundo3D, adicionarFoquinhosNoMundo, animar } from './world.js';

let cena, renderer, camera;

async function iniciarJogo() {
  // Verifica se o usuário já está logado
  if (!usuarioLogado()) {
    document.getElementById('login-btn').addEventListener('click', iniciarLoginTikTok);
    return;
  }

  document.getElementById('login-container').style.display = 'none';

  // Cria o mundo 3D
  const { scene, rendererInstance, cameraInstance } = criarMundo3D();
  cena = scene;
  renderer = rendererInstance;
  camera = cameraInstance;

  // Carrega os Foquinhos do usuário e amigos
  const foquinhos = await obterFoquinhosDoUsuario();

  // Adiciona os Foquinhos no mundo
  adicionarFoquinhosNoMundo(cena, foquinhos);

  // Inicia animação do jogo
  animar(renderer, cena, camera);
}

iniciarJogo();
