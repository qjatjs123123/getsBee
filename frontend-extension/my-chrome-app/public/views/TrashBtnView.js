// eslint-disable-next-line no-undef
const TrashBtnView = Object.create(View);

TrashBtnView.setup = function (el) {
  this.init(el);

  return this;
}

TrashBtnView.getHtmlElement = function() {
  const button = document.createElement("button");
    button.style.width = "25px";
    button.style.height = "25px";
    button.style.borderRadius = "50%";
    button.style.backgroundColor = "transparent";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    
    const icon = document.createElement("span");
    icon.style.display = "flex";
    icon.style.alignItems = "center";
    icon.style.justifyContent = "center";
    icon.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="width: 25px; height: 25px;"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-2 14H7L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <rect x="9" y="2" width="6" height="4" rx="1" ry="1"></rect>
      </svg>
    `;

    button.appendChild(icon);
    return button;
}