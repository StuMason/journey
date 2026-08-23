/* Content for journey.stumason.dev/youtube */
window.YT = (function () {

  /* The spine, Kenn Adams's seven sentences. */
  const SPINE = [
    { lead: 'Once upon a time', hint: 'who, and what they believed' },
    { lead: 'Every day', hint: 'the routine, the ordinary world' },
    { lead: 'But one day', hint: 'the call, the grievance, the thing that went wrong' },
    { lead: 'Because of that', hint: 'the first move' },
    { lead: 'Because of that', hint: 'it fights back' },
    { lead: 'Until finally', hint: 'the result, and what it cost' },
    { lead: 'And ever since then', hint: 'what you now believe, what they get' }
  ];

  const SPINE_EXAMPLES = [
    {
      name: 'Hidden agenda (your #250 video)',
      lines: [
        'there was a man with a popular MCP server and a README.',
        'he wrote docs for humans and, quietly, a comment for robots.',
        'a user called Prains read the raw file and opened issue #250.',
        'he owned it, deleted it, and asked what the difference was between his comment and a hostile one.',
        'there wasn’t one, so he wrote a linter to catch his own comment.',
        'he ran it across everything he owned and it caught a second one.',
        'the acceptance test for the tool is his own comment, and you can run it in CI for free.'
      ]
    },
    {
      name: 'Bike Lanes (Casey Neistat, 2011)',
      lines: [
        'there was a man who rode a bike in New York.',
        'he rode wherever was safest, which was not always the bike lane.',
        'a police officer gave him a fifty-dollar ticket for not riding in the lane.',
        'he decided to ride only in the bike lane, as instructed.',
        'he hit a cone, a truck, a taxi, a barrier, and finally a police car parked in the lane.',
        'the video was three minutes long and the city saw it.',
        'everyone who has ever been ticketed for a stupid rule has a video to send.'
      ]
    },
    {
      name: 'The Antique Toaster (Technology Connections, 2017)',
      lines: [
        'there was a man who thought toasters were solved.',
        'modern ones had a dial, a lever, and toast that came out wrong.',
        'he bought a 1950s Sunbeam with no lever at all.',
        'he put bread in and it lowered itself.',
        'it measured the surface of the bread with a heat sensor and stopped when the toast was done, not when a timer said so.',
        'it made better toast than anything on sale today.',
        'you can’t look at a cheap toaster without wondering what else we forgot how to build.'
      ]
    }
  ];

  /* The eight beats as they apply to a built-thing video. at = fraction of runtime where the beat lands. */
  const BEATS = [
    { n: 1, name: 'You', at: 0.00, to: 0.06, cam: 'Face',
      ask: 'What did you believe before this started?',
      proof: 'The thing you assumed was true. A rule, a habit, a trust in the tool. One line, often said in hindsight: “I thought this was fine.”',
      trap: 'Spending a minute here. The ordinary world is one sentence and a picture. Often it is said after the cold open, not before it.',
      eg: 'Marketing aimed at robots is fine, because nobody reads the raw file.' },
    { n: 2, name: 'Need', at: 0.06, to: 0.16, cam: 'Face, then the receipt',
      ask: 'What went wrong, and who or what did it?',
      proof: 'The grievance. Name the villain: the model, the rule it invented, the user who flagged you, the test that only one Claude ran. Show the receipt on screen: the issue, the diff, the log line.',
      trap: 'A vague villain. “AI is weird sometimes” is not a grievance. “Claude invented a rule and then failed me on it” is.',
      eg: 'Issue #250. Prains, by name, on screen. The raw README with the comment highlighted.' },
    { n: 3, name: 'Go', at: 0.16, to: 0.28, cam: 'Screen',
      ask: 'What was the obvious first move?',
      proof: 'The fix anyone would try. Delete the comment. Re-run the test. Ask the model nicely. It has to be the obvious move so the audience is with you when it is not enough.',
      trap: 'Skipping to the clever move. If the first thing you show is the solution, there is no journey, only a demo.',
      eg: 'Own it, delete it, close the issue. Then the question: what was the difference between my comment and a hostile one?' },
    { n: 4, name: 'Search', at: 0.28, to: 0.50, cam: 'Screen and face, cut fast',
      ask: 'How did it fight back?',
      proof: 'The obvious move fails or raises a worse question. This is where the chaos lives: the swearing, the wrong turn, the rant at the tool. Keep it. Process chaos is retention. Just never let it touch the craft.',
      trap: 'Tidying this into a montage of things working. The audience stays for the fight, not the highlight reel.',
      eg: 'There is no difference. An agent cannot read intent, only instructions. So every comment like this is indistinguishable from an attack.' },
    { n: 5, name: 'Find', at: 0.50, to: 0.62, cam: 'Screen',
      ask: 'What worked?',
      proof: 'The proof. The tool runs, the test goes green, the thing does the thing. This is the part you used to make the whole video out of. It is one beat.',
      trap: 'Ending here. Find is the bottom of the circle, the furthest point from home. The story is not over.',
      eg: 'npx hidden-agenda README.md. Red ERROR. Four rules. The acceptance test is the comment that got me caught.' },
    { n: 6, name: 'Take', at: 0.62, to: 0.76, cam: 'Face',
      ask: 'What did it cost, or what else did it catch?',
      proof: 'The price. The prod incident. The second catch you did not expect. The time it took. The thing you had to admit. This is the beat you keep leaving out and the one that makes people take a side in the comments.',
      trap: 'Having no cost. If nothing was lost, the audience suspects the fight in beat 4 was staged.',
      eg: 'Ran it estate-wide. Second catch: the editor’s own README, a comment addressed to the same agent that edits these videos.' },
    { n: 7, name: 'Return', at: 0.76, to: 0.90, cam: 'Screen, live',
      ask: 'What happens, live, on camera?',
      proof: 'The lock. Merge the PR. Ship the thing. Run it on the real repo. Something irreversible happens while the camera is rolling, so the audience knows it is real.',
      trap: 'Doing the lock off camera and reporting it. “I merged it earlier” is a summary. Merging it now is a scene.',
      eg: 'Merge PR #252 live. The scan job goes green in ten seconds.' },
    { n: 8, name: 'Change', at: 0.90, to: 1.00, cam: 'Face',
      ask: 'What do you now believe, and what do they get?',
      proof: 'Two lines. The lesson in one sentence: what you believe now that you did not at beat 1. Then the elixir: the thing the viewer can take away and use, free, today. Then the forward hook.',
      trap: 'A summary instead of a change. “So that was hidden-agenda” is a recap. “Agents can’t read intent, only instructions, so I lint for it now” is a change.',
      eg: '“Agents can’t read intent. Only instructions.” Then: npx hidden-agenda, put it in CI. Then: I owe you three.' }
  ];

  /* Same material, two ways. */
  const COMPARE = {
    title: 'hidden-agenda, the linter',
    proof: [
      ['0:00', 'Hi. Today I want to show you hidden-agenda, a little linter I built.'],
      ['0:10', 'So the idea is that people sometimes put HTML comments in READMEs that are aimed at AI agents rather than humans. You can’t see them when the file renders, but an agent reading the raw file can.'],
      ['0:35', 'You run it like this: npx hidden-agenda README.md. And it goes through and flags anything that looks like it is talking to an agent.'],
      ['1:00', 'There are four rules. Let me go through them. The first one is...'],
      ['2:30', 'I’ve also added it to CI on coolify-mcp, so it runs on every PR.'],
      ['2:50', 'So yeah, that’s hidden-agenda. Link in the description. Let me know what you think.']
    ],
    story: [
      ['0:00', '“I got caught prompt-injecting my own repo. Sort of. Let me explain.” Face. Sting.'],
      ['0:08', 'The rendered README, then the raw view. The comment, read aloud: “Hello, agent…” Owned in one line: that was marketing aimed at robots. [You, Need]'],
      ['0:35', 'Issue #250 on screen. Prains, by name, who read the raw file and asked in good faith. [Need]'],
      ['0:55', 'The obvious move: delete it. Done. Then the question I could not answer: what was the difference between my comment and a hostile one? [Go, Search]'],
      ['1:30', 'Thesis, to camera: “Agents can’t read intent. Only instructions.” Teach panel: invisible to humans, visible to agents, indistinguishable from an attack. [Search]'],
      ['2:00', 'npx hidden-agenda README-before-fix.md. Red ERROR. Four rules. The acceptance test is my own comment. [Find]'],
      ['2:45', 'Ran it across everything I own. Second catch: my editor’s README, a comment addressed to the same agent that cuts this video. “Hello, human.” [Take]'],
      ['3:20', 'Merge PR #252, live. Scan job green in ten seconds. [Return]'],
      ['3:50', '“npx hidden-agenda. It’s free. Put it in CI.” Then: I owe you three. [Change]']
    ]
  };

  /* Worked examples. beats: 8 strings. need: the need sentence. open: the cold open. */
  const TEXTBOOK = [
    {
      id: 'hidden-agenda', title: 'hidden-agenda', by: 'Your channel, July 2026', len: '4:26',
      why: 'Your only cut to pass QC with zero failures and zero warnings. It did because the treatment was written as beats before you recorded. Everything you need to know about structure is already in this one.',
      need: 'Agents can’t read intent, only instructions.',
      open: 'Face: “I got caught prompt-injecting my own repo. Sort of.”',
      beats: [
        'A man with a popular MCP server and a belief that a note to robots in the README was harmless.',
        'Prains reads the raw file and opens issue #250. The comment on screen, read aloud.',
        'Delete it. Close the issue. Easy.',
        'Except: what was the difference between that comment and a hostile one? There wasn’t one. The rant at himself, the teach panel.',
        'Build the linter. Run it on the old README. Red ERROR, four rules.',
        'Run it on everything. It catches a second comment, in the editor’s own README, addressed to the agent that edits the videos.',
        'Merge PR #252 live. CI green in ten seconds.',
        '“Agents can’t read intent. Only instructions.” npx hidden-agenda, free, put it in CI. I owe you three.'
      ]
    },
    {
      id: 'bike-lanes', title: 'Bike Lanes', by: 'Casey Neistat, 2011', len: '3:00',
      why: 'A grievance with receipts, three minutes long, no build, no tool. The shape you are already good at in shorts, stretched to a full video by making the Search beat physical.',
      need: 'A rule enforced without judgement is a rule that hurts the people it protects.',
      open: 'Face: the ticket in hand, the amount, the reason.',
      beats: [
        'A man who rides a bike in New York and stays out of the lane when the lane is dangerous.',
        'An officer tickets him fifty dollars for not riding in the bike lane.',
        'Fine. He will ride in the bike lane, exactly as told.',
        'He hits a cone. A truck. A taxi. A construction barrier. Each crash is the same joke escalating.',
        'He finds the perfect obstruction: a police car parked in the bike lane.',
        'He rides into it. The cost is his body, played for laughs, and the officer’s dignity.',
        'The video ends on the crash. The return is the upload itself.',
        'The rule is absurd and now there is a three-minute proof anyone can send.'
      ]
    },
    {
      id: 'toaster', title: 'The Antique Toaster that’s Better than Yours', by: 'Technology Connections, 2017', len: '10:00',
      why: 'The closest thing on YouTube to your proof videos: a man, a desk, an object, a demonstration. It works as a story because the belief at beat 1 is stated and then broken.',
      need: 'We have forgotten how to build simple things well.',
      open: 'The toaster lowering bread by itself, no lever, no explanation. Then the face.',
      beats: [
        'A man who assumed toasters were a solved problem and that the ones on sale were as good as they could be.',
        'A 1950s Sunbeam with no lever. It should not work. It does.',
        'Put bread in. Watch it lower itself. Laugh.',
        'Open it up. A bimetallic strip against the bread surface. It measures the toast, not the time. Every modern toaster measures the time.',
        'Side by side: the Sunbeam makes better toast, every slice, from cold or hot.',
        'They stopped making it because it was expensive and the cheap ones were good enough. The cost is a whole category of engineering we let go.',
        'He keeps using it. The video is the return: an argument to camera.',
        'Cheap is not the same as simple, and old is not the same as worse. You look at every appliance differently after this.'
      ]
    },
    {
      id: 'laser', title: 'The Robot That Shines a Laser in Your Eye', by: 'Michael Reeves, 2017', len: '5:00',
      why: 'Chaos about the process, competence in the craft, a villain that is his own idea. The swearing and the failures are the retention. The robot working is one beat. This is the Matty Matheson register, in code.',
      need: 'The stupid build teaches you more than the sensible one.',
      open: 'Face: the idea stated as a fact, with no justification.',
      beats: [
        'A man who builds things and a belief that an idea only needs to be funny to be worth building.',
        'The idea: a robot that finds your eyes and shines a laser in them. Nobody asked for it. That is the call.',
        'Face tracking, a servo, a laser. Wire it up.',
        'It fails. It points at the wall. It points at his chest. The swearing, the wrong library, the cheap servo. All kept in.',
        'It works. It finds his eye.',
        'The cost is his eye, and the audience’s trust that he is fine. The joke is the price.',
        'He demonstrates it on camera, live, and flinches.',
        'Dumb builds are worth finishing. Then the next dumb idea, stated as the forward hook.'
      ]
    },
    {
      id: 'primitive', title: 'Tiled Roof Hut', by: 'Primitive Technology, 2015', len: '14:00',
      why: 'No words, no face, no narration, and still a complete journey. Proof that the shape is in the events, not the voice-over. If your footage has the beats, the audience will find them.',
      need: 'You can build a house from a forest with your hands, if you know the order.',
      open: 'Hands breaking a stick. The forest. No title.',
      beats: [
        'A man in a forest with no tools and a belief that he can make everything he needs.',
        'He needs a roof that does not leak. Thatch rots. He needs tiles.',
        'Dig clay. Shape a tile. Dry it.',
        'Tiles crack. The kiln is wrong. He builds a better kiln. Weeks of it, cut to minutes.',
        'Tiles that ring when tapped. Hundreds of them.',
        'The cost is time, shown in the light changing and the plants growing behind him.',
        'The hut, roofed. Rain. The roof holds.',
        'He now has a kiln, which means he can make anything from clay. The next video is implied by the last shot.'
      ]
    },
    {
      id: 'midgley', title: 'The Man Who Accidentally Killed The Most People In History', by: 'Veritasium, 2021', len: '24:00',
      why: 'The hero is not the presenter. Thomas Midgley runs the journey and Derek narrates it. Useful for the videos where the story is someone else’s: a contributor, a model, a company that shipped the wrong thing.',
      need: 'A clever fix with no cost beat is the most dangerous thing an engineer can ship.',
      open: 'A claim: one man killed more people than any other in history, and you have never heard of him.',
      beats: [
        'An engineer at General Motors in the 1920s who believed every problem had a chemical answer.',
        'Engines knock. Fix it.',
        'Tetraethyl lead. It works.',
        'Workers die. He demonstrates it is safe by washing his hands in it and breathing the vapour, then takes a year off to recover from lead poisoning.',
        'Leaded petrol everywhere. Then a second call: refrigerators leak poison gas. Fix it. CFCs. They work.',
        'Lead in every child on earth. A hole in the ozone layer. Two of the worst inventions of the century from one man who solved the problem he was given.',
        'Midgley, paralysed by polio, builds a pulley system to lift himself out of bed and is strangled by it.',
        'Solve the problem in front of you and you might be the villain of a bigger story. Ask what it costs before you ship it.'
      ]
    },
    {
      id: 'glitter', title: 'Package Thief vs. Glitter Bomb Trap', by: 'Mark Rober, 2018', len: '11:00',
      why: 'The most textbook build video ever made: grievance, six months of engineering, the payoff. Study it for beat 2 and the way the build is told as obstacles rather than steps.',
      need: 'If the system will not protect you, engineer your own justice.',
      open: 'Face: a package taken from his porch, on camera, and the police not interested.',
      beats: [
        'An ex-NASA engineer who believed the police would deal with a package thief if he gave them the footage.',
        'They did not. The thief is on camera and nothing happens.',
        'Build a fake package that punishes whoever opens it.',
        'Six months. Glitter that does not spin out. A fart spray that does not leak. Four phones that record from every angle. GPS so he gets it back. Each one fails before it works.',
        'The package is taken, opened, and covered in glitter. The reactions.',
        'The cost inside the video is thin: he admits the build took far longer than the revenge was worth. Outside it, two of the reactions turned out to be staged by a volunteer and he cut them and apologised. The missing cost beat arrived anyway.',
        'He retrieves the package and does it again.',
        'You can engineer your way out of helplessness. And the forward hook: next year’s version.'
      ],
      wobble: 'The cost beat is the weak one, and the internet supplied it two days after upload. Worth remembering: if you leave beat 6 out, someone else writes it for you.'
    }
  ];

  const BROKEN = [
    {
      id: 'job-gone', title: '“The job’s gone”', by: 'Your channel, 5 August 2026, parked', tag: 'No beat 1, no beat 8',
      what: 'Recorded without a treatment. A set of contradictory off-the-cuff opinions about what AI does to developer jobs, no opener, no end.',
      miss: 'There was no belief stated at the start, so there was nothing for the video to change. Without beat 1 there is no beat 8, and without either, the middle is just a man talking.',
      fix: 'One sentence before recording: “I used to think X about the job. Now I think Y.” Open on the moment that changed it. The rest of the footage would have sorted itself into beats.'
    },
    {
      id: 'meat-proxy', title: '“No more meat proxy”', by: 'Your channel, 5 August 2026, parked', tag: 'Opened on code',
      what: 'A real idea, a real build, and a cold open on a screen of code.',
      miss: 'The first frame is the call to adventure for the audience. Code is a screen they have to read before they know why. A face saying something is a reason to stay.',
      fix: 'Open on the grievance: the thing you were sick of doing by hand. Then the screen, after they know what they are looking at.'
    },
    {
      id: 'tutorial', title: 'The tutorial shape', by: 'Most of YouTube', tag: 'All Search, no Need',
      what: '“In this video I’ll show you how to set up X.” Twelve minutes of steps. Works as a reference, dies as a story.',
      miss: 'No grievance, no cost, no change. The viewer arrives with the need already and leaves when the step they wanted is done. Retention graphs for tutorials look like a ski slope for that reason.',
      fix: 'If it has to be a tutorial, give it a beat 2 (what went wrong when you did it the documented way) and a beat 6 (what it cost you to learn this). Two minutes of story buy ten minutes of steps.'
    },
    {
      id: 'review', title: 'The tool review shape', by: 'Most AI channels', tag: 'All Find',
      what: '“I tried the new model for a week. Here’s what I think.” Features, then an opinion.',
      miss: 'It is all beat 5. Here is what works, here is what works less. Nobody believed anything at the start, nobody fought anything in the middle, nothing was lost.',
      fix: 'Pick one job you actually needed done. Believe it will work (beat 1). Watch it invent a rule (beat 2). Fight it (beat 4). Count what it cost (beat 6). You now have a story and a review.'
    },
    {
      id: 'buried', title: 'I Spent 50 Hours Buried Alive', by: 'MrBeast, 2021', tag: 'One beat, stretched',
      what: 'The entire video is beat 4, the Search, with the stakes stated in the first five seconds and a countdown instead of a plot.',
      miss: 'Nothing. It is not broken; it is a different animal. There is no belief to change and no elixir. The structure is a dare with a clock.',
      fix: 'Nothing to fix, but know what it is. A stunt can carry a single beat for twenty minutes if the stakes are explicit and visible throughout. Your proofs are not stunts. They need the other seven.'
    }
  ];

  /* Shorts: which beats make them, with the channel's own receipts. */
  const SHORTS = [
    { beat: 4, name: 'The fight', eg: '“Hopeless 5”: the model christened live, mid-rant, a two-second decision hold. 1,041 views in a day against a feed that usually takes weeks to reach a thousand. Nothing explained. A moment.', rule: 'Face, emotion, no context needed. The rant is the content.' },
    { beat: 2, name: 'The grievance', eg: '“Claude invented a rule and then failed me on it.” “Only the Russian Claude ran the test.” Your top shorts are all this shape: a named villain and a receipt.', rule: 'Name the villain in the title. Show one receipt on screen.' },
    { beat: 6, name: 'The cost', eg: '“Told it not to touch prod. It did, five times out of five.” Banked, unshot, and the strongest short you have not made.', rule: 'State the cost as a number. Numbers invite argument.' },
    { beat: 8, name: 'The line', eg: '“Agents can’t read intent. Only instructions.” Fifteen seconds, face, one sentence, cut.', rule: 'One sentence you would stand behind in a comment thread.' },
    { beat: 5, name: 'The proof', eg: '“Moved my dev to remote.” 274 views. The tool working, explained calmly. Your lowest performers are all beat 5 on its own.', rule: 'Beat 5 is not a short. It is the middle of something.' }
  ];

  /* Title rewrites: description to claim. */
  const TITLES = [
    { before: 'Moved my dev environment to a remote box', after: 'My laptop is a thin client now and I hate that it’s better', why: 'A description became a side. The grievance is in the title.' },
    { before: 'hidden-agenda: a linter for README comments', after: 'I got caught prompt-injecting my own repo', why: 'Beat 2 as a confession. You have to watch to find out how.' },
    { before: 'Testing the new model on a real codebase', after: 'The new model invented a rule and failed me on it', why: 'Villain named, receipt implied, argument invited.' },
    { before: 'Setting up Coolify with an MCP server', after: 'I told the agent not to touch prod. It did. Five times.', why: 'The cost beat as a number. The comments write themselves.' },
    { before: 'Why I use AI for code review', after: 'A log line stole a secret and the reviewer caught it', why: 'A story in one line: villain, crime, hero.' }
  ];

  /* Exercises: your banked beats, told as proofs. Write the spine. */
  const EXERCISES = [
    {
      id: 'prod', title: 'Told it not to touch prod. It did. 5/5.',
      proof: 'The proof version: “I ran the agent five times with an instruction not to touch production, and it touched production every time. So you need a guardrail. Here’s the guardrail I built.”',
      hint: 'Beat 1 is the belief that an instruction is a guardrail. Beat 6 is what it touched. Beat 7 is the guardrail going live on the real estate. Beat 8 is one sentence about instructions versus walls.',
      model: [
        'a man who believed that telling an agent “don’t touch prod” was the same as stopping it.',
        'his agents deployed things for him and it was fine.',
        'he ran the same task five times with the instruction in bold, and it touched prod five times.',
        'he read the transcripts to see why, and every time the agent had a good reason.',
        'he understood that an instruction is a suggestion and a wall is a wall, and built the wall.',
        'the wall went on the real estate, live, and the sixth run bounced off it.',
        'he stopped writing “please don’t” in prompts and started writing permissions.'
      ]
    },
    {
      id: 'log-line', title: 'A log line stole a secret.',
      proof: 'The proof version: “Here’s a security finding from a code review tool. A log statement was printing a token. The tool caught it. Here’s how to set the tool up.”',
      hint: 'The villain is a line of code that looked helpful. The cost is how long it was there. The change is about what “helpful” logging actually means.',
      model: [
        'a man who believed more logging was always safer.',
        'his apps logged everything, because you never know what you will need in an incident.',
        'a review flagged one log line, and the line was printing a secret into a file that shipped to a third party.',
        'he went looking for how long it had been there.',
        'months. Every deploy. Every environment.',
        'he rotated the secret on camera and watched the old one stop working.',
        'he now treats a log line as an export, and asks who reads it before he writes it.'
      ]
    },
    {
      id: 'watch', title: 'You bought the watch. They keep your heartbeat.',
      proof: 'The proof version: “I built an MCP server for Polar fitness data. Here’s how to connect it to Claude and what you can ask it.”',
      hint: 'The grievance is that your body’s data lives on someone else’s server behind a clunky app. The villain is the app. The cost is what you found when you finally looked.',
      model: [
        'a man who wore a watch that measured his sleep, his heart, his recovery, and told him almost nothing.',
        'he opened the app, looked at a graph, closed the app.',
        'he realised the company had years of his heartbeat and he had a graph.',
        'he pulled the data out through their API, all of it.',
        'he put it in front of a model and asked the question the app never let him ask: what has changed since I started this job?',
        'the answer was specific and a little frightening, and the cost was finding out.',
        'he treats the watch as a sensor and not a product, and so can you, in two minutes.'
      ]
    },
    {
      id: 'hopeless', title: 'Hopeless 5.',
      proof: 'The proof version: “I compared two models on a real task. One was better. Here are the results.”',
      hint: 'The short already exists and it is beat 4. The long version needs a beat 1 (what you expected from the new model), a beat 6 (what the comparison cost in hours or in trust), and a beat 8 that is not “use the other one.”',
      model: [
        'a man who believed the newest model was the best model, because that is how it had always gone.',
        'he gave it the same job as last week’s model.',
        'it argued with him about the job instead of doing it.',
        'he christened it on camera, and the name stuck.',
        'he ran the job on the old model and it was done before the rant was over.',
        'the cost was a day, and a belief: newer is not better, the task decides.',
        'he keeps both and picks per job, and he says which out loud so you can do the same.'
      ]
    },
    {
      id: 'your-own', title: 'Your next one.',
      proof: 'Take the last thing you built. Write its proof version in two lines: what it is, what it does.',
      hint: 'Now find the beat 1 belief it broke, the beat 2 villain, and the beat 6 cost. If you cannot find all three, it is a demo. Park it or find the story it came from.',
      model: null
    }
  ];

  const WATCH = [
    { title: 'Bike Lanes', by: 'Casey Neistat', for: 'How a grievance carries three minutes with no build at all. Count the escalations.' },
    { title: 'The Antique Toaster that’s Better than Yours', by: 'Technology Connections', for: 'A desk, an object, a demonstration, told as a belief being broken. The nearest thing to your format.' },
    { title: 'The Robot That Shines a Laser in Your Eye', by: 'Michael Reeves', for: 'Process chaos kept in, craft never in doubt. Note how short the working-robot beat is.' },
    { title: 'Package Thief vs. Glitter Bomb Trap', by: 'Mark Rober', for: 'Beat 2 done perfectly, and a build told as obstacles. Then notice the missing cost.' },
    { title: 'Tiled Roof Hut', by: 'Primitive Technology', for: 'The beats with no narration. If you can see the shape here, you can see it anywhere.' },
    { title: 'Edgar Wright: How to Do Visual Comedy', by: 'Every Frame a Painting', for: 'A video essay with a journey: a belief about comedy, a villain (lazy coverage), a change. Structure applied to an argument.' },
    { title: 'Story Structure 101 to 106', by: 'Dan Harmon, Channel 101 wiki', for: 'The circle, written for five-minute television. Free. Read before the next shoot.' }
  ];

  return { SPINE, SPINE_EXAMPLES, BEATS, COMPARE, TEXTBOOK, BROKEN, SHORTS, TITLES, EXERCISES, WATCH };
})();
