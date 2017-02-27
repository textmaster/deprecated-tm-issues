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
    labels: [type],
    body: `
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

export const getRelatedIssues = (token, title) => githubRequest(
  token,
  `search/issues?q=${encodeURI(title)}+repo:${OWNER}/${REPO}&sort=created&order=asc`,
).then(R.pipe(
  R.prop('items'),
  R.map(issue => ({
    id: issue.id,
    url: issue.html_url,
    title: issue.title,
    pullRequest: issue.pull_request,
    closedAt: issue.closed_at,
    createdAt: issue.created_at,
    username: issue.user.login,
  })),
));
