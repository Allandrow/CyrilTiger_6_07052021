export class Observer {
  constructor() {
    this.callbacks = [];
  }

  addCallback(fn) {
    this.callbacks.push(fn);
  }

  clearCallbacks() {
    while (this.callbacks.length > 0) {
      this.callbacks.pop();
    }
  }

  fire() {
    this.callbacks.forEach((cb) => {
      cb.call();
    });
  }
}
