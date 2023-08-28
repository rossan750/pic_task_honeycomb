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
export function pic_trial(seq, is_practice = false) {
  const fixation_trial = fixation(config);
  // if (is_practice === true) {
  //   console.log(is_practice, seq);
  //   seq = seq.map((s) => ({
  //     ...s,
  //     is_practice: true,
  //   }));
  //   console.log('After', seq);
  // }
  // We need to append fixation trial to each trial in seq.
  const trials = {
    timeline: interleave(seq, fixation_trial),
    data: { is_practice },
  };
  return trials;
}
