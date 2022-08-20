# crossword-studio
A simple web tool for making swedish-style crosswords. Access [here](https://vgarciasc.github.io/crossword-studio).

![](https://i.imgur.com/njdAjMy.png)

## Usage

### Board settings

Menu for setting up the entire crossword. Should only be toyed with at the beginning, since **saving these settings will reset the entire crossword**!!

- **Width, height**: dimensions of the crossword (usually, 11x16).
- **Default font size**: default font size for the entire crossword.
- **Rectangle size**: size (in pixels) for each cell in the crossword.

### Cell details

Menu for constructing the crossword, one cell at a time.

- **Position**: position of the cell in the crossword (read-only)
- **Hint**: text to be displayed in the cell. If you want to display more than one hint in a single cell, use the pipe (` | `) to separate each hint.
  - Example: "`Hint A | Hint B`" represents two hints. However, they won't both immediately be visible -- you still need to configure the size of each hint in "Separations".
- **Separations**: the percentage of space taken by each hint. By default, its value is `100`: 100% of the space is taken by a single hint. However, when displaying multiple hints in the same cell, configuration is necessary.
  - Example: "`60, 40`" means that the first hint will occupy 60% of the cell space, and the second hint will occupy 40%.
  - Example: "`30, 30, 40`" means three hints occupying 30%, 30% and 40% respectively.
- **Font sizes**: defines the font size for each hint.
  - Example: "`11, 12`" means that the first hint will have 11 font size, and the second one will have 12.
- **Arrows**: a list of which arrows to display in the current cell. See image below.

| Direct arrows |    | Corner arrows (clockwise) |      | Corner arrows (counterclockwise) |      | Diagonal arrows |    |
|---------------|----|---------------------------|------|----------------------------------|------|-----------------|----|
| Up            | ^  | Left up                   | ^-   | Up left                          | <-\| | Upper left      | ^\ |
| Down          | V  | Up right                  | \|-> | Left down                        | V-   | Lower left      | V/ |
| Left          | <- | Right down                | -V   | Down right                       | \|_> | Upper right     | /^ |
| Right         | -> | Down left                 | <_\| | Right up                         | -^   | Lower right     | \V |

![](https://i.imgur.com/NaOwLBr.png)

- **Cell format**: can be empty, "`\`" or "`/`" (useful for double-letter cells).

![](https://i.imgur.com/w8nytgY.png)

### Importing & Exporting

Menu for saving and uploading crosswords.

- **Update**: updates the text area with the JSON representation of the current crossword.
