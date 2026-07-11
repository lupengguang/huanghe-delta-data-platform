function TechBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>
      
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-500/20 to-purple-600/20 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/25 to-blue-500/20 blur-[100px] bottom-[-50px] right-[-100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-600/20 blur-[80px] top-[40%] left-[30%] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-red-600/20 to-pink-500/20 blur-[60px] top-[60%] right-[20%] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-[70px] top-[20%] right-[40%] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03)_0%,_transparent_70%)]"></div>
      
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40"></div>
    </div>
  );
}

export default TechBackground;