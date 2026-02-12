export default function Navbar() {
  return (
    <nav className="max-w-5xl mx-auto flex justify-between items-center mb-16">
      <div className="text-xl font-black italic tracking-tighter">S.E.O.P</div>
      <div className="flex gap-6 text-sm text-gray-400 uppercase tracking-widest">
        <span className="hover:text-white cursor-pointer transition-colors">Works</span>
        <span className="hover:text-white cursor-pointer transition-colors">About</span>
        <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-gray-200 transition-all">
          Hire Me
        </button>
      </div>
    </nav>
  );
}