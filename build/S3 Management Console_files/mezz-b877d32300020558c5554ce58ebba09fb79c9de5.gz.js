(function(){var a=window.AWSC?AWSC:{},h=a.startTime,g=a.stdeltaStartTime,d=window.AWSConsoleMetrics?AWSConsoleMetrics:{},e=d.startTime,c=a.Clog?a.Clog:{},b=c.log;if(!b){return}if(h){f("stdelta-dec",e);f("stdelta-sim",g)}function f(j,i){if(i){b(j,i-h,undefined,undefined,"ms")}}})();(function(){var c=(window.ConsoleNavService&&ConsoleNavService.getLocation?ConsoleNavService.getLocation():window.location),q="/p/log/1/"+encodeURIComponent(c.pathname.split("/")[1])+"/1/OP/",j=2000,m=1900,l=20,A=10000,z=1,e=200;var u=0,k,y=0,f=false,g=false,w=false;setInterval(function(){if(y>=z){y=y-z}},A);var p=function x(C,E){var D="";if(C.key!==undefined){D+="&k"+E+"="+C.key;if(C.value!==undefined){D+="&m"+E+"="+C.value}if(C.detail!==undefined){D+="&d"+E+"="+C.detail}if(C.pageId){D+="&p"+E+"="+C.pageId}if(C.unit){D+="&u"+E+"="+C.unit}if(C.logLevel){D+="&l"+E+"="+C.logLevel}if(C.category){D+="&c"+E+"="+C.category}}return D},v=function s(){var D="",C="",E=0,H=0,F={},G=q.length;while(AWSC.Clog.system.curItem()&&G<m){F=AWSC.Clog.system.curItem();if((q.length+p(F,E).length)>m){C+=p(AWSCLog.system.dequeue(),H);H+=1}else{G+=p(F,E).length;if(G<m){D+=p(AWSCLog.system.dequeue(),E);E+=1}else{break}}}if(D){i(q+D)}if(C){r(q,C)}window.clearTimeout(k);k=setTimeout(t,j)},t=function B(C){if(w){return true}w=true;if(!g){if(!(window.onerror.sbh)||!(window.error.sbh)||!(window.onbeforeunload.sbh)){var E="Event handlers modified:";if(!window.onerror.sbh){E+="onerror "}if(!window.error.sbh){E+="error "}if(!window.onbeforeunload.sbh){E+="onbeforeunload "}AWSC.Clog.system.prequeue("clogWarn",1,E);g=true}}if(AWSC.Clog.system.curItem()){var D=new Date().getTime();if(y>l){if(!f){i(q+"&k1=clogMaxCalls&m1=1");f=true}k=setTimeout(t,j)}else{if(u<D-j){v()}else{if(C===true){v()}else{k=setTimeout(t,j)}}}}w=false;return true},b=function o(){var C=AWSC.Clog.system.extractProxyRequestID();var D="";if(C){D="&proxy-rid="+C}return D},i=function n(C){C=AWSC.Clog.system.getEndpoint()+C;var D=C+"&cb="+(new Date().getTime())+b();D=encodeURI(D);var E=new Image();E.src=D;u=(new Date().getTime());y+=1},r=function h(C,D){C=AWSC.Clog.system.getEndpoint()+C;D=D+b();try{var F=new XMLHttpRequest();F.open("POST",C,true);F.withCredentials=true;F.setRequestHeader("Content-type","multipart/form-data");F.send(encodeURI(D))}catch(E){}u=(new Date().getTime());y+=1},a=function d(){var C=t();if(C){AWSC.Clog.system.onEnqueue(t);if(AWSC.Clog.system.curItem()){t(true)}}};if(window.addEventListener){window.addEventListener("load",a,false)}else{if(window.attachEvent){window.attachEvent("onload",a,false)}}})();(function(){var i="awsc-exp-data-present",h="awsc-exp-data-invalid";var g=function(e){if(e.hasOwnProperty("enabled")){return e.enabled?"1":"0"}if(e.hasOwnProperty("value")){return e.value}return null};var f=function(e,l,k){var j={key:e,value:l};if(k){j.category=k}AWSC.Clog.log(j)};var b=document.querySelector("meta#meta-features-json");if(b){f(i,"1");try{var a=b.getAttribute("data-featuresjson"),c=JSON.parse(a);c.forEach(function(k){var e=k.externalId,j=g(k);if(typeof e!=="undefined"){f(e,j,"exp")}});f(h,"0")}catch(d){f(h,"1")}}else{f(i,"0")}})();