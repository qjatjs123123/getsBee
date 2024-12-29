function isValidSelection(selection) {
  return selection.rangeCount > 0;
}

function isTextSelected(range) {
  return range.toString().length > 0;
}

function isValidPos(x, y) {
  if (x === null || y === null) return false;
  return true;
}
