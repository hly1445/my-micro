import { AppStatus } from "../lifeCycle";
let appList = [];

export const setAppList = (list) => {
  appList = list
  appList.map((app) => {
    app.status = AppStatus.NOT_LOADED
  })
}

export const getAppList = () => {
  return appList
}
