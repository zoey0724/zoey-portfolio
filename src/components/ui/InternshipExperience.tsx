import { FadeIn } from './FadeIn';
import { Briefcase, BarChart3, FileText, Blocks, Users } from 'lucide-react';

const experiences = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "运营数据可视化报表",
    details: [
      "独立清洗与校验机房运营数据（资源利用率、故障响应时长等核心指标），处理数据记录，修复多处历史口径不一致问题。",
      "设计多维可视化仪表盘，报表使用覆盖中台系统，被运维团队用于日常监控，管理层用于月度经营复盘。"
    ]
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "PRD 撰写与全流程落地",
    details: [
      "负责业务系统变更场景的 PRD 撰写，覆盖功能、流程、界面、数据、业务规则等大模块。",
      "完成原型设计，绘制变更流程图，确保开发团队对业务逻辑理解零偏差。",
      "建立统一数据字典，定义核心字段的标记规范与数据口径，结构化文档同步至前后端，支撑多团队协同交付。"
    ]
  },
  {
    icon: <Blocks className="w-6 h-6" />,
    title: "业财一体化系统架构设计与灵活性方案",
    details: [
      "参与业财一体化系统首页及核心功能模块输出，页面交付前端开发。",
      "针对复杂计费、分摊规则，设计可配置的接口逻辑，使系统适配多种业务场景无需二次开发，体现了极强的配置化产品思维。"
    ]
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "产品评审与跨部门协作",
    details: [
      "参与中台系统新功能页面评审会，基于业务场景提出多条优化建议并被采纳。",
      "深入理解动环系统、业务系统底层逻辑，明确每个指标的定义、业务场景及问题价值。"
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
              <p className="text-primary font-medium mt-1">广州尚航信息科技股份有限公司 · 产品需求分析实习生</p>
            </div>
          </div>
          <p className="text-slate-600 max-w-3xl leading-relaxed mt-4">
            深入参与 B 端复杂业务系统（中台系统、动环系统、业财一体化）的重构与设计，
            涵盖数据清洗、原型设计、PRD 撰写到跨部门协作的全流程产品实践。
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
