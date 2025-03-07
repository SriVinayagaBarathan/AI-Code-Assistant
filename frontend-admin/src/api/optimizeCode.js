import axios from "axios";

export const optimizeCode = async (code) => {
  try {
    console.log("🔹 Sending request to backend...");
    console.log("📩 Code Sent:", code);

    const response = await axios.post("http://127.0.0.1:8000/optimize-code/", { 
      codeString: code 
    });

    console.log("✅ Response from Backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error);
    return { error: "Failed to fetch optimized code" };
  }
};
