import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import {} from '@brown-ccv/behavioral-task-trials';
import { config } from '../config/main';

const taskTrial = () => {
  console.log(config);
  // timeline
  const timeline = [
    // fixation
    // fixation(config, {
    // duration: 650,
    // }),
  ];

  return {
    type: htmlKeyboardResponse,
    timeline,
  };
};

export default taskTrial;
