/**
 * 面试通关宝 - 核心应用逻辑
 */

// ============ 状态管理 ============
const STATE = {
  currentPage: 'home',
  currentCategory: '全部',
  searchKeyword: '',
  currentQuestionId: null,
  currentVersion: 'standard',
  favorites: JSON.parse(localStorage.getItem('ms-interview-favorites') || '[]'),
  isUnlocked: localStorage.getItem('ms-interview-unlocked') === 'true',
  practicedIds: JSON.parse(localStorage.getItem('ms-interview-practiced') || '[]'),
};

// ============ DOM引用缓存 ============
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============ 工具函数 ============
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function isFreeQuestion(id) {
  const q = getQuestionById(id);
  return q && !q.isPremium;
}

function canAccess(id) {
  return STATE.isUnlocked || isFreeQuestion(id);
}

function toggleFavorite(id) {
  const idx = STATE.favorites.indexOf(id);
  if (idx > -1) {
    STATE.favorites.splice(idx, 1);
  } else {
    STATE.favorites.push(id);
  }
  localStorage.setItem('ms-interview-favorites', JSON.stringify(STATE.favorites));
}

function isFavorited(id) {
  return STATE.favorites.includes(id);
}

// ============ 页面导航 ============
function navigateTo(page, params = {}) {
  STATE.currentPage = page;
  
  // 隐藏所有页面
  $$('.page').forEach(p => p.classList.remove('active'));
  
  // 显示目标页面
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) targetPage.classList.add('active');
  
  // 更新底部导航
  $$('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  
  // 显示/隐藏 header 操作
  const headerActions = document.getElementById('header-actions');
  if (headerActions) {
    headerActions.style.display = (page === 'home' || page === 'star-guide' || page === 'practice' || page === 'profile') ? 'flex' : 'none';
  }
  
  // 页面初始化
  switch (page) {
    case 'home':
      renderQuestions();
      break;
    case 'question-detail':
      if (params.id) {
        STATE.currentQuestionId = params.id;
        renderQuestionDetail(params.id);
      }
      break;
    case 'practice':
      initPractice();
      break;
    case 'star-guide':
      renderStarGuide();
      break;
    case 'profile':
      renderProfile();
      break;
  }
  
  // 滚动到顶部
  window.scrollTo(0, 0);
}

// ============ 首页 - 问题列表 ============
function renderCategories() {
  const container = document.getElementById('category-tabs');
  if (!container) return;
  
  const categories = getCategories();
  const stats = getCategoryStats();
  
  let html = `<button class="category-tab ${STATE.currentCategory === '全部' ? 'active' : ''}" onclick="setCategory('全部')">
    全部 <span class="count-badge">${QUESTIONS.length}</span>
  </button>`;
  
  categories.forEach(cat => {
    const count = stats[cat]?.total || 0;
    html += `<button class="category-tab ${STATE.currentCategory === cat ? 'active' : ''}" onclick="setCategory('${cat}')">
      ${cat} <span class="count-badge">${count}</span>
    </button>`;
  });
  
  container.innerHTML = html;
}

function setCategory(category) {
  STATE.currentCategory = category;
  renderCategories();
  renderQuestions();
}

