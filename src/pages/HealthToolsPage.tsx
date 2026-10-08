import React, { useState } from 'react';
import { 
  Scale, 
  Activity, 
  Droplet, 
  Moon, 
  Footprints, 
  Heart, 
  ShieldAlert, 
  Calculator,
  Flame
} from 'lucide-react';

export const HealthToolsPage: React.FC = () => {
  // BMI Tool
  const [bmiHeight, setBmiHeight] = useState('175');
  const [bmiWeight, setBmiWeight] = useState('68');

  const heightMeters = Number(bmiHeight) / 100;
  const bmiVal = heightMeters > 0 ? (Number(bmiWeight) / (heightMeters * heightMeters)).toFixed(1) : '0';
  const bmiNumber = parseFloat(bmiVal);
  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-600 bg-emerald-50';
  if (bmiNumber < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-blue-600 bg-blue-50';
  } else if (bmiNumber >= 25 && bmiNumber < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-600 bg-amber-50';
  } else if (bmiNumber >= 30) {
    bmiCategory = 'Obese Range';
    bmiColor = 'text-red-600 bg-red-50';
  }

  // Water Intake Tool
  const [waterWeight, setWaterWeight] = useState('68');
  const [activityMins, setActivityMins] = useState('45');
  const waterTargetLiters = ((Number(waterWeight) * 0.033) + (Number(activityMins) / 30) * 0.35).toFixed(1);

  // Calorie TDEE Tool
  const [calAge, setCalAge] = useState('21');
  const [calGender, setCalGender] = useState<'Male' | 'Female'>('Male');
  const [activityLevel, setActivityLevel] = useState('1.55'); // moderate
  const bmr = calGender === 'Male'
    ? 10 * Number(bmiWeight) + 6.25 * Number(bmiHeight) - 5 * Number(calAge) + 5
    : 10 * Number(bmiWeight) + 6.25 * Number(bmiHeight) - 5 * Number(calAge) - 161;
  const tdee = Math.round(bmr * parseFloat(activityLevel));

  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Interactive Clinical & Wellness Tools
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Standardized calculators validated by evidence-based preventive health algorithms.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Tool 1: BMI Calculator */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">BMI Calculator</h3>
                <p className="text-[11px] text-slate-500">Body Mass Index & Weight Classification</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Height (cm): {bmiHeight} cm</label>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  className="w-full accent-[#0878E8]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Weight (kg): {bmiWeight} kg</label>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  className="w-full accent-[#0878E8]"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Your BMI Score</span>
                <p className="text-3xl font-black text-slate-900">{bmiVal}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${bmiColor}`}>
                  {bmiCategory}
                </span>
                <p className="text-[10px] text-slate-500 pt-1">Healthy normal interval: 18.5 – 24.9 kg/m²</p>
              </div>
            </div>
          </div>

          {/* Tool 2: Daily Water Intake */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#16B8C4] flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Water Intake Estimator</h3>
                <p className="text-[11px] text-slate-500">Circadian hydration volume</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Body Weight (kg): {waterWeight} kg</label>
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={waterWeight}
                  onChange={(e) => setWaterWeight(e.target.value)}
                  className="w-full accent-[#16B8C4]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Daily Exercise (mins): {activityMins} mins</label>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="15"
                  value={activityMins}
                  onChange={(e) => setActivityMins(e.target.value)}
                  className="w-full accent-[#16B8C4]"
                />
              </div>

              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 text-center space-y-1">
                <span className="text-teal-700 text-[10px] uppercase font-bold tracking-wider">Recommended Daily Fluid</span>
                <p className="text-3xl font-black text-slate-900">{waterTargetLiters} L</p>
                <p className="text-[11px] text-teal-800 font-semibold">
                  Roughly {Math.round(parseFloat(waterTargetLiters) * 4)} standard 250ml glasses daily
                </p>
              </div>
            </div>
          </div>

          {/* Tool 3: Calorie & TDEE Calculator */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">TDEE Calorie Calculator</h3>
                <p className="text-[11px] text-slate-500">Total daily energy expenditure</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={calGender}
                    onChange={(e) => setCalGender(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age</label>
                  <input
                    type="number"
                    value={calAge}
                    onChange={(e) => setCalAge(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option value="1.2">Sedentary (Desk Job)</option>
                  <option value="1.375">Lightly Active (1-3 days/wk)</option>
                  <option value="1.55">Moderately Active (3-5 days/wk)</option>
                  <option value="1.725">Very Active (6-7 days/wk)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 text-center space-y-1">
                <span className="text-amber-800 text-[10px] uppercase font-bold tracking-wider">Maintenance Energy</span>
                <p className="text-3xl font-black text-slate-900">{tdee} kcal</p>
                <p className="text-[10px] text-slate-500">BMR Basal Metabolic Rate: {Math.round(bmr)} kcal</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
