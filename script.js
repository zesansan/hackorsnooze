$(function() {
  const $form = $(".form");

  //clever hostname filter that stephen made
  $("ol").on("click", "li > .hostname > a", function(e) {
    e.preventDefault();
    //console.log("I am " + $(this).text());
    let $a = $("small > a");
    //console.log("a is " + $a);
    let $link = $(this).text();
    $a.each(function(i, ele) {
      if ($(ele).text() !== $link) {
        $(ele)
          .parent()
          .parent()
          .hide();
      }
    });
    $(".favall").text("all");
  });

  //hostname extractor for new articles
  function hostnameURL(inputURL) {
    let URL = "";
    for (let i = inputURL.indexOf(".") + 1; i < inputURL.length; i++) {
      URL = URL.concat(inputURL[i]);
      if (inputURL[i] === "/") {
        break;
      }
    }
    let domain = $("<a>")
      .attr("href", "#")
      .text("(" + URL + ")");
    return domain;
  }

  //set favorites
  $(".favall").on("click", function(e) {
    let el = $(this);
    if (el.text() === "favorites") {
      el.text("all");
      $("ol > li > i.fa-star-o")
        .parent()
        .hide();
    } else if (el.text() === "all") {
      el.text("favorites");
      //ol > li > .homstname .parent().show()
      $("ol > li > i.fa-star-o")
        .parent()
        .show();
      $("ol > li").show();
    }
  });

  //article submission
  $form.on("submit", function(e) {
    // append form submission
    e.preventDefault();
    let $title = $("#abc").val();
    let $URL = $("#xyz").val();
    let $starDefault = $("<i>")
      .attr("class", "fa fa-star-o")
      .attr("aria-hidden", "true");
    let $domain = hostnameURL($URL);

    let $hostname = $("<small>")
      .attr("class", "text-muted hostname")
      .append($domain);
    let $newLink = $("<a>")
      .attr("href", $URL)
      .attr("target", "_blank")
      .text(" " + $title + " ");

    let $newLi = $("<li>")
      .attr("class", "row list-group-item")
      .append($starDefault)
      .append($newLink)
      .append($hostname);

    $(".articles").append($newLi);

    $("#abc").val("");
    $("#xyz").val("");
    $("#exampleAccordion > .item > #exampleAccordion1").toggleClass("show");
    $("#exampleAccordion > .nav-link .item > a").toggleClass("collapsed");
  });

  $("ol").on("click", "li > i", function(e) {
    $(this).toggleClass("fa fa-star-o fa fa-star");
  });

  //hostname extract
  function newHostname(url) {
    let URL = "";
    for (let i = url.indexOf("/") + 2; i < url.length; i++) {
      if (url[i] === "/") {
        break;
      }
      URL += url[i];
    }
    return "(" + URL + ")";
  }

  //populate with 10 articles
  $.getJSON("https://hack-or-snooze.herokuapp.com/stories?limit=10").then(
    function(response) {
      console.log(response);
      response.data.forEach(function(val, idx, arr) {
        var $newTitle = $("<a>")
          .attr("href", arr[idx].url)
          .attr("target", "_blank")
          .text(" " + arr[idx].title + " ");

        var $newHostname = $("<small>")
          .attr("class", "text-muted")
          .attr("class", "hostname")
          .text(newHostname(arr[idx].url));

        var $starsDefault = $("<i>")
          .attr("class", "fa fa-star-o")
          .attr("aria-hidden", "true");

        var $newLi = $("<li>")
          .attr("class", "row list-group-item")
          .append($starsDefault)
          .append($newTitle)
          .append($newHostname);

        $("ol").append($newLi);
      });
    }
  );

  //signup form
  $("#signupForm").on("submit", function(e) {
    $.ajax({
      method: "POST",
      url: "https://hack-or-snooze.herokuapp.com/users",
      dataType: "JSON"
    });
    $("#newUsername").val("");
    $("#newUserPassword").val("");
    alert("successfully registered!!");
  });
});
