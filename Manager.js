export default class Manager
{
constructor(){
	//this._actualLvl = 0;
	//this._player = new Player();
	this._world = new World();
	this._selector=new Selector();
	
	this.scene;
	this.camera;
	this.renderer;
	this.clock = new THREE.Clock();
	this.controls;
	
	console.log("GameManager obj created!");
}


Init(){
	this.scene = new THREE.Scene();
	//this.scene.fog = new THREE.Fog( 0x34333b, 10,100 );
	let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 1300;
	
	this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	this.camera.position.set(0,0,5);
	this.camera.lookAt(this.scene.position);	
	this.scene.add(this.camera);
	
	
	
	// RENDERER
	this.renderer = new THREE.WebGLRenderer( {antialias:true, powerPreference: "high-performance"} );
	this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	//this.renderer.autoClear = false;
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
	//this.renderer.gammaOutput = true;
	//this.renderer.gammaFactor = 1.0;
	//this.renderer.gammaFactor = 2.0;
	//this.renderer.gammaOutput = true;
	this.renderer.outputEncoding = THREE.sRGBEncoding;
	
	document.body.appendChild (this.renderer.domElement);
	
	
	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	this.scene.add(this.camera);
	this.renderer.render( this.scene, this.camera );
	

	
	

}

Load(){
	
			this._world.generate();	
			this._selector.createSelectors(this.renderer, this.camera);
		
			this._world.instrument_loader(this._selector.cube,0,0,0,0,'instruments/electric_bass_guitar.glb');			
			this._world.instrument_loader(this._selector.cube2,0,0.5,0,0,'instruments/djembe.glb');			
			this._world.instrument_loader(this._selector.cube3,0,0,0,0,'instruments/grand_piano.glb');			 //tam jak te - to x y z i rotation nie ustawilem jescze se mozna dodac jak bedzie trzeba
			this._world.instrument_loader(this._selector.cube4,0,0.3,0,0,'instruments/drum_kit.glb');			
			this._world.instrument_loader(this._selector.cube5,0,-0.1,0,0,'instruments/double_bass.glb');	
		
			this.scene.add(this._world.groupLvl);
			this.scene.add(this._selector.group);
			//this.scene.add(this._world.groupInstruments);
			
	
}

Update(){
	let delta = this.clock.getDelta();
	this.inputUpdate(delta);	
	//this._player.updateAnimate(delta);
	//this._player.playerCollision(this._world.lvl1CollidableMeshList);
	
	this._selector.update();
	this.renderer.render( this.scene, this.camera );
}

inputUpdate(delta){
	
	var mouseMovement = MovementInput.getInstance().getMouseMovement(); //mouse input	
	var click=MovementInput.getInstance().getMouseClick();
	this._selector.updateMouse(this.camera, delta,mouseMovement, this.renderer);
	
		this._selector.setClick(click);
	//console.log(click);
} 
}

	