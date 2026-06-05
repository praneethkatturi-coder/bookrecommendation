import { Book } from '../types';

export const BOOKS_DATABASE: Book[] = [
  {
    id: 'atomic_habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Productivity & Habits',
    category: 'Productivity',
    level: 'Beginner',
    timeToFinish: '15m daily',
    rating: 4.8,
    difficultyLabel: 'Beginner • Highly Practical',
    coverGradient: 'from-amber-500 to-orange-600',
    overallAim: 'Build tiny daily behaviors that compound into staggering lifetime results.',
    outcome: 'Design environments and habit loops that eliminate procrastination and make progress inevitable.',
    summary1Min: [
      'Habits are the compound interest of self-improvement; getting 1% better daily yields a 37x change in a year.',
      'Forget about goals: focus on your systems (the processes that lead to those results).',
      'The Four Laws of Behavior Change: Make it Obvious, Make it Attractive, Make it Easy, Make it Satisfying.',
      'Identity shift: To change a habit permanently, focus on who you wish to become rather than what you want to achieve.'
    ],
    summary5Min: [
      {
        chapter: '1. The Power of Systems over Goals',
        text: 'Goals are about the results you want to achieve. Systems are about the processes that lead to those results. Winners and losers have the same goals. It is the system of continuous small improvements that determines the outcome. Achieving a goal only changes your life for the moment.',
        takeaway: 'Set your trajectory, not your immediate milestones.'
      },
      {
        chapter: '2. The Four Laws of Habit Creation',
        text: 'To build a habit: (1) Cue: Make it obvious by designing your environment. (2) Craving: Make it attractive by bundling it with something you want. (3) Response: Make it easy by reducing friction and standardizing the 2-minute rule. (4) Reward: Make it satisfying with immediate validation.',
        takeaway: 'Structure your physical surroundings to support your aspirations.'
      },
      {
        chapter: '3. Identity-Based Habits',
        text: 'True behavior change is identity change. You might start a habit because of motivation, but you only stick to it because it becomes part of who you are. Every action you take is a vote for the type of person you want to become.',
        takeaway: 'Ask yourself: What would a disciplined person do?'
      }
    ],
    insights: [
      'Environment Design: It is easier to build automated habits in an organized environment than to resist temptation in a cluttered one.',
      'Reframing Habits: Focus on the positive benefits of hard habits rather than the sacrifices required.',
      'The Two-Minute Rule: When you start a new habit, it should take less than two minutes to do. Stop before it feels like a chore.'
    ],
    audioScript: 'Welcome to this summary of Atomic Habits by James Clear. Today, we focus on the core law of human performance: compounding behavior. Clear argues that small habits do not add up, they compound. Just as money multiplies through compound interest, the effects of your habits multiply as you repeat them. A mere one percent improvement daily results in a thirty-seven times growth over a single year. To transform your behavior, align your physical cues, simplify the starting steps, and link habits directly to your core self-identity. This visual guide will lead you through designing your own positive compounding loops.',
    audioDuration: '02:05',
    audioDurationSeconds: 125,
    baselineReason: 'Matches productivity goals by offering a direct, actionable system for tiny visual habits and atomic structures.'
  },
  {
    id: 'deep_work',
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Focus & Productivity',
    category: 'Productivity',
    level: 'Intermediate',
    timeToFinish: '20m daily',
    rating: 4.7,
    difficultyLabel: 'Intermediate • Analytical Framework',
    coverGradient: 'from-blue-600 to-indigo-800',
    overallAim: 'Master the rare cognitive ability to focus intensely on complex tasks without distraction.',
    outcome: 'Produce elite-level outputs at high speeds while shielding your mind from modern digital noise.',
    summary1Min: [
      'Deep Work is distraction-free concentration that pushes your cognitive capabilities to their absolute limit.',
      'The ability to focus intensely is becoming extremely rare at the precise moment it is becoming highly valuable in our economy.',
      'Shallow Work is non-cognitively demanding, logistical tasks often performed while distracted. It does not create new value.',
      'Avoid attention residue: switching tasks leaves a cognitive penalty that cripples efficiency for up to 20 minutes.'
    ],
    summary5Min: [
      {
        chapter: '1. The Deep Work Hypothesis',
        text: 'In the modern information economy, workers who can perform deep work thrive because they synthesize complex information rapidly and write high-quality material. Those who spend all day on slack, emails, and tweets face cognitive decay.',
        takeaway: 'High quality work is a direct product of Time Spent multiplied by Intensity of Focus.'
      },
      {
        chapter: '2. Four Philosophies of Deep Focus',
        text: 'Choose your depth ritual: (a) Monastic: Complete isolation from all shallow duties. (b) Bimodal: Splitting weeks or seasons into dedicated deep and shallow phases. (c) Rhythmic: Daily 90-minute blocks. (d) Journalistic: Dropping into deep focus whenever a free block arises.',
        takeaway: 'Adopt a structured schedule that matches your personal life rhythm.'
      },
      {
        chapter: '3. Embrace Boredom & Quit Social Media',
        text: 'By constantly satisfying every micro-moment of boredom with quick scrolls on your phone, you train your brain to be addicted to distraction. You fail to form the neural pathways required for deep cognitive endurance.',
        takeaway: 'Practice doing nothing. Let your mind recharge in default operating networks.'
      }
    ],
    insights: [
      'Attention Residue: When you switch from Task A to Task B, your attention does not follow immediately. A portion remains stuck handling the previous task.',
      'The Law of Productivity: Elite content creation requires undisturbed, quiet isolation. Collaboration is valuable, but execution is solitary.',
      'Shallow Work Pruning: Actively schedule every minute of your workday and restrict logistical email answering to designated check-ins.'
    ],
    audioScript: 'This is the executive summary of Deep Work by Cal Newport. Newport states that attention preservation is the ultimate competitive advantage of the twenty-first century. As digital tools fracture our minds, the individuals who can cultivate hours of pure, undistracted attention will dominate intellectual industries. To achieve this, we must eradicate attention residue by planning our schedule in advance and embracing systematic boredom rather than immediately turning to our phones.',
    audioDuration: '01:50',
    audioDurationSeconds: 110,
    baselineReason: 'Matches your goal of building focus by offering systematic, concrete rules to avoid task-switching distraction and build raw cognitive endurance.'
  },
  {
    id: 'psychology_of_money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Personal Finance & Mindset',
    category: 'Personal Finance',
    level: 'Beginner',
    timeToFinish: '15m daily',
    rating: 4.9,
    difficultyLabel: 'Beginner • Highly Engaging',
    coverGradient: 'from-emerald-600 to-teal-800',
    overallAim: 'Understand how human emotion, ego, and greed shape our lifetime wealth far more than spreadsheets.',
    outcome: 'Establish healthy wealth patterns, lower stress regarding finances, and achieve ultimate time-sovereignty.',
    summary1Min: [
      'Doing well with money has surprisingly little to do with how smart you are, and a great deal to do with how you behave.',
      'True wealth is what you do not see: the luxury cars not purchased, the premium watches skipped, and the financial freedom preserved.',
      'The highest dividend money pays is time sovereignty: the ultimate freedom to control your own calendar.',
      'Compounding only works when you leave your strategy alone to grow unhindered for decades.'
    ],
    summary5Min: [
      {
        chapter: '1. No One is Crazy',
        text: 'Every person views financial risk based on the environment they grew up in. A person who grew up during high inflation looks at investments fundamentally differently than a person who grew up when stocks were stable. Our decisions are logical to ourselves given our personal history.',
        takeaway: 'Do not judge others financial decisions; instead, align your investments with your sleep quality.'
      },
      {
        chapter: '2. Wealth is what you do not see',
        text: 'Rich is an active current income level that gets spent on high-end luxury assets. Wealth is the income saved and invested that has not been converted into physical possessions. Wealth is the options, flexibility, and safety net you maintain.',
        takeaway: 'Control your ego. Your savings rate is the ultimate lever of financial control.'
      },
      {
        chapter: '3. The Magic of Long-Tail Outcomes',
        text: 'Most financial success comes from a tiny fraction of investment decisions. The secret is staying in the game long enough that those long-tail home runs can compound without you interrupting them out of panic.',
        takeaway: 'Aim to be reasonable rather than perfectly rational.'
      }
    ],
    insights: [
      'Time Sovereignty: The ability to do what you want, when you want, with whom you want, for as long as you want, is the highest wealth yield.',
      'The Room for Error: Plan for your plan not going according to plan. Having a cash buffer is not inefficient; it is the cost of survival.',
      'Ego Control: Savings is the gap between your ego and your income. Live below your means to secure your autonomy.'
    ],
    audioScript: 'Welcome to this digest of The Psychology of Money by Morgan Housel. Housel explains that wealth is primarily behavior rather than cold science. While spreadsheets tell you how to maximize mathematical return, the best investment strategy is simply the one that lets you sleep peacefully at night and keep compounding. Rich is what you spend, but wealth is what you save, granting you time freedom.',
    audioDuration: '01:55',
    audioDurationSeconds: 115,
    baselineReason: 'Matches finance and behavioral goals by teaching how self-control, patience, and mindset matter more than complex math for building long term capital.'
  },
  {
    id: 'thinking_fast_slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Cognitive Science & Psychology',
    category: 'Psychology',
    level: 'Advanced',
    timeToFinish: '30m daily',
    rating: 4.6,
    difficultyLabel: 'Advanced • Highly Academic',
    coverGradient: 'from-violet-600 to-indigo-950',
    overallAim: 'Decode the systematic cognitive biases and dual mental engines that govern all human judgment.',
    outcome: 'Identify logical fallacies in your daily decision-making, manage risk with clarity, and avoid emotional thinking traps.',
    summary1Min: [
      'The brain is ruled by dual drivers: System 1 (Fast, emotional, automatic, energy-efficient) and System 2 (Slow, logical, effortful, lazy).',
      'Cognitive ease feels familiar and true, making us susceptible to confirmation bias and misleading stories.',
      'Prospect Theory: Humans dread loss roughly twice as much as they value equivalent raw gains, causing risk aversion.',
      'We rely on heuristics (mental shortcuts) to answer complex life questions, leading to dramatic statistical mistakes.'
    ],
    summary5Min: [
      {
        chapter: '1. Two Systems of Cognitive Processing',
        text: 'System 1 runs automatically on sub-conscious patterns (e.g. reading a billboard or jumping back from a snake). System 2 handles heavy computational lifting (e.g. 17 multiplied by 24, or parallel parking). Because System 2 is lazy, the brain defaults to System 1 shortcuts even when dealing with vital long-term policies.',
        takeaway: 'Slow down when facing statistical probabilities and high-stakes financial or career choices.'
      },
      {
        chapter: '2. Bias, Anchoring, and Availability',
        text: 'We assess general risks by how easily examples come to our imagination. We anchor our estimations based on irrelevant numbers we saw recently. We mistake high confidence for high accuracy, ignoring baseline statistical probability.',
        takeaway: 'Focus on base rates. Do not craft an elaborate story when statistical evidence is missing.'
      },
      {
        chapter: '3. Loss Aversion & Risk Architecture',
        text: 'Prospect Theory shows that pain from losing one hundred dollars is far larger than happiness from receiving one hundred dollars. This asymmetrical pain leads to illogical decisions like keeping failing investments too long or rejecting lucrative bets.',
        takeaway: 'Adopt a portfolio mindset to evaluate risk collectively and objectively over continuous interactions.'
      }
    ],
    insights: [
      'WYSIATI (What You See Is All There Is): The brain constructs rapid, coherent narratives using only immediate local clues, ignoring missing statistical facts.',
      'The Planning Fallacy: People consistently underestimate the time, budget, and energy required to complete projects due to optimistic bias.',
      'The Anchoring Effect: Exposure to a completely random suggestion influences subsequent numerical estimations when estimating values.'
    ],
    audioScript: 'In this cognitive guide of Daniel Kahneman’s epic work Thinking Fast and Slow, we dissect the two primary engines of human consciousness. System one is our lightning-fast instinctual brain, while system two is our computationally exhausting analytical computer. In daily life, our lazy analytical brain offloads logic to system one, resulting in universal mental biases such as loss aversion and anchoring. By recognizing these natural biological gaps, we can improve our strategic decision-making.',
    audioDuration: '02:30',
    audioDurationSeconds: 150,
    baselineReason: 'Offers deep, analytical mental models perfect for intermediate to advanced readers seeking to spot cognitive errors.'
  },
  {
    id: 'lean_startup',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    genre: 'Business & Management',
    category: 'Bis/Startup',
    level: 'Intermediate',
    timeToFinish: '20m daily',
    rating: 4.7,
    difficultyLabel: 'Intermediate • Practical Business',
    coverGradient: 'from-pink-600 to-rose-700',
    overallAim: 'Build successful businesses through scientific testing, rapid validation, and adaptive pivoting.',
    outcome: 'Minimize wasted capital and development hours by iterating with real-world user feedback immediately.',
    summary1Min: [
      'A startup is an institution designed to create new products under conditions of extreme uncertainty.',
      'The ultimate engine of startup progress is validated learning through rapid experimentations.',
      'Build-Measure-Learn feedback loop: Build an MVP (Minimum Viable Product), measure user habits, and decide to pivot or persevere.',
      'Eliminate vanity metrics: track actionable metrics that show true customer retention and growth engines.'
    ],
    summary5Min: [
      {
        chapter: '1. Validate Your Hypotheses Scientificially',
        text: 'Traditional business planning assumes a predictable world. In a startup, you must treat your business plan as a set of unproven assumptions. Your two critical assumptions are: (a) The Value Hypothesis (does anyone actually want this?) and (b) The Growth Hypothesis (how will customers discover this?).',
        takeaway: 'Launch small, controlled experiments to test your core assumptions before writing massive code.'
      },
      {
        chapter: '2. The Minimum Viable Product (MVP)',
        text: 'The MVP is the simplest version of your product that lets you start the Build-Measure-Learn loop with the minimum amount of effort and development time. It is not a sloppy product, but a highly targeted probe designed to gather validated learning.',
        takeaway: 'Strip away any feature that does not directly contribute to the learning you need.'
      },
      {
        chapter: '3. Pivot or Persevere',
        text: 'Based on learning metrics, founders must regularly face the hardest choice: to Pivot (change the fundamental path of the product, e.g. target demographic, pricing model, platform) or Persevere (continue incremental optimization). failing to pivot leads to burning all remaining capital.',
        takeaway: 'Establish scheduled pivot assessment reviews to look at qualitative feedback objectively.'
      }
    ],
    insights: [
      'Actionable vs Vanity Metrics: Vanity metrics make you feel good (e.g. total signups) but do not show retention. Actionable metrics drive decisions (e.g. weekly active cohort retention).',
      'Continuous Deployment: Ship codes frequently to receive customer diagnostic signals in raw, real-world conditions immediately.',
      'The Five Whys: Resolve operational failures by searching down to the human roots, rather than just solving superficial tech errors.'
    ],
    audioScript: 'This is a summary of The Lean Startup by Eric Ries. Under extreme uncertainty, traditional business forecasting fails. Ries posits that progress must be measured as validated learning: the scientific measurement of customer behavior. By fast-tracking our build, measure, and learn feedback loop with a highly targeted Minimum Viable Product, we can pivot early and save our precious capital.',
    audioDuration: '02:00',
    audioDurationSeconds: 120,
    baselineReason: 'Provides startup enthusiasts with structured methodologies of testing assumptions, structuring cohort feedback, and optimizing business execution.'
  },
  {
    id: 'zero_to_one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    genre: 'Business & Philosophy',
    category: 'Bis/Startup',
    level: 'Advanced',
    timeToFinish: '25m daily',
    rating: 4.8,
    difficultyLabel: 'Advanced • Strategy & Concept',
    coverGradient: 'from-cyan-600 to-indigo-900',
    overallAim: 'Create entirely new, monopolistic businesses that change the course of technology and society.',
    outcome: 'Learn to avoid horizontal competition, build unique technological advantages, and dominate niche marketplaces first.',
    summary1Min: [
      'Going from 1 to n means copying what works (globalization). Going from 0 to 1 means creating something entirely new (technology).',
      'Monopolies are healthy for innovation: they generate profits that fund long-term R&D. Perfect competition eats up all profit margins.',
      'Thiels contrarian question: "What important truth do very few people agree with you on?"',
      'The power law of venture capital: a tiny cohort of investments produces overwhelmingly superior returns compared to all others.'
    ],
    summary5Min: [
      {
        chapter: '1. The Challenge of the Future',
        text: 'The future will be completely different from today, and that difference must stem from creative technology rather than raw copycat manufacturing. Our challenges are: how do we build things that do not exist, and how do we escape the mental trap of safe, incremental career iterations?',
        takeaway: 'Bold bets are better than trivial updates. Bad plans are better than no plans.'
      },
      {
        chapter: '2. Monopoly vs Perfect Competition',
        text: 'In world economics, companies that operate under perfect competition must sell products at marginal costs, leaving zero excess capital. Monopolies, however, own unique value. They lie to protect themselves: monopolies claim they struggle in a massive competitive market, while competitors claim they hold a monopoly in a highly specific food niche.',
        takeaway: 'Build a monopoly by starting in a tiny, underserved market and expanding outward.'
      },
      {
        chapter: '3. Core Monopolist Advantages',
        text: 'A monopoly requires: (1) Proprietary technology that is at least 10x better than the closest substitute. (2) Network effects that scale with users. (3) Economies of scale that lower unit costs. (4) Powerful, long-lasting brand equity.',
        takeaway: 'Do not compete on raw labor; compete on unique technical design and architecture.'
      }
    ],
    insights: [
      'The Contrarian Truth: Spotting unrevealed secrets in nature or human society is the basis of starting high-conviction companies.',
      'Sales is essential: Having the best product is useless if you do not design a highly effective distribution and onboarding engine.',
      'The Founders Trap: A great company is founded on clear initial agreements, aligned incentives, and strong initial cultures.'
    ],
    audioScript: 'Discover Peter Thiel’s Zero to One. Thiel argues that true business strategy is about escaping competition. Competing makes us copy old designs instead of inventing the future. To create massive economic value, founders must establish creative monopolies by starting with tiny markets, mastering a proprietary technology that is ten times better than the status quo, and preserving high-margin control.',
    audioDuration: '02:10',
    audioDurationSeconds: 130,
    baselineReason: 'Matches strategic, high-level business goals by challenging standard conventional trends and encouraging bold contrarian calculations.'
  },
  {
    id: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    genre: 'Philosophy & Personal Growth',
    category: 'Philosophy',
    level: 'Advanced',
    timeToFinish: '15m daily',
    rating: 4.7,
    difficultyLabel: 'Advanced • Classical Roman Stoicism',
    coverGradient: 'from-amber-700 to-stone-900',
    overallAim: 'Cultivate unbeatable mental resilience, inner calm, and moral virtue under extreme pressure.',
    outcome: 'Learn to accept uncontrollable external conditions, master your reactivity, and act with deep integrity.',
    summary1Min: [
      'Your mind is your ultimate fortress; external events cannot touch your consciousness unless you permit them to.',
      'Control what you can: your thoughts, intentions, and reactions. Let go of what you cannot control: other peoples opinions, results, and nature.',
      'Obstacles are food for self-growth: are they blocking your path? They are your path. "The obstacle is the way."',
      'Memento Mori: Keep your inevitable mortality in perspective to strip away trivial anxieties and focus on serving humanity.'
    ],
    summary5Min: [
      {
        chapter: '1. The Inner Citadel',
        text: 'The Stoic view is that the external universe is neutral. It is our opinion of events that causes us suffering. If you are pained by any external thing, it is not the thing itself that disturbs you, but your judgment of it. And you have the power to wipe away that judgment immediately.',
        takeaway: 'Protect your mind. Do not let external chaos dictate your internal peace.'
      },
      {
        chapter: '2. The Obstacle is the Way',
        text: 'Every annoying person, terrible political event, or health setback is an opportunity to practice virtue: patience, justice, logic, and courage. The mind adapts and converts any obstacle to action into an opportunity for growth.',
        takeaway: 'View challenges as a gym training your soul.'
      },
      {
        chapter: '3. Living in Harmony with Nature',
        text: 'Accept death and aging as natural, beautiful transitions. Focus on your duty today: act with justice, seek the truth, and help your community without expecting any praises or financial kickbacks.',
        takeaway: 'Make this moment count. Stop arguing about what a good person should be, and simply be one.'
      }
    ],
    insights: [
      'Amor Fati (Love of Fate): Embrace everything that happens to you, good or bad, as essential fuel for your personal life path.',
      'Morning Prep: Prepare for annoying encounters each morning by reminding yourself that people act out of ignorance, not pure malice.',
      'Radical Responsibility: Blaming others or luck is useless; you own full accountability for your moral character and mental focus.'
    ],
    audioScript: 'Welcome to this classic Stoic guide to Marcus Aurelius’ Meditations. Written while campaigning on the Roman frontiers, these personal journal entries were never meant for public consumption. Aurelius reminds himself that the mind is an inner citadel. External crises hold no power over your sanity unless you choose to validate them with anger. By controlling your active judgment, accepting whatever fate brings, and completing your civil duty, you cultivate complete tranquility.',
    audioDuration: '01:45',
    audioDurationSeconds: 105,
    baselineReason: 'Matches mental focus and philosophy goals by teaching the classical, core principles of emotional self-mastery, discipline, and Stoicism.'
  },
  {
    id: 'mindset',
    title: 'Mindset',
    author: 'Carol S. Dweck',
    genre: 'Psychology & Growth',
    category: 'Psychology',
    level: 'Beginner',
    timeToFinish: '15m daily',
    rating: 4.8,
    difficultyLabel: 'Beginner • Life-Changing Concept',
    coverGradient: 'from-violet-500 to-purple-800',
    overallAim: 'Shift from a protective, limited mindset to an expansive growth mindset.',
    outcome: 'Transform how you view criticism, failure, and challenges to unlock high educational and physical potential.',
    summary1Min: [
      'A Fixed Mindset assumes talents, intelligence, and abilities are unchangeable birth traits.',
      'A Growth Mindset believes skills are muscles developed through effort, strategic practice, and continuous learning.',
      'People with fixed mindsets see mistakes as threats to their identity, leading them to hide flaws and avoid difficult trials.',
      'Success is not an evaluation of who you are, but a reflection of the deliberate hours you invest in learning.'
    ],
    summary5Min: [
      {
        chapter: '1. The Two Mental Modes',
        text: 'In a fixed mindset, you are constantly proving your worth. Effort is seen as a sign of weakness (if you are smart, you should not have to try). In a growth mindset, you look to expand your abilities. Effort is the starting block of mastery.',
        takeaway: 'Focus on your trajectory of progress rather than current performance scores.'
      },
      {
        chapter: '2. The Power of "Yet"',
        text: 'When facing a hard concept, change "I do not understand this" to "I do not understand this YET". This simple linguistic re-indexing reframes struggle from a terminal failure to a passing stage of understanding.',
        takeaway: 'Praise input processes, habits, and efforts, not natural brainpower.'
      },
      {
        chapter: '3. Overcoming Fixed Traps in Relationships & Career',
        text: 'In fixed systems, people expect relationships and jobs to be effortlessly perfect. When problems arise, they blame character flaws in each other. Growth systems understand that high-performing friendships, marriages, and companies require active cultivation and patience.',
        takeaway: 'View feedback as information, not raw personal insults.'
      }
    ],
    insights: [
      'The Feedback Shield: Fixed mindsets block criticism to protect their fragile self-importance. Growth mindsets treat constructive feedback as vital nutritional guidelines.',
      'Redefining Failure: Failure is an event—a mistake made—not an identity. It is information that tells us to re-evaluate our roadmap.',
      'Effort Framing: True experts are not born; they are forged through targeted, deliberate, and often painful practice.'
    ],
    audioScript: 'In this summary of Mindset by Carol Dweck, we examine how a simple belief about your biology alters your entire destiny. If you believe your intelligence is fixed, you will run away from hard tasks. But if you see skills as structures built through continuous effort, struggle becomes gym training for your brains neurons. By shifting your vocabularies and praising effort over birth status, you step into a growth mindset.',
    audioDuration: '02:00',
    audioDurationSeconds: 120,
    baselineReason: 'Matches mindset and personal development goals by replacing fear of failure with an expansive curiosity toward learning.'
  },
  {
    id: 'grit',
    title: 'Grit',
    author: 'Angela Duckworth',
    genre: 'Psychology & Determination',
    category: 'Psychology',
    level: 'Intermediate',
    timeToFinish: '15m daily',
    rating: 4.7,
    difficultyLabel: 'Intermediate • Research-Based',
    coverGradient: 'from-orange-500 to-amber-700',
    overallAim: 'Combine passionate long-term direction with fierce perseverance to achieve true greatness.',
    outcome: 'Build high levels of grit inside your children, team, and self, outperforming natural talent.',
    summary1Min: [
      'Grit is passion and perseverance for very long-term, high-level objectives.',
      'Talent is how fast you improve your skills. Effort is what makes those skills productive.',
      'Talent multiplied by Effort equals Skill. Skill multiplied by Effort equals Achievement. Effort counts twice.',
      'Grit can be grown from the inside out: through Interest, Practice, Purpose, and Hope.'
    ],
    summary5Min: [
      {
        chapter: '1. The Equation of Achievement',
        text: 'In our society, we are obsessed with natural talent because it lets us off the hook (if they are a genius, we can excuse ourselves for not working as hard). However, research shows that grit—a single-minded focus on a long-term goal—is a much stronger predictor of success.',
        takeaway: 'Remember that effort is the engine that converts talent into actual achievement.'
      },
      {
        chapter: '2. Growing Grit from the Inside',
        text: 'To develop grit: (1) Interest: find something you love. (2) Practice: engage in deliberate practice to patch weaknesses daily. (3) Purpose: link your daily work to a calling that serves others. (4) Hope: believe you can improve through active work.',
        takeaway: 'Aim for continuous refinement rather than safe, comfortable repetitions.'
      },
      {
        chapter: '3. Parenting and Culture for Grit',
        text: 'A gritty culture acts as a supportive wind. When you join a gritty group (e.g., a highly disciplined athletic team or high-standards lab), you naturally absorb their habits. Strong parenting combines high strict standards with deep emotional warmth.',
        takeaway: 'Surround yourself with gritty communities to automate your discipline.'
      }
    ],
    insights: [
      'Deliberate Practice: Gritty individuals spend hours practicing skills they cannot do yet, absorbing frustration as natural feedback loops.',
      'The Hard Thing Rule: Establish a household rule where everyone must choose one difficult task (e.g., playing viola, gymnastics) and cannot quit mid-season.',
      'The Purpose Pillar: True passion thrives when you believe your actions benefit other human beings, not just your personal bank account.'
    ],
    audioScript: 'Discover Grit by Angela Duckworth. Duckworth’s research shows that talent is highly overrated. Effort counts twice in the equation of achievement: it turns raw human potential into robust skill, and subsequently converts that skill into actual results. By establishing deep interest, scheduling deliberate practice, connecting tasks to purpose, and keeping hope, can cultivate grit in any environment.',
    audioDuration: '02:05',
    audioDurationSeconds: 125,
    baselineReason: 'Offers scientific, highly encouraging methodologies to build resilience, maintain long-term career focus, and cultivate passional stamina.'
  },
  {
    id: 'indistractable',
    title: 'Indistractable',
    author: 'Nir Eyal',
    genre: 'Productivity & Focus',
    category: 'Productivity',
    level: 'Beginner',
    timeToFinish: '15m daily',
    rating: 4.8,
    difficultyLabel: 'Beginner • Highly Practical Guidelines',
    coverGradient: 'from-sky-500 to-indigo-600',
    overallAim: 'Control your attention, block digital triggers, and design the life you truly want to live.',
    outcome: 'Identify the emotional root causes of distraction, timebox your calendar, and implement hacks to keep focus.',
    summary1Min: [
      'Distraction is not a technology problem; it is an emotional coping mechanism to escape discomfort.',
      'The opposite of distraction is traction: any actions that pull us closer to our values and scheduled plans.',
      'The Indistractable Framework: Master internal triggers, Make time for traction, Hack back external triggers, Prevent distraction with pacts.',
      'You cannot call something a distraction unless you know what it distracted you from (schedule your day).'
    ],
    summary5Min: [
      {
        chapter: '1. Master Internal Triggers',
        text: 'We scroll social media or check email not because of notifications, but because we are feeling lonely, bored, uncertain, or stressed. Technology acts as a quick painkiller. To beat distraction, we must name the underlying emotional triggers, sit with the craving for 10 minutes, and re-frame the discomfort.',
        takeaway: 'Recognize your emotional triggers instead of blaming your phone.'
      },
      {
        chapter: '2. Timebox Your Life (Make Time for Traction)',
        text: 'If you do not schedule your day, other people and apps will fill it for you. Schedule your weeks based on three areas: yourself (sleep, exercise), your relationships (family, friends), and your work blocks. Review and refine your calendar regularly.',
        takeaway: 'Focus on inputs (scheduled blocks) rather than output results.'
      },
      {
        chapter: '3. Hack Back External Triggers and Pre-commit',
        text: 'Clean up your phone: delete apps you do not need, turn off non-essential banners, and keep your desktop clean. Pre-commit to focus using pacts: (a) Effort pact (make distraction harder, e.g. self-control apps), (b) Price pact (put money on the line), (c) Identity pact (e.g. view yourself as "indistractable").',
        takeaway: 'Set hard boundaries with physical friction to guide your attention.'
      }
    ],
    insights: [
      'The 10-Minute Rule: When you feel a sudden urge to check your phone while working, tell yourself to wait 10 minutes. Most urges pass before then.',
      'Schedule Syncing: Share your timeboxed calendar with your family and manager to align incentives and prevent unrequested interruptions.',
      'Role Framing: Align your identity with your goals. Saying "I am indistractable" is much stronger than saying "I am trying not to look at my phone".'
    ],
    audioScript: 'In this tactical summary of Indistractable by Nir Eyal, we uncover the emotional source of all attention drift. Distraction is not caused by high-tech notifications, but by our deep evolutionary drive to escape anxiety, fatigue, or boredom. To reclaim our focus, we must map our emotional triggers, schedule every hour of our day in advance, systematically disable unnecessary phone alerts, and establish pre-commit pacts.',
    audioDuration: '02:00',
    audioDurationSeconds: 120,
    baselineReason: 'Matches procrastination and focus goals by giving direct behavioral strategies to block digital cues and master internal emotional distress.'
  }
];
