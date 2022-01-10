import { cloneDeep } from "lodash";
let globalState = {};

const deps = {};

function emitGlobal(state, prevState) {
  Object.keys(deps).forEach((id) => {
    if (deps[id] instanceof Function) {
      deps[id](cloneDeep(state), cloneDeep(prevState));
    }
  });
}

export function initGlobalState(state) {
  if (state === globalState) {
    console.warn("state has not changed");
  } else {
    const prevGlobalState = cloneDeep(globalState);
    globalState = cloneDeep(state);

    // 检测是否发生变化
    emitGlobal(globalState, prevGlobalState);
  }
  return getMicroAppStateActions(`global-${+new Date()}`, true);
}

export function getMicroAppStateActions(id, isMaster) {
  return {
    setGlobalState(state) {
      if (state === globalState) {
        console.warn("state has not changed");
        return false;
      } else {
        const changeKeys = [];
        const prevGlobalState = cloneDeep(globalState);
        globalState = cloneDeep(
          Object.keys(state).reduce((_globalState, changeKey) => {
            if (isMaster || _globalState.hasOwnProperty(changeKey)) {
              changeKeys.push(changeKey);
              return Object.assign(_globalState, {
                [changeKey]: state[changeKey],
              });
            }
          }, globalState)
        );
        if (changeKeys.length === 0) {
          console.warn("state has not changed");
          return false;
        }
        emitGlobal(globalState, prevGlobalState);
        return true;
      }
    },
    onGlobalStateChange(callback, fireImmediately) {
      if (!(callback instanceof Function)) {
        console.error("callback must be function!");
        return;
      }
      if (deps[id]) {
        console.warn(
          `'${id}' global listener already exists before this, new listener will overwrite it.`
        );
      }
      deps[id] = callback;
      if (fireImmediately) {
        const cloneState = cloneDeep(globalState);
        callback(cloneState, cloneState);
      }
    },
    offGlobalStateChange() {
      delete deps[id];
      return true;
    },
  };
}
