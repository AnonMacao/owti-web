window.LIKERT_OPTIONS = [
  { value: 3 },
  { value: 2 },
  { value: 1 },
  { value: 0 },
  { value: -1 },
  { value: -2 },
  { value: -3 }
];

window.QUIZ_LENGTH = 30;

function createQuestions(primary, entries) {
  return entries.map((entry, index) => ({
    id: `${primary}-${index + 1}`,
    primary,
    title: entry.title,
    effects: entry.effects
  }));
}

const warmthQuestions = createQuestions("warmth", [
  { title: "看到别人情绪崩掉时，我通常会本能地先去接住对方。", effects: { warmth: 2, protectiveness: 1 } },
  { title: "我很难对身边人的难受完全无动于衷。", effects: { warmth: 2 } },
  { title: "在冲突里，我经常会先在意自己有没有让别人更难受。", effects: { warmth: 2, introspection: 1 } },
  { title: "比起讲道理，我更习惯先让对方感到被理解。", effects: { warmth: 2, candor: -1 } },
  { title: "如果一个人只是嘴硬，我往往还是能感觉到他其实受伤了。", effects: { warmth: 2 } },
  { title: "在关系里，我通常会先守住自己的感受和边界。", effects: { warmth: -2, independence: 1 } },
  { title: "别人向我倾诉太多时，我会下意识想抽离。", effects: { warmth: -2, independence: 1 } },
  { title: "我不太喜欢在关系里总是由自己先软下来。", effects: { warmth: -2, principle: 1 } },
  { title: "就算有人明显脆弱，我说话也不太会刻意放软。", effects: { warmth: -2, candor: 1 } },
  { title: "很多人会把我当作一个可以安心袒露情绪的人。", effects: { warmth: 2, protectiveness: 1 } },
  { title: "就算最后帮不上忙，我也希望别人知道我在乎。", effects: { warmth: 2, idealism: 1 } },
  { title: "面对别人的情绪，我更常先评估值不值得投入。", effects: { warmth: -2, independence: 1 } }
]);

const protectivenessQuestions = createQuestions("protectiveness", [
  { title: "只要是我认定的人，我通常会下意识想照看他们。", effects: { protectiveness: 2, warmth: 1 } },
  { title: "我很难眼看着身边的人独自扛住一切。", effects: { protectiveness: 2 } },
  { title: "对我来说，真正的力量感常常来自让别人安心。", effects: { protectiveness: 2, warmth: 1 } },
  { title: "如果有人明显撑不住了，我一般不会只给建议就算了。", effects: { protectiveness: 2 } },
  { title: "我会记住别人需要被照顾的小细节。", effects: { protectiveness: 2, warmth: 1 } },
  { title: "重要的人一开口求助，我通常很难袖手旁观。", effects: { protectiveness: 2 } },
  { title: "我愿意为了保护自己在意的人，主动多承担一点。", effects: { protectiveness: 2, principle: 1 } },
  { title: "很多时候，我会先想“谁来兜底”，然后发现那个人是我。", effects: { protectiveness: 2, introspection: 1 } },
  { title: "我并不排斥在关系里扮演“稳住局面”的角色。", effects: { protectiveness: 2 } },
  { title: "哪怕我自己也很累，我还是会本能地去顾别人。", effects: { protectiveness: 2, warmth: 1, independence: -1 } },
  { title: "我通常认为，真正重要的人际关系里，本来就该彼此照看。", effects: { protectiveness: 2, idealism: 1 } },
  { title: "别人出了状况时，我通常不会主动把照看责任揽到自己身上。", effects: { protectiveness: -2, independence: 1 } }
]);

const idealismQuestions = createQuestions("idealism", [
  { title: "即使局势很难，我心里通常还是愿意相信事情能慢慢变好。", effects: { idealism: 2 } },
  { title: "我做很多决定时，心里其实一直想让周围的事情更好一点。", effects: { idealism: 2, protectiveness: 1 } },
  { title: "看到明显不公平的事，我很难完全装作没看见。", effects: { idealism: 2, principle: 1 } },
  { title: "我容易被那些在艰难里仍然温柔的人打动。", effects: { idealism: 2, warmth: 1 } },
  { title: "即使现实会让人失望，我也不想活得只剩防御。", effects: { idealism: 2, warmth: 1 } },
  { title: "我还是希望自己做的事对别人、对环境、对未来有一点正向意义。", effects: { idealism: 2 } },
  { title: "比起犬儒，我更怕自己变得什么都不再相信。", effects: { idealism: 2, introspection: 1 } },
  { title: "如果一个人真的改变了，我愿意再给一次信任。", effects: { idealism: 2, warmth: 1 } },
  { title: "我相信人和关系是有可能慢慢变好的。", effects: { idealism: 2, warmth: 1 } },
  { title: "哪怕只是一点点，我也想让自己活得有某种向上的方向感。", effects: { idealism: 2 } },
  { title: "只要局势允许，我会更愿意给世界一点善意而不是先亮出防御。", effects: { idealism: 2, warmth: 1 } },
  { title: "大多数时候，我觉得期待改变只会让人更容易失望。", effects: { idealism: -2, introspection: 1 } }
]);

