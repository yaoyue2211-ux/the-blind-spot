// 题库单独维护：每题只描述一个日常情境，选项不暗示“正确答案”。
// score 是该选项在对应观察维度上的提示强度（0–2），不是人格分数。
export const questions = [
  { id:'q01', dimension:'independence', title:'你已经选定了方案，临门一刻有人提出相反建议。', scenario:'对方是你尊重的人，但没有提供新的事实。你通常会：', options:[
    {text:'先问清理由；没有新信息时按原计划执行。',score:0},
    {text:'暂缓决定，再核对一次关键依据。',score:1},
    {text:'倾向改用对方建议，避免自己判断错。',score:2}]},
  { id:'q02', dimension:'authority', title:'一位有头衔的人给出结论，却没有展示推理过程。', scenario:'这件事会影响你的时间或金钱。你会：', options:[
    {text:'把头衔当作参考，要求可核查的依据。',score:0},
    {text:'先采纳小部分，再观察结果。',score:1},
    {text:'通常直接照做，专业人士大概更清楚。',score:2}]},
  { id:'q03', dimension:'risk', title:'一个机会需要你今天支付一笔可承受但不小的费用。', scenario:'你还没看完条款。你会：', options:[
    {text:'先看退款、义务和最坏损失，再决定。',score:0},
    {text:'先付可退的订金，给自己留出核查时间。',score:1},
    {text:'先付款锁定机会，之后再补看细节。',score:2}]},
  { id:'q04', dimension:'responsibility', title:'团队方案出问题，责任原因暂时不清楚。', scenario:'你参与过其中一部分。你会：', options:[
    {text:'先区分自己负责的部分和其他环节。',score:0},
    {text:'先承担眼前能补救的事，再厘清责任。',score:1},
    {text:'习惯先道歉并把大部分责任揽下来。',score:2}]},
  { id:'q05', dimension:'sunk_cost', title:'你为一个项目投入了数月，结果一直不理想。', scenario:'再投入一周可能改善，也可能没有变化。你会：', options:[
    {text:'比较未来收益与成本，过去投入不计入。',score:0},
    {text:'设一个最后期限或可验证的改善指标。',score:1},
    {text:'不甘心前面的投入白费，继续坚持。',score:2}]},
  { id:'q06', dimension:'exit', title:'合作对象多次越过你们约定的边界。', scenario:'你已有其他安排，也不依赖这段合作。你会：', options:[
    {text:'说明边界及后果；重复发生就结束合作。',score:0},
    {text:'再沟通一次，给出具体的观察期限。',score:1},
    {text:'担心退出会让对方失望，继续尝试适应。',score:2}]},
  { id:'q07', dimension:'correction', title:'你发现一条重要信息与自己的原判断相反。', scenario:'这条信息来源可信，但还需要交叉核实。你会：', options:[
    {text:'暂停传播结论，核实后按新证据修正。',score:0},
    {text:'保留原判断，同时寻找第二个来源。',score:1},
    {text:'先解释为什么它可能不成立，再考虑调整。',score:2}]},
  { id:'q08', dimension:'evaluation', title:'朋友对你的选择表示失望，但没有说明具体伤害。', scenario:'你考虑了这件事，也没有发现承诺被违背。你会：', options:[
    {text:'询问具体影响，但保留自己决定的权利。',score:0},
    {text:'重新评估一次，看看是否忽略了对方。',score:1},
    {text:'为了恢复关系，倾向改变原来的选择。',score:2}]},
  { id:'q09', dimension:'scarcity', title:'页面显示名额只剩一个，并提示倒计时十分钟。', scenario:'你之前没有在计划中考虑这项服务。你会：', options:[
    {text:'离开倒计时页面，按原有标准核实价值。',score:0},
    {text:'只在能查清退订条件时考虑购买。',score:1},
    {text:'先抢到再说，错过机会会让我很遗憾。',score:2}]},
  { id:'q10', dimension:'independence', title:'你要做一个没有唯一标准答案的个人选择。', scenario:'身边几个人都给出很确定的意见。你会：', options:[
    {text:'先写下自己重视的条件，再听取建议。',score:0},
    {text:'收集意见后留一天独立考虑。',score:1},
    {text:'多数人意见相同的话，我会跟着多数选择。',score:2}]},
  { id:'q11', dimension:'authority', title:'导师建议你接受一项额外任务，理由是“对你有好处”。', scenario:'任务边界和回报都不明确。你会：', options:[
    {text:'先问清具体收益、投入和退出条件。',score:0},
    {text:'先尝试一小段时间，再评估是否继续。',score:1},
    {text:'不太好拒绝权威人士，先答应下来。',score:2}]},
  { id:'q12', dimension:'risk', title:'朋友邀请你参与一个回报不确定的项目。', scenario:'你只听到了乐观预测，还没看完整资料。你会：', options:[
    {text:'核实风险、资金去向和最坏情形后再决定。',score:0},
    {text:'只投入愿意完全损失的部分，并约定复查点。',score:1},
    {text:'基于信任先参与，细节之后可以再谈。',score:2}]},
  { id:'q13', dimension:'responsibility', title:'别人临时把一个本该由他完成的任务交给你。', scenario:'你手头已满，但对方说“只有你能帮忙”。你会：', options:[
    {text:'说明能帮到什么程度，并请对方承担剩余部分。',score:0},
    {text:'完成这一次，同时明确下次的分工。',score:1},
    {text:'担心拒绝会拖累整个团队，接下全部任务。',score:2}]},
  { id:'q14', dimension:'sunk_cost', title:'你买了一门课程，已经学了一半，发现内容不适合。', scenario:'退款窗口还剩两天，继续学也有机会成本。你会：', options:[
    {text:'依据剩余内容是否有用，决定退款或继续。',score:0},
    {text:'先试听剩余部分中的一节，再设截止时间。',score:1},
    {text:'都学到一半了，还是把它学完吧。',score:2}]},
  { id:'q15', dimension:'exit', title:'一次谈话让你感到不舒服，对方催你现在给答复。', scenario:'你可以暂停谈话，稍后再联系。你会：', options:[
    {text:'说明需要时间，暂时不作承诺。',score:0},
    {text:'提出一个短暂休息，再决定是否继续谈。',score:1},
    {text:'怕显得不近人情，通常会把谈话进行到底。',score:2}]},
  { id:'q16', dimension:'correction', title:'别人指出你刚才的说法可能有误。', scenario:'你还没有核对，但这句话已经影响到他人。你会：', options:[
    {text:'先标记为待核实，确认后主动更正。',score:0},
    {text:'私下核对；若确有影响再补充说明。',score:1},
    {text:'先维护原说法，避免显得自己不可靠。',score:2}]}
];
