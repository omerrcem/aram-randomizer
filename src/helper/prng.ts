export class PRNG {
	_seed = 0.34874948;
	_current = 0.845784357; 

	constructor (seed) {
		const length = seed.toString().length;
		this._seed = (seed * (0.1 ** length));	
	}

	public next() {
		this._current = (this._current * this._seed * 100) % 1;
		return this._current;
	}
}