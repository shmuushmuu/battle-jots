const friendBtns = document.querySelector('.friends-row');
const sentBtns =  document.querySelector('.sent-friends-row');
const receivedBtns =  document.querySelector('.received-friends-row');
const searchBtn = document.querySelector('.searchBtn');
const searchField = document.querySelector('.searchField');
const userList = document.querySelector(".userList");
const wordField = document.querySelector('.word-field');

const cancelFriendRequest = id => {
	fetch('/api/users/addFriend',{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({id: id})
	}).then(response=>response.json())
	.then(data=>{
		console.log(data)
		window.location.reload();
	});
}

const acceptFriendRequest = id => {
	fetch('/api/users/addUser',{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({id: id})
	}).then(response=>response.json())
	.then(data=>{
		console.log(data)
		window.location.reload();
	});
}

friendBtns.addEventListener('click',(event)=>{
	if(event.target.matches('.challenge-btn')){
		id = event.target.getAttribute('data-id');
		console.log(id);
		// prompt word entry
		const wordInput = document.createElement('input');		
		wordInput.setAttribute('data-id', 'word-field');
		wordInput.setAttribute('data-type', 'text');
		wordInput.textContent = "Enter Word";
		friendBtns.appendChild(wordInput);
		


		fetch('/api/challenges/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name:wordInput.value})
	})
	}
});

sentBtns.addEventListener('click',(event)=>{
	if(event.target.matches('.cancel-btn')){
		id = event.target.getAttribute('data-id');
		console.log(id);
		cancelFriendRequest(id);
	}
});

receivedBtns.addEventListener('click',(event)=>{
	if(event.target.matches('.cancel-btn')){
		id = event.target.getAttribute('data-id');
		console.log(id);
		cancelFriendRequest(id);
	}
	else if(event.target.matches('.accept-btn')){
		id = event.target.getAttribute('data-id');
		console.log(id);
		acceptFriendRequest(id);
	}
});

searchBtn.addEventListener('click',(event)=>{
	console.log(searchField.value);
	fetch('/api/users/findUser',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name:searchField.value})
	})
		.then(response=>response.json())
		.then(({users})=>{
			
			users.map(user=>{
				const li = document.createElement('li');
				const liDiv = document.createElement('div');
				const liTitle = document.createElement('h4');
				const liButton = document.createElement('button');

				liButton.setAttribute('data-id',user.id);
				liButton.setAttribute('class','btn btn-success addUser');
				liButton.textContent = "Add User";
				liTitle.textContent = user.username;

				liDiv.appendChild(liTitle);
				liDiv.appendChild(liButton);
				li.appendChild(liDiv);
				userList.appendChild(li);
			})
		})
});

userList.addEventListener('click',(event)=>{
	if(event.target.matches('.addUser')){
		const id = event.target.getAttribute('data-id');
		console.log(id);
		fetch('/api/users/addUser',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({receiver_id:id})
		}).then(response=>response.json())
		.then(data=>{
			window.location.reload();
		});
	}
});
