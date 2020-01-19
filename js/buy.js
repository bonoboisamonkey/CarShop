let ID = localStorage['clickedCarID'];
let newKey = JSON.parse(ID);


let element = document.getElementById("ex");
let listElement = document.getElementById("rex");
let rightElemenet = document.getElementById("desc");


for (let f of cars) {
    if (f.advNumber == newKey) {
        for (let i in f) {
            if (i == "src") {
                let image = document.createElement("img");
                image.src = f[i];
                element.insertBefore(image, element.firstChild)
            } else if (i == "carDescription") {
                for (let j in f[i]) {
                    let lili = document.createElement("li");
                    lili.className = "list-group-item";
                    lili.innerHTML = `${f[i][j]}`;
                    listElement.appendChild(lili);
                }
            } else if (i == "authorComm") {
                document.getElementById("comment").innerText = f[i];
            } else {
                let lili = document.createElement("li");
                lili.className = "list-group-item";
                lili.innerHTML = `<span>${i}</span> ${f[i]}`;
                element.appendChild(lili);
            }
        }
        let box = document.getElementsByClassName("d-none")[0];
        let box2 = document.getElementsByClassName("d-none")[1];
        document.getElementById("submit").addEventListener("click", function(e) {
            e.preventDefault();
            let minPrice = document.getElementById("fc").value;
            let month = document.getElementById("fcm").value;
            let percent = 0;
            if (month == 6) {
                percent = 0.04;
            }

            if (month == 12) {
                percent = 0.1;
            }

            if (month == 18) {
                percent = 0.14;
            }
            let perMonth = 0;
            if (f.creditPrice <= minPrice && f.price > minPrice) {
                perMonth = parseInt((f.price - minPrice) * percent / month);
                document.getElementById("description").innerText = `Ilkin odenis: ${minPrice}, ${month} ayliq odenis: ${perMonth}`;
                box.classList.add("d-block");
            } else {
                document.getElementById("description2").innerText = "odenis mumkun deyil";
                box2.classList.add("d-block");
            }

            setTimeout(function() {
                box.classList.remove("d-block");
                box2.classList.remove("d-block");
            }, 10000)
        })
    }
}