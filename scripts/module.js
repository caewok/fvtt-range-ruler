export const MODULE_ID = 'range-ruler';
const FORCE_DEBUG = true; // used for logging before dev mode is set up

let rangeRulerTool;

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
   
   window.rangeRuler = {
		active: false,
	 };
});

Hooks.once('setup', async function() {
  log("Setting up.");
  
  if(!game.modules.get('lib-wrapper')?.active && game.user.isGM) ui.notifications.error("'Range Ruler' requires the 'libWrapper' module. Please install and activate this dependency.");

  if(!game.modules.get('lib-ruler')?.active && game.user.isGM) ui.notifications.error("'Range Ruler' requires the 'libRuler' module. Please install and activate this dependency.");
});

Hooks.once('ready', async function() {
   log("Readying Range Ruler.");
});

// https://github.com/League-of-Foundry-Developers/foundryvtt-devMode
Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(MODULE_ID);
});

// Inject Range Ruler button
Hooks.on("getSceneControlButtons", controls => {
	if (!rangeRulerTool) {
		rangeRulerTool = {
			name: "rangeRuler",
			title: `${MODULE_ID}.rangeRuler`,
			icon: "fas fa-people-arrows",
			toggle: true,
			active: rangeRuler?.active,
			onClick: toggled => rangeRuler.active = toggled,
			visible: true,
		}
	}
	const tokenControls = controls.find(group => group.name === "token").tools
	tokenControls.splice(tokenControls.findIndex(tool => tool.name === "ruler") + 1, 0, rangeRulerTool)
});

Hooks.once('libRulerReady', async function() {
  log("libRuler is ready to go.");
 
  // tell modules that the rangeRuler is set up
  Hooks.callAll('rangeRulerReady');

});

