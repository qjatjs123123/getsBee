/* eslint-disable no-undef */
const HighlightView = Object.create(View);

HighlightView.setup = function (el) {
  this.init(el);

  return this;
}


HighlightView.getHtmlElement = function(id, color) {
  const highlightBeeTag = document.createElement("bee");
  highlightBeeTag.style.backgroundColor = color;
  highlightBeeTag.style.cursor = "pointer";
  highlightBeeTag.dataset.id = id; 
  return highlightBeeTag;
};



HighlightView.create = function(id, color) {
  const highlightBeeTag = HighlightView.getHtmlElement(id, color);
  const colorHover = HighlightView.getHoverColor(color);
  
  highlightBeeTag.addEventListener("mouseover", () => HighlightView.onMouseOver(id, colorHover));
  highlightBeeTag.addEventListener("mouseout", () => HighlightView.onMouseOut(id, color));
  highlightBeeTag.addEventListener("click", (event) => HighlightView.onClick(event));

  return highlightBeeTag;
}

HighlightView.onMouseOver = function(id, colorHover) {
  const elements = document.querySelectorAll(`[data-id="${id}"]`);
  
  elements.forEach((el) => {
    const backgroundColor = window.getComputedStyle(el).backgroundColor;
    const hoverColor = HighlightView.getHoverColor(backgroundColor);

    el.style.backgroundColor = hoverColor; 
  });
}

HighlightView.onMouseOut = function(id, color) {
  const elements = document.querySelectorAll(`[data-id="${id}"]`);
  
  elements.forEach((el) => {
    const hoverColor = window.getComputedStyle(el).backgroundColor;
    const backgroundColor = HighlightView.getOriginalColor(hoverColor);

    el.style.backgroundColor = backgroundColor; 
  });
}


HighlightView.onClick = function(event) {
  event.stopPropagation();
  const clickedElement = event.currentTarget;
  const clickedId = Number(clickedElement.dataset.id);

  selectionModel.SELECTED_ID = clickedId;

  const left = event.clientX + window.scrollX + 10;
  const top = event.clientY + window.scrollY + 10;
  eventManager.emit('showTooltip', { left, top });
  // TooltipView.render(left, top);
}

HighlightView.getHoverColor = (color) => {
  const colorObj = COLOR_LIST.find(item => item.color === color);
  return colorObj ? colorObj.hoverColor : color; 
};

HighlightView.getOriginalColor = (hoverColor) => {
  const colorObj = COLOR_LIST.find(item => item.hoverColor === hoverColor);
  return colorObj ? colorObj.color : hoverColor; 
};

module.exports = { HighlightView };