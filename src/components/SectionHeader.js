import React from 'react';

/**
 * Title block for a page band. Optional small eyebrow above a display-size title.
 * All type comes from the roles in public/css/fonts.css (.type-caption--accent,
 * .type-display-md); layout is .section-header in src/index.css.
 */
export default function SectionHeader({ eyebrow, title, as: Tag = 'h2' }) {
  return (
    <header className="section-header">
      {eyebrow && <p className="type-caption type-caption--accent section-header__eyebrow">{eyebrow}</p>}
      <Tag className="type-display-md section-header__title">{title}</Tag>
    </header>
  );
}
