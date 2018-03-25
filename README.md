# crypto-portfolio

web tools to track cypto investments over time

### How to Contribute

#### Run the Development Server

The `npm run dev` script starts a dev server with hot reloading enabled.

```bash
# make sure you have the latest source code
git pull origin master
# install development dependencies
npm install --save-dev
# run the dev server on port 3700
npm run dev
```

Once the dev-server is running, navigate to http://localhost:3700 in your web browser.

#### Run the Build

```bash
npm run build
```

#### Deploy to GH Pages

After adding and committing changes to master

```bash
git checkout master
git pull
git subtree push --prefix dist origin gh-pages
```
