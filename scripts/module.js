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
   console.log("range-ruler|Initializing Range Ruler Options.");
});

Hooks.once('setup', async function() {
  log("Readying.");
});

Hooks.once('ready', async function() {
   log("range-ruler|Readying Range Ruler.");
});
