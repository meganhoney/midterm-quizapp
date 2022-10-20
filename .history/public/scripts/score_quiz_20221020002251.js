$(document).ready(function() {

  /*
  Ajax request to display zname of logged in user in nav
  */
    const displayUser = function() {

      $.ajax("/api/users/user", {
        method: "GET"
      })
      .then((response) => {
        const username = `
        <a class="nav-item nav-link" href="#">
        ${response.user[0].name}
        </a>
        `;
        const $user = $("#user");
        $(username).prependTo($user);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    }

  }
