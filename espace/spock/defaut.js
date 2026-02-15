// JavaScript Document
var cleCSRF = $('#cleCSRF').attr("data-rel");

//Easter Egg 
var state = 0;
window.addEventListener("keydown", function(e)
{
	let konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
	
	if (state == konami.length) location.reload();	
	if (e.key == konami[state]) state++; else state = 0;
	if (state == konami.length) 
	{
		document.body.style.display = 'none';
		document.documentElement.setAttribute('style', 'height:100%; background:url(img/42.gif) black center no-repeat');
		audio = new Audio('img/tron.flac');
		audio.play();
	}
}, true);


//AJAX Refresh
function ajaxRefresh()
{
	if ($('#ajaxRefresh').length && !$('.modal').hasClass('show'))
	{
		//Block new modal openning
		$('button[data-bs-toggle="modal"]').prop('disabled', true);

		$.ajax({
			type: 'GET',
			url: location.href,
			success: function(data)
			{
				var id = [];
				$('#vue .collapse.show').each(function() { id.push($(this).attr('id')) });
				$('#ajaxRefresh').html($(data).find('#ajaxRefresh').html());
				id.forEach(function(v) { $('#'+v).addClass('show').parent().find('.dropdown-toggle').removeClass('collapsed'); });
				
				ajaxBind();
			},
			error: function() { location.reload(); }
		});
	}
}
if ($('#ajaxRefresh').length) setInterval(ajaxRefresh, 30000);

//AJAX Submits
function ajaxPost()
{
	let e = $(this);
	e.find(":submit").after('<div class="spinner-border apWait" role="status"><span class="sr-only">Loading...</span></div>').hide();

	$.ajax({
		type: 'POST',
		url: e.attr('action'),
		data: new FormData(this),
		contentType: false,
		processData: false,
		
		beforeSend: function(jqXHR) { jqXHR.e = e; },
		success: function(data, textStatus, jqXHR)
		{	
			var id = [];
			$('#vue .collapse.show').each(function() { id.push($(this).attr('id')) });
			$('#vue').html($(data).find('#vue').html());
			id.forEach(function(v) { $('#'+v).addClass('show').parent().find('.dropdown-toggle').removeClass('collapsed'); });
			
			ajaxBind();
			
			let url = $(jqXHR.e).attr('action');
			let idx = url.indexOf("#");
			if (idx != -1) $('body, html').animate({scrollTop:($('#'+url.substring(idx+1)).offset().top - 10)}, 'slow');
		},
		error: function (jqXHR) { $(jqXHR.e).submit(); }
	});
	return false;
}

function ajaxEdit()
{
	let e = $(this);

	$.ajax({
		type: 'POST',
		url: location.href,
		data: 'r='+e.attr('name')+'&i='+e.attr('data-id')+'&d='+e.val()+'&state='+cleCSRF,
		
		beforeSend: function(jqXHR) { jqXHR.e = e; },
		success: function(data, textStatus, jqXHR)
		{
			if ($(jqXHR.e).hasClass("ajaxLink") || $(jqXHR.e).hasClass("ajaxInputRefreshed"))
			{	
				var id = [];
				$('#vue .collapse.show').each(function() { id.push($(this).attr('id')) });
				$('#vue').html($(data).find('#vue').html());
				id.forEach(function(v) { $('#'+v).addClass('show').parent().find('.dropdown-toggle').removeClass('collapsed'); });
				
				ajaxBind();
				$(".chronosStop").click(startStopTimer);
			}
		},
		error: function() { alert('Une erreur est survenue lors de l\'enregistrement'); }
	});
	return false;
}

//Popper
function popperInit()
{
	$('.tooltip').remove();
	
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

	const toastElList = document.querySelectorAll('.toast');
	const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
	toastList.forEach(toast => toast.show());
}

//Binding AJAX
function ajaxBind()
{
	//$('.modal').on('hidden.bs.modal', ajaxRefresh);
	$(".ajaxInput").unbind("change").change(ajaxEdit);
	$(".ajaxInputRefreshed").unbind("change").change(ajaxEdit);
	$(".ajaxLink").unbind("click").click(ajaxEdit);
	
	$(".ajaxPost").submit(ajaxPost);
	$(".chronosSelect").click(selectTimer);
		
	$("td").addClass("align-middle text-break");
	$("th").addClass("align-middle");
	popperInit();
	dataMatrix();

	//Canvas and Pills
	if ($('#canvasPropu').length )
	{
		drawPropu();
		drawThrust();
	}
}
$(document).ready(ajaxBind);

