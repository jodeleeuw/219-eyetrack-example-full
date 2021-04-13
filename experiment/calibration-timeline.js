// You can make tweaks to the content below if necessary for your experiment. //

var precheck_0 = {
  type: 'html-button-response',
  stimulus: `
    <p>This experiment uses your camera for eye tracking.</p>
    <p>No video is saved from this experiment. The only data recorded are predictions about where you are looking.</p>
    <p>Before we begin, there are a few things to do that can improve the accuracy of the eye tracking.</p>
  `,
  choices: ['Let\'s go!']
}

var precheck_1 = {
  type: 'html-button-response',
  stimulus: `
    <p>If you wear glasses and can complete the task without them, please remove your glasses.</p>
    <p>If you need to keep your glasses on to read this text, you can leave them on.</p>
  `,
  choices: ['OK']
}

var precheck_2 = {
  type: 'html-button-response',
  stimulus: `
    <p>Please close additional browser tabs and apps running in the background.</p>
    <p>The eye tracker works best when there are fewer things running at the same time.</p>
  `,
  choices: ['OK']
}

var precheck_3 = {
  type: 'html-button-response',
  stimulus: `
    <p>Try to avoid bright lights behind you.</p>
    <p>The eye tracker works best if your face is well lit from the front.</p>
    <p>If you can, adjust the lighting in your room.</p>
  `,
  choices: ['OK']
}

var precheck_4 = {
  type: 'html-button-response',
  stimulus: `
    <p>Turn off anything that may produce an alert or notification during the task.</p>
  `,
  choices: ['OK']
}

var camera_instructions = {
  type: 'html-button-response',
  stimulus: `
    <p>In order to participate you must allow the experiment to use your camera.</p>
    <p>You will be prompted to do this on the next screen.</p>
    <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
    <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
  `,
  choices: ['Got it'],
}

var init_camera = {
  type: 'webgazer-init-camera'
}

var fullscreen_enter = {
  type: 'fullscreen',
  fullscreen_mode: true
}

var calibration_instructions_1 = {
  type: 'html-button-response',
  stimulus: `
    <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
    <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
  `,
  choices: ['Got it'],
}

var calibration = {
  type: 'webgazer-calibrate',
  calibration_points: CALIBRATION_CONFIG.CALIBRATION_POINTS,
  repetitions_per_point: 1,
  randomize_calibration_order: true,
}

var validation_instructions_1 = {
  type: 'html-button-response',
  stimulus: `
    <p>Now we'll measure the accuracy of the calibration.</p>
    <p>Keep your head still, and move your eyes to look at the dots.</p>
    <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
  `,
  choices: ['Got it'],
  post_trial_gap: 1000
}

var validation = {
  type: 'webgazer-validate',
  validation_points: CALIBRATION_CONFIG.VALIDATION_POINTS,
  validation_point_coordinates: 'percent',
  show_validation_data: false,
  roi_radius: CALIBRATION_CONFIG.ROI_TOLERANCE_PIXELS,
  time_to_saccade: 1000,
  validation_duration: 2000,
  data: {
    task: 'validate'
  }
}

var recalibrate_instructions = {
  type: 'html-button-response',
  stimulus: `
    <p>The accuracy of the calibration is a little lower than we'd like.</p>
    <p>Let's try calibrating one more time.</p>
    <p>Keep your head still, look at the dots, and click on them.<p>
  `,
  choices: ['OK'],
}

var recalibrate = {
  timeline: [recalibrate_instructions, calibration, validation_instructions_1, validation],
  conditional_function: function(){
    var validation_data = jsPsych.data.get().filter({task: 'validate'}).values()[0];
    return validation_data.percent_in_roi.some(function(x){
      return x < CALIBRATION_CONFIG.MINIMUM_PERCENT_IN_ROI;
    });
  },
  data: {
    phase: 'recalibration'
  }
}

var calibrate_done = {
  type: 'html-button-response',
  stimulus: `
    <p>Great, we're done with calibration!</p>
    <p>Remember to keep your head still as you continue to the experiment.</p>
  `,
  choices: ['OK']
}

var initial_calibration_timeline = {
  timeline: [
    precheck_0,
    precheck_1,
    precheck_2,
    precheck_3,
    precheck_4,
    camera_instructions,
    init_camera,
    fullscreen_enter,
    calibration_instructions_1,
    calibration,
    validation_instructions_1,
    validation,
    recalibrate,
    calibrate_done
  ],
  data: {
    phase: 'initial-calibration'
  }
}
