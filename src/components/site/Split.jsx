import React from 'react';

export default function Split({ as: Tag = 'h2', lines, className = '', style }) {
  let index = 0;
  return (
    <Tag className={`split ${className}`} style={style} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(' ').map((word, wi, words) => (
            <React.Fragment key={wi}>
              <span className="split-word">
                {word.split('').map((ch) => {
                  const i = Math.min(index++, 32);
                  return (
                    <span key={i + ch + index} className="split-char" style={{ '--i': i }}>
                      {ch}
                    </span>
                  );
                })}
              </span>
              {wi < words.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
