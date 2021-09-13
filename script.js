cargarVista('presentacion')

// THREE JS

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var pausa=true;
function threeJS() {


// loading
  const loader = new GLTFLoader();
  var yo = null;
  
  loader.load( 'https://ianevers.github.io/Ian/ianevers.glb', function ( gltf ) {
    scene.add( gltf.scene );
    yo = gltf.scene
    gltf.scene.rotation.y = 5
  }, undefined, function ( error ) {
    console.error( error );
  } );
  
  // Canvas
  const canvas = document.querySelector('canvas.webgl')
  
  // Scene
  const scene = new THREE.Scene()
  
  // Lights
  const light = new THREE.AmbientLight(0x404040,5); // soft white light
  
  scene.add( light );
  
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
  })
  
  /**
   * Cámara
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.x = -2.5
  camera.position.y = 0
  camera.position.z = 0
  scene.add(camera)
  
  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enabled = false

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  })
  
  //Animación
  const clock = new THREE.Clock()
  var agrandarCabeza = false
  pausa = false
  
  const tick = () =>
  {
    if (pausa) {
      return;
    }
    
    const elapsedTime = clock.getElapsedTime()

    // muevo cabeza 
    if(yo) {
      var rotacion = 0.9 * Math.cos(elapsedTime)+4.5
      yo.rotation.y = rotacion
    }

    if(agrandarCabeza) {
      renderer.setSize(canvas.width +1, canvas.height+1)
    }

    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()

}

$('.itemSidebar').on('click', function() {
  var seccion = $(this).attr('id');
  cargarVista(seccion)
});

//CAMBIO ENTRE VISTAS
var ultimaVista = 'presentacion';

function cargarVista(vista) {
  
  if(vista == ultimaVista) return;

  if(vista != 'presentacion') {
    pausa = true;
  }

  if(vista =='presentacion') {
    
    $(".contenedorDeContenido").load("presentacion.html")

    // Este setTimeout no está bien en realidad, lo hice para que no se llame a elementos del DOM que todavía no cargaron.
    // Lo correcto sería hacer el llamado ni bien carguen, pero no se cuando es que cargan exactamente jeje xd
    setTimeout(() => {
      threeJS();
    }, 1000); 

  } if(vista =='cuento') {
    $(".contenedorDeContenido").load("cuento.html");
  } else if(vista =='musica') {
    $(".contenedorDeContenido").load("musica.html");
  }
  ultimaVista = vista;
}
