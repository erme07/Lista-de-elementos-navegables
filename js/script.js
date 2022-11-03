const items = document.querySelectorAll(".item");
const indexTable = document.querySelector(".index__table");
const buttonIndexItem = document.querySelectorAll(".index__item");
let itemNumber=1, totalItems=items.length;

const showButton = () => {
    if (window.scrollY < 1000) {
        buttonTop.classList.remove("button--top--show")
    } else {
        buttonTop.classList.add("button--top--show")
    }
}
const generateIndex = ()=>{
    items.forEach((e,i) => {
        const numIndex = document.createElement('div');
        numIndex.classList.add("index__item");
        if(i==0) numIndex.classList.add("index__item--selected");
        numIndex.setAttribute('title',e.children[0].innerHTML);
        numIndex.setAttribute('name','indexNumber');
        numIndex.textContent=i+1;
        indexTable.appendChild(numIndex);
    });
    
}

const generateId = (elemento) => {
    elemento.forEach((e,i)=>{
        e.setAttribute('id','_'+(i+1));
    })
}

window.onscroll = () => {
    showButton();
    const visibleItems=[];
    const itemIndex= document.querySelectorAll(".index__item")
    items.forEach((e,i) => {
        if(e.getBoundingClientRect().top < window.innerHeight && e.getBoundingClientRect().top > -100 && e.getBoundingClientRect().bottom > 0) {
            visibleItems.push(i+1)
        };
    });
    document.getElementById('_'+itemNumber).childNodes.forEach(e=>{
        if(e.tagName==='P')e.classList.remove('item__description--selected');
        if(e.tagName==='H2')e.classList.remove('item__title--selected');
    });
    itemIndex[itemNumber-1].classList.remove("index__item--selected");
    if(visibleItems.length !== 0) itemNumber=visibleItems[0];
    document.getElementById('_'+itemNumber).childNodes.forEach(e=>{
        if(e.tagName==='P')e.classList.add('item__description--selected');
        if(e.tagName==='H2')e.classList.add('item__title--selected')
    });
    itemIndex[itemNumber-1].classList.add("index__item--selected");
}

document.addEventListener('click', (e)=>{
    if(e.target.getAttribute('id') === 'buttonTop') window.scrollTo(0, 0);
    if(e.target.getAttribute('id') === 'buttonPrev'){
        if(itemNumber>1) itemNumber--;
        document.getElementById('_'+itemNumber).scrollIntoView(true);
    }
    if(e.target.getAttribute('id') === 'buttonNext'){
        if(itemNumber<totalItems) itemNumber++;
        document.getElementById('_'+itemNumber).scrollIntoView(true);
    }
    if(e.target.getAttribute('id')==='buttonIndex'){
        const indexButton = document.getElementById("buttonIndex");
        const index = document.querySelector(".index");
        indexButton.classList.toggle("button--index--hide");
        index.classList.toggle("toggle");
    }
    if(e.target.getAttribute('name') === 'indexNumber')
    document.getElementById('_'+e.target.innerHTML).scrollIntoView(true);
})

generateId(items);
generateIndex();