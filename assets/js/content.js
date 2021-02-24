console.log( "Content JS Loaded" );

document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var script = document.createElement( 'script' );
var code = document.createElement( 'script' );

//append all elements
document.body.appendChild( script );
document.body.appendChild( code );

script.src = 'https://api.darlic.com/linkster/assets/js/jquery-3.5.1.min.js'; 
code.src = 'https://api.darlic.com/linkster/assets/js/script.js'; 

/*
function loadScript(scriptName, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = chrome.extension.getURL('lib/' + scriptName + '.js');
    scriptEl.addEventListener('load', callback, false);
    document.head.appendChild(scriptEl);
}
*/