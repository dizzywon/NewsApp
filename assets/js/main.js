var container = document.getElementsByClassName('container')[1];

var source = document.getElementById('source');

//source.innerHTML = '<option>a</option>'+ '<option>b</option>';

var endpoint = 'https://newsapi.org/v1/sources?language=en';
fetch(endpoint).then(function (blob) {
    return blob.json();
}).then(function (data) {
    var output = '';
    data.sources.forEach(function (source) {
        output += '<option>' + source.id + '</option>';
    });
    source.innerHTML = output;
});

function changeHandler(e) {
    var _id = e.target.selectedOptions[0].text;
    newsFetcher(_id);
}

source.addEventListener('change', changeHandler);

function newsFetcher(arg) {
    fetch('https://newsapi.org/v1/articles?source=' + arg + '&apiKey=6728cb03140d4fc3966b9e0a8c8691dc').then(function (blob) {
        return blob.json();
    }).then(function (data) {
        var output = '';
        data.articles.forEach(function (article) {
            console.log(article);
            output += '<div class="card">' +
                '<img src="' + article.urlToImage + '">' +
                '<div class="card__details">' +
                '<h3 class="card__headline">' +
                article.title +
                '</h3>' +
                '<p class="card__description">' +
                article.description +
                '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = output;
    })
}