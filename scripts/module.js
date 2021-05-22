export const MODULE_ID = 'range-ruler';
const FORCE_DEBUG = true; // used for logging before dev mode is set up


export function log(...args) {
  try {
    const isDebugging = window.DEV?.getPackageDebugValue(MODULE_ID);
    //console.log(MODULE_ID, '|', `isDebugging: ${isDebugging}.`);

    if (FORCE_DEBUG || isDebugging) {
      console.log(MODULE_ID, '|', ...args);
    }
  } catch (e) {}
}

Hooks.once('init', async function() {
   log("Initializing Range Ruler Options.");
});

Hooks.once('ready', async function() {
   log("Readying Range Ruler.");
});
