// var canvas_width = 400
// var canvas_height = 400

const learning_rate = 0.1
const xs = tf.tensor2d([[0,0],[0,1],[1,0],[1,1]])
const ys = tf.tensor2d([[0],[1],[1],[0]])

var deep_model

function setup () {
  deep_model = createModel (learning_rate)
  // createCanvas(canvas_width, canvas_height)
}

function draw () {
  // background(51)

  tf.tidy(() => {
    train()
  });
  // Check Memory Leak
  console.log(tf.memory().numTensors);
}


// TensorFlow Functions

function createModel (learning_rate = 0.1) {
  let model = tf.sequential()

  model.add(tf.layers.dense({units:8, inputShape:2, activation: 'tanh'}))
  model.add(tf.layers.dense({units:1, activation: 'sigmoid'}))

  model.compile({optimizer: 'sgd', loss: 'binaryCrossentropy', lr:learning_rate})
  return model
}

async function train () {
  await deep_model.fit(xs, ys, {
    batchSize: 1,
    epochs: 1
  })
  const prediction = deep_model.predict(xs)
  prediction.print()
  prediction.dispose()
}
