import readingTime from "reading-time";

export function calculateReadingTime(content: string) {
  const stats = readingTime(content, {
    wordsPerMinute: 225,
  });

  return {
    minutes: Math.ceil(stats.minutes),
    words: stats.words,
    text: `${Math.ceil(stats.minutes)} min read`,
  };
}
