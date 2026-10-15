interface CopyInterval {
  readonly enter: number;
  readonly ready: number;
  readonly leave: number;
  readonly exit: number;
}

// Copy arrives after its camera/panel move settles. Separate exit and entrance
// intervals keep the same text area clear in either scroll direction.
const hero: CopyInterval = { enter: 0, ready: 0, leave: 0.075, exit: 0.115 };
const captions: readonly CopyInterval[] = [
  { enter: 0.155, ready: 0.17, leave: 0.225, exit: 0.245 },
  { enter: 0.315, ready: 0.34, leave: 0.405, exit: 0.425 },
  { enter: 0.495, ready: 0.52, leave: 0.575, exit: 0.595 },
  { enter: 0.675, ready: 0.7, leave: 0.765, exit: 0.785 },
  { enter: 0.835, ready: 0.86, leave: 0.905, exit: 0.925 },
  { enter: 0.945, ready: 0.97, leave: 1, exit: 1 },
];

function smoothStep(value: number) {
  return value * value * (3 - 2 * value);
}

/** Chapter -1 is the hero. No remembered state, so seeking/reversing is exact. */
export function storyCopyOpacity(progress: number, chapter: number): number {
  const interval = chapter === -1 ? hero : captions[chapter];
  if (!interval || !Number.isFinite(progress)) return 0;
  const position = Math.max(0, Math.min(1, progress));
  if (position < interval.enter || position > interval.exit) return 0;
  if (position < interval.ready) {
    return smoothStep((position - interval.enter) / (interval.ready - interval.enter));
  }
  if (position <= interval.leave) return 1;
  return 1 - smoothStep((position - interval.leave) / (interval.exit - interval.leave));
}
