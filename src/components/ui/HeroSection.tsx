import { FadeIn } from './FadeIn';
import { BilingualTextSwap } from './BilingualTextSwap';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[85vh] md:h-screen overflow-hidden text-foreground flex flex-col justify-center px-6 md:block md:px-0 pb-20 md:pb-0 pt-24 md:pt-0">
      {/* 左上角：双语动画大标题 */}
      <div className="relative md:absolute md:top-48 md:left-24 lg:left-32 z-10 w-full md:w-auto">
        <FadeIn delay={0.2} direction="down" viewportMargin="0px">
          {/* 加入 pb-6 避免 bg-clip-text 裁切字母 y 的尾巴 */}
          <h1 className="text-5xl leading-[1.2] sm:text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-foreground pb-6 whitespace-nowrap md:whitespace-normal">
            <BilingualTextSwap 
              text1={[
                { char: '你' }, { char: '好' }, { char: '，' }, { char: '我' }, { char: '是' }, { char: ' ' },
                { char: '赵', highlight: true }, { char: '奕', highlight: true }
              ]}
              text2={[
                { char: 'H' }, { char: 'e' }, { char: 'l' }, { char: 'l' }, { char: 'o' }, { char: ',' }, { char: ' ' },
                { char: 'I' }, { char: '\'' }, { char: 'm' }, { char: ' ' },
                { char: 'Z', highlight: true }, { char: 'o', highlight: true }, { char: 'e', highlight: true }, { char: 'y', highlight: true }
              ]}
            />
          </h1>
        </FadeIn>
      </div>

      {/* 现代极简风格副标题 */}
      <div className="relative mt-6 md:mt-0 md:absolute md:top-[65%] md:left-24 lg:left-32 z-10 w-full md:w-auto">
        <FadeIn delay={0.4} direction="up" viewportMargin="0px">
          <div className="inline-flex items-center gap-3 backdrop-blur-md bg-white/60 border border-black/5 px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0"></span>
            <h2 className="text-sm md:text-lg font-bold text-foreground/80 tracking-wide m-0">
              专注产品需求分析，深耕 B 端产品实践
            </h2>
          </div>
        </FadeIn>
      </div>

      {/* 底部：操作按钮 */}
      <div className="hidden md:block absolute bottom-8 md:bottom-16 left-6 md:left-auto md:right-12 z-10 w-[calc(100%-3rem)] md:w-auto">
        <FadeIn delay={0.6} direction="up" viewportMargin="0px">
          <div className="flex flex-row md:flex-row items-stretch md:items-center gap-3 w-full">
            <a 
              href="#experience" 
              className="px-6 md:px-8 py-3.5 md:py-4 bg-primary text-white rounded-full font-bold shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] transition-all duration-300 transform hover:-translate-y-1 text-center whitespace-nowrap flex-1 md:flex-none text-sm md:text-base"
            >
              查看项目实践
            </a>
            <button 
              onClick={onContactClick} 
              className="px-6 md:px-8 py-3.5 md:py-4 bg-secondary hover:bg-black/5 text-foreground rounded-full font-bold border border-black/5 transition-all duration-300 transform hover:-translate-y-1 shadow-sm cursor-pointer text-center whitespace-nowrap flex-1 md:flex-none text-sm md:text-base"
            >
              联系我
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
