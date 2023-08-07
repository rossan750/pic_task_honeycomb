import jsPsychPreload from '@jspsych/plugin-preload';
import {} from '@brown-ccv/behavioral-task-trials';
import { config } from '../config/main';

export function preload_trial(seq) {
  console.log(config);
  // timeline
  const trials = {
    // fixation
    // fixation(config, {
    // duration: 650,
    // }),
    timeline: seq,
  };

  return {
    type: jsPsychPreload,
    // auto_preload: true,
    show_detailed_errors: true,
    continue_after_error: true,
    on_error: (img) => console.log('error loading', img),
    trials: [trials],
  };
}
export function pic_trial(seq) {
  const trials = {
    // fixation
    // fixation(config, {
    // duration: 650,
    // }),
    timeline: seq,
  };
  return trials;
}
