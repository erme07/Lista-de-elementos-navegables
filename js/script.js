const items = document.querySelectorAll(".item");
const indexTable = document.querySelector(".index");
let itemNumber=1, totalItems=items.length;

const showButton = () => {
    const buttonTop = document.querySelector('.button--top');
    if (window.scrollY > 1000) {
        buttonTop.classList.add("button--top--show")
    } else {
        buttonTop.classList.remove("button--top--show")
    }
}
const generateIndex = ()=>{
    items.forEach((e,i) => {
        const numIndex = document.createElement('div');
        numIndex.classList.add("index__item");
        if(i==0) numIndex.classList.add("index__item--selected");
        numIndex.setAttribute('title',e.children[0].innerHTML);
        numIndex.textContent=i+1;
        indexTable.appendChild(numIndex);
        
    });
    
}

const generateId = (elemento) => {
    elemento.forEach((e,i)=>{
        e.setAttribute('id','_'+(i+1));
    })
}

const posBottom = () => {
    const index = document.querySelector(".index");
    document.documentElement.style.setProperty('--posBottom', index.offsetHeight+'px');
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
    if(e.target.matches('.button--top')) window.scrollTo(0, 0);
    if(e.target.matches('.button--prev')){
        if(itemNumber>1) itemNumber--;
        document.getElementById('_'+itemNumber).scrollIntoView(true);
    }
    if(e.target.matches('.button--next')){
        if(itemNumber<totalItems) itemNumber++;
        document.getElementById('_'+itemNumber).scrollIntoView(true);
    }
    if(e.target.matches('.button--index')){
        const index = document.querySelector(".index");
        index.classList.toggle("toggle");
        e.target.classList.toggle("button--index--hide");
    }
    if(e.target.matches(".index__item"))
    document.getElementById('_'+e.target.innerHTML).scrollIntoView(true);
})

window.onresize = ()=>{
    posBottom();
}
generateId(items);
generateIndex();
posBottom();