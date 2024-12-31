/* eslint-disable no-undef */
const ColorBtnView = Object.create(View);

ColorBtnView.setup = function (el) {
  this.init(el);

  return this;
}


ColorBtnView.getHtmlElement = function() {
  const button = document.createElement("button");

  button.style.width = "25px";
  button.style.height = "25px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.cursor = "pointer";


  return button;
};