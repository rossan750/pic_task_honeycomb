// import { pic_trial } from './pic_task';
import { sequence_variables } from './sequences';
// import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychImageButtonResponse from '@jspsych/plugin-image-button-response';
import jsPsychPreload from '@jspsych/plugin-preload';
import { config } from '../config/main';
import { fixation } from '../trials/fixation';

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
  const pic_task = {};
  const fixation_trial = fixation(config);
  console.log(fixation_trial, pic_task);
  return [
    {
      type: jsPsychPreload,
      show_detailed_errors: true,
      continue_after_error: true,
      on_error: (img) => console.log('error loading', img),
      images: function () {
        const sequence = jsPsych.timelineVariable('images')[0];
        return sequence.map(({ stimulus }) => stimulus);
      },
      data: { sequence_number: jsPsych.timelineVariable('sequence') },
      // trials: [
    },
    {
      timeline: [
        // Display fixation dot.
        fixation_trial,
        // Display pictures and buttons.
        {
          type: jsPsychImageButtonResponse,
          prompt:
            '<p>Rate the image on a scale from -3 (Dislike Very Much) to 3 (Like Very Much).</p>',
          choices: ['-3', '-2', '-1', '0', '1', '2', '3'],
          stimulus: function () {
            // const stimulus = jsPsych.timelineVariable('stimulus');
            // console.log('stimulus', stimulus, jsPsych.getAllTimelineVariables());
            // return stimulus;
            console.log(jsPsych.getAllTimelineVariables());
            // TO-DO: Get stimulus out of timeline_variables.
          },
          data: { is_practice },
        },
      ],
      timeline_variables: jsPsych.timelineVariable('images'),
    },
  ];
  // }
  // ];
}
export { createPicTaskBlocks };

// TO-DO: Add trials field to preload task, which runs pic_task.
