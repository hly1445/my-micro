import { setAppList, getAppList } from "./app";
import { hijackRoute, reroute } from "./route";
import { setLifeCycle } from "./lifeCycle";
import { AppStatus } from "./lifeCycle";
import { prefetch } from "./utils";
/**
 *
 * @param {object} applist
 * name:string 应用名字
 * entry:string 入口文件路径
 * container:string 容器
 * activeRule:string 规则
 */
export const registerMicroApps = (appList, lifeCycle) => {
  setAppList(appList);
  lifeCycle && setLifeCycle(lifeCycle);
};

export const start = () => {
  const list = getAppList();
  if (!list.length) {
    throw new Error("请先注册应用");
  }

  hijackRoute();
  reroute(window.location.href);

  list.forEach((app) => {
    if (app.status === AppStatus.NOT_LOADED) {
      prefetch(app);
    }
  });
};
