const authValidators = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_REGEX: /^[a-zA-Z ]+$/,
  CAPITAL_LETTER_REGEX: /[A-Z]/,
  LOWERCASE_LETTER_REGEX: /[a-z]/,
  SPECIAL_CHARACTER_REGEX: /[!@#$]/,
  SPACE_START_END_REGEX: /^\s|\s$/,
  PASSWORD_NUMBER_REGEX: /.*\d.*/,
  PHONE_NUMBER_REGEX: /^[0-9]+$/,
};

export default authValidators;
