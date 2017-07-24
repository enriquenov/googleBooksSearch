// DISABLING ENTER KEY FOR INPUT

$(document).ready(function()
    {
        // Stop user to press enter in textbox
        $("input:text").keypress(function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });


        $('button#backBtn').hide();

        $('button#backBtn').click(function(){
          parent.history.back();
          return false;
        });
});


// SEARCH BUTTON EVENT

var searchBtn = document.getElementById('searchBtn');
var input = document.getElementById('input');
var results = document.getElementById('results');
var searcher = document.getElementById('searcher');
var backBtn = document.getElementById('backBtn');

searchBtn.addEventListener('click', function() {
  if (input.value === '') {
    alert('There is no value');
  } else {
    console.log('This function works');
    console.log(input.value);
    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + input.value,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        searcher.style.display = "none";
        backBtn.style.display = "inline-block";

        for (var i = 0; i < data.items.length; i++) {
          results.innerHTML += '<h1>' + data.items[i].volumeInfo.title + '</h1>';
          results.innerHTML += '<h3>' + 'by '+ data.items[i].volumeInfo.authors + '</h3>';
          results.innerHTML += '<img src="' + data.items[i].volumeInfo.imageLinks.smallThumbnail + '">';
          results.innerHTML += '<p class="description">' + data.items[i].volumeInfo.description + '</p>';
          results.innerHTML += '<hr>';
          // results.className = 'col-md-4';
        }
        results.innerHTML += '<button type="button" class="btn btn-danger" id="backBtn">Back</button>';
      },
      type: 'GET'
    });
    input.value = '';
  }
});


function goBack() {
  results.innerHTML = '';
  searcher.style.display = 'inline-block';
}


backBtn.addEventListener('click', goBack, false);
