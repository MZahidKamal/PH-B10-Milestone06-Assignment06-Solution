/*===== COLLECTION OF ALL APIs PROVIDED ==============================================================================*/

const FETCH_ALL_PETS = "https://openapi.programming-hero.com/api/peddy/pets";
const FETCH_PET_DETAILS_BY_ID = "https://openapi.programming-hero.com/api/peddy/pet/";                 //Concat with ID number. Like "pet/1".
const FETCH_ALL_PET_CATEGORIES = "https://openapi.programming-hero.com/api/peddy/categories";
const FETCH_PETS_BY_CATEGORY = "https://openapi.programming-hero.com/api/peddy/category/";             //Concat with category name. Like "category/dog".

const VIEW_MORE_BUTTON = document.querySelector('#view-more-button');
const ADOPT_YOUR_BEST_FRIEND_SECTION = document.querySelector('#adopt-your-best-friend-section');

let PET_OBJECTS_STORED_IN_THE_CONTAINER = [];

/*====================================================================================================================*/

const get_API_Data_Array = async (apiBaseLink, endpoint = '') => {
    let API_URL = apiBaseLink + endpoint;
    let dataArray = [];

    try {
        if (apiBaseLink === FETCH_ALL_PETS) {

            let response = await fetch(API_URL);
            let json = await response.json();
            dataArray = json.pets;
            return dataArray;
            //This will return the array of all pet objects.

        } else if (apiBaseLink === FETCH_PET_DETAILS_BY_ID) {

            let response = await fetch(API_URL);
            let json = await response.json();
            dataArray = [json.petData];
            return dataArray;
            //This will return an array of a single pet object.

        } else if (apiBaseLink === FETCH_ALL_PET_CATEGORIES) {

            let response = await fetch(API_URL);
            let json = await response.json();
            dataArray = json.categories;
            return dataArray;
            //This will return the array of all available category objects.

        } else if (apiBaseLink === FETCH_PETS_BY_CATEGORY) {

            let response = await fetch(API_URL);
            let json = await response.json();
            dataArray = json.data;
            return dataArray;
            //This will return the array of all pet objects according to a specific category.

        }
    } catch (error) {
        console.error('ERROR', error);
    } finally {
        console.log('Successfully completed fetching and data array returned.')
    }
};

//get_API_Data_Array(FETCH_ALL_PETS).then(dataArray => console.log(dataArray));

/*====================================================================================================================*/

const createButtonAndPublish = (categoryObject) => {

    //Destructuring each categoryObject.
    let {
        //id,
        category,
        category_icon
    } = categoryObject

    //Creating html button for each category.
    let buttonHTML = `
        <div class="flex justify-center items-center">
            <div onclick="loadPetCardsByCategory('${category}', this)" class="border-2 btn w-10/12 h-20 bg-transparent rounded-xl flex justify-center items-center gap-5 cursor-pointer hover:border-green-300 hover:bg-green-500/5 hover:rounded-full transition-all duration-100">
                <img src="${category_icon}" alt="dog_image" class="w-10">
                <h3 class="text-2xl text-black01 font-extrabold text-center">${category}</h3>
            </div>
        </div>`;

    //Getting the html button container, where all buttons will be lined up.
    let dynamicButtonContainer = document.querySelector('#dynamic-button-container');

    //Inserting the html buttons into the button container.
    dynamicButtonContainer.insertAdjacentHTML('beforeend', buttonHTML);
};

/*====================================================================================================================*/

const keepThisCategoryButtonSelected = (buttonElement) => {

    // const allButtonArray = [...document.querySelector('#dynamic-button-container').children];
    const allButtonArray = [...buttonElement.parentElement.parentElement.children];
    // const allButtonArray = Array.from(buttonElement.parentElement.parentElement.children);

    allButtonArray.forEach(button => {
        button.children[0].classList.remove('border-green-300', 'rounded-full', 'bg-green-500/5');
        button.children[0].classList.add('rounded-xl', 'bg-transparent');
    })
    buttonElement.classList.remove('rounded-xl', 'bg-transparent');
    buttonElement.classList.add('border-green-300', 'rounded-full', 'bg-green-500/5');
};

/*====================================================================================================================*/

const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
}
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden');
}

/*====================================================================================================================*/

