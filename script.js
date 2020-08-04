const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const source = 'Hey Girl! Hey!';

//Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('Tell me: ', joke);
    VoiceRSS.speech({
        key: '0b32d68d77044b3284a1c1f6980c853b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


//Get Jokes from joke API
async function getJokes() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    let joke = '';
    try {
        const response = await fetch(apiUrl); 
        const data = await response.json();  
        if(data.type === "twopart"){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //text-to-Speech
        tellMe(joke); 

        //Disbable button
        toggleButton();

    } catch (error) {
        //catch errors here
        console.log('Whoops!', error);
    }
    
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)
