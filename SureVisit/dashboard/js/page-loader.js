const mainPage = document.getElementById('main-content');
const RecentVisitors = document.getElementById('RecentVisitors');

const LoadMainPage = () => {
    fetch('./main.html')
    .then(res => res.text())
    .then(data => {
        mainPage.innerHTML = data;
    })
    .catch(err => console.log(err))
};

const VisitorSignIn = ()  => {
    fetch('./signin.html')
    .then(res => res.text())
    .then(data => {
        mainPage.innerHTML = data;
    })
    .catch(err => console.log(err))
};

const VisitorSignOut = ()  => {
    fetch('./signout.html')
    .then(res => res.text())
    .then(data => {
        mainPage.innerHTML = data;
    })
    .catch(err => console.log(err));

    signedVisitors();
};

const viewAllVisitors = () => {
    fetch('./visitors.html')
    .then(res => res.text())
    .then(data => {
        mainPage.innerHTML = data;
    })
    .catch(err => console.log(err))
};

const viewBtwDates = () => {
    fetch('./visitbtw.html')
    .then(res => res.text())
    .then(data => {
        mainPage.innerHTML = data;
    })
    .catch(err => console.log(err))
};