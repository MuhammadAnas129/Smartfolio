const brain = require('brain.js');
const dataset = require('../skilldnd/industries.json');

// Create and train the neural network
const net = new brain.NeuralNetwork();
net.train(dataset);

// Function to predict skills for a given industry
export function predictSkills(industry) {
  const output = net.run({ [industry]: 1 });

  // Extract the top skills from the output
  const sortedSkills = Object.entries(output)
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill);

  // Return a random selection of 10 skills
  const randomSkills = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * sortedSkills.length);
    randomSkills.push(sortedSkills[randomIndex]);
  }

  return randomSkills;
}

// // Example usage
// const industry = "Tech";
// const recommendedSkills = predictSkills(industry);
// console.log(`Recommended skills for ${industry}:`, recommendedSkills);
