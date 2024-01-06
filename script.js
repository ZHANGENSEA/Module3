const gamesList = [
	{
		title: "Minecraft",
		year: 2009,
		imageUrl: "https://pbs.twimg.com/media/FTsV3NLWQAEFfXJ.jpg:large",
	},
	{
		title: "Fortnite",
		year: 2017,
		imageUrl:
			"https://www.creocommunity.de/wp-content/uploads/2021/12/Fortnite_blog_season-5_BR05_Social_-Launch_Hero-Line-Up-1920x1080-2117b3d382b87887271a17a78122b7316ff0c1c0.jpg",
	},
	{
		title: "Baldur's Gate 3",
		year: 2023,
		imageUrl:
			"https://static.fnac-static.com/multimedia/Images/FD/Comete/166361/CCP_IMG_1200x800/2208556.jpg",
	},
	{
		title: "FC24",
		year: 2023,
		imageUrl:
			"https://media.wired.com/photos/6516df152a96d14834d98190/master/pass/EA-FC-Is-Just-FIFA-Culture.jpg",
	},
	{
		title: "Half life 2",
		year: 2004,
		imageUrl:
			"https://gaming-cdn.com/images/products/2284/orig/half-life-2-pc-mac-game-steam-cover.jpg?v=1650555068",
	},
	{
		title: "Pokemon 3D",
		year: 2016,
		imageUrl:
			"https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_2.6,f_auto,h_460/b8nqzuddauabjnwo4qjn",
	},
]

const gameContainer = document.querySelector(".row")
const modalTitle = document.querySelector(".modal-title")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector(".modal-footer")

const cardShow = () => {
	// bucle pour afficher les games
	gamesList.forEach((game) => {
		gameContainer.innerHTML += `
        <article class="col">
           <div class="card shadow-sm">
              <img src="${game.imageUrl}" class="card-img-top" alt="...">
               <div class="card-body">
                   <h5 class="card-title">${game.title}</h5>
                   <p class="card-text">Year: ${game.year}</p>
                   <div class="btn-group">
                        <button
                            type="button"
                            class="view btn btn-sm btn-outline-dark"
                            data-bs-toggle="modal"
				            data-bs-target="#modalGame"
                        >
                            View
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-dark edit"
                            data-bs-toggle="modal"
				            data-bs-target="#modalGame"
                        >
                            Edit
                        </button>
                    </div>
               </div>
           </div>
        </article>
    `
	})
}

cardShow()

// ratraper le button "views"
const viewBtnArray = document.querySelectorAll(".view")

// ratraper le button "edit"
const editBtnArray = document.querySelectorAll(".edit")

viewBtnArray.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		modalTitle.textContent = gamesList[index].title
		modalBody.innerHTML = `<img class="img-fluid" src="${gamesList[index].imageUrl}" >`
		modalBody.innerHTML += `<p>Year: ${gamesList[index].year}</p>`
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
			console.log(indx)
			modalTitle.textContent = "Edit mode !"
			modalBody.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" aria-describedby="title"  value="${gamesList[indx].title}">
                    <div class="d-none form-text">We'll never share your email with anyone else.</div>
                </div>        
                
                 <div class="mb-3">
                    <label for="year" class="form-label">Year</label>
                    <input type="number" class="form-control" id="year" aria-describedby="year"  value="${gamesList[indx].year}">
                    <div class="d-none form-text">We'll never share your email with anyone else.</div>
                </div>     

                <div class="mb-3">
                    <label for="image" class="form-label">Image URL</label>
                    <input type="text" class="form-control" id="image" aria-describedby="image"  value="${gamesList[indx].imageUrl}">
                    <div class="d-none form-text">We'll never share your email with anyone else.</div>
                    <img class="img-thumbnail w-50 mt-2" src="${gamesList[indx].imageUrl}" >
                </div>     
        `
			modalFooter.innerHTML = `
            <button
                type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            >
                Close
            </button>
            <button type="submit" class="btn btn-primary" id="sub-btn" data-bs-dismiss="modal">
                Save changes
            </button>
            </form>
        `

			/*  form handling   */
			const submitBtn = document.querySelector("#sub-btn")

			submitBtn.addEventListener("click", () => {
				const formulaire = document.querySelector("form")
				let newTitle = formulaire["title"].value
				let newYear = formulaire["year"].value
				var newImage = formulaire["image"].value

				/*  form validation  */
				/*  empty fields  */
				if (newTitle === "" || newYear === "" || newImage === "") {
					alert("Certaines parties de votre formulaire sont vides")
					return
				}
				/*  odd characters  */
				const alphanumericRegex = /^[a-zA-Z0-9/.:-_ 'éùçà()]+$/
				if (
					!alphanumericRegex.test(newTitle) ||
					!alphanumericRegex.test(newYear)
				) {
					alert("Certaines characters sont pas vailde")
					return
				}
				/*  tout ok, on enregistre  */

				// console.log(newTitle, newImage, newYear, indx)
				gamesList[indx].title = newTitle
				gamesList[indx].year = newYear
				gamesList[indx].imageUrl = newImage

				const cardList = document.querySelectorAll(".card")
				document.querySelectorAll(".card-title")[indx].innerHTML = newTitle
				document.querySelectorAll(".card-text")[
					indx
				].innerHTML = `Year: ${newYear} `
				document.querySelectorAll(".card-img-top")[indx].src = newImage
			})
		})
	})
}

addEditClick()
