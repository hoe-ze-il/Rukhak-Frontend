const trim = (str) => {
  // Trim extra whitespace within the string
  return str.replace(/\s+/g, " ").trim();
};

export { trim };
