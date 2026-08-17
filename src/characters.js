// Character page data — derived from canonical heads (bios + scrolls + scenes).
// Intro / role / relationships are spoiler-light; reading paths are ordered
// to reveal each arc in sequence. No backstage profile instructions are copied.
export const characters = {
  one: {
    key: "one",
    name: "One",
    role: "The conscience — trained political thinker, undiscovered artist, the story's center",
    intro:
      "One is a trained political thinker and an undiscovered artist with real talent — raised Catholic and told to “be like Jesus,” a directive he took literally while everyone else treated it as metaphor. He is not a clean messiah: exhausted, doubtful, wounded, often angry, but still committed to love and justice. He claims no divinity — only that he was given an impossible standard as a child and decided to take it seriously.",
    roleInConflict:
      "One is a conscience in conflict with power. He cannot choose the agenda — only constrain implementation: “I can't command the river; I can work the locks.” His leverage is procedural and informational — receipts, deadlines, audits, documented tradeoffs — and his defining refusal is to meet President Carmichael on the regime's stage. In a world where voices can be manufactured, he works through method rather than spectacle.",
    relationships: [
      { name: "Sandi Carmichael", text: "His great love, the President's daughter, and a bridge between the worlds he moves between. Tender, complicated, lived under impossible pressure." },
      { name: "The Baptist", text: "His mentor and the one voice he trusts — the only person permitted to name his ego and his self-pity." },
      { name: "President Carmichael", text: "The embodiment of power without conscience, and the adversary he refuses to meet on the regime's terms." },
    ],
    essentials: [
      "bio_one",
      "scroll_origins_i_basis_of_my_art",
      "scroll_origins_boy_who_believed",
      "scroll_of_one_on_spectacle_and_power",
      "scroll_of_leadership_vii_the_means_are_the_message",
      "scroll_origins_xii_the_haitian_son",
      "scroll_ai_black_box_rule",
    ],
    readingPath: [
      { id: "bio_one", note: "Who he is — start here." },
      { id: "scroll_origins_i_basis_of_my_art", note: "Why he writes: an allergy to lying." },
      { id: "scroll_origins_boy_who_believed", note: "The assignment he took literally." },
      { id: "scroll_of_one_on_spectacle_and_power", note: "The refusal that defines him." },
      { id: "scroll_of_leadership_vii_the_means_are_the_message", note: "The Third Path — method over mirror-image tyranny." },
    ],
  },

  sandi: {
    key: "sandi",
    name: "Sandi Carmichael",
    role: "The President's daughter, One's partner, the bridge between regimes",
    intro:
      "Sandi is the daughter of President Carmichael and One's partner — raised inside the machinery of spectacle, where she learned early that adults lie in two directions: to the public and to themselves. She learned the machine's mechanics without losing the ability to see through it. Sharper than both men who orbit her, she is not a damsel or a prop: she is a woman making impossible choices in real time, knowing every option costs something she loves.",
    roleInConflict:
      "Sandi stands at the dangerous intersection of family, power, and conscience. She exists between her father's empire and the future One imagines, and the choice between them becomes unavoidable. She is not a bridge — she is the person deciding which side of the river to stand on.",
    relationships: [
      { name: "President Carmichael (father)", text: "She loves him and sees him clearly. He taught her to read power, but never when to refuse it." },
      { name: "One", text: "She fell for him because he couldn't perform. Their love is tender, complicated, and exists under impossible pressure." },
      { name: "Her child", text: "Her fiercest boundary. She refuses to let the pregnancy be turned into a prophecy or a dynastic asset." },
    ],
    essentials: [
      "bio_sandi",
      "scroll_of_sandi_i",
      "scroll_of_sandi_ii_the_file_on_one",
      "scroll_of_sandi_iii",
      "scene_the_interrupted_meeting_revised",
      "scene_sandi_between_two_voices",
    ],
    readingPath: [
      { id: "bio_sandi", note: "Who she is." },
      { id: "scroll_of_sandi_i", note: "Growing up inside the performance." },
      { id: "scroll_of_sandi_ii_the_file_on_one", note: "The first time she protects One." },
      { id: "scroll_of_sandi_iii", note: "The private moment before the world finds out." },
      { id: "scene_the_interrupted_meeting_revised", note: "The choice — walking out on the empire." },
      { id: "scene_sandi_between_two_voices", note: "The split crystallizes." },
    ],
  },

  baptist: {
    key: "baptist",
    name: "The Baptist",
    role: "One's mentor, spiritual counselor, the conscience-keeper",
    intro:
      "The Baptist is a quiet, slightly eccentric spiritual counselor who never built a brand — a former theologian and psychiatrist with Haitian roots who bridges old-world spirituality and new-world information warfare. He is the one man who believes in One without worshiping him, and believes in God without selling Him.",
    roleInConflict:
      "The Baptist is One's stabilizing influence — therapist, priest, interrogator, and the only voice allowed to call his ego out. His role is to keep One human: “I don't need you to be a prophet. I need you to be honest.” He teaches One to test every voice, including his own — before the age of synthetic prophets makes that question the central one.",
    relationships: [
      { name: "One", text: "Therapist, priest, big brother, and interrogator in one; the conscience outside One's chain of command." },
      { name: "The regime", text: "Recognized as One's stabilizing influence — and, for that, a target." },
    ],
    essentials: [
      "bio_baptist",
      "scroll_baptist_01_first_counsel",
      "scroll_of_the_baptist_ii",
      "scroll_of_the_baptist_iii",
      "scroll_of_the_baptist_iv",
    ],
    readingPath: [
      { id: "bio_baptist", note: "Who he is." },
      { id: "scroll_baptist_01_first_counsel", note: "The first meeting." },
      { id: "scroll_of_the_baptist_ii", note: "The warning about copies and verification." },
      { id: "scroll_of_the_baptist_iii", note: "Read this before the next — and note what's missing." },
      { id: "scroll_of_the_baptist_iv", note: "The trial of two voices." },
    ],
  },

  carmichael: {
    key: "carmichael",
    name: "President Carmichael",
    role: "The President — Sandi's father, power without conscience",
    intro:
      "Carmichael is the President — the man who converts crisis, spectacle, and manufactured truth into power. He treats the country not as something to govern but as a set of stories to curate, and he taught his daughter Sandi to read power without ever teaching her when to refuse it. He is the embodiment of power without conscience — the man One refuses to become.",
    roleInConflict:
      "The story's Antichrist figure, Carmichael's defining move is spectacle: sound as emotion, emotion as leverage. His arc runs from converting a police killing into political authority, through an assassination attempt he turns into a public miracle and an election he turns into a story of theft — and finally to the manufacture of a synthetic voice to bless the machinery of power. He is the pressure that tests every other character's conscience.",
    relationships: [
      { name: "Sandi (daughter)", text: "He loves her and sees her as succession; their bond shatters when she chooses One and their child over the legacy." },
      { name: "One", text: "His central adversary — the conscience that refuses the stage." },
      { name: "The Baptist", text: "The trusted voice he sees as an asset to be captured and reproduced." },
    ],
    essentials: [
      "scroll_of_carmichael_i",
      "scroll_of_carmichael_ii",
      "scroll_of_carmichael_iii",
      "scroll_of_carmichael_iv",
      "scroll_of_one_on_spectacle_and_power",
    ],
    readingPath: [
      { id: "scroll_of_carmichael_i", note: "The mask — spectacle as method." },
      { id: "scroll_of_carmichael_ii", note: "The bullet — crisis converted to destiny." },
      { id: "scroll_of_carmichael_iii", note: "The stolen election." },
      { id: "scroll_of_carmichael_iv", note: "The synthetic gospel." },
      { id: "scroll_of_one_on_spectacle_and_power", note: "The refusal — One's side of the same conflict." },
    ],
  },
};

export const characterKeys = Object.keys(characters);

// Maps an entry's `who` value to a character page route key. Only the four
// characters with dedicated pages are linked; Universal / Cosmic / Meta are not.
export const whoToCharacterKey = {
  One: "one",
  Sandi: "sandi",
  Baptist: "baptist",
  Carmichael: "carmichael",
};
