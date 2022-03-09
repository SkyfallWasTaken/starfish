// basic observables

class ObservableListener {
	#callback;
	#observable;

	constructor(callback, hash, observable) {
		this.hash = hash;
		this.#callback = callback;
		this.#observable = observable;
	}

	call() {
		this.#callback(this.#observable.value);
	}

	unsubscribe() {
		this.#observable.removeListener(this.hash);
	}
}

export default class Observable {
	#listeners;
	#listenerHashes;
	#value;

	constructor(value) {
		this.#listeners = [];
		this.#listenerHashes = [];
		this.#value = value;
	}

	async subscribe(cb) {
		const hash = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substring(6);
		this.#listenerHashes.push(hash);
		const listener = new ObservableListener(cb, hash, this);
		this.#listeners.push(listener);
		return listener;
	}

	removeListener(hash) {
		delete this.#listeners[this.#listenerHashes.indexOf(hash)];
	}

	set value(val) {
		if (val !== this.#value) {
			this.#value = val;
			this.#listeners.forEach((listener) => {
				listener.call(this.#value);
				return;
			});
		}
	}

	get value() {
		return this.#value;
	}
}
