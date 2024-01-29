"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    /* 윈도우가 undefined가 아닐때 -> 브라우저 상황일때 */
    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        // return worker 해줌
        require("@/mocks/browser");
      }
    }
  }, []);

  return null;
};
