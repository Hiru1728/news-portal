const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('navbarNav');
    console.log(categories);
    categories.forEach(categorie => {
        const containerDiv = document.createElement('ul')
        containerDiv.classList.add('navbar-nav');
        containerDiv.innerHTML = `
        <li class="nav-item pe-5">
        <a class="nav-link active" aria-current="page" href="#">${categorie.category_name}</a>
    </li>
        `;
        console.log(categorie.category_name);
        categoriesContainer.appendChild(containerDiv);

        console.log(categorie.category_name);
    });


}
loadCategories();