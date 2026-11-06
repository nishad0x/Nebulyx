const LOW_MEMORY_GB = 4;
const LOW_CORE_COUNT = 4;
const PHONE_WIDTH = 768;

function detectLowPower() {
  const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const small = window.innerWidth < PHONE_WIDTH;
  const lowMemory = (navigator.deviceMemory ?? LOW_MEMORY_GB + 1) <= LOW_MEMORY_GB;
  const lowCores = (navigator.hardwareConcurrency ?? LOW_CORE_COUNT + 1) <= LOW_CORE_COUNT;
  return touch || small || lowMemory || lowCores;
}

export const LOW_POWER = detectLowPower();

document.documentElement.dataset.quality = LOW_POWER ? 'low' : 'high';
