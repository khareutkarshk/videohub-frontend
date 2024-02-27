export const timeAgo = (timestamp: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
  
  const intervals = [
      { value: 31536000, label: 'year' },
      { value: 2592000, label: 'month' },
      { value: 86400, label: 'day' },
      { value: 3600, label: 'hour' },
      { value: 60, label: 'minute' },
  ];

  for (let i = 0; i < intervals.length; i++) {
      const interval = Math.floor(seconds / intervals[i].value);
      if (interval >= 1) {
          if (intervals[i].label === 'minute' && interval >= 60) {
              continue;
          }
          if (intervals[i].label === 'day' && interval >= 1) {
              const date = new Date(timestamp);
              const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
              return date.toLocaleDateString('en-US', options);
          }
          return `${interval} ${intervals[i].label}${interval > 1 ? 's' : ''} ago`;
      }
  }

  return `Just Now`;
};