(function(){
    var courseName = ''
    console.log(decodeURI(location.search.split('=')[1]))
    courseCollection.doc(decodeURI(location.search.split('=')[1])).get()
        .then(res=> {
            console.log(res.data())
            var repeatedStr = `<li><i class="fas fa-star"></i></li>`
            courseName = res.data().name
            document.getElementById("courseImg").src=`images/server_content/courses/${res.data().img}`
            document.getElementsByClassName("course-name")[0].innerHTML=res.data().name
            document.getElementById("attendance").innerHTML = Math.floor(Math.random() * 20) + 10;
            document.getElementById("durationNumber").innerHTML = Math.floor(Math.random() * 10) + 5;
            document.getElementById("rate-number").innerHTML = res.data().rating
            document.getElementById("desc-text").innerHTML = res.data().description
            document.getElementsByClassName("rating-stars")[0].innerHTML=repeatedStr.repeat(res.data().rating)
        }).catch(err => console.error(err))

    lessonCollection.where("courseID", "==", decodeURI(location.search.split('=')[1])).orderBy('img', 'asc').get()
        .then(res=> {
            var tmp=``
            res.docs.forEach((data, i) => {
                // console.log(data.data())
                tmp+=`<div class="lesson-content">
                <button onclick="getLessonData('${data.id}', '${data.data().videoLink}')" class="accordion">${i+1}- ${data.data().name}</button>
              </div>`
            });
            tmp+=`<div class="lesson-content">
            <button onclick="location.assign('./quiz .html?name=${courseName}')" class="accordion">الاختبار على الدورة</button>
          </div>`

            document.getElementsByClassName("lessons")[0].innerHTML=tmp

        })
})()