const createCardAndPublish = (petObject) => {

    //Destructuring each petObject.
    let {
        petId,
        breed,
        //category,
        date_of_birth,
        price,
        image,
        gender,
        //pet_details,
        //vaccinated_status,
        pet_name
    } = petObject

    console.log(pet_name);

    //Creating html card for each pet.
    let petCardHTML = `
        <div class="pet-card border-2 border-gray-200 rounded-xl max-w-[365px] p-6 flex flex-col justify-center items-center cursor-pointer hover:border-green-300 hover:bg-green-500/5">
            <div class="pet-image w-full relative">
                <img src="${image}" alt="card-image-01"
                     class="w-full h-full rounded-lg object-cover object-center">
            </div>
            <div class="border-b pet-info w-full py-4 flex flex-col gap-2">
                ${pet_name? `<h4 class="text-2xl font-bold">${pet_name}</h4>`:`<h4 class="text-2xl font-bold">Name Not Available</h4>`}
                <div class="line-1 flex items-center gap-3">
                    <img src="./images/tiny-icons/breed.png" alt="breed-icon">
                    ${breed? `<p>Breed: ${breed}</p>`:`<p>Breed: Not Available</p>`}
                </div>
                <div class="line-2 flex items-center gap-3">
                    <img src="./images/tiny-icons/birth.png" alt="birth-icon">
                    ${date_of_birth? `<p>Birth: ${date_of_birth}</p>`:`<p>Birth: Not Available</p>`}
                </div>
                <div class="line-3 flex items-center gap-3">
                    <img src="./images/tiny-icons/gender.png" alt="gender-icon">
                    ${gender? `<p>Gender: ${gender}</p>`:`<p>Gender: Not Available</p>`}
                </div>
                <div class="line-4 flex items-center gap-3">
                    <img src="./images/tiny-icons/price.png" alt="price-icon">
                    ${price? `<p>Price: ${price}$</p>`:`<p>Price: Not Available</p>`}
                </div>
            </div>
            <div class="card-buttons w-full pt-4 flex justify-between items-center">
                <div onclick="clickLikeButton('${image}')" class="btn border border-gray-200 bg-white">
                    <img src="./images/tiny-icons/like.png" alt="">
                </div>
                <div onclick="petAdoptModal('${pet_name}', this)" class="btn border border-gray-200 bg-white w-28 text-lg text-green01">Adopt</div>
                <div onclick="petDetailsModal(${petId})" class="btn border border-gray-200 bg-white w-28 text-lg text-green01">Details</div>
            </div>
        </div>`;

    //Getting the html pet-card container, where all cards will be lined up.
    let dynamicPetCardContainer = document.querySelector('#dynamic-pet-card-container');

    //Inserting the html pet-cards into the card container.
    dynamicPetCardContainer.insertAdjacentHTML('beforeend', petCardHTML);
};

/*====================================================================================================================*/

const createEmptyBadgeAndPublish = () => {

    //Creating html empty Badge.
    let emptyBadgeHTML = `
        <div id="empty-pet-card-badge" class="hide no-card-banner border bg-gray-200/50 rounded-xl 2xl:w-full xl:w-full lg:w-11/12 md:w-11/12 sm:w-11/12 w-11/12 mx-auto col-span-3 2xl:px-64 xl:px-64 lg:px-32 md:px-16 sm:px-10 px-10 2xl:py-28 xl:py-20 lg:py-20 md:py-20 sm:py-20 py-20 flex flex-col justify-center items-center hover:border-green-300 hover:bg-green-500/5">
            <img src="./images/error.webp" alt="error-image">
            <h3 class="text-4xl text-black01 font-extrabold text-center">No Information Available</h3>
            <p class="text-base text-black01 font-normal text-center">It is a long-established fact that a
                reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum is that it has a potential.</p>
        </div>`;

    //Getting the html pet-card container, where all cards will be lined up.
    let dynamicPetCardContainer = document.querySelector('#dynamic-pet-card-container');

    //Inserting the html pet-cards into the card container.
    dynamicPetCardContainer.insertAdjacentHTML('beforeend', emptyBadgeHTML);
};

/*====================================================================================================================*/

const savePetImageInGallery = (petImage) => {

    let likeGalleryContainer = document.getElementById('like-gallery-container');

    let galleryThumbnailHTML = `
        <div class="rounded-lg w-36 h-36 relative">
            <img src="${petImage}" alt="pet_image_thumbnail"
                 class="w-full h-full rounded-lg object-cover object-center">
        </div>`;

    likeGalleryContainer.innerHTML += galleryThumbnailHTML;
};

/*====================================================================================================================*/

