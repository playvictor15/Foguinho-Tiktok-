import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { iniciarLoginTikTok, usuarioLogado, obterFoquinhosDoUsuario } from './login.js';
import { criarMundo3D, adicionarFoquinhosNoMundo, animar } from './world.js';

let foquinhosData = [];
let principal = null; // Foquinho principal controlável
let destino = null;

async function init() {
  if (!usuarioLogado()) {
    document.getElementById('login-btn').onclick = iniciarLoginTikTok;
    return;
  }

  foquinhosData = await obterFoquinhosDoUsuario();
  const { scene, rendererInstance, cameraInstance } = criarMundo3D();

  // Adiciona Foquinhos e identifica o controlável
  const todosFoquinhos = [];
  let posX = 0;
  foquinhosData.forEach((f, i) => {
    if (f.tipo === 'ativo' && !principal) {
      const { foquinho, foquinhoData } = criarFoquinhoComControle(f);
      foquinho.position.set(posX, 0.5, 0);
      principal = foquinho;
      todosFoquinhos.push(foquinho);
    } else {
      const { foquinho } = criarFoquinhoComControle(f);
      foquinho.position.set(posX, 0.5, 0);
      todosFoquinhos.push(foquinho);
    }
    posX += 1.5;
  });

  todosFoquinhos.forEach(f => scene.add(f));

  // Controle por clique/toque
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMove(event) {
    const canvas = rendererInstance.domElement;
    const bounds = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches?.[0].clientX) - bounds.left;
    const y = (event.clientY || event.touches?.[0].clientY) - bounds.top;

    mouse.x = (x / canvas.clientWidth) * 2 - 1;
    mouse.y = -(y / canvas.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraInstance);
    const intersects = raycaster.intersectObject(scene.children.find(obj => obj.name === 'chao'));
    if (intersects.length > 0) {
      destino = intersects[0].point.clone();
    }
  }

  canvas.addEventListener('click', onMove);
  canvas.addEventListener('touchstart', onMove);

  // Animação com movimento
  function animarTudo() {
    requestAnimationFrame(animarTudo);

    if (principal && destino) {
      const dir = destino.clone().sub(principal.position);
      if (dir.length() > 0.1) {
        dir.normalize();
        principal.position.add(dir.multiplyScalar(0.05));
      }
    }

    rendererInstance.render(scene, cameraInstance);
  }

  animarTudo();
}

function criarFoquinhoComControle(data) {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  let cor;
  switch (data.tipo) {
    case 'congelado': cor = 0x88ccff; break;
    case 'apagado': cor = 0x444444; break;
    default: cor = 0xffffff; break;
  }
  const material = new THREE.MeshStandardMaterial({ color: cor });
  const foquinho = new THREE.Mesh(geometry, material);
  return { foquinho, foquinhoData: data };
}

window.onload = init;
