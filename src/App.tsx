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
  const [isMobile, setIsMobile] = useState(false);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // 移动端既然不显示侧边栏，就彻底关闭滚动监听，防止任何无意义的 state 更新打断滚动惯性
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        
        // 找到所有与视口交叉的元素
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // 如果有多个元素可见，取最后（最靠下）的一个，更符合向下滚动时的直觉
          const currentId = visibleEntries[visibleEntries.length - 1].target.id;
          setActiveSection(currentId);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // 当元素进入屏幕中间区域时触发
        threshold: 0
      }
    );

    const ids = sidebarItems.map(item => item.id);
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile]);

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
      {/* 全局 3D 流体背景：移动端直接不渲染，省下 100% 的 GPU 性能，根治卡顿 */}
      {!isMobile && liquidEtherBackground}

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
