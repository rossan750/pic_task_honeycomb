import { pic_trial } from './pic_task';
import { sequence_variables } from './sequences';
import jsPsychPreload from '@jspsych/plugin-preload';

function createPicTaskBlocks(jsPsych, is_practice = false) {
  // TO-DO: Get numBlocks out of trial data.
  // const numBlocks = jsPsych.data.get();

  return {
    timeline: createPicTaskBlock(jsPsych, is_practice),
    timeline_variables: sequence_variables,
    randomize_order: true,
  };
}
function createPicTaskBlock(jsPsych, is_practice) {
  // Keep track of image index inside images array.
  const pic_trials = pic_trial(jsPsych, is_practice);
  return [
    {
      // Trial to preload the 96 stimulus images
      type: jsPsychPreload,
      show_detailed_errors: true,
      continue_after_error: true,
      on_error: (img) => console.log('error loading', img),
      images: function () {
        const sequence = jsPsych.timelineVariable('images')[0];
        return sequence.map(({ stimulus }) => stimulus);
      },
      data: { sequence_number: jsPsych.timelineVariable('sequence') },
    },
    pic_trials,
  ];
}
export { createPicTaskBlocks };
