# tm-issues

## Deployment

This webapp can easily be deployed using docker. For instance:

```
docker run \
    -p 8080:8080 \
    -e GITHUB_CLIENT_ID=${APP_CLIENT_ID} \
    -e GITHUB_CLIENT_SECRET=${APP_CLIENT_SECRET} \
    -e GITHUB_REPO_OWNER=${GITHUB_HANDLER} \
    -e GITHUB_REPO_NAME=${GITHUB_REPO_NAME} \
    josepot/tm-issues npm run build-and-run-prod
```

#### `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
Where `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are the values of the [github OAuth application](https://github.com/settings/applications/new). When you create an application is very important to remember that the `clientId` and the `clientSecret` values are only useful for the "authorization callback url" that you provided. What this means is that once the user has authorized your github app to access the github scope that your app have requested, github will redirect the user to the "authorization callback url" of the app. Which means that you will have to create a different github app per each one of the environments that you want to deploy it.

For instance, lets say that you want to deploy this app into an environment that will be serving it from: "https://issues.staging.textmaster.com". When creating the github app for that environment, that's the url that should be provided for the "authorization callback url" and when deploying it with docker you will have to provide the `clientId` and the `clientSecret` through the ENV variables: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

#### `GITHUB_REPO_OWNER` and `GITHUB_REPO_NAME`
The other ENV variables have to do with the github repo where the issues will be posted to. For instance: if we want the app to post the issues to "https://github.com/txtm/issue", then the value of `GITHUB_REPO_OWNER` would be "txtm" and the value of `GITHUB_REPO_NAME` would be "issue".