function renderQuestions() {
  const container = document.getElementById('question-list');
  if (!container) return;
  
  let questions = QUESTIONS;
  
  // 分类筛选
  if (STATE.currentCategory !== '全部') {
    questions = questions.filter(q => q.category === STATE.currentCategory);
  }
  
  // 关键词搜索
  if (STATE.searchKeyword) {
    questions = searchQuestions(STATE.searchKeyword);
  }
  
  if (questions.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-text">没有找到相关题目，试试其他关键词</div>
      </div>`;
    return;
  }
  
  let html = '';
  questions.forEach((q, index) => {
    const isLocked = q.isPremium && !STATE.isUnlocked;
    const weightClass = q.weight === '高' ? 'high' : q.weight === '中' ? 'mid' : 'low';
    
    html += `
      <div class="question-card" onclick="${isLocked ? `navigateTo('profile')` : `navigateTo('question-detail', {id: '${q.id}'})`}">
        <div class="q-header">
          <div class="q-number">${index + 1}</div>
          <div class="q-content">
            <div class="q-question">${q.question} ${isLocked ? '🔒' : ''}</div>
            <div class="q-meta">
              <span class="q-weight ${weightClass}">${q.weight}频</span>
              <span>${q.category}</span>
              ${isFavorited(q.id) ? '<span>⭐ 已收藏</span>' : ''}
            </div>
          </div>
        </div>
      </div>`;
  });
  
  container.innerHTML = html;
}

function handleSearch(e) {
  STATE.searchKeyword = e.target.value;
  renderQuestions();
}

// ============ 问题详情页 ============
function renderQuestionDetail(id) {
  const q = getQuestionById(id);
  if (!q) return;
  
  const isLocked = q.isPremium && !STATE.isUnlocked;
  
  // 标题
  const titleEl = document.getElementById('qd-title');
  if (titleEl) titleEl.textContent = q.question;
  
  // Meta tags
  const metaEl = document.getElementById('qd-meta');
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="meta-tag category-tag">${q.category}</span>
      <span class="meta-tag weight-tag">权重：${q.weight}</span>
      ${isFavorited(id) ? '<span class="meta-tag" style="background:#fef3c7;color:#92400e;">⭐ 已收藏</span>' : ''}
    `;
  }
  
  // 收藏按钮
  const favBtn = document.getElementById('qd-fav-btn');
  if (favBtn) {
    favBtn.textContent = isFavorited(id) ? '⭐ 取消收藏' : '☆ 收藏';
    favBtn.onclick = () => {
      toggleFavorite(id);
      renderQuestionDetail(id);
      showToast(isFavorited(id) ? '已收藏' : '已取消收藏', 'success');
    };
  }
  
  // 判断是否付费锁定
  if (isLocked) {
    const contentEl = document.getElementById('qd-content');
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="premium-banner">
          <div class="lock-icon">🔒</div>
          <h3>付费内容</h3>
          <p>完整答案、STAR框架、对比示例等内容<br>仅对付费用户开放</p>
          <button class="btn-unlock" onclick="navigateTo('profile')">立即解锁全部内容</button>
        </div>
      `;
    }
    return;
  }
  
  // 内容区
  const contentEl = document.getElementById('qd-content');
  if (!contentEl) return;
  
  // 设置默认版本
  STATE.currentVersion = 'standard';
  
  contentEl.innerHTML = `
    <!-- 面试官想听什么 -->
    <div class="detail-section">
      <div class="section-label">
        <span class="label-icon">🎯</span> 面试官想听什么
      </div>
      <div class="section-body">${q.interviewerWants || q.question ? '考察你的回答逻辑、表达能力和岗位匹配度。面试官想通过这个问题判断你的思维方式和工作风格。' : '—'}</div>
    </div>
    
    <!-- 避坑指南 -->
    <div class="detail-section">
      <div class="section-label">
        <span class="label-icon">⚠️</span> 避坑指南
      </div>
      <div class="section-body">${q.pitfallTips || '回答时注意逻辑清晰、有数据支撑，避免空泛的表述。'}</div>
    </div>
    
    <!-- STAR框架 -->
    <div class="detail-section">
      <div class="section-label">
        <span class="label-icon">📐</span> STAR框架拆解
      </div>
      <div class="star-cards">
        <div class="star-card situation">
          <div class="star-letter">S - Situation（情境）</div>
          <div class="star-example">${q.starFramework ? q.starFramework.situation : '描述当时的工作背景、团队情况和面临的问题。'}</div>
        </div>
        <div class="star-card task">
          <div class="star-letter">T - Task（任务）</div>
          <div class="star-example">${q.starFramework ? q.starFramework.task : '说明你的具体任务或目标，尽量量化。'}</div>
        </div>
        <div class="star-card action">
          <div class="star-letter">A - Action（行动）</div>
          <div class="star-example">${q.starFramework ? q.starFramework.action : '重点讲你做了什么、怎么思考的、如何推动的。'}</div>
        </div>
        <div class="star-card result">
          <div class="star-letter">R - Result（结果）</div>
          <div class="star-example">${q.starFramework ? q.starFramework.result : '描述最终的结果、数据和影响，最好有量化指标。'}</div>
        </div>
      </div>
    </div>
    
    <!-- 版本答案 -->
    <div class="detail-section">
      <div class="section-label">
        <span class="label-icon">📝</span> 满分回答（多版本）
      </div>
      <div class="version-tabs">
        <button class="version-tab ${STATE.currentVersion === 'short' ? 'active' : ''}" onclick="switchVersion('short')">
          1分钟 <span class="version-sub">精简版</span>
        </button>
        <button class="version-tab ${STATE.currentVersion === 'standard' ? 'active' : ''}" onclick="switchVersion('standard')">
          3分钟 <span class="version-sub">标准版</span>
        </button>
        <button class="version-tab ${STATE.currentVersion === 'detailed' ? 'active' : ''}" onclick="switchVersion('detailed')">
          5分钟 <span class="version-sub">详细版</span>
        </button>
      </div>
      <div class="section-body" id="version-answer">${formatAnswer(q.versions.standard || q.versions.short || '暂无标准版答案，请参考精简版。')}</div>
    </div>
    
    <!-- 普通 vs 高分对比 -->
    <div class="detail-section">
      <div class="section-label">
        <span class="label-icon">⚔️</span> 普通回答 vs 高分回答
      </div>
      <div class="compare-grid">
        <div class="compare-card poor">
          <div class="compare-label">❌ 普通回答</div>
          <div class="compare-text">${q.compareExample && q.compareExample.poor ? q.compareExample.poor : '回答得比较笼统，面试官听完没什么印象，缺乏数据和逻辑支撑。'}</div>
        </div>
        <div class="compare-card excellent">
          <div class="compare-label">✅ 高分回答</div>
          <div class="compare-text">${q.compareExample && q.compareExample.excellent ? q.compareExample.excellent : '用STAR法则组织回答，有具体场景、行动和量化结果，让面试官印象深刻。'}</div>
        </div>
      </div>
      <div class="key-diff">
        <span class="diff-label">💡 核心差异：</span>${q.compareExample && q.compareExample.keyDiff ? q.compareExample.keyDiff : '普通回答没有重点和证据，高分回答有结构、有数据、有结果。'}
      </div>
    </div>
    
    <!-- 经历迁移话术 -->
    <div class="detail-section">
      <div class="section-label">
        <span class="label-icon">🔄</span> 经历迁移话术
      </div>
      <div class="migration-box">
        <span class="migration-label">💡 如果经历不匹配：</span>${q.migrationTips || '即使没有直接相关经历，也可以提炼底层可迁移能力，展示学习意愿和行业理解来弥补差距。'}
      </div>
    </div>
  `;
  
  // 标记已练习
  markAsPracticed(id);
}

function switchVersion(version) {
  STATE.currentVersion = version;
  const q = getQuestionById(STATE.currentQuestionId);
  if (!q) return;
  
  // 更新版本标签
  $$('.version-tab').forEach(tab => {
    const isActive = tab.textContent.includes(
      version === 'short' ? '1分钟' : 
      version === 'standard' ? '3分钟' : '5分钟'
    );
    tab.classList.toggle('active', isActive);
  });
  
  // 更新内容
  const answerEl = document.getElementById('version-answer');
  if (answerEl) {
    const answerText = q.versions[version] || q.versions.short || '本版本暂未提供，请参考其他版本。';
    answerEl.innerHTML = formatAnswer(answerText);
  }
}

function formatAnswer(text) {
  // 将文本中的换行转换为 <br>
  return text.replace(/\n/g, '<br>');
}

function markAsPracticed(id) {
  if (!STATE.practicedIds.includes(id)) {
    STATE.practicedIds.push(id);
    localStorage.setItem('ms-interview-practiced', JSON.stringify(STATE.practicedIds));
  }
}

// ============ STAR教学页 ============
function renderStarGuide() {
  const container = document.getElementById('star-guide-content');
  if (!container) return;
  
  container.innerHTML = `
    <div class="star-section">
      <div class="star-title">什么是STAR法则？</div>
      <div class="star-desc">
        STAR法则是面试中最强大、最通用的回答框架。它将一个经历拆解为四个维度：<strong>Situation（情境）、Task（任务）、Action（行动）、Result（结果）</strong>。
        <br><br>
        面试官每天要听几十个回答，用STAR框架的回答「结构清晰、信息完整、容易评估」——直接决定了你的面试分数。
      </div>
    </div>
    
    <div class="star-section">
      <div class="star-title">STAR四要素详解</div>
      <div class="star-cards">
        <div class="star-card situation">
          <div class="star-letter">S - Situation（情境）</div>
          <div class="star-meaning">描述这件事发生时的背景：在什么公司？什么岗位？什么时间？什么情况下接到的这个任务？</div>
          <div class="star-example">💡 "当时我在XX公司负责用户增长，团队只有3个人，预算只有竞品的1/5，需要在3个月内提升付费转化率。"</div>
        </div>
        <div class="star-card task">
          <div class="star-letter">T - Task（任务）</div>
          <div class="star-meaning">你的具体任务和目标是什么？要量化、要清晰——不要只说"做运营"，要说"提升转化率从2.1%到3.5%"。 </div>
          <div class="star-example">💡 "我的任务是将课程免费试听到付费的转化率从2.1%提升到3.5%以上。"</div>
        </div>
        <div class="star-card action">
          <div class="star-letter">A - Action（行动）</div>
          <div class="star-meaning">这是最核心的部分！<strong>要展示「你」做了什么</strong>——你的思考、你的决策、你的执行。不要用「我们」，要用「我」。</div>
          <div class="star-example">💡 "我分析了3个月的用户行为数据，发现用户在试听后72小时内报名的概率最高。于是我设计了一套3步跟进机制：①课后24小时发学习报告 ②第3天推限时优惠 ③第7天电话回访。"</div>
        </div>
        <div class="star-card result">
          <div class="star-letter">R - Result（结果）</div>
          <div class="star-meaning">最终的结果是什么？<strong>用数据说话</strong>。百分比、金额、时间、效率提升——数字越具体越有说服力。</div>
          <div class="star-example">💡 "通过6轮A/B测试不断优化话术和时间点，最终将转化率从2.1%提升到3.8%，月增收280万。这套机制被沿用至今。"</div>
        </div>
      </div>
    </div>
    
    <div class="star-section">
      <div class="star-title">STAR万能公式模板</div>
      <div class="template-box">
        <div class="template-title">📋 直接套用这个模板</div>
        <div class="template-text">
          「当时我在 <span class="placeholder">公司/团队</span> ，负责 <span class="placeholder">你的角色</span> 。 
          有一次 <span class="placeholder">描述具体的背景/问题</span> ，我的目标是在 <span class="placeholder">时间限制</span> 内 <span class="placeholder">量化目标</span> 。 
          <br><br>
          我做了以下关键动作：<br>
          第一，<span class="placeholder">行动1（你的思考/分析/决策）</span> <br>
          第二，<span class="placeholder">行动2（你的执行/推动）</span> <br>
          第三，<span class="placeholder">行动3（你的优化/迭代）</span> <br>
          <br>
          最终，<span class="placeholder">量化的结果</span> ，<span class="placeholder">产生的商业价值</span> 。<br>
          这次经历让我学会了 <span class="placeholder">你获得的认知升级</span> 。」
        </div>
      </div>
    </div>
    
    <div class="star-section">
      <div class="star-title">STAR四大常见错误</div>
      <div class="star-desc">
        <strong>❌ 错误1：只有S和T，没有A和R</strong><br>
        说了半天背景和目标，但没说「我具体做了什么」和「结果如何」。面试官听完什么也判断不了。<br><br>
        
        <strong>❌ 错误2：Action用「我们」而不是「我」</strong><br>
        「我们做了A/B测试」「我们提升了转化率」——面试官怎么知道你的贡献是什么？<br><br>
        
        <strong>❌ 错误3：Result没有数据</strong><br>
        「效果很好」「得到了认可」——好到多少？谁认可了？没有数据的R等于没有R。<br><br>
        
        <strong>❌ 错误4：故事太长，没有重点</strong><br>
        好的STAR回答控制在2-3分钟内，Action部分占60%以上。S和T各15%，R占10%。<br><br>
        
        <strong>✅ 好STAR的标准：</strong>面试官听完能明确回答三个问题：①这件事难度大不大 ②你的贡献是什么 ③你是个什么样的人。
      </div>
    </div>
    
    <div class="star-section">
      <div class="star-title">STAR实战示例</div>
      <div class="star-desc">
        来看一个完整的STAR回答——来自「请讲一个你最有成就感的项目」这个问题：<br><br>
        
        <strong>Situation</strong>：我在美团负责商家运营时，发现新签商家的首月活跃率只有32%，远低于老商家的68%。<br><br>
        
        <strong>Task</strong>：我的目标是在3个月内将新商家首月活跃率提升到50%以上。<br><br>
        
        <strong>Action</strong>：我做了三件事。①数据诊断——分析了500家流失新商家的行为数据，发现核心原因是「不会运营自己的线上店铺」。②方案设计——设计了一套「新手商家7天成长计划」，从店铺装修、优惠券设置到评价管理，每天一个任务引导。③推动执行——和产品、销售团队协同，将成长计划嵌入到新商家的注册流程中。<br><br>
        
        <strong>Result</strong>：3个月后，新商家首月活跃率从32%提升到61%。这个方案被全国推广，覆盖20+城市。<br><br>
        
        <strong>学到了什么</strong>：不要假设用户「不想用」，要假设用户「不知道怎么用」——好的产品需要好的引导。
      </div>
    </div>
  `;
}

// ============ 模拟面试 ============
let practiceState = {
  currentQuestion: null,
  timer: null,
  seconds: 0,
  isRunning: false,
  mode: 'single',
  history: [],
};

function initPractice() {
  const container = document.getElementById('practice-content');
  if (!container) return;
  
  if (!STATE.isUnlocked) {
    container.innerHTML = `
      <div class="premium-banner">
        <div class="lock-icon">🔒</div>
        <h3>模拟面试</h3>
        <p>付费用户可使用模拟面试功能<br>包含随机抽题、计时训练、模式选择</p>
        <button class="btn-unlock" onclick="navigateTo('profile')">立即解锁</button>
      </div>
    `;
    return;
  }
  
  // 重置状态
  resetTimer();
  pickRandomQuestion();
  
  container.innerHTML = `
    <div class="practice-container">
      <!-- 模式选择 -->
      <div style="display:flex;gap:8px;margin-bottom:16px;justify-content:center;">
        <button class="btn ${practiceState.mode === 'single' ? 'btn-primary' : 'btn-outline'}" onclick="setPracticeMode('single')">单题练习</button>
        <button class="btn ${practiceState.mode === 'exam' ? 'btn-primary' : 'btn-outline'}" onclick="setPracticeMode('exam')">5题连考</button>
      </div>
      
      <!-- 当前题目 -->
      <div class="practice-question">
        <div class="pq-category" id="pq-category">${practiceState.currentQuestion ? practiceState.currentQuestion.category : ''}</div>
        <div class="pq-text" id="pq-text">${practiceState.currentQuestion ? practiceState.currentQuestion.question : '点击开始'}</div>
        <div class="pq-actions">
          <button class="btn btn-primary" onclick="pickRandomQuestion()">换一题 🔄</button>
          ${practiceState.mode === 'exam' ? `<button class="btn btn-accent" onclick="startExam()">开始考试 🎯</button>` : ''}
        </div>
      </div>
      
      <!-- 计时器 -->
      <div class="timer-display" id="timer-display">01:00</div>
      <div class="timer-controls">
        <button class="btn-start" onclick="startTimer()" id="timer-start-btn">▶ 开始计时</button>
        <button class="btn-pause" onclick="pauseTimer()" id="timer-pause-btn" style="display:none;">⏸ 暂停</button>
        <button class="btn-reset" onclick="resetTimer()">↺ 重置</button>
      </div>
      
      <!-- 回答提示 -->
      <div class="practice-hints">
        <div class="hint-label">💡 回答提示</div>
        <div class="hint-text" id="practice-hint">
          ${practiceState.currentQuestion ? 
            `建议使用STAR法则回答。<br>权重：${practiceState.currentQuestion.weight}频 | 
            面试官主要考察：${practiceState.currentQuestion.interviewerWants.substring(0, 40)}...` : 
            '点击「换一题」开始练习'}
        </div>
        <div style="margin-top:12px;">
          <button class="btn btn-ghost" onclick="showAnswerHint()" style="font-size:12px;color:var(--primary);">
            📖 查看完整提示
          </button>
        </div>
      </div>
    </div>
  `;
}

function pickRandomQuestion() {
  const questions = STATE.isUnlocked ? QUESTIONS : getFreeQuestions();
  const idx = Math.floor(Math.random() * questions.length);
  practiceState.currentQuestion = questions[idx];
  
  const catEl = document.getElementById('pq-category');
  const textEl = document.getElementById('pq-text');
  const hintEl = document.getElementById('practice-hint');
  
  if (catEl) catEl.textContent = questions[idx].category;
  if (textEl) textEl.textContent = questions[idx].question;
  if (hintEl) {
    hintEl.innerHTML = `建议使用STAR法则回答。<br>
      权重：${questions[idx].weight}频 | 
      面试官主要考察：${(questions[idx].interviewerWants || '你的回答逻辑、表达能力和岗位匹配度。').substring(0, 50)}...`;
  }
  
  resetTimer();
  
  // 标记已练习
  markAsPracticed(questions[idx].id);
}

function showAnswerHint() {
  const q = practiceState.currentQuestion;
  if (!q) return;
  
  const hintEl = document.getElementById('practice-hint');
  if (hintEl) {
    if (q.isPremium && !STATE.isUnlocked) {
      hintEl.innerHTML = '🔒 完整回答提示仅为付费用户开放，请解锁后查看。';
      return;
    }
    const version = q.versions.standard;
    hintEl.innerHTML = `
      <strong>STAR框架参考：</strong><br>
      <strong>S</strong>：${q.starFramework.situation}<br>
      <strong>T</strong>：${q.starFramework.task}<br>
      <strong>A</strong>：${q.starFramework.action}<br>
      <strong>R</strong>：${q.starFramework.result}<br><br>
      <strong>完整答案参考：</strong><br>
      ${version.substring(0, 200)}...<br><br>
      <a href="#" onclick="navigateTo('question-detail', {id: '${q.id}'})" style="color:var(--primary);">👉 查看完整答案</a>
    `;
  }
}

function setPracticeMode(mode) {
  practiceState.mode = mode;
  resetTimer();
  pickRandomQuestion();
  
  // 更新按钮样式
  const btns = document.querySelectorAll('.practice-container .btn');
  if (btns.length >= 2) {
    btns[0].className = `btn ${mode === 'single' ? 'btn-primary' : 'btn-outline'}`;
    btns[1].className = `btn ${mode === 'exam' ? 'btn-primary' : 'btn-outline'}`;
  }
}

function startExam() {
  // 5题连考模式 - 简化版
  showToast('5题连考模式已启动！请准备回答第一题', 'info');
  resetTimer();
  startTimer();
}

// ============ 计时器 ============
function startTimer() {
  if (practiceState.isRunning) return;
  practiceState.isRunning = true;
  
  const startBtn = document.getElementById('timer-start-btn');
  const pauseBtn = document.getElementById('timer-pause-btn');
  if (startBtn) startBtn.style.display = 'none';
  if (pauseBtn) pauseBtn.style.display = 'inline-block';
  
  practiceState.timer = setInterval(() => {
    practiceState.seconds++;
    updateTimerDisplay();
    
    // 震动提醒
    if (practiceState.seconds === 60) {
      showToast('⏰ 已到1分钟，建议进入核心内容', 'info');
    }
    if (practiceState.seconds === 120) {
      showToast('⏰ 2分钟，注意收尾', 'warning');
    }
    if (practiceState.seconds === 180) {
      showToast('⏰ 3分钟到，建议结束回答', 'error');
      pauseTimer();
    }
  }, 1000);
}

function pauseTimer() {
  practiceState.isRunning = false;
  clearInterval(practiceState.timer);
  
  const startBtn = document.getElementById('timer-start-btn');
  const pauseBtn = document.getElementById('timer-pause-btn');
  if (startBtn) startBtn.style.display = 'inline-block';
  if (startBtn) startBtn.textContent = '▶ 继续';
  if (pauseBtn) pauseBtn.style.display = 'none';
}

function resetTimer() {
  practiceState.isRunning = false;
  clearInterval(practiceState.timer);
  practiceState.seconds = 0;
  
  const startBtn = document.getElementById('timer-start-btn');
  const pauseBtn = document.getElementById('timer-pause-btn');
  if (startBtn) {
    startBtn.style.display = 'inline-block';
    startBtn.textContent = '▶ 开始计时';
  }
  if (pauseBtn) pauseBtn.style.display = 'none';
  
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  if (!display) return;
  
  const mins = Math.floor(practiceState.seconds / 60);
  const secs = practiceState.seconds % 60;
  display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  
  // 颜色变化提示
  if (practiceState.seconds >= 150) {
    display.style.color = 'var(--danger)';
  } else if (practiceState.seconds >= 90) {
    display.style.color = 'var(--warning)';
  } else {
    display.style.color = 'var(--primary)';
  }
}

// ============ 个人中心 ============
function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!container) return;
  
  const totalQuestions = QUESTIONS.length;
  const practiced = STATE.practicedIds.length;
  const favorited = STATE.favorites.length;
  const freeCount = getFreeQuestions().length;
  
  container.innerHTML = `
    <!-- 解锁状态 -->
    <div class="detail-section" style="text-align:center;">
      ${STATE.isUnlocked ? `
        <div style="font-size:48px;margin-bottom:12px;">🎉</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:4px;">已解锁全部内容</div>
        <div style="font-size:13px;color:var(--text-secondary);">感谢你的支持！祝你面试顺利 💪</div>
      ` : `
        <div style="font-size:48px;margin-bottom:12px;">🔒</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:4px;">免费使用中</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
          当前可免费学习 <strong>${freeCount}道</strong> 精选题目<br>
          解锁后可学习全部 <strong>${totalQuestions}道</strong> 题目+模拟面试
        </div>
        <button class="btn btn-accent" onclick="showUnlockPage()" style="padding:12px 32px;font-size:16px;">
          🔓 解锁全部内容
        </button>
      `}
    </div>
    
    <!-- 学习统计 -->
    <div class="detail-section">
      <div class="section-label">📊 学习统计</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;text-align:center;">
        <div>
          <div style="font-size:24px;font-weight:700;color:var(--primary);">${totalQuestions}</div>
          <div style="font-size:12px;color:var(--text-secondary);">总题目数</div>
        </div>
        <div>
          <div style="font-size:24px;font-weight:700;color:var(--success);">${practiced}</div>
          <div style="font-size:12px;color:var(--text-secondary);">已练习</div>
        </div>
        <div>
          <div style="font-size:24px;font-weight:700;color:var(--accent-dark);">${favorited}</div>
          <div style="font-size:12px;color:var(--text-secondary);">已收藏</div>
        </div>
      </div>
    </div>
    
    <!-- 学习进度 -->
    <div class="detail-section">
      <div class="section-label">📈 学习进度</div>
      <div style="background:var(--border);border-radius:10px;height:10px;overflow:hidden;margin-bottom:8px;">
        <div style="width:${totalQuestions > 0 ? (practiced / totalQuestions * 100) : 0}%;background:var(--primary);height:100%;border-radius:10px;transition:width 0.5s;"></div>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);text-align:right;">
        完成度 ${totalQuestions > 0 ? Math.round(practiced / totalQuestions * 100) : 0}%
      </div>
    </div>
    
    <!-- 收藏列表 -->
    <div class="detail-section">
      <div class="section-label">⭐ 我的收藏 (${favorited})</div>
      ${favorited > 0 ? 
        STATE.favorites.map(id => {
          const q = getQuestionById(id);
          return q ? `<div style="padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;cursor:pointer;" onclick="navigateTo('question-detail', {id: '${q.id}'})">${q.question}</div>` : '';
        }).join('') : 
        '<div style="font-size:13px;color:var(--text-muted);">还没有收藏的题目，浏览题库时点击⭐收藏</div>'
      }
    </div>
    
    <!-- 关于 -->
    <div class="detail-section">
      <div class="section-label">ℹ️ 关于</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.8;">
        <strong>面试通关宝</strong> —— 15年HR经验面试教练打造的面试必备工具。<br><br>
        <strong>功能：</strong><br>
        ✅ 面试必考题库（持续更新）<br>
        ✅ 面试官评分视角拆解<br>
        ✅ STAR法则回答框架<br>
        ✅ 1/3/5分钟多版本答案<br>
        ✅ 模拟面试+计时训练<br>
        ✅ 普通回答vs高分回答对比<br><br>
        <strong>联系我们：</strong><br>
        如有问题或建议，欢迎联系我们
      </div>
    </div>
  `;
}

function showUnlockPage() {
  document.getElementById('page-profile').classList.remove('active');
  document.getElementById('page-unlock').classList.add('active');
  
  const headerActions = document.getElementById('header-actions');
  if (headerActions) headerActions.style.display = 'none';
}

// ============ 解锁功能 ============
function submitUnlockCode() {
  const input = document.getElementById('unlock-code-input');
  if (!input) return;
  
  const code = input.value.trim().toUpperCase();
  
  // 预置解锁码 - 你可以修改这个！
  const VALID_CODES = ['MS2024', 'MIANSHI', 'STAR888', 'OFFER666'];
  
  if (VALID_CODES.includes(code)) {
    STATE.isUnlocked = true;
    localStorage.setItem('ms-interview-unlocked', 'true');
    showToast('🎉 解锁成功！祝面试顺利！', 'success');
    navigateTo('profile');
  } else {
    showToast('❌ 解锁码无效，请检查后重试', 'error');
    input.value = '';
    input.focus();
  }
}

// ============ 初始化 ============
function initApp() {
  // 确保题库数据已加载
  if (typeof window.QUESTIONS === 'undefined' || !window.QUESTIONS.length) {
    console.error('面试通关宝：题库数据未加载');
    return;
  }
  
  // 渲染分类标签
  renderCategories();
  
  // 渲染问题列表
  renderQuestions();
  
  // 首页导航
  navigateTo('home');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);
