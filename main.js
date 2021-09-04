let data;

let container = document.querySelector('.container')

fetch(`https://forbes400.herokuapp.com/api/forbes400?limit=10`)
  .then(response => {return response.json()})
  .then(res => {data = res})
  
setTimeout(()=>{
  
  for (var i=0; i<data.length ; i++) {
    let {personName: name , squareImage: image , finalWorth: netWorth} = data[i];
    
    var x = netWorth.toString();
    
    (function getNetWorth() {
      var i = x.indexOf('.')
      let str = x.split('')
      str.splice(i, 1)
      str = str.join('')
      if (str>=9) {
        str = str+'000'
      } else {
        str = str + '0000'
      }
      netWorth = str;
    }());
    
    function networthCalc() {
      var ar = netWorth.toString().split('');
      ar.splice(3, 1, '.');
      return ar.join('').toString().slice(0,5);
    }
    
    let worth = networthCalc().toString();
    
    class billClass {
      constructor (name, image, worth) {
        let profile = document.createElement("div");
        profile.classList.add('profile');
        
        profile.innerHTML = `
          <img class="img" src="${image}" alt="${name}" />
      <h2 class="name">${name}</h2>
      <h3 class="worth">$${worth}</h3>
      <a onclick="select('${name}','${image}', '${worth}', '${netWorth}')" href="spend.html">Spend</a> 
        `;
        
        let page = window.location.href;
        if (page.slice(-10)==="index.html") {
          container.append(profile)
        }
      }
    }
    let print = new billClass(name, image, worth);
    
  }//for
}, 100)//timeout


/////////PAGE 2/////////
let name, image, worth, fullWorth;

function select(nam,img,net, full) {
  localStorage.setItem("name", nam);
  localStorage.setItem("image", img);
  localStorage.setItem("worth", net);
  localStorage.setItem("fullWorth", full);
};

function getVal() {
  name = localStorage.getItem("name");
  image = localStorage.getItem("image");
  if (image.slice(0,6)!=="https:"){
    image="https:"+image;
  }
  worth = localStorage.getItem("worth");
  fullWorth = localStorage.getItem("fullWorth");
}

let page = window.location.href;

if (page.slice(-10) === "spend.html") {
  getVal()
  let billionaire = document.querySelector('.selectedBil');
  billionaire.innerHTML = `
    <img src="${image}" alt="${name}" />
    <div>
      <h2>${name}</h2>
      <h3>$${worth} Billion</h3>
    </div>
  `;
  console.log(fullWorth.length);
  
  let item = [''];
  for (var i = 1; i <= 14; i++) {
    let prc = document.querySelector(`#item${i} data`).value;
    item.push(prc);
  }
   
  let itemCount = ['',0,0,0,0,0,0,0,0,0,0,0,0,0, 0]
  let sum = 0;
  
  function addItem(index) {
    itemCount[Number(index)] += 1;
      displayItems(index);
      calcBought(index);
    if (sum>fullWorth) {
      rmItem(index);
      alert(`Can't add this items anymore, check something else.`)
      return;
    }
  }
  
  function rmItem(index) {
    if (itemCount[Number(index)]>0) {
      itemCount[Number(index)]-=1;
    }
    displayItems(index);
    calcBought(index);
  }
  function displayItems(index) {
    let display = document.querySelector(`#item${index} .btn span`);
    display.innerHTML = itemCount[index];
  }
  
  let bought = ['',0,0,0,0,0,0,0,0,0,0,0,0,0, 0]
  
  function calcBought(index) {
    let total = item[index]*itemCount[index]
    bought[index] = total;
    getSum();
  };
  
  function getSum() {
    let tempSum = 0;
    bought.forEach(el => {
      if (el>0) {
        tempSum+=el;
      }
      sum=tempSum
    })
    displayResult();
  }
  
  function displayResult() {
    let per = (sum/fullWorth)*100;
    document.querySelector('.result').innerHTML = `
      <div>
        <span>Spent :-</span>
        <span>$${sum}</span>
      </div>
      
      <div>
        <span>Net Worth :-</span>
        <span>$${fullWorth}</span>
      </div>
      
      <div>
        <span>Which is</span> 
        <span>${per.toFixed(2)}</span> 
        <span>% of $</span>
        <span>${worth}</span>
        <span>Billion.</span>
      </div>
    `
  }
  
}//check page 2