const createAdoptModalAndPopUp = (petName, buttonElement) => {

    let modalContainer = document.getElementById('pet_adopt_modal_container');

    let modalHTML = `
        <dialog id="pet_adopt_modal" class="modal">
            <div class="modal-box flex flex-col justify-center items-center">
                <div class="px-8 flex flex-col justify-center items-center gap-2">
                    <img src="./images/handshake.png" alt="handshake-image" class="w-28">
                    <h1 class="text-4xl font-extrabold text-center">Congrats !</h1>
                    <h4 class="text-lg font-extrabold text-center">Your new pet ${petName} is being ready.</h4>
                    <h4 class="text-lg font-extrabold text-center">Adoption Process will Finish Successfully within <br> <span id="counter-slot" class="text-6xl font-extrabold"></span> seconds.</h4>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button id="cancel-modal" class="hidden btn btn-sm">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>`;

    modalContainer.innerHTML = modalHTML;
    document.getElementById('pet_adopt_modal').showModal();

    let counter = 4;
    let clockID = setInterval(() => {
        counter--;
        document.getElementById('counter-slot').innerHTML = counter;
        if (counter <= 0) {
            clearInterval(clockID);                                               //setInterval will turned off.
            document.getElementById('cancel-modal').click();            //Modal will be closed automatically.
            buttonElement.innerHTML = 'Adopted';                                  //Button text will be changed.
            buttonElement.setAttribute('disabled', 'true');   //Button will be disabled.
        }
    }, 1000)
};

/*====================================================================================================================*/

const createDetailsModalAndPopUp = (petObject) => {

    //Destructuring each petObject.
    let {
        //petId,
        breed,
        //category,
        date_of_birth,
        price,
        image,
        gender,
        pet_details,
        vaccinated_status,
        pet_name
    } = petObject

    let modalContainer = document.getElementById('pet_details_modal_container');

    let modalHTML = `
        <dialog id="pet_details_modal" class="modal">
            <div class="modal-box border-2 border-gray-200 rounded-xl max-w-[500px] p-6 flex flex-col justify-center items-center gap-y-0">

                <div class="pet-image w-full relative">
                    <img src="${image}" alt="card-image-01"
                         class="w-full h-full rounded-lg object-cover object-center">
                </div>
                <div class="border-b pet-info w-full mb-2 py-4 flex flex-col gap-2">
                    ${pet_name? `<h4 class="text-2xl font-extrabold">${pet_name}</h4>`:`<h4 class="text-2xl font-extrabold">Name Not Available</h4>`}
                    <div class="flex gap-8">
                        <div>
                            <div class="line-1 flex items-center gap-2">
                                <img src="./images/tiny-icons/breed.png" alt="breed-icon">
                                ${breed? `<p>Breed: ${breed}</p>`:`<p>Breed: Not Available</p>`}
                            </div>
                            <div class="line-2 flex items-center gap-2">
                                <img src="./images/tiny-icons/gender.png" alt="gender-icon">
                                ${gender? `<p>Gender: ${gender}</p>`:`<p>Gender: Not Available</p>`}
                            </div>
                            <div class="line-3 flex items-center gap-2">
                                <img src="./images/tiny-icons/gender.png" alt="gender-icon">
                                ${vaccinated_status? `<p>Vaccinated status: ${vaccinated_status}</p>`:`<p>Vaccinated status: Not Available</p>`}
                            </div>
                        </div>
                        <div>
                            <div class="line-1 flex items-center gap-2">
                                <img src="./images/tiny-icons/birth.png" alt="birth-icon">
                                ${date_of_birth? `<p>Birth: ${date_of_birth}</p>`:`<p>Birth: Not Available</p>`}
                            </div>
                            <div class="line-2 flex items-center gap-2">
                                <img src="./images/tiny-icons/price.png" alt="price-icon">
                                ${price? `<p>Price: ${price}$</p>`:`<p>Price: Not Available</p>`}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-buttons w-full">
                    <div>
                        <h4 class="text-lg font-bold mb-2">Details Information</h4>
                        ${pet_details? `<p class="text-sm text-justify">${pet_details}</p>`:`<p class="text-sm text-justify">Not Available</p>`}
                    </div>
                    <div class="modal-action w-full mt-3">
                        <form method="dialog" class="w-full">
                            <button class="btn border border-gray-200 bg-white w-full text-lg text-green01 hover:border-green-300 hover:bg-green-500/5">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>`;

    modalContainer.innerHTML = modalHTML;
    document.getElementById('pet_details_modal').showModal();
};

/*====================================================================================================================*/

const makeThePetCardContainerEmpty = () => {
    let dynamicPetCardContainer = document.querySelector('#dynamic-pet-card-container');
    dynamicPetCardContainer.innerHTML = '';
};

/*====================================================================================================================*/

const storeThisArray = (petsArray) => {
    PET_OBJECTS_STORED_IN_THE_CONTAINER = [];
    PET_OBJECTS_STORED_IN_THE_CONTAINER = [...petsArray];
};

/*====================================================================================================================*/

const test = (printIt = '') => {
    console.log(printIt);
    console.log('Code has been executed till this line!');
}

/*====================================================================================================================*/
