//Delcare Global Variables
var s;
var food;

const TOTAL = 2000;
const MUTATION_RATE = 0.05;

let snake = null;
let population = [];
let savedParticles = [];

let highscore = 0;
let generationCount = 0;
let speedSlider;

let increaseMut;
let decreaseMut;

// p5js Setup function - required

function createDOM() {
    increaseMut = createButton("+");
    increaseMut.position(345,85,18,18);
    increaseMut.mousePressed(() => {mutationRate *= 2});
    decreaseMut = createButton("-");
    decreaseMut.position(370,85,18,18);
    decreaseMut.mousePressed(() => {mutationRate /= 2});
    createElement("br");
    createElement("span", "Speed: ");
    speedSlider = createSlider(1, 10, 1);
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    createDOM();
    // frameRate(120);

    tf.setBackend('cpu');
    // background(51);

    // for (let i = 0; i < TOTAL; i++) {
    //     population[i] = new Snake();
    // }

    if(humanPlaying) {
        snake = new Snake();
    } else {
        population = new Population(TOTAL); //adjust size of population
    }
}

// p5js Draw function - required

// function draw() {
//     const cycles = speedSlider.value();
//
//
//     let bestB = population[0];
//
//     for (let n = 0; n < cycles; n++) {
//
//         background(51);
//
//         for (let snake of population) {
//             if (snake.eat()) {
//                 snake.pickLocation();
//             }
//             snake.death();
//             snake.look();
//             snake.move();
//             snake.update();
//             // snake.show();
//
//             // Get the best one
//             if (snake.fitness > bestB.fitness) {
//                 bestB = snake;
//             }
//
//             scoreboard(bestB)
//         }
//
//         bestB.show();
//
//         for (let i = population.length - 1; i >= 0; i--) {
//             const snake = population[i];
//             if (snake.dead) {
//                 savedParticles.push(population.splice(i, 1)[0]);
//             }
//         }
//
//         if (population.length === 0) {
//             nextGeneration();
//             generationCount++;
//         }
//
//         fill(255);
//         text('generation ' + generationCount, 10, 50);
//         text("score: " + bestB.score, 10, 65);
//
//     }
//
//     //
//
//
//     // scoreboard();
//     // if (s.eat()) {
//     //     s.pickLocation();
//     // }
//     // s.death();
//     // s.look();
//     // s.move();
//     // s.update();
//     // s.show();
//
// }


function draw() {
    const cycles = speedSlider.value();

    // textFont(font);
    if(humanPlaying) {
        snake.move();
        snake.show();
        fill(150);
        textSize(20);
        text("SCORE : "+snake.score,500,50);
        if(snake.dead) {
            snake = new Snake();
        }
    } else {
        if(!modelLoaded) {
            for (let kk=0; kk < cycles; kk++) {
                // push();
                background(51);
                noFill();
                stroke(255);
                line(400,0,400,height);
                rectMode(CORNER);
                rect(400 + SIZE,SIZE,width-400-40,height-40);
                if(population.done()) {
                    highscore = population.bestSnake.score;
                    population.calculateFitness();
                    population.naturalSelection();
                } else {
                    population.update();
                    population.show();
                }

                fill(150);
                textSize(21);
                textAlign(LEFT);
                text("GEN : "+population.gen,105,60);
                //text("BEST FITNESS : "+pop.bestFitness,120,50);
                //text("MOVES LEFT : "+pop.bestSnake.lifeLeft,120,70);
                text("MUTATION RATE : "+mutationRate*100+"%",105,90);
                text("SCORE : "+population.bestSnake.score,105,height-45);
                text("HIGHSCORE : "+highscore,105,height-15);
                // pop();
            }

            // increaseMut.show();
            // decreaseMut.show();
        } else {
            model.look();
            model.think();
            model.move();
            model.show();
            model.brain.show(0,0,360,790,model.vision, model.decision);
            if(model.dead) {
                let newmodel = new Snake();
                newmodel.brain = model.brain.clone();
                model = newmodel;

            }
            textSize(25);
            fill(150);
            textAlign(LEFT);
            text("SCORE : "+model.score,120,height-45);
        }
        textAlign(LEFT);
        textSize(18);
        fill(255,0,0);
        text("RED < 0",120,height-75);
        fill(0,0,255);
        text("BLUE > 0",200,height-75);
        // graphButton.show();
        // loadButton.show();
        // saveButton.show();
    }

}


// scoreboard

function scoreboard(snake) {
    fill(0);
    rect(0, 600, 600, 40);
    fill(255);
    textFont("Georgia");
    textSize(18);
    text("Score: ", 10, 625);
    text(snake.score, 70, 625);
}

// CONTROLS function

// function keyPressed() {
//     if (keyCode === UP_ARROW){
//         s.dir(0, -1);
//     }else if (keyCode === DOWN_ARROW) {
//         s.dir(0, 1);
//     }else if (keyCode === RIGHT_ARROW) {
//         s.dir (1, 0);
//     }else if (keyCode === LEFT_ARROW) {
//         s.dir (-1, 0);
//     }
// }


function keyPressed() {
    if(humanPlaying) {
        switch(keyCode) {
            case UP_ARROW:
                snake.moveUp();
                break;
            case DOWN_ARROW:
                snake.moveDown();
                break;
            case LEFT_ARROW:
                snake.moveLeft();
                break;
            case RIGHT_ARROW:
                snake.moveRight();
                break;
        }
    }
}