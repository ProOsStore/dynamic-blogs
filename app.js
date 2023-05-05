
$(document).ready(() => {

  const url = "posts.json";

  function getPosts() {

    $.getJSON(url, (data) => {

      const posts = data.posts;

      if (posts.length === 0) {

        $("#blog-posts").html("<p>No posts yet.</p>");

      } else {

        posts.forEach((post) => {

          const postHTML = `

            <div class="card my-3">

              <img src="${post.image}" class="card-img-top" alt="${post.title}">

              <div class="card-body">

                <h5 class="card-title">${post.title}</h5>

                <p class="card-text">${post.content}</p>

              </div>

            </div>

          `;

          $("#blog-posts").append(postHTML);

        });

      }

    });

  }

  getPosts();

});
