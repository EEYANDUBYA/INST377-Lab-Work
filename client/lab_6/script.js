// As the last step of your lab, hook this up to index.html

function CreateListForHTMLForm(array) {
  console.log('HTML Creator');
  console.log(array);
  const firstList = document.querySelector('resto-list');
  // firstList.innerHTML = '';
  array.forEach((item) => {
    const {name} = item;
    const externalName = name.toLowerCase();
    const newItem = `<li>${externalName}</li>`;
    firstList.innerHTML += newItem;
  });
}

function dataHandler(array) {
  console.table(array); // this is called "dot notation"
  CreateListForHTMLForm(array);
}

async function mainEvent() { // the async keyword means we can make API requests
  console.log('test');
  const form = document.querySelector('.food-form'); // change this selector to match the id or classname of your actual form
  const submit = document.querySelector('.form-row button');
  // submit.style.display = 'none';
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an objec
  if (arrayFromJson.length > 0) {
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      submit.style.display = 'block';
      dataHandler(arrayFromJson);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
