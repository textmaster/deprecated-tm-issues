# tm-issues

## Deployment

This webapp can easily be deployed using docker. For instance:

```
docker run \
    -p 8080:8080 \
    -e GITHUB_CLIENT_ID=${APP_CLIENT_ID} \
    -e GITHUB_CLIENT_SECRET=${APP_CLIENT_SECRET} \
    -e GITHUB_TARGET_REPO=${GITHUB_ISSUES_REPO} \
    josepot/tm-issues-deploy
```

#### `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
Where `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are the values of the
[github OAuth application](https://github.com/settings/applications/new).
When you create an application is very important to keep in mind that the
`clientId` and the `clientSecret` values are only useful for the
given "authorization callback url" that you provided.

What this means is that once the github user has authorized your app,
github will redirect the user to the "authorization callback url" that you provied.
Which means that you will have to create a different github app per each one of
the environments where you are deploying it.

For instance, lets say that you want to deploy this app under the following url:
"https://issues.staging.textmaster.com". When creating the github app for that environment,
that's the url that should be provided for the "authorization callback url",
therefore when you deploy it you will have to provide the
`clientId` and the `clientSecret` that's linked to that url
through the ENV variables: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

#### `GITHUB_TARGET_REPO`
This ENV variable has to do with the github repo where the issues will be posted to. For instance: if we want the app to post the issues to "https://github.com/txtm/issue", then the value of `GITHUB_TARGET_REPO` would be "txtm/issue".