//Data Matrix
function dataMatrix()
{
	$('.barcode').each( function ()
	{
		var e = $(this);
		if (e.html() == "")
		{		
			try {
				let svg = bwipjs.toSVG({
					bcid:		e.attr('data-bcid'),
					text:		e.attr('data-text'),
					scale:		e.attr('data-scale'),
					padding:	4
				});

				let [ , width, height ] = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
				e.html(svg).width(width+'px').height(height+'px').css('zoom', .5);
			}
			catch (e) { console.log(e); }
		}
	});
}

//Auto-scroll tableau
let hold=0;
function autoScroll()
{
	if ($('.autoScroll').length && $(window).height() != $(document).height() && $(window).width() > 576)
	{
		if (hold<50) hold++;
		else {
			if ($(window).scrollTop() + $(window).height() < $(document).height()-10) window.scrollBy(0,1);
			else {
				window.scrollTo(0,0);
				hold = 0;
			}
		}
	}		
	setTimeout(autoScroll,50);
}
$(document).ready(autoScroll);


//Annonces
var audio;
$(".announcement").click(function()
{
	announcementReset();
	
	let src = $(this).attr('name');
	if (src != "")
	{
		audio = new Audio('img/'+src+'.mp3');
		audio.play();
		audio.onended = announcementReset;
		
		$(this).addClass("active list-group-item-secondary");
		$(".stop").removeClass("d-none");
		$(".play").addClass("d-none");
		
		audio.ontimeupdate = function() {
			let left = audio.duration - audio.currentTime;
			if (left > 0) $('#duration').html( parseInt((left / 60) % 60) + ':' + String(parseInt(left % 60)).padStart(2, '0') );
		};
	}

	return false;
});
function announcementReset()
{
	if (audio != null)
	{
		audio.pause();
		audio.ontimeupdate = audio = null;
	}
	
	$(".announcement").removeClass("active list-group-item-secondary");
    $(".stop").addClass("d-none");
    $(".play").removeClass("d-none");
	
	$('#duration').html("0:00");
}

//Chrono
function accurateTimeout(fn, time) {
	let nextAt, timeout;
	nextAt = new Date().getTime() + time;

	function wrapper() {
		nextAt += time;
		timeout = setTimeout(wrapper, nextAt - new Date().getTime());
		fn();
	}
	function cancel() {
		return clearTimeout(timeout);
	}
	timeout = setTimeout(wrapper, nextAt - new Date().getTime());

	return { cancel };
}
function setWakeLock() {
	let lock;
	async function set() {
		try {
			lock = await navigator.wakeLock.request("screen");
		}
		catch (err) {
			console.log(`${err.name}, ${err.message}`);
		}
	}
	function cancel() {
		if (lock != null) lock.release();
	}
	set();

	return { cancel };
}

let timer, wl, on = false, elapsed = 0, tick = null;
function startStopTimer() {
	if (on) {
		on = false;
		timer.cancel();
		$('.chronosSend').val(elapsed/10).removeClass("d-none");
	}
	else {
		timer = accurateTimeout(() => {
			elapsed++;
			on = true;
			document.getElementById("chronosTimer").textContent = (elapsed/10).toFixed(1);
		}, 100);
		$(".chronosSend").addClass("d-none");
	}
	window.navigator.vibrate(50);
	tick.play();
	return false;
}
function resetTimer() {
	if (on) {
		on = false;
		timer.cancel();
		wl.cancel();
	}
	elapsed = 0;
	$('.chronosSend').addClass("d-none").val('0');
	$('#chronosTimer').html('0.0');
}
function selectTimer()
{
	if (tick == null) tick = new Audio('img/tick.mp3');
	resetTimer();
	wl = setWakeLock();
	$('.chronosTitle').html($(this).attr('name'));
	$('.chronosSend').attr('data-id', $(this).attr('data-id'));
	$('.chronosStop').removeClass('disabled');

	window.onbeforeunload = function() { if (on) return ""; }
	return false;
}
$(".chronosStop").mousedown(startStopTimer);

