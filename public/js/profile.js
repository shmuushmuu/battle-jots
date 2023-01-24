import { WORDS } from "./words.js";

const friendBtns = document.querySelector('.friends-row');
const sentBtns = document.querySelector('.sent-friends-row');
const receivedBtns = document.querySelector('.received-friends-row');
const searchBtn = document.querySelector('.searchBtn');
const searchField = document.querySelector('.searchField');
const userList = document.querySelector('.userList');
const wordField = document.querySelector('.word-field');
const challengeData = document.querySelector('.challenge-data');

//Challenge Buttons
const sentChallengesBtn = document.querySelector('.sent-challenges');
const receivedChallengesBtn = document.querySelector('.received-challenges');
const acceptedChallengesBtn = document.querySelector('.accepted-challenges');

const cancelFriendRequest = id => {
  fetch('/api/users/addFriend', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      window.location.reload();
    });
}

const acceptFriendRequest = id => {
  fetch('/api/users/addUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      window.location.reload();
    });
}

friendBtns.addEventListener('click', (event) => {
  if (event.target.matches('.challenge-btn')) {
    const invitee_id = event.target.getAttribute('data-id');
    const word = wordField.value;

    if(!WORDS.includes(word)){
      return alert('Not a valid 5-letter word')
    }

    fetch('/api/challenges/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        invitee_id: invitee_id,
        word: word
      })
    }).then(response => response.json())
      .then(data => console.log(data));
  }
});

sentBtns.addEventListener('click', (event) => {
  if (event.target.matches('.cancel-btn')) {
    id = event.target.getAttribute('data-id');
    console.log(id);
    cancelFriendRequest(id);
  }
});

receivedBtns.addEventListener('click', (event) => {
  if (event.target.matches('.cancel-btn')) {
    id = event.target.getAttribute('data-id');
    console.log(id);
    cancelFriendRequest(id);
  }
  else if (event.target.matches('.accept-btn')) {
    id = event.target.getAttribute('data-id');
    console.log(id);
    acceptFriendRequest(id);
  }
});

searchBtn.addEventListener('click', (event) => {
  console.log(searchField.value);
  fetch('/api/users/findUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: searchField.value })
  })
    .then(response => response.json())
    .then(({ users }) => {

      users.map(user => {
        const li = document.createElement('li');
        const liDiv = document.createElement('div');
        const liTitle = document.createElement('h4');
        const liButton = document.createElement('button');

        liButton.setAttribute('data-id', user.id);
        liButton.setAttribute('class', 'btn btn-success addUser');
        liButton.textContent = "Add User";
        liTitle.textContent = user.username;

        liDiv.appendChild(liTitle);
        liDiv.appendChild(liButton);
        li.appendChild(liDiv);
        userList.appendChild(li);
      })
    })
});

userList.addEventListener('click', (event) => {
  if (event.target.matches('.addUser')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    fetch('/api/users/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ receiver_id: id })
    }).then(response => response.json())
      .then(data => {
        window.location.reload();
      });
  }
});

// challenge button event listeners
sentChallengesBtn.addEventListener('click', event => {
  fetch('/api/challenges/sentChallenges')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      challengeData.innerHTML = "";
      data.map(challenge => {
        const col = document.createElement('div');
        col.setAttribute('class', 'col-12 bg bg-dark text-light mb-1');
        const timestamp = document.createElement('p');
        timestamp.textContent = "" + challenge.createdAt;
        const title = document.createElement('h5');
        title.textContent = "Invitee: " + challenge.username;
        const word = document.createElement('pre');
        word.setAttribute('class', 'border border-1 rounded m-1 p-1')
        word.textContent = "The word: " + challenge.word;

        col.appendChild(timestamp);
        col.appendChild(title);
        col.append(word);
        challengeData.append(col)
      })
      //challengeData
    });
})

receivedChallengesBtn.addEventListener('click', event => {
  fetch('/api/challenges/receivedChallenges')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      challengeData.innerHTML = "";
      data.map(challenge => {
        const col = document.createElement('div');
        col.setAttribute('class', 'col-12 bg bg-dark text-light mb-1');
        const timestamp = document.createElement('p');
        timestamp.textContent = "" + challenge.createdAt;
        const title = document.createElement('h5');
        title.textContent = "Challenger: " + challenge.username;
        // const word = document.createElement('pre');
        // word.setAttribute('class','border border-1 rounded m-1 p-1')
        // word.textContent = "The word: " + challenge.word;
        const acceptBtn = document.createElement('button');
        acceptBtn.setAttribute('class', 'btn btn-secondary acceptChl mb-2');
        acceptBtn.setAttribute('data-id',challenge.id);
        acceptBtn.textContent = "Accept Challenge"

        col.appendChild(timestamp);
        col.appendChild(title);
        col.appendChild(acceptBtn);
        challengeData.append(col)
      })
      //challengeData
    });
})

acceptedChallengesBtn.addEventListener('click', event => {
  fetch('/api/challenges/acceptedChallenges')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      challengeData.innerHTML = "";
      data.map(challenge => {
        const col = document.createElement('div');
        col.setAttribute('class', 'col-12 bg bg-dark text-light mb-1');
        const timestamp = document.createElement('p');
        timestamp.textContent = "" + challenge.createdAt;
        const title = document.createElement('h5');
        title.textContent = "Challenger: " + challenge.username;
        const goBtn = document.createElement('button');
        goBtn.setAttribute('class', 'btn btn-secondary goChl mb-2');
        goBtn.setAttribute('data-id',challenge.id);
        goBtn.textContent = "Play Game";
        //word.textContent = "The word: " + challenge.word;

        col.appendChild(timestamp);
        col.appendChild(title);
        col.appendChild(goBtn);
        challengeData.append(col)
      })
      //challengeData
    });
});

challengeData.addEventListener('click', event => {
  if (event.target.matches('.acceptChl')) {
    const id = event.target.getAttribute('data-id');
    fetch('/api/challenges/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    }).then(response=>response.json())
    .then(data=>window.location.replace(`/game/${id}`))
  }
  else if(event.target.matches('.goChl')){
    const id = event.target.getAttribute('data-id');
    window.location.replace(`/game/${id}`);
  }
})