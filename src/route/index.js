import {
  runBoostrap,
  runBeforeLoad,
  runMounted,
  runUnmounted,
} from "../lifeCycle";
import { getAppListStatus } from "../utils";

const capturedListeners = {
  hashchange: [],
  popstate: [],
};

// 劫持和 history 和 hash 相关的事件和函数
// 然后我们在劫持的方法里做一些自己的事情
// 比如说在 URL 发生改变的时候判断当前是否切换了子应用

const originalPush = window.history.pushState;
const originalReplace = window.history.replaceState;

let historyEvent = null;

let lastUrl = null;

export const reroute = (url) => {
  if (url !== lastUrl) {
    const { actives, unmounts } = getAppListStatus();
    Promise.all(
      unmounts
        .map(async (app) => {
          await runUnmounted(app);
        })
        .concat(
          actives.map(async (app) => {
            await runBeforeLoad(app);
            await runBoostrap(app);
            await runMounted(app);
          })
        )
    ).then(() => {
      callCapturedListeners();
    });
  }
  lastUrl = url || location.href;
};

const handleUrlChange = () => {
  reroute(location.href);
};

export const hijackRoute = () => {
  window.history.pushState = (...args) => {
    originalPush.apply(window.history, args);
    historyEvent = new PopStateEvent("popstate");
    args[2] && reroute(args[2]);
  };
  window.history.replaceState = (...args) => {
    originalReplace.apply(window.history, args);
    historyEvent = new PopStateEvent("popstate");
    args[2] && reroute(args[2]);
  };

  window.addEventListener("hashchange", handleUrlChange);
  window.addEventListener("popstate", handleUrlChange);

  window.addEventListener = hijackEventListener(window.addEventListener);
  window.removeEventListener = hijackEventListener(window.removeEventListener);
};

const hasListeners = (name, fn) => {
  return capturedListeners[name].filter((listener) => listener === fn).length;
};

const hijackEventListener = (func) => {
  return function (name, fn) {
    if (name === "hashchange" || name === "popstate") {
      if (!hasListeners(name, fn)) {
        capturedListeners[name].push(fn);
        return;
      } else {
        capturedListeners[name] = capturedListeners[name].filter(
          (listener) => listener !== fn
        );
      }
    }
    return func.apply(window, arguments);
  };
};

export function callCapturedListeners() {
  if (historyEvent) {
    Object.keys(capturedListeners).forEach((eventName) => {
      const listeners = capturedListeners[eventName];
      if (listeners.length) {
        listeners.forEach((listener) => {
          // @ts-ignore
          listener.call(this, historyEvent);
        });
      }
    });
    historyEvent = null;
  }
}

export function cleanCapturedListeners() {
  capturedListeners["hashchange"] = [];
  capturedListeners["popstate"] = [];
}
