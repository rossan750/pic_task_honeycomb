import { config } from '../config/main';
import { fixation } from '../trials/fixation';
import jsPsychImageButtonResponse from '@jspsych/plugin-image-button-response';
import { eventCodes } from '../config/main';
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode';

// Function to generate fixation and image trial.
export function pic_trial(jsPsych, is_practice = false) {
  // Keep track of image index inside images array.
  let IMAGE_INDEX = 0;
  return {
    timeline: [
      // Display fixation dot.
      fixation(config),
      // Display pictures and buttons.
      {
        type: jsPsychImageButtonResponse,
        prompt:
          '<p>Rate the image on a scale from -3 (Dislike Very Much) to 3 (Like Very Much).</p>' +
          photodiodeGhostBox(),
        choices: ['-3', '-2', '-1', '0', '1', '2', '3'],
        stimulus: function () {
          const images = jsPsych.timelineVariable('images')[0];
          const image = images[IMAGE_INDEX];
          return image.stimulus;
        },
        on_load: () => {
          pdSpotEncode(eventCodes.image, 1, config);
        },
        data: { is_practice },
      },
    ],
    timeline_variables: jsPsych.timelineVariable('images')[0],
    loop_function() {
      // Loop through the fixation and image trial for all images in the array.
      IMAGE_INDEX++;
      if (IMAGE_INDEX === jsPsych.timelineVariable('images')[0].length) {
        IMAGE_INDEX = 0; // Stop looping and reset imaging for next sequence.
        return false;
      } else {
        return true;
      }
    },
  };
}
