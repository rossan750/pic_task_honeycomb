import { lang, config } from '../config/main';
import { showMessage } from '@brown-ccv/behavioral-task-trials';
import { pic_trial, preload_trial } from './pic_task';
import { seq_test } from './sequences';

// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honyecomb.
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
const buildTimeline = () => {
  const preload_1 = preload_trial(seq_test);
  const pic_1 = pic_trial(seq_test);

  const primaryTimeline = [
    preload_1,
    pic_1,
    // preamble,
    // ageCheck,
    // sliderCheck,
    // countdown({ message: lang.countdown.message1 }),
    // taskBlock(practiceBlock),
    // countdown({ message: lang.countdown.message2 }),
    // taskBlock(exptBlock1),
    // demographics,
    // iusSurvey,
    // debrief,
    showMessage(config, {
      duration: 1000,
      message: lang.task.end,
    }),
  ];

  // return primaryTimeline;
  return [primaryTimeline[2]];
};

// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
