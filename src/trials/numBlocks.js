import { lang } from '../config/main';
import { baseStimulus } from '../lib/markup/stimuli';
import surveyText from '@jspsych/plugin-survey-text';

const numBlocks = (jsPsych) => {
  return {
    type: surveyText,
    questions: [{ prompt: baseStimulus(`<h1>${lang.block_number.set}</h1>`, true), value: 8 }],
    on_finish: (data) => {
      const blockNumber = Number(data.response['Q0']);
      jsPsych.data.addProperties({ numBlocks: blockNumber });
    },
  };
};

export { numBlocks };
