import React from 'react';

/**
 * Flat padlock for gated links. Draws in `currentColor`, so it always matches the
 * label of the button it sits in (the 🔒 emoji ignores colour and vanished on pink).
 */
export default function LockIcon({ title = 'Password protected' }) {
  return (
    <svg
      className="lock-icon"
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M7 10V8a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1zm2 0h6V8a3 3 0 0 0-6 0v2z"
      />
    </svg>
  );
}
