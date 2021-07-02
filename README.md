# Contact List

This is a repository for the assessment challenge from the Taroko company.

## Structure explanation

## Prerequisites

- Node.JS LTS version _(>=14)_
- [pnpm]

[pnpm]: https://github.com/pnpm/pnpm

## Starting up the project

1. Install `pnpm` globally, unless you prefer to use a different Node.JS package
   manager.

   ```sh
   npm i -g pnpm
   ```

2. Install the dependencies.

	```sh
	pnpm install

	```

3. To start the project in **development** mode, type the following command in
   your terminal:

	```sh
	pnpm  dev
	```

   It will host the server on the
   [http://localhost:3000](http://localhost:3000) by default.

4. For building for **production**, type `pnpm build`. You can host a preview
   of
   the compilation _(by [Vite])_ by using `pnpm serve`. Then, by default, go to
   [http://localhost:5000](http://localhost:5000).

[Vite]: https://github.com/vitejs/vite

## Other scripts for development experience

- `pnpm clean` - it will clean the output _(build)_ directory
- `pnpm lint` - for linting JavaScript source files _(yes, it includes TypeScript or
  React)_ as well as CSS files _(including SCSS too)_
  - `pnpm lint:js` - if you want to lint only the **JavaScript** part _(with ESLint)_
  - `pnpm lint:css` - if you want to lint only the **CSS** part _(with Stylelint)_
- `pnpm format` - it will format the files to maintain consistent coding
  style _(it uses Prettier)_

## Answer to the quiz

Go to the [answer.txt](./answer.txt) file.
