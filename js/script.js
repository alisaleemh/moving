
console.log("Hello");


function loadData() {

  var $body          = $('body');
  var $wikiElem      = $('#wikipedia-links');
  var $wikiHeaderElem = $('#wikipedia-header');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem       = $('#nytimes-articles');
  var $greeting      = $('#greeting');
  var $street        = $('#street');
  var $city          = $('#city');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview
  var apikey = '&key=AIzaSyCzu6WxG9fwKEjct2c-iG2amQgHuf_d2-I';
  var street = $street.val();
  var city = $city.val();
  var address = street + ', ' + city;

  //setup src
  var src = 'http://maps.googleapis.com/maps/api/streetview?size=800x480&location=' + address + '';
  // console.log(src);

  //append <img> to the page
  $body.append('<img class="bgimg" src= "' + src + '">');

  $greeting.text('So you want to live at ' + address + '?');



  // load nyTimes

  var nytApiKey = '50dfeb2dd7284cfbab4a3667bd311b30';
  var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest';

  $.ajax({
    'type': 'GET',
    'url': nytURL,
    data: {
      'q': city,
      'response-form  at': "jsonp",
      'api-key': nytApiKey,
      'callback': 'svc_search_v2_articlesearch'
    },
    success: function(data) {
      // passed function object for data processing
      $nytHeaderElem.text('Wikipedia Articles About: ' + city.toUpperCase());
      articles = data.response.docs;
      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
        '<p>' + article.snippet + '</p>' + '</li>');
      }
    }
  });

  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallback&search=' + city ;

  $.ajax({
    'type': 'GET',
    'dataType': 'jsonp',
    'url': wikiURL,
    success: function(data) {
      // passed function object for data processing
      $wikiHeaderElem.text('Wikipedia Articles About: ' + city.toUpperCase());
      for (var i = 0; i < data[1].length; i++) {
        var article = data[1][i];
        var link = data[3][i];
        $wikiElem.append('<li class="article">' + '<a href="' + link + '">' + article + '</a>' + '</li>');
      }
    }
  });


  return false
};

$('#form-container').submit(loadData);
