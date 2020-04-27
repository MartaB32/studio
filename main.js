import Manager from './Manager.js';
import Stats from './jsm/libs/stats.module.js';

const manager = new Manager();

var stats = new Stats();
document.body.appendChild(stats.domElement);

manager.Init();
manager.Load();


animate();
function animate() {
	requestAnimationFrame(animate);
	stats.update();
	manager.Update();

}

window.addEventListener('resize', function () {
	var width = window.innerWidth;
	var height = window.innerHeight;
	manager.renderer.setSize(width, height);
	manager.camera.aspect = width / height;
	manager.camera.updateProjectionMatrix();
});