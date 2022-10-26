import { KeyFrame, Vector, WaveState, Animatable } from "./api";

export const up: Vector = { x: 0, y: 1, z: 0 };
export const right: Vector = { x: 1, y: 0, z: 0 };

export const makeCircle = (state: WaveState): [WaveState, WaveState] => {
  return [state, {
    ...state, phaseDegrees: state.phaseDegrees + 90, displacementAxis: right
  }]
}

export const handleAnimatable = <T extends object>(query: T | Animatable<T>, onAnimatable: (x: Animatable<T>) => Animatable<T>, onValue: (T) => T): T | Animatable<T> => {
  const keyInAnimatable: keyof Animatable<any> = "animationCurve";
  return keyInAnimatable in query ? onAnimatable(query as any as Animatable<T>) : onValue(query);
}

const increasePhase = ({ phaseDegrees, ...value }: WaveState, amount: number) => ({ ...value, phaseDegrees: phaseDegrees + amount });

export const increasePhaseAtIndex = (frame: KeyFrame, index: number, amount: number) => {
  const waves = [...frame.waves];
  waves[index] = handleAnimatable(
    waves[index],
    ({ animationCurve, value }) => ({ animationCurve, value: increasePhase(value, amount) }),
    (value) => increasePhase(value, amount)
  );

  return { ...frame, waves }
}

export const increasePhasesAt = (frame: KeyFrame, ...indices: [index: number, amount: number][]) => {
  const waves = [...frame.waves];

  indices.forEach(([index, amount]) => waves[index] = handleAnimatable(
    waves[index],
    ({ animationCurve, value }) => ({ animationCurve, value: increasePhase(value, amount) }),
    (value) => increasePhase(value, amount)
  ));

  return { ...frame, waves }
}

export const increaseAllPhases = (frame: KeyFrame, amount: number): KeyFrame => {
  return {
    ...frame,
    waves: frame.waves.map(wave => {
      return handleAnimatable(
        wave,
        ({ animationCurve, value }) => ({ animationCurve, value: increasePhase(value, amount) }),
        (value) => increasePhase(value, amount)
      );
    }),
  }
}