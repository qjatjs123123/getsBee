const View = {
    init(el) {
      if (!el) throw new Error('Element is required');
      this.el = el;
      return this;
    },
  
    on(event, handler) {
      this.el.addEventListener(event, handler);
      return this;
    },
  
    emit(event, data) {
      const evt = new CustomEvent(event, { detail: data });
      this.el.dispatchEvent(evt);
      return this;
    },
  
    hide() {
      this.el.style.visibility = "hidden";
      this.el.style.opacity = "0";
      return this;
    },
  
    show() {
      this.el.style.visibility = "visible";
      this.el.style.opacity = "1";
      return this;
    }
  };