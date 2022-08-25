import * as uuid from "uuid";

export function useDeviceId() {
  return getDeviceId();
}

function getDeviceId() {
  let deviceId: string | null = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = uuid.v4();

    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}
