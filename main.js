// Importação correta do Three.js e GLTFLoader
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

// Criando a cena
const scene = new THREE.Scene();

// Iluminação
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 40);

// Renderizador
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

// Controles da câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 80;
controls.maxPolarAngle = Math.PI / 2;

// Carregando o modelo do Foquinho
const loader = new GLTFLoader();
loader.load('foquinho.glb', function (gltf) {
    const foquinho = gltf.scene;
    foquinho.scale.set(3, 3, 3);  // Ajuste o tamanho do Foquinho
    foquinho.position.set(0, 0, 0);  // Posição inicial do Foquinho
    scene.add(foquinho);
}, undefined, function (error) {
    console.error('Erro ao carregar o modelo do Foquinho:', error);
});

// Animação
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
