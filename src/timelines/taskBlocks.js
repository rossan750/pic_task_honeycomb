// import { pic_trial, preload_trial } from './pic_task';
import { sequences } from './sequences';

const sequence_indexes = Array.from(Array(sequences.length).keys());

function createPicTaskBlocks(jsPsych) {
  // TO-DO: Get numBlocks out of trial data.
  const numBlocks = jsPsych.data.getLastTrialData();
  //   const random_index = sequence_indexes.splice(
  //     Math.floor(Math.random() * sequence_indexes.length),
  //     1
  //   )[0];
  const sequences = jsPsych.randomization.sampleWithoutReplacement(sequence_indexes, 2);
  console.log(sequences, numBlocks);
  //   jsPsych.data.addProperties({ sequence: random_index + 1 });
  //   const sequence = sequences[random_index];
  //   const preload_trials = preload_trial(sequence);
  //   const pic_trials = pic_trial(sequence);

  return [];
}

export { createPicTaskBlocks };
