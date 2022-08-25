import { Coordinates } from "./coordinates";

export type Report = {
  coordinates: Coordinates;

  deviceId: string;

  isFraudulent: boolean;

  reference: string;

  status: string;

  timestamp: number;
};
