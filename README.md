# Contact List

This is a repository for the assessment challenge from the Taroko company.

---

## Presentation

### Main objectives achieved

- [x] - **CRUD** operations for a single contact with API
	- [x] - **C**reate _(POST contact)_ - `/add`
	- [x] - **R**eceive _(GET contact)_ - `/view/{id}`
	- [x] - **U**pdate _(PATCH contact)_ - `/edit/{id}`
	- [x] - **D**estroy _(DELETE contact)_ - in the `/view/{id}` or `/`
- [x] - Sorting the list by first name in:
	- [x] ascending order
	- [x] descending Order
- [x] - Provide an answer for the quiz
- [x] - Create a confirmation for the user which automatically dissapears after
  5 seconds for the following actions:
  - [x] - Add contact
  - [x] - Edit contact
  - [x] - Remove contact
- [ ] - Works on the latests versions of:
	- [x] Chrome (tested on desktop)
	- [x] Firefox (tested on Android mobile and Desktop)
	- [ ] Safari (I don't have access to Safari browser)

### Extra Objectives achieved

- [x] - Add ESLint configuration
- [x] - Use TypeScript
- [x] - Use Sass
	- [x] - Use CSS modules
	- [x] - No usage of CSS libraries, except the list of my own colors
	  `@xeho91/colors`
- [ ] - Use Next.js
- [x] - Validation when entering / editing new contact data _(at the moment,
  based on Browser API & CSS)_
- [ ] - Animations / Transitions:
	- [x] Confirmation Dialog _(appear in)_
	- [ ] Contact List
	- [x] Loader
	- [ ] Transitioning between pages


## Known issues

1. The API adds a new contact based on the array of contacts length.
   So, if the deleted item was not the last contact from the list,
   then adding any further data will replace the last item in the array.

   - The `ContactContext` is saving those deleted IDs and replacing them with
	 newly added contacts. However, on the refresh (page reload), those newly
	 added may be gone, or replacing the existing one. From my observation -
	 the one who has the id of contact list length from the API.

---

## Prerequisites

- Node.JS LTS version _(>=14)_
- [pnpm]

[pnpm]: https://github.com/pnpm/pnpm

### Starting up the project

1. Install `pnpm` globaly, unless you prefer to use a different Node.JS package
   manager.

   ```sh
   npm i -g pnpm
   ```

2. Install the dependencies.

	```sh
	pnpm install

	```

   **NOTE:** You most likely will encounter a problem here.
   One of my package with list of colors is published on GitHub npm packages
   registry.
   To fix it, you can for example use:

   ```sh
   pnpm config set @xeho91:registry https://npm.pkg.github.com
   ```

   Then execute install script again.

3. To start the project in **development** mode, type the following command in
   your terminal:

	```sh
	pnpm dev
	```

   It will host the server on the
   [http://localhost:3000](http://localhost:3000) by default.

4. For building for **production**, type `pnpm build`. You can host a preview of
   the compilation _(by [Vite])_ by using `pnpm serve`.
   Then, by default, go to [http://localhost:5000](http://localhost:5000).

[Vite]: https://github.com/vitejs/vite

### Other scripts for development experience

- `pnpm clean` - it will clean the output _(build)_ directory
- `pnpm check` - it will check for types only _(from JavaScript/TypeScript files)_
- `pnpm lint` - for linting JavaScript source files _(it includes TypeScript or
  React)_ as well as CSS files _(includes SCSS)_
  - `pnpm lint:js` - if you want to lint only the **JavaScript** part _(with ESLint)_
  - `pnpm lint:css` - if you want to lint only the **CSS** part _(with Stylelint)_
- `pnpm format` - it will format the files to maintain consistent coding
  style _(it uses Prettier)_

---

## Answer to the quiz

Go to the [answer.txt](./answer.txt) file.
