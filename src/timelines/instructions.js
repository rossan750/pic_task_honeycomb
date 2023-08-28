import jsPsychInstructions from '@jspsych/plugin-instructions';
import { lang } from '../config/main';
import { preload_trial, pic_trial } from './pic_task';
import { seq_practice } from './sequences';

export const instructions_beginning = {
  type: jsPsychInstructions,
  pages: [
    lang.instructions.welcome,
    lang.instructions.p1,
    lang.instructions.p2,
    lang.instructions.fixation,
    lang.instructions.rate,
    lang.instructions.rate_practice,
    // lang.instructions.no_talking,
    // lang.instructions.instruction_end,
  ],
  show_clickable_nav: true,
  css_classes: ['instructions-text'],
};

const preload_trials = preload_trial(seq_practice);
const pic_trials = pic_trial(seq_practice, true);

export const instructions_end = {
  type: jsPsychInstructions,
  pages: [lang.instructions.no_talking, lang.instructions.instruction_end],
  show_clickable_nav: true,
  css_classes: ['instructions-text'],
};

export const instructions = {
  timeline: [instructions_beginning, preload_trials, pic_trials, instructions_end],
};
