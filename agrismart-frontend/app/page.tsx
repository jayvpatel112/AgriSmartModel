"use client";

import { useState } from "react";

export default function Home() {
  // State for form inputs
  const [formData, setFormData] = useState({ N: "", P: "", K: "", ph: "" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to FastAPI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          N: parseFloat(formData.N),
          P: parseFloat(formData.P),
          K: parseFloat(formData.K),
          ph: parseFloat(formData.ph),
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setResult(data.recommended_crop);
    } catch (error) {
      console.error("Prediction Error:", error);
      setResult("Error: Could not connect to AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">AgriSmart AI 🌾</h1>
        <p className="text-gray-500 text-center mb-6">Enter soil metrics to find the best crop.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nitrogen (N)</label>
              <input type="number" name="N" required value={formData.N} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phosphorous (P)</label>
              <input type="number" name="P" required value={formData.P} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Potassium (K)</label>
              <input type="number" name="K" required value={formData.K} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">pH Level</label>
              <input type="number" step="0.1" name="ph" required value={formData.ph} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-gray-400">
            {loading ? "Analyzing Soil..." : "Predict Best Crop"}
          </button>
        </form>

        {/* Display the Result */}
        {result && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <h2 className="text-lg text-gray-700">Recommended Crop:</h2>
            <p className="text-3xl font-extrabold text-green-800 capitalize mt-2">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}