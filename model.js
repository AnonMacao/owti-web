window.DIMENSIONS = [
  {
    id: "warmth",
    name: "共情温度",
    axisLow: "边界先行",
    axisHigh: "接住情绪",
    cardText: "你更习惯先保护自己的边界，还是会自然地接住别人的情绪。"
  },
  {
    id: "protectiveness",
    name: "守护欲",
    axisLow: "先顾自己",
    axisHigh: "照看别人",
    cardText: "你在关系里是先顾好自己，还是天然会把照看别人放在前面。"
  },
  {
    id: "idealism",
    name: "理想主义",
    axisLow: "现实怀疑",
    axisHigh: "相信更好",
    cardText: "你默认世界更接近冷酷现实，还是仍愿意相信事情能变好。"
  },
  {
    id: "principle",
    name: "原则感",
    axisLow: "结果优先",
    axisHigh: "底线优先",
    cardText: "你在关键时刻更看结果，还是更在意自己是否守住了底线。"
  },
  {
    id: "candor",
    name: "坦率度",
    axisLow: "保留试探",
    axisHigh: "直接表达",
    cardText: "你更喜欢留一手、先观察，还是倾向把想法直接说出来。"
  },
  {
    id: "independence",
    name: "独立性",
    axisLow: "重归属",
    axisHigh: "自我驱动",
    cardText: "你更需要稳定的关系与归属，还是更习惯由自己单独决定方向。"
  },
  {
    id: "playfulness",
    name: "轻快感",
    axisLow: "沉静克制",
    axisHigh: "有梗发光",
    cardText: "你给人的气质更偏安静克制，还是轻快、带一点生命力和玩心。"
  },
  {
    id: "introspection",
    name: "自我整合",
    axisLow: "向外出击",
    axisHigh: "自省修复",
    cardText: "你更容易把注意力投向外部推进，还是会回到内心做复盘与修复。"
  }
];

window.DIMENSION_WEIGHTS = {
  warmth: 0.95,
  protectiveness: 0.95,
  idealism: 1.05,
  principle: 1.2,
  candor: 1.1,
  independence: 1.2,
  playfulness: 1,
  introspection: 1.2
};

window.DIMENSION_META = {
  warmth: {
    highTag: "能接住别人",
    lowTag: "边界感很强",
    highCompare: "更容易先接住别人的情绪",
    lowCompare: "更习惯先保护自己的边界"
  },
  protectiveness: {
    highTag: "照看欲明显",
    lowTag: "先顾自己",
    highCompare: "在关系里会本能照看别人",
    lowCompare: "更偏向先顾好自己再投入"
  },
  idealism: {
    highTag: "仍相信更好",
    lowTag: "现实感很强",
    highCompare: "仍愿意相信事情能变好",
    lowCompare: "更偏向现实怀疑和自保"
  },
  principle: {
    highTag: "底线很稳",
    lowTag: "结果导向",
    highCompare: "更在意自己有没有守住底线",
    lowCompare: "更倾向为了结果调整规则"
  },
  candor: {
    highTag: "表达直接",
    lowTag: "保留试探",
    highCompare: "会把真实想法更直接地说出来",
    lowCompare: "更擅长保留、试探和观察"
  },
  independence: {
    highTag: "自驱而独立",
    lowTag: "重归属连接",
    highCompare: "更习惯自己决定方向",
    lowCompare: "更看重关系里的连接和归属"
  },
  playfulness: {
    highTag: "气质轻快",
    lowTag: "沉静克制",
    highCompare: "会给人更轻快、发光的感觉",
    lowCompare: "更沉静、收束，不会轻易把气氛推亮"
  },
  introspection: {
    highTag: "会自省修复",
    lowTag: "先向外推进",
    highCompare: "更会回到内心做复盘和修复",
    lowCompare: "更习惯先往外行动，不太停下来内耗"
  }
};

