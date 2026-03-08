"use client"

import Script from "next/script"

const Analytics = () => {
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id="91e98ce8-56c4-4241-a806-48801b1c3fb7"
      strategy="afterInteractive"
    />
  )
}

export default Analytics