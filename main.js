// Configuração da cena
const scene = new THREE.Scene();

// Iluminação
const light = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(light);

// Configuração da câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 40); // Posição da câmera ajustada

// Configuração do renderizador
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), antialias: true });
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
const coldRoomGeometry = new THREE.BoxGeometry(12, 6, 12);
const coldRoomMaterial = new THREE.MeshBasicMaterial({ color: 0xadd8e6 });
const coldRoom = new THREE.Mesh(coldRoomGeometry, coldRoomMaterial);
coldRoom.position.set(-25, 3, 0);
scene.add(coldRoom);

// Criando o Cemitério
const cemeteryGeometry = new THREE.BoxGeometry(12, 6, 12);
const cemeteryMaterial = new THREE.MeshBasicMaterial({ color: 0x696969 });
const cemetery = new THREE.Mesh(cemeteryGeometry, cemeteryMaterial);
cemetery.position.set(25, 3, 0);
scene.add(cemetery);

// Criando o Mundo Principal (Cidade)
const cityGeometry = new THREE.BoxGeometry(20, 6, 20);
const cityMaterial = new THREE.MeshBasicMaterial({ color: 0xf5deb3 });
const city = new THREE.Mesh(cityGeometry, cityMaterial);
city.position.set(0, 3, 15);
scene.add(city);

// Controles de câmera para Mobile e PC
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
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

// Ajuste de tela responsivo
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
