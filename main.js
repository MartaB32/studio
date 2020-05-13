import Manager from './Manager.js';
import Stats from './jsm/libs/stats.module.js';

const manager = new Manager();

var stats = new Stats();
document.body.appendChild(stats.domElement);

manager.Init();
manager.Load();

let pianoroll = document.getElementById("pianoroll");

pianoroll.onclick = function () {
	if (pianoroll.style.height == "100%") {
		manager._world.stop_render = true;
	}
	else {
		manager._world.stop_render = false;
	}
}

animate();

function animate() {
	requestAnimationFrame(animate);
	
	if (manager._world.stop_render == false) {
		stats.update();
		manager.Update();
	}
}

window.addEventListener('resize', function () {
	var width = window.innerWidth;
	var height = window.innerHeight;
	manager.renderer.setSize(width, height);
	manager.camera.aspect = width / height;
	manager.camera.updateProjectionMatrix();
});