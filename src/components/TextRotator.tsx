// src/components/TextRotator.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const words = [
  "food", "money", "Hollywood", "vacation", "sports", "work", "jobs", "creativity",
  "retail", "sport", "education", "breakfast", "communication", "war", "organization",
  "family", "domesticity", "government", "judiciary", "community", "cities", "farms",
  "water", "tools", "transportation", "marriage", "dating", "intelligence", "learning",
  "facts", "truth", "healthcare", "technology", "science", "religion", "music", "art",
  "literature", "politics", "philosophy", "environment", "energy", "fashion", "media",
  "fitness", "social media", "tourism", "law", "architecture", "innovation", "finance",
  "investment", "entrepreneurship", "manufacturing", "construction", "real estate",
  "marketing", "advertising", "journalism", "publishing", "design", "research", "charity",
  "volunteering", "diplomacy", "ethics", "culture", "history", "philanthropy", "gaming",
  "entertainment", "agriculture", "hospitality", "nutrition", "wellness", "psychology",
  "sociology", "cosmetics", "spirituality", "biotechnology", "robotics", "shipping",
  "banking", "retirement", "investing", "cookware", "coffee", "restaurants", "insurance",
  "e-commerce", "logistics", "telecommunications", "automotive", "pharmaceuticals",
  "aerospace", "defense", "fisheries", "forestry", "mining", "petroleum", "consulting",
  "venture capital", "existence", "death", "meditation", "mediation", "prayer", "cults",
  "belief", "faith", "morality", "consciousness", "mindfulness", "afterlife", "soul",
  "wisdom", "meaning", "nirvana", "enlightenment", "karma", "destiny", "fate", "inner peace",
  "self-awareness", "transcendence", "cleaning", "shopping", "waking up", "lounging",
  "entertaining", "dinner parties", "school lunch", "cooking dinner", "raising children",
  "pets", "furniture", "eating", "walking", "jogging", "working out", "water", "gardening",
  "laundry", "bathing", "grocery shopping", "reading", "sleeping", "commuting", "baking",
  "watching TV"
];

const TextRotator = () => {
  const rotatorRef = useRef(null);

  useEffect(() => {
    // Shuffle function using Fisher-Yates algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Shuffle words
    shuffleArray(words);

    // Generate HTML for words
    const wordContainer = rotatorRef.current;
    wordContainer.innerHTML = ''; // Clear existing content
    words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word;
      wordContainer.appendChild(span);
    });

    // GSAP animation
    let main = gsap.timeline({ repeat: -1 });

    const spanElements = wordContainer.querySelectorAll('span');
    for (let i = 0; i < spanElements.length; i++) {
      let delay = i * 3.0; // Adjust the delay to allow for proper sequencing
      let wordTL = gsap.timeline();

      if (i !== 0) {
        wordTL.from(spanElements[i], { duration: 0.5, yPercent: -100, opacity: 0, ease: 'elastic.out' });
      } else {
        gsap.set(spanElements[0], { opacity: 1, yPercent: 0 });
      }

      if (i !== spanElements.length - 1) {
        wordTL.to(spanElements[i], { duration: 0.5, yPercent: 100, opacity: 0, ease: 'elastic.in', delay: 2 });
      }

      main.add(wordTL, delay);
    }
  }, []);

  return (
    <div>
      <span style={{ fontFamily: 'Newake', fontSize: '1em' }} className="text-green-400">Never of...</span>
      <span style={{ fontFamily: 'Newake', fontSize: '1em' }} className="rotator text-green-400" ref={rotatorRef}></span>
    </div>
  );
};

export default TextRotator;
