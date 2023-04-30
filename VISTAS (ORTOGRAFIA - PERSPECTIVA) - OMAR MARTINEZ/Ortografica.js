var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();


//VISTA ORTOGRAFICA
  var camera= new THREE.OrthographicCamera(
  4,/*IZQUIERDA*/ -4,/*DERECHA*/ 4,/*ARRIBA*/ -4,/*ABAJO */ 2,/*CERCA*/ 9/*LEJOS*/); 
  var helper = new THREE.CameraHelper(camera);
  camera.position.z = 3.5;
  camera.position.x = 4.2;
  camera.position.y = 1;

  camera.rotation.set(0, -0.5, 0);
  scene.add(helper);


  var controls = new THREE.OrbitControls(camera, renderer.domElement);


//ILUMINACION (REPOSITORIOS)
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const size = 150;
  var arrowSize = 2;
  const divisions = 160;
  var origin = new THREE.Vector3( 0, 0, 0 );
  var x = new THREE.Vector3( 1, 0, 0 );
  var y = new THREE.Vector3( 0, 1, 0 );
  var z = new THREE.Vector3( 0, 0, 1 );
  var color2 = new THREE.Color( 0x333333 );
  var colorR = new THREE.Color( 0xAA0000 );
  var colorG = new THREE.Color( 0x00AA00 );
  var colorB = new THREE.Color( 0x0000AA );

//Creacion de la guia (guilla)
  var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

//Creacion de los  ejes
  var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
  var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
  var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
  scene.add(arrowX);
  scene.add(arrowY);
  scene.add(arrowZ);
  scene.add(gridHelperXZ);

//Prisma Hexagonal generado con vertices con ayuda de CHATGPT

const geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([

        // -- CARAS DEL CUBO--

        //FRONTAL
        -2, -2,  2,
         2, -2,  2,
         2,  2,  2,
        -2,  2,  2,
        
        //POSTERIOR
        -2, -2, -2,
        -2,  2, -2,
         2,  2, -2,
         2, -2, -2,
        
        //SUPERIOR
        -2,  2, -2,
        -2,  2,  2,
         2,  2,  2,
         2,  2, -2,
        
        //INFERIOR
        -2, -2, -2,
         2, -2, -2,
         2, -2,  2,
        -2, -2,  2,
        
        //LATERAL DERECHA
        2, -2, -2,
        2,  2, -2,
        2,  2,  2,
        2, -2,  2,
        
        //LATERAL IZQUIERDA
        -2, -2, -2,
        -2, -2,  2,
        -2,  2,  2,
        -2,  2, -2,
    ]);

// Definir los índices de los triángulos del cubo
  var indices = new Uint16Array( [
      0,  1,  2,  0,  2,  3,  // Cara frontal
      4,  5,  6,  4,  6,  7,  // Cara trasera
      8,  9, 10,  8, 10, 11,  // Cara superior
      12, 13, 14, 12, 14, 15, // Cara inferior
      16, 17, 18, 16, 18, 19, // Cara derecha
      20, 21, 22, 20, 22, 23  // Cara izquierda
  ] );

//CARAS Y VERTICES DE LOS CUBOS
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));


//SE CREA LA ESTRUCTURA DEL CUBO SIN MATERIAL

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff ,wireframe: true });
  const malla = new THREE.Mesh(geometry, material);

//SE AGREGA LA MALLA A LA ESCENA 
  scene.add(malla);
  
//RENDERIZADO
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();

