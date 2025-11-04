export async function handler(event) {
  const url = new URL(event.rawUrl);
  const longUrl = url.searchParams.get("url");

  if (!longUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing URL parameter" }),
    };
  }

  try {
    const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`;
    const res = await fetch(apiUrl);
    const shortUrl = await res.text();

    if (shortUrl.startsWith("http")) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortUrl }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid short link" }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
}