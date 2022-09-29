let input = document.querySelector(".search input");
let btn = document.querySelector(".search button");
let reposContainer = document.querySelector(".container .repos");
let reposCount = document.querySelector(".container .count");

btn.onclick = function () {
  reposContainer.innerHTML = "";
  reposCount.innerHTML = "";
  getRepos();
};

input.onkeyup = function (e) {
  if (e.key == "Enter") {
    btn.click();
  }

  // btn.style.pointerEvents = "auto";
  reposContainer.innerHTML = "";
  reposCount.innerHTML = "";
};

function getRepos() {
  if (!input.value) {
    reposContainer.innerHTML =
      "<div style='color: red; font-size: 17px'>Please Write Github Username.</div>";
    return;
  }

  fetch(`https://api.github.com/users/${input.value}/repos`)
    .then((result) => {
      let data = result.json();
      return data;
    })
    .then((result) => {
      reposCount.innerHTML = result.length;
      for (let i = 0; i < result.length; i++) {
        let div = document.createElement("div");
        let repo = document.createTextNode(result[i].name);
        let repoStarts = document.createElement("span");
        let url = document.createElement("a");
        repoStarts.appendChild(
          document.createTextNode(result[i].stargazers_count)
        );
        url.appendChild(document.createTextNode("Visit"));
        url.href = `https://github.com/${input.value}/${result[i].name}`;
        url.target = "_blanc";
        div.className = "repo";
        div.appendChild(repo);
        div.appendChild(repoStarts);
        div.appendChild(url);
        reposContainer.appendChild(div);
      }
    });

  // btn.style.pointerEvents = "none";
}
