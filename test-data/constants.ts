/** Centralized constants for the ParaBank test suite. */

/** URL path patterns used across expect(page).toHaveURL(...) assertions. */
export const URL_PATTERNS = {
  LOGIN: /login\.htm/,
  OVERVIEW: /overview\.htm/,
  REGISTER: /register\.htm/,
};

/** Expected error/validation text, matched exactly against the live app's copy. */
export const ERROR_MESSAGES = {
  INVALID_LOGIN: 'The username and password could not be verified.',
  PASSWORD_MISMATCH: 'Passwords did not match',
  DUPLICATE_USERNAME: 'This username already exists.',
  BALANCE_NOTE: '*Balance includes deposits that may be subject to holds',
  FIRST_NAME_REQUIRED: 'First name is required.',
  LAST_NAME_REQUIRED: 'Last name is required.',
  ADDRESS_REQUIRED: 'Address is required.',
  CITY_REQUIRED: 'City is required.',
  STATE_REQUIRED: 'State is required.',
  ZIPCODE_REQUIRED: 'Zip Code is required.',
  SSN_REQUIRED: 'Social Security Number is required.',
  USERNAME_REQUIRED: 'Username is required.',
  PASSWORD_REQUIRED: 'Password is required.',
  CONFIRM_PASSWORD_REQUIRED: 'Password confirmation is required.',
};

/** Regex pattern to detect database error messages in the UI. */
export const DB_ERROR_LEAK_PATTERN = /SQL syntax|SQLException|ORA-\d+|mysql_fetch|ODBC/i;

/** Hardcoded input data for negative-path tests (deliberately invalid). */
export const NEGATIVE_TEST_DATA = {
  /** TC_005 — combined invalid username + invalid password */
  INVALID_USERNAME: 'wronguser123',
  INVALID_PASSWORD: 'wrongpass',

  /** TC_006 — valid registration, mismatched confirm-password field */
  MISMATCHED_CONFIRM_PASSWORD: 'DifferentPass@999',

  /** TC_010 — empty login submission */
  EMPTY_USERNAME: '',
  EMPTY_PASSWORD: '',

  /** TC_012 — classic SQL injection payload in the username field */
  SQL_INJECTION_USERNAME: "' OR '1'='1",
  SQL_INJECTION_PASSWORD: 'test123',
};
