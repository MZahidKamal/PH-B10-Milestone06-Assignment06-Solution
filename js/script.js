/*===== CLICK 'VIEW MORE' button to scroll down to 'ADOPT YOUR BEST FRIEND' SECTION ==================================*/


VIEW_MORE_BUTTON.addEventListener("click", function () {
    ADOPT_YOUR_BEST_FRIEND_SECTION.scrollIntoView({
        behavior: "smooth",
    });
})


/*===== DYNAMICALLY CREATING CATEGORY BUTTONS FROM CATEGORIES FOUND FROM API =========================================*/


//Sending the API to this 'get_API_Data_Array' function, which will return an array of category objects.
get_API_Data_Array(FETCH_ALL_PET_CATEGORIES).then(categoriesArray => {

    //The loader will show up for 2 seconds, then the data will display, and the loader will hide-off.
    showLoader();
    setTimeout(()=>{

        //Iterating through the categoriesArray.
        categoriesArray.forEach(categoryObject => {

            //Sending the categoryObject to this 'createButtonAndPublish' function, which will create and publish the button.
            createButtonAndPublish(categoryObject);
        });
        hideLoader();
    }, 2000);
});


/*===== DYNAMICALLY GET PET CARDS FROM A SPECIFIC PET CATEGORY =======================================================*/


const loadPetCardsByCategory = async (categoryName, buttonElement) => {

    //Sending the API to this 'get_API_Data_Array' function, which will return an array of pet objects.
    get_API_Data_Array(FETCH_PETS_BY_CATEGORY, categoryName).then(petsArray => {

        keepThisCategoryButtonSelected(buttonElement);

        storeThisArray(petsArray);

        //Getting the html pet-card container, where all cards will be lined up. Then making it initially empty.
        makeThePetCardContainerEmpty();

        //The loader will show up for 2 seconds, then the data will display, and the loader will hide-off.
        showLoader();
        setTimeout(()=>{

            if (petsArray.length === 0) {
                //Showing a meaningful message only if no pets are available for a category.
                createEmptyBadgeAndPublish();
            } else {
                //Iterating through the petsArray.
                petsArray.forEach(petObject => {
                    //Sending the petObject to this 'createCardAndPublish' function, which will create and publish the card.
                    createCardAndPublish(petObject);
                });
            }
            hideLoader();
        }, 2000);
    });
}


/*===== DYNAMICALLY SORT PET CARDS ACCORDING TO PRICE IN DESCENDING ORDER ============================================*/


const loadPetCardsSortedByPriceDescending = () => {

    //Sorting the petArray according to the price of each pet by descending order.
    PET_OBJECTS_STORED_IN_THE_CONTAINER = PET_OBJECTS_STORED_IN_THE_CONTAINER.sort((a, b) => (Number(b.price)) - (Number(a.price)));

    //Getting the html pet-card container, where all cards will be lined up. Then making it initially empty.
    makeThePetCardContainerEmpty();


    if (PET_OBJECTS_STORED_IN_THE_CONTAINER.length === 0) {
        //Showing a meaningful message only if no pets are available for a category.
        createEmptyBadgeAndPublish();
    } else {
        //Iterating through the petsArray.
        PET_OBJECTS_STORED_IN_THE_CONTAINER.forEach(petObject => {
            //Sending the petObject to this 'createCardAndPublish' function, which will create and publish the card.
            createCardAndPublish(petObject);
        });
    }

    /*//The loader will show up for 2 seconds, then the data will display, and the loader will hide-off.
    showLoader();
    setTimeout(()=>{

        if (PET_OBJECTS_STORED_IN_THE_CONTAINER.length === 0) {
            //Showing a meaningful message only if no pets are available for a category.
            createEmptyBadgeAndPublish();
        } else {
            //Iterating through the petsArray.
            PET_OBJECTS_STORED_IN_THE_CONTAINER.forEach(petObject => {
                //Sending the petObject to this 'createCardAndPublish' function, which will create and publish the card.
                createCardAndPublish(petObject);
            });
        }
        hideLoader();
    }, 2000);*/
}


/*===== DYNAMICALLY CREATING PET CARDS WITH BASIC INFORMATION ========================================================*/


//Sending the API to this 'get_API_Data_Array' function, which will return an array of pet objects.
get_API_Data_Array(FETCH_ALL_PETS).then(petsArray => {

    storeThisArray(petsArray);

    //Getting the html pet-card container, where all cards will be lined up. Then making it initially empty.
    makeThePetCardContainerEmpty();

    //The loader will show up for 2 seconds, then the data will display, and the loader will hide-off.
    showLoader();
    setTimeout(()=>{

        if (petsArray.length === 0) {
            //Showing a meaningful message only if no pets are available for a category.
            createEmptyBadgeAndPublish();
        } else {
            //Iterating through the petsArray.
            petsArray.forEach(petObject => {
                //Sending the petObject to this 'createCardAndPublish' function, which will create and publish the card.
                createCardAndPublish(petObject);
            });
        }
        hideLoader();
    }, 2000);
});


/*===== CLICK LIKE BUTTON TO ADD PETS IN THE GALLERY AT THE RIGHT SIDE ===============================================*/


const clickLikeButton = (petImage) => {

    //Sending the petImage to this 'savePetImageInGallery' function to save the image in the gallery.
    savePetImageInGallery(petImage);
};


/*===== CLICK 'ADOPT' BUTTON TO SEE COUNTDOWN AND THEN ADOPT THE PET =================================================*/


const petAdoptModal = (petName, buttonElement) => {

    //Sending the petName to this 'createAdoptModalAndPopUp' function to create the modal and show up.
    createAdoptModalAndPopUp(petName, buttonElement);
}


/*===== CLICK 'DETAILS' BUTTON TO SEE THE DETAILS PET INFO IN A POPPED UP MODAL ======================================*/


const petDetailsModal = async (petID) => {

    //Sending the API to this 'get_API_Data_Array' function, which will return a single pet object in an array.
    get_API_Data_Array(FETCH_PET_DETAILS_BY_ID, petID).then(petsArray => {

        //Sending the petObject to this 'createDetailsModalAndPopUp' function to create the modal and show up.
        createDetailsModalAndPopUp(petsArray[0]);
    });
}


/*====================================================================================================================*/
