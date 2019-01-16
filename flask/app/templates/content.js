
    var nodeArray = [];
var contentScript = {

  // part of the webpage DOM to be searched
  webPart: document.body,

  // state of sidebar, false == closed
  sidebar: false,

      search: function() {
      // regular expression to find law quotes
      //starts with §/§§/art/ART/aRt, ends with sth. like Foo234-BaaR 2000/XI
      // other and older regex patterns for testing purpose
      // to test regex yourself check out: https://regex101.com
      // var regex = /(§§?|[aA][Rr][Tt]\.?) ?(\d+[a-z]?) ?([aA][Bb][Ss][.]? ?(\d*)|([iIvVxX]*))? ?.*?([0-9A-Z-]+[0-9a-zA-ZöäüÖÄÜ-]*[A-Z]+[0-9a-zA-ZöäüÖÄÜ-]*( [IVX\d]+)*)/g;
      // var regex = /(§§?|[aA][Rr][Tt]\.?) ?(\d+[a-z]?) ?.*?[\dA-ZÜÖÄ]{1}[\w-]*[A-ZÖÜÄ]{1}( [IVX\d]+)*/g;
      // var regex = /(§§?|[aA][Rr][Tt]\.?) .*?([0-9A-Z-]+[0-9a-zA-ZöäüÖÄÜ-]*[A-Z]+[0-9a-zA-ZöäüÖÄÜ-]*( [IVX\d]+)*)/g;
      
      var nodeArray = [];
      nodeArray.push({'id': 1});
      
      // sinding nodeArray as message
      console.log("References:");
      console.log(nodeArray);
      contentScript.message("mafou", nodeArray)
    },

  // prototype function for sending messages (here: to background script)
  // https://developer.chrome.com/apps/runtime#method-sendMessage
  message: function(subject, content) {
    chrome.runtime.sendMessage({
      from:    'contentScript',
      subject: subject,
      content: content
    });
  },

  listener: function() {
    chrome.runtime.onMessage.addListener(function (message, sender, response) {
      if ((message.from === 'background') && (message.subject === 'content')) {
        // data from backend is received and sidebar content can be created
        console.log("Quotes found:");
        console.log(message.content)
        // contentScript.sidebarCont(message.content);
      }
    });
  },

}

contentScript.listener();
contentScript.search();
// toggle();
// chrome.runtime.onMessage.addListener(function(msg, sender){
//     if(msg == "toggle"){
//     	document.getElementById('abra').src=chrome.runtime.getURL("popup.html");
//         toggle();
//         // create();
//     }
// })
// const puppeteer = require('puppeteer');

// async function getPic() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.screenshot({path: 'google.png'});

//   await browser.close();
// }

// getPic();

// var iframe = document.createElement('iframe'); 
// iframe.id = 'abra';
// iframe.style.background = "gray";
// iframe.style.height = "80%";
// iframe.style.width = "0px";
// iframe.style.position = "fixed";
// iframe.style.top = "0px";
// iframe.style.right = "0px";
// iframe.style.zIndex = "9000000000000000000";
// iframe.frameBorder = "none"; 

// document.body.appendChild(iframe);
// // toggle();
// function toggle(){
//     if(iframe.style.width == "0px"){
//         iframe.style.width="400px";
//     }
//     else{
//         iframe.style.width="0px";
//     }
// }
