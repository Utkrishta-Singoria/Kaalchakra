// Web Audio API acoustic feedback synthesizer for Kaalchakra gameplay
class SoundEngine {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Subtle terracotta placement / button tap
  public playTap(freq = 420) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore audio errors on restricted devices
    }
  }

  // Vedic oral pitch tone (Udatta = high, Anudatta = low, Svarita = falling)
  public playVedicTone(pitchType: 'udatta' | 'anudatta' | 'svarita' | 'gayatri', index = 0) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const baseFreqs = [261.63, 293.66, 329.63, 392.00];
      const base = baseFreqs[index % baseFreqs.length];

      if (pitchType === 'udatta') {
        osc.frequency.setValueAtTime(base * 1.25, ctx.currentTime);
      } else if (pitchType === 'anudatta') {
        osc.frequency.setValueAtTime(base * 0.85, ctx.currentTime);
      } else if (pitchType === 'svarita') {
        osc.frequency.setValueAtTime(base * 1.2, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(base * 0.9, ctx.currentTime + 0.28);
      } else {
        osc.frequency.setValueAtTime(base, ctx.currentTime);
      }

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.34);
    } catch {
      // Ignore
    }
  }

  // Metallic strike for Gupta Royal Mint or Mauryan Pillar Edict
  public playMintStrike() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [880, 1320, 1760].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.08 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.46);
      });
    } catch {
      // Ignore
    }
  }

  // Museum Artifact Unlock Chime
  public playUnlock() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [392.0, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEngine();
