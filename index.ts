import { play, ProjectionType, Signal, WaveType } from "./api";
import { increasePhasesAt } from "./helper";


const baseFrame = {
  duration: 2,
  projectionType: ProjectionType.Perspective,
  sampleRate: 1000,
  signalLength: 4,
  thickness: 0.1,
};

const startingFrame = {
  ...baseFrame,
  waves: [{
    frequency: 5,
    amplitude: 2,
    waveType: WaveType.Sine,
    phaseDegrees: 0,
    displacementAxis: { x: 0, y: 1, z: 0 }
  },
  {
    frequency: 2,
    amplitude: 2,
    waveType: WaveType.Sine,
    phaseDegrees: 0,
    displacementAxis: { x: 1, y: 0, z: 0 }
  },
  {
    frequency: 5,
    amplitude: 2,
    waveType: WaveType.Triangle,
    phaseDegrees: 0,
    displacementAxis: { x: 1, y: 0, z: 0 }
  },
  {
    frequency: 2,
    amplitude: 1,
    waveType: WaveType.Sine,
    phaseDegrees: 0,
    displacementAxis: { x: 1, y: 1, z: 0 }
  },
  ],
};

const signal = new Signal(1, startingFrame);

const prev = increasePhasesAt(startingFrame, [1, 90]);
signal.addFrame(prev);
const next = increasePhasesAt(prev, [2, 100]);
signal.addFrame(next);
signal.addFrame(increasePhasesAt(next, [0, 200], [2, 100]));


play(signal, 0);