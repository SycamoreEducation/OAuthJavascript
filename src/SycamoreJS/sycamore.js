var client_id = "YOUR_CLIENT_ID"; // Replace text in quotes with your API Key
var callback_uri = "YOUR_CALLBACK_URI";

// NOTE: YOU ALSO MUST set Redirect URI for API Key to full home url for this HTML/JS document
// The Redirect URI provided MUST match the callback_uri value exactly - this is part of the OAuth 2 Standard,
// and helps maintain security, by preventing certain types of redirect exploits
// This is done by signing into the API Key Page (http://community.constantcontact.com/t5/Documentation/API-Keys/ba-p/25015)
// Either create a new key or edit an existing key's settings, adding this page's complete URL as the redirect_uri

// Function to parse parameters values from hash when these are returned after call to authenticate
function parseParams (params) {
    var sycamoreAuth = Array();
    var authData = params.split("&",4);
    for (i=0; i < authData.length; i++) {
        var paramVal = authData[i].split("=",2);
        sycamoreAuth.push(paramVal[1]);
    }
    
    return sycamoreAuth;
}

// Function to store the access token in the client in a cookie once authentication is completed
function setCookie(token){
    document.cookie = "sycamore_auth=" + token;
    return;
}

// DEFAULT ACTION
// Function to store the access token in the client's local (persistent) storage once authentication is completed
function setLocalStorage(token){
    localStorage.setItem("sycamore_auth", token);
    return;
}

// Function to store the access token in the client's session (temporary) storage once authentication is completed
function setSessionStorage(token){
    localStorage.setItem("sycamore_auth", token);
    return;
}

// If there is no parameter hash, redirect to sycamore for authorization. Otherwise, request is callback so parse values from hash and display in browser
if (window.location.hash.length == 0) {
    var path = 'https://app.sycamoreeducation.com/oauth/authorize.php?';
    var queryParams = ['client_id=' + client_id,
                       'redirect_uri=' + callback_uri,
                       'scope=general open individual',
                       'response_type=token'];
    var query = queryParams.join('&');
    var url = path + query;
    
    window.open(url,"_self");
} else {
    // Else if there is a parameter hash, parse the parameters from it, set a cookie in the client to store the access token, display values in parameter hash, display explanation of what's happening, and link back to PHP Demo application script within 10 seconds.
    var rawParams = window.location.hash.substring(1);
    var oAuthData = parseParams(rawParams);

    //choose which type of storage you'd like to keep your token in
    setLocalStorage(oAuthData[0]);
    //setSessionStorage(oAuthData[0]);
    //setCookie(oAuthData[0]);
  
    // Uncomment the following line to redirect
    window.open("index.html", "_self");
   
}
