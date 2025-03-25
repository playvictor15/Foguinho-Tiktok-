import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Configuração do renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criando a cena e câmera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

// Adicionando luz ambiente
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Controles da câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Criando o chão
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Criando a Sala Fria ❄️
const coldRoom = new THREE.Mesh(
    new THREE.BoxGeometry(10, 5, 10),
    new THREE.MeshStandardMaterial({ color: 0x00ffff })
);
coldRoom.position.set(-15, 2.5, 0);
scene.add(coldRoom);

// Criando o Cemitério ⚰️
const cemetery = new THREE.Mesh(
    new THREE.BoxGeometry(10, 2, 10),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
);
cemetery.position.set(15, 1, 0);
scene.add(cemetery);

// Criando o Mundo Principal 🌆
const city = new THREE.Mesh(
    new THREE.BoxGeometry(15, 8, 15),
    new THREE.MeshStandardMaterial({ color: 0xffd700 })
);
city.position.set(0, 4, 0);
scene.add(city);

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
