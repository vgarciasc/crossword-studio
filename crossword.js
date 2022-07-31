class Crossword {
    constructor(configs) {
        this.configs = configs;

        if (configs) {
            this.updateDimensions(
                configs["dimensions"]["w"], 
                configs["dimensions"]["h"])
            this.rect_size = configs["rect_size"];
            this.font = configs["font"];
        }
    }

    updateDimensions(w, h) {
        this.w = w
        this.h = h

        this.cells = []
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                let cell = new CrosswordCell(i, j, "", [1], [configs["default_font_size"]], [], "");
                this.cells.push(cell);
            }
        }

        this.selected_cell = null;
    }

    draw() {
        for (var cell of this.cells) {
            push()
            translate(cell.x * this.rect_size, cell.y * this.rect_size)
            cell.draw(this, cell == this.selected_cell);
            pop()
        }

        for (var cell of this.cells) {
            push()
            translate(cell.x * this.rect_size, cell.y * this.rect_size)
            cell.drawArrows(this);
            pop()
        }

        push()
        strokeWeight(1)
        noFill()
        rect(2, 2, this.w * this.rect_size - 4, this.h * this.rect_size - 4)
        pop()
    }

    onClick() {
        for (var cell of this.cells) {
            if (cell.isHovering()) {
                if (this.selected_cell == cell) {
                    this.selected_cell = null;
                } else {
                    this.selected_cell = cell;
                }
            }
        }
    }
}