const loadPhone = async (searchText = "13", isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const showButton = document.getElementById("showAll");
    if (phones.length > 12 && !isShowAll) {
        showButton.classList.remove('hidden');
    } else {
        showButton.classList.add('hidden');
    };

    console.log(isShowAll);

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    const phoneContainer = document.getElementById("phones_container");

    phoneContainer.textContent = '';

    phones.forEach(phone => {

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl pt-4`;
        phoneCard.innerHTML = ` 
    
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    
    `
        phoneContainer.appendChild(phoneCard)


    });

    loadingSpinner(false);
};

const showDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    // console.log(data);
    modalShow(data.data)
};


const modalShow = phone => {
    detailsShow_modal_.showModal();
    const container = document.getElementById("phoneDetailsContainer");

    const phoneDetails = document.createElement("div");
    phoneDetails.innerHTML = `
    
    <figure class="flex justify-center mt-3"><img src="${phone.image}" alt="Shoes" /></figure>

    <h3  class="font-bold text-2xl mt-5 mb-5 text-center">${phone.name}</h3>
    <h4 class="font-bold text-lg mt-2">Storage: ${phone.mainFeatures.storage}</h4>
    <h4 class="font-bold text-lg mt-2">Display Size : ${phone.mainFeatures.displaySize}</h4>
    <h4 class="font-bold text-lg mt-2">Chipset: ${phone.mainFeatures.chipSet}</h4>
    <h4 class="font-bold text-lg mt-2">Memory: ${phone.mainFeatures.memory}</h4>
    <h4 class="font-bold text-lg mt-2">Slug: ${phone.slug}</h4>
    <h4 class="font-bold text-lg mt-2">Release data: ${phone.releaseDate}</h4>
    <h4 class="font-bold text-lg mt-2">Brand: ${phone.brand}</h4>
    <h4 class="font-bold text-lg mt-2">GPS: ${phone.others?.GPS || 'No GPS available'}</h4>

   
    `
    container.appendChild(phoneDetails);
};

const loadingSpinner = (isLoading) => {
    const loadingSpinnerContainer = document.getElementById("loadingSpinner");
    if (isLoading) {
        loadingSpinnerContainer.classList.remove('hidden');
    } else {
        loadingSpinnerContainer.classList.add('hidden');
    }
};
const handleSearch = (isShowAll) => {
    const phoneContainer = document.getElementById("phones_container");
    phoneContainer.textContent = '';

    loadingSpinner(true);
    const searchField = document.getElementById("search_field");
    const searchValue = searchField.value;
    loadPhone(searchValue, isShowAll);
};

const showAllHandeler = () => {
    handleSearch(true);
};

loadPhone();