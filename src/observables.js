// basic observables

class ObservableListener {
	#callback;
	#observable;
	#removeListener

	constructor(callback, hash, observable, removeListener) {
		this.hash = hash;
		this.#callback = callback;
		this.#observable = observable;
		this.#removeListener = removeListener
	}

	/**
	 * Calls the callback for the class.
	 */
	call() {
		this.#callback(this.#observable.value);
	}

	/**
	 * Unsubscribes the listener from the observable.
	 */
	unsubscribe() {
		this.#removeListener(this.hash);
	}
}

/**
 * A basic observable.
 */
export default class Observable {
	#listeners;
	#listenerHashes;
	#value;

	constructor(value) {
		this.#listeners = [];
		this.#listenerHashes = [];
		this.#value = value;
	}

	/**
	 * @param cb {function} The callback, which will be called when the `Observable` value is changed.
	 */
	subscribe(cb) {
		const hash = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substring(6);
		this.#listenerHashes.push(hash);
		const listener = new ObservableListener(cb, hash, this, this.#removeListener);
		this.#listeners.push(listener);
		return listener;
	}

	#removeListener(hash) {
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
