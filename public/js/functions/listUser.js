const peticion = async (name) =>{
    return new Promise((resolve) => {
        axios.get('http://127.0.0.1:8000/Users').then(function (response) {
           resolve(response)
        })   
    })
}

const sendSMG = async  (name) =>{
    return new Promise((resolve) => {
        axios.post('http://127.0.0.1:8000/sendOne', {
            user: name
        }).then(function (response) {
           resolve(response)
        })   
    })
}




$(document).ready(async ()=>{
    console.log("jquery")
    let userAll = await peticion()
    if(userAll.status == 200 && userAll.data.length != 0){
        console.log(userAll)
        let html =""
        await userAll.data.forEach(function(data) {
            console.log(data.user)
            html +=`
            <div class="card usd" style="width: 18rem; margin-top: 5%">
                <img src="jpg/unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title" style="margin-top: 4px">${data.user}</h5>
                    <ul class="list-group cardsLi" style="margin-top: 10px"/>
                        <li class="list-group-item">
                            <p class="card-text"> Subscribe Time : Seco </p>
                        </li>
                    </ul>
                    <a data-user="${data.user}"  class="btn btn-primary cardsB"style="margin-top: 10px">Enviar mensaje</a>
                </div>
            </div>
            `
        }); 
        console.log(html)
       await $(".user").html(html)
      $(".cardsB").click( function() {
            console.log()
            let user = $(this).data("user")
            sendSMG(user)
      });
    }
});



