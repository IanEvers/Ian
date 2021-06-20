// THREE JS


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MathUtils } from 'three';
import * as dat from 'dat.gui'
import { Quaternion, Vector3 } from 'three'

// loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')
const normalTextureabejas = textureLoader.load('/textures/NormalMapabejas.png')

const loader = new GLTFLoader();
var yo = null;

 

// Debug
// const gui = new dat.GUI()

loader.load( '/textures/ianevers.glb', function ( gltf ) {

	scene.add( gltf.scene );
    yo = gltf.scene
    gltf.scene.rotation.y = 5
    // gui.add(gltf.scene.rotation, 'y')
    
}, undefined, function ( error ) {

	console.error( error );

} );

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(1, 64, 64);
// const geometrySkybox = new THREE.SphereGeometry(45, 64, 64);
const geometryPiso = new THREE.PlaneGeometry(50, 64, 64);


// Materials

const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness:0.7,
    roughness:0.2,
});
material.normalMap = normalTexture

// const materialSkybox = new THREE.MeshStandardMaterial({
//     color: 0xffe600,
//     side: THREE.BackSide,
//     metalness:1,
//     roughness:1,
// });
// materialSkybox.normalMap = normalTexture

const materialPiso = new THREE.MeshStandardMaterial({
    color: 0xfffff,
    side: THREE.DoubleSide,
    metalness:1,
    roughness:1,
});
materialPiso.normalMap = normalTextureabejas


// gui.add(yo);

const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)
// sphere.position.y = 0

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



const light = new THREE.AmbientLight( 0x404040,5); // soft white light

scene.add( light );
const titulo = document.getElementById('titulo')
function parallax() {
    // sphere.position.y = window.scrollY * .001
    // titulo.position.y = window.scrollY * .001
    
}


/**
 * Sizes
*/
const sizes = {
    width: canvas.width,
    height:  canvas.height
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = canvas.width,
    sizes.height =  canvas.height

    // Update camera


    camera.aspect =  sizes.width / sizes.height
    
    camera.updateProjectionMatrix()
    
    renderer.setSize( Math.min(window.innerWidth , 350), canvas.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -2.5
camera.position.y = 0
camera.position.z = 0
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enabled = false
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})


/**
 * Animate
*/

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    // Update objects
    if(yo) {
        var rotacion = 0.9 * Math.cos(elapsedTime)+4.5
        yo.rotation.y = rotacion
    }
 
    // Render
       
    // renderer.setSize(Math.max(165, sizes.width/4), sizes.height/4)
    renderer.setSize(Math.min(window.innerWidth , canvas.width), canvas.height)
    renderer.render(scene, camera)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// DIV SHOOTER

var clasesElementos = [];

$(".center").children().each(function() {
    var clase = $(this).attr('class')
    clasesElementos.push(clase)
});

console.log(clasesElementos);

const canvasShooter = document.querySelector('.layoutShooter');
var ctx = canvasShooter.getContext('2d');
var raf;

var textXpos = 5;
var textDirection= "right";
var text = 'hola';

var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.font = '48px serif';
    ctx.fillText('Hello world', this.x, this.y);
    ctx.fill();
  }
};



function draw() {
  ctx.clearRect(0,0, canvasShooter.width, canvasShooter.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.y + ball.vy > canvasShooter.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvasShooter.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  raf = window.requestAnimationFrame(draw);
}

canvasShooter.addEventListener('mouseover', function(e) {
  raf = window.requestAnimationFrame(draw);
});

canvasShooter.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
});

ball.draw();



     