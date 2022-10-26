export type Vector = {
	x: number, 
	y: number, 
	z: number
}
export const enum WaveType {
	Sine = 1,
	Square = 2,
	Triangle = 4,
	Sawtooth = 8,
}
export type WaveState = {
	frequency: number, 
	amplitude: number, 
	waveType: WaveType, 
	phaseDegrees: number, 
	displacementAxis: Vector
}
export type Animatable<T> = {
	value: T, 
	animationCurve: AnimationCurve
}
export const enum AnimationCurve {
	Linear = 0,
	Instant = 1,
	EaseBeginSine = 2,
	EaseEndSine = 4,
	EaseBeginEndSine = 8,
	EaseBeginQuad = 16,
	EaseEndQuad = 32,
	EaseBeginEndQuad = 64,
	EaseBeginCubic = 128,
	EaseEndCubic = 256,
	EaseBeginEndCubic = 512,
	EaseBeginQuart = 1024,
	EaseEndQuart = 2048,
	EaseBeginEndQuart = 4096,
	EaseBeginQuint = 8192,
	EaseEndQuint = 16384,
	EaseBeginEndQuint = 32768,
	EaseBeginExpo = 65536,
	EaseEndExpo = 131072,
	EaseBeginEndExpo = 262144,
	EaseBeginCirc = 524288,
	EaseEndCirc = 1048576,
	EaseBeginEndCirc = 2097152,
	EaseBeginBack = 4194304,
	EaseEndBack = 8388608,
	EaseBeginEndBack = 16777216,
	EaseBeginElastic = 33554432,
	EaseEndElastic = 67108864,
	EaseBeginEndElastic = 134217728,
	EaseBeginBounce = 268435456,
	EaseEndBounce = 536870912,
	EaseBeginEndBounce = 1073741824,
}
export const enum ProjectionType {
	Orthographic = 0,
	Perspective = 1,
}
export type KeyFrame = {
	duration: number, 
	projectionType: (Animatable<ProjectionType> | ProjectionType), 
	sampleRate: (Animatable<number> | number), 
	signalLength: (Animatable<number> | number), 
	thickness: (Animatable<number> | number), 
	waves: (Animatable<WaveState> | WaveState)[]
}
export type List<T> = {
	capacity: number, 
	count: number, 
	[index: number]: T
}
export class Signal {
	private internal: any;

	constructor(rootNote: number, ...frames: KeyFrame[]) { 
		// @ts-ignore
		this.internal = make_Signal(...arguments); 
	}

	addFrame(frame: KeyFrame): void { 
		// @ts-ignore
		this.internal.AddFrame(convertTo_KeyFrame(frame));
	}


	addFrames(...frames: KeyFrame[]): void { 
		// @ts-ignore
		this.internal.AddFrames(convertTo_KeyFrames(frames));
	}

	// @ts-ignore
	get frames(): List<KeyFrame> { return wrap(this.internal.Frames); }
	// @ts-ignore
	set frames(value: List<KeyFrame>) { this.internal.Frames = convertTo_List_1(value); }
}


export const play = (signal: Signal, startTime: number): void => {
    // @ts-ignore
    return internalize_play(signal, startTime);
};