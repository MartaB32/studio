
class Selector {
	constructor() {

		this.cube;
		this.cube2;
		this.cube3;
		this.cube4;
		this.cube5;

		this.cubeRing;
		this.cubeRing2;
		this.cubeRing3;
		this.cubeRing4;
		this.cubeRing5;

		this.group = new THREE.Group();
		this.list = [];
		this.raycaster = new THREE.Raycaster();
		this.object2;
		this.object3;
		this.click;
		this.mouse = new THREE.Vector2();

		this.stay;

		this.instrument_counter = 0;

	}


	createSelectors() {
		this.createDjentSelector();
		this.createGuitarSelector();
		this.createPianoSelector();
		this.createDrumsSelector();
		this.createBassSelector();


	}


	createDjentSelector() {

		this.cube2 = new THREE.Mesh(new THREE.BoxBufferGeometry(0.7, 1, 0.7),
			new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: true, transparent: true, opacity: 0.2 }));



		this.cube2.position.set(0, 0.5, 0);
		//this.cube2.material.visible = false;
		this.group.add(this.cube2);
		this.list.push(this.cube2);

		this.cubeRing2 = new THREE.Mesh(new THREE.TorusBufferGeometry(0.6, 0.05, 16, 32),
			new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, visible: false }));

		this.cubeRing2.rotateX(Math.PI / 2);
		this.cubeRing2.position.set(0, -0.4, 0);
		this.cube2.add(this.cubeRing2);


	}

	createGuitarSelector() {
		this.cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 2, 0.4),
			new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: true, opacity: 0.2 }));

		this.cube.position.set(5, 1, 0);


		//this.cube.material.visible = false;
		this.group.add(this.cube);



		this.cubeRing = new THREE.Mesh(new THREE.TorusBufferGeometry(0.6, 0.05, 16, 32),
			new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, visible: false }));

		this.cubeRing.rotateX(Math.PI / 2);
		this.cubeRing.position.set(0, -0.9, 0);
		this.cube.add(this.cubeRing);

		this.list.push(this.cube)


	}

	createPianoSelector() {
		this.cube3 = new THREE.Mesh(new THREE.BoxBufferGeometry(2.5, 2.0, 2.2),
			new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: true, transparent: true, opacity: 0.2 }));

		this.cube3.position.set(-3, 1, 0);


		//this.cube3.material.visible = false;
		this.group.add(this.cube3);
		this.list.push(this.cube3)

		this.cubeRing3 = new THREE.Mesh(new THREE.TorusBufferGeometry(1.5, 0.05, 16, 32),
			new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, visible: false }));

		this.cubeRing3.rotateX(Math.PI / 2);
		this.cubeRing3.position.set(0, -0.8, 0);
		this.cube3.add(this.cubeRing3);



	}

	createDrumsSelector() {
		this.cube4 = new THREE.Mesh(new THREE.BoxBufferGeometry(2.5, 1.5, 1.5),
			new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: true, transparent: true, opacity: 0.2 }));

		this.cube4.position.set(5, 0.75, 5, 2);


		//this.cube4.material.visible = false;
		this.group.add(this.cube4);



		this.list.push(this.cube4)

		this.cubeRing4 = new THREE.Mesh(new THREE.TorusBufferGeometry(1.4, 0.05, 16, 32),
			new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, visible: false }));

		this.cubeRing4.rotateX(Math.PI / 2);
		this.cubeRing4.position.set(0, -0.6, 0);
		this.cube4.add(this.cubeRing4);



	}

	createBassSelector() {
		this.cube5 = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 2.2, 1),
			new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: true, transparent: true, opacity: 0.2 }));

		this.cube5.position.set(6, 1.1, -3);


		//this.cube5.material.visible = false;
		this.group.add(this.cube5);



		this.list.push(this.cube5)

		this.cubeRing5 = new THREE.Mesh(new THREE.TorusBufferGeometry(0.6, 0.05, 16, 32),
			new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, visible: false }));

		this.cubeRing5.rotateX(Math.PI / 2);
		this.cubeRing5.position.set(0, -0.9, 0);
		this.cube5.add(this.cubeRing5);



	}
	//===========================================================		

	update() {


		// See if the ray from the camera into the world hits one of our meshes
		var intersects = this.raycaster.intersectObjects(this.list);

		// Toggle rotation bool for meshes that we clicked
		if (intersects.length > 0) {
			//zmiana kursora
			$('html,body').css('cursor', 'pointer');

			if (typeof this.object3 != 'undefined') {
				if (this.object3.material.color.getHex() != 0x00FF00)
					this.object3.material.visible = false;
			}
			//helper.position.set( 0, 0, 0 );
			//helper.lookAt( intersects[ 0 ].face.normal );

			//helper.position.copy( intersects[ 0 ].point );
			//console.log("HIT");
			//cube.material.color.set(0xFFFFFF)



			this.object2 = intersects[0].object;
			this.object2.children[0].material.visible = true;
			this.object3 = this.object2.children[0];

			if (this.click) {
				if (this.object2.children[0].material.color.getHex() == 0x00FF00) {
					this.object2.children[0].material.color.set(0xffff00);

					this.instrument_counter--;
					if (this.instrument_counter < 1) {
						document.getElementById("pianoroll").style.display = "none";
					}
				}
				else {
					this.object2.children[0].material.color.set(0x00FF00);

					this.instrument_counter++;
					if (this.instrument_counter > 0) {
						document.getElementById("pianoroll").style.display = "block";
					}
				}
				//this.click=false;

				if (this.object2.children[0].id == this.cubeRing3.id)		// Sprawdzamy czy dziecko element(tego cuba naszego) ma takie samo id jak ring piano
					console.log("piano");							// jak tak to oznacza to, ze click byl na piano. mozna tak zrobic z innymi instrumentami
				// tutaj by odpalic piano rolla

			}
		}
		else
		{
				$('html,body').css('cursor', 'default');

			if (typeof this.object2 != 'undefined') {

				if (this.object2.children[0].material.color.getHex() != 0x00FF00) {

					this.object2.children[0].material.visible = false;
					this.object2.children[0].material.color.set(0xffff00);
				}
			}

		this.click = false;
		}
	}
	updateMouse(camera, delta, mouseMovement, renderer) {
		this.mouse.x = (mouseMovement.x / renderer.domElement.clientWidth) * 2 - 1;
		this.mouse.y = -(mouseMovement.y / renderer.domElement.clientHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, camera);

		//this.click=click;


	}
	setClick(click) {
		this.click = click;
	}

	part() {
		var particleCount = 100;
		var particles = new THREE.Geometry(),
			// ptexture = new THREE.TextureLoader().load("https://s18.postimg.org/e3p5gsxyh/particle_A.png"),
			ptexture = new THREE.TextureLoader().load("textures/particle-A.png"),
			pMaterial = new THREE.PointsMaterial({
				// color: 0xFFFFFF,
				map: ptexture,
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthTest: true,
				size: 0.5
			});

		// now create the individual particles
		for (var p = 0; p < particleCount; p++) {
			// create a particle with random x position (-120, 120)
			var pX = getRndInteger(-2, 2),
				pY = getRndInteger(-2, 2),
				pZ = getRndInteger(-2, 2),
				particle = new THREE.Vector3(pX, pY, pZ);

			particles.vertices.push(particle);
		}
		function getRndInteger(min, max) {

			return Math.floor(Math.random() * (max - min + 1)) + min;

		}
		// create the particle system
		var particleSystem = new THREE.Points(particles, pMaterial);
		particleSystem.sortParticles = true;
		this.cube3.add(particleSystem);
	}

}