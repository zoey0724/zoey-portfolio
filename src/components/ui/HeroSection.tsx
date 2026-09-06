import { FadeIn } from './FadeIn';
import { BilingualTextSwap } from './BilingualTextSwap';
import SpecularButton from './SpecularButton';

interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps = {}) {
  return (
    <section className="relative w-full min-h-[85vh] md:h-screen overflow-hidden text-foreground flex flex-col justify-center items-center px-6 md:px-0 pb-20 md:pb-0 pt-24 md:pt-0">
      
      {/* 艺术化底层水印文字 (仅桌面端) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none select-none opacity-[0.02]">
        <h1 className="text-[15rem] lg:text-[20rem] font-black tracking-tighter whitespace-nowrap">
          ZOEY
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* 居中双语动画大标题 */}
        <FadeIn delay={0.2} direction="down" viewportMargin="0px">
          {/* 加入 pb-6 避免 bg-clip-text 裁切字母 y 的尾巴 */}
          <h1 className="text-5xl leading-[1.2] sm:text-6xl md:text-[7rem] lg:text-[8.5rem] font-black tracking-tighter text-foreground pb-6 whitespace-nowrap md:whitespace-normal">
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

        {/* 现代极简风格副标题 (光束跟踪高亮效果) */}
        <FadeIn delay={0.4} direction="up" viewportMargin="0px">
          <div className="mt-4 md:mt-8 relative group">
            <SpecularButton
              size="lg"
              radius={9999}
              tint="#ffffff"
              tintOpacity={0}
              blur={0}
              textColor="inherit"
              lineColor="#4f46e5" // Primary color shine
              baseColor="rgba(255, 255, 255, 0.7)" // Glassmorphism base
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1.5}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              className="backdrop-blur-md shadow-sm hover:shadow-md transition-shadow font-sans"
            >
              <div className="flex items-center gap-3 px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0"></span>
                <h2 className="text-sm md:text-xl font-bold text-foreground/80 tracking-widest m-0">
                  专注产品需求分析，深耕 B 端产品实践
                </h2>
              </div>
            </SpecularButton>
          </div>
        </FadeIn>
        
        {/* 按钮已全部删除，让极简排版与底部 3D 流体空间完全释放，达到纯粹的艺术留白（Negative Space）效果 */}
      </div>
    </section>
  );
}
