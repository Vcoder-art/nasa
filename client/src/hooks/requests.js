async function httpGetPlanets() {
  const res = await fetch("http://localhost:5000/planets");
  return await res.json();
}

async function httpGetLaunches() {
  const res = await fetch("http://localhost:5000/launches");
  return await res.json();
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch("http://localhost:5000/launches", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (Err) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch("http://localhost:5000/launches/" + id, {
      method: "delete",
    });
  } catch (Err) {
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
