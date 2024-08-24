const BASE_URL =
  // "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  "https://api.currencyapi.com/v3/latest?";
const API_KEY = "cur_live_kUbx3exByKMsPk01G8uvetu8ORwkAOGmFsL90TlV";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")

for (let select of dropdowns) {
  for (let Currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = Currcode;
    newOption.value = Currcode;
    if (select.name == "To" && Currcode === "INR") {
      newOption.selected = "selected";
    }
    else if (select.name == "from" && Currcode === "USD") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });

}

let updateFlag = (elementt) => {
  let Currscode = elementt.value;
  let CuntryCode = countryList[Currscode];
  let newSrc = `https://flagsapi.com/${CuntryCode}/flat/64.png`;
  let img = elementt.parentElement.querySelector("img");
  img.src = newSrc;

}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  // base_currency=EUR&currencies=USD&apikey=
  const URL = `${BASE_URL}base_currency=${fromCurr.value.toUpperCase()}&currencies=${toCurr.value.toUpperCase()}&apikey=${API_KEY}`;
  let response = await fetch(URL);

  let responseData = await response.json();
  let data = responseData.data;
  let rate = data[toCurr.value.toUpperCase()].value;
  // console.log(data);


  // let rate = data[toCurr.value.toLowerCase()];
  console.log(rate);
  let finalValue = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalValue} ${toCurr.value}
`;

});
