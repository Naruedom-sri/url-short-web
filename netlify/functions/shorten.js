export async function handler(event) {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing url parameter" }),
    };
  }

  try {
    const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(
      url
    )}`;
    const res = await fetch(apiUrl);
    const shortLink = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shortUrl: shortLink }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to shorten URL" }),
    };
  }
}
