cargarVista('desafioTecnico')

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
    // gui.add(gltf.scene.rotation, 'y')
    
  }, undefined, function ( error ) {
    
    console.error( error );
    
  } );
  
  // Canvas
  const canvas = document.querySelector('canvas.webgl')
  
  // Scene
  const scene = new THREE.Scene()
  
  // Lights
  
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.x = 2
  pointLight.position.y = 3
  pointLight.position.z = 4
  scene.add(pointLight)
  
  const light = new THREE.AmbientLight( 0x404040,5); // soft white light
  
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

//ANIMACIÓN ENTRE PANTALLAS
$('.itemSidebar').on('click', function() {
  
  var seccion = $(this).attr('id');
    
  transicion().then(cargarVista(seccion));
  
});

function transicion() { 
  return new Promise((resolve, reject) => {
    var canvasTransicion = $('.transicion')
    
    $(canvasTransicion).attr('position', 'absolute')
    // agrandarCabeza = true;
    resolve(true);
  })
}
  


// EJERCICIO 1 

$(document).on("click", ".simplificar" , function() {
  var fraccion = $('.fraccion');
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



//  DRAG AND DROP
$('.draggeable').on('dragstart', function(event) {
  
  drag(event);
});

$('.entraDraggeable').on('drop', function(event) {
  drop(event);
});

$('.entraDraggeable').on('dragover', function(event) {
  allowDrop(event);
});

$(document).on("click", ".generarLayout" , function() {

  var stringLayout = " \\\"  ";

  $('.entraDraggeable').each(function( index ) {
    var elementoAdentro = $(this).children('p').attr('id')
    console.log(elementoAdentro)
    if(elementoAdentro) {
      var elementoId = elementoAdentro.split("-")[1];
    } else {
      var elementoId = ".";
    }

    if (index == 3 || index == 6) {
      stringLayout += " \\\" \\\" ";
    }
    
    stringLayout += elementoId +" ";
    
    
  });
  stringLayout += "\\\" ";
  
  
  var contenedor = document.querySelector('.contenedor')

  contenedor.style.gridTemplateAreas = '\''+stringLayout+'\'';

  // $(contenedor).css('grid-template-areas',  " \" titulo canvas texto  \" \" . presentacion .  \" \" . contenedorLayout . \" ")
  $(contenedor).css('grid-template-areas',  stringLayout)
  console.log(stringLayout)


  
});




//CAMBIO ENTRE VISTAS
var ultimaVista = 'desafioTecnico';

function cargarVista(vista) {
  
  if(vista == ultimaVista) return;

  if(vista != 'desafioTecnico') {
    pausa = true;
  }

  if(vista =='desafioTecnico') {
    
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

  } else if(vista =='contacto') {
    $(".contenedorDeContenido").load("contacto.html");

  }

  ultimaVista = vista;
}
