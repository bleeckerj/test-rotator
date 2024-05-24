import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const words = [
  "food", "money", "Hollywood", "vacation", "sports", "work", "jobs", "creativity",
  "retail", "sport", "education", "breakfast", "communication", "war", "organization",
  "family", "domesticity", "government", "judiciary", "community", "cities", "farms",
  "water", "tools", "transportation", "marriage", "dating", "intelligence", "learning",
  "facts", "truth"
];

const TextRotator = () => {
  const rotatorRef = useRef(null);

  useEffect(() => {
    const spans = rotatorRef.current.querySelectorAll('span');
    let duration_in = 0.5; // Duration for the word to animate in
    let pause_time = 1; // Pause time when the word is in place
    let duration_out = 0.5; // Duration for the word to animate out
    let overlap_time = 0; // No overlap

    let x = duration_in + pause_time + duration_out - overlap_time;

    let main = gsap.timeline({ repeat: -1 });

    for (let i = 0; i < spans.length; i++) {
      let delay = i * x;
      let wordTL = gsap.timeline();

      if (i !== 0) {
        wordTL.from(spans[i], { duration: duration_in, yPercent: -100, opacity: 0, ease: 'elastic.out' });
      } else {
        gsap.set(spans[0], { opacity: 1, yPercent: 0 });
      }

      if (i !== spans.length - 1) {
        wordTL.to(spans[i], { duration: duration_out, yPercent: 100, opacity: 0, ease: 'linear', delay: pause_time });
      }

      main.add(wordTL, delay);
    }
  }, []);

  return (
    <div>
      The Future Of..
      <span className="rotator" ref={rotatorRef}>
        {words.map((word, index) => (
          <span key={index}>{word}</span>
        ))}
      </span>
    </div>
  );
};

export default TextRotator;
