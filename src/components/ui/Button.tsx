import type { ReactNode } from 'react'

// Props 타입 정의
interface ButtonProps {
  children: ReactNode              // 버튼 안에 들어갈 내용 (텍스트 등)
  variant?: 'primary' | 'ghost'    // 스타일 종류 (선택사항)
  onClick?: () => void             // 클릭 시 실행할 함수 (선택사항)
}

function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  // variant에 따라 다른 스타일 적용
  const styles = {
    primary: 'bg-ink text-white hover:bg-ink/90',
    ghost: 'bg-transparent text-ink hover:bg-ink/5',
  }

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-medium 
        transition-colors duration-200
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  )
}

export default Button