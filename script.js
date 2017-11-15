$(function() {
  const $form = $(".form");

  //login form
  $("#loginForm").on("submit", function() {
    $.ajax({
      method: "POST",
      url: "https://hack-or-snooze.herokuapp.com/auth",
      data: {
        data: {
          username: $("#username").val(),
          password: $("#userPassword").val()
        }
      }
    }).then(function(response) {
      console.log(response, "yeaaaaahh!");
      localStorage.setItem("token", response.data.token);
    });

    $(".loginHeader").text($("#username").val());
    console.log($("#username").val());
    $("#username").val("");
    $("#userPassword").val("");
    $("#loginForm").hide();
    $(".signupHeader").text("sign out");
  });

  //clever hostname filter that stephen made
  $("ol").on("click", "li > .hostname > a", function(e) {
    e.preventDefault();
    let $a = $("small > a");
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

  // set favorites
  $(".favall").on("click", function(e) {
    let el = $(this);
    if (el.text() === "favorites") {
      el.text("all");
      $("ol > li > i.fa-star-o")
        .parent()
        .hide();
    } else if (el.text() === "all") {
      el.text("favorites");
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
    if ($(".loginHeader").text() === "login") {
      alert("please login or sign up to submit articles!");
    } else if ($(".loginHeader").text() !== "login") {
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
    }
  });
  //starz
  $("ol").on("click", "li > i", function(e) {
    if ($(".loginHeader").text() === "login") {
      alert("please login or sign up to favorite articles!");
    } else if ($(".loginHeader").text() !== "login") {
      $(this).toggleClass("fa fa-star-o fa fa-star");
    }
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
      //console.log(response);
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
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "https://hack-or-snooze.herokuapp.com/users",
      data: {
        data: {
          name: $("#newUser").val(),
          username: $("#newUsername").val(),
          password: $("#newUserPassword").val()
        }
      }
    }).then(function(response) {
      console.log(response);
      if (response.error.status === 409) {
        alert(response.error.message);
      } else {
        alert("successfully registered!!");
      }
    });

    $("#newUser").val("");
    $("#newUsername").val("");
    $("#newUserPassword").val("");
  });

  $.ajax({
    url: "https://hack-or-snooze.herokuapp.com/users/" + $
  });
});
