import React from "react";
import { useSnapshot } from "valtio";
import { cakeState } from "../state/cakeState";
import axios from "axios";
import { Wand2, Loader2 } from "lucide-react";

const Controls = () => {
  const snap = useSnapshot(cakeState);

  const handleGenerate = async () => {
    cakeState.isGenerating = true;
    try {
      const { data } = await axios.post("http://localhost:5006/api/customize/generate", {
        prompt: `A ${snap.layers} tier cake with ${snap.toppings.join(", ")}`,
        color: snap.color,
      });

      if (data.success) {
        cakeState.color = data.cakeConfig.frostingColor;
        cakeState.aiDesign = {
          name: data.cakeConfig.description,
          message: data.cakeConfig.message,
        };
      }
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      cakeState.isGenerating = false;
    }
  };

  return (
    <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl p-6 z-10">
      <h1 className="text-xl font-bold mb-6">🎂 Customize Cake</h1>
      
      <div className="space-y-6">
        <section>
          <label className="text-sm font-semibold">Frosting Color</label>
          <input 
            type="color" 
            value={snap.color} 
            onChange={(e) => cakeState.color = e.target.value}
            className="w-full h-10 mt-2 rounded border"
          />
        </section>

        <section>
          <label className="text-sm font-semibold">Layers (Tiers): {snap.layers}</label>
          <input 
            type="range" min="1" max="3" value={snap.layers} 
            onChange={(e) => cakeState.layers = Number(e.target.value)}
            className="w-full accent-pink-500"
          />
        </section>

        <button 
          onClick={handleGenerate}
          disabled={snap.isGenerating}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold flex items-center justify-center gap-2"
        >
          {snap.isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
          Generate Cake
        </button>
      </div>
    </div>
  );
};

export default Controls;