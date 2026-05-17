interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

function Slider({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1 
}: SliderProps) {
  // 현재 값의 퍼센트 위치 계산 (트랙 채우기용)
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="relative w-full h-6 flex items-center">
      
      {/* 배경 트랙 (회색) */}
      <div className="absolute w-full h-1.5 bg-stone-200 rounded-full" />
      
      {/* 채워지는 트랙 (파란색) */}
      <div 
        className="absolute h-1.5 bg-indigo-500 rounded-full"
        style={{ width: `${percent}%` }}
      />

      {/* 실제 input range (투명) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          absolute w-full h-6 
          appearance-none bg-transparent cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-indigo-500
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:active:cursor-grabbing
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-indigo-500
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:cursor-grab
        "
      />
    </div>
  )
}

export default Slider