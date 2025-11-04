import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Box = styled.div`
  animation: ${fadeIn} 0.4s ease forwards;
  background: #fff;
  padding: 1rem;
  margin: 0 auto;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const LinkText = styled.a`
  display: block;
  color: #007bff;
  margin-top: 0.5rem;
  word-wrap: break-word;
`;

const CopyBtn = styled.button`
  margin-top: 0.8rem;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #38b2ac;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #2c7a7b;
  }
`;

export default function ResultBox({ shortUrl }) {
  if (!shortUrl) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <Box>
      <h3>Shortened URL</h3>
      <LinkText href={shortUrl} target="_blank" rel="noreferrer">
        {shortUrl}
      </LinkText>
      <CopyBtn onClick={handleCopy}>Copy</CopyBtn>
    </Box>
  );
}
