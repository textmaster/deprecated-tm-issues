const denodeify = require('denodeify');
const express = require('express');
const fs = require('fs');
const github = require('octonode');
const lodashTemplate = require('lodash.template');
const path = require('path');
const R = require('ramda');
const qs = require('querystring');
const url = require('url');

const qReadFile = denodeify(fs.readFile.bind(fs));

const isProd = process.env.NODE_ENV === 'production';
const env = isProd ? 'prod' : 'dev';
const devSvrPort = process.env.DEV_SVR_PORT || 9999;

const assetsPath = path.join(__dirname, '../public/assets');
const distPath = path.join(__dirname, '../public/dist');
const clientId = process.env.GITHUB_CLIENT_ID;
const targetRepo = process.env.GITHUB_TARGET_REPO;

const authUrl = github.auth.config({
  id: clientId,
  secret: process.env.GITHUB_CLIENT_SECRET,
}).login(['repo', 'user']);

const getPageTemplate = R.once(() =>
  qReadFile(path.join(__dirname, `./index.${env}.ejs`), 'utf8')
    .then(html => lodashTemplate(html)));

const sendIndex = (res, accessToken) => getPageTemplate()
  .then(compiled => compiled({
    filesPrefix: isProd ? '/dist' : `http://127.0.0.1:${devSvrPort}/assets`,
    initialState: `
      <script>
        window.CONTEXT = ${JSON.stringify({
          authUrl,
          accessToken,
          targetRepo,
        })};
      </script>`,
  }))
  .then(html => res.send(html));

const processCallback = (req, res, next) => {
  const uri = url.parse(req.url);
  const { code } = qs.parse(uri.query);

  if (!code) return sendIndex(res);

  return github.auth.login(code, (err, token) => (err ?
    next(err) :
    sendIndex(res, token)));
};

module.exports = (app) => {
  app.use('/assets', express.static(assetsPath));
  app.use('/dist', express.static(distPath));
  app.get('/health', (req, res) => res.send({ status: 'ok' }));
  app.get('*', processCallback);
};
