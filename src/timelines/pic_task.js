import jsPsychPreload from '@jspsych/plugin-preload';
import { config } from '../config/main';
import { fixation } from '../trials/fixation';
import { interleave } from '../lib/utils';

export function preload_trial(seq) {
  const trials = { timeline: seq };

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

  const trials = {
    // We need to add the fixation trial before each picture in seq.
    timeline: interleave(seq, fixation_trial),
    data: { is_practice },
  };
  return trials;
}
