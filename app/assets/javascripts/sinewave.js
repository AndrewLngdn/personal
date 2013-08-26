
var SineWave = function(context){
	var that = this;
	this.x = 0;
	this.context = context;
	this.node = context.createJavaScriptNode(1024, 1, 1);
	this.node.onaudioprocess = function(e) {that.process(e)};
	this.sample_rate = this.context.sampleRate;
	this.frequency = 440;
	this.next_frequency = this.frequency;
	this.reverb = this.context.createConvolver();
	this.amplitude = 1.0;
}


SineWave.prototype.process = function(e) {
	var data = e.outputBuffer.getChannelData(0);

	for (var i = 0; i < data.length; ++i){
        var a = this.frequency * 2 * Math.PI;
        var b = this.sample_rate / a;
        var zz = this.x++;
        var yy = zz/b;
		data[i] = Math.sin(yy);

        var xx = this.x/b;
		if (this.next_frequency != this.frequency){
			next_data = Math.sin(xx);

			if (data[i] < 0.001 && data[i] > -0.001 && data[i] < next_data){
				this.frequency = this.next_frequency;
				this.x = 0;
			}
		}
	}
}

SineWave.prototype.play = function() {
	this.node.connect(this.context.destination);
}

SineWave.prototype.pause = function() {
	this.node.disconnect();
}

SineWave.prototype.setFrequency = function(freq){
	this.next_frequency = freq;
}