window.HEROES = [
  {
    id: "tracer",
    name: "猎空",
    badge: "猎空",
    accent: "#f08f3a",
    typeCode: "TRCR",
    typeLabel: "点火者",
    typeTagline: "先把希望点亮，再把人带着往前跑。",
    matchScale: 1.34,
    rarityScore: 87,
    rarityLabel: "少见",
    personaCopy: "你不是那种靠压迫感建立存在的人。你更像会把空气点亮的人，愿意先把善意和行动一起扔出去，再看世界有没有回音。SPRK 型的核心不只是乐观，而是一种带着速度感的信念: 你相信事情值得变好，也相信自己应该参与让它变好。很多人会觉得你轻快、亮眼、甚至有点像永远不会真的被打倒，但只有你知道，这种明亮并不是天真，而是一种选择。你清楚现实并不总是友善，却仍然决定把那一点点希望留在手上。对朋友来说，你像情绪低谷里先亮起来的路标。对团队来说，你像那种会把停滞重新变成流动的人。你的弱点也正来自这里: 你有时太快向前，快到来不及承认自己也会累，也会被误解，也会需要别人来接住。",
    archetype: "明亮行动派",
    blurb: "你像那种把希望和行动绑在一起的人。你愿意先给世界一点善意，也愿意把周围的气氛点亮。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/tracer/",
    sourceNote: "官网将她塑造成一股难以遏制的向善力量，角色核心是乐观、善意与正义感。",
    vector: { warmth: 66, protectiveness: 50, idealism: 74, principle: 50, candor: 74, independence: 56, playfulness: 82, introspection: 38 }
  },
  {
    id: "reinhardt",
    name: "莱因哈特",
    badge: "莱因",
    accent: "#d38b38",
    typeCode: "LION",
    typeLabel: "誓约者",
    typeTagline: "你把承诺当成骨架，把守护当成天职。",
    matchScale: 1.00,
    rarityScore: 81,
    rarityLabel: "少见",
    personaCopy: "VOWD 型的人格核心，是把“我答应过”这件事看得非常重。你不会轻易把自己交给谁、交给什么事，但一旦认定，就会有很强的责任感和承担感。你天生带一点正面站出来的气质，哪怕你并不总是高调，别人也会默认你是那个能扛事的人。你看重荣誉、信义、边界和承诺，不太能接受模糊、推诿或毫无底线的灵活。你最强的地方，是能在混乱里让人重新相信“还是有人会站出来”。你最容易辛苦的地方，也是会把很多责任过度地揽到自己身上，好像一旦放下，就辜负了某种更大的东西。VOWD 不一定总是轻松，但几乎总能给人一种可靠的重量感。",
    archetype: "荣耀守护者",
    blurb: "你身上有很强的担当感。你会把守护、承诺和正面站出来看得比很多事情都重要。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/reinhardt/",
    sourceNote: "官网反复强调荣誉、正义与勇气，他的人设重心是守护、担当和直来直往。",
    vector: { warmth: 58, protectiveness: 78, idealism: 64, principle: 82, candor: 74, independence: 34, playfulness: 28, introspection: 46 }
  },
  {
    id: "mercy",
    name: "天使",
    badge: "天使",
    accent: "#f0b44f",
    typeCode: "MERC",
    typeLabel: "修复者",
    typeTagline: "你先看见人的脆弱，再决定怎么把人带回完整。",
    matchScale: 1.00,
    rarityScore: 90,
    rarityLabel: "稀有",
    personaCopy: "MEND 型的人，身上有一种非常稳定的修复感。你不是那种通过锋利证明自己的人，你更擅长的是把碎裂重新拼回去，把快要失控的东西慢慢稳住。你会天然感知他人的脆弱、疲惫和缺口，也因此比很多人更容易承担“照看”的角色。你的强项不只是温柔，而是温柔里带着清醒: 你知道不是所有人都值得无条件拯救，但你仍然愿意相信大多数伤口都配得上被认真对待。别人会在你身上感到一种安定，像是局面再乱，只要你在，很多东西都还有机会被救回来。你的难处，是你太容易习惯自己当修复系统，却忘了你也会耗尽。MEND 型最需要学会的，不是如何继续给予，而是如何允许自己也被照顾。",
    archetype: "慈悲医者",
    blurb: "你更像会优先看见人的脆弱和可救之处的人。你在关系里的力量不是压迫感，而是稳定和照拂。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/mercy/",
    sourceNote: "官网聚焦她的医者伦理与救人信念，兼具慈悲、责任感和温和克制。",
    vector: { warmth: 78, protectiveness: 90, idealism: 60, principle: 56, candor: 32, independence: 18, playfulness: 14, introspection: 82 }
  },
  {
    id: "sombra",
    name: "黑影",
    badge: "黑影",
    accent: "#7f5ea8",
    typeCode: "SOMB",
    typeLabel: "拿捏者",
    typeTagline: "你不一定站在台前，但你很难允许自己失去主动权。",
    matchScale: 0.92,
    rarityScore: 84,
    rarityLabel: "少见",
    personaCopy: "CTRL 型的人，最核心的欲望不是被喜欢，而是掌握局势。你会天然去看信息、关系、立场和权力流向，哪怕你嘴上没说，心里也早就在拆解每个人的动机。比起立刻交心，你更相信保留、试探和布局。你知道太早把底牌翻出来，通常不会有好结果，所以你宁愿聪明一点、慢一点，也不愿意把主动权交出去。别人可能会觉得你神秘、难懂，甚至有点危险，但这套模式背后常常不是恶意，而是一种很深的自保本能。CTRL 的厉害之处，是永远知道该看哪里、抓哪里、留哪里。CTRL 的辛苦之处，是很难真正松手。你太清楚失控意味着什么，所以很难毫无防备地信任谁。这会让你看起来很强，但也容易在关系里始终保留最后一层门锁。",
    archetype: "信息操盘者",
    blurb: "你更像把主动权看得很重的人。比起立刻交心，你更相信观察、布局和掌握信息差。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/sombra/",
    sourceNote: "官网把她写成用信息操控权力的人，聪明、保留、以自我掌控和策略性为先。",
    vector: { warmth: 18, protectiveness: 12, idealism: 16, principle: 28, candor: 18, independence: 88, playfulness: 60, introspection: 56 }
  },
  {
    id: "winston",
    name: "温斯顿",
    badge: "温斯",
    accent: "#4aa4d7",
    typeCode: "WNST",
    typeLabel: "守望者",
    typeTagline: "你明白世界不完美，却仍愿意为更好的共同体站出来。",
    matchScale: 1.06,
    rarityScore: 88,
    rarityLabel: "少见",
    personaCopy: "KEEP 型的人格，有一种非常稀缺的气质: 不是空泛的理想，而是仍然愿意把理想留在现实里。你不是不知道世界复杂，也不是没见过失望和失败，但你心里仍旧保有一种“总得有人去守住点什么”的信念。你对共同体、承诺、未来和人与人之间仍可能存在的善意，有一种近乎固执的信任。你可能不总是最轻盈的那个人，但往往会在重要时刻重新站出来，把散掉的东西再往一起收。别人会在你身上看到一种很温厚的力量，不喧哗，却能给人支撑感。KEEP 型最大的优点，是可以在犬儒蔓延的时候仍不放弃相信。最大的难点，是你容易把“守住一切”的责任揽得过重，像是只要自己没退，世界就还能再撑一下。",
    archetype: "理想守望者",
    blurb: "你身上有一种温柔的理想感。你并不天真，但还是愿意相信共同体和值得守护的未来。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/winston/",
    sourceNote: "官网强调科学理想、对人类善意的信任，以及为了更大的共同体重新站出来。",
    vector: { warmth: 58, protectiveness: 62, idealism: 88, principle: 60, candor: 64, independence: 44, playfulness: 22, introspection: 48 }
  },
  {
    id: "ana",
    name: "安娜",
    badge: "安娜",
    accent: "#476c94",
    typeCode: "ANNA",
    typeLabel: "静护者",
    typeTagline: "你不总把情绪说出来，但会把责任真正背起来。",
    matchScale: 1.04,
    rarityScore: 89,
    rarityLabel: "少见",
    personaCopy: "VEIL 型的人，总给人一种安静而结实的感觉。你不一定很好接近，也不会把所有情绪都摊开，但在真正重要的时刻，别人会发现你一直都在。你习惯先观察、先判断、先把局势看清楚，然后再决定自己该往哪边站。你的人格里有很强的责任感和成熟度，这使你在关系和群体里往往承担“默默兜底”的位置。你不太喜欢夸张的情绪表达，也不依赖高调存在感来证明自己。VEIL 更像一块沉着的布，把锋利、焦虑和失控暂时盖住，好让事情还能继续往前。你的优点，是冷静、可靠、现实且有分寸。你的辛苦，是常常会把能说的都吞回去，把能扛的都留给自己，于是别人以为你不需要被理解，实际上你只是太习惯先照顾全局。",
    archetype: "克制守望者",
    blurb: "你像那种不会轻易把情绪摊开，但会默默背责任的人。你现实、成熟，也很难对需要保护的人无动于衷。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/ana/",
    sourceNote: "官网把她写成老练、克制、背负责任的人，既现实也非常在意守护。",
    vector: { warmth: 34, protectiveness: 62, idealism: 22, principle: 88, candor: 32, independence: 64, playfulness: 10, introspection: 86 }
  },
  {
    id: "genji",
    name: "源氏",
    badge: "源氏",
    accent: "#69a842",
    typeCode: "GENJ",
    typeLabel: "回声者",
    typeTagline: "你真正重视的，不是完美，而是和自己重新站在一起。",
    matchScale: 0.86,
    rarityScore: 92,
    rarityLabel: "稀有",
    personaCopy: "ECHO 型的人通常带着很强的自我修复感。你未必从一开始就稳定、平和、完整，恰恰相反，你更像是经历过失衡、撕裂甚至对自我的陌生之后，才慢慢学会把自己重新拼回去的人。你对“和自己相处”这件事比很多人更认真，也更敏感。你会在意一个决定是不是违背了内在的声音，会在意自己现在做的事，是否真的和内心站在同一边。别人看到的你，可能是克制的、沉稳的、甚至有点疏离，但你的底层其实很柔软，也很珍惜那些真正来之不易的平衡。ECHO 型最迷人的地方，是那种从破碎里长出来的清醒。最难的地方，是你会比别人更怕重新失去这种好不容易建立起来的内在秩序。",
    archetype: "自我修复者",
    blurb: "你的人格张力更像经历过撕裂之后重新长好的人。你不一定高调，但很在意内在是否真的和自己站在一起。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/genji/",
    sourceNote: "官网重点是从撕裂到和解、自我修复和精神上的平衡。",
    vector: { warmth: 34, protectiveness: 28, idealism: 42, principle: 38, candor: 28, independence: 72, playfulness: 16, introspection: 86 }
  },
  {
    id: "zenyatta",
    name: "禅雅塔",
    badge: "禅雅",
    accent: "#c8a14a",
    typeCode: "ZEN",
    typeLabel: "澄明者",
    typeTagline: "你不是靠声量影响别人，而是靠安定本身让人靠近。",
    matchScale: 0.92,
    rarityScore: 82,
    rarityLabel: "少见",
    personaCopy: "CALM 型的人，身上最强的力量不是存在感，而是安定感。你天然对内在世界、精神秩序和情绪流动很敏感，也因此很容易成为别人愿意靠近、倾诉、甚至寻求理解的对象。你并不一定很热闹，但你会让人感到自己在你面前可以慢下来、真实一点。你相信理解本身有力量，也相信一个人只有先和自己和解，才能真正面对世界。CALM 型不追求戏剧化的征服感，更在意深层的整合、平衡和清醒。你的优点，是慈悲、包容、稳定且洞察细腻。你的难点，是有时太容易退回到精神世界里，像是看透了很多东西，也因此更难轻易被拉进喧哗和混乱之中。",
    archetype: "宁静引路人",
    blurb: "你更像那种先处理内在，再影响外部的人。你的人格重心不在喧闹，而在理解、安定和真正的内在平衡。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/zenyatta/",
    sourceNote: "官网强调慈悲、平静，以及帮助他人跨越内心挣扎、寻找内在安宁。",
    vector: { warmth: 66, protectiveness: 40, idealism: 78, principle: 62, candor: 34, independence: 44, playfulness: 8, introspection: 96 }
  },
  {
    id: "kiriko",
    name: "雾子",
    badge: "雾子",
    accent: "#c83c58",
    typeCode: "KIRI",
    typeLabel: "街灵者",
    typeTagline: "你能靠近人群，也保得住自己的锋利和自由。",
    matchScale: 0.94,
    rarityScore: 86,
    rarityLabel: "少见",
    personaCopy: "KITS 型的人有一种很特别的双重感: 既能和人贴得很近，又不会真的把自己完全交出去。你会对熟悉的人和熟悉的地方有非常鲜明的保护欲，也乐于在自己认定的圈子里承担照看和连结的角色。但与此同时，你骨子里又很强调自主、速度和自己的判断。你不喜欢被规训成某种单一形象，也不愿意为了融入而磨掉自己的边角。KITS 很像城市里的灵体，聪明、机敏、带一点玩心，也带一点不好惹的锐度。别人会觉得你既亲近又独立，像是可以并肩，却不容易真正被定义。你的优点，是灵活、讲义气、懂连接也懂自保。你的难点，是有时为了保住自由和锋利，会把一些更深的依赖关系留在门外。",
    archetype: "街区守护者",
    blurb: "你像那种在亲近关系里很有温度，但骨子里仍坚持由自己决定方向的人。你能连接人，也不会轻易失去锋利。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/kiriko/",
    sourceNote: "官网强调她在都市生活与传统守护身份之间穿梭，既亲近社区也非常自主。",
    vector: { warmth: 46, protectiveness: 36, idealism: 30, principle: 24, candor: 42, independence: 82, playfulness: 86, introspection: 24 }
  },
  {
    id: "mei",
    name: "小美",
    badge: "小美",
    accent: "#55add0",
    typeCode: "MEI",
    typeLabel: "暖光者",
    typeTagline: "你不是最喧闹的那个，但会让很多人愿意继续相信。",
    matchScale: 0.96,
    rarityScore: 85,
    rarityLabel: "少见",
    personaCopy: "GLOW 型的人，力量感往往不是轰鸣式的，而是持续发热式的。你不靠攻击感、不靠压迫感，也不一定靠绝对强势来影响别人。你更像一盏一直亮着的灯，温和、耐心、稳定，甚至在别人开始觉得一切都不值得时，你还在一点点把事情往前推。你对世界保有很珍贵的善意和信念，这种信念不吵，却很难被真正熄灭。别人会从你身上感到舒服、可信和一种很难得的“没关系，我们慢慢来也可以”。GLOW 型很适合在混乱里做秩序的缓冲层，也很适合在冷掉的人际里重新点起温度。你的难点，是容易低估自己，或者把自己的坚持包装得太轻，以至于别人忘记了你其实也非常坚韧。",
    archetype: "温柔坚持者",
    blurb: "你更像那种不会用攻击感证明自己的人。你靠温柔、耐心和持续的信念感把事情慢慢做成。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/mei/",
    sourceNote: "官网强调她对地球与人的温柔、坚持和乐观。",
    vector: { warmth: 76, protectiveness: 54, idealism: 82, principle: 50, candor: 36, independence: 16, playfulness: 20, introspection: 70 }
  },
  {
    id: "reaper",
    name: "死神",
    badge: "死神",
    accent: "#4f5662",
    typeCode: "REAP",
    typeLabel: "暮刃者",
    typeTagline: "你不会轻易交出信任，很多情绪都被你收成了锋利。",
    matchScale: 0.84,
    rarityScore: 93,
    rarityLabel: "稀有",
    personaCopy: "DUSK 型的人格里，有非常强的边界和阴影感。你不擅长轻易相信，也不喜欢把脆弱暴露在别人看得见的地方。很多人会先注意到你的冷感、疏离、警惕甚至攻击性，但这些外层壳往往只是因为你太清楚失望、背叛和失控会留下什么。你倾向把情绪收进身体里，把目标抓在手里，用一种几乎不留退路的方式往前走。你不是没有感受，而是很多感受已经被你压缩成了意志。DUSK 的强大，在于极端情况下仍能维持向前推进的硬度。DUSK 的辛苦，在于这份硬度太容易同时切伤自己。你把门锁得很紧，所以别人很难靠近；可同样地，连你自己有时也很难回到真正柔软的地方。",
    archetype: "孤绝复仇者",
    blurb: "你更像边界极强、信任阈值很高的人。你不是没有情绪，而是更倾向把痛苦和目标都握在自己手里。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/reaper/",
    sourceNote: "官网把他写成被愤怒与复仇驱动的人物，孤绝、阴郁、以破坏性目标前行。",
    vector: { warmth: 12, protectiveness: 10, idealism: 10, principle: 44, candor: 22, independence: 82, playfulness: 8, introspection: 28 }
  },
  {
    id: "moira",
    name: "莫伊拉",
    badge: "莫伊",
    accent: "#a33c84",
    typeCode: "MOIR",
    typeLabel: "轴心者",
    typeTagline: "你更信判断和效率，而不是温情叙事。",
    matchScale: 0.90,
    rarityScore: 97,
    rarityLabel: "超稀有",
    personaCopy: "AXIS 型的人，最典型的特质是冷静、强判断、自我中心轴非常稳。你不太会因为多数人的情绪、道德期待或舆论风向就改变自己的认知路径。对你来说，很多人眼里“应该如此”的东西，不过是社会默认值，不代表你必须接受。你更在意的是事实、效率、推进和结果本身。你可以非常专注、非常聪明，也非常不容易被情绪左右。别人可能会觉得你强势、难搞、过于冷酷，甚至不近人情，但从你的视角看，那只是因为你比很多人更少被温情故事说服。AXIS 的优点，是认知清醒、行动果断、不容易被集体情绪裹挟。AXIS 的风险，是一旦过度相信只有自己的判断可靠，就容易让人与人的连接退化成纯粹的功能关系。",
    archetype: "冷酷理性派",
    blurb: "你更接近把效率、认知和自我判断放在道德情绪前面的人。你在乎推进，而不太愿意被温情叙事束缚。",
    sourceUrl: "https://overwatch.blizzard.com/en-us/heroes/moira/",
    sourceNote: "官网强调她只在乎科研推进本身，冷酷、理智、漠视伦理约束。",
    vector: { warmth: 16, protectiveness: 10, idealism: 14, principle: 22, candor: 64, independence: 68, playfulness: 6, introspection: 78 }
  }
];
