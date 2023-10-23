// import { pic_trial, preload_trial } from './pic_task';
import { sequence_variables } from './sequences';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychImageButtonResponse from '@jspsych/plugin-image-button-response';
import jsPsychPreload from '@jspsych/plugin-preload';

// const sequence_indexes = Array.from(Array(sequences.length).keys());

function createPicTaskBlocks(jsPsych) {
  // TO-DO: Get numBlocks out of trial data.
  // const numBlocks = jsPsych.data.get();

  // const sequences = jsPsych.randomization.sampleWithoutReplacement(sequence_indexes, numBlocks);
  //   jsPsych.data.addProperties({ sequence: random_index + 1 });

  //   const sequence = sequences[random_index];
  //   const preload_trials = preload_trial(sequence);
  //   const pic_trials = pic_trial(sequence);
  return {
    timeline: createPicTaskBlock(jsPsych),
    timeline_variables: sequence_variables,
    randomize_order: true,
    sample: {
      type: 'without-replacement',
      size: 3,
    },
    // sample: {
    //   type: 'custom',
    //   fn: function (t) {
    //     console.log(t);
    //     console.log(jsPsych.data);
    //     console.log(jsPsych.data.dataProperties);
    //     var current_node_id = jsPsych.getCurrentTimelineNodeID();
    //     var data_from_current_node = jsPsych.data.getDataByTimelineNode(current_node_id);
    //     console.log(data_from_current_node);
    //     return t;
    //   },
    // },
  };
}
function createPicTaskBlock(jsPsych) {
  const pic_task = {
    type: jsPsychImageButtonResponse,
    prompt: '<p>Rate the image on a scale from -3 (Dislike Very Much) to 3 (Like Very Much).</p>',
    choices: ['-3', '-2', '-1', '0', '1', '2', '3'],
    stimulus: function () {
      console.log(jsPsych.timelineVariable('stimulus'));
    },
  };
  const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="font-size: 48px;">+</p>',
    choices: 'NO_KEYS',
    trial_duration: 1000,
    on_trial_start: function (trial) {
      console.log('on_trial_start', trial);
    },
  };
  console.log(pic_task, fixation);
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
    },
  ];
  // return [fixation, pic_task];
}
export { createPicTaskBlocks };

// TO-DO: Need to properly preload all images in a sequence.
// TO-DO: Add trials field to preload task, which runs pic_task.
