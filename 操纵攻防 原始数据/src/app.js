import { questions } from './questions.js';
import { analyze, describe, overallSummary } from './scoring.js';
import { heroImage, sceneImage } from './illustrations.js';

const app = document.querySelector('#app');
const state = { page:'welcome', index:0, answers:{} };
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function renderWelcome() {
  state.page='welcome';
  app.innerHTML = `<section class="hero">
    <div class="hero-layout"><div class="hero-copy">
      <div class="eyebrow">A SELF-OBSERVATION / 约 5 分钟</div>
      <h1>如果有人想操纵你，<br>他会从哪里<span class="red">下手？</span></h1>
      <p class="lead">不是读心，也不是人格测试。用 16 个日常情境，看看哪些决策边界值得你多留意。</p>
    </div>${heroImage()}</div>
    <div class="hero-stamp"></div>
    <div class="meta-row"><span>16 个情境</span><span>逐题作答</span><span>可随时修改</span></div>
    <div class="actions"><button class="btn" data-action="start">开始自我观察 <span aria-hidden="true">↗</span></button><span class="tiny">无需注册 · 不收集身份信息</span></div>
    <p class="disclosure">说明：结果只依据本次选择，区分观察、假设与证据不足，不构成心理诊断或对任何人的判断。选择“更像自己”的答案即可，没有标准答案。</p>
  </section>`;
}

function renderQuestion() {
  state.page='question';
  const q=questions[state.index], selected=state.answers[q.id];
  const progress=Math.round((state.index+1)/questions.length*100);
  app.innerHTML=`<section class="panel">
    <div class="progress-head"><span>FIELD QUESTION / ${String(state.index+1).padStart(2,'0')}</span><span>${state.index+1} / ${questions.length}</span></div>
    <div class="progress-track"><div class="progress-value" style="width:${progress}%"></div></div>
    <div class="qnum">情境 ${String(state.index+1).padStart(2,'0')}</div>
    <h1 class="question">${esc(q.title)}</h1>${sceneImage(q.dimension,q.title)}<p class="scenario">${esc(q.scenario)}</p>
    <div class="options">${q.options.map((o,i)=>`<button class="option ${selected?.choice===i?'selected':''}" data-choice="${i}"><span class="key">0${i+1}</span><span class="option-copy">${esc(o.text)}</span><span class="check">●</span></button>`).join('')}</div>
    <label class="note-label" for="note">补充说明（可选） · 最多 240 字</label>
    <textarea id="note" class="note-input" maxlength="240" placeholder="例如：要看事情对我的影响有多大">${esc(selected?.note||'')}</textarea>
    <div class="question-nav"><button class="btn secondary" data-action="back">${state.index===0?'退出':'← 上一题'}</button><button class="btn" data-action="next">${state.index===questions.length-1?'查看观察':'下一题 →'}</button></div>
    <p class="tiny" style="margin:18px 0 0">可跳过不适用的题目。补充内容仅留在当前页面，不会上传。</p>
  </section>`;
}

function renderResult() {
  state.page='result';
  const answered=Object.keys(state.answers).length;
  const signals=analyze(questions,state.answers);
  app.innerHTML=`<section class="result-header"><div class="eyebrow">YOUR FIELD NOTE / 结果观察</div><h1>你可能留意的<br><span class="red">决策边界</span></h1><p class="tagline">这不是“别人一定会如何利用你”的预测，而是：在这些假设情境里，哪些选择呈现出可进一步复核的线索。</p><div class="meta-row"><span>${answered} 题已回答</span><span>基于本次选择</span><span>不作诊断</span></div></section>
    <section aria-label="全部观察信号"><div class="eyebrow">OBSERVED SIGNALS / 全部回答维度</div><div class="signal-list">${signals.length?signals.map(signalCard).join(''):`<div class="signal"><h3>暂无可归纳的观察</h3><p>请至少回答一道情境题，结果才会依据你的选择生成。</p></div>`}</div></section>
    <section class="free-summary"><div class="eyebrow">OVERALL OBSERVATION / 综合摘要</div><h2>先记住这一点</h2><p>${esc(overallSummary(signals,answered))}</p><p class="tiny">可复核的问题：当你面临类似情况时，是否有时间独立核实？是否清楚最坏结果、拒绝方式和退出条件？</p></section>
    <div class="reset-row"><button class="btn secondary" data-action="edit">← 返回修改答案</button><button class="btn secondary" data-action="restart">重新开始</button></div>
    <p class="disclosure">阅读边界：选项只是你对假设场景的自我报告。现实行为会随安全感、资源、关系和具体后果变化；分值不代表操纵风险概率。</p>`;
}

function signalCard(signal) {
  const d=describe(signal);
  const badge=signal.level==='notice'?'值得留意':signal.level==='watch'?'有限信号':'信号较少';
  return `<article class="signal"><div class="signal-top"><h3>${esc(signal.name)}</h3><span class="signal-mark">${badge}</span></div><p><b>事实观察：</b>${esc(d.label)}。${esc(signal.lens)}</p><p class="evidence"><b>回答证据：</b>${esc(d.evidence)}${d.note?`；补充：“${esc(d.note)}”`:''}</p><p><b>谨慎假设：</b>${esc(d.hypothesis)}</p></article>`;
}

app.addEventListener('click',e=>{
  const choice=e.target.closest('[data-choice]');
  if(choice){const q=questions[state.index];state.answers[q.id]={choice:Number(choice.dataset.choice),score:q.options[Number(choice.dataset.choice)].score,text:q.options[Number(choice.dataset.choice)].text,note:app.querySelector('#note')?.value||''};renderQuestion();return;}
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(!action)return;
  if(action==='start'){state.index=0;renderQuestion()}
  if(action==='next'){
    const q=questions[state.index], note=app.querySelector('#note')?.value||'';
    if(state.answers[q.id])state.answers[q.id].note=note;
    if(state.index<questions.length-1){state.index++;renderQuestion()}else renderResult();
  }
  if(action==='back'){
    if(state.index===0)renderWelcome();else {const q=questions[state.index];if(state.answers[q.id])state.answers[q.id].note=app.querySelector('#note')?.value||'';state.index--;renderQuestion()}
  }
  if(action==='edit'){state.index=0;renderQuestion()}
  if(action==='restart'){state.answers={};state.index=0;renderWelcome()}
});

app.addEventListener('input',e=>{
  if(e.target.id==='note'){
    const q=questions[state.index]; if(state.answers[q.id]) state.answers[q.id].note=e.target.value;
  }
});
renderWelcome();
