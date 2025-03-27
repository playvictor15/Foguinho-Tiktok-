// Importação correta do Three.js e OrbitControls
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';

// Criando a cena
const scene = new THREE.Scene();

// Adicionando iluminação
const light = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(light);

// Configurando a câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 40); // Ajustando a posição inicial

// Configurando o renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Criando o chão
const groundGeometry = new THREE.PlaneGeometry(80, 80);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Criando a Sala Fria
const coldRoom = new THREE.Mesh(
    new THREE.BoxGeometry(12, 6, 12),
    new THREE.MeshBasicMaterial({ color: 0xadd8e6 })
);
coldRoom.position.set(-25, 3, 0);
scene.add(coldRoom);

// Criando o Cemitério
const cemetery = new THREE.Mesh(
    new THREE.BoxGeometry(12, 6, 12),
    new THREE.MeshBasicMaterial({ color: 0x696969 })
);
cemetery.position.set(25, 3, 0);
scene.add(cemetery);

// Criando o Mundo Principal (Cidade)
const city = new THREE.Mesh(
    new THREE.BoxGeometry(20, 6, 20),
    new THREE.MeshBasicMaterial({ color: 0xf5deb3 })
);
city.position.set(0, 3, 15);
scene.add(city);

// Ajustando os controles de câmera (agora funciona!)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 80;
controls.maxPolarAngle = Math.PI / 2;

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
