$(function() {
  // get stories
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

  //login user
  $("#loginForm").on("submit", function(e) {
    e.preventDefault();

    $username = $("#username").val();
    $password = $("#userPassword").val();

    //authorization check
    $.ajax({
      url: "https://hack-or-snooze.herokuapp.com/auth",
      method: "POST",
      data: {
        data: {
          username: $username,
          password: $password
        }
      }
    }).then(function(response) {
      //storing username and token in localStorage to be used for later
      $token = response.data.token;
      localStorage.setItem("username", $username);
      localStorage.setItem("token", $token);
      console.log(response, "login successful!");
    });

    $(".loginHeader").text($username);
    $("#loginForm").hide();
    $(".signupHeader").text("sign out");

  });

  //request for token to gain access to functions available to users
  // $.ajax({
  //   url: "https://hack-or-snooze.herokuapp.com/users/" + $("#username").val(),
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem("token")
  //   }
  // }).then(function(response) {
  //   console.log(response);

  // });

  //new user
  $("#signupForm").on("submit", function(e) {
    e.preventDefault();
    let $newUser = $("#newUser").val();
    let $newUsername = $("#newUsername").val();
    let $newUserPassword = $("#newUserPassword").val();

    $.ajax({
      method: "POST",
      url: "https://hack-or-snooze.herokuapp.com/users",
      data: {
        data: {
          name: $newUser,
          username: $newUsername,
          password: $newUserPassword
        }
      }
    }).then(function(response) {
      console.log(response);
      if (response.error.status === 409) {
        alert(response.error.message);
      } else {
        alert("successfully registered!!");
        //redefine login credentials to login new user
        $username = $newUsername;
        $password = $newUserPassword;

        $.ajax({
          url: "https://hack-or-snooze.herokuapp.com/auth",
          method: "POST",
          data: {
            data: {
              username: $username,
              password: $password
            }
          }
        }).then(function(response) {
          //storing username and token in localStorage to be used for later
          $token = response.data.token;
          localStorage.setItem("username", $username);
          localStorage.setItem("token", $token);
          console.log(response, "login successful!");
        });
      }
    });

    $(".loginHeader").text($username);
    $("#signupForm").hide();
    $(".signupHeader").text("sign out");
    
  });

  //hostname filter
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

  // function hostnameURL(inputURL) {
  //   let URL = "";
  //   for (let i = inputURL.indexOf(".") + 1; i < inputURL.length; i++) {
  //     URL = URL.concat(inputURL[i]);
  //     if (inputURL[i] === "/") {
  //       break;
  //     }
  //   }
  //   let domain = $("<a>")
  //     .attr("href", "#")
  //     .text("(" + URL + ")");
  //   return domain;
  // }

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
  const $form = $(".form");

  $form.on("submit", function(e) {
    // append form submission
    e.preventDefault();
    if ($(".loginHeader").text() === "login") {
      alert("please login or sign up to submit articles!");
    } else if ($(".loginHeader").text() !== "login") {
      let $title = $("#newTitle").val();

      let $URL = $("#newURL").val();

      let $starDefault = $("<i>")
        .attr("class", "fa fa-star-o")
        .attr("aria-hidden", "true");

      let $domain = newHostname($URL);

      let $hostname = $("<small>")
        .attr("class", "text-muted")
        .attr("class", "hostname")
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

      $(".articles").prepend($newLi);

      $("#newTitle").val("");
      $("#newURL").val("");
      $(
        "#submitArticleFormHeader > .item > #submitArticleFormHeader1"
      ).toggleClass("show");
      $("#submitArticleFormHeader > .nav-link .item > a").toggleClass(
        "collapse"
      );
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

  //hostname extract function
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
});
