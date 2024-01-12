
export const getCurrentTime = () => {
    return new Date().getTime();
  };
export const formatDateForDisplay = (createdAt) => {
    const date = new Date(createdAt);
    const currentTime = getCurrentTime();
    const createdTime = date.getTime();
    const timeDiff = currentTime - createdTime;

    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (timeDiff < 60000) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hour ago`;
    } else if (days === 1) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };