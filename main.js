import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-90);
camera.position.setX(10);
camera.position.setY(10);

renderer.render(scene, camera);



// Torus

const geometry = new THREE.TorusGeometry(4, 0.5, 6, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x48cfa9 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(-10, 0, 30);
scene.add(torus);


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const pointLight2 = new THREE.DirectionalLight(0xff8ab6, 1, 100 );
pointLight2.position.set(90, 0, 100);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, pointLight2, ambientLight);



// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(500, 50);
 scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Background



const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// Moon 2

const moon2Texture = new THREE.TextureLoader().load('moon2.jpg');
const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moon2Texture,
    //normalMap: normalTexture,
  })
);

scene.add(moon2);

moon2.position.z = 20;
moon2.position.setX(-40);

// Moon 3

const moon3Texture = new THREE.TextureLoader().load('moon1.jpg');
const moon3 = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moon3Texture,
    //normalMap: normalTexture,
  })
);

scene.add(moon3);

moon3.position.z = 100;
moon3.position.y = -5;
moon3.position.setX(90);

// Moon 4

const moon4Texture = new THREE.TextureLoader().load('moon3.jpg');
const moon4 = new THREE.Mesh(
  new THREE.SphereGeometry(120, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moon4Texture,
    //normalMap: normalTexture,
  })
);

scene.add(moon4);

moon4.position.z = -500;
moon4.position.y = -5;
moon4.position.setX(90);

// Moon 5

const moon5Texture = new THREE.TextureLoader().load('moon4.jpg');
const moon5 = new THREE.Mesh(
  new THREE.SphereGeometry(30, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moon5Texture,
    //normalMap: normalTexture,
  })
);

scene.add(moon5);

moon5.position.z = -120;
moon5.position.y = -1;
moon5.position.setX(-140);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.002;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.002;

  moon.rotation.x += 0.003;
  moon2.rotation.y += 0.001;
  moon3.rotation.y += 0.007;
  moon4.rotation.y += 0.0005;
  moon5.rotation.y += 0.003;




  // controls.update();

  renderer.render(scene, camera);
}

animate();

function cameroo() {
	camera.position.set (1,1,1);
  renderer.render(scene, camera);
	alert ("yo");
  }