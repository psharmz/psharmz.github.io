import { byName } from './testimonials';

// Featured work bands. Each pairs a piece of work (media) with a short summary,
// a primary CTA, and a quiet supporting testimonial.
export const strengths = [
  {
    slug: 'zero-to-one',
    // TODO: confirm wording; figures come from the existing copy on this site.
    summary: '0 \u2192 1 product design and development for education in Microsoft Teams, built on the LinkedIn Economic Graph API. Traffic rose 32%.',
    cta: { label: 'View Case Study', href: 'portfolio.html?next=teams.html' },
    title: 'Building Career Coach, 0 \u2192 1',
    eyebrow: 'Microsoft · Product Designer · B2B2C',
    video: 'img/msoft/intro1.mp4',
    mediaAlt: 'Microsoft Teams education product walkthrough',
    quote: byName('Paul Ray')
  },
  {
    slug: 'horizontal',
    // TODO: confirm wording; figures come from the existing copy on this site.
    summary: 'An AI framework for Copilot in education, designed to work across products instead of one at a time, and adopted across M365 education.',
    cta: { label: 'View Framework Sensemaking', href: 'horizontal-design.html' },
    title: 'Frameworks for Microsoft Education',
    eyebrow: 'Microsoft · Product Designer · B2B2C',
    // Two stills crossfading in one frame — see .strength__media--fade.
    fade: ['img/msoft/reading-progress.jpg', 'img/msoft/speakerstudent.gif'],
    mediaAlt: 'Reading Coach in Microsoft Teams: word practice, reading start, syllable breakdown and the teacher reading-progress report, alternating with a student Speaker Progress recording',
    quote: byName('Jon Esterly')
  },
  {
    slug: 'developers',
    // TODO: confirm wording; figures come from the existing copy on this site.
    summary: 'Conversational AI and ML dev-ops tooling, designed and built as both designer and engineer, from Dev Home setup to chatbot ops.',
    cta: { label: 'View Case Study', href: 'portfolio.html?next=rasa.html' },
    title: '0 → 1 chatbot tooling · B2B',
    media: 'img/msoft/dev-home-machine-config.png',
    mediaAlt: 'Dev Home machine configuration — developer environment setup',
    eyebrow: 'Rasa · Front-End Engineer and Designer',
    quote: byName('Joey Faulkner')
  },
  {
    slug: 'enterprise',
    eyebrow: 'Google Cloud · Lead Product Designer',
    // TODO: confirm wording; figures come from the existing copy on this site.
    summary: 'A dispatch console and field app that automated work across 10 workstreams, 4 timezones and 3 user groups, for a 30% productivity gain.',
    cta: { label: 'View Case Study', href: 'portfolio.html?next=enterprise.html' },
    title: 'Simplifying enterprise workflows · B2B',
    // The live CSS phone with the counting timer, shared with the Google
    // case study rather than duplicated.
    embed: 'embeds/field_worker_mobile_stripped.html',
    // Animates behind the phone. White was flattened to a transparent index so
    // it reads on the dark band instead of sitting in a white box.
    backdrop: 'img/enterprise/google-logo.gif',
    mediaAlt: 'Field dispatch mobile app with a running travel timer',
    quote: byName('Eddie Dinh')
  }
];
