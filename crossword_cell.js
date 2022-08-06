let TRIANGLE_SIZE = 10;

class CrosswordCell {
    constructor(x, y, hint, seps, font_sizes, arrows, format) {
        this.x = x;
        this.y = y;
        this.hint = hint;
        this.seps = seps;
        this.font_sizes = font_sizes;
        this.arrows = arrows;
        this.format = format;
    }

    draw(cw, is_selected=false) {
        // 1. draw cell
        push()
        if (is_selected) {
            fill("#91bce6")            
        } else if (this.isHovering()) {
            fill("#b2e3f7")
        } else if (this.hint != "") {
            fill("#eeeeee")
        } else {
            noFill()
        }
        rect(0, 0, cw.rect_size, cw.rect_size)

        if (this.format == "/") {
            line(0, cw.rect_size, cw.rect_size, 0)
        } else if (this.format == "\\") {
            line(0, 0, cw.rect_size, cw.rect_size)
        }

        pop();

        // 2. draw text
        let pad = 2;
        let hints = this.hint.split(" | ");
        var curr_y = 0;
        for (var i = 0; i < hints.length; i++) {
            var hint = hints[i];
            textAlign(CENTER, CENTER);
            textSize(this.font_sizes[i]);
            text(hint,
                pad,
                curr_y + pad,
                cw.rect_size - pad,
                this.seps[i] * cw.rect_size - pad);
            curr_y += this.seps[i] * cw.rect_size;
            line(0, curr_y, cw.rect_size, curr_y);
        }
    }

    drawArrows(cw) {
        // 3. draw arrows
        var curr_y = 0;
        for (var i = 0; i < this.arrows.length; i++) {
            var arrow = this.arrows[i];
            
            push()
            fill("black")
            
            if (arrow == "->") {
                translate(cw.rect_size + TRIANGLE_SIZE, (this.seps[i] * cw.rect_size) / 2 + curr_y + TRIANGLE_SIZE / 2)
                rotate(- PI / 2)
            } else if (arrow == "^") {
                translate(cw.rect_size / 2 + TRIANGLE_SIZE / 2, - TRIANGLE_SIZE)
                rotate(PI)
            } else if (arrow == "<-") {
                translate(- TRIANGLE_SIZE, (this.seps[i] * cw.rect_size) / 2 + curr_y - TRIANGLE_SIZE / 2)
                rotate(PI / 2)
            } else if (arrow == "V") {
                translate(cw.rect_size / 2 - TRIANGLE_SIZE / 2, cw.rect_size + TRIANGLE_SIZE)
            } else if (arrow == "V-") {
                translate(- TRIANGLE_SIZE * 2, (this.seps[i] * cw.rect_size) / 2 + curr_y + TRIANGLE_SIZE)
            } else if (arrow == "-V") {
                scale(-1, 1)
                translate(- cw.rect_size - TRIANGLE_SIZE * 2, (this.seps[i] * cw.rect_size) / 3 + curr_y + TRIANGLE_SIZE)
            } else if (arrow == "^-") {
                scale(-1, 1)
                translate(TRIANGLE_SIZE * 2, (this.seps[i] * cw.rect_size) / 2 + curr_y- TRIANGLE_SIZE)
                rotate(PI)
            } else if (arrow == "-^") {
                translate(cw.rect_size + TRIANGLE_SIZE * 2, (this.seps[i] * cw.rect_size) / 2 + curr_y- TRIANGLE_SIZE)
                rotate(PI)
            } else if (arrow == "<-|") {
                translate(cw.rect_size / 2 - TRIANGLE_SIZE, - 2 * TRIANGLE_SIZE)
                rotate(PI / 2)
            } else if (arrow == "|->") {
                scale(-1, 1)
                translate(- cw.rect_size / 2 - TRIANGLE_SIZE / 2, - 2 * TRIANGLE_SIZE)
                rotate(PI / 2)
            } else if (arrow == "<_|") {
                scale(1, -1)
                translate(cw.rect_size / 2 - TRIANGLE_SIZE, - cw.rect_size - 2 * TRIANGLE_SIZE)
                rotate(PI / 2)
            } else if (arrow == "|_>") {
                scale(-1, -1)
                translate(- cw.rect_size / 2 - TRIANGLE_SIZE / 2, - cw.rect_size - 2 * TRIANGLE_SIZE)
                rotate(PI / 2)
            }

            if (["->", "^", "<-", "V"].includes(arrow)) {
                line(TRIANGLE_SIZE / 2, - TRIANGLE_SIZE, TRIANGLE_SIZE / 2, 0)
                triangle(0, 0, TRIANGLE_SIZE, 0, TRIANGLE_SIZE / 2, TRIANGLE_SIZE)
            } else if (["V-", "-V", "^-", "-^", "<-|", "|->", "<_|", "|_>"].includes(arrow)) {
                line(TRIANGLE_SIZE / 2, - TRIANGLE_SIZE, TRIANGLE_SIZE * 2, - TRIANGLE_SIZE)
                line(TRIANGLE_SIZE / 2, - TRIANGLE_SIZE, TRIANGLE_SIZE / 2, 0)
                triangle(0, 0, TRIANGLE_SIZE, 0, TRIANGLE_SIZE / 2, TRIANGLE_SIZE)
            }

            pop()
            curr_y += this.seps[i] * cw.rect_size;
        }
    }

    isHovering() {
        return mouseX > this.x * cw.rect_size && mouseX < (this.x + 1) * cw.rect_size
            && mouseY > this.y * cw.rect_size && mouseY < (this.y + 1) * cw.rect_size;
    }
}