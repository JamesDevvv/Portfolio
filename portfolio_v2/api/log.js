export default async function handler(req, res) {
  // ✅ Allow preflight (OPTIONS request)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get client IP
    const forwarded = req.headers["x-forwarded-for"];
    const clientIp = forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress;

    // Geo lookup via ipwho.is
    const geoRes = await fetch(`https://ipwho.is/${clientIp}`);
    const geoData = await geoRes.json();

    // (Optional) log somewhere
    console.log("Visitor Log:", {
      ip: clientIp,
      country: geoData.country,
      region: geoData.region,
      city: geoData.city,
      isp: geoData.connection?.isp || "",
    });

    // ✅ Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Respond with JSON
    res.status(200).json({
      status: "ok",
      ip: clientIp,
      geo: geoData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