const principleQuestions = createQuestions("principle", [
  { title: "重大决定里，我通常更想对得起自己的价值观，而不只是看结果。", effects: { principle: 2, idealism: 1 } },
  { title: "对我来说，规则和底线一旦定下，就不该轻易破例。", effects: { principle: 2 } },
  { title: "我会很在意自己有没有守住承诺。", effects: { principle: 2, protectiveness: 1 } },
  { title: "就算没人知道，我也会在意自己做的事是否过得去。", effects: { principle: 2, introspection: 1 } },
  { title: "我最受不了的，是明明知道不对还毫无负担地去做。", effects: { principle: 2 } },
  { title: "比起“是否方便”，我更在意“是否应该”。", effects: { principle: 2 } },
  { title: "在压力大的时候，我反而更需要内在坐标别乱。", effects: { principle: 2, introspection: 1 } },
  { title: "我不太能接受为了达成目的就什么都能灵活处理。", effects: { principle: 2 } },
  { title: "别人怎么看我并不是重点，重点是我自己知不知道有没有越线。", effects: { principle: 2, independence: 1 } },
  { title: "一旦答应了一件重要的事，我通常不会轻易撤退。", effects: { principle: 2, protectiveness: 1 } },
  { title: "很多时候，我宁可麻烦一点，也不愿违背自己的底线。", effects: { principle: 2 } },
  { title: "在关键时刻，只要结果好，中间怎么做并没有那么重要。", effects: { principle: -2 } }
]);

const candorQuestions = createQuestions("candor", [
  { title: "如果我不同意一件事，我更倾向直接把真实想法说出来。", effects: { candor: 2, principle: 1 } },
  { title: "比起猜来猜去，我更喜欢把话说开。", effects: { candor: 2 } },
  { title: "我不太擅长在关系里长期保持模糊和试探。", effects: { candor: 2 } },
  { title: "别人通常比较容易看懂我喜欢什么、不喜欢什么。", effects: { candor: 2 } },
  { title: "如果一个问题迟早要面对，我宁愿早点讲清楚。", effects: { candor: 2, principle: 1 } },
  { title: "我不喜欢把真正重要的立场藏得太深。", effects: { candor: 2 } },
  { title: "面对误解时，我更想尽快把事实掰正。", effects: { candor: 2 } },
  { title: "我习惯让别人知道我在意什么，不太爱绕弯。", effects: { candor: 2 } },
  { title: "对我来说，坦率比维持表面的平静更重要。", effects: { candor: 2, principle: 1 } },
  { title: "如果一个人总在暗示和试探，我会感到很累。", effects: { candor: 2 } },
  { title: "我并不排斥当那个把话说破的人。", effects: { candor: 2 } },
  { title: "就算表达会带来一点冲突，我也不喜欢一直留底牌。", effects: { candor: 2 } },
  { title: "很多时候，我更愿意保留真实想法，先看别人会怎么动。", effects: { candor: -2, independence: 1 } }
]);

const independenceQuestions = createQuestions("independence", [
  { title: "在关系里，我非常需要保有自己的决定权和自由空间。", effects: { independence: 2 } },
  { title: "我需要相当稳定的独处时间，才能慢慢把自己恢复回来。", effects: { independence: 2, introspection: 1 } },
  { title: "我并不喜欢被任何关系、规则或期待定义得太死。", effects: { independence: 2 } },
  { title: "比起问大家怎么看，我通常会先看自己到底怎么想。", effects: { independence: 2, introspection: 1 } },
  { title: "如果局面不对，我会很快把距离和边界拉出来。", effects: { independence: 2, warmth: -1 } },
  { title: "我能自己做决定的时候，会尽量避免让别人替我拿主意。", effects: { independence: 2 } },
  { title: "就算和别人很亲近，我也不希望失去自己的节奏。", effects: { independence: 2 } },
  { title: "相比被照顾，我更习惯自己先想办法。", effects: { independence: 2, protectiveness: -1 } },
  { title: "我并不需要很多人认同，才敢走自己那条路。", effects: { independence: 2 } },
  { title: "我天然会先判断这件事是不是值得我亲自投入。", effects: { independence: 2, introspection: 1 } },
  { title: "很多时候，我更在意有没有掌握主动权。", effects: { independence: 2, candor: -1 } },
  { title: "只要我觉得方向没问题，一个人往前走也没关系。", effects: { independence: 2 } },
  { title: "没有稳定的关系感和归属感，我会很难真正安心。", effects: { independence: -2, warmth: 1 } }
]);

