import { FadeIn } from './FadeIn';
import { ProjectCarousel3D } from './ProjectCarousel3D';
import { useLightbox } from './LightboxProvider';
import { ZoomIn } from 'lucide-react';
import Stack from './Stack';
import type { ProjectData } from './ProjectCarousel3D';

const BASE_URL = import.meta.env.BASE_URL;

const rightStackImages = [
  `${BASE_URL}xhs-right-1.webp`,
  `${BASE_URL}xhs-right-2.webp`,
  `${BASE_URL}xhs-right-3.webp`,
  `${BASE_URL}xhs-right-4.webp`,
  `${BASE_URL}xhs-right-5.webp`
];

const leftStackImages = [
  `${BASE_URL}xhs-1.webp`,
  `${BASE_URL}xhs-2.webp`,
  `${BASE_URL}xhs-3.webp`,
  `${BASE_URL}xhs-4.webp`,
  `${BASE_URL}xhs-5.webp`,
  `${BASE_URL}xhs-6.webp`,
  `${BASE_URL}xhs-7.webp`
];

const projects: ProjectData[] = [
  {
    title: "电力经营报表系统 (指挥舱)",
    company: "广州尚航信息科技",
    role: "产品需求分析实习生",
    date: "实习经历",
    description: "面向企业决策层、运营管理层及财务管理层的经营决策系统，实现电力经营从经验驱动升级为数据驱动。目标是将利润项目实现“看得见、算得清、管得住、赚得到”。",
    highlights: [
      "智能分析模块：大语言模型对各客户数据异常进行深度分析，自动定位原因并给出改善建议。",
      "功能模块：经营大盘全局指标卡、下钻分析、收入分析、风险控制、超卖规划。",
      "合同模拟器：客户画像逐月预测、条款推演，生成签约建议及完整利润报告。",
      "价值体现：分析模块将客户异常分析效率提升，建议采纳率达标；经营大盘让决策层分钟内掌握整体状态。"
    ],
    image: `${BASE_URL}idc-power-report.png`
  },
  {
    title: "深度学习教学助手",
    company: "AI 教学创新",
    role: "产品设计与 Agent 编排",
    date: "实战项目",
    description: "为初学者解决框架学习难题，搭建知识库，设计规范限制模型幻觉。解决环境配置、使用、调试困难等痛点。",
    highlights: [
      "确立系统回答准确性和专业性，通过向量数据库检索相关文档。",
      "多轮边界测试结果显示，针对特定典型场景，回答准确率达 90% 以上。",
      "对话式交互大幅提升学习效率，学生问题解决时间从平均 30 分钟缩短至 5 分钟。",
      "全连接网络搭建等场景验证了有效性。"
    ],
    image: `${BASE_URL}dl-assistant.png`
  },
  {
    title: "工业零件成本核算系统",
    company: "业务建模与低代码交付",
    role: "产品/项目主导",
    date: "实战项目",
    description: "构建工业零件成本核算模型，将零件、材料、制造工艺、间接费用等离散环节串联为清晰的全成本流转链路，确保从原材料入库到成品下线的每一分钱都可追溯、可解释。",
    highlights: [
      "抽象定义 10 大核心实体及 50+ 关键计算字段，彻底打通复杂业务流。",
      "利用低代码平台高效搭建 19 个核心交互页面，覆盖基础数据维护到成本一键核算全流程闭环。",
      "在原型阶段即实现了搜索、联动筛选、分页排序等高频交互细节。",
      "配置 API 接口，设计图形化费用占比分析看板（饼图、柱状图），强化方案说服力。"
    ],
    image: `${BASE_URL}bom-cost.png`
  },
  {
    title: "文献极速分析器工作流",
    company: "个人探索与自动化实践",
    role: "工作流设计",
    date: "实战项目",
    description: "快速翻译外文论文并生成结构化总结报告。单篇外文文献翻译总结时间从数小时缩短到几分钟，效率大幅提升。",
    highlights: [
      "自动化截取并翻译外文文献核心内容。",
      "自动生成结构化总结并输出报告。",
      "极大缩减阅读和梳理文献的时间成本。"
    ],
    image: `${BASE_URL}doc-analysis-workflow.png`
  },
  {
    title: "天气助手自动化工作流",
    company: "个人探索与自动化实践",
    role: "工作流设计",
    date: "实战项目",
    description: "每天定时获取广州天气并发送智能提醒到飞书。通过 n8n/Coze 等工具集成高德地图 API 与飞书机器人，实现数据处理与消息格式化。",
    highlights: [
      "调用高德地图 API 获取实时天气与预报。",
      "利用飞书机器人 Webhook 推送定制化消息。",
      "展现优秀的 API 接口调用与自动化编排逻辑设计能力。"
    ],
    image: `${BASE_URL}n8n-workflow.png`
  }
];

