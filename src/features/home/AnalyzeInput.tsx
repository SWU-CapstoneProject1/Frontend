import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'

import { analyzeTerms, analyzeUrl, analyzeFile } from '../../api/analyses'

interface AnalyzeInputProps {
  activeTab: 'url' | 'file' | 'text'
  onStartAnalysis: (analyzePromise: Promise<string>) => void
}

function AnalyzeInput({ activeTab, onStartAnalysis }: AnalyzeInputProps) {
  const navigate = useNavigate()
  
  // 부모의 탭 상태와 컴포넌트 내부 탭 모드를 일치
  const [activeMode, setActiveMode] = useState(activeTab)
  const [inputValue, setInputValue] = useState('')
  const [serviceName, setServiceName] = useState('') 
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 부모가 상단 텍스트/파일/URL 버튼을 클릭해 탭을 바꾸면 내부 모드도 동기화되도록 연동
  useEffect(() => {
    setActiveMode(activeTab)
    setInputValue('')
    setSelectedFile(null)
    setError(null)
  }, [activeTab])

  const inputModes = [
    { id: 'url', label: '🔗 URL' },
    { id: 'file', label: '📁 파일' },
    { id: 'text', label: 'T 텍스트' },
  ]

  const isInputValid = 
    serviceName.trim().length > 0 && 
    (activeMode === 'file' 
      ? selectedFile !== null 
      : inputValue.trim().length > 0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleAnalyze = () => {
    if (!isInputValid) return

    setError(null)
    const session_key = 'testkey'
    const service_name = serviceName.trim()

    let analyzePromise: Promise<string>

    if (activeMode === 'url') {
      analyzePromise = analyzeUrl({
        service_name,
        session_key,
        url: inputValue,
      })
    } else if (activeMode === 'text') {
      analyzePromise = analyzeTerms({
        service_name,
        session_key,
        text: inputValue,
      })
    } else if (activeMode === 'file' && selectedFile) {
      analyzePromise = analyzeFile(selectedFile, service_name, session_key)
    } else {
      return
    }

    onStartAnalysis(analyzePromise)
  }

  return (
    <div className="space-y-3 max-w-xl">
      
      <div className="w-full">
        <input
          type="text"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          placeholder="분석할 서비스 이름을 입력해주세요 (예: 당근마켓)"
          className="w-full px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-sm focus:outline-none focus:bg-white/60 transition-colors font-semibold text-stone-800"
        />
      </div>

      {/* 기존에 이쁘게 만들어뒀던 모드 선택 탭 컴포넌트 유지 */}
      <Tabs
        items={inputModes}
        activeId={activeMode}
        onChange={(id) => {
          setActiveMode(id as 'url' | 'file' | 'text')
          setInputValue('')
          setSelectedFile(null)
          setError(null)
        }}
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
            className="flex-1 px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-sm focus:outline-none focus:bg-white/60 transition-colors text-stone-800"
          />
        )}
        {activeMode === 'file' && (
          <label className="flex-1 px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 border-dashed rounded-xl text-sm text-stone-500 text-center cursor-pointer hover:bg-white/60 transition-colors flex items-center justify-center font-medium">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile ? (
              <span className="text-stone-900 font-bold">📄 {selectedFile.name}</span>
            ) : (
              <span>파일을 클릭하여 선택 (PDF, 이미지)</span>
            )}
          </label>
        )}
        {activeMode === 'text' && (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="약관 텍스트 붙여넣기..."
            className="flex-1 px-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl text-sm focus:outline-none text-stone-800 min-h-[48px] max-h-32"
          />
        )}

        <Button onClick={handleAnalyze} disabled={isLoading || !isInputValid}>
          분석하기
        </Button>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="text-xs text-red-400 pl-1">{error}</p>}

    </div>
  )
}

export default AnalyzeInput