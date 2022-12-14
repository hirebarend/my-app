import axios from "axios";
import  moment from 'moment';
import * as uuid from "uuid";
import { Report } from "../types";

export async function createReport(report: Report): Promise<Report> {
  await axios.post(
    "https://api.airtable.com/v0/appFNAlw9RqgkUnZl/Reports",
    {
      records: [
        {
          fields: {
            ID: uuid.v4(),
            Coordinates: `${report.coordinates.latitude},${report.coordinates.longitude}`,
            "Device ID": report.deviceId,
            "Is Fraudulent": report.isFraudulent,
            Reference: report.reference,
            Status: report.status,
            Timestamp: moment().format("YYYY-MM-DD"),
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer keywUEWZniOrHqDgC`,
      },
    }
  );

  return report;
}
