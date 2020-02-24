// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function loadPage(page) {
  document.querySelector('#genel-page').style.visibility ='hidden';
  document.querySelector('#hafiza-page').style.visibility ='hidden';
  document.querySelector('#vna-page').style.visibility ='hidden';
  document.querySelector('#hakkinda-page').style.visibility ='hidden';
  document.querySelector(`#${page}-page`).style.visibility ='visible';
}

function setActiveTab(page) {
  document.querySelector('#top-menu-hakkinda').classList.remove("active");
  document.querySelector('#top-menu-hafiza').classList.remove("active");
  document.querySelector('#top-menu-vna').classList.remove("active");
  document.querySelector('#top-menu-genel').classList.remove("active");
  document.querySelector(`#top-menu-${page}`).classList.add("active");
}

document.querySelector('#top-menu-genel').addEventListener('click', () => {
  setActiveTab('genel')
  loadPage('genel')
})

document.querySelector('#top-menu-hafiza').addEventListener('click', () => {
  setActiveTab('hafiza')
  loadPage('hafiza')
})

document.querySelector('#top-menu-vna').addEventListener('click', () => {
  setActiveTab('vna')
  loadPage('vna')
})

document.querySelector('#top-menu-hakkinda').addEventListener('click', () => {
  setActiveTab('hakkinda')
  loadPage('hakkinda')
})
