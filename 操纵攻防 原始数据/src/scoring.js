// 评分只汇总用户自己的选项。题目得分不是诊断，也不推断人格或动机。
export const dimensions = {
  independence: {name:'独立判断', lens:'当建议来自他人时，你是否仍会回到自己的标准与可核查信息。'},
  authority: {name:'权威依赖', lens:'头衔或身份是否会替代对理由、边界和证据的检查。'},
  risk: {name:'风险控制', lens:'面对不确定收益时，你是否先看清损失、条款和可承受范围。'},
  responsibility: {name:'责任边界', lens:'你是否会把可负责的部分与不属于自己的责任分开。'},
  sunk_cost: {name:'沉没成本', lens:'过去投入是否影响你对接下来是否继续的判断。'},
  exit: {name:'退出机制', lens:'你是否能暂停、设定边界，并在条件不合适时退出。'},
  correction: {name:'自我修正', lens:'新证据出现时，你是否能暂缓结论、核实并修正。'},
  evaluation: {name:'评价压力', lens:'他人的失望或评价是否会影响原本经过思考的决定。'},
  scarcity: {name:'稀缺压力', lens:'倒计时或“最后名额”是否会压缩你的核实时间。'}
};

const levelFor = (score, max) => {
  const ratio = max ? score / max : 0;
  if (ratio >= .66) return 'notice';
  if (ratio >= .34) return 'watch';
  return 'steady';
};

export function analyze(questions, answers) {
  const stats = Object.fromEntries(Object.keys(dimensions).map(key => [key,{score:0,max:0,items:[]}])) ;
  questions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;
    const stat = stats[question.dimension];
    stat.score += answer.score;
    stat.max += 2;
    stat.items.push({question, answer});
  });
  return Object.entries(stats)
    .filter(([,stat]) => stat.items.length)
    .map(([key,stat]) => ({key,...dimensions[key],...stat,ratio:stat.score/stat.max,level:levelFor(stat.score,stat.max)}))
    .sort((a,b) => b.ratio-a.ratio || a.name.localeCompare(b.name,'zh-CN'));
}

export function describe(signal) {
  const strongest = signal.items.reduce((a,b) => b.answer.score > a.answer.score ? b : a);
  const evidence = `你的选择：“${strongest.answer.text}”`;
  const note = strongest.answer.note?.trim();
  const label = signal.level === 'notice' ? '本次回答中较明显' : signal.level === 'watch' ? '出现一定信号' : '本次回答中较少';
  const hypothesis = signal.level === 'notice'
    ? `在类似情境中，${signal.name.toLowerCase()}可能值得你多留一道检查。单题和情境假设不足以说明这会在现实中发生。`
    : signal.level === 'watch'
      ? `目前看到的是有限信号；实际影响可能取决于关系、后果和你当时掌握的信息。`
      : `这些情境里暂未看到明显的这一类信号；这不代表你在所有现实情境中都不会受影响。`;
  return {label,evidence,note,hypothesis};
}

export function overallSummary(signals, count) {
  if (count < 8) return '完成的题目较少，这份观察暂不适合归纳整体模式。可以回去继续回答，或先把当前结果当作局部线索。';
  const top = signals.slice(0,2);
  if (!top.length) return '目前没有足够的回答形成观察。';
  const notable = top.filter(s => s.level === 'notice');
  if (!notable.length) return '在已回答的情境中，暂未出现集中的高强度信号。分散的选择仍可能因具体关系与处境而变化。';
  return `本次回答里，较值得复核的是「${notable.map(s=>s.name).join('」与「')}」。这表示你在对应假设情境中选择了更少检查或更难暂停的做法；它描述的是回答，不是固定特质。`;
}
