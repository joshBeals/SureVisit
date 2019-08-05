
const passChange = () =>  {

    if(document.getElementById('oldPassword').value === '' || document.getElementById('newPassword').value ===  '' || document.getElementById('repeatNewPassword').value === ''){
        document.getElementById('inner').innerHTML = `
        <h2 class="text-danger mb-2">Error!!!</h2>
        <p class="text-dark mb-1">Fields cannot be left empty!!!</p>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
        `;
        document.getElementById('mymodal').className = 'show';
    }else if(document.getElementById('newPassword').value !== document.getElementById('repeatNewPassword').value){
        document.getElementById('inner').innerHTML = `
        <h2 class="text-danger mb-2">Error!!!</h2>
        <p class="text-dark mb-1">Passwords Don't Match!!!</p>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
        `;
        document.getElementById('mymodal').className = 'show';
    }else{
        let jwt = getCookie('jwt');
        if(!jwt){
            window.location.replace("http://localhost/surevisit/login/index.html");
        }
        fetch('http://localhost/surevisit/api/controllers/change_password.php', {
            method: 'POST',
            headers: {
                'Accept':'application/json, text/plain/ */*',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                oldPassword : document.getElementById('oldPassword').value,
                newPassword : document.getElementById('repeatNewPassword').value,
                jwt : jwt
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === '1'){
                document.getElementById('inner').innerHTML = `
                <h2 class="text-success mb-2">Success!!!</h2>
                <p class="text-dark mb-1">${data.message}</p>
                <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
                `;
            }else{
                document.getElementById('inner').innerHTML = `
                <h2 class="text-danger mb-2">Oops!!!</h2>
                <p class="text-dark mb-1">${data.message}</p>
                <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
                `;
            }
            document.getElementById('mymodal').className = 'show';
            document.getElementById('oldPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('repeatNewPassword').value = '';
        })
        .catch(err => console.log(err))
    }
}

const addVisitor = () => {
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surevisit/login/index.html");
    }
    fetch('http://localhost/surevisit/api/controllers/add_visitor.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            firstname : document.getElementById('firstname').value,
            lastname : document.getElementById('lastname').value,
            email : document.getElementById('email').value,
            mobile : document.getElementById('mobile-number').value,
            wtm : document.getElementById('whom-to-meet').value,
            rfm : document.getElementById('reason-to-meet').value,
            address : document.getElementById('address').value,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === '1'){
            document.getElementById('inner').innerHTML = `
            <h2 class="text-success mb-2">Success!!!</h2>
            <p class="text-dark mb-1">${data.message}</p>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
            `;
        }else{
            document.getElementById('inner').innerHTML = `
            <h2 class="text-danger mb-2">Oops!!!</h2>
            <p class="text-dark mb-1">${data.message}</p>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
            `;
        }
        document.getElementById('mymodal').className = 'show';
        signedVisitors();
    })
    .catch(err => console.log(err))
};

const signedVisitors = () => {
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surevisit/login/index.html");
    }
    fetch('http://localhost/surevisit/api/controllers/getVisitors.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({jwt:jwt})
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('RecentVisitors').innerHTML = '';
        for(let i = 0; i < data.data.length; i++){
            if(data.data[i].time_out === null){
                document.getElementById('RecentVisitors').innerHTML += `
                <tr>
                    <td>
                        <div class="badge badge-pill text-white p-2" style="background: #444aa5;"># ${data.data[i].id}</div>
                    </td>
                    <td>
                        ${data.data[i].firstname} ${data.data[i].lastname}
                    </td>
                    <td>
                        ${data.data[i].email}
                    </td>
                    <td>
                        ${data.data[i].mobile}
                    </td>
                    <td>
                        <div class="badge badge-pill badge-warning text-white  p-2">${data.data[i].wtm}</div>
                    </td> 
                    <td>
                        <div class="badge badge-pill badge-success text-white  p-2">${data.data[i].time_in}</div>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" onclick="SignVisitorOut(${data.data[i].id})">Signout</button>
                    </td>
                </tr>
                `;
            }
        }
    })
    .catch(err => console.log(err))
};

const SignVisitorOut = (id) => {
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surevisit/login/index.html");
    }
    fetch('http://localhost/surevisit/api/controllers/VisitorSignOut.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({id:id, jwt:jwt})
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === '1'){
            document.getElementById('inner').innerHTML = `
            <h2 class="text-success mb-2">Success!!!</h2>
            <p class="text-dark mb-1">${data.message}</p>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
            `;
        }else{
            document.getElementById('inner').innerHTML = `
            <h2 class="text-danger mb-2">Oops!!!</h2>
            <p class="text-dark mb-1">${data.message}</p>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Close</button>
            `;
        }
        document.getElementById('mymodal').className = 'show';
        signedVisitors();
    })
    .catch(err => console.log(err))
};

