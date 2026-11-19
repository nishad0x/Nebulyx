export const worldState = {
  w: 0,
  chapters: [],
  pointer: { x: 0, y: 0 },
  reduced: false,
  ready: false,
  intro: 1,
};

export function setChapters(list) {
  worldState.chapters = list;
}
