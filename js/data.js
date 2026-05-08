/**
 * 面试通关宝 - 题库数据文件
 * 你可直接编辑这个文件来更新所有内容！
 */

var QUESTIONS = [
  { id: "self-intro-01", category: "自我介绍类", question: "请做个自我介绍", weight: "高", weightScore: 9, isPremium: false,
    interviewerWants: "考察表达逻辑、岗位匹配度。面试官不是想听你背简历，而是想快速判断你这个人靠不靠谱、适不适合这个岗位。",
    pitfallTips: "不要从头背到尾像念稿；不要超过2分钟没有重点。核心：按「我是谁→我能做什么→我为什么适合」三段式走。",
    starFramework: { situation: "当前求职阶段或职业背景", task: "目标岗位的核心要求是什么", action: "我具备哪些匹配的技能和经验", result: "我能为团队带来什么价值" },
    versions: { short: "面试官好，我叫张明，有5年互联网运营经验，擅长通过A/B测试优化转化漏斗，过去一年将付费转化率从2.1%提升到3.8%。我来面试贵公司的用户增长负责人岗位，因为贵公司在知识付费领域的发展方向和我擅长的策略高度契合。", standard: "分三个方面。第一，职业背景。5年互联网运营经验，前3年在美团做商家运营，近2年专注用户增长。第二，核心能力。擅长数据驱动的精细化运营，去年通过6轮A/B测试将付费转化率从2.1%提升到3.8%，月增收280万。第三，来贵公司的原因。你们正从工具类产品向内容社区转型，这恰是我擅长的领域。" },
    compareExample: { poor: "我叫张明，今年27岁，2019年毕业于XX大学市场营销专业。我平时喜欢打篮球。", excellent: "5年用户增长经验，核心能力是数据驱动的精细化运营——去年通过6轮A/B测试将付费转化率从2.1%提升到3.8%，月增收280万。我来面试这个岗位，因为贵公司正在从工具转型内容社区，这刚好是我最擅长的方向。", keyDiff: "普通回答是简历口述版，高分回答是价值推销版。核心差异：不说我做过什么，说我能为你解决什么。" } },  { id: "self-intro-02", category: "自我介绍类", question: "用三个词形容你自己", weight: "中", weightScore: 6, isPremium: true,
    interviewerWants: "考察自我认知能力、是否了解岗位核心要求、能否有说服力地证明自己。",
    pitfallTips: "不说大词不给证据；三个词不要雷同；不讲和工作无关的品质。",
    starFramework: { situation: "这个词对应的工作场景", task: "面临的挑战", action: "我展现了这个品质的具体行为", result: "带来的结果" },
    versions: { short: "三个词：数据敏感、执行力强、善协作。数据敏感：发现周末订单取消率异常高，推动优化后取消率从15%降到3%。执行力强：3个月跑了6轮A/B测试，转化率提升80%。善协作：建跨部门沟通机制被团队沿用至今。", standard: "数据敏感——在美团时发现周末午市订单取消率比平时高15%，追查后推动算法优化降到3%。结果导向——把转化率优化目标拆成12个小实验迭代完成。善于协作——建立跨部门对齐机制，项目交付速度提升40%。" },
    compareExample: { poor: "三个优点：勤奋、认真、好相处。", excellent: "三个词：数据敏感、结果导向、善于协作。每个词都配了故事和数据。", keyDiff: "普通回答给了大路词且无证据。高分回答每个词配了一个场景加结果的故事。" } },  { id: "self-intro-03", category: "自我介绍类", question: "简历空白期在做什么", weight: "中", weightScore: 5, isPremium: true, versions: { short: "3个月空窗期，我做了复盘+充电。系统复盘了过去3年项目经验，报数据分析课程拿了证书，旅行调整状态。现在能力和状态都比之前更好。" }, compareExample: { poor: "在找工作但没找到合适的。", excellent: "主动选择的投资期，做了复盘、学习和调整。" } },
  { id: "self-intro-04", category: "自我介绍类", question: "你为什么频繁跳槽", weight: "高", weightScore: 8, isPremium: true, versions: { short: "前两年在职业探索期，每段帮我验证方向。第一段销售不适合，第二段确认数据分析是我擅长的事，第三段稳定工作2年。现在对要什么非常清晰，做好了长期深耕的准备。" } },
  { id: "self-intro-05", category: "自我介绍类", question: "你对我们公司了解多少", weight: "高", weightScore: 8, isPremium: true, versions: { short: "做了系统研究。贵公司是AI驱动的SaaS公司，正处于从大客户向中小企业市场拓展的关键阶段。我的B端运营经验正好匹配——搭建的客户健康度评分系统将续费率从82%提升到91%。" } },
  { id: "resign-01", category: "离职原因类", question: "为什么离开上一家公司", weight: "高", weightScore: 9, isPremium: false, versions: { short: "核心原因是成长天花板。我在那做了2年，公司进入平稳期后接触的挑战越来越少。和主管沟通过、申请过新项目后，发现内部空间有限。这是个理性决定。" } },
  { id: "resign-02", category: "离职原因类", question: "为什么被裁员", weight: "中", weightScore: 5, isPremium: true, versions: { short: "创新业务部门被整体裁撤，公司战略收缩聚焦主业。理解也接受，这段经历让我学会在变化中主动调整。" } },
  { id: "resign-03", category: "离职原因类", question: "从上一份工作中学到什么", weight: "中", weightScore: 4, isPremium: true, versions: { short: "从执行者到owner的思维转变。以前等领导分配任务，后来主动思考自己发现问题解决问题。" } },
  { id: "resign-04", category: "离职原因类", question: "如果老板加薪会留下吗", weight: "中", weightScore: 5, isPremium: true, versions: { short: "不会。加薪只能解决报酬问题不能解决成长问题。我离职的核心驱动力是成长空间。" } },
  { id: "resign-05", category: "离职原因类", question: "有没有同时面试其他公司", weight: "中", weightScore: 4, isPremium: true, versions: { short: "同时在看几家，但贵公司是最优先选择。我做了一个偏好矩阵比较，贵公司综合评分最高。" } },
  { id: "career-01", category: "职业规划类", question: "未来3-5年职业规划", weight: "高", weightScore: 7, isPremium: false, versions: { short: "1-2年深耕成为团队最懂业务的人，3-5年拓展从执行者成长为策略制定者。选贵公司因为你们提供完整的成长路径。" } },
  { id: "career-02", category: "职业规划类", question: "为什么选择这个行业", weight: "中", weightScore: 5, isPremium: true, versions: { short: "做了三层面验证。行业层面SaaS是复利型商业模式，岗位层面客户成功需要关系+策略的能力组合，个人层面亲身体验后更加确信。" } },
  { id: "career-03", category: "职业规划类", question: "入职后怎么开展工作", weight: "高", weightScore: 8, isPremium: false, versions: { short: "前90天行动计划。第一个月快速融入，第二个月开始产出跑通闭环，第三个月主动发现提出优化建议。" } },
  { id: "career-04", category: "职业规划类", question: "什么时候开始找工作的", weight: "中", weightScore: 4, isPremium: true, versions: { short: "上个月开始。在岗位做了1年8个月发现学习曲线变平，先确认了内部没有发展空间后才开始看机会。" } },
  { id: "career-05", category: "职业规划类", question: "希望从下一份工作获得什么", weight: "中", weightScore: 6, isPremium: true, versions: { short: "三个层次。底层成长空间，中层价值感，顶层团队氛围。贵公司都能满足。" } },
  { id: "weakness-01", category: "优缺点类", question: "你的最大缺点是什么", weight: "高", weightScore: 8, isPremium: false, versions: { short: "有时候过于关注细节影响效率。后来用二八原则和初稿截止线来管理，先在快和好之间找平衡。" } },
  { id: "weakness-02", category: "优缺点类", question: "收到过最有价值的批评", weight: "中", weightScore: 4, isPremium: true, versions: { short: "主管说「你总想等数据完美再出方案，但业务不等你」。后来改成先出60分版本再迭代的方式。" } },
  { id: "weakness-03", category: "优缺点类", question: "核心竞争力是什么", weight: "高", weightScore: 8, isPremium: true, versions: { short: "在资源有限的情况下找到增长杠杆。预算只有同行1/10时通过分析数据把精力转向留存，将7日留存从30%提升到58%。" } },
  { id: "weakness-04", category: "优缺点类", question: "有没有系统学习克服短板的经历", weight: "中", weightScore: 5, isPremium: true, versions: { short: "发现数据分析是短板，制定3个月攻坚计划。从学SQL到用公开数据实操练手再到实战项目，最终将复购率提升15%。" } },
  { id: "weakness-05", category: "优缺点类", question: "这个岗位最需要的能力你具备吗", weight: "高", weightScore: 8, isPremium: true, versions: { short: "三个核心能力：数据分析（有健康度评分模型成果）、跨部门沟通（协作效率提升40%）、抗压（有标准化处理机制）。匹配度打8分。" } },
  { id: "project-01", category: "项目经验类", question: "讲一个最有成就感的项目", weight: "高", weightScore: 9, isPremium: true, versions: { short: "客户续费率提升项目。通过数据诊断发现80%流失客户功能使用不足3个，搭建12维度健康度评分模型，推动跟进后续费率从82%提升到91%。" } },
  { id: "project-02", category: "项目经验类", question: "讲讲你遇到的最难解决的问题", weight: "高", weightScore: 8, isPremium: true, versions: { short: "预算只有同行1/10却要做同样增长指标。通过分析数据发现留存率比拉新更划算，改变策略将留存从30%提升到58%。" } },
  { id: "project-03", category: "项目经验类", question: "你怎么面对项目中的压力", weight: "高", weightScore: 7, isPremium: true, versions: { short: "项目上线前发现数据口径有问题可能影响效果。主动加班两天重新核算，和团队坦诚沟通后调整方案，最终效果达标。" } },
  { id: "project-04", category: "项目经验类", question: "你怎么协调跨部门资源", weight: "中", weightScore: 6, isPremium: true, versions: { short: "建立跨部门对齐机制：月初确认各方排期和需求、共享数据看板让大家看到进展、每周15分钟站会同步。项目交付速度提升40%。" } },
  { id: "project-05", category: "项目经验类", question: "如果重做这个项目会怎么改进", weight: "中", weightScore: 6, isPremium: true, versions: { short: "会提前预警窗口，从行为数据追踪升级到态度数据追踪。另外做客户分层建模，不同体量客户用不同评分标准。" } },
  { id: "project-06", category: "项目经验类", question: "讲一个失败的案例", weight: "高", weightScore: 7, isPremium: true, versions: { short: "推荐有礼活动ROI预估1:3实际只有1:0.8。复盘发现激励设计有问题、分享流程太长、没有做小规模测试。这次教会我在增长活动前先用最小实验验证核心假设。" } },
  { id: "stress-01", category: "压力面试类", question: "我为什么要录用你", weight: "高", weightScore: 9, isPremium: true, versions: { short: "三个理由。第一我有直接相关经验——做过客户续费率优化项目。第二我同时具备数据分析和跨部门推动能力。第三我对贵公司做了深入研究且意愿度很高。" } },
  { id: "stress-02", category: "压力面试类", question: "你的学历不太够", weight: "高", weightScore: 8, isPremium: true, versions: { short: "学历不代表学习能力。毕业后4年我拿下了Google数据分析证书、自学SQL和Tableau。在工作中我的实际产出证明了能力——续费率提升9%就是最好的说明。" } },
  { id: "stress-03", category: "压力面试类", question: "你没有这个行业经验", weight: "高", weightScore: 8, isPremium: true, versions: { short: "虽然行业不同，但运营的核心能力是通用的。我在过去行业积累的用户分层和转化优化方法论完全可以迁移。而且我已经花X周时间系统学习了这个行业的知识。" } },
  { id: "stress-04", category: "压力面试类", question: "你年纪太大了/太小了", weight: "中", weightScore: 6, isPremium: true, versions: { short: "年龄不是能力的衡量标准。我的优势是XX年的经验积累让我对XX领域有深入理解。同时我保持了很强的学习意愿和能力。" } },
  { id: "stress-05", category: "压力面试类", question: "你的薪资要求太高了", weight: "高", weightScore: 8, isPremium: true, versions: { short: "我的薪资预期是基于市场行情和能力评估的。当然我会看整体方案而不是只盯数字，如果发展空间好我也可以调整。" } },
  { id: "salary-01", category: "薪资谈判类", question: "你期望的薪资是多少", weight: "高", weightScore: 9, isPremium: true, versions: { short: "基于行业薪酬报告和我的项目成果，我期望在XX-XX之间。当然我也愿意了解贵公司的薪资结构和福利体系，综合评估。" } },
  { id: "salary-02", category: "薪资谈判类", question: "如果薪资达不到预期怎么办", weight: "高", weightScore: 8, isPremium: true, versions: { short: "如果差距在10%以内会看整体方案。如果差距较大我愿意聊聊差距的原因以及有没有其他补偿方案。" } },
  { id: "salary-03", category: "薪资谈判类", question: "你目前的薪资结构", weight: "高", weightScore: 9, isPremium: true, versions: { short: "目前月薪XX万，全年总包约XX万。期望有XX的涨幅。基于行业数据和我过去一年的产出，这个预期是合理的。" } },
  { id: "salary-04", category: "薪资谈判类", question: "除了薪资还看重什么", weight: "中", weightScore: 4, isPremium: true, versions: { short: "成长空间第一、团队文化第二、业务方向第三。这三点贵公司都让我感到匹配。" } },
  { id: "salary-05", category: "薪资谈判类", question: "你还有什么想问我们的", weight: "低", weightScore: 3, isPremium: true, versions: { short: "我有三个问题。第一入职前3个月成功的标准是什么。第二团队目前最大的挑战是什么。第三这个岗位上优秀的人具备什么特质。" } },
  { id: "team-01", category: "团队协作类", question: "和同事发生冲突怎么处理", weight: "中", weightScore: 6, isPremium: true, versions: { short: "先冷静再分别倾听双方视角，不站队不评判。然后把焦点从谁对谁错转到哪种方案对项目更好。最终转化为建设性讨论。" } },
  { id: "team-02", category: "团队协作类", question: "如何推动跨部门合作", weight: "中", weightScore: 5, isPremium: true, versions: { short: "提前对齐共同目标，建立共享进度看板，定期同步会议。出了问题不争责任先推进解决，事后复盘流程优化。" } },
  { id: "team-03", category: "团队协作类", question: "你对远程办公怎么看", weight: "低", weightScore: 3, isPremium: true, versions: { short: "接受混合办公模式，关键是结果导向而非工时导向。我有成熟的远程协作经验和工作方法。" } },
  { id: "team-04", category: "团队协作类", question: "怎么看待跨部门推诿", weight: "中", weightScore: 6, isPremium: true, versions: { short: "推诿根源是目标不一致和边界不清晰。我的策略三层：事前对齐、事中不争责任先推进、事后复盘流程优化。" } },
  { id: "team-05", category: "团队协作类", question: "习惯在什么样的团队工作", weight: "低", weightScore: 3, isPremium: true, versions: { short: "心理安全+信息透明+成长导向的团队。大家敢说真话、没有信息壁垒、每个人都在进步。" } },
  { id: "leader-01", category: "领导力类", question: "你如何带团队", weight: "中", weightScore: 5, isPremium: true, versions: { short: "做三件事：定方向告诉团队我们去哪、清障碍把阻挡前进的问题解决掉、给反馈让每个人知道自己做得好不好。" } },
  { id: "leader-02", category: "领导力类", question: "如何给下属分配任务", weight: "中", weightScore: 5, isPremium: true, versions: { short: "因材施教。了解每个人的优势和意愿，分配匹配的任务而不是平均分配。关键节点跟踪进度但给足够的自主空间。" } },
  { id: "leader-03", category: "领导力类", question: "团队成员不服你怎么办", weight: "中", weightScore: 5, isPremium: true, versions: { short: "先用行动证明能力而不是用职位压人。主动承担最难的任务搞定后自然会建立信任。同时1on1了解诉求对齐预期。" } },
  { id: "leader-04", category: "领导力类", question: "如何看待管理这件事", weight: "中", weightScore: 5, isPremium: true, versions: { short: "管理三个层次。第一层管事——目标分解进度跟进。第二层带人——发现优势帮成长。第三层建体系——建立可持续运转的流程。好管理者不是自己多厉害而是团队多厉害。" } },
  { id: "leader-05", category: "领导力类", question: "如何激励团队成员", weight: "低", weightScore: 3, isPremium: true, versions: { short: "差异化激励。有人需要成长给挑战，有人需要认可公开表扬，有人需要意义连接到公司战略。核心是知道每个人的驱动开关在哪。" } },
  { id: "industry-01", category: "行业深挖类", question: "怎么看待这个行业的发展趋势", weight: "中", weightScore: 5, isPremium: true, versions: { short: "三个趋势。垂直化——通用SaaS饱和后垂直行业深度方案更有壁垒。智能化——AI深度嵌入产品。服务化——产品差异化缩小后服务+效果变核心竞争力。" } },
  { id: "industry-02", category: "行业深挖类", question: "你怎么看待我们的竞争对手", weight: "中", weightScore: 5, isPremium: true, versions: { short: "分三类分析。直接竞品产品功能趋同但贵公司AI领先5%。大厂有流量但不够专注。AI原生创业公司最灵活而贵公司的护城河是行业数据的积累。" } },
  { id: "industry-03", category: "行业深挖类", question: "AI对这个行业的影响", weight: "中", weightScore: 5, isPremium: true, versions: { short: "效率革命不是替代危机。重复性工作被AI替代后客户成功经理可更专注深度沟通。但信任和共情是AI替代不了的。" } },
  { id: "industry-04", category: "行业深挖类", question: "未来3年发展趋势", weight: "中", weightScore: 5, isPremium: true, versions: { short: "三个趋势：从功能竞争到效果竞争、从水平SaaS到垂直SaaS、从人适应软件到软件适应人。这对我意味着深耕行业理解、掌握AI工具、建立效果思维。" } },
  { id: "industry-05", category: "行业深挖类", question: "最近在读什么书", weight: "低", weightScore: 3, isPremium: true, versions: { short: "最近在读《销售加速公式》——讲SaaS公司如何用数据和流程驱动增长。书里把经验流程化的理念特别启发我。" } }
];

