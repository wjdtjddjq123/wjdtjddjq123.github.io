
import './App.css'

export default function App() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* 네비게이션 */}
      <nav className="flex justify-between items-center p-8 max-w-6xl mx-auto">
        <div className="text-xl font-bold tracking-tighter text-blue-600">SEONG-EOP</div>
        <div className="space-x-8 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-black">Work</a>
          <a href="#" className="hover:text-black">About</a>
          <a href="#" className="hover:text-black">Contact</a>
        </div>
      </nav>

      {/* 히로 섹션 */}
      <header className="max-w-6xl mx-auto px-8 py-24">
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight mb-8">
          사용자의 마음을 움직이는 <br />
          <span className="text-blue-600">UI 디자이너</span> 성업입니다.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          단순한 예쁨을 넘어 사용성이 뛰어난 인터페이스를 설계합니다. 
          React와 Tailwind를 활용해 직접 코드로 디자인을 구현하는 것을 즐깁니다.
        </p>
      </header>

      {/* 프로젝트 그리드 */}
      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 프로젝트 카드 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-4 transition-transform group-hover:scale-[1.02]">
               {/* 여기에 프로젝트 이미지를 넣으세요 */}
               <div className="w-full h-full flex items-center justify-center text-gray-400">Project Image 01</div>
            </div>
            <h3 className="text-2xl font-bold">금융 앱 리디자인</h3>
            <p className="text-gray-500">UX Strategy, UI Design</p>
          </div>

          {/* 프로젝트 카드 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-4 transition-transform group-hover:scale-[1.02]">
               <div className="w-full h-full flex items-center justify-center text-gray-400">Project Image 02</div>
            </div>
            <h3 className="text-2xl font-bold">친환경 이커머스 플랫폼</h3>
            <p className="text-gray-500">Web Design, Branding</p>
          </div>
        </div>
      </section>
    </div>
  )
}
