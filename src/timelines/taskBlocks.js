// import { pic_trial, preload_trial } from './pic_task';
import { sequences } from './sequences';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

// const sequence_indexes = Array.from(Array(sequences.length).keys());

function createPicTaskBlocks(jsPsych) {
  console.log(jsPsych);
  // TO-DO: Get numBlocks out of trial data.
  // const numBlocks = jsPsych.data.get();

  // const sequences = jsPsych.randomization.sampleWithoutReplacement(sequence_indexes, numBlocks);
  //   jsPsych.data.addProperties({ sequence: random_index + 1 });

  //   const sequence = sequences[random_index];
  //   const preload_trials = preload_trial(sequence);
  //   const pic_trials = pic_trial(sequence);

  return {
    timeline: [createPicTaskBlock(jsPsych)],
    timeline_variables: sequences,
    // sample: {
    //   type: 'custom',
    //   fn: function (t) {
    //     console.log(t);
    //   },
    // },
  };
}
function createPicTaskBlock(jsPsych) {
  console.log(jsPsych);
  // const prompt =
  //   '<p>Rate the image on a scale from -3 (Dislike Very Much) to 3 (Like Very Much).</p>';
  // const choices = ['-3', '-2', '-1', '0', '1', '2', '3'];
  //const type = jsPsychImageButtonResponse;
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="font-size: 48px;">+</p>',
    choices: 'NO_KEYS',
    trial_duration: 1000,
    on_trial_start: function (trial) {
      console.log('on_trial_start', trial);
    },
  };
}
export { createPicTaskBlocks };