const playfulnessQuestions = createQuestions("playfulness", [
  { title: "别人通常会觉得我身上有一点轻快、发光或者让人放松的气质。", effects: { playfulness: 2, warmth: 1 } },
  { title: "在有点尴尬的场合里，我常常会顺手把气氛带起来。", effects: { playfulness: 2, candor: 1 } },
  { title: "我比较擅长用幽默或者轻松感让局面不那么僵。", effects: { playfulness: 2 } },
  { title: "就算遇到难事，我也不太想把自己活得特别沉重。", effects: { playfulness: 2, idealism: 1 } },
  { title: "我并不排斥成为人群里比较有活力、比较亮眼的那个人。", effects: { playfulness: 2 } },
  { title: "很多时候，我会靠一点玩心把压力化掉。", effects: { playfulness: 2, introspection: -1 } },
  { title: "我喜欢让场子里的人感觉轻一点、动一点，而不是一直闷着。", effects: { playfulness: 2, warmth: 1 } },
  { title: "我不太介意自己在关系里显得有趣一点、鲜活一点。", effects: { playfulness: 2 } },
  { title: "在熟悉的人面前，我会自然地显得有梗、灵活、会接话。", effects: { playfulness: 2 } },
  { title: "如果一个局面太死板，我会想办法把它搅活。", effects: { playfulness: 2, candor: 1 } },
  { title: "我会觉得“让人能喘口气”本身也是一种能力。", effects: { playfulness: 2, warmth: 1 } },
  { title: "我不希望自己活成一个太僵、太沉、太没生气的人。", effects: { playfulness: 2 } },
  { title: "我其实更习惯保持安静和克制，不太会主动把气氛带热。", effects: { playfulness: -2, introspection: 1 } }
]);

const introspectionQuestions = createQuestions("introspection", [
  { title: "被严重误解时，我会想先自己消化一下，再决定要不要解释。", effects: { introspection: 2, candor: -1 } },
  { title: "最打动我的，往往是那种经历过破碎却仍完成自我和解的人。", effects: { introspection: 2, idealism: 1 } },
  { title: "我做完一件重要的事之后，会不自觉回头复盘自己哪里还能更好。", effects: { introspection: 2 } },
  { title: "比起立刻往外冲，我有时更需要先把心里的秩序理顺。", effects: { introspection: 2 } },
  { title: "我会很在意自己现在做的事，是不是真的和内心站在一起。", effects: { introspection: 2, principle: 1 } },
  { title: "当关系出了问题，我通常会先想自己在里面发生了什么变化。", effects: { introspection: 2, warmth: 1 } },
  { title: "我不是不往前走，只是也会定期回头看自己有没有偏掉。", effects: { introspection: 2, principle: 1 } },
  { title: "我会花时间理解自己的情绪，而不是只想赶快把它们压下去。", effects: { introspection: 2, warmth: 1 } },
  { title: "如果一件事让我失衡，我很难完全假装它没发生。", effects: { introspection: 2 } },
  { title: "我相信一个人只有先和自己站在一起，很多选择才会真正稳。", effects: { introspection: 2, idealism: 1 } },
  { title: "我对内在平衡这件事，比很多人想象得更认真。", effects: { introspection: 2 } },
  { title: "我会定期把自己从喧闹里抽出来，确认一下心里到底发生了什么。", effects: { introspection: 2, independence: 1 } },
  { title: "很多时候，我更习惯靠行动往前推，而不是停下来反复感受自己。", effects: { introspection: -2, playfulness: 1 } }
]);

window.QUESTIONS = [
  ...warmthQuestions,
  ...protectivenessQuestions,
  ...idealismQuestions,
  ...principleQuestions,
  ...candorQuestions,
  ...independenceQuestions,
  ...playfulnessQuestions,
  ...introspectionQuestions
];
