var MovementInput = (function () {
	var instance;

	function Singleton() {

		var mouseMovementX = 0;
		var mouseMovementY = 0;
		var mouseMovementScroll = 0;

		var moveForward = false;
		var moveBackward = false;
		var moveLeft = false;
		var moveRight = false;
		var moveSprint = false;
		var playerJump = false;
		var click = false;






		window.addEventListener("mousemove", onMouseMove);
		//window.addEventListener( 'mousedown', onDocumentMouseDown, false );		
		//window.addEventListener( 'mouseup', onDocumentMouseUp, false );		
		window.addEventListener('click', onDocumentMouseClick, false);







		this.getKeysMovement = function () {
			return {
				mForward: moveForward,
				mBackward: moveBackward,
				mLeft: moveLeft,
				mRight: moveRight,
				pSprint: moveSprint,
				pJump: playerJump

			};
		}

		function onMouseMove(event) {
			//Google chrome bug 



			mouseMovementX = event.clientX;
			mouseMovementY = event.clientY;
		}
		function onDocumentMouseDown(event) {
			if (!click)
				click = true;
			else
				click = false;

		}

		function onDocumentMouseUp(event) {

			click = false;

		}

		function onDocumentMouseClick(event) {

			click = true;

			//
		}

		this.getMouseMovement = function () {
			return { x: mouseMovementX, y: mouseMovementY };
		}

		function onMouseScroll(event) {
			mouseMovementScroll = event.wheelDeltaY;
		}

		this.getMouseClick = function () {
			if (click) {
				click = false;
				return true;
			}
			else {

				return false;
			}
		}

	}

	return {
		getInstance: function () {
			if (instance == null) {
				instance = new Singleton();
				instance.constructor = null;
			}

			return instance;
		}
	};
})();