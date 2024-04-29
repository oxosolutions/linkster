$(document).ready(function(){
     var htmlContent = `
	 <div class="linkster-sidebar">
	 	<div class="sidebar-handle"></div>
		<div class="auto-linkedin-group">
			<a class="aione-button linkster-grab-links" title="Grab Links" href="#">Grab Links</a>
			<a class="aione-button linkster-grab-gomains" title="Grab Domains" href="#">Grab Domains</a>
			<a class="aione-button linkster-send-links" title="Send Links" href="#">Send Links</a>
			<a class="aione-button linkster-send-gomains" title="Send Domains" href="#">Send Domains</a>
		</div>
	</div>

	<style type="text/css">
	.application-outlet {
		margin-left: 140px;
	}
	.linkster-sidebar {
		width: 120px;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 10px 10px 0 10px;
		background-color: #ffffff;
		box-sizing: border-box;
		z-index: 99998;
		transform:translateX(-120px);
		box-shadow: 0 0 12px -4px rgb(0 0 0 / 20%);
		-webkit-transition: all 300ms ease-in-out;
		-moz-transition: all 300ms ease-in-out;
		-o-transition: all 300ms ease-in-out;
		transition: all 300ms ease-in-out;

	}
	.linkster-sidebar.active {
		transform:translateX(0);
	}
	.linkster-sidebar  .sidebar-handle{
		position: absolute;
		transform: translateX(120px);
		left: 0;
		bottom: 0;
		width: 30px;
		height: 30px;
		background-color: #283e4a;
		cursor: pointer;
		z-index: 99999;
		-webkit-transition: all 300ms ease-in-out;
		-moz-transition: all 300ms ease-in-out;
		-o-transition: all 300ms ease-in-out;
		transition: all 300ms ease-in-out;
	}
	.linkster-sidebar.active  .sidebar-handle{
		transform:translateX(120px);
	}
	.linkster-sidebar  .sidebar-handle:before{
		content: "";
		display: block;
		box-sizing: border-box;
		margin: 5px;
		width: 20px;
		height: 20px;
		border: 2px solid #ffffff;
		border-radius: 50%;
		-webkit-transition: all 300ms ease-in-out;
		-moz-transition: all 300ms ease-in-out;
		-o-transition: all 300ms ease-in-out;
		transition: all 300ms ease-in-out;
	}
	.linkster-sidebar .linkster-group {
		margin-bottom: 10px;
		border-bottom: 1px solid #e8e8e8;
	}
	.linkster-sidebar .aione-button{
	    background-color: #283e4a;
	    color: #ffffff;
	    padding: 4px;
	    margin: 0 0 10px 0;
	    border-radius: 4px;
	    width: 100%;
	    display: block;
	    font-size: 12px;
	    line-height: 22px;
	    text-align: center;
	    box-sizing: border-box;
		-webkit-transition: all 200ms ease-in-out;
		-moz-transition: all 200ms ease-in-out;
		-o-transition: all 200ms ease-in-out;
		transition: all 200ms ease-in-out;
	}
	.linkster-sidebar .aione-button:hover{
		background-color: #0077b5;
		color: #ffffff;
	}
	.linkster-sidebar .linkster-title,
	.linkster-sidebar .linkster-subtitle{
		color: #d8d8d8;
		text-decoration: none;
		text-align: center;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.linkster-sidebar .linkster-title{
		font-size: 15px;
		line-height: 30px;
	}
	.linkster-sidebar .linkster-subtitle{
		font-size: 13px;
		line-height: 18px;
	}
	.linkster-sidebar .linkster-title:hover,
	.linkster-sidebar .linkster-subtitle:hover{
		color:#ED6F1D;
	}
	</style>`;

	$('body').append(htmlContent);

	// grabDomains();
	// sendDomains();

	function grabLinks(){

		// get all a tags
		links = document.querySelectorAll('a');
		// loop over links variable to get href for each
		for ( var i = 0; i < links.length; i++ ) {

			var link = links[i].href;
			localStorage.setItem('link_'+i,link);
		}

	}


	function grabDomains(){

		// get all a tags
		links = document.querySelectorAll('a');

		// loop over links variable to get href for each
		for ( var i = 0; i < links.length; i++ ) {
			var link = links[i].href;
			var hostname = extractHostname( link );

			var hostname_exists = localStorage.getItem( hostname );
			if( !hostname_exists ) {
				localStorage.setItem( hostname, hostname );
			}

			var rootdomain= extractRootDomain( hostname );

			var rootdomain_exists = localStorage.getItem( rootdomain );
			if( !hostname_exists ){
				localStorage.setItem( rootdomain, rootdomain );
			}
			
		}

	}

	function extractHostname(url) {
	    var hostname;
	    //find & remove protocol (http, ftp, etc.) and get hostname

	    if (url.indexOf("//") > -1) {
	        hostname = url.split('/')[2];
	    }
	    else {
	        hostname = url.split('/')[0];
	    }

	    //find & remove port number
	    hostname = hostname.split(':')[0];
	    //find & remove "?"
	    hostname = hostname.split('?')[0];

	    hostname = hostname.replace('www.', '');

	    return hostname;
	}

	function extractRootDomain( url ) {
	    var domain = extractHostname(url),
	        splitArr = domain.split('.'),
	        arrLen = splitArr.length;

	    //extracting the root domain here
	    //if there is a subdomain 
	    if (arrLen > 2) {
	        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
	        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
	        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
	            //this is using a ccTLD
	            domain = splitArr[arrLen - 3] + '.' + domain;
	        }
	    }
	    return domain;
	}

	function getLinks(){
		var links = [];
		var keys = Object.keys( localStorage );
		var i = keys.length;

		while ( i-- ) {

			var key = keys[i];

			is_link = key.includes( 'link' );

			if( is_link ){

				var link = localStorage.getItem( key );
				links.push( link );
			}

		}

		return links;

	}
	function sendLinks(){
		var links = getLinks();
		// console.log(links);

	}

	function getDomains(){

		var domains = [];
		var keys = Object.keys( localStorage );
		var i = keys.length;

		while ( i-- ) {

			var key = keys[i];

			is_link = key.includes( 'link' );

			if( !is_link ){

				var domain = localStorage.getItem( key );
				domains.push( domain );

			}

		}

		return domains;

	}

	function sendDomains(){
		var domains = getDomains();
		// console.log(domains);
	}




	
	//Sodebar Handle
	$('.sidebar-handle').click(function(){
		var items = $('.linkster-sidebar').toggleClass( 'active' );
	});

	//Grab Links
	$('.linkster-grab-links').click(function(){
		grabLinks();

	});

	//Grab Domains
	$('.linkster-grab-gomains').click(function(){
		grabDomains();
	});

	//Send Links
	$('.linkster-send-links').click(function(){
		sendLinks();
	});
	
	//Send Domains
	$('.linkster-send-gomains').click(function(){
		sendDomains();
	}); 
});
