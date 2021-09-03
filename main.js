let data;

let container = document.querySelector('.container')

fetch(`./assets/forbes.json`)
  .then(response => {return response.json()})
  .then(res => {data = res})
  
setTimeout(()=>{
  console.log(data[0])
  
  for (var i=0; i<data.length ; i++) {
    let {personName: name , squareImage: image , finalWorth: netWorth} = data[i];
    
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
      <a onclick="select('${name}','${image}', '${worth}')" href="spend.html">Spend</a> 
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
let name, image, worth;

function select(nam,img,net) {
  localStorage.setItem("name", nam);
  localStorage.setItem("image", img);
  localStorage.setItem("worth", net)
}; 

function getVal() {
  name = localStorage.getItem("name");
  image = localStorage.getItem("image");
  if (image.slice(0,6)!=="https:"){
    image="https:"+image;
  }
  worth = localStorage.getItem("worth");
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
  `
}