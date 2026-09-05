import { FadeIn } from './FadeIn';
import { Briefcase, BarChart3, FileText, Blocks, Users } from 'lucide-react';

const experiences = [
  {
    icon: <Blocks className="w-6 h-6" />,
    title: "网点端核心业务闭环设计",
    details: [
      "深入主导售后体系“神经末梢”的网点端业务重构，独立完成网点领用开单、网点补库及工单订单等核心模块的 PRD 规划与交互设计。",
      "深度梳理历史系统逻辑，精细化重构多角色（网点管理员、备件专员等）的操作权限与交互链路。",
      "在需求评审阶段成功拉通多方诉求，输出适配全国复杂网点业态的产品方案。"
    ]
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "跨系统接口与数据流转规划",
    details: [
      "梳理网点备件系统与外部中台系统的底层交互方案设计。",
      "独立梳理并定义了“工单触发-库存扣减-领用出库”全环节的核心接口逻辑与跨系统数据字典。",
      "严密规划异常流回退机制，从源头保障复杂业务下的账实一致性，实现与研发零歧义交接。"
    ]
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "多端协同复杂链路拆解",
    details: [
      "深度拆解“总部超管录入 - 分中心调度 - 网点派工 - 工程师移动端履约及反馈”的长链路业务模型。",
      "针对 Web 端与 App 端跨端协同的复杂性，梳理并校验多角色权限与工单状态机流转逻辑，前置拦截关键业务阻断点。"
    ]
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "全链路业务交付与 UAT 验收",
    details: [
      "独立负责 P0 阶段 O2O 服务工单模块的全链路业务交付与 UAT（用户验收测试）。",
      "通过严格的边界测试与流程验证，有力保障了售后核心派单网络的高质量交付。"
    ]
  }
];

export function InternshipExperience() {
  return (
    <section className="py-20 bg-transparent border-t border-black/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <FadeIn direction="up" className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary">核心实习经历</h2>
              <p className="text-primary font-medium mt-1">美的集团 · 产品实习生</p>
              <p className="text-muted text-sm mt-1">售后备件供应链与 O2O 工单系统</p>
            </div>
          </div>
          <p className="text-slate-600 max-w-3xl leading-relaxed mt-4">
            深入主导美的售后体系的网点端业务重构，独立负责长链路 O2O 工单模块的全链路业务交付。
            涵盖底层交互方案设计、多端角色权限校验及跨系统数据字典定义，保障售后核心派单网络高质量落地。
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up">
              <div className="bg-secondary rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col group relative z-40">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    {exp.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                </div>
                <ul className="space-y-4 flex-1">
                  {exp.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-foreground/80 leading-relaxed text-sm font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0 shadow-[0_0_5px_rgba(79,70,229,0.5)]"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
