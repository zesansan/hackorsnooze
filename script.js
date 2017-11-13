$(function() {



	const $form = $('.form')

	
	$('.favall').on('click', function(e) {
		console.log('HI')
		let el = $(this)
		if (el.text() === 'favorites') {
			console.log('i am fav')
			el.text('all')
		} else if (el.text() === 'all') {
			console.log('i am all')
			el.text('favorites');
		}
	})



	$form.on('submit', function(e) {
		// append form submission
		e.preventDefault();
		let $title = $('#abc').val();
		let $URL = $('#xyz').val();
		let $starDefault =$('<i>').attr('class', 'fa fa-star-o').attr('aria-hidden', 'true');
		function hostnameURL($URL){
			let URL = "";
			let counter = 0;
			for(let i =$URL.length-1; i>-1; i--){
				URL = $URL[i] + URL;
				if($URL[i]==="."){
					counter ++;
					if(counter >1){
						return "("+URL.slice(1)+")";
					}
				}
			}
		}
		let $hostname = $("<small>").attr('class', 'text-muted hostname').append(hostnameURL($URL));
		let $newLink = $("<a>")
      		.attr("href", $URL)
      		.attr("target", "_blank")
      		.text(" " + $title + " ");

		let $newLi = $('<li>').attr('class', 'row list-group-item').append($starDefault).append($newLink).append($hostname);
		

		$('.articles').append($newLi);
		
		$("#abc").val("");
		$("#xyz").val("");
		
	})

	$("ol").on("click", "li > i", function(e){
		$(this).toggleClass('fa fa-star-o fa fa-star')

	});



});