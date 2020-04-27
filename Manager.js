export default class Manager {
	constructor() {
		this._world = new World();
		this._selector = new Selector();

		this.scene;
		this.camera;
		this.renderer;
		this.controls;
		this.clock = new THREE.Clock();
	}


	Init() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x808080);
		let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
		let VIEW_ANGLE = 75, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;

		this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT);
		this.camera.position.set(0, 5, 10);
		this.scene.add(this.camera);



		// RENDERER
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			powerPreference: "high-performance"
		});
		this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.outputEncoding = THREE.sRGBEncoding;

		document.body.appendChild(this.renderer.domElement);

		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.scene.add(this.camera);
		this.renderer.render(this.scene, this.camera);
	}

	Load() {
		this._world.generate();
		this._selector.createSelectors(this.renderer, this.camera);

		this._world.instrument_loader(this._selector.cube, 0, 0, 'models/instruments/electric_bass_guitar.glb');
		this._world.instrument_loader(this._selector.cube2, 0, 0, 'models/instruments/djembe.glb');
		this._world.instrument_loader(this._selector.cube3, 0, 0, 'models/instruments/grand_piano.glb');
		this._world.instrument_loader(this._selector.cube4, 0, 0, 'models/instruments/drum_kit.glb');
		this._world.instrument_loader(this._selector.cube5, 0, 0, 'models/instruments/double_bass.glb');

		this.scene.add(this._world.groupLvl);
		this.scene.add(this._selector.group);
		//this.scene.add(this._world.groupInstruments);


	}

	Update() {
		let delta = this.clock.getDelta();
		this.inputUpdate(delta);

		this._selector.update();
		this.renderer.render(this.scene, this.camera);
	}

	inputUpdate(delta) {

		var mouseMovement = MovementInput.getInstance().getMouseMovement(); //mouse input	
		var click = MovementInput.getInstance().getMouseClick();
		this._selector.updateMouse(this.camera, delta, mouseMovement, this.renderer);

		this._selector.setClick(click);
		//console.log(click);
	}
}

