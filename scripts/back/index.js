(function () {
    // <h4>${d.data().name}</h4>
    
    lessonCollection.orderBy("name", "asc").limit(9).get()
        .then(res =>{
            res.docs.forEach((d) => {
                document.getElementsByClassName("trending-courses")[0].innerHTML+=
                `<div class="t-course ">
                <div class="t-course-content">
                    <img class="img" src="images/server_content/lessons/${d.data().img}">
                    <h3>${d.data().name}</h3>
                </div>
                <div class="t-course-hover">
                    <div></div>
                    <h4 onclick="getSpecificLesson('${d.id}', '${d.data().videoLink}')">ابدأ الآن</h4>
                </div>
                 </div>`;
                // d.data()
              });
        })

    //////////////////////////////////////////////
    courseCollection.limit(4).get()
    .then(res =>{
        res.docs.forEach((d) => {
            document.getElementsByClassName("tracks-slider")[0].innerHTML+=
            `<div class="track">
            <div class="track-content">
                <div class="img"><img src="images/server_content/courses/${d.data().img}"></div>
                <h3>${d.data().name}</h3>
            </div>
            <div class="track-hover">
                <div></div>
                <h4 onclick="getSpecificCourse('${d.id}')">التفاصيل</h4>
            </div>
        </div>`;
          });
    })
})()

function getSpecificCourse(id){
    location.assign("./course_details.html?id="+id)
}

function getSpecificLesson(id, q){
    redirectIfAuth(`./lesson.html?id=${id}&q=${q}`)
}