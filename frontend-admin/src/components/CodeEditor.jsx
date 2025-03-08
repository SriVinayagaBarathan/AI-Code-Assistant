import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { optimizeCode } from "../api/optimizeCode";
import SuggestionsPanel from "./SuggestionsPanel";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e2e;
  color: white;
`;

const EditorContainer = styled.div`
  flex: 3;
  padding: 20px;
  border-right: 2px solid #333;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background-color: #ff1a1a;
  }
`;

const CodeEditor = () => {
  const [code, setCode] = useState("# Type your Python code here...");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (newCode) => setCode(newCode);

  const handleOptimize = async () => {
    console.log("🔥 Sending code to backend...");
    setLoading(true);

    try {
      const apiResponse = await optimizeCode(code);
      console.log("✅ Response received:", apiResponse);
      setResponse(apiResponse);
    } catch (error) {
      console.error("❌ API Error:", error);
      setResponse({ error: "Optimization failed!" });
    }

    setLoading(false);
  };

  return (
    <Container>
      <EditorContainer>
        <Editor height="85vh" defaultLanguage="python" value={code} onChange={handleEditorChange} theme="vs-dark" />
        <Button onClick={handleOptimize}>
          {loading ? "Processing..." : "Dang!"}
        </Button>
      </EditorContainer>
      <SuggestionsPanel response={response} loading={loading} />
    </Container>
  );
};

export default CodeEditor;
