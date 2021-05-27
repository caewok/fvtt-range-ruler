import { MODULE_ID, log } from "./module.js";

import { rangeRulerGetText,
         rangeRulerColorForPosition } from "./segment.js";
         
export function registerRuler() {
  libWrapper.register(MODULE_ID, 'window.libRuler.Segment.prototype.text', rangeRulerGetText, 'WRAPPER');
  libWrapper.register(MODULE_ID, 'window.libRuler.Segment.prototype.colorForPosition', rangeRulerColorForPosition, 'WRAPPER');
}