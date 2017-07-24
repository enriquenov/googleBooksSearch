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


        $('button#backBtn1').hide();

        // $('button#backBtn').click(function(){
        //   parent.history.back();
        //   return false;
        // });
});


// SEARCH BUTTON EVENT

var searchBtn = document.getElementById('searchBtn');
var input = document.getElementById('input');
var results = document.getElementById('results');
var searcher = document.getElementById('searcher');
var backBtn1 = document.getElementById('backBtn1');


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
        backBtn1.style.display = "inline-block";

        for (var i = 0; i < data.items.length; i++) {
          results.innerHTML += '<h1>' + data.items[i].volumeInfo.title + '</h1>';
          results.innerHTML += '<h3>' + 'by '+ data.items[i].volumeInfo.authors + '</h3>';
          results.innerHTML += '<img src="' + data.items[i].volumeInfo.imageLinks.smallThumbnail + '">';
          results.innerHTML += '<p class="description">' + data.items[i].volumeInfo.description + '</p>';
          results.innerHTML += '<hr>';

        }
        // results.innerHTML += '<button type="button" class="btn btn-danger" id="backBtn2"></button>';
        // var backBtn2 = document.getElementById('backBtn2');
      },
      type: 'GET'
    });
    // backBtn2.addEventListener('click', goBack, false);
    input.value = '';
  }
});

backBtn1.addEventListener('click', function() {
  console.log('yes');
  searcher.style.display = 'block';
  results.innerHTML = '';
}, false);
