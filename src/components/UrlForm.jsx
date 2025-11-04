import { useState } from "react";
import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Input = styled.input`
  width: 350px;
  max-width: 90%;
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease;
  &:focus {
    border-color: #4a90e2;
  }
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
    background-color: #2f6ccf;
  }
`;

export default function UrlForm({ onShorten }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onShorten(input);
    setInput("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="url"
        value={input}
        placeholder="Enter your URL..."
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <Button type="submit">Shorten</Button>
    </Form>
  );
}
