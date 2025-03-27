// Importação correta do Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';

// Criando a cena
const scene = new THREE.Scene();

// Iluminação
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 30);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controles de câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 10;
controls.maxDistance = 50;

// Criando os mundos (três plataformas)
function criarMundo(cor, x, nome) {
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: cor, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(x, 0, 0);
    scene.add(ground);

    // Adiciona um nome acima de cada mundo
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new THREE.TextGeometry(nome, {
            font: font,
            size: 2,
            height: 0.5
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(x - 8, 5, 0);
        scene.add(textMesh);
    });

    return ground;
}

// Criar os mundos
const salaFria = criarMundo(0xadd8e6, -40, "Sala Fria"); // Azul claro
const cemiterio = criarMundo(0x555555, 0, "Cemitério"); // Cinza escuro
const mundoPrincipal = criarMundo(0x228B22, 40, "Cidade"); // Verde

// Criando o Foquinho
const foquinho = new THREE.Group();

// Corpo (esfera achatada)
const bodyGeometry = new THREE.SphereGeometry(2, 32, 32);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.scale.y = 0.6;
foquinho.add(body);

// Nadadeiras (cilindros)
const flipperGeometry = new THREE.CylinderGeometry(0.3, 0.7, 1, 12);
const flipperMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

// Nadadeira esquerda
const flipperLeft = new THREE.Mesh(flipperGeometry, flipperMaterial);
flipperLeft.position.set(-1.5, -0.5, 0);
flipperLeft.rotation.z = Math.PI / 4;
foquinho.add(flipperLeft);

// Nadadeira direita
const flipperRight = new THREE.Mesh(flipperGeometry, flipperMaterial);
flipperRight.position.set(1.5, -0.5, 0);
flipperRight.rotation.z = -Math.PI / 4;
foquinho.add(flipperRight);

// Olhos (esferas pequenas)
const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
eyeLeft.position.set(-0.6, 0.5, 1.8);
foquinho.add(eyeLeft);

const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
eyeRight.position.set(0.6, 0.5, 1.8);
foquinho.add(eyeRight);

// Adicionando o Foquinho à cena no Cemitério (posição inicial)
foquinho.position.set(0, 1, 0);
scene.add(foquinho);

// Movimentação do Foquinho (com teclas WASD ou setas)
const speed = 0.5;
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            foquinho.position.z -= speed;
            break;
        case 'ArrowDown':
        case 's':
            foquinho.position.z += speed;
            break;
        case 'ArrowLeft':
        case 'a':
            foquinho.position.x -= speed;
            break;
        case 'ArrowRight':
        case 'd':
            foquinho.position.x += speed;
            break;
    }
});

// Loop de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Responsividade
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
