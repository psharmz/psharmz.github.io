import React from 'react';

// Wraps the highlight phrases in <mark>. Phrases that aren't in `text` (e.g. when
// showing the short excerpt) are simply skipped.
function Highlighted({ text, highlights = [] }) {
  const phrases = highlights.filter((h) => text.includes(h));
  if (phrases.length === 0) return text;
  const escaped = phrases.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'g'));
  return parts.map((part, i) =>
    phrases.includes(part)
      ? <mark className="word-card__highlight" key={i}>{part}</mark>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

// A blank line in the text starts a new paragraph. The curly quotes wrap the
// whole quotation, so they open on the first paragraph and close on the last.
function Paragraphs({ text, highlights }) {
  const paras = text.split(/\n\s*\n/);
  return paras.map((para, n) => (
    <p key={n}>
      {n === 0 ? '\u201C' : ''}
      <Highlighted text={para} highlights={highlights} />
      {n === paras.length - 1 ? '\u201D' : ''}
    </p>
  ));
}

function Attribution({ q, logoClass }) {
  return (
    <figcaption className="word-card__person">
      <img className="word-card__avatar" src={q.avatar} alt="" aria-hidden="true" />
      <span className="word-card__meta">
        <span className="word-card__name type-caption">{q.name}</span>
        <span className="word-card__role type-caption">{q.role}</span>
      </span>
      <img className={logoClass} src={q.company.logo} alt={q.company.name} aria-hidden="true" />
    </figcaption>
  );
}

/**
 * Testimonial card. One component, two variants:
 *   variant="grid"   full quote, primary type; used in "Words From Others"
 *   variant="aside"  short excerpt, quiet; sits under a featured work and never
 *                    competes with it. On hover / focus the full quote floats
 *                    over the card as an overlay (.word-card__peek), so nothing
 *                    around it reflows.
 * Content comes from src/data/testimonials.js; styling is .word-card* in index.css.
 */
export default function WordCard({ quote: q, variant = 'grid' }) {
  const aside = variant === 'aside' && Boolean(q.short);
  const logoClass = `word-card__logo word-card__logo--${q.company.name.toLowerCase()}`;

  if (!aside) {
    return (
      <figure className={`word-card word-card--${variant}${q.wide ? ' word-card--feature' : ''} scroll-reveal`}>
        <blockquote className="word-card__quote type-statement">
          <Paragraphs text={q.text} highlights={q.highlights} />
        </blockquote>
        <Attribution q={q} logoClass={logoClass} />
      </figure>
    );
  }

  return (
    <figure className="word-card word-card--aside scroll-reveal" tabIndex={0}>
      {/* Resting state: the excerpt. It's aria-hidden because the overlay
          below carries the complete quote. */}
      <blockquote className="word-card__quote type-caption" aria-hidden="true">
        <Paragraphs text={q.short} highlights={q.highlights} />
      </blockquote>
      <Attribution q={q} logoClass={logoClass} />

      {/* Hover / focus state. The overlay appears looking exactly like the resting
          card (excerpt + attribution), then the excerpt row collapses while the
          full-quote row grows (grid-template-rows 1fr <-> 0fr), so the panel
          visibly expands upward from the card instead of snapping taller. */}
      <div className="word-card__peek">
        <div className="word-card__row word-card__row--short" aria-hidden="true">
          <div>
            <blockquote className="word-card__quote type-caption">
              <Paragraphs text={q.short} highlights={q.highlights} />
            </blockquote>
          </div>
        </div>
        <div className="word-card__row word-card__row--full">
          <div>
            <blockquote className="word-card__quote type-caption">
              <Paragraphs text={q.text} highlights={q.highlights} />
            </blockquote>
          </div>
        </div>
        <Attribution q={q} logoClass={logoClass} />
      </div>
    </figure>
  );
}
