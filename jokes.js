const jokeButton = document.querySelector('.getJoke');
const jokeHolder = document.querySelector('.joke p');
const loader = document.querySelector('.loader');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

const endPoint = 'https://icanhazdadjoke.com';
 
async function fetchJoke() {
  jokeButton.classList.add('hidden');//hidden button
  const response = await fetch(endPoint, {//Has CORS policy so only need endpoint with header(according to icanhazdadjoke)
    headers: {
      Accept: 'application/json'
    }
  });
  const data = await response.json();
  jokeButton.classList.remove('hidden');//visible button
  return data;
}

async function changeJoke() {
 const {joke} = await fetchJoke();//destructuring with {joke} 
  jokeHolder.textContent = joke; // 'data = await fetchJoke()' and then '..innerText = data.joke' works too.
}

function changeButton() {
  jokeButton.textContent = randomItemFromArray(buttonText,jokeButton.textContent);
}

function randomItemFromArray(arr, not) {//utility function
  const item = arr[Math.floor(Math.random()*arr.length)];
  if(item === not) {
    console.log('already used that one');
    return randomItemFromArray(buttonText, jokeButton.textContent);
  }
    return item;
}

function handleClick() {
  changeJoke();
  changeButton();
}

jokeButton.addEventListener('click', handleClick);
changeJoke();

