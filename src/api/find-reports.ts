import axios from "axios";
import { Report } from "../types";

export async function findReportsOutOfStock(
  reference: string | null
): Promise<Array<Report>> {
  const response = await axios.get<{
    records: Array<{ fields: { [key: string]: any } }>;
  }>("https://api.airtable.com/v0/appFNAlw9RqgkUnZl/Reports", {
    headers: {
      Authorization: `Bearer keywUEWZniOrHqDgC`,
    },
    params: {
      filterByFormula: "Status='Out of Stock'",
    },
  });

  return response.data.records.map((x) => {
    return {
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      deviceId: x.fields["Device ID"],
      isFraudulent: x.fields["Is Fraudulent"],
      reference: x.fields["Reference"],
      status: x.fields["Status"],
      timestamp: new Date(x.fields["Timestamp"]).getTime(),
    };
  });
}
