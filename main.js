import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// Configuração do renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criando a cena e câmera
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xaaaaaa, 10, 100); // Névoa leve para atmosfera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 30);

// Adicionando luz ambiente
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Controles da câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Criando o chão
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x66aa66, side: THREE.DoubleSide });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Criando a "Sala Fria" ❄️
const iceGround = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x99ccff, side: THREE.DoubleSide })
);
iceGround.position.set(-30, 0.01, 0);
iceGround.rotation.x = -Math.PI / 2;
scene.add(iceGround);

const iceLabel = criarTexto("Sala Fria", -30, 2, 0);
scene.add(iceLabel);

// Criando o "Cemitério" ⚰️
const cemeteryGround = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x222222, side: THREE.DoubleSide })
);
cemeteryGround.position.set(30, 0.01, 0);
cemeteryGround.rotation.x = -Math.PI / 2;
scene.add(cemeteryGround);

const cemeteryLabel = criarTexto("Cemitério", 30, 2, 0);
scene.add(cemeteryLabel);

// Criando lápides no Cemitério
function criarLapide(x, z) {
    const lapide = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
    );
    lapide.position.set(x + 30, 1, z);
    scene.add(lapide);
}

for (let i = -5; i <= 5; i += 3) {
    for (let j = -5; j <= 5; j += 3) {
        criarLapide(i, j);
    }
}

// Criando uma função para adicionar texto 3D
function criarTexto(texto, x, y, z) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(texto, 10, 20);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(10, 5, 1);
    sprite.position.set(x, y, z);
    return sprite;
}

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
