//Project requirments:

//1. Your app must be a HTML/CSS/JS frontend that accesses data from a public API. 
//   All interactions between the client and the API should be handled asynchronously and use JSON as the communication format.

//2. Your entire app must run on a single page. 
//   There should be NO redirects. In other words, 
//   your project will contain a single HTML file.

//3. Your app needs to incorporate at least 3 separate event listeners 
//   (DOMContentLoaded, click, change, submit, etc).

//4. Some interactivity is required. This could be as simple as adding a "like" button or adding comments. 
//   These interactions do not need to persist after reloading the page.

//5. Follow good coding practices. Keep your code DRY (Do not repeat yourself) 
//   by utilizing functions to abstract repetitive code.

function init(){
    randomDogGet()
    addEventListeners()
}

function randomDogGet(){
    
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById('randomDogImg').src = `${data.message}`
    })
    .catch((error)=>{
        alert(error)
    })
}

function addEventListeners(){
    let submitForm = document.getElementById('submitForm')
    submitForm.addEventListener('submit', formPost)
    submitForm.addEventListener('submit', newRosterForm)
    document.getElementById('refresh').addEventListener('click', randomDogGet)
}

resetForm = () => {
    document.getElementById('submitForm').reset();
}

function formPost(event){
    
    event.preventDefault()
    
    const name = document.getElementById('dogName').value
    const age = document.getElementById('dogAge').value
    const dogImg = document.getElementById('randomDogImg').src
    
    const formData = {
            name: name,
            imgUrl: dogImg,
            age: age
        }

    const configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

     fetch('http://localhost:3000/dogs', configurationObject)
     .catch(()=>{
        alert('Form Post ERROR')
    }) 
    randomDogGet()
}

function newRosterForm(event){
    
    const dogName = document.getElementById('dogName').value
    const age = document.getElementById('dogAge').value
    const dogImg = document.getElementById('randomDogImg').src
    const roster = document.getElementById('rosterList')   
    const listItem = document.createElement('li')
    listItem.className = 'new-list-item'
    // const node = document.createTextNode('')
        
    // listItem.appendChild(node)
    
    listItem.innerHTML = `<div class='card' style='float: left; margin-left:40px; align:top;'>
                          <img src='${dogImg} 'height='200px'' 'width='200px''><br>
                          <p> name: '${dogName}'</p>
                          <p> age: '${age}' </p>
                          <button id='${dogName}'>add ${dogName} to game</button>
                          </div>`

    roster.appendChild(listItem)

    document.getElementById(`${dogName}`).addEventListener('click', createPlayer)
    
    function createPlayer(){
        
        document.getElementById('dealer').addEventListener('click', dealCards)
        const gameRoom = document.getElementById('gameTable')
        const newListItem = document.createElement('li')
        newListItem.className = 'new-list-item'
        const newNode = document.createTextNode('')
        newListItem.appendChild(newNode)
        
        newListItem.innerHTML= 
        
        `<div class='card' style="float: left; margin: 50px;">
        <img src='${dogImg}' height='200px' width='200px'><br>
        name: <p class="dog-name">${dogName}</p>
        age: <p>${age} </p>
        <input type="text" class="card-total" id= ${dogName} value="0">
        </div>`

        gameRoom.appendChild(newListItem)
    
        function dealCards(){
            let [dogNameOne, dogNameTwo] = document.querySelectorAll('.dog-name')
            let [dogTotalOne, dogTotalTwo] = document.querySelectorAll('.card-total')
            // let handOne = document.getElementById(`${dogName}`)
            // let handtwo = document.getElementById(`${dogName}`)

            let strTotalOne = parseInt(dogTotalOne.value)
            let strTotalTwo = parseInt(dogTotalTwo.value)

            let randomNumOne = Math.random() * (10 - 1) + 1
            let randomNumTwo = Math.random() * (10 - 1) + 1
            dogTotalOne.value = Math.round(randomNumOne) + strTotalOne
            dogTotalTwo.value = Math.round(randomNumTwo) + strTotalTwo

            // debugger
            if (parseInt(dogTotalOne.value) === 21 || parseInt(dogTotalTwo.value) === 21){
                parseInt(dogTotalOne.value) === 21 ? alert(`21! ${dogNameOne.textContent} wins!`) : alert(`21! ${dogNameTwo.textContent} wins!`)
    
            } else if (parseInt(dogTotalOne.value) >= 22){
                if (parseInt(dogTotalTwo.value) >= 22) {
                    alert('Both dogs lost')
                }
                alert(`${dogNameOne.textContent} loses!`)
            }
        }

    }
}
document.addEventListener('DOMContentLoaded', init)

