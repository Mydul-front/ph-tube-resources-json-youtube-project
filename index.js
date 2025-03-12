// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      displayVedios(data.videos);
    });
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => {
      displayCategories(data.categories);
    });

  //     {
  //     "category_id": "1001",
  //     "category": "Music"
  // }

  function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories) {
      // console.log(cat)
      const categoryDiv = document.createElement("div");
      categoryDiv.innerHTML = `
          <button onclick="loadCategoryVideos(${cat.category_id})" class="btn p-4 hover:bg-red-500 hover:text-white ">${cat.category}</button>
          `;
      categoryContainer.append(categoryDiv);
    }
  }
}

const loadCategoryVideos=(id)=>{
     
     const url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
     console.log(url);
     fetch(url)
       .then((response) => response.json())
       .then((data) => displayVedios(data.category));

}

function displayVedios(videos) {
  console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML="";

  if(videos.length==0){
     videoContainer.innerHTML = `
     <div class="col-span-full my-5 flex flex-col justify-center items-center">
        <img class="grayscale" src="Icon.png" alt="" />
        <h2 class="text-2xl font-bold text-black my-7">Oops!! Sorry, There is no content here</h2>
      </div>
     `;
     return;
  }
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
     <div class="card  bg-base-100">
        <figure class="relative">
          <img class="object-cover h-[150px] w-full" src="${video.thumbnail}" alt="Photo" />
        </figure>

        <div class="absolute top-28 left-45">
          <p class="bg-black text-white rounded-md p-1">3hrs 56 min ago</p>
        </div>
        <div class="">
          <div class="flex py-2 px-3 gap-6">
            <div>
              <div class="avatar">
                <div
                  class="ring-primary w-8 px-0  ring-offset-base-100  rounded-full ring ring-offset-2"
                >
                  <img
                    src="${video.authors[0].profile_picture}"
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <h2 class="text-lg text-black font-bold">Building a Winning UX Strategy Using the Kano Model</h2>
              </div>
              <div class="flex items-center gap-2">
                <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
                <img src="Group 3.png" alt="Photo" />
              </div>
              <div><h3 class="text-sm text-gray-400">${video.others.views}</h3></div>
            </div>
          </div>
        </div>
      </div>
     `;
    videoContainer.append(videoCard);
  });
}
loadCategories();

