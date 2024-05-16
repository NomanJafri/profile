function toggleMenu(event) {    
    //Selecting right section of nav-bar and open/close-menu buttons
    const navManu = document.getElementById('right-nav');
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.getElementById('close-menu');
    
    //toggle class from right menu and display appropriate button
    navManu.classList.toggle('toggle-menu');
    openBtn.style.display = event.target.id == 'open-menu' ? 'none' : 'block';
    closeBtn.style.display = event.target.id == 'open-menu' ? 'block' : 'none';
    
    
    // js file overrides mediaquery styles in css file 
    // so we need to track media size and apply style accordingly
    window.matchMedia("(max-width: 720px)").onchange = function (e) {        
        openBtn.style.display = e.matches ? 'block' : 'none';
    }
}

function scrollView(event) {
    //needed to avoid jumping
    event.preventDefault();    
    const targetText = event.target.innerText.toLowerCase();

    //close menu in screen sizes less than 720px wide
    targetText != 'noman jafri' && window.innerWidth <= 720? document.getElementById('close-menu').click() : null ;
    
    //for clicks on brand showing heros-section
    if (targetText == 'noman jafri') return document.getElementById('heros-section').scrollIntoView({behavior: 'smooth', block: 'center'});    
    
    //for projects correct focus when scrolled
    if (targetText == 'projects') return document.querySelector(".python-projects").scrollIntoView({behavior: 'smooth', block:'center'});

    //for education correct focus when scrolled
    if (targetText == 'education') {
        const educationSelection =  "#education div p:nth-child(n+4)"; //window.innerWidth > 721 ? '#education':
        // console.log(educationSelection);
        return document.querySelector(educationSelection).scrollIntoView({behavior: 'smooth', block:'center'});
    }
    
    //handle all else cases not handled above
    return document.querySelector(`#${targetText}`).scrollIntoView({behavior: 'smooth', block: 'center'})
    
}

function dayNightMode(e){
    e.preventDefault();
    //accordingly changing css file in link element
    const body = document.querySelector('body');
    body.classList.toggle('light');
    body.classList.toggle('dark');


    //accordingly Changing Day Night Mode button text
    const day = `<img src="./sun-regular.svg" alt="Sun symbol for day mode" />`;
    const night = `<img src="./moon-solid.svg" alt=" Moon symbol for night mode" />`;    
    document.querySelector('.nav-item:last-child').innerHTML =  body.classList.value == 'light' ? night : day;
    
}

//It is a utility function for typing effect implementation in Heros Section
function wordAddition(ele, text, i=0) {        
    //appending one character to text conten a a time    
    ele.textContent += text[i];                
    
    //handling end of given text to avoid infinite loop
    if (i == text.length-1) {
        return;
    }

    //will wait given amount of time untill another character is appended to the text content
    setTimeout(() => wordAddition(ele, text, i+1), 100);
}

//typing effect in heros section
function typing(index){
    //selecting element which will be our target for typing effect
    const element = document.querySelector('#heros-section h4');
    
    //Data to be filled in when typed.
    const textList = ['Software Developer', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer','React Developer','JavaScript Developer' ,'Python Developer'];
    
    //setting selected elements text content to empty for clean area to write
    element.innerText = '';

    // calling wordAddition with text on index number provided on calling function typing(index).
    wordAddition(element, textList[index]);    

    // returning length of text list will give us ability to use this value when calling typing function through setInterval.
    return textList.length;
}

//starting typing only when content is loaded
window.onload = () => {
    
    //after load immediately start typing no wait for 4000ms
    typing(0)

    //keep track of current index to provide for textList selection
    let i = 1;
    
    //call typing every 4 seconds and update index tracker variable i.
    setInterval( () => {
        
        //getting hold of textList's length so any future changes in the list are accounted for.
        let listLength = typing(i);
        i++;
        
        //when all list items are typed on ui making sure they loop from beginning.
        if (i == (listLength)) {
            i = 0;
        }
    }, 4000)
};
