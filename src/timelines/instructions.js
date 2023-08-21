import jsPsychInstructions from '@jspsych/plugin-instructions';
import { lang } from '../config/main';

export const instructions = {
  type: jsPsychInstructions,
  pages: [
    lang.instructions.welcome,
    lang.instructions.p1,
    lang.instructions.p2,
    lang.instructions.fixation,
    // lang.instructions.rate,
    // lang.instructions.rate_practice,
    lang.instructions.no_talking,
    lang.instructions.instruction_end,
  ],
  show_clickable_nav: true,
  css_classes: ['instructions-text'],
};
