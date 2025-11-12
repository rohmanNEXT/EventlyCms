"use client";
import { useEffect } from "react";

const TawkWidget = () => {
  useEffect(() => {
    // Ganti dengan Tawk.to widget ID-mu
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/66e944b8ea492f34bc157c12/1i7vj8t0b";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // tidak perlu render apa pun
};

export default TawkWidget;
