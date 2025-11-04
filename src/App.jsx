import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import UrlForm from "./components/UrlForm";
import ResultBox from "./components/ResultBox";
import HistoryList from "./components/HistoryList";

const Container = styled.div`
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(180deg, #e8f0ff, #f8f9fc);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(saved);
  }, []);

  const handleShorten = async (longUrl) => {
    if (!longUrl) return;

    try {
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const targetUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(
        longUrl
      )}`;

      const res = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      const data = await res.json();
      const shortLink = data.contents.trim();

      if (shortLink.startsWith("http")) {
        const newEntry = { longUrl, shortUrl: shortLink };
        const updated = [newEntry, ...history];
        setHistory(updated);
        localStorage.setItem("history", JSON.stringify(updated));
        setShortUrl(shortLink);
      } else {
        alert("Failed to generate a short link. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Unable to connect to the API. Please try again later.");
    }
  };

  return (
    <Container>
      <Title>🔗 Simple URL Shortener</Title>
      <UrlForm onShorten={handleShorten} />
      <ResultBox shortUrl={shortUrl} />
      <HistoryList history={history} />
    </Container>
  );
}
