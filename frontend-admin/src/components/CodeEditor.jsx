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


  //Base Optimization Code suggestion-L1
  const handleOptimize = async () => {
    console.log("🔥 Sending code to backend...");
    setLoading(true);
  
    try {
      let apiResponse = await optimizeCode(code);
      console.log("✅ Response received:", apiResponse);
  
      // Define expected keys-->Here checking whether we are getting all the keys from JSOn, if not send request again to backend, until we get the resultant
      const expectedKeys = ["observation", "reasoning", "actions_taken", "final_output", "test_cases"];
  
      // Check if all expected keys exist in the response
      const isValidResponse = expectedKeys.every(key => key in apiResponse);
  
      if (!isValidResponse) {
        console.warn("⚠️ Missing keys in response, making another request...");
        apiResponse = await optimizeCode(code); // Retry the API call
        console.log("🔄 Retried Response:", apiResponse);
      }
  
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
