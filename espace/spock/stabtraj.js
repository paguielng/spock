// JavaScript Document

//Nombre de transitions
function stjTrans()
{
	let nb = $('#Nb_trans').val();
	
	if (nb < 1) $('#stjTransA').hide(); else $('#stjTransA').show();
	if (nb < 2) $('#stjTransB').hide(); else $('#stjTransB').show();
	if (nb < 3) $('#stjTransC').hide(); else $('#stjTransC').show();
}

//Ailerons canard
function stjAil()
{
	if ($('#Q_can').val() < 1) $('.canard').addClass('d-none'); else $('.canard').removeClass('d-none');
}

//Depotage/minuterie
function stjDep()
{
	$('#dep_reglageM').hide();
	$('#dep_reglageD').hide();

	if ($('#dep_moteur').val() == 0) $('#dep_reglageM').show();
	else $('#dep_reglageD').show();
}

//Satellites
function stjSat()
{
	$('#sat_reglage').hide();
	$('#sat_reglage2').hide();

	if ($('#m_satellite').val() > 0) $('#sat_reglage').show();
	if ($('#m_satellite2').val() > 0) $('#sat_reglage2').show();
}

//Parachutes
function stjPara()
{
	$('#F_paraA').hide();
	$('#F_paraB').hide();
	$('#F_satelliteA').hide();
	$('#F_satelliteB').hide();
	$('#F_satellite2A').hide();
	$('#F_satellit2B').hide();

	if ($('#F_para').find(":selected").val() == '2') $('#F_paraB').show();
	else $('#F_paraA').show();

	if ($('#F_satellite').find(":selected").val() == '2') $('#F_satelliteB').show();
	else $('#F_satelliteA').show();

	if ($('#F_satellite2').find(":selected").val() == '2') $('#F_satellite2B').show();
	else $('#F_satellite2A').show();
}

//AJAX
function stjRefresh()
{
	if (!$('.modal').hasClass('show'))
	{
		//Block new modal openning
		$('button[data-bs-toggle="modal"]').prop('disabled', true);
		
		if ($('#stabtraj').length)
		{
			$.ajax({
				type: 'GET',
				url: location.href,
				success: function(data)
				{
					$('#stabtraj').html($(data).find('#stabtraj').html());
					stjInit();
				},
				error: function() { location.reload(); }
			});
		}
	}
}
function stjEdit()
{
	let val;
	if ($(this).attr("type") == "checkbox") val = $(this).is(':checked');
	else val = $(this).val();
	
	let e = $(this);
	$('body').css('cursor', 'progress');
	
	$.ajax({
		type: 'POST',
		url: location.href,
		data: 'r='+e.attr('name')+'&i='+e.attr('data-id')+'&d='+val+'&state='+cleCSRF,
		
		beforeSend: function (jqXHR) { jqXHR.e = e; },
		complete: function () { $('body').css('cursor', 'inherit'); },
		success: function (data, textStatus, jqXHR)
		{
			if ($(jqXHR.e).attr('name') == "controles" || $(jqXHR.e).attr('name') == "controlesNA") //MaJ barre de progression et contrÃ´les
			{
				var id = $('.accordion-collapse.show').attr('id');
				$('#stabtraj').html($(data).find('#stabtraj').html());
				$('#'+id).addClass('show').parent().find('.accordion-button').removeClass('collapsed');
				stjInit();
			}
			if ($(jqXHR.e).attr('name') == "flag") //MaJ titre
				$('#stabtraj .title').html($(data).find('#stabtraj .title').html());
		},
		error: function () { alert('Une erreur est survenue. Etes vous connectÃ© ?'); }
	});
	return false;
}

//Pills
function stjPills()
{
	$('#stjMenu a[data-bs-toggle="pill"]').on('shown.bs.tab', function(e) {
		localStorage.setItem('activeStjTab'+$('#stjMenu').attr("data-id"), $(e.target).attr('href'));
	});
	let activeTab = localStorage.getItem('activeStjTab'+$('#stjMenu').attr("data-id"));
	if (activeTab) $('#stjMenu a[href="' + activeTab + '"]').tab('show');
}

//Highlights ContrÃ´les
function controlesHighlights()
{
	//Rouge si moins de 10
	if ($("#stabtraj").find('input[name="controles"]:not(:checked):not([disabled])').length < 5)
		$("#stabtraj").find('input[name="controles"]:not(:checked):not([disabled])').parent().addClass("text-danger");

	//Boutons fullNA	
	$('input[name="fullNA"]').each(function ()
	{
		let p = $(this).parent().parent();
		let totalOK = p.find('input[name="controles"]:checked').length;
		let totalNA = p.find('input[name="controlesNA"]:checked').length;
		let total = p.find('input[name="controles"]').length;

		if (totalNA == total)
		{
			$(this).prop("checked", true);
			p.parent().parent().find('.accordion-button').addClass("text-decoration-line-through");
		}
		else if (totalOK+totalNA == total)
			p.parent().parent().find('.accordion-button').addClass("text-success");
		else
			p.parent().parent().find('.accordion-button').addClass("text-danger");

		p.parent().parent().find('.count').html( (totalOK+totalNA) +'/'+total+' - '+totalNA+' na');
	});
	$('input[name="fullNA"]').click(function ()
	{
		if ($(this).prop("checked"))
			$(this).parent().parent().find('input[name="controlesNA"]:not(:checked):not(:disabled)').each(function () { $(this).prop("checked", true).triggerHandler('change'); });
		else
			$(this).parent().parent().find('input[name="controlesNA"]:checked').each(function () { $(this).prop("checked", false).triggerHandler('change'); })
	});
}

//Bind everything
function stjInit()
{
	$('.modal').on('shown.bs.modal', stjTrans); //Affichage transitions
	$('.modal').on('shown.bs.modal', stjAil); //Affichage transitions
	$('.modal').on('shown.bs.modal', stjDep); //Affichage dÃ©potage
	$('.modal').on('shown.bs.modal', stjSat); //Affichage satellites
	$('.modal').on('shown.bs.modal', stjPara); //Affichage para
	
	$('.modal').on('hidden.bs.modal', stjRefresh); //Refresh aprÃ¨s mise Ã  jour donnees

	$(".stjInput").unbind("change").change(stjEdit); //MaJ des donnees
	$('#Nb_trans').change(stjTrans); //Init affichage transitions
	$('#Q_can').change(stjAil); //Init affichage canard
	$('#dep_moteur').change(stjDep); //Init affichage dÃ©potage
	$('#m_satellite').change(stjSat); //Init affichage sat
	$('#m_satellite2').change(stjSat); //Init affichage sat2
	$('#F_para').change(stjPara); //Init affichage para
	$('#F_satellite').change(stjPara); //Init affichage satellite

	dataMatrix();

	
	//Canvas and Pills
	if ($('#stabtraj').length )
	{
		stjPills();
		drawFusee();
		drawCanSat();
		drawStabilite();
		drawTrajectoire();
		controlesHighlights();
	}
	
	//Read only
	if ($('.readOnly').length)
	{
		$('.modal-body :input').attr('disabled', true);
		$('#controles :input').attr('disabled', true);
	}
}
$(document).ready(stjInit);