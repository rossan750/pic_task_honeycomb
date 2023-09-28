import { lang, config } from '../config/main';
import { showMessage } from '@brown-ccv/behavioral-task-trials';
import { pic_trial, preload_trial } from './pic_task';
import { preamble } from './preamble';
import { instructions } from './instructions';
import { sequences } from './sequences';

// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honeycomb.
const jsPsychOptions = {
  on_trial_finish: function (data) {
    console.log('A trial just ended, here are the latest data:');
    console.log(data);
  },
  default_iti: 250,
};

// Add your jsPsych timeline here.
// Honeycomb will call this function for us after the subject logs in, and run the resulting timeline.
// The instance of jsPsych passed in will include jsPsychOptions above, plus other options needed by Honeycomb.
const buildTimeline = (jsPsych) => {
  const random_index = Math.floor(Math.random() * 10);
  jsPsych.data.addProperties({ sequence: random_index + 1 });
  const sequence = sequences[random_index];
  const preload_trials = preload_trial(sequence);
  const pic_trials = pic_trial(sequence);

  const primaryTimeline = [
    preamble,
    instructions,
    preload_trials,
    pic_trials,
    showMessage(config, {
      duration: 3000,
      message: lang.task.end,
    }),
  ];

  return primaryTimeline;
};

// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
