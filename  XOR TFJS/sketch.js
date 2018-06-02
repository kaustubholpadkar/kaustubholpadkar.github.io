var X = [[0,0],[0,1],[1,0],[1,1]]
var Y = [[0],[1],[1],[0]]

const xs = tf.tensor2d(X)
const ys = tf.tensor2d(Y)

const deep_model = tf.sequential()
deep_model.add(tf.layers.dense({units:8, inputShape:2, activation: 'tanh'}))
deep_model.add(tf.layers.dense({units:1, activation: 'sigmoid'}))
deep_model.compile({optimizer: 'sgd', loss: 'binaryCrossentropy', lr:0.1})

async function train () {
  await deep_model.fit(xs, ys, {
    batchSize: 1,
    epochs: 1
  })
}

var iteration = 0

function setup () {
  // setInterval(train, 5)
  createCanvas(400, 400)
}

function draw () {
  background(51)

  fill(255)
  stroke(251)
  textSize(25)

  text('XOR', 50, 50)

  stroke(51)

  tf.tidy(() => {
    train()
  });

  text('Iteration : ' + iteration++, 50, 100)
  text('No of Tensors : ' + tf.memory().numTensors, 50, 150)

  textSize(20)

  tf.tidy(() => {
    const yy = deep_model.predict(xs)
    text('Prediction : \n\n\t' + yy, 50, 200)
    yy.dispose()
  });

  // Check Memory Leak
  console.log(tf.memory().numTensors);
}