// ===== 确保全局可访问 =====
if (typeof window !== 'undefined') { window.QUESTIONS = QUESTIONS; }

// ===== 工具函数 =====
function getQuestionsByCategory(cat) { return QUESTIONS.filter(function(q) { return q.category === cat; }); }
function getCategories() { var cats = []; for (var i = 0; i < QUESTIONS.length; i++) { if (cats.indexOf(QUESTIONS[i].category) === -1) cats.push(QUESTIONS[i].category); } return cats; }
function getQuestionById(id) { for (var i = 0; i < QUESTIONS.length; i++) { if (QUESTIONS[i].id === id) return QUESTIONS[i]; } return null; }
function getFreeQuestions() { return QUESTIONS.filter(function(q) { return !q.isPremium; }); }
function getPremiumQuestions() { return QUESTIONS.filter(function(q) { return q.isPremium; }); }
function searchQuestions(kw) { kw = kw.toLowerCase(); return QUESTIONS.filter(function(q) { return q.question.toLowerCase().indexOf(kw) !== -1 || q.category.toLowerCase().indexOf(kw) !== -1; }); }
function getCategoryStats() {
  var stats = {};
  for (var i = 0; i < QUESTIONS.length; i++) {
    var q = QUESTIONS[i];
    if (!stats[q.category]) stats[q.category] = { total: 0, free: 0, premium: 0 };
    stats[q.category].total++;
    if (q.isPremium) stats[q.category].premium++; else stats[q.category].free++;
  }
  return stats;
}