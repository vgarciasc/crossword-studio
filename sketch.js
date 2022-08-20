let canvas;
let configs = {};

let dom_cell_position;
let dom_hint;
let dom_separations;
let dom_font_sizes;
let dom_arrows;
let dom_format;
let dom_cw_width;
let dom_cw_height;
let dom_cw_font_size;
let dom_cw_rect_size;
let dom_cw_data;

let cw;

function setup() {
    dom_cell_position = select("#cell-pos");
    dom_hint = select("#cell-hint");
    dom_separations = select("#cell-separations");
    dom_font_sizes = select("#cell-font-sizes");
    dom_arrows = select("#cell-arrows");
    dom_format = select("#cell-format");
    dom_cw_width = select("#cw-width");
    dom_cw_height = select("#cw-height");
    dom_cw_font_size = select("#cw-font-size");
    dom_cw_rect_size = select("#cw-rect-size");
    dom_cw_data = select("#cw-data");

    canvas = createCanvas(100, 100);
    canvas.parent("canvas-holder");
    canvas.mouseClicked(canvasMouseClicked);

    saveBoard();

    // cw = new Crossword(configs);
    // cw.cells[0].hint = "Alimentação preferida dos três tigres tristes | Roeu a roupa do rei de roma";
    // cw.cells[0].seps = [0.6, 0.4]
    // cw.cells[0].arrows = ["->", "-V"];
    // cw.cells[5].hint = "FOOBAZ";
}

function draw() {
    background("white")
    cw.draw()
}

function canvasMouseClicked() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        cw.onClick();
        updatePanel();
    }
}

function updatePanel() {
    if (cw.selected_cell != null) {
        dom_cell_position.html((cw.selected_cell.x + 1) + ", " + (cw.selected_cell.y + 1));
        dom_hint.value(cw.selected_cell.hint);
        dom_separations.value(cw.selected_cell.seps.map((f) => f*100).join(","));
        dom_font_sizes.value(cw.selected_cell.font_sizes.join(","));
        dom_arrows.value(cw.selected_cell.arrows.join(","));
        dom_format.value(cw.selected_cell.format);
    } else {
        dom_cell_position.html("-1, -1");
        dom_hint.value("");
        dom_separations.value("");
        dom_font_sizes.value("");
        dom_arrows.value("");
        dom_format.value("");
    }
}

function savePanel() {
    if (cw.selected_cell != null) {
        cw.selected_cell.hint = dom_hint.value();
        cw.selected_cell.seps = dom_separations.value().split(",").map((f) => parseFloat(f/100));
        cw.selected_cell.font_sizes = dom_font_sizes.value().split(",").map((f) => parseInt(f));
        cw.selected_cell.arrows = dom_arrows.value().split(",");
        cw.selected_cell.format = dom_format.value();
    }
}

function saveBoard() {
    configs = {
        "rect_size": parseInt(dom_cw_rect_size.value()),
        "dimensions": {
            "w": parseInt(dom_cw_width.value()),
            "h": parseInt(dom_cw_height.value())},
        "default_font_size": parseInt(dom_cw_font_size.value()),
    }

    cw = new Crossword(configs);

    resizeCanvas(
        configs["dimensions"]["w"] * configs["rect_size"],
        configs["dimensions"]["h"] * configs["rect_size"]);
}

function updateBoard() {
    dom_cw_data.value(JSON.stringify(cw, null, 2));
}

function loadBoard() {
    cw = JSON.parse(dom_cw_data.value())
    cw.cells = cw.cells.map((f) => Object.assign(new CrosswordCell, f))
    cw = Object.assign(new Crossword, cw)
    resizeCanvas(cw.w * cw.rect_size, cw.h * cw.rect_size);
}