//Geolocalisation
function initGeo()
{
	if ($('#geoReturn').length)
	{	
		let options = {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		};		
		navigator.geolocation.watchPosition(geoSuccess, geoError, options);
	}
}
function geoSuccess(pos)
{
    let crd = pos.coords;
	let text;
	
	if (crd.accuracy < $('#geoReturn').attr('data-accuracy'))
	{
		text = '<i class="fas fa-location"></i> GÃ©olocalisation acquise';
		$('#geoReturn').removeClass('alert-danger alert-warning').addClass('alert-success');
		$('.recupGeo').removeClass('disabled').val(Math.trunc(pos.timestamp/1000)+','+crd.latitude+','+crd.longitude+','+Math.round(crd.accuracy*10)/10);
	}
	else
	{
		text = '<i class="fas fa-spinner fa-spin"></i> GÃ©olocalisation en cours';
		$('#geoReturn').removeClass('alert-success alert-danger').addClass('alert-warning');
		$('.recupGeo').addClass('disabled').val('');
	}
	
	text += '<br /><small>'+crd.latitude+'Â°, '+crd.longitude+'Â°, Â±'+Math.round(crd.accuracy*10)/10+'m</small>';
	$('#geoReturn').html(text);
}
function geoError(err)
{
    $('#geoReturn').removeClass('alert-success alert-warning').addClass('alert-danger').html('<i class="fas fa-exclamation-circle"></i> GÃ©olocalisation impossible<br /><small>Error '+err.code+' : '+err.message+'</small>');
	$('.recupGeo').addClass('disabled').val('');
}
$(document).ready(initGeo);


//Carte des retombÃ©es
function initMap() {
	if (!$('#map').length) return;
		
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: new google.maps.LatLng(46.5, 1.8),
      mapTypeId: google.maps.MapTypeId.SATELLITE
    });
	
	if (locations.length < 1) return;
	
	//points de retombÃ©es
    let infowindow = new google.maps.InfoWindow();
	let bounds = new google.maps.LatLngBounds();
    let marker, rampe, azimut;
	
    locations.forEach(function(loc) {  
		if (loc[1] == null || loc[2] == null) return; //Si manque longitude ou latitude
        
		if (loc[5] == "azimut") azimut = new google.maps.LatLng(loc[2], loc[1]);
		else if (loc[5] == "rampe")
		{
			rampe = new google.maps.LatLng(loc[2], loc[1]);
			if (azimut != null)
			{
				let axe = google.maps.geometry.spherical.computeHeading(rampe, azimut);
				if (axe < 0) axe += 360;
				loc[0] += '<br />'+Math.round(axe)+'Â°';
			}
		}
		
		if (loc[3] == "" || loc[4] == null) return; //Si manque marker ou opacitÃ©
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(loc[2], loc[1]),
			map: map,
			icon: {                             
				url: "https://www.planete-sciences.org/espace/spock/img/maps/" + loc[3] + "-marker.png"
			},
			opacity: loc[4]
        });
		bounds.extend(marker.position);
		
		google.maps.event.addListener(marker, 'click', (function(marker) {
			return function() {
				infowindow.setContent(loc[0]);
				infowindow.open(map, marker);
			}
		})(marker));
    });
	map.fitBounds(bounds);
	
	if (rampe != null && azimut != null)
	{
		//Calculs centre du gabarit
		let ratio = porteeBal/google.maps.geometry.spherical.computeDistanceBetween(rampe, azimut);
		let centre = google.maps.geometry.spherical.interpolate(rampe, azimut, ratio);
		console.log('Distance Rampe-Azimut '+Math.round(google.maps.geometry.spherical.computeDistanceBetween(rampe, azimut)*10)/10+' m');
		
		//Axe de lancement
		new google.maps.Polyline({
			path: [rampe, centre],
			geodesic: true,
			strokeColor: "#01A5AB",
			strokeWeight: 2,
			map: map
		});

		//Gabarit
		new google.maps.Circle({
			center: centre,
			radius: gabarit,
			strokeColor: "#01A5AB",
			strokeWeight: 2,
			fillOpacity: 0,
			map: map
		});
	}
}