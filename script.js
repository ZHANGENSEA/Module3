const fruitList = [
	{
		title: "Strawberry",
		quantity: 500,
		price: 12.9,
		imageUrl: "https://images.pexels.com/photos/1435301/pexels-photo-1435301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		title: "Apple",
		quantity: 2000,
		price: 3.9,
		imageUrl:
			"https://images.pexels.com/photos/2949140/pexels-photo-2949140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		title: "Peach",
		quantity: 1000,
		price: 4.7,
		imageUrl:
			"https://images.pexels.com/photos/7129144/pexels-photo-7129144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		title: "Orange",
		quantity: 1500,
		price: 4.1,
		imageUrl:
			"https://images.pexels.com/photos/691166/pexels-photo-691166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		title: "Grape",
		quantity: 800,
		price: 9.9,
		imageUrl:
			"https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
	{
		title: "Cherry",
		quantity: 400,
		price: 25.9,
		imageUrl:
			"https://images.pexels.com/photos/371043/pexels-photo-371043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	},
]

const gameContainer = document.querySelector(".row")
const modalTitle = document.querySelector(".modal-title")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector(".modal-footer")

const cardShow = () => {
	// boucle pour afficher les best sellers
	fruitList.forEach((game) => {
		gameContainer.innerHTML += `
        <article class="col">
           <div class="card shadow-sm">
              <img src="${game.imageUrl}" class="card-img-top" alt="...">
               <div class="card-body">
                   <h5 class="card-title">${game.title}</h5>
                   <p class="card-text">Available quantity : ${game.quantity}</p>
                   <div class="btn-group">
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-dark detail"
                            data-bs-toggle="modal"
				            data-bs-target="#modalBS"
                        >
                            Detail
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-dark edit"
                            data-bs-toggle="modal"
				            data-bs-target="#modalBS"
                        >
                            Edit
                        </button>
						<button
							type="button"
							class="btn btn-sm btn-outline-dark order"
							data-bs-toggle="modal"
							data-bs-target="#modalBS"
						>
							Order
						</button>
                    </div>
               </div>
           </div>
        </article>
    `
	})
}

cardShow()

// ratraper le button "details"
const detailBtnArray = document.querySelectorAll(".detail")

// ratraper le button "edit"
const editBtnArray = document.querySelectorAll(".edit")

// ratraper le button "order"
const orderBtnArray = document.querySelectorAll(".order")

detailBtnArray.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		modalTitle.textContent = fruitList[index].title
		modalBody.innerHTML = `<img class="img-fluid" src="${fruitList[index].imageUrl}" >`
		modalBody.innerHTML += `<p>Available quantity : ${fruitList[index].quantity} <br>Price : ${fruitList[index].price}€</p>`
		modalFooter.innerHTML = `
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Close
            </button>
        `
	})
})

const addEditClick = () => {
	editBtnArray.forEach((btn, indx) => {
		btn.addEventListener("click", () => {
			modalTitle.textContent = "Edit page"
			modalBody.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" aria-describedby="title"  value="${fruitList[indx].title}">
                </div>        
                
                 <div class="mb-3">
                    <label for="quantity" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="quantity" aria-describedby="quantity"  value="${fruitList[indx].quantity}">
                </div>     

                <div class="mb-3">
                    <label for="image" class="form-label">Image URL</label>
                    <input type="text" class="form-control" id="image" aria-describedby="image"  value="${fruitList[indx].imageUrl}">
                    <img class="img-thumbnail w-50 mt-2" src="${fruitList[indx].imageUrl}" >
                </div>     
        `
			modalFooter.innerHTML = `
            <button
                type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            >
                Close
            </button>
            <button type="submit" class="btn btn-primary" id="save-sub-btn" data-bs-dismiss="modal">
                Save changes
            </button>
            </form>
        `

			/*  form handling   */
			const submitBtn = document.querySelector("#save-sub-btn")

			submitBtn.addEventListener("click", () => {
				const formulaire = document.querySelector("form")
				let newTitle = formulaire["title"].value
				let newquantity = formulaire["quantity"].value
				var newImage = formulaire["image"].value

				/*  form validation  */
				/*  empty fields  */
				if (newTitle === "" || newquantity === "" || newImage === "") {
					alert("Some empty inputs, please check")
					return
				}
				/*  odd characters  */
				const alphanumericRegex = /^[a-zA-Z0-9\/.:-_ 'éùçà(),-=?&]+$/
				const NumericRegex = /^[0-9]+$/
				if (
					!alphanumericRegex.test(newTitle) ||
					!NumericRegex.test(newquantity) ||
					!alphanumericRegex.test(newImage)
				) {
					alert("Some invalid inputs")
					return
				}
				/*  tout ok, on enregistre  */

				fruitList[indx].title = newTitle
				fruitList[indx].quantity = newquantity
				fruitList[indx].imageUrl = newImage

				const cardList = document.querySelectorAll(".card")
				document.querySelectorAll(".card-title")[indx].innerHTML = newTitle
				document.querySelectorAll(".card-text")[
					indx
				].innerHTML = `Available quantity : ${newquantity} `
				document.querySelectorAll(".card-img-top")[indx].src = newImage
			})
		})
	})
}

addEditClick()


const addOrderClick = () => {
	orderBtnArray.forEach((btn, indx) => {
		btn.addEventListener("click", () => {
			modalTitle.textContent = "Order page"
			modalBody.innerHTML = `
            <form>
                 <div class="mb-3">
                    <label for="orderQuantity" class="form-label">Order quantity</label>
                    <input type="number" class="form-control" id="orderQuantity" aria-describedby="orderQuantity"  value=0>
                </div>       
        `
			modalFooter.innerHTML = `
            <button
                type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            >
                Close
            </button>
            <button type="submit" class="btn btn-primary" id="order-sub-btn" data-bs-dismiss="modal">
                Order
            </button>
            </form>
        `

			/*  form handling   */
			const submitBtn = document.querySelector("#order-sub-btn")

			submitBtn.addEventListener("click", () => {
				const formulaire = document.querySelector("form")
				let orderquantity = formulaire["orderQuantity"].value

				/*  form validation  */
				/*  empty fields  */
				if (orderquantity === "") {
					alert("The order quantity is empty, please check")
					return
				}
				/*  odd characters  */
				const NumericRegex = /^[0-9]+$/
				if (!NumericRegex.test(orderquantity)) {
					alert("The order quantity is not a number")
					return
				}
				if (fruitList[indx].quantity-orderquantity<0) {
					alert("Really sorry, we don't have enough")
					return
				}
				/*  tout ok, on enregistre  */
				fruitList[indx].quantity -= orderquantity
				const cardList = document.querySelectorAll(".card")
				document.querySelectorAll(".card-text")[
					indx
				].innerHTML = `Available quantity : ${fruitList[indx].quantity} `
				alert("You ordered "+(fruitList[indx].price*orderquantity)+"€ of "+fruitList[indx].title+", thank you!")
			})
		})
	})
}

addOrderClick()
