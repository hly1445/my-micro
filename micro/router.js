import importHTML from "import-html-entry";

let microApps = [];

let prevApp = null;

const originalPushState = window.history.pushState;

window.history.pushState = function() {
  originalPushState.apply(this, arguments);
  reroute();
};


window.addEventListener("popstate", () => {
  reroute();
});

export function registerApps(apps) {
  microApps = apps;

  microApps.forEach((item) => {
    importHTML(`${item.entry}/index.html`).then((res) => {
      res.execScripts().then((res) => {
        item.mount = res.mount;
        item.unmount = res.unmount;
      });
    });
  });
}

async function reroute() {
  const path = document.location.pathname;

  if (prevApp && !path.includes(prevApp.name)) {
    await prevApp.unmount();
  }

  const nowApp = microApps.find((item) => {
    return path.includes(item.name);
  });
  prevApp = nowApp;

  if (prevApp && prevApp.name === "/" + path) {
    await prevApp.unmount();
    await nowApp.mount();
  } else {
    await nowApp.mount();
  }
  await nowApp.mount();
}
