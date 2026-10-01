export const QUERY_KEYS = {
  AUTH: "auth",
  FETCH_REPOSITORIES: "fetch-repos",
  QUERY_REPOSITORY: "query-repo",
};

export const CODE_MESSAGES = {
  INCOMPLETE_FIELDS: "fields.incomplete",
  USER_NOT_FOUND: "user.notFound",
  INCORRECT_PASSWORD: "password.incorrect",
  REPOSITORY_NOT_FOUND: "repository.notFound",

  USER_REGISTERED: "user.registered",
  LOGIN_SUCCESSFUL: "auth.loginSuccessful",
  LOGOUT_SUCCESSFUL: "auth.logoutSuccessful",
  REPOSITORY_QUEUED: "repository.queued",
};

export const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
