/* eslint-disable no-undef */
const TooltipView = Object.create(View);

TooltipView.setup = function (el) {
  this.init(el)
  eventManager.on('showTooltip', (data) => {
    this.render(data.left, data.top);
  });
  return this
}

TooltipView.getHtmlElement = function() {
  const tooltip = document.createElement("div");

  tooltip.id = "tooltip";
  tooltip.style.visibility = "hidden";
  tooltip.style.opacity = "0";
  tooltip.style.position = "absolute";
  tooltip.style.padding = `${"5px"} ${"5px"}`;
  tooltip.style.backgroundColor = "#fff"
  tooltip.style.borderRadius = "5px";
  tooltip.style.fontSize = "14px";
  tooltip.style.zIndex = "1000";
  tooltip.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
  tooltip.style.display = "flex";
  tooltip.style.flexDirection = "row";
  tooltip.style.alignItems = "center";
  tooltip.style.justifyContent = "center";
  tooltip.style.gap = "8px";
  
  return tooltip;
};


TooltipView.render = async function (left, top) {
  this.el.style.left = `${left}px`;
  this.el.style.top = `${top}px`;
  this.show();
}
