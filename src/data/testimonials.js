// Testimonial content. No markup or styling here; <WordCard> renders it.
//   company  picks the grey logo       featured  claimed by a work band, so it
//   short    one-line excerpt for the            is left out of the grid
//            compact (aside) variant   cta       legacy; CTAs now live on the work
//
// Testimonial cards. `company` picks the grey eyebrow logo; `avatar` is a
// shared placeholder for now, swap per person as portraits come in.
const baseQuotes = [
  {
    text: "Parul is exactly the kind of designer who not only delivers strong solutions but also helps shape a stronger design culture. I'm happy to recommend Parul for any product design role! She brings a rare combination of courage, creativity, and user-centered thinking to every project she touches.",
    highlights: ["design culture", "rare combination", "courage", "creativity", "user-centered thinking"],
    name: "Paul Ray",
    role: "Director of Product Design, Education at Microsoft",
    company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
    avatar: "img/avatars/paul-ray.jpg"
  },
  {
    text: "I worked with Parul at Microsoft in Education product design. These include working in a space to define AI and Copilot scenarios and use for educational purpose inside the classroom. She has great capabilities to look across horizontal spaces and make logical connections that reduce and simplify the user experience.",
    highlights: ["define AI and Copilot scenarios", "look across horizontal spaces", "reduce and simplify the user experience"],
    name: "Jon Esterly",
    role: "Principal Product Designer, Education at Microsoft",
    company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
    avatar: "img/avatars/jon-esterly.jpg",
    cta: { label: "View Framework Sensemaking", href: "horizontal-design.html" },
    featured: true
  },
  {
    text: "I worked with Parul during her project in Google NetOps. Parul has a passion for UI development in application design, and has proposed creative solutions to improve the user interface to support complex processes. We worked together across multiple workstreams (10+) for various circuit deliveries and field operations. She has received strong feedback from my partner teams during her time on the project.",
    highlights: ["UI development", "creative solutions", "complex processes", "multiple workstreams (10+)"],
    name: "Eddie Dinh",
    role: "Google Cloud",
    company: { name: "Google", logo: "img/logos/google.png" },
    avatar: "img/avatars/eddie-dinh.jpg",
    cta: { label: "View Case Study", href: "portfolio.html?next=enterprise.html" },
    featured: true
  },
  {
    text: "Her concern for the customer and overall experience was truly evident in every design decision. Parul was also a driving force in fostering team culture by creating spaces for collaboration. She started a Teams channel for our team that encouraged quick, constructive design feedback. She also organized a coworking opportunity that she hosted each week offering a flexible, low-pressure way for teammates to connect while working. Her efforts to build engagement and community made a real difference in strengthening the team as a whole.",
    highlights: ["concern for the customer", "driving force", "team culture", "constructive design feedback", "engagement", "community"],
    name: "Joshua McGlinn",
    role: "Principal Design Lead at Microsoft",
    company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
    avatar: "img/avatars/joshua-mcglinn.jpg"
  },
  {
    // Blank line splits the quote into paragraphs — see renderWordCard.
    text: "I've worked with Parul on several machine learning projects, including a longer term one at Rasa. Parul is a joy to work with in terms of energy and mentality, she is interested and able to communicate effectively with participants from customers through management to engineers. Parul has a great understanding not only of UX principles for users, but of how working with ML/AI systems complicates user interactions and what opportunities it gives to improve them.\n\nI would recommend working with Parul to anyone who has the opportunity!",
    highlights: ["several machine learning projects", "communicate effectively", "UX principles", "ML/AI systems"],
    name: "Joey Faulkner",
    role: "Machine Learning Engineer, Rasa",
    company: { name: "Rasa", logo: "img/logos/rasa.png" },
    avatar: "img/avatars/joey-faulkner.jpg",
    cta: { label: "View Case Study", href: "portfolio.html?next=rasa.html" },
    featured: true
  },
  {
    text: "Her instinct for inclusive design, proactive collaboration, and thoughtful questioning consistently elevates team outcomes, as seen in her impactful work on Career Coach, Speaker Progress, and Learning Accelerators. She demonstrates maturity and conviction, while her positive, curious attitude fosters a supportive and innovative team environment.",
    highlights: ["inclusive design", "proactive collaboration", "elevates team outcomes", "Career Coach", "Speaker Progress", "Learning Accelerators"],
    name: "Paul Ray",
    role: "Director of Product Design, Education at Microsoft",
    company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
    avatar: "img/avatars/paul-ray.jpg",
    // Routes through the password gate, which forwards to Career Coach on
    // success (see `next` handling in public/portfolio.html).
    cta: { label: "View Case Study", href: "portfolio.html?next=teams.html" },
    featured: true
  }
];

// One-line excerpts (<= ~160 chars) for the compact card beside each featured work.
const shorts = {
  'Paul Ray': 'Her instinct for inclusive design, proactive collaboration, and thoughtful questioning consistently elevates team outcomes.',
  'Jon Esterly': 'She has great capabilities to look across horizontal spaces and make logical connections that reduce and simplify the user experience.',
  'Eddie Dinh': 'Parul has a passion for UI development in application design, and has proposed creative solutions to improve the user interface to support complex processes.',
  'Joey Faulkner': 'Parul has a great understanding not only of UX principles for users, but of how working with ML/AI systems complicates user interactions.',
};

const withShorts = baseQuotes.map((q) => (shorts[q.name] ? { ...q, short: shorts[q.name] } : q));

// The longest quote in the grid spans both columns (.word-card--feature).
const longestGridText = Math.max(...withShorts.filter((q) => !q.featured).map((q) => q.text.length));
export const quotes = withShorts.map((q) => (!q.featured && q.text.length === longestGridText ? { ...q, wide: true } : q));

export const byName = (name) => quotes.find((q) => q.name === name && q.featured);

// Everything not claimed by a work band appears in "Words From Others".
export const gridQuotes = quotes.filter((q) => !q.featured);
