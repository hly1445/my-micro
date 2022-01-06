import { match } from "path-to-regexp";
import { getAppList } from "./app";
import { AppStatus } from "./lifeCycle";
import { importEntry } from "import-html-entry";

export const getAppListStatus = () => {
  const actives = []
  const unmounts= []

  const list = getAppList()
  list.forEach((app) => {
    const isActive = match(app.activeRule, { end: false })(location.pathname)
    switch (app.status) {
      case AppStatus.NOT_LOADED:
      case AppStatus.LOADING:
      case AppStatus.LOADED:
      case AppStatus.BOOTSTRAPPING:
      case AppStatus.NOT_MOUNTED:
        isActive && actives.push(app)
        break
      case AppStatus.MOUNTED:
        !isActive && unmounts.push(app)
        break
    }
  })

  return { actives, unmounts }
}


export const prefetch = async (app) => {
  requestIdleCallback(async () => {
    const { getExternalScripts, getExternalStyleSheets } = await importEntry(
      app.entry
    )
    requestIdleCallback(getExternalStyleSheets)
    requestIdleCallback(getExternalScripts)
  })
}
