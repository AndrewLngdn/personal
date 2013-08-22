Synth = function(audioContext){
    this.audioContext = audioContext || new webkitAudioContext();

    this.notes =  {'F3':174.61 , 'F#3':185.00 , 'Gb3':185.00 , 'G3':196.00 , 'G#3':207.65 , 'Ab3':207.65 , 'A3':220.00 , 'A#3':233.08 , 'Bb3':233.08 , 'B3':246.94 , 'C4':261.63 , 'C#4':277.18 , 'Db4':277.18 , 'D4':293.66 , 'D#4':311.13 , 'Eb4':311.13 , 'E4':329.63 , 'F4':349.23}

    this.portamento = 0.2;

    this.oscillator = this.audioContext.createOscillator();

    this.oscillator.noteOn(0);

    this.oscillator.type = "sawtooth";

    this.gainNode = this.audioContext.createGainNode();

    this.gainNode.gain.value = 0;

    this.oscillator.connect(this.gainNode);

    this.gainNode.connect(this.audioContext.destination);
}

Synth.prototype.noteOn = function(note){

    var frequency = this.notes[note] || 0;
    var now = this.audioContext.currentTime;

    this.oscillator.frequency.setValueAtTime(frequency, now);

    this.gainNode.gain.setValueAtTime(1, now);
}

Synth.prototype.noteSlide = function(note){
    var frequency = this.notes[note] || 0;
    var now = this.audioContext.currentTime;

    this.oscillator.frequency.linearRampToValueAtTime(frequency, now + this.portamento);
}

Synth.prototype.noteOff = function(){
    var now = this.audioContext.currentTime;

    this.gainNode.gain.setValueAtTime(0, now);
}