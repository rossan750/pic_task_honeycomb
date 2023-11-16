// import { pic_trial } from './pic_task';
import { sequence_variables } from './sequences';
// import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychImageButtonResponse from '@jspsych/plugin-image-button-response';
import { config } from '../config/main';
import { fixation } from '../trials/fixation';
// import { preload_trial } from './pic_task';
import jsPsychPreload from '@jspsych/plugin-preload';
let imageIndex = 0;

function createPicTaskBlocks(jsPsych, is_practice = false) {
  // TO-DO: Get numBlocks out of trial data.
  // const numBlocks = jsPsych.data.get();

  return {
    timeline: createPicTaskBlock(jsPsych, is_practice),
    timeline_variables: sequence_variables,
    randomize_order: true,
    sample: {
      type: 'without-replacement',
      size: 3,
    },
  };
}
function createPicTaskBlock(jsPsych, is_practice) {
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
    {
      timeline: [
        // Display fixation dot.
        fixation(config),
        // Display pictures and buttons.
        {
          type: jsPsychImageButtonResponse,
          prompt:
            '<p>Rate the image on a scale from -3 (Dislike Very Much) to 3 (Like Very Much).</p>',
          choices: ['-3', '-2', '-1', '0', '1', '2', '3'],
          stimulus: function () {
            console.log(imageIndex);
            const images = jsPsych.timelineVariable('images')[0];
            const image = images[imageIndex];
            return image.stimulus;
            // const stimulus = jsPsych.timelineVariable('stimulus');
            // return stimulus;
          },
          data: { is_practice },
        },
      ],
      timeline_variables: jsPsych.timelineVariable('images')[0],
      loop_function() {
        imageIndex++;
        console.log('loop_function', imageIndex, jsPsych.timelineVariable('images')[0].length);
        // if we've reached the last distractor item, then stop the loop, otherwise continue
        if (imageIndex === jsPsych.timelineVariable('images')[0].length) {
          return false;
        } else {
          return true;
        }
      },
    },
  ];
}
export { createPicTaskBlocks };
