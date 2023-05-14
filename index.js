const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage(){
    const inputValue = document.getElementById("input").value;

    if(inputValue > 10 || inputValue < 1){
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Number should be in between 1 and 10"
        return
    }
    imgs = "";


    try {
        btnEl.style.display = 'none';
        const loading = `<img src="Spinner.svg" />`;
        galleryEl.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=NKQm-wFcl1Vl5Meq4QQ6N6lHr9K-o98Zq1imJHrZq-4`).then((res)=>res.json().then((data)=>{
        if(data){
            data.forEach((pic)=>{
                imgs += `
                <img src=${pic.urls.small} alt="image"/>
                `;
                galleryEl.style.display = "block";
                galleryEl.innerHTML = imgs;
                btnEl.style.display = "block";
            })
        }
    }));
    errorMessageEl.style.display = "none";
        
    } catch (error) {
        console.log(error);
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "An error happened, try again later";
        btnEl.style.display = "block";
        
    }
    
}
btnEl.addEventListener("click",fetchImage);