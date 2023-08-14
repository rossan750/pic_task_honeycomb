import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { lang } from '../config/main';
import { photodiodeGhostBox } from '../lib/markup/photodiode';
import { baseStimulus } from '../lib/markup/stimuli';

const pleaseBiggen = () => {
  const stimulus =
    baseStimulus(`<h1>${lang.instructions.large_window}</h1>`, true) + photodiodeGhostBox();

  return {
    type: htmlKeyboardResponse,
    stimulus,
    prompt: lang.prompt.continue.press,
    response_ends_trial: true,
  };
};

const welcomeMessage = () => {
  const stimulus =
    baseStimulus(`<h1>${lang.instructions.welcome}</h1>`, true) + photodiodeGhostBox();

  return {
    type: htmlKeyboardResponse,
    stimulus,
    prompt: lang.prompt.continue.press,
    response_ends_trial: true,
  };
};

export const welcome = {
  type: htmlKeyboardResponse,
  timeline: [pleaseBiggen(), welcomeMessage()],
};
