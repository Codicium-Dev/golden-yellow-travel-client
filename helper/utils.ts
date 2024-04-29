export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  const intervals: Record<string, number> = {
    year: 31536000, // seconds in a non-leap year
    month: 2592000, // 30 days
    day: 86400, // 24 hours
    hour: 3600, // 60 minutes
    minute: 60, // 60 seconds
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const timeDiff = Math.floor(diffInSeconds / secondsInUnit);

    if (timeDiff >= 1) {
      return `${timeDiff} ${unit}${timeDiff !== 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};
