import { AppStatus } from "../lifeCycle";
import {getMicroAppStateActions } from '../store'
let appList = [];

export const setAppList = (list) => {
  const {setGlobalState,onGlobalStateChange}=getMicroAppStateActions()
  appList = list
  appList.map((app) => {
    app.status = AppStatus.NOT_LOADED
    app.setGlobalState=setGlobalState;
    app.onGlobalStateChange=onGlobalStateChange;
  })
}

export const getAppList = () => {
  return appList
}
