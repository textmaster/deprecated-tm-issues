import R from 'ramda';
import githubRequest from './helpers/github-request';

const OWNER = process.env.GITHUB_REPO_OWNER;
const REPO = process.env.GITHUB_REPO_NAME;

export const getUser = token => githubRequest(token, 'user')
  .then(R.pick(['login', 'name']));

export const isCollaborator = (token, login) =>
  githubRequest(token, `repos/${OWNER}/${REPO}/collaborators/${login}`)
    .then(R.T)
    .catch(R.F);

export const submitIssue = (token, title, type, platform, description) =>
  githubRequest(token, `repos/${OWNER}/${REPO}/issues`, 'POST', {
    title,
    body: `
**Type**: ${type}

**Platform**: ${platform}

**Description**: ${description}`,
  });

export const getUserInfo = token => getUser(token)
  .then(userInfo => Promise.all([
    Promise.resolve(userInfo), isCollaborator(token, userInfo.login),
  ]))
  .then(([userInfo, hasPermission]) => ({
    ...userInfo,
    hasPermission,
    token,
  }));
