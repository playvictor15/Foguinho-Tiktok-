import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// Configuração do renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criando a cena e câmera
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x222222, 10, 50); // Névoa para clima sombrio

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

// Adicionando luz ambiente fraca
const light = new THREE.AmbientLight(0x555555, 1);
scene.add(light);

// Controles da câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Criando o chão escuro
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x222222, side: THREE.DoubleSide })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Criando lápides ⚰️
function criarLapide(x, z) {
    const lapide = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
    );
    lapide.position.set(x, 1, z);
    scene.add(lapide);
}

// Posicionando várias lápides
for (let i = -10; i <= 10; i += 5) {
    for (let j = -10; j <= 10; j += 5) {
        criarLapide(i, j);
    }
}

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
