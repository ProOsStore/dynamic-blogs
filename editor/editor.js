
const url = 'https://api.github.com/repos/ProOsStore/dynamic-blogs/contents/posts.json';

const token = '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';

function getBlogs() {

  axios

    .get(url, {

      headers: {

        Authorization: `token ${token}`,

      },

    })

    .then((response) => {

      const content = JSON.parse(atob(response.data.content));

      const posts = content.posts;

      const blogList = document.querySelector('#blog-list');

      blogList.innerHTML = '';

      posts.forEach((post) => {

        const li = document.createElement('li');

        li.textContent = post.title;

        blogList.appendChild(li);

      });

    })

    .catch((error) => console.error(error));

}

function saveBlog() {

  const title = document.querySelector('#title').value;

  const image = document.querySelector('#image').value;

  const content = document.querySelector('#content').value;

  if (!title || !image || !content) {

    alert('Please enter all fields.');

    return;

  }

  const post = { title, image, content };

  axios

    .get(url, {

      headers: {

        Authorization: `token ${token}`,

      },

    })

    .then((response) => {

      const content = JSON.parse(atob(response.data.content));

      const posts = content.posts;

      posts.push(post);

      const newContent = {

        ...content,

        posts,

      };

      const encodedContent = btoa(JSON.stringify(newContent, null, 2));

      return axios.put(

        url,

        {

          message: 'Add new blog post',

          content: encodedContent,

          sha: response.data.sha,

        },

        {

          headers: {

            Authorization: `token ${token}`,

          },

        }

      );

    })

    .then(() => {

      alert('Blog post saved successfully.');

      getBlogs();

    })

    .catch((error) => console.error(error));

}

document.addEventListener('DOMContentLoaded', () => {

  getBlogs();

  const saveButton = document.querySelector('#save');

  saveButton.addEventListener('click', saveBlog);

});

