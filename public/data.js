/* Content data for journey.stumason.dev. Plain objects, no build step. */
window.JOURNEY = (function () {

  /* ---------- The twelve stages (Vogler) ---------- */
  const STAGES = [
    {
      n: 1, key: 'ordinary', name: 'Ordinary World', slug: 'INT. HOME - DAY', world: 'known',
      what: 'Where the hero lives before anything happens. You meet them in their routine, and you meet the thing that is wrong with them: the fear, the wound, the bad habit, the lie they tell themselves.',
      why: 'Without a before, there is no after. Everything the story changes has to be shown first, or the change means nothing.',
      trap: 'Writers linger here. Twenty pages of a character being ordinary is not set-up, it is stalling. Show the flaw, show the life, move.'
    },
    {
      n: 2, key: 'call', name: 'Call to Adventure', slug: 'A MESSAGE ARRIVES', world: 'known',
      what: 'Something disrupts the routine and demands a response. A letter, a death, a stranger at the door, a body in the river. The problem of the story announces itself.',
      why: 'It sets the stakes and the clock. After the call, staying put costs something.',
      trap: 'A call with no cost. If the hero could ignore it and be fine, it is not a call, it is an invitation.'
    },
    {
      n: 3, key: 'refusal', name: 'Refusal of the Call', slug: 'NOT TODAY', world: 'known',
      what: 'The hero says no, or hesitates, or someone says no for them. Fear, duty, comfort, disbelief. It is usually brief.',
      why: 'The refusal tells you what the hero is afraid of. File that away: the climax will make them face exactly that thing.',
      trap: 'Skipping it. A hero who jumps at the call with no hesitation has nothing to overcome, so the audience has nothing to root for.'
    },
    {
      n: 4, key: 'mentor', name: 'Meeting the Mentor', slug: 'SOMEONE WHO HAS BEEN THERE', world: 'known',
      what: 'Someone gives the hero what they need to begin: advice, a tool, a push, a map, a lightsaber. The mentor can be a person, a memory, a book, or the hero’s own conscience.',
      why: 'The mentor is a preview of who the hero could become. Notice that the mentor usually cannot finish the journey for them. Often they die or leave to make sure of it.',
      trap: 'The mentor who explains the whole plot. Good mentors give one thing and withhold the rest.'
    },
    {
      n: 5, key: 'threshold', name: 'Crossing the Threshold', slug: 'EXT. THE EDGE OF THE MAP', world: 'edge',
      what: 'The hero commits. They leave the known world and enter one with different rules. This is the end of the first act, and there is no clean way back.',
      why: 'Commitment is the hinge. Everything before it is a choice the hero could unmake. Everything after it is consequence.',
      trap: 'A threshold with no change of rules. If the hero crosses and the world works the same way, nothing was crossed. Test it: can you state the old rule and the new rule in one sentence each?'
    },
    {
      n: 6, key: 'tests', name: 'Tests, Allies, Enemies', slug: 'INT. THE NEW WORLD - LEARNING THE RULES', world: 'special',
      what: 'The hero learns how the new world works, usually by getting it wrong. They gather friends, make enemies, and find out who can be trusted.',
      why: 'This is the fun part and the audience knows it. It is also where the team for the climax gets built and the hero’s flaw gets exercised in low-stakes ways.',
      trap: 'Episodes. If the tests could be shuffled with no loss, they are filler. Each one should cost the hero something or teach them something they will need.'
    },
    {
      n: 7, key: 'approach', name: 'Approach to the Inmost Cave', slug: 'THE DOOR TO THE WORST PLACE', world: 'special',
      what: 'The hero heads toward the most dangerous place in the story, the place the thing they fear lives. Plans get made. Nerves show. Often a quiet scene before the storm.',
      why: 'Tension needs a run-up. The approach lets the audience dread what is coming, which is worth more than surprise.',
      trap: 'Rushing it. The Death Star, the trapdoor under Fluffy, the whale: every great ordeal has a corridor before it.'
    },
    {
      n: 8, key: 'ordeal', name: 'The Ordeal', slug: 'INT. THE CAVE - DEATH', world: 'special',
      what: 'The hero faces their greatest fear and appears to die. Sometimes literally, more often the old self dies: the belief, the plan, the mentor, the illusion. This is the middle of the story, not the end.',
      why: 'Stories are about change, and change requires something to end. The ordeal is the end of the person who started the story.',
      trap: 'Confusing it with the climax. The ordeal is the midpoint death. The climax is the resurrection, later. Many stories only manage one of the two, and that is why so many third acts feel flat.'
    },
    {
      n: 9, key: 'reward', name: 'The Reward', slug: 'SEIZING THE SWORD', world: 'special',
      what: 'Having survived, the hero takes what they came for: the object, the knowledge, the person, the reconciliation. A breath. Sometimes a celebration.',
      why: 'The audience needs a moment to feel the win before it gets complicated. And the reward is always less than it looks.',
      trap: 'Treating the reward as the ending. It is bait. The story is about to take it back, or show it was the wrong thing to want.'
    },
    {
      n: 10, key: 'roadback', name: 'The Road Back', slug: 'EXT. RUNNING - NIGHT', world: 'special',
      what: 'The hero turns for home and the world pushes back. A chase, a pursuit, a consequence catching up. The decision to return is itself a choice, and it reopens the stakes.',
      why: 'The middle has to end and the final act has to be earned. The road back converts the reward into a new problem.',
      trap: 'Forgetting the hero has to choose to go back. Most bad third acts are failed returns: the hero drifts home instead of deciding to.'
    },
    {
      n: 11, key: 'resurrection', name: 'The Resurrection', slug: 'THE FINAL TEST', world: 'edge',
      what: 'The climax. One last ordeal, bigger than the first, in which the hero must prove the change is real. If they are the same person they were at the start, they die here. If they have changed, they live.',
      why: 'The first death was private. This one is public and final. It is where the story proves its point.',
      trap: 'A climax that tests strength instead of change. Luke does not win the trench run by flying better. He wins by turning off the targeting computer.'
    },
    {
      n: 12, key: 'return', name: 'Return with the Elixir', slug: 'INT. HOME - CHANGED', world: 'known',
      what: 'The hero comes home carrying something the world needed: a cure, a truth, a freedom, a new way of seeing. The ordinary world is the same place, but they are not the same person, so it looks different.',
      why: 'A journey that benefits nobody but the hero is a holiday. The elixir is what makes it a story worth telling.',
      trap: 'The elixir nobody asked for. If the ending cannot say what was brought back and who needed it, the story is not finished, it has just stopped.'
    }
  ];

  /* ---------- Harmon's eight (the circle) ---------- */
  const CIRCLE = [
    { n: 1, name: 'You', line: 'A character in a zone of comfort.', sw: 'Luke on the farm, staring at the two suns.', note: 'Top of the circle. Order, habit, the known world.' },
    { n: 2, name: 'Need', line: 'But they want something.', sw: 'He wants off Tatooine. Then a message says “help me, Obi-Wan.”', note: 'The want is conscious. The need underneath is usually not.' },
    { n: 3, name: 'Go', line: 'They enter an unfamiliar situation.', sw: 'The farm is ash. He leaves with Obi-Wan.', note: 'Crossing the horizontal line. Down into the unknown.' },
    { n: 4, name: 'Search', line: 'Adapt to it.', sw: 'Mos Eisley, Han, Chewie, the Falcon, the Death Star.', note: 'Trial and error. The character learns the new rules by breaking them.' },
    { n: 5, name: 'Find', line: 'Get what they wanted.', sw: 'Leia rescued. The plans in hand.', note: 'Bottom of the circle. The furthest point from home.' },
    { n: 6, name: 'Take', line: 'Pay a heavy price for it.', sw: 'Obi-Wan dies. Han walks away.', note: 'What the want cost. The ascent begins.' },
    { n: 7, name: 'Return', line: 'Then return to the familiar situation.', sw: 'Back to the rebel base. Back into a cockpit.', note: 'Crossing the line again, upward. Back into order.' },
    { n: 8, name: 'Change', line: 'Having changed.', sw: 'Turns off the computer. Trusts the Force.', note: 'Same world, different person. The proof of the whole loop.' }
  ];

  /* ---------- The systems laid on one timeline (percent of runtime) ---------- */
  const SYSTEMS = {
    acts: {
      name: 'Three acts', note: 'The oldest split. Aristotle saw it; Syd Field (1979) drew it for screenwriters.',
      beats: [
        { at: 0, to: 25, name: 'Act one: set-up' },
        { at: 25, to: 75, name: 'Act two: confrontation' },
        { at: 75, to: 100, name: 'Act three: resolution' }
      ]
    },
    harmon: {
      name: 'Harmon’s circle (8)', note: 'Eight equal slices. Built for 22-minute television, works on anything.',
      beats: CIRCLE.map((c, i) => ({ at: i * 12.5, to: (i + 1) * 12.5, name: c.name }))
    },
    vogler: {
      name: 'Vogler’s stages (12)', note: 'Where the stages usually fall in a feature film. The ordeal sits at the midpoint in practice.',
      beats: [
        { at: 0, to: 10, name: 'Ordinary World' },
        { at: 10, to: 12, name: 'Call' },
        { at: 12, to: 20, name: 'Refusal' },
        { at: 20, to: 25, name: 'Mentor' },
        { at: 25, to: 27, name: 'Threshold' },
        { at: 27, to: 45, name: 'Tests, Allies, Enemies' },
        { at: 45, to: 50, name: 'Approach' },
        { at: 50, to: 57, name: 'Ordeal' },
        { at: 57, to: 65, name: 'Reward' },
        { at: 65, to: 75, name: 'Road Back' },
        { at: 75, to: 95, name: 'Resurrection' },
        { at: 95, to: 100, name: 'Return with Elixir' }
      ]
    },
    snyder: {
      name: 'Save the Cat (15)', note: 'Blake Snyder’s beat sheet, with page numbers for a 110-page script. The percentages are his pages.',
      beats: [
        { at: 0, to: 1, name: 'Opening Image' },
        { at: 4, to: 5, name: 'Theme Stated' },
        { at: 1, to: 10, name: 'Set-Up' },
        { at: 11, to: 12, name: 'Catalyst' },
        { at: 12, to: 23, name: 'Debate' },
        { at: 23, to: 24, name: 'Break into Two' },
        { at: 27, to: 28, name: 'B Story' },
        { at: 28, to: 50, name: 'Fun and Games' },
        { at: 50, to: 51, name: 'Midpoint' },
        { at: 51, to: 68, name: 'Bad Guys Close In' },
        { at: 68, to: 69, name: 'All Is Lost' },
        { at: 69, to: 77, name: 'Dark Night of the Soul' },
        { at: 77, to: 78, name: 'Break into Three' },
        { at: 78, to: 99, name: 'Finale' },
        { at: 99, to: 100, name: 'Final Image' }
      ]
    },
    campbell: {
      name: 'Campbell’s monomyth (17)', note: 'The 1949 original. Three movements, seventeen stages, several of which no film has ever used.',
      beats: [
        { at: 0, to: 6, name: 'Call to Adventure' },
        { at: 6, to: 12, name: 'Refusal of the Call' },
        { at: 12, to: 18, name: 'Supernatural Aid' },
        { at: 18, to: 24, name: 'Crossing the First Threshold' },
        { at: 24, to: 30, name: 'Belly of the Whale' },
        { at: 30, to: 36, name: 'Road of Trials' },
        { at: 36, to: 42, name: 'Meeting with the Goddess' },
        { at: 42, to: 48, name: 'Woman as Temptress' },
        { at: 48, to: 54, name: 'Atonement with the Father' },
        { at: 54, to: 60, name: 'Apotheosis' },
        { at: 60, to: 66, name: 'The Ultimate Boon' },
        { at: 66, to: 72, name: 'Refusal of the Return' },
        { at: 72, to: 78, name: 'The Magic Flight' },
        { at: 78, to: 84, name: 'Rescue from Without' },
        { at: 84, to: 90, name: 'Crossing the Return Threshold' },
        { at: 90, to: 95, name: 'Master of Two Worlds' },
        { at: 95, to: 100, name: 'Freedom to Live' }
      ]
    }
  };

  /* ---------- Textbook breakdowns ----------
     beats: 12 strings in Vogler order. wobble: {index: note} where the fit is imperfect. */
  const TEXTBOOK = [
    {
      id: 'star-wars', title: 'Star Wars', year: 1977, kind: 'film', by: 'George Lucas',
      fit: 'The reference copy. Lucas read Campbell while rewriting the script and said so.',
      beats: [
        'Luke on the moisture farm on Tatooine. Bored, dutiful, staring at the horizon. He wants to leave and is afraid to.',
        'R2-D2 plays a fragment of a message: “Help me, Obi-Wan Kenobi.”',
        '“I can’t get involved. I’ve got work to do.” He means it.',
        'Obi-Wan hands him his father’s lightsaber and tells him about the Force. One gift, most of the truth withheld.',
        'The farm is burned and his aunt and uncle are dead. “I want to learn the ways of the Force.” He goes.',
        'The cantina. Han and Chewbacca hired. Blasting out of Mos Eisley. Learning that the galaxy is bigger and nastier than the farm.',
        'The Falcon is dragged into the Death Star by tractor beam. Stormtrooper disguises, a plan to find Leia.',
        'The trash compactor closes in. Obi-Wan lets Vader strike him down. The boy who left the farm is gone.',
        'Leia, the plans, the escape. Han: “Not a bad bit of rescuing.”',
        'TIE fighters on their tail, and the ship is being tracked. The win is also the trap.',
        'The trench run. He switches off the targeting computer and trusts the Force. The same fear from the farm, faced at speed.',
        'The medal ceremony. The rebellion is alive. Luke has become the person the message was asking for.'
      ],
      wobble: { 10: 'Lucas plays the resurrection straight: Luke only has to survive and trust. The price is paid by others, which is why the ending feels clean rather than earned, and why Empire had to hurt.' }
    },
    {
      id: 'matrix', title: 'The Matrix', year: 1999, kind: 'film', by: 'The Wachowskis',
      fit: 'The journey with the mythology made literal: the mentor hands over a pill, the threshold is a pod, the resurrection is a resurrection.',
      beats: [
        'Thomas Anderson, software company by day, hacker by night, certain something is wrong with the world and unable to say what.',
        '“Follow the white rabbit.” Trinity in the club. Morpheus on the phone in the office.',
        'On the window ledge he will not make the climb. Arrested. Gives the agents nothing but still has not chosen.',
        'Morpheus in the rain-streaked room. The red pill and the blue pill. The mentor offers a choice, not an answer.',
        'He swallows the red pill and wakes in a pod of pink fluid, bald and plugged in. Flushed down the drain. No way back.',
        'Training. “I know kung fu.” Failing the jump programme. Tank, Dozer, Mouse, and Cypher, who is already an enemy.',
        'The visit to the Oracle. “You’re going to have to make a choice, Neo.” She tells him he is not the One.',
        'Cypher’s betrayal. The crew dead. Morpheus captured and about to break. Neo chooses to go back in for him, which is the old self ending.',
        'The lobby, the helicopter, Morpheus pulled through a window. The reward is not Morpheus, it is the crew’s belief.',
        'The race for the hard line. Agent Smith in the subway. Neo stays and fights instead of running.',
        'Shot dead in room 303. Trinity speaks. He stands up, sees the code, stops the bullets.',
        'The phone call to the machines: “I’m going to show these people what you don’t want them to see.” He flies.'
      ],
      wobble: { 8: 'The reward beat is thin on purpose. Rescuing Morpheus is the plot’s prize; the story’s prize, belief, arrives only at the resurrection.' }
    },
    {
      id: 'hp1', title: 'Harry Potter and the Philosopher’s Stone', year: 1997, kind: 'book', by: 'J.K. Rowling',
      fit: 'Every book in the series is one loop: summer at the Dursleys, call, Hogwarts, ordeal under the school, home changed. The series is a larger loop around those.',
      beats: [
        'The cupboard under the stairs. Privet Drive. A boy who does not know who he is, in a house that prefers it that way.',
        'Letters. Hundreds of them, through the letterbox, the chimney, the eggs.',
        'The refusal is the Dursleys’: they flee to a hut on a rock. Harry’s own doubt comes later: “I’m just Harry.”',
        'Hagrid, with a birthday cake and a door off its hinges. “You’re a wizard, Harry.” Diagon Alley, a wand, an owl.',
        'Platform nine and three-quarters. He runs at the barrier.',
        'The Sorting. Ron and Hermione. Malfoy and Snape. Quidditch. The troll in the bathroom, which turns three children into a team.',
        'Nicolas Flamel worked out. Norbert smuggled away. Detention in the Forbidden Forest, where he sees what is drinking unicorn blood.',
        'Through the trapdoor: Fluffy, Devil’s Snare, the flying keys, Ron’s chess sacrifice, Hermione’s potions. Harry faces Quirrell and the thing on the back of his head, and blacks out.',
        'The Stone was in his pocket all along, because he wanted to find it but not to use it.',
        'Three days in the hospital wing. Dumbledore explains, and does not explain.',
        'The leaving feast and the house cup. The school recognises what he did.',
        'Back to the Dursleys for the summer, but: “They don’t know we’re not allowed to use magic at home. I’m going to have a lot of fun with Dudley this summer.”'
      ],
      wobble: { 7: 'The ordeal and the resurrection are one scene. Rowling plays the climax at the bottom of the cave, so stages ten and eleven are quiet aftermath rather than a second test. The later books separate them properly.' }
    },
    {
      id: 'lion-king', title: 'The Lion King', year: 1994, kind: 'film', by: 'Disney',
      fit: 'Christopher Vogler worked on this film. It is his memo with songs.',
      beats: [
        'Pride Rock. A cub who cannot wait to be king and has no idea what the job is.',
        'Scar’s whispers. The elephant graveyard dare. The first call is a false one, which is the point.',
        'After Mufasa dies in the gorge, Scar tells him: “Run away and never return.” Simba obeys. The refusal lasts years.',
        'Mufasa taught him first. Rafiki teaches him later. Timon and Pumbaa are the false mentors in between: Hakuna Matata is refusal as a lifestyle.',
        'The desert. He collapses. Vultures. He is carried into the jungle, a world with different rules.',
        'Grubs, logs, a waterfall. Learning to be nobody. Nala arrives and the old world comes looking.',
        '“You’re not the Simba I remember.” Rafiki leads him into the dark to a pool of water.',
        'His reflection. His father in the clouds. “Remember who you are.” The cub who ran away dies here.',
        'He knows what he is and what he must do. He runs.',
        'Across the desert, back to a dead kingdom under a dark sky.',
        'Scar. The truth about the gorge. Fire. The fight on the edge of the rock. Scar thrown to the hyenas.',
        'Rain. He climbs Pride Rock and roars. The circle closes on a new cub.'
      ],
      wobble: {}
    },
    {
      id: 'moana', title: 'Moana', year: 2016, kind: 'film', by: 'Disney',
      fit: 'A journey where the ordeal is entirely internal. Nothing outside changes at the midpoint; she does.',
      beats: [
        'Motunui. A girl pulled toward the water by something she cannot name, and a father who says the reef is the edge of the world.',
        'The fish are gone. The coconuts are rotting. Gramma Tala shows her the cavern of boats. The ocean chose her.',
        'Her father forbids it. Her own first attempt ends wrecked on the reef.',
        'Gramma Tala, dying, gives her the heart of Te Fiti and a manta ray to follow.',
        'She sails past the reef at night, into open ocean.',
        'Maui, who is an enemy and then an ally and then neither. The Kakamora. Learning to wayfind.',
        'Lalotai, the realm of monsters, for the hook. Then the first run at Te Fiti.',
        'Te Kā cracks the hook. Maui leaves. She gives the heart back to the ocean. Alone on the boat, she asks who she is.',
        'Tala’s spirit. The answer arrives as a song, and she dives for the heart.',
        'Back toward the island. Maui returns.',
        'She walks toward Te Kā with the heart held out. “This is not who you are.” Te Kā becomes Te Fiti.',
        'Home to Motunui. She puts a shell on the chief’s stone. The whole island becomes voyagers again.'
      ],
      wobble: {}
    },
    {
      id: 'hunger-games', title: 'The Hunger Games', year: 2008, kind: 'book', by: 'Suzanne Collins',
      fit: 'Textbook except for one missing beat, and the gap is the most interesting thing about it.',
      beats: [
        'District 12. Hunting with Gale outside the fence. Feeding a mother who stopped functioning and a sister who still believes in things.',
        'The Reaping. Prim’s name.',
        'There is no refusal. She volunteers in the same breath. The refusal is displaced: for the rest of the book she refuses the Capitol’s story of her.',
        'Haymitch, drunk, who turns out to be good at the job. Cinna, who dresses her as fire.',
        'The train. The Capitol. The tribute parade.',
        'The training centre. An arrow through an apple. Peeta’s confession on live television. The Careers.',
        'The Cornucopia. Fire. Tracker jackers. An alliance with Rue.',
        'Rue dies with a spear in her stomach. Katniss sings to her and covers her in flowers. The girl who only wanted to survive dies with her.',
        'The rule change: two victors from one district. She finds Peeta, and the cave.',
        'The feast. The mutts. Cato on the Cornucopia.',
        'The berries. The rule reversed again, and she chooses a shared death over obedience. The Capitol blinks.',
        'Home to 12 on the train, but the elixir is poisoned: Snow is watching, and she is a symbol she never asked to be.'
      ],
      wobble: { 2: 'The missing refusal is the tell. Collins gives Katniss no hesitation about the call and a whole book of hesitation about what the call turns her into.' }
    },
    {
      id: 'hobbit', title: 'The Hobbit', year: 1937, kind: 'book', by: 'J.R.R. Tolkien',
      fit: 'Subtitled “There and Back Again.” Tolkien wrote the structure into the title twelve years before Campbell named it.',
      beats: [
        'Bag End. Second breakfast. “We are plain quiet folk and have no use for adventures.”',
        'Gandalf scratches a mark on the door. Thirteen dwarves arrive for tea.',
        '“Sorry! I don’t want any adventures, thank you. Not today.” He faints at the word burglar.',
        'Gandalf, who gives the map and the key to Thorin and gives Bilbo only a push. Later, a sword and a ring, found rather than given.',
        'He runs out of the door without a pocket-handkerchief.',
        'The trolls, which he fails. Rivendell. The goblins. Gollum and the riddle game, alone in the dark: the first test he passes by himself.',
        'Mirkwood. The spiders, and the sword gets its name. The Elvenking’s halls and the barrels.',
        'The tunnel down to Smaug. “Going on from there was the bravest thing he ever did.” Tolkien writes the ordeal in plain sight.',
        'The Arkenstone, pocketed in secret. And the knowledge that he can do this.',
        'Bard kills the dragon while Bilbo is elsewhere. Armies gather. Bilbo hands the Arkenstone to the other side to force a peace.',
        'The Battle of Five Armies. He is knocked out and wakes to Thorin dying: “If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.”',
        'Bag End, mid-auction. He gets the spoons back, writes a book, and is never quite respectable again.'
      ],
      wobble: { 9: 'The road back is a moral choice rather than a chase. Bilbo’s theft of the Arkenstone is the book’s real climax of character; the battle that follows happens mostly while he is unconscious.' }
    },
    {
      id: 'nemo', title: 'Finding Nemo', year: 2003, kind: 'film', by: 'Pixar',
      fit: 'Two journeys running in parallel. Marlin crosses the ocean; Nemo crosses a fish tank. Both learn the same thing.',
      beats: [
        'The reef. A father who lost everything once and has built a life out of saying no.',
        'A diver takes Nemo.',
        'Marlin does not refuse the call; he chases the boat instantly. He refuses the journey instead, at every turn, which is a more interesting flaw.',
        'Dory. A mentor who cannot remember the lesson she is teaching. “Just keep swimming.”',
        'Off the reef and into open water, which is exactly the thing he swore never to do.',
        'Bruce and the sharks. The anglerfish. The jellyfish. Crush and the turtles, who parent by letting go.',
        'Sydney Harbour. A pelican. A whale.',
        'Inside the whale, water rising. “How do you know something bad isn’t going to happen?” “I don’t.” He lets go.',
        'Sydney, and word reaches Nemo that his father crossed the ocean.',
        'Nemo plays dead to escape. Marlin sees him and believes it. He leaves Dory and goes home to nothing.',
        'The net. Nemo says “swim down.” Marlin trusts his son, and the thing he feared most becomes the thing he is good at.',
        'The reef. He lets Nemo go to school. “Go have an adventure.”'
      ],
      wobble: { 2: 'No refusal, and it works, because the whole second act is a refusal stretched thin. Marlin says yes to the quest and no to everything it tries to teach him.' }
    },
    {
      id: 'fury-road', title: 'Mad Max: Fury Road', year: 2015, kind: 'film', by: 'George Miller',
      fit: 'Textbook, once you notice the hero is Furiosa. Max is the mentor figure who wanders in, and the road back is the entire third act, literally.',
      beats: [
        'The Citadel. Furiosa is an Imperator, trusted with the war rig, with a plan nobody knows about.',
        'The call is her own: she has already chosen. The rig turns east off the road.',
        'No refusal from her. The refusal belongs to Max, who spends the first act trying to leave.',
        'Max, reluctantly. He knows the wasteland. The Vuvalini, later, who know where she came from.',
        'Through the storm. Into the canyon. The deal with the bikers fails.',
        'Max joins. Nux changes sides. The Bullet Farmer. The mud.',
        'The Green Place, at last, after a lifetime.',
        'The Green Place is a dead salt flat. She walks out alone into it and screams. The hope that drove her dies.',
        'Max’s idea. The Citadel has water and nobody is guarding it.',
        '“Go back the way we came.” The road back is the plot.',
        'The rig in the canyon. Furiosa stabbed, bleeding out. Max gives her his blood and, for the first time, his name.',
        'She releases the water. The Citadel is hers. Max disappears into the crowd.'
      ],
      wobble: { 2: 'Miller splits the beats between two characters. Furiosa has the journey; Max carries the refusal and the mentoring. Deciding who the hero is changes how the whole film reads.' }
    }
  ];

  /* ---------- Broken ---------- */
  const BROKEN = [
    {
      id: 'no-country', title: 'No Country for Old Men', year: 2007, kind: 'film', by: 'The Coens, from Cormac McCarthy',
      breaks: ['no-resurrection', 'no-return'],
      rule: 'The hero dies off screen, in act three, killed by nobodies.',
      how: 'Llewelyn Moss runs the first two acts as a textbook journey: the money in the desert is the call, the motel rooms are the special world, Chigurh is the shadow. Then the film cuts away and he is dead on a floor, and the man who was supposed to face Chigurh never does. Sheriff Bell, who has refused the call the whole way through, retires and describes a dream about his father.',
      why: 'The absence is the argument. The film is about a world where the journey no longer works, and it proves it by setting one up and declining to finish it. You feel the missing beat because you have watched a thousand films that include it.'
    },
    {
      id: 'llewyn', title: 'Inside Llewyn Davis', year: 2013, kind: 'film', by: 'The Coens',
      breaks: ['no-change'],
      rule: 'The circle closes and nothing has changed.',
      how: 'The film opens and ends on the same night in the same alley behind the same club, taking the same beating. In between, Llewyn refuses every call: the Gorfeins’ cat, the Chicago audition (“I don’t see a lot of money here”), the merchant marine, the child he did not know about. The cat is called Ulysses.',
      why: 'Harmon’s eighth beat is Change, and the Coens delete it on purpose. The loop is intact, so it feels like a story; the ending is the beginning, so it feels like a life. Naming the cat after Homer’s returning hero is them telling you they know.'
    },
    {
      id: 'groundhog', title: 'Groundhog Day', year: 1993, kind: 'film', by: 'Harold Ramis',
      breaks: ['time-bent'],
      rule: 'The special world is the ordinary world with one rule changed.',
      how: 'Phil crosses no threshold. He wakes up in the same bed in the same town and does it again. The external structure is nailed to the floor so that only one thing can move: him. Every version of the day is a test; the ordeal is the run of suicides; the resurrection is the day he lives perfectly without trying to get anything from it.',
      why: 'It is the cleanest demonstration that the journey is internal. Strip the travel out and the shape is still there, because the shape was never about the geography.'
    },
    {
      id: 'godfather', title: 'The Godfather', year: 1972, kind: 'film', by: 'Francis Ford Coppola, from Mario Puzo',
      breaks: ['inverted-elixir'],
      rule: 'Every beat lands. The elixir is damnation.',
      how: 'Michael’s ordinary world is being the son who got out: “That’s my family, Kay, it’s not me.” The call is his father shot in the street. The threshold is the restaurant, the gun behind the cistern. Sicily is the special world. Apollonia’s death is the ordeal. The baptism is the resurrection, and the elixir he brings home is absolute power, shown as a door closing on his wife.',
      why: 'The structure makes you complicit. Because the beats are the beats of a hero, you root for him through each one, and only at the end do you count what you cheered for. The journey is a descent played as an ascent.'
    },
    {
      id: 'breaking-bad', title: 'Breaking Bad', year: 2008, kind: 'tv', by: 'Vince Gilligan',
      breaks: ['inverted-elixir'],
      rule: 'The hero’s transformation is a villain’s origin.',
      how: 'Each season is a full loop. Across five of them Walter White gets everything the journey promises: mastery, respect, an empire, his family provided for. The return with the elixir is a final conversation with Skyler: “I did it for me. I liked it. I was good at it.” Then he dies alone on a lab floor, touching the equipment.',
      why: 'It is the Godfather’s trick stretched to sixty hours. The change the structure demands is real; it is just the wrong direction. The show trusts you to notice that a satisfying arc and a good man are different things.'
    },
    {
      id: 'fleabag', title: 'Fleabag', year: 2016, kind: 'tv', by: 'Phoebe Waller-Bridge',
      breaks: ['heroine', 'no-fight'],
      rule: 'The elixir is giving something up. There is no confrontation.',
      how: 'The special world is us. Talking to the camera is her escape hatch from every scene, and the Priest is the first person who notices her doing it. Season two runs the journey on grief and self-loathing: the ordeal is the confession box, the reward is love, the road back is being told no at a bus stop. She walks away from the camera and it does not follow.',
      why: 'Maureen Murdock’s heroine’s journey ends in reintegration rather than victory, and this is the sharpest version of it on screen. The last beat is not winning the thing, it is no longer needing the audience.'
    },
    {
      id: 'eeaao', title: 'Everything Everywhere All at Once', year: 2022, kind: 'film', by: 'Daniels',
      breaks: ['no-fight'],
      rule: 'All twelve beats, at speed, and the climax is a hug.',
      how: 'Evelyn gets the call from a version of her husband in a lift, refuses it, crosses into the multiverse, gathers skills by jumping into other lives, and faces the shadow, who is her daughter with a bagel. The resurrection scene is built like a fight and resolved with attention: she stops trying to win and listens.',
      why: 'The film runs the structure so fast and so visibly that you see it as structure. Then it tells you the beats were never the point, the choice to be kind inside them was. It breaks the journey by completing it and declining the violence.'
    },
    {
      id: 'rick-morty', title: 'Rick and Morty', year: 2013, kind: 'tv', by: 'Dan Harmon and Justin Roiland',
      breaks: ['no-change'],
      rule: 'The man who drew the circle refuses its last step, every week.',
      how: 'Harmon built the show on his own eight beats. Every episode goes around the circle. Rick’s job is to arrive at Change and decline it: he learns the lesson, says it out loud, and does the thing anyway. Morty is the one the circle actually works on, slowly, over seasons.',
      why: 'The structure is the punchline. The form says you should have learned something, and the character says he did and it changed nothing. That joke only lands if the audience feels the shape underneath, which proves they do.'
    },
    {
      id: 'parasite', title: 'Parasite', year: 2019, kind: 'film', by: 'Bong Joon-ho',
      breaks: ['no-hero', 'inverted-elixir'],
      rule: 'No single hero. The elixir is a fantasy.',
      how: 'A family, not a person, crosses the threshold into the Park house. The midpoint ordeal is the doorbell in the rain and the man in the basement, which flips the genre. The flood sends them down the stairs of the whole city. The return with the elixir is Ki-woo’s letter about buying the house one day, and the film has already shown you the maths.',
      why: 'The journey assumes you can come back up. Parasite is built on the fact that you can go down any number of stairs and never climb one. It borrows the shape to show you who it was designed for.'
    },
    {
      id: 'arrival', title: 'Arrival', year: 2016, kind: 'film', by: 'Denis Villeneuve, from Ted Chiang',
      breaks: ['time-bent'],
      rule: 'The return happens before the call.',
      how: 'Louise’s ordeal is learning a language that changes how she experiences time. The scenes of her daughter that open the film are not memories, they are what she is bringing back. The elixir is knowing how her child will die and choosing to have her anyway.',
      why: 'The alien idea in the story is circular time, so the film makes its own structure a circle you can only see from the end. The journey is intact; you just walked it in the wrong order, which is the whole point.'
    },
    {
      id: 'never-let-me-go', title: 'Never Let Me Go', year: 2005, kind: 'book', by: 'Kazuo Ishiguro',
      breaks: ['no-threshold'],
      rule: 'Nobody crosses the threshold. Nobody even tries.',
      how: 'Kathy, Ruth and Tommy are clones raised to donate their organs and they know it. The book gives you every opportunity for the journey to begin, a rumour of deferrals, a trip to see a woman who might help, and then lets the characters accept the answer and go back to work.',
      why: 'The horror is the ordinary world, accepted. Ishiguro withholds the one beat that would make it an adventure story, and the absence is what makes it unbearable. You keep waiting for someone to run.'
    },
    {
      id: 'piranesi', title: 'Piranesi', year: 2020, kind: 'book', by: 'Susanna Clarke',
      breaks: ['time-bent', 'inverted-elixir'],
      rule: 'It starts in the special world. The return is the loss.',
      how: 'The narrator lives happily in an infinite house of statues and tides and does not know he was ever anywhere else. The journey runs backwards: the call is evidence of his old self, the ordeal is remembering, and the return to the ordinary world is a grief he agrees to.',
      why: 'Every journey assumes home is worth going back to. Clarke flips the poles and asks what the elixir is worth when the special world was kinder.'
    },
    {
      id: 'the-road', title: 'The Road', year: 2006, kind: 'book', by: 'Cormac McCarthy',
      breaks: ['no-return'],
      rule: 'There is no home and no return. The hero is the elixir.',
      how: 'A father and son walk south through ash. The father is the mentor and the hero at once, and he dies. The boy is handed to strangers on a beach. The journey delivers a person rather than a prize.',
      why: 'It strips the shape to one question, what do you carry, and answers it with the child. No destination, no special world, no resurrection, and still unmistakably a journey.'
    },
    {
      id: 'gone-girl', title: 'Gone Girl', year: 2012, kind: 'book', by: 'Gillian Flynn',
      breaks: ['no-hero'],
      rule: 'The antagonist is running the journey as a weapon.',
      how: 'Amy authors a hero’s journey in her diary, casts Nick as the villain, and disappears. The Cool Girl passage is her refusal of the role she was given. Her return with the elixir is coming home to a marriage she has written into a cage, on television, pregnant.',
      why: 'Both characters are writers, and the book is about who gets to tell the story. Flynn shows the structure being used on someone, which is a sharper lesson than any film that simply follows it.'
    }
  ];

  const BREAK_TAGS = {
    'no-change': 'No change',
    'no-return': 'No return',
    'no-resurrection': 'No resurrection',
    'no-threshold': 'No threshold',
    'no-fight': 'No fight',
    'no-hero': 'No single hero',
    'inverted-elixir': 'Poisoned elixir',
    'heroine': 'Heroine’s journey',
    'time-bent': 'Time bent'
  };

  /* ---------- Lenses ---------- */
  const LENSES = [
    {
      name: 'Want and need',
      body: 'The plot is what the hero wants. The story is what they need, which is usually the opposite. Marlin wants to find his son; he needs to let him go. Work out both and you can predict the ending: the want will be threatened and the need will be met.'
    },
    {
      name: 'The two deaths',
      body: 'A good story kills its hero twice. The ordeal, in the middle, kills the person they were. The resurrection, at the end, tests whether the new person is real. If a third act feels flat, count the deaths. There is usually only one.'
    },
    {
      name: 'The rule of the new world',
      body: 'A threshold is a change of rules, not a change of scenery. State the ordinary world’s rule in a sentence: “stay on the farm, do as you’re told.” Now the special world’s: “trust what you cannot see.” If you cannot write both sentences, nothing was crossed.'
    },
    {
      name: 'Two futures',
      body: 'The mentor and the shadow are both the hero, later. Obi-Wan and Vader are the two men Luke might become. Gandalf and Gollum. Look for the pair and the story’s real question appears: which one?'
    },
    {
      name: 'The refusal is a promise',
      body: 'Whatever the hero is afraid of when they say no is what the climax will make them face. Writers plant it at the start and pay it at the end. Watch the refusal closely and you will see the last act coming from ninety minutes away.'
    },
    {
      name: 'The return is the hard part',
      body: 'Act three is where most stories fall over, and the reason is almost always a failed return. Ask two questions of any ending: what did they bring back, and who needed it? If the answers are “nothing” and “nobody,” the story has stopped rather than finished.'
    },
    {
      name: 'Diagnosis, not recipe',
      body: 'Vogler himself warns against writing to the list. Use the stages on a story that is not working, to find where the shape is missing. Writing to them from a blank page produces the films you can set your watch by.'
    },
    {
      name: 'Who is the hero?',
      body: 'Answer it wrong and the film is a mess. Fury Road is baggy until you give the journey to Furiosa. Parasite has no hero and is about that. Gone Girl’s hero is the villain. The question is the most useful tool on this page.'
    },
    {
      name: 'The heroine’s version',
      body: 'Maureen Murdock’s reply to Campbell: an arc that ends in reintegration rather than conquest. The climax is a reconciliation, a homecoming, a letting go. Frozen, Encanto, Lady Bird, Fleabag. Once you know it exists you see it everywhere, and you stop calling those films plotless.'
    },
    {
      name: 'The carrier bag',
      body: 'Ursula Le Guin’s objection: the first human tool was probably a bag, not a spear, and the first stories were about gathering, not killing. Novels especially can be bags: things held together, no single hero, no slain beast. If a book is not working as a journey, try reading it as a bag.'
    },
    {
      name: 'The clock',
      body: 'Beats land at percentages. In a feature film the threshold is at roughly a quarter, the ordeal at the half, the low point around two-thirds, the climax in the last fifth. Glance at the runtime and you can call the next beat before it arrives.'
    },
    {
      name: 'One loop per episode',
      body: 'Television runs the circle every week and resets the character, because the format needs them back where they started. That is why TV heroes take years to change. The change is stored up in the audience instead.'
    }
  ];

  /* ---------- Books ---------- */
  const BOOKS = [
    {
      title: 'The Writer’s Journey', by: 'Christopher Vogler', year: '1992, fourth edition 2020', start: true,
      read: 'The twelve stages on this page, with the archetypes that go with them: mentor, herald, threshold guardian, shapeshifter, shadow, trickster, ally. Readable in a weekend. Started life as a seven-page memo at Disney.',
      warn: 'Read the chapters on what the stages are for, not just what they are. The book works as a diagnostic and fails as a recipe, and Vogler says so.'
    },
    {
      title: 'Into the Woods', by: 'John Yorke', year: '2013',
      read: 'The best-written book on the list, and the one that explains why the shape exists rather than what it is. Five acts, the midpoint, and why every story is a trip into the woods and back. Yorke ran drama at the BBC and Channel 4.',
      warn: 'It argues with Vogler and Snyder, which is the point of reading it after them.'
    },
    {
      title: 'Story Structure 101 to 106', by: 'Dan Harmon', year: 'Channel 101 wiki, free online',
      read: 'The circle, in six short posts, written for people making five-minute television. Funny, profane, and the fastest route from nothing to understanding. Read in an hour.',
      warn: 'It is a wiki from 2009. Search for the title; the pages move around.'
    },
    {
      title: 'The Hero with a Thousand Faces', by: 'Joseph Campbell', year: '1949',
      read: 'The source. Seventeen stages, dozens of myths, and the claim that they are all the same story. Read the first chapter, called The Monomyth, and the summary at the start of each section.',
      warn: 'Hard going, and half of it is Jung. If you want Campbell without the effort, the Bill Moyers interviews, The Power of Myth (1988), are the easier door.'
    },
    {
      title: 'Save the Cat!', by: 'Blake Snyder', year: '2005',
      read: 'Fifteen beats with page numbers. The formula the 2010s were made from. Read it to recognise it, and to understand why so many films feel identical.',
      warn: 'Do not write from it. Snyder died in 2009 and his beat sheet became a studio cargo cult he would probably have hated.'
    },
    {
      title: 'The Heroine’s Journey', by: 'Maureen Murdock', year: '1990',
      read: 'Murdock asked Campbell about women and he told her they did not need the journey. This book is the reply. An arc that goes down, separates, and comes back to wholeness rather than victory.',
      warn: 'Written as therapy as much as craft. Skim the Jungian parts and keep the shape.'
    },
    {
      title: 'Story', by: 'Robert McKee', year: '1997',
      read: 'The big one. The gap between what a character expects and what happens, and how that gap is the unit of story. Scene, sequence, act. Not really about the journey, but everyone who uses the journey has read it.',
      warn: 'Four hundred pages and a lecturing tone. Not the first book to read, possibly the fourth.'
    },
    {
      title: 'The Anatomy of Story', by: 'John Truby', year: '2007',
      read: 'Twenty-two steps, and a good argument that the journey is too mechanical. Truby starts from the character’s weakness and need and lets the plot fall out of that. The anti-Vogler.',
      warn: 'Dense. Reads better once you have a story of your own to test it on.'
    },
    {
      title: 'Story Genius', by: 'Lisa Cron', year: '2016',
      read: 'For novelists. The engine of a story is the misbelief, the wrong idea the character holds about the world, and the plot exists to break it. A practical method, with exercises.',
      warn: 'Opinionated about outlining. Take the misbelief idea and leave the rest if it does not suit you.'
    },
    {
      title: 'The Science of Storytelling', by: 'Will Storr', year: '2019',
      read: 'Short, British, and about why the shape works on brains: the flawed model of the world, the sacred flaw, the question a story keeps asking. Good at explaining why the ordeal has to hurt.',
      warn: 'Pop science. The psychology is simplified. The story craft is sound.'
    },
    {
      title: 'The Carrier Bag Theory of Fiction', by: 'Ursula K. Le Guin', year: '1986, essay, free online',
      read: 'Four pages. The hero with the spear is one story; the bag that holds things is older and bigger. The best short argument against everything else on this list.',
      warn: 'Read it last, or it will stop you enjoying the others.'
    },
    {
      title: 'The Virgin’s Promise', by: 'Kim Hudson', year: '2010',
      read: 'An arc for characters who stay home and grow: the inward journey, where the threshold is a secret self rather than a far country. Useful for stories that are not about leaving.',
      warn: 'The title is doing it no favours. The content is good.'
    }
  ];

  return { STAGES, CIRCLE, SYSTEMS, TEXTBOOK, BROKEN, BREAK_TAGS, LENSES, BOOKS };
})();
