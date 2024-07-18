const loadCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await res.json();

  const navContainer = document.getElementById("nav-container");

  data.data.news_category.filter((item) => {
    const div = document.createElement("div");

    div.innerHTML = `<button onClick="loadNews('${item.category_id}')">${item.category_name}</button>`;

    navContainer.appendChild(div);
  });
};

const loadNews = async (catId) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    const newsContainer = document.getElementById("news-container");

    // Show the loading spinner
    loadingSpinner.style.display = "block";

    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
      const data = await res.json();

      // Clear the news container
      newsContainer.innerHTML = "";

      // Check if data is available
      if (data.data.length === 0) {
        console.log('Data not found');
      } else {
        // Process and display each news item
        data.data.forEach((item) => {
          const div = document.createElement("div");
          div.classList.add("single-news");
          div.innerHTML = `
            <div class="img-container">
                <img src="${item.thumbnail_url}" alt="image">
            </div>
            <div class="text-container">
                <span class="rating">${item.rating.number}</span>
                <div class="heading">
                    <h3>${item.title.slice(0, 30)}</h3>
                    <p>${item.rating.badge}</p>
                </div>
                <p>${item.details.slice(0, 150)}</p>
                <div class="detail-container">
                    <div class="author-info">
                        <img src="${item.author.img}" alt="">
                        <div>
                            <h4>${item.author.name}</h4>
                            <p>${item.author.published_date}</p>
                        </div>
                    </div>
                    <div class="view-btn">
                        <i class="fa-regular fa-eye"></i>
                        <p>${item.total_view}</p>
                    </div>
                    <button onClick="check('${item.title}')">Details</button>
                </div>
            </div>
          `;
          newsContainer.appendChild(div);
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Hide the loading spinner
      loadingSpinner.style.display = "none";
    }
  };

  // Call the function with a category ID
  loadNews("01");

const check = (text) => {
console.log(text)
}
const handleSearch = () => {
  const value = document.getElementById("search-box").value;

  if (value) {
    loadNews(value);
  } else {
    alert("Please enter search ID 01...");
  }
};

loadNews("01");
loadCategory();
