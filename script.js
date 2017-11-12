$(function() {

	// var $starOutlined = $()
	// var $starSolid = $(".fa-star");

	const $form = $('.form')


	$("i").on("click", function(e){
		$(this).toggleClass('fa fa-star-o fa fa-star')

	})

	$form.on('submit', function(e) {
		// append form submission
		e.preventDefault();
		let $title = $('#abc').val();
		let $URL = $('#xyz').val();
		let $newLi = $('<li>').attr('class', 'row list-group-item').append('HIII')
		// $('.articles').append('<li>title is ' + $title + '</li>')
		$('.articles').append($newLi)
		
		$("#abc").val("");
		$("#xyz").val("");
	})

});