function grabHyperlinks() {
    let hyperlinks = document.getElementsByTagName('a').length;
    console.log('# of hyperlinks in page: ' + hyperlinks);
    return hyperlinks;
}

function grabURL() {
    let URL = window.location.href;
    console.log(URL);
    return URL;
}

function showPopup(show) {
    // Check if the boolean parameter is 1.
    if (show === "[1]") {
      // Create a new popup window.
      var popup = window.open("https://storage.googleapis.com/pop--up-bucket/popup.html","Popup", "width=500,height=130");
      //let getting = browser.runtime.getBackgroundPage();
      //getting.then(onGot, onError)      
    }
  }
//browser.runtime.sendMessage({"hyperlinks":grabHyperlinks(),"url":grabURL()})
pre_links = grabHyperlinks();
pre_url = grabURL();
function logURL(url,links) {
  
    //var cheerio = require('cheerio');
    console.log(`Starting log URL...`);
    let my_request = new Request("https://phisherman-370713.nw.r.appspot.com/predict"); //https://phisherman-370713.nw.r.appspot.com/predict
    //let url_body = requestDetails.body;
    let url_string = String(url);
    if (url_string == "https://phisherman-370713.nw.r.appspot.com/predict" || url_string == "https://storage.googleapis.com/pop--up-bucket/popup.html" ){
        return;
    }
    console.log(`Created PhisherMan Backend REST style request...`);
    //var hyp_array = [];
    //var links = document.getElementsByTagName('a')
    //for(var i=0, max=links.length; i<max; i++) {
    //    hyp_array.push(links[i].href);
    //}
    let url_length = url_string.length;
    console.log(`Created URL String`);
    let dot_count = ((url_string.match(/\./g)||[]).length);
    console.log(`Created Dot Count`);
	let param_count = ((url_string.match(/\=/g)||[]).length);
    console.log(`Created Param Count`);
    //let digits = ((url_string.match(/\d/g)||[]).length);
    //console.log(`Created Digits`);
    //let digit_ratio = digits / url_length;
    
    //digit_ratio = digit_ratio || 0;
    console.log(`Created Digit Ration`);
    let sus_url = ((url_string.match(/security|login|signin|bank|account|update|include|webs|online/g)||[]).length);
    console.log(`Created SusUrl`);
    //let body = String(url_body);
    let no_hyperlinks = (links==0);
    
    //no_hyperlinks = no_hyperlinks ? 1 : 0;
    console.log(`Created No Links`);
    console.log(`[*]Finished Creating All Vars!![*]`);
    
    //console.log(`Loading: ${requestDetails.url}`);
    //console.log(links);
    console.log(`Length: `+ url_length);
    console.log(`Dots: ` + dot_count);
    //console.log(`Digit count in URL: ` + digits);
    //console.log(`Sus count in URL: ` + sus_url);
    //console.log(`Ratio Count: ` + digit_ratio);
    console.log(`Hyperlinks Count: ` + links);
    //console.log(`No Hyperlinks?: ` + no_hyperlinks);
	console.log(`Param Count: ` + param_count);
  
  
    //feature: number of hyperlinks in page
    //feature: no hyperlinks in page
  
  
    //console.log(`Commas: `+ comma_count);
    data = {'features':[String(url_length),String(param_count)]};
    console.log(JSON.stringify(data));
    fetch(my_request, {method: 'POST', body: JSON.stringify(data) })
        .then((response) => response.text())
        .then((text) => {
            console.log('Warn? ...' + text)
            //if (showPopup(text) == true){
                //browser.runtime.sendMessage({"warn": true});
            //}
            showPopup(text)
        });
   //   if (response.status === 200) {
   //     return console.log(`Warn? ... ` + response.resolve());
   //   } else {
   //     throw new Error('Something went wrong on API server!');
   //   }
   // })
   // .then((response) => {
   //   console.debug(response);
      // …
   // }).catch((error) => {
   //   console.error(error);
   // });
}
console.log(`Calling LogURL...`);
logURL(pre_url,pre_links);