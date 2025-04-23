import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const expTable = {
  82: 3913127, 83: 4127566, 84: 4353756, 85: 4592341, 86: 4844001,
  87: 5109452, 88: 5389449, 89: 5684790, 90: 5996316, 91: 6324914,
  92: 6671519, 93: 7037118, 94: 7422752, 95: 7829518, 96: 8258575,
  97: 8711144, 98: 9188514, 99: 9692044, 100: 10223168, 101: 10783397,
  102: 11374327, 103: 11997640, 104: 12655110, 105: 13348610,
  106: 14080113, 107: 14851703, 108: 15665576, 109: 16524049,
  110: 17429566, 111: 18384706, 112: 19392187, 113: 20454878,
  114: 21575805, 115: 22758159, 116: 24005306, 117: 25320796,
  118: 26708375, 119: 28171993, 120: 29715818, 121: 31344244,
  122: 33061908, 123: 34873700, 124: 36784778, 125: 38800583,
  126: 40926854, 127: 43169645, 128: 45535341, 129: 48030677,
  130: 50662758, 131: 53439077, 132: 56367538, 133: 59456479,
  134: 62714694, 135: 66151459, 136: 69776558, 137: 73600313,
  138: 77633610, 139: 81887931, 140: 86381374
};

const hourlyRate = 250;
const expPerMinute = 333000; // 平均每分鐘經驗值，依據前表抓的粗估值

export default function LevelTool() {
  const [start, setStart] = useState("82");
  const [end, setEnd] = useState("120");
  const [doubleXP, setDoubleXP] = useState(false);
  const [result, setResult] = useState({ exp: 0, minutes: 0, price: 0 });

  useEffect(() => {
    const s = parseInt(start);
    const e = parseInt(end);
    if (s >= e) return setResult({ exp: 0, minutes: 0, price: 0 });

    let totalExp = 0;
    for (let i = s; i < e; i++) {
      totalExp += expTable[i] || 0;
    }
    const minutes = Math.ceil(totalExp / expPerMinute);
    const adjusted = doubleXP ? Math.ceil(minutes * 0.666) : minutes;
    const price = Math.ceil((adjusted / 60) * hourlyRate);

    setResult({ exp: totalExp, minutes: adjusted, price });
  }, [start, end, doubleXP]);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>起始等級</Label>
              <Select value={start} onValueChange={setStart}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.keys(expTable).map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>目標等級</Label>
              <Select value={end} onValueChange={setEnd}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.keys(expTable).map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={doubleXP} onCheckedChange={setDoubleXP} />
            <Label>使用雙倍卡</Label>
          </div>
          <div className="space-y-1">
            <div>📊 總經驗值：{result.exp.toLocaleString()}</div>
            <div>⏱️ 所需時間：約 {result.minutes} 分鐘</div>
            <div>💰 建議收費：{result.price}（單位 250）</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
