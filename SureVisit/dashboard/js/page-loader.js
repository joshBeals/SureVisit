const mainPage = document.getElementById('main-content');
const RecentVisitors = document.getElementById('RecentVisitors');

const LoadMainPage = () => {
    fetch('./main.html')
    .then(res => res.text())
    .then(data => {
        mainPage.innerHTML = data;
    })
    .catch(err => console.log(err))
}