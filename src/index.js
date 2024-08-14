const url = "https://garage.api.lewagon.com/1780/cars"
const carsList = document.querySelector('.cars-list')
const carForm = document.querySelector('.car-form')

carForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const bodyValues = Object.fromEntries(new FormData(carForm))

  fetch(url, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyValues)})
    .then(response => response.json())
    .then((data) => {
      refresh()
    })
})


const refresh = () => {
  fetch(url)
  .then(response => response.json())
  .then((data) => {

    carsList.innerHTML = ''
    data.forEach((car) => {

      const carHTML = `
      <div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${car.brand}-${car.model}" />
        </div>
        <div class="car-info">
          <h4>${car.brand} ${car.model}</h4>
          <p><strong>Owner:</strong> ${car.owner}</p>
          <p><strong>Plate:</strong> ${car.plate}</p>
          <button class='btn btn-danger remove' data-id="${car.id}">Remove</button>
        </div>
      </div>`

      carsList.insertAdjacentHTML('beforeend', carHTML)
    })
    removeCar()
  })
}

const removeCar = () => {
  const removeButtons = document.querySelectorAll('.remove')
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      fetch(`https://garage.api.lewagon.com/cars/${btn.dataset.id}`, {method: 'DELETE'})
        .then(() => {
          refresh()
        })
    })
  })
}



refresh()