const seeAllVisitors = () => {
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surevisit/login/index.html");
    }
    fetch('http://localhost/surevisit/api/controllers/getVisitors.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({jwt:jwt})
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('search').value = '';
        document.getElementById('viewVisitors').innerHTML = '';
        for(let i = 0; i < data.data.length; i++){
            document.getElementById('viewVisitors').innerHTML += `
            <tr>
                <td>
                    <div class="badge badge-pill text-white p-2" style="background: #444aa5;"># ${data.data[i].id}</div>
                </td>
                <td>
                    ${data.data[i].firstname} ${data.data[i].lastname}
                </td>
                <td>
                    ${data.data[i].email}
                </td>
                <td>
                    ${data.data[i].mobile}
                </td>
                <td>
                    <div class="badge badge-pill badge-warning text-white p-2">${data.data[i].wtm}</div>
                </td> 
                <td>
                    <div class="badge badge-pill text-white p-2"  style="background: #444aa5;">${data.data[i].time_in}</div>
                </td>
                <td>
                    ${data.data[i].time_out === null ? '<div class="badge badge-pill badge-danger text-white p-2">Not Signed Out</div>' : '<div class="badge badge-pill badge-success text-white p-2">'+data.data[i].time_out+'</div>'}
                </td>
            </tr>
            `;
        }
    })
    .catch(err => console.log(err))
};

function searchVisitors() {
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surevisit/login/index.html");
    }
    fetch('http://localhost/surevisit/api/controllers/getVisitors.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({jwt:jwt})
    })
    .then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.data;
        // console.log(dat);
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(visitor => ((visitor.firstname.toUpperCase().indexOf(filter) > -1) || (visitor.lastname.toUpperCase().indexOf(filter) > -1) || (visitor.time_in.toUpperCase().indexOf(filter) > -1) || (visitor.mobile.toUpperCase().indexOf(filter) > -1) || (visitor.wtm.toUpperCase().indexOf(filter) > -1)));

        document.getElementById('viewVisitors').innerHTML = "";

        val.forEach(visitor => {
            document.getElementById('viewVisitors').innerHTML += `
            <tr>
                <td>
                    <div class="badge badge-pill text-white p-2" style="background: #444aa5;"># ${visitor.id}</div>
                </td>
                <td>
                    ${visitor.firstname} ${visitor.lastname}
                </td>
                <td>
                    ${visitor.email}
                </td>
                <td>
                    ${visitor.mobile}
                </td>
                <td>
                    <div class="badge badge-pill badge-warning text-white p-2">${visitor.wtm}</div>
                </td> 
                <td>
                    <div class="badge badge-pill text-white p-2"  style="background: #444aa5;">${visitor.time_in}</div>
                </td>
                <td>
                    ${visitor.time_out === null ? '<div class="badge badge-pill badge-danger text-white p-2">Not Signed Out</div>' : '<div class="badge badge-pill badge-success text-white p-2">'+visitor.time_out+'</div>'}
                </td>
            </tr>
            `;
        });
    })
    .catch(err => console.log(err))
};

function getVisitorsBtw(){
    const from = document.getElementById('from');
    const to = document.getElementById('to');

    let arrFrom = from.value.split('-');
    let arrTo = to.value.split('-');

    const [ yearF, monthF, dayF ] = arrFrom;
    const [ yearT, monthT, dayT ] = arrTo;

    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surevisit/login/index.html");
    }
    fetch('http://localhost/surevisit/api/controllers/getVisitors.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({jwt:jwt})
    })
    .then(res => res.json())
    .then(data => {
        const dates = data.data.map(visitor => {
            let dateTime = visitor.time_in.split(" ");
            const [ date, time ] = dateTime;
            return date.split("-");
        })
        .filter(date => (((date[0] >= yearF) && (date[0] <= yearT)) && ((date[1] >= monthF) && (date[1] <= monthT)) && ((date[2] >= dayF) && (date[2] <= dayT))))
        .map(date => (`${date[0]}-${date[1]}-${date[2]}`));

        const visitors = data.data.filter(visitor => dates.indexOf(visitor.time_in.split(" ")[0]) > -1);
        
        document.getElementById('visitorsB_W').innerHTML = '';
        visitors.forEach(visitor => {
            document.getElementById('visitorsB_W').innerHTML += `
            <tr>
                <td>
                    <div class="badge badge-pill text-white p-2" style="background: #444aa5;"># ${visitor.id}</div>
                </td>
                <td>
                    ${visitor.firstname} ${visitor.lastname}
                </td>
                <td>
                    ${visitor.email}
                </td>
                <td>
                    ${visitor.mobile}
                </td>
                <td>
                    <div class="badge badge-pill badge-warning text-white p-2">${visitor.wtm}</div>
                </td> 
                <td>
                    <div class="badge badge-pill text-white p-2"  style="background: #444aa5;">${visitor.time_in}</div>
                </td>
                <td>
                    ${visitor.time_out === null ? '<div class="badge badge-pill badge-danger text-white p-2">Not Signed Out</div>' : '<div class="badge badge-pill badge-success text-white p-2">'+visitor.time_out+'</div>'}
                </td>
            </tr>
            `;
        });
    })
    .catch(err => console.log(err))
}

// get or read cookie
function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }
 
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

