function Footer() {
  const links = [
    { label: '이용약관', href: '#' },
    { label: '개인정보처리방침', href: '#' },
    { label: '문의하기', href: '#' },
  ]

  return (
    <footer className="mt-20 px-6 py-8 border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto">
        
        {/* 상단: 브랜딩 + 링크 */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          
          {/* 좌측: 브랜딩 */}
          <div className="space-y-1">
            <p className="font-semibold text-ink">약간동의</p>
            <p className="text-xs text-ink-soft">AI 기반 약관 분석 서비스</p>
            <p className="text-xs text-ink-soft">불공정 조항을 빠르게 탐지합니다</p>
          </div>

          {/* 우측: 링크들 */}
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* 하단: 저작권 */}
        <p className="text-xs text-ink-soft/60 leading-relaxed">
          © 2026 약간동의. All rights reserved. 
          This service is for informational purposes only and does not constitute legal advice.
        </p>

      </div>
    </footer>
  )
}

export default Footer