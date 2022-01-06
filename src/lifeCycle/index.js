import { loadHTML } from "../lodaer";
let lifeCycle = {};

export const AppStatus = {
  NOT_LOADED: "NOT_LOADED",
  LOADING: "LOADING",
  LOADED: "LOADED",
  BOOTSTRAPPING: "BOOTSTRAPPING",
  NOT_MOUNTED: "NOT_MOUNTED",
  MOUNTING: "MOUNTING",
  MOUNTED: "MOUNTED",
  UNMOUNTING: "UNMOUNTING",
};

export const setLifeCycle = (list) => {
  lifeCycle = list;
};

export const getLifeCycle = () => {
  return lifeCycle;
};

// 全局的微应用生命周期钩子
export const runBeforeLoad = async (app) => {
  app.status = AppStatus.LOADED;
  await runLifeCycle("beforeLoad", app);
  app = await loadHTML(app);
  app.status = AppStatus.LOADED;
};

export const runMounted = async (app) => {
  app.status = AppStatus.MOUNTING;
  await app.mount(app);
  app.status = AppStatus.MOUNTED;
  await runLifeCycle("mounted", app);
};

export const runUnmounted = async (app) => {
  app.status = AppStatus.UNMOUNTING;
  app.proxy.inactive();
  await app.unmount(app);
  app.status = AppStatus.NOT_MOUNTED;
  await runLifeCycle("unmounted", app);
};

export const runBoostrap = async (app) => {
  if (app.status !== AppStatus.LOADED) {
    return app;
  }
  app.status = AppStatus.BOOTSTRAPPING;
  await app.bootstrap?.(app);
  app.status = AppStatus.NOT_MOUNTED;
};

const runLifeCycle = async (name, app) => {
  const fn = lifeCycle[name];
  if (fn instanceof Array) {
    await Promise.all(fn.map((item) => item(app)));
  } else {
    await fn?.(app);
  }
};
