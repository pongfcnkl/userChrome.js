// ==UserScript==
// @name           optionFont.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    optionFont
// @include        chrome://browser/content/preferences/dialogs/fonts.xhtml
// @include        about:preferences
// @compatibility  77+
// @version        2020/04/23 02:00 fix Bug 1201243
// @version        2020/03/02 20:00 fix
// @version        2020/03/02 00:00 fix
// @version        2020/02/29 00:00 
// ==/UserScript==
if (location.href == "chrome://browser/content/preferences/dialogs/fonts.xhtml")
  {
  window.optionFont = {
    init: function() {
      ["serif", "sans-serif", "monospace"].forEach(id => 
      {
        let menulist = document.getElementById(id);
        menulist.addEventListener("popupshowing", this, {capture:false});
      });
    },

    handleEvent: function(event) {
      switch(event.type) {
        case "popupshowing":
          this.setMenuPopupFont(event.target);
         break;
      }
    },

    setMenuPopupFont: async function(menupopup) {
      let menuitems = menupopup.querySelectorAll("menuitem");
      menuitems.forEach(elm => 
      {
        let font = (elm.value||elm.getAttribute("label")).replace(/^\$/, "").replace("Default (", "").replace(/\)$/, "");
        if (font) {
          elm.style.setProperty("font-family", font, "")
        }
      });
    }
  }
  setTimeout(() => {optionFont.init();}, 250);
} else {
  window.optionFont = {
    init: function() {
      let menulist = document.getElementById("defaultFont");
      let menupopup = menulist.querySelector(".in-menulist");
      if (!menupopup) {
        setTimeout(() => {this.init();}, 250);
        return;
      }
      this.setMenuPopupFont(menupopup);
      
      menulist.addEventListener("popupshowing", this, {capture:false});
    },

    handleEvent: function(event) {
      switch(event.type) {
        case "popupshowing":
          this.setMenuPopupFont(event.target);
         break;
      }
    },

    setMenuPopupFont: async function(menupopup) {
      let menuitems = menupopup.querySelectorAll("menuitem");
      menuitems.forEach(elm => 
      {
        let font = (elm.value||elm.getAttribute("label")).replace(/^\$/, "").replace("Default (", "").replace(/\)$/, "");
        if (font) {
          elm.style.setProperty("font-family", font, "")
        }
      });
    }
  }
  setTimeout(() => {optionFont.init();}, 250);
}