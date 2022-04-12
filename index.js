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
    
    fetch('https://random.dog/woof.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById('randomDogImg').src = `${data.url}`
    })
    .catch((error)=>{
        console.log(error)
    })
}

function addEventListeners(){
    let submitForm = document.getElementById('submitForm')
    submitForm.addEventListener('submit', formPost)
    submitForm.addEventListener('submit', newRosterForm)
    document.getElementById('refresh').addEventListener('click', randomDogGet)
    document.getElementById('dealCardsOne').addEventListener('click', dealCardOne)
    document.getElementById('dealCardsTwo').addEventListener('click', dealCardTwo)   
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
    event.reset
}

function newRosterForm(event){
      
    const name = document.getElementById('dogName').value
    const age = document.getElementById('dogAge').value
    const dogImg = document.getElementById('randomDogImg').src
    const roster = document.getElementById('playerRoster')   
    const listItem = document.createElement('li')
    const node = document.createTextNode('')
        
    listItem.appendChild(node)
    
    listItem.innerHTML = `<div style="margin: 20px;">
                          <img src='${dogImg} 'height='200px'' 'width='200px''><br>
                          <p> name: '${name}'</p>
                          <p> age: '${age}' </p>
                          <button id='${name}'>add to game</button>
                          </div>`

    roster.appendChild(listItem)

    document.getElementById(`${name}`).addEventListener('click', addPlayerToGame)
    
    function addPlayerToGame(){

        let playerOneName = document.getElementById('playerOneName')
        let playerTwoName = document.getElementById('playerTwoName')
        let playerOne = document.getElementById('playerOneImg')
        let playerTwo = document.getElementById('playerTwoImg')

        if (playerOneName.innerText === ''){
            playerOne.src = dogImg
            playerOneName.innerText = `${name}`
        } else {
            playerTwo.src = dogImg
            playerTwoName.innerText = `${name}`
        }

    }
    
}

function dealCardOne(){
    let hand = document.getElementById('cardHandOne')
    let total = hand.value
    let randomNum = Math.random() * (10 - 1) + 1
    let newTotal = total +++ Math.round(randomNum)
    
    if (total <= 20){
        hand.value = newTotal     
    } else if (total >= 21){
        alert('Player one loses')
    }
}
function dealCardTwo(){
    let hand = document.getElementById('cardHandTwo')
    let total = hand.value
    let randomNum = Math.random() * (10 - 1) + 1
    let newTotal = total +++ Math.round(randomNum)
    
    if (total <= 20){
        hand.value = newTotal
    } else if (total >= 20){
        alert('Player Two loses')
    }
}

document.addEventListener('DOMContentLoaded', init)