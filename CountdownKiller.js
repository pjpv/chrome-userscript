// ==UserScript==
// @name         Countdown killer
// @namespace    https://zfdev.com/
// @version      0.1
// @description  Remove login page countdown
// @author       greendev
// @match        https://onlinebooking.sand.telangana.gov.in/Masters/Home.aspx
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  document.getElementById("btnLogin").disabled = false;
  document.getElementById("btnLogin").style.display = 'Block';
  document.getElementById('lbltime').style.display = 'none';
  clearInterval(interval);
})();
