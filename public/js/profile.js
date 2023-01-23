const challengeBtn = document.querySelector('.friends-row');
const searchBtn = document.querySelector('.searchBtn');
const searchField = document.querySelector('.searchField');
const userList = document.querySelector(".userList");

challengeBtn.addEventListener('click',(event)=>{
	if(event.target.match('.challenge-btn')){
		id = event.target.getAttribute('data-id');
		console.log(id);
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
