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
    
    class yug {
      constructor (name, image, worth) {
        this.container = container;
        let profile = document.createElement("div");
        profile.classList.add('profile');
        
        profile.innerHTML = `
          <img src="${image}" alt="${name}" />
      <h2>${name}</h2>
      <h3>$${worth}</h3>
      <a href="spend.html">Spend</a> 
        `;
        container.append(profile)
      }
    }
    
    let print = new yug(name, image, worth);
    
  }//for
}, 100)//timeout

