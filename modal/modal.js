'use strict';

function show(){
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}
function close(){
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}


document.querySelector('.instructions-btn').addEventListener('click', function () {
    show();
});

document.querySelector('.close').addEventListener('click', function () {
    close();
});

document.querySelector('.overlay').addEventListener('click', function () {
    close();
});
