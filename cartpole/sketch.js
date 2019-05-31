// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

// module aliases

var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites;

var engine;
var world;

var ground;

var cartPole;
var gameOverred = false;
var delay;

const TOTAL = 100;
const MUTATION_RATE = 0.1;

let population = [];
let savedParticles = [];

let generationCount = 0;
let speedSlider;


function createDOM() {
    createElement("br");
    createElement("span", "Speed: ");
    speedSlider = createSlider(1, 10, 1);
}


function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    createDOM();

    tf.setBackend('cpu');
    smooth();
    frameRate(190);

    for (let i = 0; i < TOTAL; i++) {
        population[i] = new CartPole();
    }
}


function draw() {

    const cycles = speedSlider.value();

    background(150);

    //

    let bestB = population[0];

    for (let n = 0; n < cycles; n++) {

        for (let cartPole of population) {
            cartPole.updateEngine();
            cartPole.check();
            cartPole.look();
            cartPole.move();
            cartPole.show();

            // Get the best one
            if (cartPole.fitness > bestB.fitness) {
                bestB = cartPole;
            }
        }

        // bestB.show();

        for (let i = population.length - 1; i >= 0; i--) {
            const cartPole = population[i];
            if (cartPole.dead) {
                savedParticles.push(population.splice(i, 1)[0]);
            }
        }

        if (population.length === 0) {
            nextGeneration();
            generationCount++;
        }

        fill(255);
        text('generation ' + generationCount, 30, 50);
        text("score: " + bestB.score, 30, 65);

    }
}
