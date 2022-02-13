//search through the 311 call data (Links to an external site.) provided by the NYC Open Data API (Links to an external site.), and display all the complaints made to the NYPD, filtered by borough. They also want to see how the police responded to the complaint, since that's what they'll use to determine whether or not they can cause the same trouble without consequences!

//SODA API
const URL = "https://data.cityofnewyork.us/resource/erm2-nwe9.json";
const API_KEY_Secret = "52hout6rda3ps0yh6gtnb7um5y5tsdt4d9m9i4awd5k8dbi1uv";
const API_KEY_ID = "dxxs7s4om8d66rbf0002jro15";
const API_APP_TOKEN = "vLJPGCsLg4YQm3oXnNUk14osI";
const API_APP_TOKEN_SECRET_KEY ="I89Z0_MTeHzxIOWPXdJ8HwJ3HVEeIOQrbC5E";
//const button = document.querySelector("button");
//const button = document.getElementsById('borough');
const btns = document.querySelectorAll('button');
//data needed: .borough , .descriptor , .agency:"NYPD", .resolution_description 
//If the user doesn't input any number, make the default be 10
const input = document.querySelector('input');
const output = document.querySelector('.resultList');

const response = async (limit = 10,borough='BROOKLYN') =>
    {   
        await axios.get(`${URL}?agency=NYPD&borough=${borough}&$limit=${limit}`, {   //$where = ${borough} & $agency = "NYPD" ...&borough=${borough}
                limit : 500,
                "X-App-Token" : API_APP_TOKEN_SECRET_KEY,
        }).then(res=>{
        output.innerHTML = "";
        console.log(res.data);
        //output result in div
        let allData = res.data;
        // let descriptor = res.data.descriptor;
        // let resolution_description = res.data.resolution_description;
        
        for (let i = 0; i < allData.length; i++ ){
          // let newDiv = document.createElement("div");
          // let viewMoreButton = document.createElement("button");
          // let list = document.createElement("li");
          // //<div> <li>descriptor <button>    </li>
          // viewMoreButton.textContent ="WHAT DID THE POILICE DO?";
          // let infoDiv = document.createElement('div');
          // viewMoreButton.addEventListener('click', async ()=>{
          //   infoDiv.innerHTML = allData[i].resolution_description
          // });
      
          output.innerHTML += `<li>${allData[i].descriptor}  <button id=${allData[i].unique_key}>WHAT DID THE POILICE DO? </button> </li>` //  ${allData[i].resolution_description}  https://stackoverflow.com/questions/43298962/setting-html-buttononclick-in-template-literal

          //onclick= "myFunction('${i}')
          //<button onclick= ${myFunction(i)}>WHAT DID THE POILICE DO? </button>
         
          let x = document.getElementById(allData[i].unique_key);
     x.addEventListener("click",()=>{
       console.log('hello');})

     }
    //  var x = document.getElementById(allData[i].unique_key);
    //  x.addEventListener("click",()=>{
    //    console.log('hello');})
    //  if (x.style.display === "none") {
    //    x.style.display = allData[i].resolution_description;
    //  } else {
    //    x.style.display = "none";
    //  }
        
    
    }).catch(e => e);
}

response();
//https://www.codeinwp.com/snippets/add-event-listener-to-multiple-elements-with-javascript/

//set input listener if not limit = 10
var limitN;
input.addEventListener('input', (e)=>{ 
  if (e.target.value == 0 || e.target.value == null){
    limitN = 10;
  }
  else limitN = e.target.value
})

btns.forEach(function (i) {
  i.addEventListener('click', function() {
      let borough = i.id;
      response(limitN , borough);
  });
});
// btn.addEventListener("click", () =>{
//     let playerSelection = button.id;
//     console.log(playerSelection);
//     //response(city)
// })