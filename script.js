$(function() {

	const $form = $('.form')

	
	// $('ol').on('click', 'li > .hostname > a',function(e) {
	// 	e.preventDefault(e);
	// 	console.log($(this).text())
	// 	let link = $(this).text();
	// 	//if ($(this).parent().parent().children():contains(link) {
	// 		//if sibling li > a.text() !== this then hide and change favorites to all 
	// 	// if($(this).parent().parent():contains(link)){
	// 	// 	link.text('all')
	// 	// 	$('ol > li > i.fa-star-o').parent().hide()
	// 	// } else if (link.text() === 'all') {
	// 	// 	//
	// 	// 	link.text('favorites');
	// 	// 	$('ol > li > i.fa-star-o').parent().show();
	// 	// }
	// 	let $siblings = $(this).parent().parent().children();

	// 	if(!"$siblings:contains(link)"){
	// 		$siblings.parent().hide();
	// 	}

	// })

	function hostnameURL($URL){
		let URL ="";
		for(let i =$URL.indexOf(".")+1; i<$URL.length; i++){
			URL= URL.concat($URL[i]);
			if($URL[i]==="/"){
				break;
			}
		}
		let domain = $("<a>").attr('href', "#").text("("+URL+")")
		return domain;
	}

	$('.favall').on('click', function(e) {
		
		let el = $(this)
		if (el.text() === 'favorites') {
			
			el.text('all')
			$('ol > li > i.fa-star-o').parent().hide()

		} else if (el.text() === 'all') {
			
			el.text('favorites');
			//ol > li > .homstname .parent().show()
			$('ol > li > i.fa-star-o').parent().show();

		}
	})



	$form.on('submit', function(e) {
		// append form submission
		e.preventDefault();
		let $title = $('#abc').val();
		let $URL = $('#xyz').val();
		let $starDefault =$('<i>').attr('class', 'fa fa-star-o').attr('aria-hidden', 'true');
		let $domain = hostnameURL($URL)



		

		let $hostname = $("<small>").attr('class', 'text-muted hostname').append($domain);
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

	// $("ul").on("click", "li > i", function(e){
	// 	$(this).toggleClass('fa fa-star-o fa fa-star')

	// });

});