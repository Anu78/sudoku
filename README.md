## React Sudoku Solver

### About this project

This react app aims to create an elegant and minimal sudoku solver that people can use to play the game and learn about solving strategies (in the future). This sudoku app is a part of a bigger project involving more similarly styled games.

### Getting Started

To run this app, you will need to have [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/) installed on your machine. You can check if you have them by running the following commands in your terminal:

```bash
npm -v
node -v
```

If you see the version numbers, you are good to go. If not, you can download them from their respective websites.

Next, you need to build the app by running the following command in the root directory of the project:

```bash
npm run build
```

This will create a `dist` folder with the bundled files.

```bash
npm install --global serve
```

Install the serve package to host the app locally.

Finally, you can serve the app using node by running the following command:

```bash
serve dist
```

This will start a server on port 3000. You can access the app by visiting http://localhost:3000 in your browser.

For development, you can use the following command to start a dev server with hot reloading:

```bash
npm run dev
```

This will also serve the app on port 3000, but it will watch for changes in your source files and reload the browser automatically.

That's it! You are ready to use the app. Enjoy! 😊

### Todo

- [x] Dark mode css + row/col/grid highlight and auto switching
- [x] Custom toast notifications
- [x] Add timer and user solving
- [x] Solving hints (color incorrect numbers red)
- [ ] Error handling/return in solve function
- [ ] Generate puzzles for user to solve
- [ ] Zen mode
- [ ] Finish options form / extra customization
- [ ] Keyboard shortcuts
- [ ] UI refinement and unification

### Contributing

We welcome contributions from anyone who wants to improve this app. Here are some guidelines on how to contribute:

- Fork this repository and clone it to your local machine.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive messages.
- Push your branch to your forked repository and create a pull request to the main repository.
- Wait for the code review and feedback from the maintainers.
- Address any comments or suggestions and update your pull request accordingly.
- Once your pull request is approved and merged, you can delete your branch.

Thank you for your interest in contributing! 🙌
