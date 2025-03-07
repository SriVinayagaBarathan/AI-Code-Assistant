import React from "react";

const SuggestionsPanel = ({ response, loading }) => {
  if (loading) {
    return (
      <div className="w-1/4 p-4 bg-gray-900 text-white">
        <h3 className="text-lg font-bold">AI Suggestions</h3>
        <p className="text-gray-400">⏳ Optimizing your code...</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="w-1/4 p-4 bg-gray-900 text-white">
        <h3 className="text-lg font-bold">AI Suggestions</h3>
        <p className="text-gray-400">No suggestions yet. Click "Optimize Code".</p>
      </div>
    );
  }

  if (response.error) {
    return (
      <div className="w-1/4 p-4 bg-gray-900 text-white">
        <h3 className="text-lg font-bold">AI Suggestions</h3>
        <p className="text-red-400">❌ {response.error}</p>
      </div>
    );
  }

  const { observation, reasoning, actions_taken, final_output } = response["optimised code"];

  return (
    <div className="w-1/4 p-4 bg-gray-900 text-white overflow-auto">
      <h3 className="text-lg font-bold">AI Suggestions</h3>
      <p className="text-yellow-400 font-semibold">📝 Observation:</p>
      <p>{observation}</p>

      <p className="text-yellow-400 font-semibold">🤔 Reasoning:</p>
      <ul className="list-disc ml-4">
        {reasoning.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="text-yellow-400 font-semibold">🚀 Actions Taken:</p>
      <ul className="list-disc ml-4">
        {actions_taken.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="text-yellow-400 font-semibold">✅ Optimized Code:</p>
      <pre className="bg-gray-800 p-2 rounded">{final_output.code}</pre>

      <p className="text-yellow-400 font-semibold">📝 Explanation:</p>
      <p>{final_output.explanation}</p>
    </div>
  );
};

export default SuggestionsPanel;
