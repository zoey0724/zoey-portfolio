import { HeroSection } from './components/ui/HeroSection';
import { ProjectTimeline } from './components/ui/ProjectTimeline';
import { InternshipExperience } from './components/ui/InternshipExperience';
import { SkillBentoGrid } from './components/ui/SkillBentoGrid';
import LiquidEther from './components/ui/LiquidEther';
import { LightboxProvider } from './components/ui/LightboxProvider';
import { ContactBadge } from './components/ui/ContactBadge';
import { LineSidebar } from './components/ui/LineSidebar';
import type { SidebarItem } from './components/ui/LineSidebar';
import { useState, useEffect, useRef, useMemo } from 'react';

const sidebarItems: SidebarItem[] = [
  { id: 'hero', label: '首页简介', level: 0 },
  { id: 'experience', label: '项目实践与自媒体运营', level: 0 },
  { id: 'projects', label: '项目实践', level: 1 },
  { id: 'portfolio', label: '自媒体运营', level: 1 },
  { id: 'internship', label: '核心实习经历', level: 0 },
  { id: 'skills', label: '核心能力与荣誉', level: 0 }
];

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const ids = sidebarItems.map(item => item.id);
      let current = ids[0];
      const threshold = window.innerHeight * 0.4; // 触发阈值：视口顶部往下 40%

      // 从下往上遍历，找到第一个进入视口的区块，避免超大区块底部和下一个区块顶部干扰
      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSidebarClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isScrollingRef.current = true;
      
      // 1. 先立即更新状态，让侧边栏去触发它自己的高亮和折叠/展开动画
      setActiveSection(id);
      
      // 2. 延迟 100 毫秒，等 React 渲染完成、DOM 稳定后再去触发浏览器的原生平滑滚动
      // 这样可以彻底避免“滚动刚启动就被 React 的重绘打断”的问题
      setTimeout(() => {
        const targetEl = document.getElementById(id);
        if (targetEl) {
          const y = targetEl.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      
      // 3. 预估平滑滚动时间，结束后释放滚动锁（100ms 延迟 + 800ms 滚动时间）
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };
  // 缓存极高耗能的 WebGL 和 3D 轮播图组件，防止 activeSection 改变时触发全局重绘导致滑动卡顿
  const liquidEtherBackground = useMemo(() => (
    <div className="fixed inset-0 w-full h-full z-0 opacity-30 mix-blend-multiply pointer-events-none">
      <LiquidEther
        colors={[ '#e2e8f0', '#f1f5f9', '#e0e7ff' ]}
        mouseForce={5}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  ), []);

  const memoizedContent = useMemo(() => (
    <main>
      <div id="hero">
        <HeroSection onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectTimeline />
      <div id="internship">
        <InternshipExperience />
      </div>
      <div id="skills">
        <SkillBentoGrid />
      </div>
    </main>
  ), []);

  return (
    <LightboxProvider>
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary relative">
      {/* 全局 3D 流体背景 */}
      {liquidEtherBackground}

      <div className="relative z-10">
      
      {/* 侧边栏 */}
      <LineSidebar 
        items={sidebarItems}
        activeId={activeSection}
        onItemClick={handleSidebarClick}
        className="hidden lg:block z-50 mix-blend-multiply pointer-events-auto"
      />

      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-black/5 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-extrabold text-2xl tracking-tighter text-primary">Zoey.</span>
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold text-muted">
            <a href="#experience" className="hover:text-primary transition-colors">项目实践与自媒体运营</a>
            <a href="#internship" className="hover:text-primary transition-colors">实习经历</a>
            <a href="#skills" className="hover:text-primary transition-colors">技能与荣誉</a>
            <button onClick={() => setIsContactOpen(true)} className="px-5 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer">联系我</button>
          </div>
        </div>
      </nav>

      {memoizedContent}

      {/* 页脚 */}
      <footer className="py-12 bg-transparent border-t border-black/5 text-center text-muted text-sm">
        <p className="font-medium">© {new Date().getFullYear()} 赵奕 (Zoey). All rights reserved.</p>
        <p className="mt-2 text-xs opacity-70">专注产品需求分析 · 深耕 B 端实践</p>
      </footer>
      
      <ContactBadge isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </div>
    </LightboxProvider>
  );
}

export default App;
