import { FadeIn } from './FadeIn';
import { BilingualTextSwap } from './BilingualTextSwap';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[85vh] md:h-screen overflow-hidden text-foreground flex flex-col justify-center px-6 md:px-24 lg:px-32 pb-20 md:pb-0 pt-24 md:pt-0">
      
      {/* 艺术化底层水印文字 (仅桌面端) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[12rem] lg:text-[16rem] font-black tracking-tighter whitespace-nowrap">
          PRODUCT
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* 左上角：双语动画大标题 */}
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

        {/* 现代极简风格副标题 */}
        <FadeIn delay={0.4} direction="up" viewportMargin="0px">
          <div className="inline-flex items-center gap-3 backdrop-blur-md bg-white/60 border border-black/5 px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all mt-6 md:mt-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0"></span>
            <h2 className="text-sm md:text-lg font-bold text-foreground/80 tracking-wide m-0">
              专注产品需求分析，深耕 B 端产品实践
            </h2>
          </div>
        </FadeIn>

        {/* 底部：操作按钮 (手机端隐藏) */}
        <FadeIn delay={0.6} direction="up" viewportMargin="0px">
          <div className="hidden md:flex flex-row items-stretch md:items-center gap-4 w-full md:w-auto mt-10 md:mt-16">
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
