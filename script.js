
const form = document.querySelector('form') //select form here
const resultDiv = document.querySelector('.result') // select an element having class as 'result'

form.addEventListener('submit', (e)=> {
    e.preventDefault() 
    getWordInfo(form.elements[0].value)
})

/*  1. below on form we apply event listener on 'submit' action
       when form get submitted, this arrow function will run
    2. when we clicked submit page get refreshed to prevent it we apply 'preventDefault' on event object 'e'
    3. After form get submitted we want that 'getWordInfo' function should be called
    4. as argument we select pass 'first children of form' which is on 0th index of element
    5. now that value will pass to below stored/declared function

*/

// to avoid spell mistake error we use try-catch block
const getWordInfo = async (word)=> {
    try 
    {
        resultDiv.innerHTML = "Fetching Data..."
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data = await response.json()

        // 1. here we use api from 'dictionary api' & pass its url in fetch
        // 2. at last of original url we have 'hello' word, we replaced it with our function parameter
        // 3. to return promise we use await-async
        // 4. we stored response from api in 'data', here also we use await 
        //    cauz we don'y know how much time it takes to get all data, once we get it all then we proceed further, so we use 'await'

        console.log(data); // here we get all data in console & read & observe it to fetch values


        // Below we are going to add whole html contents inside result div of html, currently it has nothing
        // write HTML in backticks & JS in '${}'


        let definitions = data[0].meanings[0].definitions[0]

        resultDiv.innerHTML = `
            <h2><strong>Word:- </strong> ${data[0].word}</h2>
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:- </strong> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
            <p><strong>Example:- </strong> ${definitions.example === undefined ? "Not Found" : definitions.example}</p> 

        <!-- sometime there is no data we received for a particular field we get 'undefined' there
            so to avoid that we use ternary operator above
            if there is no data then it shows msg as 'Not Found', otherwise it will shows value from data --> 

            <p><strong>Antonyms:- </strong> </p> 
        `;    

        // Fetching Antonyms:- below we adding o/p with previous html, if we didn't do it then it will override that html
        if(definitions.antonyms.length === 0)
        {
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else
        {
            for(let i=0; i<definitions.antonyms.length; i++)
            {
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
                // here from array 1 by 1 data will be fetch & displayed in list format
            }
        }

        // Fetch Synonyms by yourself:-

        // Adding Read More Button:- 
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target = "_blank">Read More</a></div>`
        // url that goes to wikipedia of that word, is present in data at 0th index having 'sourceUrls' we access from it

    } 
    catch(error) 
    {
        resultDiv.innerHTML = `<p>Sorry, the word is not found</p>`
        
    }
}

// 1. First we access word here
// 2. then we access 0th index i.e. whole data
// 3. in that we have meaning we access its 0th index
// 4. in that we have definitions we access its 0th index
// 5. then we get definition of our word
//    similarly we access meaning, antonyms example from different positions
// 6. instead of writing 'data[0].meanings[0].definitions[0]' everywhere, we stored it in a variable so code get shorter
// 7. to fetch antonym we need to apply loop as its present in array format,   
//    but we need to apply loop outside backticks & merge that data with previous html  
// 8. then we add 1 'read more' button to get more details about entered word
// 9. after async function get called all code will run in try-block to avoid errors & in catch we handle it inside function, better for UX
// 10. if result get delayed, for that we add an message for user just at the start of try block, 
//     once result is ready that message get override with that

