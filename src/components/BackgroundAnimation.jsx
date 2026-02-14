export default function BackgroundAnimation({ theme }) {
  const isDark = theme === 'dark';
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#030712]' : 'bg-white'}`}>
      {/* Subtle Grid Pattern */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]'} bg-[size:40px_40px]`}></div>
      
      {/* Very Subtle Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-600/10'} rounded-full blur-[120px]`}></div>
    </div>
  );
}
