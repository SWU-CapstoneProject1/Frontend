import { useState } from 'react'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'

function AnalyzeInput() {
  const [activeMode, setActiveMode] = useState('url')
  const [inputValue, setInputValue] = useState('')

  const inputModes = [
    { id: 'url', label: '🔗 URL' },
    { id: 'file', label: '📁 파일' },
    { id: 'text', label: 'T 텍스트' },
  ]

  const handleAnalyze = () => {
    alert(`[${activeMode}] 모드로 분석: ${inputValue}`)
  }

  return (
    <div className="space-y-3 max-w-xl">
      
      {/* 모드 선택 탭 */}
      <Tabs
        items={inputModes}
        activeId={activeMode}
        onChange={setActiveMode}
        variant="underline"
      />

      {/* 입력창 + 버튼 */}
      <div className="flex gap-2">
        {activeMode === 'url' && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com/terms"
            className="flex-1 px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-sm focus:outline-none focus:bg-white/60 transition-colors"
          />
        )}
        {activeMode === 'file' && (
          <div className="flex-1 px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 border-dashed rounded-xl text-sm text-ink-soft text-center">
            파일을 드래그하거나 클릭
          </div>
        )}
        {activeMode === 'text' && (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="약관 텍스트 붙여넣기..."
            className="flex-1 px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-sm focus:outline-none min-h-[48px] max-h-32"
          />
        )}
        
        <Button onClick={handleAnalyze}>
          분석하기
        </Button>
      </div>

    </div>
  )
}

export default AnalyzeInput