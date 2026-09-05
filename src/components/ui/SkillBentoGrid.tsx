import { FadeIn } from './FadeIn';
import { Database, BrainCircuit, GraduationCap, Trophy } from 'lucide-react';

export function SkillBentoGrid() {
  return (
    <section className="py-24 bg-transparent relative z-10 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn direction="up" className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-primary">核心能力与荣誉</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6 shadow-glow"></div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          
          {/* 教育背景 - 占据2列 */}
          <FadeIn delay={0.1} viewportMargin="0px" className="md:col-span-2 bg-secondary border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-shadow duration-300 group overflow-hidden relative z-40">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:bg-primary/20 transition-colors"></div>
            <GraduationCap className="w-12 h-12 text-primary mb-6 group-hover:-translate-y-1 transition-transform relative z-10" />
            <h3 className="text-2xl font-bold mb-2 text-primary relative z-10">教育背景</h3>
            <p className="text-xl font-semibold text-foreground relative z-10">广东工业大学</p>
            <p className="text-muted mb-4 relative z-10">计算机学院 · 工业软件专业</p>
            <div className="relative z-10 flex flex-wrap gap-2 mt-4">
              {['机器学习与深度学习', '产品交互式设计', '数据库', '有限元分析', '最优化方法', '工程自动化', '嵌入式程序设计'].map(course => (
                <span key={course} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20 font-medium">
                  {course}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-black/5 pt-5 mt-auto relative z-10">
              <span className="text-sm font-medium text-muted">2023.09 - 2027.06</span>
              <span className="text-sm font-medium text-muted">GPA: 3.78 (前15%)</span>
            </div>
          </FadeIn>

          {/* AI与产品战略 - 占据2列 */}
          <FadeIn delay={0.2} viewportMargin="0px" className="md:col-span-2 lg:col-span-2 bg-secondary border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-shadow duration-300 group relative z-40">
            <BrainCircuit className="w-12 h-12 text-primary mb-6 group-hover:-translate-y-1 transition-transform" />
            <h3 className="text-xl font-bold mb-5 text-primary">AI 与产品工具</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-foreground/80 font-medium">
                <div className="w-2 h-2 rounded-full bg-primary mr-4 shadow-[0_0_5px_rgba(79,70,229,0.5)]"></div>
                掌握 RAG 检索增强生成与 Agent 智能体架构
              </li>
              <li className="flex items-center text-foreground/80 font-medium">
                <div className="w-2 h-2 rounded-full bg-primary mr-4 shadow-[0_0_5px_rgba(79,70,229,0.5)]"></div>
                熟练通过 Dify / Coze 搭建 AI 应用与工作流
              </li>
              <li className="flex items-center text-foreground/80 font-medium">
                <div className="w-2 h-2 rounded-full bg-primary mr-4 shadow-[0_0_5px_rgba(79,70,229,0.5)]"></div>
                熟练使用 Axure / Figma 完成高保真产品原型设计
              </li>
            </ul>
          </FadeIn>

          {/* 数据与工程基础 - 占据2列 (在大屏下) */}
          <FadeIn delay={0.1} viewportMargin="0px" className="md:col-span-2 lg:col-span-2 bg-secondary border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-shadow duration-300 group relative z-40">
            <Database className="w-10 h-10 text-primary mb-6 group-hover:-translate-y-1 transition-transform" />
            <h3 className="text-lg font-bold mb-5 text-primary">数据与工程基础</h3>
            <div className="flex flex-wrap gap-3">
              {['MATLAB 数据处理', 'SQL 数据库', 'ABAQUS 仿真分析', 'AutoCAD 三维建模', 'Cursor AI辅助编程'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-white border border-black/5 rounded-xl text-sm font-medium text-foreground/80 hover:bg-black/5 hover:text-foreground transition-all shadow-sm">{skill}</span>
              ))}
            </div>
          </FadeIn>

          {/* 奖项 - 占据2列 */}
          <FadeIn delay={0.2} viewportMargin="0px" className="md:col-span-2 lg:col-span-2 bg-secondary border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-shadow duration-300 group relative z-40">
            <Trophy className="w-10 h-10 text-primary mb-6 group-hover:-translate-y-1 transition-transform" />
            <h3 className="text-xl font-bold mb-5 text-primary">所获奖项与经历</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '大创国银/挑战杯省银奖',
                '优秀学生二等奖学金',
                '英语六级 / 普通话二甲',
                '法国高等教育署校园大使'
              ].map(award => (
                <div key={award} className="bg-white p-3.5 rounded-xl text-sm font-medium text-foreground/80 border border-black/5 shadow-sm flex items-center hover:shadow-md transition-shadow">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 shadow-[0_0_5px_rgba(79,70,229,0.5)]"></div>
                  {award}
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
