// Web Audio API ambient melody generator for reliable background music
class AmbientAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: any = null;
  private currentTrack: string = 'romantic';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTrack(trackName: string) {
    this.stop();
    this.initContext();
    this.currentTrack = trackName;
    this.isPlaying = true;

    // Define scales and chords for tracks
    const chordsMap: Record<string, number[][]> = {
      'acoustic-celebration': [
        [261.63, 329.63, 392.00, 523.25], // C major
        [220.00, 261.63, 329.63, 440.00], // A minor
        [174.61, 220.00, 261.63, 349.23], // F major
        [196.00, 246.94, 293.66, 392.00]  // G major
      ],
      'gentle-piano': [
        [293.66, 369.99, 440.00, 587.33], // D major
        [246.94, 293.66, 369.99, 493.88], // B minor
        [196.00, 246.94, 293.66, 392.00], // G major
        [220.00, 277.18, 329.63, 440.00]  // A major
      ],
      'indie-acoustic': [
        [261.63, 329.63, 392.00, 493.88], // C maj7
        [174.61, 220.00, 261.63, 329.63], // F maj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [196.00, 246.94, 293.66, 349.23]  // G7
      ],
      'orchestral-strings': [
        [220.00, 261.63, 329.63, 440.00, 523.25],
        [174.61, 220.00, 261.63, 349.23, 440.00],
        [130.81, 164.81, 196.00, 261.63, 329.63],
        [196.00, 246.94, 293.66, 392.00, 493.88]
      ]
    };

    const chords = chordsMap[trackName] || chordsMap['acoustic-celebration'];
    let chordIndex = 0;
    let noteIndex = 0;

    const tick = () => {
      if (!this.isPlaying || !this.ctx) return;

      const currentChord = chords[chordIndex];
      const freq = currentChord[noteIndex % currentChord.length];

      this.playPluckNote(freq);

      noteIndex++;
      if (noteIndex >= currentChord.length * 2) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }

      this.timer = setTimeout(tick, 360);
    };

    tick();
  }

  private playPluckNote(frequency: number) {
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Smooth attack and gentle fade out
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.0);
    } catch (e) {
      // AudioContext policy
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  getPlaying() {
    return this.isPlaying;
  }
}

export const audioSynthesizer = new AmbientAudioSynthesizer();
