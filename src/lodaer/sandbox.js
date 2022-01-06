export class ProxySandbox {
  constructor() {
    this.runnning = false;
    const fakeWindow = Object.create(null);
    this.proxy = new Proxy(fakeWindow, {
      set(target, property, value) {
        if (this.runnning) {
          target[property] = value;
        }
        return true;
      },
      get(target, property) {
        switch (property) {
          case "window":
          case "self":
          case "globalThis":
            return proxy; 
        }
        if (
          !window.hasOwnProperty.call(target, property) &&
          window.hasOwnProperty(property)
        ) {
          const value = window[property];
          if (typeof value === "function") {
            return value.bind(window);
          }
          return value
        }
        return target[property];
      },
      has() {
        return true;
      },
    });
  }
  active() {
    this.running = true;
  }
  inactive() {
    this.running = false;
  }
}
