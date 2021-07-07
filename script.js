// THREE JS


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


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

    renderer.setSize(Math.min(window.innerWidth , canvas.width), canvas.height)
    
    
    //renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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

// EJERCICIO 1 

var parrafo = $('.eje1');
var descripcion = "Crear una función que devuelva una versión simplificada de una fracción. Ejemplo: simplificar('4/6') = '2/3'";
$(parrafo).html(descripcion);

var fraccion = $('.fraccion');



$('.simplificar').on('click', function() {
  var valorFraccion = $(fraccion).val();
  var numerosFraccion = valorFraccion.split('/');
  var divisores1 = obtenerDivisores(numerosFraccion[0]);
  var divisores2 = obtenerDivisores(numerosFraccion[1]);
  
  var mcm = obtenerMaximoComunMultiplo(divisores1, divisores2);

  if(mcm) {

    numerosFraccion[0] = numerosFraccion[0] / mcm;
    numerosFraccion[1] = numerosFraccion[1] / mcm;
    
    $(fraccion).val(numerosFraccion[0] + '/' + numerosFraccion[1]); 
  } else {
    $(fraccion).val('Insimplificable.');     
  }
  
});


function obtenerMaximoComunMultiplo(divisores1, divisores2) {
  var mcm;
  for(var i = 0; i < divisores1.length; i++) {
    for(var j = 0; j < divisores2.length; j++) {
      if(divisores1[i] == divisores2[j]) {
        mcm = divisores1[i];
      }
    }
  }
  return mcm;
}

function obtenerDivisores(numero) {
  var listaDivisores = [];
  for(var contador = 2; contador <= numero ;contador++) {
    if(Number.isInteger(numero/contador)) {
      listaDivisores.push(contador)
    }
  }
  return listaDivisores;
}