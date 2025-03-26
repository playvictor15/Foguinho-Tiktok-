// Configuração da cena
const scene = new THREE.Scene();

// Configuração da câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20); // Ajusta a posição da câmera

// Configuração do renderizador
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criação do chão
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Deita o chão
scene.add(ground);

// Criando a Sala Fria
const coldRoomGeometry = new THREE.BoxGeometry(10, 5, 10);
const coldRoomMaterial = new THREE.MeshBasicMaterial({ color: 0xadd8e6 });
const coldRoom = new THREE.Mesh(coldRoomGeometry, coldRoomMaterial);
coldRoom.position.set(-15, 2.5, 0);
scene.add(coldRoom);

// Criando o Cemitério
const cemeteryGeometry = new THREE.BoxGeometry(10, 5, 10);
const cemeteryMaterial = new THREE.MeshBasicMaterial({ color: 0x696969 });
const cemetery = new THREE.Mesh(cemeteryGeometry, cemeteryMaterial);
cemetery.position.set(15, 2.5, 0);
scene.add(cemetery);

// Loop de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Ajuste de tela responsivo
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
