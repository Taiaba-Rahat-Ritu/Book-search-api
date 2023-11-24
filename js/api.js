document.getElementById('error-message').style.display = 'none';


const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
    
}

const searchBook = async () => {  // using arrow function
    
    const searchField = document.getElementById('search-field');
 
   
    const searchText = searchField.value;
   
    searchField.value = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const resultCounter=document.getElementById('totalsearchCountshow'); 
    const resultCounterText=resultCounter.innerText;
    resultCounter.innerText="Total book found : "+0;
    resultCounter.style.color = 'yellow';
   

    toggleSpinner('block');
    
  
    document.getElementById('error-message').style.display = 'none';
    
    if (searchText === '') {

        
    const resultCounter=document.getElementById('totalsearchCountshow'); 
    const resultCounterText=resultCounter.innerText;
    resultCounter.innerText="Total book found : "+0; 
    resultCounter.style.color = 'yellow';
  
        
        const containerEM = document.getElementById('StringPro');
        const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
        
        // please write something to display
        
        containerEM.innerHTML = `
            <div class='position-absolute w-100 d-flex flex-column justify-content-center align-items-center pt-5' style="height:300px">
                <h2 class="my-4 text-center py-2 px-5 text-success border border-success border-4 bg-light" id="pleaseWrite">You have to write book name to display</h2>
            </div>`
            toggleSpinner('none');
       
        
    }
    else {
    //   data loading 
     
      const url = `https://openlibrary.org/search.json?q=${searchText}`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs,searchText))
            .catch(error => displayError(error));
    }

}
const displayError = error => {
    toggleSpinner('none');
    document.getElementById('error-message').style.display = 'block';
}



const counterFunction = count=>{
  
      const resultCounter=document.getElementById('totalsearchCountshow'); 
      const resultCounterText=resultCounter.innerText;
      resultCounter.innerText="Total book found : "+count; 
      resultCounter.style.color = 'yellow';
}
//display all result
const displaySearchResult = (books,searchText) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
   
   
    const pleaseWriteSomething = document.getElementById('pleaseWrite');
    pleaseWriteSomething.textContent = ''; 

    let searchResultCount=0;
    books.forEach(book => {
        if(((book.title.toLowerCase()))===(searchText.toLowerCase())){
        
        searchResultCount++;

        const div = document.createElement('div');
        div.classList.add('col');
      
        div.innerHTML = `
     
            <div class="card h-100">
            <img class="p-2" style="display: block;margin: 0 auto;" width="75%" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
                <h5 class="card-title ms-2">Book Name :${book.title}</h5>
                <strong><p class="ms-3">Author name : ${book.author_name}</p></strong>
                <strong><p class="ms-3">Publisher name : ${book.publisher}</p></strong>
                <p class="ms-3">1st publish year : ${book.first_publish_year}</p>
                 
            </div>
       
        `;
        searchResult.appendChild(div);
        }
       
    })
    if(searchResultCount===0){
       
    
            const div = document.createElement('div');
            div.classList.add('col');
            const searchResult = document.getElementById('pleaseWrite');
    searchResult.textContent = '';
          
            div.innerHTML = `
                   
            <div style="border-radius: 10px;" class="card h-100"></div>
                <h5 style="text-align: center;" class="card-title ms-2 text-danger">No result found</h5>
                    
                     
                </div>
           
            `;
            searchResult.appendChild(div);
    
    
         
    }
    toggleSpinner('none');
    
    counterFunction(searchResultCount);
}

const StringPro=()=>{
  
    const containerEM = document.getElementById('StringPro');
    containerEM.textContent = '';
    const searchResult = document.getElementById('search-result');
searchResult.textContent = '';
    
    // welcome message
    
    containerEM.innerHTML = `
        <div class='position-absolute w-100 d-flex flex-column justify-content-center align-items-center pt-1' style="height:300px">
            <h2 class="my-4 text-center py-2 px-5 text-success border border-success border-4 bg-light" id="pleaseWrite">Welcome to book store</h2>
        </div>`
        
}

 StringPro();
