import { FadeIn } from './FadeIn';
import { BilingualTextSwap } from './BilingualTextSwap';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden text-foreground">
      {/* 左上角：双语动画大标题 */}
      <div className="absolute top-32 md:top-48 left-6 md:left-24 lg:left-32 z-10 w-[calc(100%-3rem)] md:w-auto">
        <FadeIn delay={0.2} direction="down" viewportMargin="0px">
          {/* 加入 pb-6 避免 bg-clip-text 裁切字母 y 的尾巴 */}
          <h1 className="text-[3.5rem] leading-[1.1] sm:text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-foreground pb-6">
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

      {/* 左下角：毛玻璃简介卡片 */}
      <div className="absolute bottom-40 sm:bottom-32 md:bottom-16 left-6 md:left-24 lg:left-32 z-10 max-w-[calc(100%-3rem)] md:max-w-xl">
        <FadeIn delay={0.4} direction="up" viewportMargin="0px">
          <div className="backdrop-blur-xl bg-white/70 border border-black/5 p-5 md:p-8 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:bg-white/90 hover:shadow-2xl group/card">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform scale-y-0 group-hover/card:scale-y-100 transition-transform origin-bottom duration-500"></div>
            
            <h2 className="text-lg md:text-2xl font-bold text-foreground mb-3 md:mb-4 leading-relaxed">
              专注产品需求分析，深耕 B 端产品实践。
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed font-medium">
              善于从业务场景出发，将复杂问题转化为清晰的产品方案。曾在广州尚航信息科技主导运营数据可视化与业财一体化系统 PRD 交付，具备扎实的数据分析与产品架构能力。
            </p>
          </div>
        </FadeIn>
      </div>

      {/* 底部：操作按钮 */}
      <div className="absolute bottom-8 md:bottom-16 left-6 md:left-auto md:right-12 z-10 w-[calc(100%-3rem)] md:w-auto">
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
