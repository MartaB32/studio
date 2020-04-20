//====================================
//
//	class world creates instances 
//
//====================================


class World
{
constructor()
{	
	this.groupLvl= new THREE.Group();
	this.groupInstruments= new THREE.Group();
}	
	
generate()
{
	this.generateLvl();			
	this.generateSkyBox();								
}	
	
generateLvl(){
		
	//this.light = new THREE.AmbientLight( 0x5f58bf, 0.5 ); 
	this.light = new THREE.AmbientLight(0xffffff, 1);
	this.groupLvl.add( this.light );
	
	//this.pointLight = new THREE.PointLight(0xbfd7f2, 1, 150);
	this.pointLight = new THREE.PointLight(0xffffff, 0.5, 300);
	//this.pointLight.position.set(0,10,0);
	this.pointLight.position.set(0,5,-5);
	this.pointLight.castShadow=true;
	//this.pointLight.add( new THREE.Mesh( new THREE.SphereBufferGeometry( 0.5, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xbfd7f2 } ) ) );
	this.groupLvl.add(this.pointLight);
		
	// this.createFloor();
	// //tutaj thisy wszystkie
	// this.createWall1();
	// this.createWall2();
	// this.createWall3();
	// this.createWall4();
	//this.addInstruments(this.groupInstruments);
	this.plane();
	//decoration_loader('textures/room.glb');
}		


plane() {

	//przydatne do określania skali, nie usuwać bo pobiję!!!!!!!!
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	var cube_helper = new THREE.Mesh(geometry, material);
	//cube_helper.position.set(0, -2.5, 0);
	this.groupLvl.add(cube_helper);

	this.decoration_loader('textures/room.glb');
	//this.decoration_loader('textures/room_kopia.glb');
}

decoration_loader(source)
	{
		var loader = new THREE.GLTFLoader();
		loader.load(
			// resource URL
			source,
			// called when the resource is loaded
			function (gltf) {
				this.groupLvl.add(gltf.scene);		
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





	

instruments()
		{

		//instrument_loader('instruments/electric_bass_guitar.glb',cube);
		instrument_loader('instruments/djembe.glb', cube2);
		instrument_loader('instruments/grand_piano.glb', cube3);
		instrument_loader('instruments/drum_kit.glb', cube4);
		instrument_loader('instruments/double_bass.glb',cube5);

		}




instrument_loader(object,posX,posY,posZ,rotation,source) {
			var loader = new THREE.GLTFLoader();
			loader.load(
				// resource URL
				source,
				// called when the resource is loaded
				function (gltf) {
				gltf.scene.traverse(function(o) {
					gltf.scene.position.set(posX,posY,posZ);
					object.add(gltf.scene);
					   
			  if (o.isMesh) {
					o.castShadow = true;
					o.receiveShadow = true;
					//list.push(o);
					

				 }
			});
			}
			
				
					
				
		
			
				
	
	
	
				
				
				,
				// called while loading is progressing
				function (xhr) {

					console.log((xhr.loaded / xhr.total * 100) + '% loaded');

				},
				// called when loading has errors
				function (error) {

					console.log('An error happened');

				}
			);
		}



	

generateSkyBox(){
	this.imagePrefix = "textures/skybox1/";
	this.directions  = ["PX", "NX", "PY", "NY", "PZ", "NZ"];
	this.imageSuffix = ".png";
	this.skyGeometry = new THREE.CubeGeometry( 1300, 1300, 1300 );	
	this.loader = new THREE.TextureLoader();
	this.loader.crossOrigin = true;

	this.materialArray = [];
	for (var i = 0; i < 6; i++)
		this.materialArray.push( new THREE.MeshPhongMaterial({
			//map: this.loader.load( this.imagePrefix + this.directions[i] + this.imageSuffix),
			side: THREE.BackSide
		}));
	this.skyBox = new THREE.Mesh( this.skyGeometry, this.materialArray );
	this.groupLvl.add( this.skyBox );


	}











	

createFloor(){
var texture = new THREE.TextureLoader().load("./textures/floor3.jpg");
	texture.encoding = THREE.sRGBEncoding;
	texture.rotation = Math.PI/2;
	texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 15, 15 );
	
	let plane = new THREE.Mesh(
				new THREE.BoxGeometry(20,20,0.2,0), new THREE.MeshPhongMaterial({ color: 0xF0F0F0, side: THREE.DoubleSide, map:texture, shininess:0.4 }));
			plane.rotateX(Math.PI/2);
			plane.receiveShadow = true;
			plane.receiveShadow=true;
			
			
	 
	this.groupLvl.add(plane);
}






createWall1()
{
	
	let wall = new THREE.Mesh(
				new THREE.PlaneGeometry(20,5), new THREE.MeshPhongMaterial({ color: 0x6D6D6D, side: THREE.BackSide,shininess:0.8 }));
			wall.position.set(0,2.5,10);
			wall.receiveShadow = true;
			wall.receiveShadow=true;
			
	 
	this.groupLvl.add(wall);
	
	
}
createWall2()
{
	let wall = new THREE.Mesh(
				new THREE.PlaneGeometry(20,5), new THREE.MeshPhongMaterial({ color: 0x6D6D6D, side: THREE.FrontSide,shininess:0.8 }));
			wall.position.set(0,2.5,-10);
			wall.receiveShadow = true;
			wall.receiveShadow=true;
			
	 
	this.groupLvl.add(wall);
	
	
}
createWall3()
{
	let wall = new THREE.Mesh(
				new THREE.PlaneGeometry(20,5), new THREE.MeshPhongMaterial({ color: 0x6D6D6D, side: THREE.BackSide,shininess:0.8 }));
			wall.position.set(10,2.5,0);
			wall.rotateY(Math.PI/2);
			wall.receiveShadow = true;
			wall.receiveShadow=true;
			
	 
	this.groupLvl.add(wall);
	
}	
createWall4()
{
	let wall = new THREE.Mesh(
				new THREE.PlaneGeometry(20,5), new THREE.MeshPhongMaterial({ color: 0x6D6D6D, side: THREE.BackSide,shininess:0.8 }));
			wall.position.set(-10,2.5,0);
			wall.rotateY(-Math.PI/2);
			wall.receiveShadow = true;
			wall.receiveShadow=true;
			
	 
	this.groupLvl.add(wall);
	
	
}


}