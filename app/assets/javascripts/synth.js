Synth = function(audioContext){
    this.audioContext = audioContext || new webkitAudioContext();

    this.notes =  {'F3':174.61 , 'F#3':185.00 , 'Gb3':185.00 , 'G3':196.00 , 'G#3':207.65 , 'Ab3':207.65 , 'A3':220.00 , 'A#3':233.08 , 'Bb3':233.08 , 'B3':246.94 , 'C4':261.63 , 'C#4':277.18 , 'Db4':277.18 , 'D4':293.66 , 'D#4':311.13 , 'Eb4':311.13 , 'E4':329.63 , 'F4':349.23}

    this.portamento = 0.2;

    this.filterFrequency = 200;

    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.noteOn(0);
    this.oscillator.type = "sawtooth";

    this.gainNode = this.audioContext.createGainNode();
    this.gainNode.gain.value = 0;

    this.filter = this.audioContext.createBiquadFilter();
    this.filter.type = 0;

    this.envelope = new Float32Array([0.01, 0.2, 0.0, 0.5]);

    this.oscillator.connect(this.filter);
    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
}

Synth.prototype.noteOn = function(note){

    var frequency = this.notes[note] || 0;
    var now = this.audioContext.currentTime;
    this.frequency = frequency;

    this.oscillator.frequency.cancelScheduledValues(now);
    this.gainNode.gain.cancelScheduledValues(now);

    this.oscillator.frequency.setValueAtTime(frequency, now);
    this.filter.frequency.setValueAtTime(this.filterFrequency, now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(1.0, now + this.envelope[0]);
    this.gainNode.gain.linearRampToValueAtTime(this.envelope[2], now + this.envelope[0] + this.envelope[1]);
}

Synth.prototype.noteSlide = function(note){
    var frequency = this.notes[note] || 0;
    var now = this.audioContext.currentTime;
    this.frequency = frequency;

    this.oscillator.frequency.linearRampToValueAtTime(frequency, now + this.portamento);
    this.filter.frequency.setValueAtTime(this.filterFrequency, now);
}

Synth.prototype.noteOff = function(){
    var now = this.audioContext.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);

    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0.0, now + this.envelope[3]);
}

Synth.prototype.setFilterFrequency = function(value){
    var now = this.audioContext.currentTime;
    var minValue = 40;
    var maxValue = this.audioContext.sampleRate / 2;
    var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
    var multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));
    this.filter.frequency.setValueAtTime(maxValye * multiplier, now);
}

Synth.prototype.setFilterResonance = function(value){
    var now = this.audioContext.currentTime;
    this.filter.Q.setValueAtTime(value * 30, now);
}
