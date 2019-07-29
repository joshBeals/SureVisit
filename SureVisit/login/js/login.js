const login = document.getElementById('login');
const username = document.getElementById('username');
const password = document.getElementById('password');

const alert = document.getElementById('alert');

login.addEventListener('click', () => {
    fetch('http://localhost/surevisit/api/controllers/user_login.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({username:username.value, password:password.value})
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === '1'){
            setCookie("jwt", data.jwt, 1);
            alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert"
            style="position: absolute; top: 10px; right: 1%; z-index: 100;" id="main">
                <strong id='topic'>Login Successful!</strong><span id='body' style="margin-left: 10px;">${data.message}</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
            redirectToDashboard();
        }else{
            alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert"
            style="position: absolute; top: 10px; right: 1%; z-index: 100;" id="main">
                <strong id='topic'>Login Failed!</strong><span id='body' style="margin-left: 10px;">${data.message}</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        }
    })
    .catch(err => console.log(err));
});

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function redirectToDashboard(){
    setTimeout(() => {
        window.location.replace("http://localhost/surevisit/dashboard/index.html");
    },1000);
}