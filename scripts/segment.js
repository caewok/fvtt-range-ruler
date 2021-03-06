import { MODULE_ID, log } from "./module.js";

/*
 * Add label to the ruler text if Range Ruler is active.
 */
export function rangeRulerGetText(wrapped, ...args) {
  const orig_label = wrapped(...args);
  
  if(!window.rangeRuler.active) return orig_label;
  log(`Adding to ruler label.`);
  // proof of concept
  // eventually will need to figure out how to do icons or something informative.
  // should indicate what type of weapon we are ranging, if possible
  return "RR" + orig_label; 
}
/*
 * Return the color for a given segment or partial segment.
 * Eventually will interact with user selection to return colors based 
 * on range of the item selected. 
 * For now, assume everything is a thrown dagger: 20/60 
 *   (Why? Because it has a short range that is easy to test.)
 */
export function rangeRulerColorForPosition(wrapped, position) {
  // Mimics drag ruler implementation
  // proof of concept
  if(!window.rangeRuler.active) return wrapped(position);
  
  const COLOR_RANGES = [{id: "close", color: 0x00FF00, max: 20},
                        {id: "far",   color: 0xFFFF00, max: 60}];
  const COLOR_UNREACHABLE = 0xFF0000;
                        
  const distance = this.totalPriorDistance + this.measureDistance(position);
  const selected_range = COLOR_RANGES.reduce((minRange, currentRange) => {
    if(distance <= currentRange.max && currentRange.max <= minRange.max) {
      log(`Use current: ${distance}, ${currentRange.max}, ${minRange.max}`);
      return currentRange;
    } else {
      log(`Use min: ${distance}, ${currentRange.max}, ${minRange.max}`);
    }
    return minRange;
  }, { max: Infinity, color: COLOR_UNREACHABLE });
  
  log(`Distance to position: ${distance}. Color: ${selected_range.color}`);
  
  return selected_range.color;
}

/*
 * For testing libRuler, add a modifier to the distance
 * Let's assume it is a magic throw that gives you 10 for free the first segment
 */
export function rangeRulerModifyDistanceResult(wrapped, ...args) {
  let measured_distance = wrapped(...args);

   if(window.rangeRuler.active & this.segment_num === 0) {
     measured_distance = Math.max(0, measured_distance - 10);
   }

  return measured_distance;
}
