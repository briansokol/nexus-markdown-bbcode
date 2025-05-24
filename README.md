# Nexus Markdown to BBCode Editor

Allows one to type or import a markdown file and export BBCode suitable for use on Nexus Mods.

This was created to assist with the editing of mod pages for Community Shaders. Styles are hardcoded for that project. Future plans include making styles customizable.

The project builds to a single HTML file that can be run independently in any browser.

## Tech Stack

The app is written with React and TypeScript. It is compiled with Vite.

## Local Development

1. Check out the repository.
2. Make sure you have the correct version of Node installed (Check package.json's "engines" property).
3. Install dependencies with `npm install`.
4. Use the commands below to run the app.

## NPM Commands

Run the project locally in dev mode:

```bash
npm run dev
```

Build the app for distribution (Output will be in the _dist/_ directory):

```bash
npm run build
```

Lint the app for errors with ESLint:

```bash
npm run lint
```

Format code with Prettier:

```bash
npm run format
```
