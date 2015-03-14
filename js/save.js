(function(win, doc) { jQuery(function() {
	var body = doc.body,
		form = doc.querySelector('form.node-form'),
		method = form.getAttribute("method"),
		action = form.getAttribute("action"),
		title = doc.getElementById("edit-title"),
		message_temp = doc.createElement('div'),
		cleanUp = function() {
			var that = this;
			snackbar.appendChild( that );
			setTimeout( function() { that.classList.add("fade-out"); }, 3000);
		},
		snackbar = document.querySelector("#snackbar"),
		transitionEnd = function () { 
			var p=["","webkit","o"],i=-1,l=p.length,r=false,v;
			while ((i+=1)<l) { v=p[i]; if (("on"+v+"transitionend") in win) { r = (v?v+"T":"t")+"ransitionEnd"; break; }}
			return r;
		}().toLowerCase();
		
		message_temp.classList.add( "savesave-message" );

		if ( !snackbar ) {
			snackbar = document.createElement('div');
			snackbar.setAttribute("id", "snackbar")
		}
		
		body.appendChild( snackbar );

	win.addEventListener( "keydown", function(evt) {
		if (evt.keyCode === 83 && evt.metaKey ) {
	        event.preventDefault();
	        var message = message_temp.cloneNode( true );
	        
			if ( title.value !== "" ) {
				
				var data = new FormData( form ), request = new XMLHttpRequest();			
				
				message.addEventListener( transitionEnd, function(evt) {
					if ( evt.propertyName === "opacity" && getComputedStyle(this).opacity === "0" ) {
						this.parentNode.removeChild( this );
					}
				}, false);
				
				message.addEventListener("click", function() {
					this.classList.add("fade-out");
				})
				
				request.open(method, action);
				request.send(data);
				request.onload = function(evt) {
				    if (request.status === 200) {
					    message.innerHTML = title.value + " saved.";
				    } else {
						message.innerHTML = title.value + " was not saved.";   
					}
					
					cleanUp.call( message );
				};

			} else {
				message.innerHTML = 'The <span style="font-style:italic">title</span> field is required.';
				cleanUp.call( message );
			}

			return false;		
		}
		
	}, false);
}); })(window, document);