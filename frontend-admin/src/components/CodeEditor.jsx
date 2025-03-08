import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { optimizeCode } from "../api/optimizeCode";
import SuggestionsPanel from "./SuggestionsPanel";

const CodeEditor = () => {
  const [code, setCode] = useState("# Type your Python code here...");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (newCode) => {
    setCode(newCode);
  };

  const handleOptimize = async () => {
    console.log("🔥 Sending code to backend...");
    setLoading(true);
    
    try {
      const apiResponse = await optimizeCode(code);
      console.log("✅ Response received:", apiResponse);
      setResponse(apiResponse);  // Store the API response in state
    } catch (error) {
      console.error("❌ API Error:", error);
      setResponse({ error: "Optimization failed!" });
    }

    setLoading(false);
  };

  return (
    <div className="split left flex h-screen">
      {/* Code Editor Section */}
      <div className="w-3/4 border-r p-4 ">
        <Editor
          height="90vh"
          defaultLanguage="python"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
        <button
          onClick={handleOptimize}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Dang it!"}
        </button>
      </div>

          <div class="split right">

      {/* Suggestions Panel */}
      <SuggestionsPanel response={response} loading={loading} />
      </div>
    
    </div>
  );
};

export default CodeEditor;
