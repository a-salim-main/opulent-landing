"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (event: unknown) => {
          console.log("Booking successful:", event);
        },
      });
    })();
  }, []);

  return (
    <Cal
      calLink="a.salim/ai-discovery-call"
      style={{ width: "100%", height: "100%" }}
      config={{
        hideEventTypeDetails: "false",
        layout: "month_view",
        theme: "dark",
      }}
    />
  );
} 