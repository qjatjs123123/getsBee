/* eslint-disable no-undef */
const selectionModel = (() => {
  let selection = null;
  let range = null;
  let SELECTED_ID = 0;

  function create() {
    const curSelection = window.getSelection();
    if (!isValidSelection(curSelection)) return false;

    const curRange = curSelection.getRangeAt(0);
    if (!isTextSelected(curRange)) return false;

    selection = curSelection;
    range = curRange;

    return true;
  }

  function deleteSelection() {
    if (!selection) return;
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
      range = null;
    }
  }

  function isValidSelection(selection) {
    return selection.rangeCount > 0;
  }

  function isTextSelected(range) {
    return range.toString().length > 0;
  }

  function getRectPos() {
    if (!range) return [null, null];
    const rects = range.getClientRects();
    
    if (rects.length <= 0) return [null, null];

    const lastRect = rects[rects.length - 1];
    const left = lastRect.right + window.scrollX + 10;
    const top = lastRect.bottom + window.scrollY;
    return [left, top];
  }

  // Setters for selection, range, and SELECTED_ID
  function setSelection(newSelection) {
    selection = newSelection;
  }

  function setRange(newRange) {
    range = newRange;
  }

  function setSelectedId(newId) {
    SELECTED_ID = newId;
  }

  return {
    create,
    delete: deleteSelection,
    isValidSelection,
    isTextSelected,
    getRectPos,
    getSelection: () => selection,
    getRange: () => range,
    getSelectedId: () => SELECTED_ID,
    setSelection,
    setRange,
    setSelectedId,
  };
})();

//module.exports = { selectionModel };