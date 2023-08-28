import jsPsychPreload from '@jspsych/plugin-preload';
// import { fixation } from '@brown-ccv/behavioral-task-trials';
import { config } from '../config/main';
import { fixation } from '../trials/fixation';
import { interleave } from '../lib/utils';

export function preload_trial(seq) {
  console.log(config);
  // timeline
  const trials = {
    timeline: seq,
  };

  return {
    type: jsPsychPreload,
    show_detailed_errors: true,
    continue_after_error: true,
    on_error: (img) => console.log('error loading', img),
    trials: [trials],
  };
}
export function pic_trial(seq) {
  const fixation_trial = fixation(config);
  // We need to append fixation trial to each trial in seq.
  const trials = {
    timeline: interleave(seq, fixation_trial),
  };
  return trials;
}
