// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const serialport = require('serialport')

window.addEventListener('DOMContentLoaded', async () => {
  
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  includeHTML();
  
  const portListesi = document.getElementById("port-listesi");
  const list = await serialport.list();
  list.forEach(item =>{
    const option = document.createElement("option");
    option.text = item.path;
    portListesi.add(option);
  });

  document.getElementById("port-connect").addEventListener('click', () => {
    portConnect();
  });

  createHafizaPage();

  document.getElementById("kanal-oku").addEventListener('click', () => {
    console.log("kanal oku tiklandi");
  });

  document.getElementById("kanal-yukle").addEventListener('click', () => {
    console.log("kanal yukle tiklandi");
  });

  document.getElementById("yedek-oku").addEventListener('click', () => {
    console.log("yedek oku tiklandi");
  });

  document.getElementById("yedek-yukle").addEventListener('click', () => {
    console.log("yedek yukle tiklandi");
  });
})

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

function createHafizaPage() {
  const hafizaPage = document.getElementById('hafiza-listesi');
  const fragment = document.createDocumentFragment();
  for(let i=0; i<100; i++) {
    const div = document.createElement('div');
    div.classList.add("hafiza-page-line");

    div.appendChild(createLabel("hafiza-page-line-name", i));
    div.appendChild(createLabel("hafiza-page-label", "Frekans:"));
    div.appendChild(createInput("hafiza-page-input"));
    div.appendChild(createLabel("hafiza-page-label", "Shift:"));
    div.appendChild(createInput("hafiza-page-input"));
    div.appendChild(createLabel("hafiza-page-label", "Tone:"));
    div.appendChild(createInput("hafiza-page-input"));
    div.appendChild(createLabel("hafiza-page-label", "Kanal Adi:"));
    div.appendChild(createInput("hafiza-page-input"));

    fragment.appendChild(div);
  }
  hafizaPage.appendChild(fragment);
}

function createInput(className) {
  const input = document.createElement('input');
  input.classList.add(className);
  return input;
}

function createLabel(className, labelName) {
  const label = document.createElement('div');
  label.classList.add(className);
  label.innerHTML = labelName;
  return label;
}

function portConnect() {
  const portListesi = document.getElementById("port-listesi");
  const path = portListesi.options[portListesi.selectedIndex].text;
    const port = new serialport(path, { baudRate: 256000 }, function(err) {
      if (err) {
        return console.log('Error: ', err.message)
      }
    })

    port.on('open', function() {
      console.log('port opened for', path);
    })

    port.write('main screen turn on', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written to ', path)
    })

    port.on('error', function(err) {
      console.log('Error: ', err.message)
    })

    // Read data that is available but keep the stream in "paused mode"
    port.on('readable', function () {
      console.log('Data:', port.read())
    })

    // Switches the port into "flowing mode"
    port.on('data', function (data) {
      console.log('Data:', data)
    })

    // Pipe the data into another stream (like a parser or standard out)
    // const lineStream = port.pipe(new Readline())
}
