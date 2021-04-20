# quiz-app

Basic trivia game.

## Dependencies

- HTML
- SCSS
- JS
- Axios
- Google Fonts
- [Open Trivia DB](https://opentdb.com/)

## Getting started

1. Fork the repo
2. Make sure you have Sass installed globally `npm i -g sass`
3. Begin watching the .scss file `sass index.scss index.css --watch`

## Game Structure

User selects options - subject and difficulty - from the menu on top, each click sends a request to OTDB. The API response is initialized into a quiz using the Quiz class. Gameplay uses the methods found in the quiz and question classes. Following completion of the quiz, user sees a summary of the questions and can either choose a new quiz or try again.

## Known Bugs

There is an issue with the text encoding from the database. Currently, apostrophes and other special characters aren't gettting decoded properly.

## Thanks

Thank you to my friends who tried out the app and gave feedback. Thank you Chris Smith for the animation inspiration. Thank _you_ for checking out this project!
