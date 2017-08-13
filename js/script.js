
console.log("Hello");


function loadData() {

  var $body          = $('body');
  var $wikiElem      = $('#wikipedia-links');
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

  $greeting.text('So you want to live at ' + address + '?');

  //setup src
  var src = 'http://maps.googleapis.com/maps/api/streetview?size=800x480&location=' + address + '';
  // console.log(src);

  //append <img> to the page
  $body.append('<img class="bgimg" src= "' + src + '">');

  return false
};

$('#form-container').submit(loadData);
