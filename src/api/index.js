import R from 'ramda';
import githubRequest from './helpers/github-request';

export const getUser = token => githubRequest(token, 'user')
  .then(R.pick(['login', 'name']));

const isCollaborator = (token, targetRepo, login) =>
  githubRequest(token, `repos/${targetRepo}/collaborators/${login}`)
    .then(R.T)
    .catch(R.F);

export const submitIssue = (
  token, targetRepo, title, type, audience, priority, platform, description,
) =>
  githubRequest(token, `repos/${targetRepo}/issues`, 'POST', {
    title,
    body: `
## Type:
${type}

## Audience:
${audience}

## Priority:
${priority}

## Platform:
${platform}

## Description:
${description}`,
  });

export const getUserInfo = (token, targetRepo) => getUser(token)
  .then(userInfo => Promise.all([
    Promise.resolve(userInfo), isCollaborator(token, targetRepo, userInfo.login),
  ]))
  .then(([userInfo, hasPermission]) => ({
    ...userInfo,
    hasPermission,
    token,
  }));

export const getRelatedIssues = (token, targetRepo, title) => githubRequest(
  token,
  `search/issues?q=${encodeURI(title)}+repo:${targetRepo}&sort=created&order=asc`,
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
