import jsPsychPreload from '@jspsych/plugin-preload';
import {} from '@brown-ccv/behavioral-task-trials';
import { config } from '../config/main';

export default function pic_trial(seq) {
  console.log(config);
  // timeline
  const timeline = [
    // fixation
    // fixation(config, {
    // duration: 650,
    // }),
    ...seq,
  ];

  return {
    type: jsPsychPreload,
    auto_preload: true,
    timeline,
  };
}
