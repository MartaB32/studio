class World {
	constructor() {
		this.groupLvl = new THREE.Group();
		this.groupInstruments = new THREE.Group();
	}

	generate() {

		this.light = new THREE.AmbientLight(0xffffff, 1);
		this.groupLvl.add(this.light);

		this.pointLight = new THREE.PointLight(0xffffff, 0.5, 300);
		this.pointLight.position.set(0, 10, 3);
		this.pointLight.castShadow = true;
		this.pointLight.shadow.bias = -0.0004;
		this.pointLight.shadow.radius = 4;
		this.pointLight.shadow.mapSize.width = 2048;
		this.pointLight.shadow.mapSize.height = 2048;
		//this.pointLight.add( new THREE.Mesh( new THREE.SphereBufferGeometry( 0.5, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xbfd7f2 } ) ) );
		this.groupLvl.add(this.pointLight);

		this.room();
	}


	room() {

		// //przydatne do określania skali, nie usuwać bo pobiję!!!!!!!!
		// var geometry = new THREE.BoxGeometry(1, 1, 1);
		// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		// var cube_helper = new THREE.Mesh(geometry, material);
		// //cube_helper.position.set(0, -2.5, 0);
		// this.groupLvl.add(cube_helper);

		this.room_loader(this.groupLvl, 'models/room.glb');
	}

	room_loader(object, source) {
		var loader = new THREE.GLTFLoader();

		var dracoLoader = new THREE.DRACOLoader();
		dracoLoader.decoderPath = 'js/libs/draco/';
		loader.setDRACOLoader(dracoLoader);

		loader.load(
			// resource URL
			source,
			// called when the resource is loaded
			function (gltf) {
				gltf.scene.traverse
					(
						function (o) {
							object.add(gltf.scene);

							if (o.isMesh) {
								o.receiveShadow = true;
								o.castShadow = true;
							}
						}
					);

			},
			// called while loading is progressing
			function (xhr) {

				console.log((xhr.loaded / xhr.total * 100) + '% loaded');

			},
			// called when loading has errors
			function (error) {

				console.log(error);

			}
		);
	}





	instrument_loader(object, posX, posZ, source) {
		var loader = new THREE.GLTFLoader();

		//do zbadania, czy szybciej dziala
		// var dracoLoader = new THREE.DRACOLoader();
		// dracoLoader.decoderPath='js/libs/draco/';
		// loader.setDRACOLoader( dracoLoader );

		loader.load(
			// resource URL
			source,
			// called when the resource is loaded
			(gltf) => {
				gltf.scene.traverse
					(
						function (o) {

							if (o.isMesh) {
								o.receiveShadow = true;
								o.castShadow = true;
							}
							//gltf.scene.position.set(posX, posY, posZ);
							object.add(gltf.scene);
						}
					);
			},
			// called while loading is progressing
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			// called when loading has errors
			function (error) {
				console.log(error);
			}
		);
	}


}