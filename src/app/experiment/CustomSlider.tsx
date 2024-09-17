"use client";
import { useState } from "react";
import "./style.css"; // CSSは別ファイルで管理

export default function CustomSlider() {
  const [sliderValue, setSliderValue] = useState<number>(5); // スライダーの初期値
  const handleSliderChange = (e: any) => {
    setSliderValue(Number(e.target.value)); // スライダーの値を更新
  };

   const getSliderColor = () => {
  if (sliderValue == 0) return "#D3D3D3"; 
  if (sliderValue == 1) return "rgb(141, 238, 176)"; 
  if (sliderValue == 2) return "rgb(101, 229, 148)";
  if (sliderValue == 3) return "rgb(74, 222, 128)"; 
  if (sliderValue == 4) return "rgb(250, 227, 137)"; 
  if (sliderValue == 5) return "rgb(251, 217, 81)"; 
  if (sliderValue == 6) return "rgb(250, 204, 21)"; 
  if (sliderValue == 7) return "rgb(255, 170, 100)";
  if (sliderValue == 8) return "rgb(251, 146, 60)"; 
  if (sliderValue == 9) return "rgb(255, 116, 116)"; 
  return "rgb(253, 83, 83)"; 
  };

  return (
    <div className="h-screen w-100% flex flex-col justify-center items-center">
      <div className="w-2/3">
        <div>
          <input
            type="range"
            value={sliderValue}
            min="0"
            max="10"
            onChange={handleSliderChange}
            className="w-full cursor-pointer"
            style={
              {
                "--range-percent": `${sliderValue * 10}%`,
                "--slider-color": getSliderColor(),
              } as React.CSSProperties
            }
          />
          <div className="flex justify-between text-gray-400 -mt-1 text-sm">
            <div onClick={()=>  setSliderValue(0)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full -ml-2">0</div>
            <div onClick={()=>  setSliderValue(1)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full ml-1" >1</div>
            <div onClick={()=>  setSliderValue(2)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">2</div>
            <div onClick={()=>  setSliderValue(3)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">3</div>
            <div onClick={()=>  setSliderValue(4)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">4</div>
            <div onClick={()=>  setSliderValue(5)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">5</div>
            <div onClick={()=>  setSliderValue(6)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">6</div>
            <div onClick={()=>  setSliderValue(7)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">7</div>
            <div onClick={()=>  setSliderValue(8)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">8</div>
            <div onClick={()=>  setSliderValue(9)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">9</div>
            <div onClick={()=>  setSliderValue(10)} className="px-2 cursor-pointer hover:bg-gray-100 rounded-full -mr-3" >10</div>
          </div>
          <p>{sliderValue}</p>
        </div>
      </div>
    </div>
  );
}
