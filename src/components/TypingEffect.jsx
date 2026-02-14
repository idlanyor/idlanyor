import { useState, useEffect } from 'react';

const TypingEffect = ({ texts, speed = 100, waitTime = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentFullText = texts[currentIndex];

    if (!isDeleting && displayText === currentFullText) {
      timeout = setTimeout(() => setIsDeleting(true), waitTime);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev => 
          isDeleting 
            ? currentFullText.substring(0, prev.length - 1)
            : currentFullText.substring(0, prev.length + 1)
        );
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed, waitTime]);

  return (
    <span className="relative">
      {displayText}
      <span className="ml-1 inline-block w-1 h-[0.8em] bg-blue-500 animate-pulse"></span>
    </span>
  );
};

export default TypingEffect;
