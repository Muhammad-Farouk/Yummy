let gallerySection = document.getElementById("gallery");
let searchSection = document.getElementById("search");
let contactBtn;

// loading spinner animation

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-spinner").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

// side nav open/close

function openSideNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)


    $(".toggle-icon").removeClass("fa-align-justify");
    $(".toggle-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".nav-links ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeNav() {
    let boxWidth = $(".side-nav .nav-tab").outerWidth()
    $(".side-nav").animate({
        left: -boxWidth
    }, 500)

    $(".toggle-icon").addClass("fa-align-justify");
    $(".toggle-icon").removeClass("fa-x");


    $(".nav-links ul li").animate({
        top: 300
    }, 500)
}

closeNav()
$(".side-nav i.toggle-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeNav()
    } else {
        openSideNav()
    }
})

//a function that displays SEARCH inputs in DOM after emptying it//


function showSearch() {
    searchSection.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    gallerySection.innerHTML = ""
}

//search by NAME// + //closing nav when typing//

async function searchByName(term) {
    closeNav()
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? showMeals(response.meals) : showMeals([])
    $(".secondary-loading-spinner").fadeOut(300)

}

//search by first LETTER// + //close nav when typing//

async function searchByFLetter(term) {
    closeNav()
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    term == "" ? term = "a" : "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? showMeals(response.meals) : showMeals([])
    $(".secondary-loading-spinner").fadeOut(300)

}


//getting categories from MEAL DB//


async function getCat() {
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)
    searchSection.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    showCat(response.categories)
    $(".secondary-loading-spinner").fadeOut(300)

}

//displaying CATEGORIES//

function showCat(arr) {
    let showBox = "";

    for (let i = 0; i < arr.length; i++) {
        showBox += `
        <div class="col-md-3">
                <div onclick="getCatMeals('${arr[i].strCategory}')" class="food position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="overlay position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    gallerySection.innerHTML = showBox
}


//getting AREA from MEAL DB//

async function getArea() {
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    searchSection.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    showArea(respone.meals)
    $(".secondary-loading-spinner").fadeOut(300)

}


//displaying AREA//

function showArea(arr) {
    let showBox = "";

    for (let i = 0; i < arr.length; i++) {
        showBox += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    gallerySection.innerHTML = showBox
}


//getting INGREDIENTDS from MEAL DB//

async function getIngredients() {
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    searchSection.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    showIngredients(respone.meals.slice(0, 20))
    $(".secondary-loading-spinner").fadeOut(300)

}


//displaying INGREDIENTDS//

function showIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    gallerySection.innerHTML = cartoona
}


//filtering CATEGORIES//

async function getCatMeals(category) {
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    showMeals(response.meals.slice(0, 20))
    $(".secondary-loading-spinner").fadeOut(300)

}

//filtering AREA//

async function getAreaMeals(area) {
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    showMeals(response.meals.slice(0, 20))
    $(".secondary-loading-spinner").fadeOut(300)

}

//filtering INGREDIENTDS//


async function getIngredientsMeals(ingredients) {
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    showMeals(response.meals.slice(0, 20))
    $(".secondary-loading-spinner").fadeOut(300)

}

//filtering MEALS by ID//

async function getMealDetails(mealID) {
    closeNav()
    gallerySection.innerHTML = ""
    $(".secondary-loading-spinner").fadeIn(300)

    searchSection.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".secondary-loading-spinner").fadeOut(300)

}

//a function that displays meal details in DOM after emptying it//

function displayMealDetails(meal) {
    
    searchSection.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let showBox = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    gallerySection.innerHTML = showBox
}

//displaying MEALS//

function showMeals(arr) {
    let showBox = "";

    for (let i = 0; i < arr.length; i++) {
        showBox += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="food position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="meal-photo">
                    <div class="overlay position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    gallerySection.innerHTML = showBox
}



//displaying CONTACT inputs//


function showContacts() {
    gallerySection.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="isValid()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="invalidName" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed <br>
                    Name must be between 2-20 letters
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="isValid()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="invalidEmail" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid <br> 
                    *example@ttt.ccc
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="isValid()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="invalidPhone" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="isValid()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="invalidAge" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age <br>
                    18 - 99
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="isValid()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="invalidPassword" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="isValid()" type="password" class="form-control " placeholder="Repassword">
                <div id="invalidRepassword" class="alert alert-danger w-100 mt-2 d-none">
                    The password you entered doesn't match <br>
                    Try again
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    contactBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


//input VALIDATIONS & (REGEX)//

//REGEX//

function nameValidation() {
    return (/^[a-zA-Z ]{2,30}$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(1[89]|[2-9]\d)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

//function to remove the alert if the inputs are valid//

function isValid() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("invalidName").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("invalidName").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("invalidEmail").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidEmail").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("invalidPhone").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidPhone").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("invalidAge").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidAge").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("invalidPassword").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidPassword").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("invalidRepassword").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("invalidRepassword").classList.replace("d-none", "d-block")

        }
    }

    //check to enable the submit button if the inputs are valid//
    //and disable it if NOT//


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        contactBtn.removeAttribute("disabled")
    } else {
        contactBtn.setAttribute("disabled", true)
    }
}