export function ProjectTimeline() {
  const { openLightbox } = useLightbox();

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn direction="up" className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-primary">项目实践与自媒体运营</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full shadow-glow"></div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h3 id="projects" className="text-2xl font-bold mb-4 text-center text-primary flex items-center justify-center scroll-mt-24">
            <span className="bg-gradient-to-r from-primary/50 to-transparent h-[1px] w-16 mr-4"></span>
            项目实践
            <span className="bg-gradient-to-l from-primary/50 to-transparent h-[1px] w-16 ml-4"></span>
          </h3>
          <p className="text-muted text-center max-w-2xl mx-auto text-sm font-medium mb-8">
            <span className="text-primary font-bold">点击卡片</span>即可翻转查看详细业务分析
          </p>
        </FadeIn>

        {/* 3D 旋转木马模块 */}
        <FadeIn direction="up" delay={0.2} className="relative z-40">
          <ProjectCarousel3D projects={projects} />
        </FadeIn>

        {/* 自动化实践与个人探索 Bento Grid */}
        <FadeIn direction="up" delay={0.4} className="mt-32">
          <div className="max-w-5xl mx-auto">
            <h3 id="portfolio" className="text-2xl font-bold mb-10 text-center text-primary flex items-center justify-center scroll-mt-24">
              <span className="bg-gradient-to-r from-primary/50 to-transparent h-[1px] w-16 mr-4"></span>
              自媒体运营
              <span className="bg-gradient-to-l from-primary/50 to-transparent h-[1px] w-16 ml-4"></span>
            </h3>
              {/* 小红书卡片 */}
              <div className="max-w-4xl mx-auto bg-secondary p-6 md:p-8 rounded-3xl shadow-soft border border-black/5 flex flex-col md:flex-row items-center gap-8 group hover:shadow-lg transition-all duration-300 relative z-40">
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                  <div 
                    onClick={() => openLightbox(`${BASE_URL}xiaohongshu-cover.webp`)}
                    className="w-full overflow-hidden rounded-2xl border border-black/5 shadow-sm relative group/img cursor-pointer"
                  >
                    <img src={`${BASE_URL}xiaohongshu-cover.webp`} alt="小红书运营" className="w-full h-auto object-cover transform group-hover/img:scale-105 transition-transform duration-700 pointer-events-none" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full border border-black/5 text-foreground/80 opacity-100 md:opacity-0 group-hover/img:opacity-100 hover:bg-white transition-all shadow-lg z-10">
                      <ZoomIn className="w-5 h-5 md:w-4 md:h-4" />
                    </div>
                  </div>
                  
                  {/* 下方的双堆叠展示区 */}
                  <div className="flex flex-row justify-center items-center gap-8 w-full mt-2">
                    {/* 左侧堆叠 */}
                    <div className="relative z-10 flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-[150px] md:h-[150px]">
                      <Stack
                        randomRotation={true}
                        sensitivity={180}
                        sendToBackOnClick={true}
                        cards={leftStackImages.map((src, i) => (
                          <img 
                            key={`left-${i}`} 
                            src={src} 
                            alt={`左侧展示-${i + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                            className="bg-muted rounded-xl shadow-sm border border-black/5"
                          />
                        ))}
                      />
                    </div>
                    {/* 右侧堆叠 */}
                    <div className="relative z-10 flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-[150px] md:h-[150px]">
                      <Stack
                        randomRotation={true}
                        sensitivity={180}
                        sendToBackOnClick={true}
                        cards={rightStackImages.map((src, i) => (
                          <img 
                            key={`right-${i}`} 
                            src={src} 
                            alt={`右侧展示-${i + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                            className="bg-muted rounded-xl shadow-sm border border-black/5"
                          />
                        ))}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-bold text-2xl text-primary">小红书时尚风格账号运营</h4>
                  </div>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    基于个人穿搭探索用户审美偏好，建立穿搭分享矩阵。在实践中沉淀了深刻的用户审美洞察与平台流量运营经验，粉丝数显著增长。
                  </p>
                </div>
              </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
