// $('form').on('submit', function(){
//   event.preventDefault()
// }) // you dont need this when you're using an API



function displayRepositories(){
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
 
}


function getRepositories(){
  // let username = $('#username').val()
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories) //sends XMLHttpRequest to showRepositories
  // req.open('GET', 'https://api.github.com/users/octocat/repos')
  req.open("GET", `https://api.github.com/users/${username}/repos?page=1`);
  req.send()
}

function displayCommits(){
   var commits = JSON.parse(this.responseText)
   const commitsList = `<ul>${commits.map(c => '<li>' + c.name + ' - <a href="#" data-repo="' + c.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
   document.getElementById("details").innerHTML = commitsList
  
}

function getCommits(element){
  let repo_name = element.dataset.repo
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo_name}/commits?page=1`)
  req.send()
}


function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches(element) {
  const name = element.dataset.repo;
  const username = document.getElementById('username').value
  const url = 'https://api.github.com/repos/'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", url + username + '/' + name + '/branches');
  req.send();
}

