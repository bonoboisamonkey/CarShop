let dom = {
    createElement: function (tagName, className, cssProps) {
        //create dom element
        let element = document.createElement(tagName);
        //check if this element is valid html element
        if (element != null) {
            //if so, then validate classname existance
            if (this._isValidValue(className)) {
                element.className = className;
            }

            //enumerate all css properties given as  object
            for (let f in cssProps) {
                //check if object key is valid attribute
                if (this._isValidAttr(f)) {
                    //then use it as attribute
                    element[f] = cssProps[f];
                }
                //otherwise,it is just style.Use it as style..
                else {
                    element.style[f] = cssProps[f];
                }
            }
        }
        return element;
    },
    _isValidValue: function (val) {
        return (typeof (val) !== "undefined" && val)
    },
    _isValidAttr: function (attr) {
        return (attr == 'src' || attr == 'href' || attr == 'innerText' || attr == 'id' || attr == 'innerHTML');
    }
}

function createElements(number, name, fullPrice, credit, year, km, date, sorce, advNumber) {
    document.getElementById("pages").appendChild(dom.createElement("div", "col-lg-3"));

    document.getElementsByClassName("col-lg-3")[number].appendChild(dom.createElement("div", "card"));

    document.getElementsByClassName("card")[number].appendChild(dom.createElement("div", "img", { id: advNumber }));

    document.getElementsByClassName("img")[number].appendChild(dom.createElement("img", "card-img-top", { src: sorce }));

    document.getElementsByClassName("img")[number].appendChild(dom.createElement("span", "price", { innerText: fullPrice }))

    document.getElementsByClassName("img")[number].appendChild(dom.createElement("span", "credit-min-price", { innerText: credit }));

    document.getElementsByClassName("card")[number].appendChild(dom.createElement("div", "card-body"));

    let helper = document.getElementsByClassName("card-body")[number];

    helper.appendChild(dom.createElement("h5", "card-title", { innerText: name }));
    helper.appendChild(dom.createElement("span", "year", { innerText: year, padding: "5px" }));
    helper.appendChild(dom.createElement("span", "km", { innerText: km, padding: "5px" }));
    helper.appendChild(dom.createElement("span", "post-date", { innerText: date, padding: "5px" }));
}


let num = 0;

let countItems = cars.length;
let pageCount = Math.ceil(countItems / 12);

for (let k = 1; k <= pageCount; k++) {
    let lili = dom.createElement("li", "page-link", { innerText: `${k}` });
    document.getElementsByClassName("pagination")[0].appendChild(lili);
}

let massive = document.getElementsByClassName("page-link");

for(let k=0; k<12;k++){
    createElements(k, cars[k].name, cars[k].price, cars[k].creditPrice, cars[k].year, cars[k].km, cars[k].date, cars[k].src, cars[k].advNumber);
    directionTo (cars[k].advNumber);
}


for (let f of massive) {
    f.addEventListener("click", () => {
        let flag = parseInt(f.innerText);
        let start = (flag-1)*12;
        let finish = flag*12;
        let allItems = cars.length;

        if(finish>allItems){
            document.getElementsByClassName("row")[0].innerHTML = "";
            for(let i=start; i<allItems; i++){
                let count = i-start;
                createElements(count, cars[i].name, cars[i].price, cars[i].creditPrice, cars[i].year, cars[i].km, cars[i].date, cars[i].src, cars[i].advNumber);
                directionTo (cars[i].advNumber);
            }
        }else{         
            document.getElementsByClassName("row")[0].innerHTML = "";
            for(let i=start; i<finish; i++){
                let count = i-start;
                createElements(count, cars[i].name, cars[i].price, cars[i].creditPrice, cars[i].year, cars[i].km, cars[i].date, cars[i].src, cars[i].advNumber);
                directionTo (cars[i].advNumber);
            }
        }            
    })
}


function directionTo (ID){
    document.getElementById(ID).addEventListener("click", () => {
        localStorage.clear();
        let z = JSON.stringify(ID);
        localStorage.setItem("clickedCarID", z);
        document.location = "buy.html";
    })
}


