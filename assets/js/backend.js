var config = {
  apiKey: "AIzaSyDAUEfE3fLqtK8Qs2THWETrffAMesO7Gss",
  authDomain: "porfoliopage-tracking.firebaseapp.com",
  databaseURL: "https://porfoliopage-tracking.firebaseio.com",
  projectId: "porfoliopage-tracking",
  storageBucket: "porfoliopage-tracking.appspot.com",
  messagingSenderId: "1097633097198"
};
firebase.initializeApp(config);

var database = firebase.database();
/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
      iceServers: []
  }),
  noop = function() {},
  localIPs = {},
  ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
  key;

  function iterateIP(ip) {
      if (!localIPs[ip]) onNewIP(ip);
      localIPs[ip] = true;
  }

   //create a bogus data channel
  pc.createDataChannel("");

  // create offer and set local description
  pc.createOffer(function(sdp) {
      sdp.sdp.split('\n').forEach(function(line) {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
      });
      
      pc.setLocalDescription(sdp, noop, noop);
  }, noop); 

  //listen for candidate events
  pc.onicecandidate = function(ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

//Scrolling Effect in Jquery
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


//Event listener for the parralx effect
$(document).ready(function(){
    $('.parallax').parallax();
  });

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'bottom'
    });
});


getUserIP(function(ip){
  document.getElementById("ip-address").innerHTML = 'Your public IP is : '  + ip ;

  // Sun Dec 17 1995 03:24:00 GMT...
database.ref("/visitor-ip").push(
  {
      ip: JSON.stringify(ip),
      date:  (new Date()).toString()
  }
);
  //Send to firebase ass a vistior 

});

$(document).ready(function(){
  $('.carousel').carousel();
});


$(document).ready(function(){
  $('#').carousel();
});