import styled from "@emotion/styled";

const List = styled.div`
  margin-top: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Item = styled.div`
  background: white;
  border-radius: 10px;
  padding: 0.8rem;
  margin: 0.5rem 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  a {
    color: #4a90e2;
    text-decoration: none;
    word-break: break-word;
  }
`;

export default function HistoryList({ history }) {
  if (history.length === 0) return null;
  return (
    <List>
      <h3>History</h3>
      {history.map((item, i) => (
        <Item key={i}>
          <strong>Short:</strong> <a href={item.shortUrl}>{item.shortUrl}</a>
          <br />
          <small><strong>Original:</strong> {item.longUrl}</small>
        </Item>
      ))}
    </List>
  );
}
