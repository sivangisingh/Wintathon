
    // var nodeArray = [];
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
      nodeArray.push({'id': 1, 'markText':"ljskasl"});
      
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
        contentScript.sidebarCont(message.content);
      }
    });
  },
  sidebarInit: function() {
    // creating sidebar DOM element
    var sidebar = document.createElement('div');
    sidebar.id = "linkedSideBar";

    // creating close button DOM element for sidebar (X)
    var closeBtn = document.createElement('div');
    closeBtn.id = ('linkedSideBarCloseBtn');
    closeBtn.innerText = "X"
    // making close button clickable
    closeBtn.onclick = function(){contentScript.sidebarClose()};
    sidebar.appendChild(closeBtn);

    document.body.appendChild(sidebar);
  },

  // function for closing sidebar by changing css of DOM body and sidebar
  sidebarClose: function() {
    document.getElementById('linkedSideBar').style.width = "0";
    document.body.style.marginRight = "0";
    contentScript.sidebar = false;
  },

  // function for opening sidebar
  sidebarOpen: function(id) {
    document.getElementById('linkedSideBar').style.width = "250px";
    document.body.style.marginRight = "250px";
    // passing of quote ID so that quote fulltext opens in sidebar when clicking
    // highlighted quote
    // if (id)
    //   contentScript.sidebarDrop(document.getElementById("linkedSideTitle" +
    //                                                                       id));
    contentScript.sidebar = true;
  },

  // creating content of sidebar
  sidebarCont: function(nodeArray) {
    var sidebContNode = document.createElement('div');
    sidebContNode.id = "linkedSideCont";

    // nodeArray = contentScript.sort(nodeArray)

    // iterating through quotes Data and creaing each title and fulltext for
    // sidebar
    //nodeArray.forEach(function(node, i) {
      // sidebShow is True when it is unique so that no duplicates are shown
      // if (node.sidebShow) {

      //   // create sidebar Titles
        var nodeTitle = document.createElement('p');
        // nodeTitle.id = "linkedSideTitle" + (nodeArray[0]);
      //   // giving title element class identification
      //   nodeTitle.className = "linkedSideTitles";
        nodeTitle.innerText = nodeArray[0];
      //   nodeTitle.onclick = function() {contentScript.sidebarDrop(this)};
      //   sidebContNode.appendChild(nodeTitle);

      //   // create each sidebar quote fulltext content
      //   var nodeInner = document.createElement('div');
      //   nodeInner.id = "linkedSideInner" + (node.id);
      //   nodeInner.className = "linkedSideInners";
      //   // adding each passage of fulltext to sidebar and giving each a <span>
      //   // element, so that the quoted one can be highlighted
      //   for (var abs in node.fullNorm) {
      //     var absHTML = document.createElement('span');
      //     absHTML.id = "linkedIn" + node.dictKey + "_" + abs;
      //     absHTML.innerHTML = node.fullNorm[abs];
      //     // node.abs is quoted passage
      //     if (abs === node.abs) {absHTML.style.color = "#bfac31"}
      //     // if abs is none then whole paragraph highlighted
      //     if (node.abs === null) {absHTML.style.color = "#bfac31"}
      //     nodeInner.appendChild(absHTML);
      //   }

      //   // if fulltext in sidebar is clicked, the source is opened in new tab or
      //   // window
      //   url ="https://www.google.com";// contentScript.findURL(node.markText, node.para, node.fURL);
      //   nodeInner.onclick = function(){window.open(url,'_blank')};

      //   sidebContNode.appendChild(nodeInner);
      // }

      // // highlighted quotes are beeing adjusted and made clickable
      // // if fulltext was found or not
      // // node.sidebLink is True when there is a matching sidebar entry
      // if (node.sidebLink) {
      //   var linkedIn = document.getElementById('linkedIn' + node.id)
      //   linkedIn.onclick = function(){
          contentScript.sidebarOpen(1);
      //   }
      //   linkedIn.className = 'linkedInGreen'
      // } else {
      //   var linkedIn = document.getElementById('linkedIn' + node.id)
      //   linkedIn.className = 'linkedInRed'
      // }
    // });

    document.getElementById('linkedSideBar').appendChild(sidebContNode);
  },

  // sorting algorithm for entrys in sidebar
  // https://stackoverflow.com/a/13820874
  sort: function(nodeArray) {
    function compare(a,b) {
     if (a.gesetz === b.gesetz) {
         if (a.para === b.para) {
             return (a.abs < b.abs) ? -1 : (a.abs > b.abs) ? 1 : 0;
         } else {
             return (a.para < b.para) ? -1 : 1;
         }
     } else {
          return (a.gesetz < b.gesetz) ? -1 : 1;
     }
   }
    return nodeArray.sort(compare);
  },

  // function for creating url path of quoted fulltext source
  findURL: function(markText, para, fURL) {
    if (markText.slice(0, 3).toLowerCase() === "art")
      var urlPart = "art_" + para
    else
      var urlPart = "__" + para
    var url =   "https://www.gesetze-im-internet.de/" +
                fURL + "/" + urlPart + ".html"

    return url
  },

  // executed when title in sidebar is clicked to show fulltext
  sidebarDrop: function(norm) {
    norm.classList.toggle("active");
    var panel = norm.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
  }


}

contentScript.listener();
contentScript.search();
contentScript.sidebarInit();
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
