const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('navbarNav');
    categories.forEach(categorie => {
        const containerUl = document.createElement('ul')
        containerUl.classList.add('navbar-nav');
        containerUl.innerHTML = `
        <li class="nav-item pe-5">
        <a onclick="loadCategoryDetail('${categorie.category_id}')" class="nav-link active" aria-current="page" href="#">${categorie.category_name}</a>
    </li>
        `;
        categoriesContainer.appendChild(containerUl);
    });

}
const loadCategoryDetail = (categoryId) => {
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
        .catch(error => console.log(error));
}

const displayCategoryDetails = (categorys) => {

    const detailCategoryContainer = document.getElementById('detail-conatiner');
    detailCategoryContainer.innerHTML = ``;

    // Sort Total View
    categorys.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    // Not Found News Section
    const noNewsFoundContainer = document.getElementById('no-found-news');
    const totalNewsContainer = document.getElementById('total-news');
    if (categorys.length === 0) {
        noNewsFoundContainer.classList.remove('d-none');
        totalNewsContainer.innerText = categorys.length + '  No News in this Category';
    }
    else {
        noNewsFoundContainer.classList.add('d-none');
        totalNewsContainer.innerText = categorys.length + '  News in this Category';
    }

    categorys.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('card');
        categoryDiv.innerHTML = `
         <div class="row g-0">
            <div class="col-md-2">
                <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${category.title}</h5>
                    <p class="card-text">${category.details.slice(0, 800) ? category.details.slice(0, 800) + `...` : category.details.slice(0, 700)}</p>
                </div>
                <div class="d-flex justify-content-between">
                    
                    <div class="d-flex">
                    <img style="width:40px; height:40px;" src="${category.author.img}" class="img-fluid rounded-start rounded-circle ms-5 mt-1" alt="...">
                        <div>
                            <p class="m-0 p-0">${category.author.name ? category.author.name : 'Not Found Author'}</p>
                            <p>${category.author.published_date ? category.author.published_date : 'Not Found Published Date'}</p>
                        </div>
                    </div>
                    <div>
                        <h4>View ${category.total_view ? category.total_view : '(No View)'}</h4>
                    </div>
                    <div>
                        <h4>${category.rating.badge}</h4>
                    </div>
                    <div class="me-2">
                        <button onclick="modalCategoryDetails('${category._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Show Details</button>
                        
                    </div>
                </div>
            </div>
        </div>
        `
        detailCategoryContainer.appendChild(categoryDiv);
    });
    toggleSpinner(false);
}

// Spinner Section
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const modalCategoryDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error));
}

const displayNewsDetails = (news) => {
    const newsContainer = document.getElementById('newsDetailsModalLabel');
    newsContainer.innerText = news.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    <br>
    <img style="width:40px; height:40px;" src="${news.author.img ? news.author.img : 'Not found Image'}" class="img-fluid rounded-start rounded-circle mt-1" alt="...">
    <p>Author: ${news.author.name ? news.author.name : 'Not found Author'}</p>
    <p>Published_date: ${news.author.published_date ? news.author.published_date : 'Not found published date'}</p>
    <p>Details: ${news.details ? news.details : 'Not found Details'}</p>
    <p>Rating: ${news.rating.number ? news.rating.number : "Not found reating number"} <br> Badge: ${news.rating.badge ? news.rating.badge : "Not found reating badge"}</p>
    <p>Total_view: ${news.total_view ? news.total_view : 'Not found total view'}</p>
    `
}
loadCategoryDetail('08');
loadCategories();