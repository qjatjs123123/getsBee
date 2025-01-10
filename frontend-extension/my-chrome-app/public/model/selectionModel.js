/* eslint-disable no-undef */
const selectionModel = {
  selection: null,
  range: null,
  SELECTED_ID: 0,
  
  create () {
    const curSelection = window.getSelection();
    if (!this.isValidSelection( curSelection )) return false;

    const curRange = curSelection.getRangeAt(0);
    if (!this.isTextSelected(curRange)) return false;

    this.selection = curSelection;
    this.range = curRange;
    
    return true;
  },

  delete () {
    if (!this.selection) return;
    if (this.selection.rangeCount > 0) {
      this.selection.removeAllRanges();
      this.range = null;
    }
  },

  isValidSelection(selection) {
    return selection.rangeCount > 0;
  },
  
  isTextSelected(range) {
    return range.toString().length > 0;
  },

  getRectPos() {
    if (!this.range) return [null, null];
    const rects = this.range.getClientRects();
    if (rects.length <= 0) return [null, null];

    const lastRect = rects[rects.length - 1];
    const left = lastRect.right + window.scrollX + 10;
    const top = lastRect.bottom + window.scrollY;
    return [left, top];
  }
}

module.exports = { selectionModel };