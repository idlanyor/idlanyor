export default function BackgroundAnimation({ theme }) {
  const isDark = theme === 'dark';
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0f172a]' : 'bg-[#e0e5ec]'}`}>
      {/* Subtle Grid Pattern */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]'} bg-[size:40px_40px]`}></div>
      
      {/* Aurora Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/50 dark:bg-blue-600/40 rounded-full blur-[100px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
      
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-red-400/50 dark:bg-red-600/40 rounded-full blur-[100px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
      
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-indigo-400/40 dark:bg-indigo-600/30 rounded-full blur-[100px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
      
      {/* Ambient center glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] ${isDark ? 'bg-blue-900/20' : 'bg-blue-200/30'} rounded-full blur-[150px]`}></div>
    </div>
  );
}
