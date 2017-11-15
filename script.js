$(function() {
  // get stories
  $.getJSON("https://hack-or-snooze.herokuapp.com/stories?limit=10").then(
    function(response) {
      console.log("newest stories loaded.")
      //looping through each array item in data object
      response.data.forEach(function(val, idx, arr) {
        //article title
        var $newTitle = $("<a>")
          .attr("href", arr[idx].url)
          .attr("target", "_blank")
          .text(" " + arr[idx].title + " ");

        //hostname
        var $newHostname = $("<small>")
          .attr("class", "text-muted hostname")
          .append(newHostname(arr[idx].url));

        //star
        var $starsDefault = $("<i>")
          .attr("class", "fa fa-star-o")
          .attr("aria-hidden", "true");

        //combine into list item
        var $newLi = $("<li>")
          .attr("class", "row list-group-item")
          .append($starsDefault)
          .append($newTitle)
          .append($newHostname);

        //push into article body
        $("ol").append($newLi);
      });
    }
  );

  //login user
  $("#loginForm").on("submit", function(e) {
    e.preventDefault();

    $username = $("#username").val();
    $password = $("#userPassword").val();

    //authorization check can be reused for newuser login
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

  //global variables
  let $username;
  let $password;
  let $token = localStorage.getItem("token");

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

        //login new user
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

  //submit new story
  const $form = $(".form");

  $form.on("submit", function(e) {
  
    e.preventDefault();
    let $title = $("#newTitle").val();
    let $URL = $("#newURL").val();
    let $author = $("#newAuthor").val();
    $.ajax({
      url: "https://hack-or-snooze.herokuapp.com/stories",
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      data: {
        data: {
          username: JSON.parse(atob($token.split(".")[1])).username,
          title: $title,
          author: $author,
          url: $URL
        }
      }
    }).then(function(e) {

      console.log("adding new article!");
     
      let $title = $("#newTitle").val();

      let $URL = $("#newURL").val();

      let $starDefault = $("<i>")
        .attr("class", "fa fa-star-o")
        .attr("aria-hidden", "true");

      let $domain = newHostname($URL);

      let $hostname = $("<small>")
        .attr("class", "text-muted")
        .attr("class", "hostname")
        .append("<a>")
        .attr("href", "#")
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

      //adding new stories to the top of the pile
      $(".articles").prepend($newLi);

      //clear form
      $("#newTitle").val("");
      $("#newURL").val("");
      $("#newAuthor").val("");
    });

    //need to get user info again after this to localStorage article names posted by user

  });

  //starz
  $("ol").on("click", "li > i", function(e) {
  //need to check to see if logged in
    $.ajax({  
      url: "https://hack-or-snooze.herokuapp.com/users/username/favorites/storyId",
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      data: {
        data: {
          username: JSON.parse(atob($token.split(".")[1])).username,
          title: $title,
          author: $author,
          url: $URL
        }
      }
    }).then(function(e) {
      console.log($username);
    alert("please log in or sign up to save favorites");
    //if logged in
    $(this).toggleClass("fa fa-star-o fa fa-star");
  });
 })   

  //hostname extract function
  function newHostname(url) {
    let URL = "";
    for (let i = url.indexOf("/") + 2; i < url.length; i++) {
      if (url[i] === "/") {
        break;
      }
      URL += url[i];
    }

    let domain = $("<a>")
      .attr("href", "#")
      .text("(" + URL + ")");

    return domain;
  }

});  
