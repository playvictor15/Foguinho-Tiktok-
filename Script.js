import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Configuração da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Controles da câmera
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 10, 20);
controls.update();

// Criando o chão
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Criando a Sala Fria ❄️
const coldRoomGeometry = new THREE.BoxGeometry(10, 5, 10);
const coldRoomMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const coldRoom = new THREE.Mesh(coldRoomGeometry, coldRoomMaterial);
coldRoom.position.set(-15, 2.5, 0);
scene.add(coldRoom);

// Criando o Cemitério ⚰️
const cemeteryGeometry = new THREE.BoxGeometry(10, 2, 10);
const cemeteryMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const cemetery = new THREE.Mesh(cemeteryGeometry, cemeteryMaterial);
cemetery.position.set(15, 1, 0);
scene.add(cemetery);

// Criando o Mundo Principal 🌆
const cityGeometry = new THREE.BoxGeometry(15, 8, 15);
const cityMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
const city = new THREE.Mesh(cityGeometry, cityMaterial);
city.position.set(0, 4, 0);
scene.add(city);

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
