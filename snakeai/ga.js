function nextGeneration() {
  console.log('next generation');
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    population[i] = pickOne();
    console.log("there", population[i].brain.hidden_nodes1, population[i].brain.e)
  }
  for (let i = 0; i < TOTAL; i++) {
    savedParticles[i].dispose();
  }
  savedParticles = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedParticles[index].fitness;
    index++;
  }
  index--;
  let particle = savedParticles[index];
  console.log("particle.brain", particle.brain.hidden_nodes1)
  let child = new Snake(particle.brain);
  console.log("child", child.brain.hidden_nodes1);
  child.mutate();
  return child;
}

function calculateFitness(target) {
  for (let particle of savedParticles) {
    particle.calculateFitness();
  }
  // Normalize all values
  let sum = 0;
  for (let particle of savedParticles) {
    sum += particle.fitness;
  }
  for (let particle of savedParticles) {
    particle.fitness = particle.fitness / sum;
  }
}
