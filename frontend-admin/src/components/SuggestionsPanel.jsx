import React from "react";
import styled from "styled-components";

const Panel = styled.div`
  flex: 1;
  padding: 20px;
  background: #222;
  overflow-y: auto;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CodeBlock = styled.pre`
  background: #333;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
`;

const CopyButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuggestionsPanel = ({ response, loading }) => {
  if (loading) {
    return (
      <Panel>
        <Title>AI Suggestions</Title>
        <p>⏳ Optimizing your code...</p>
      </Panel>
    );
  }

  if (!response) {
    return (
      <Panel>
        <Title>AI Suggestions</Title>
        <p>No suggestions yet. Click "Optimize Code".</p>
      </Panel>
    );
  }

  if (response.error) {
    return (
      <Panel>
        <Title>AI Suggestions</Title>
        <p style={{ color: "red" }}>❌ {response.error}</p>
      </Panel>
    );
  }

  const { observation, reasoning, actions_taken, final_output } = response["optimised code"];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(final_output.code);
  };

  return (
    <Panel>
      <Title>AI Suggestions</Title>
      <p><strong>📝 Observation:</strong> {observation}</p>

      <p><strong>🤔 Reasoning:</strong></p>
      <ul>
        {reasoning.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p><strong>🚀 Actions Taken:</strong></p>
      <ul>
        {actions_taken.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p><strong>✅ Optimized Code:</strong></p>
      <CodeBlock>{final_output.code}</CodeBlock>
      <CopyButton onClick={copyToClipboard}>Copy Code</CopyButton>

      <p><strong>📝 Explanation:</strong> {final_output.explanation}</p>
    </Panel>
  );
};

export default SuggestionsPanel;
