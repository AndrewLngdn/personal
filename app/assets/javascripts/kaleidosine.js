var Kaleidosine = {
	audioContext: undefined,
	scene: undefined,
	rectangles: [],
	lines: [],
    corners: [],
	init: function(){
        var html = "<div class='todo-box'>" +
            "TODO: add audio" +
            "</div>";
        $('body').append(html);

		Kaleidosine.audioContext = new webkitAudioContext();
		var scene = Kaleidosine.scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000);
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		console.log(window.innerWidth, window.innerHeight)
		camera.position.z = 10;
		camera.position.y = 0;
		camera.position.x = 0;

		Kaleidosine.placeCubes(2);

		count = 0;
		var render = function (){
			Kaleidosine.fanCubes();
			Kaleidosine.drawCornerLines();
			scene.updateMatrixWorld();
            Kaleidosine.detectCollisions();

            if (count++ == 1000)
				return;
			requestAnimationFrame(render);
			renderer.render(scene, camera);
		}
		render();
	},

	placeCubes: function(n){
		for (var i = 0; i < n; i++){
			var geometry = new THREE.CubeGeometry(10,10,0);
			var material = new THREE.MeshBasicMaterial({color: 0x000000});
			var cube = new THREE.Mesh(geometry, material);

			Kaleidosine.rectangles.push(cube);
			Kaleidosine.scene.add(cube);

			for (var j = 0; j < 4; j++ ){
				var geo = new THREE.Geometry();
				var lineMaterial = new THREE.LineBasicMaterial({color: 0x1BA8E0, size: 10});
				geo.vertices.push(new THREE.Vector3(0,0,0));
				geo.vertices.push(new THREE.Vector3(0,0,0));
				var line = new THREE.Line(geo, lineMaterial);
				Kaleidosine.lines.push(line);
				Kaleidosine.scene.add(line);
			} 
		}
	},

	fanCubes: function(){
		var length = Kaleidosine.rectangles.length
		for (var i = 0; i < length; i++){
			Kaleidosine.rectangles[i].rotation.z += (0.005*(i+1))/length*4.5;
		}
	},

	drawCornerLines: function(){

		var lineCount = 0;
		for (var i = 0; i < (Kaleidosine.rectangles.length - 1); i++){
			var thisBox = Kaleidosine.rectangles[i];
			var nextBox = Kaleidosine.rectangles[i+1];

			for (var j = 0; j < 4; j++){
				var line = Kaleidosine.lines[lineCount];
				lineCount++;

				var thisCorner = thisBox.geometry.vertices[j].clone();
				var nextCorner = nextBox.geometry.vertices[j].clone();

				thisBox.localToWorld(thisCorner);
				nextBox.localToWorld(nextCorner);

				line.geometry.vertices[0] = thisCorner;
				line.geometry.vertices[1] = nextCorner;
				line.geometry.vertices[1].z = line.geometry.vertices[0].z = 0.001;

				line.geometry.verticesNeedUpdate = true;
			}
		}
	},

    detectCollisions: function(){ // naive implementation first,
                                  // probably need to make this better for
        Kaleidosine.corners = [];
        for (var i = 0; i < (Kaleidosine.rectangles.length); i++){
            var thisBox = Kaleidosine.rectangles[i];
            for (var j = 0; j < 4; j++){
                var thisCorner = thisBox.geometry.vertices[j].clone();
                thisBox.localToWorld(thisCorner);
                Kaleidosine.corners.push(thisCorner);
            }
        }


        for (var k = 0; k < Kaleidosine.corners.length; k++){

            var corner = Kaleidosine.corners[k];
            for (var l = 0; l < Kaleidosine.corners.length; l++){
                var cornerTwo = Kaleidosine.corners[l];
                if ( k === l ){
                    // do nothing
                } else {
                    if (corner.distanceToSquared(cornerTwo) < 0.01){
                        console.log("hit at " + corner.x);
                    }
                }
            }
        }
    }
}


