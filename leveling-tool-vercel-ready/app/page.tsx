"use client";
import { useState } from "react";

const expTable = {
  82: 0, 83: 3913127, 84: 4127566, 85: 4353756, 86: 4592341,
  87: 4844001, 88: 5109452, 89: 5389449, 90: 5684790, 91: 5996316,
  92: 6324914, 93: 6671519, 94: 7037118, 95: 7422752, 96: 7829518,
  97: 8258575, 98: 8711144, 99: 9188514, 100: 9692044, 101: 10223168,
  102: 10783397, 103: 11374327, 104: 11997640, 105: 12655110, 106: 13348610,
  107: 14080113, 108: 14851703, 109: 15665576, 110: 16524049, 111: 17429566,
  112: 18384706, 113: 19392187, 114: 20454878, 115: 21575805, 116: 22758159,
  117: 24005306, 118: 25320796, 119: 26708375, 120: 28171993, 121: 29715818,
  122: 31344244, 123: 33061908, 124: 34873700, 125: 36784778, 126: 38800583,
  127: 40926854, 128: 43169645, 129: 45535341, 130: 48030677, 131: 50662758,
  132: 53439077, 133: 56367538, 134: 59456479, 135: 62714694, 136: 66151459,
  137: 69776558, 138: 73600313, 139: 77633610, 140: 81887931
};

const pricePerHour = 250;
const expPerHour = 8960000;

export default function LevelingTool() {
  const [start, setStart] = useState(90);
  const [end, setEnd] = useState(120);

  const calcTotalExp = () => {
    let total = 0;
    for (let i = start + 1; i <= end; i++) {
      total += expTable[i] || 0;
    }
    return total;
  };

  const totalExp = calcTotalExp();
  const hours = totalExp / expPerHour;
  const price = Math.ceil(hours * pricePerHour);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">練等價格試算</h1>
      <div className="mb-4">
        <label className="block mb-1">起始等級：</label>
        <select className="w-full border p-2" value={start} onChange={(e) => setStart(Number(e.target.value))}>
          {Object.keys(expTable).map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">目標等級：</label>
        <select className="w-full border p-2" value={end} onChange={(e) => setEnd(Number(e.target.value))}>
          {Object.keys(expTable).filter((lvl) => Number(lvl) > start).map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>
      <div className="mt-6">
        <p>總經驗值：{totalExp.toLocaleString()} EXP</p>
        <p>估算時間：約 {hours.toFixed(1)} 小時</p>
        <p className="text-lg font-semibold">估算金額：NT$ {price}</p>
      </div>
    </div>
  );
}
