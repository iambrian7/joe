/**
 * Created by Brians Desktop on 2/21/2017.
 */
// joes-checkout /////////////////////////////////////
$(function () {
  $('[data-toggle="popover"]').popover();
  
  $('#cvc').on('click', function(){
    if ( $('.cvc-preview-container').hasClass('hide') ) {
      $('.cvc-preview-container').removeClass('hide');
    } else {
      $('.cvc-preview-container').addClass('hide');
    }    
  });
  
  $('.cvc-preview-container').on('click', function(){
    $(this).addClass('hide');
  });
});

$("#demo01").animatedModal();

// data-id: product ID
// data-name: product name
// data-summary: product summary
// data-price: product price
// data-qty: product qty
// data-image: product image
var booksData = [
  { "id" : "0", "category": "branding", "pages": 2,"name" : "instructions", "summary" : "Test Instruction Page for animation", "price" : 1, "qty": 1,"template":"instructions.html", "image" : "img/portfolio/InstructionsCoverPage.jpg" },  
  { "id" : "1", "category": "branding", "pages": 16,"name" : "Medical", "summary" : "Medical information charts", "price" : 1, "qty": 1,"template":"medical.html", "image" : "img/portfolio//medical-preview.jpg" }, 
  { "id" : "2", "category": "child", "pages": 29,"name" : "coldnorth", "summary" : "Cold North Pole", "price" : 1, "qty": 1,"template":"coldnorth.html", "image" : "img/portfolio/cold-preview.jpg" }, 
  { "id" : "3", "category": "branding", "pages": 2,"name" : "Template Tutorial", "summary" : "Test Instruction Page for animation","template":"instructions.html", "price" : 1, "qty": 1, "image" : "img/portfolio/InstructionsCoverPage.jpg" }, 
  { "id" : "4", "category": "child", "pages": 21,"name" : "Easter Book", "summary" : "Easter Childrens Story", "price" : 1, "qty": 1,"template":"easter.html", "image" : "img/portfolio/easter-preview.jpg" }, 
  { "id" : "5", "category": "xmas", "pages": 33,"name" : "Santas Troubles", "summary" : "Santa has troubles", "price" : 1, "qty": 1,"template":"santastroubles.html", "image" : "img/portfolio/santastroublesPreview.jpg" }, 
  { "id" : "6", "category": "adults", "pages": 19,"name" : "Pink Diamonds", "summary" : "Short story for adults", "price" : 1, "qty": 1,"template":"pinkdiamonds.html", "image" : "img/portfolio/pinkdiamonds-preview.jpg" }, 
  { "id" : "7", "category": "xmas", "pages": 44,"name" : "Santas Cold", "summary" : "Santa's Cold", "price" : 1, "qty": 1,"template":"coldsanta.html", "image" : "img/portfolio/santascold-preview.jpg" },
  { "id" : "8", "category": "branding", "pages": 17,"name" : "roccos", "summary" : "Rocco's Story for children", "price" : 1,"template":"roccos.html", "qty": 1, "image" : "img/portfolio/rocco-preview.jpg" }, 
  { "id" : "9", "category": "branding", "pages": 2,"name" : "Personalized Sample", "summary" : "Test Instruction Page for animation", "price" : 1,"template":"medical.html", "qty": 1, "image" : "img/portfolio/instruction002-preview.jpg" }, 
  { "id" : "10", "category": "child", "pages": 24,"name" : "Birthday Book", "summary" : "Birthday Story", "price" : 1, "qty": 1,"template":"birthday.html", "image" : "img/portfolio/birthday-preview.jpg" }, 
  { "id" : "11", "category": "novels", "pages": 1,"name" : "commingSoon", "summary" : "Test Instruction Page for animation", "price" : 1,"template":"medical.html", "qty": 1, "image" : "img/portfolio/commingSoon.jpg" }, 
  { "id" : "12", "category": "cards", "pages": 1,"name" : "commingSoon", "summary" : "Test Instruction Page for animation", "price" : 1,"template":"medical.html", "qty": 1, "image" : "img/portfolio/InstructionsCoverPage.jpg" }, 
  { "id" : "13", "category": "child", "pages": 29,"name" : "Adventure", "summary" : "Test Instruction Page for animation", "price" : 1,"template":"adventure.html", "qty": 1, "image" : "img/portfolio/adventure-preview.jpg" },
 // { "id" : "14", "category": "branding", "pages": 2,"name" : "instructions", "summary" : "Test Instruction Page for animation", "price" : 1, "qty": 1, "image" : "img/portfolio/InstructionsCoverPage.jpg" },         
]
var books = [
//    {"name": "Cold North Pole","id": "coldnorth","template":"cold2.html","element": "",'pages': 33},
  {"name": "Medical","id": "medical","template":"medical.html","element": "",'pages':16},
  {"name": "Cold North Pole","id": "coldnorth","template":"coldnorth.html","element": "",'pages': 29},
  {"name": "Template Tutorial","id": "instructions","template":"instructions.html",'href':'Instructionpicture.docx',"element": "",'pages': 2},
  {"name": "Easter Book","id": "easter","template":"easter.html","element": "",'pages': 21},
  {"name": "Santas Troubles","id": "santastroubles","template":"santastroubles.html","element": "",'pages': 33},
  {"name": "Pink Diamonds","id": "pinkdiamonds","template":"pinkdiamonds.html","element": "",'pages': 19},
  {"name": "Santas Cold","id": "coldsanta","template":"coldsanta.html","element": "",'pages': 44},
  {"name": "Roccos Story","id": "roccos","template":"roccos.html","element": "",'pages': 17},
  {"name": "Personalized Sample","id": "instruction002","template":"instruction002.html",'href':'Instructionpicture002.docx',"element": "",'pages': 3},
  {"name": "Birthday Book","id": "birthday1","template":"birthday.html","element": "",'pages': 24}
];

function fetchNewBooks(books){
   var itemsListEl = $(".portfolio-items");
    booksData.forEach(function(b,i){
      var template = `
        <div class="col-sm-6 col-md-3 col-lg-3 text-center  ${b.category}">
            <img src="${b.image}" width="100%">
            <br>
            <div class="joes-product-detail">
                ${b.name}ds - <strong>$${b.price}</strong>
            <div class="detail-buttons" id="detail${b.id}">  
              <button class="btn btn-danger my-cart-btn" data-name="${b.name}" data-id = '${b.id}'
                data-name="${b.name}" data-summary="${b.summary}" data-price="${b.price}" data-qty="${b.qty}" data-image="${b.image}">Add to Cart</button>
              <a href="#" class="btn btn-info" onclick="showModalNew(event)" data-book = "${b.name}">Preview</a>
            </div> 
          </div>
    `;
  //var template = "\n        <div class=\"col-md-1 text-center joes-item  " + b.category + "\">\n            <img src=\"" + b.image + "\" width=\"150px\" height=\"150px\">\n            <br>\n            <div class=\"joes-product-detail\">\n                " + b.name + "ds - <strong>$" + b.price + "</strong>\n            </div>  \n            <br>\n            <button class=\"btn btn-danger my-cart-btn' data-name=\"" + b.name + "\" data-id = '" + b.id + "'\n              data-name=\"" + b.name + "\" data-summary=\"" + b.summary + "\" data-price=\"" + b.price + "\" data-qty=\"" + b.qty + "\" data-image=\"" + b.image + "\">Add to Cart</button>\n            <a href=\"#\" class=\"btn btn-info\" onclick=\"showModalNew(event)\" data-book = \"" + b.name + "\">Preview</a>\n          </div>\n    ";
    var t = template;
   // console.log("logging template: " + b.category + "  " + i + ". " + t)
    itemsListEl.append(t);
  })// end of foreach
} // end of fetchNewBooks


fetchNewBooks(booksData);

var currentBook = -1;
var currentPage = 1;
testCreate = 1;

function init(){

  document.getElementById('page_num').textContent = currentPage;

//   $('#paypal-submit').click(function(e){
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('paypal submit clicked');
//     this.submit();
//   })
//    $("#checkout-button").click(function(e){
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("checkout clicked")
//     alert("checking out..........????")

//   })
//    $( ".submit-button" ).click(function( e ) {
//       alert( "Handler for .submit() called-- validateJoes." );
//        validateJoes(e.target);
//       event.preventDefault();
//   });

// function submitPay(e){
//    alert( "Handler for .submit() called." );
  
//   event.preventDefault();
// }

  // $("#cart-button").click(function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  //   cartItems++;
  //   cart.items.push(currentBook)
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   $(this).text('Add to Cart(' + cartItems + ')');

  // })
  //(function(){

  
    //   var modal = document.getElementById('cart-modal');

    // // Get the button that opens the modal
    // //var btn = document.getElementById("myBtn");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("cart-close")[0];

    // // When the user clicks on the button, open the modal 
    // // btn.onclick = function() {
    // //     modal.style.display = "block";
    // // }

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    // }

    // var shIconEl = document.getElementsByClassName("my-cart-icon")[0];
    //   shIconEl.addEventListener("click", function(e){
    //     console.log("click on shopping cart..........")
    //     modal.style.display = "block";
    //   })
//})()


//    $('a#download-button').attr({target: '_blank',
//      href  : 'http://localhost/downloads/Instructionpicture.docx'});
  $("#download-button").click(function(e){
    e.preventDefault();
    e.stopPropagation();
    //$('#get-download')[0].click();
    $('#my-download')[0].click();
//      $('a#download-button').attr({target: '_blank',
//        href  : 'http://localhost/downloads/Instructionpicture.docx'});
//      cartItems++;
//      cart.items.push(currentBook)
//      localStorage.setItem('cart', JSON.stringify(cart));
//      $(this).text('Add to Cart(' + cartItems + ')');

  })
  $(".navbutton").click(function(event) {
    var id = event.target.dataset.book;
    var i = books.map(function(e) { return e.id; }).indexOf(id);
    if (currentBook == i)  return;
    $(".navbutton").removeClass('hilite'); // hide all buttons
    $(this).toggleClass( "hilite" );
    addBook(i)
  });
  $('.navbar-nav a').on('click', function () {
    if (window.innerWidth <= 768) {
      $(".navbar-toggle").click();
    }
  });
}
$(document).ready(function() {
  init();
  var windowHash = window.location.hash.substr(1);
  if (windowHash.indexOf('easter') > -1){
    // so now open the modal
    window.location.hash = '';
    setTimeout(function(){
      showModalNew(event,windowHash)
    }, 2000)
    $("#demo01").click();
  } else {
    if (windowHash.indexOf('coldnorth') > -1){
      // so now open the modal
      window.location.hash = '';
      setTimeout(function(){
        showModalNew(event,windowHash)
      }, 2000)

    }
  }
});
function addBook(i){
  var mybook = booksData[i];
  currentBook = i;
  if ( $("#" + booksData[i].id).length < 1){
    currentPage = 1;
    document.getElementById('page_num').textContent = currentPage;
    document.getElementById('page_count').textContent = mybook.pages;
    if (mybook.id.indexOf('instruct') == -1){
      $('#download-button').addClass('hide')
    } else {
      // 'href':'Instructionpicture002.docx',
      $('#my-download').attr('href','books/' + mybook.href)
      $('#download-button').removeClass('hide')
    }

    if (testCreate) {
      createBook(mybook);
      $('#preview-caption').text(mybook.name);
      $('#book-caption').text(mybook.name);
      mybook.element = $('.flip-container > #'+ mybook.id).parent();
//        imagesLoaded = 0;
//        imageLinks = $('#flip-list img');
//        $("#flip-list img").load(function(){
//          imagesLoaded++;
//          console.log('image loaded: ' + imagesLoaded + " of "+ imageLinks.length)
//          if (imagesLoaded == imageLinks.length) {
//            books[i].module = Flipper();//Turner;
//            books[i].module.init(books[i].id);
//            flipShow(i);
//            console.log(' resize not dispatched yet')
//            // now lets try a delay to resize the window after modal
////            setTimeout(function () {
////              console.log(' dispatch resize')
////              window.dispatchEvent(new Event('resize'));
////            },300)
//          }
//        });
      mybook.module = Flipper();//Turner;
      mybook.module.init(mybook.id);
      var pageNumberElement = document.getElementById('page_num');
      $("#" + mybook.id).bind("turning", function(e, page, view) {
        currentPage = page;
        pageNumberElement.textContent = currentPage;
      });

      flipShow(i);
//        console.log(' resize not dispatched yet')

    } else {
      $("#flip-list").append( $("<div>", {class: "flip-container"}));
      $(".flip-container").last().load(mybook.template, function() {
        //  books[1].element = $('#flipbook' + i));
        mybook.element = $('.flip-container > #'+ books.id).parent();
        mybook.module = Flipper();//Turner;
        mybook.module.init(mybook.id);
        flipShow(i)
      }); //end of asyc call for load the html pages
    }

  }
  else {
    flipShow(i)
  }
}

function flipShow(i){
  // $('.flip-container').hide(); // hide all books
  //  books[i].element.show();     // show selected book
  //  window.dispatchEvent(new Event('resize'));
}
function createBook(book){
  var flipContainer = $("<div class='flip-container'></div>");
  //flipContainer.css({'max-width' : '900px','margin': auto});
//    var mystyle = "style='width: 900px; height: 600px;'"
  var flipPages = $("<div class='flipbook book' id='" + book.id + "'></div>");
  //flipPages.css({'width' : '900px', 'height' : '600px'});
  flipContainer.append(flipPages);
  for(var i=0; i<book.pages; i++){
//        var imgsrc = 'http://lorempixel.com/image_output/nature-q-c-400-200-' + i + '.jpg';
    var imgsrc = 'books/'+ book.template.replace('.html','') + '/' + i + '.jpg';
    var cls = 'page';
    var p = $("<div class='"+ cls +"'><div class='gradient'></div><img src='" + imgsrc + "' alt='' /></div>");
    p.css({'width' : '100%', 'height' : '100%'});
    flipPages.append(p);
  }
  // add ending 'the end....' to each story
  var p = $("<div class='hard'><div class='gradient'></div><h1 style=' margin: 50%; text-align: center;'>The End............</h1></div>");
  flipPages.append(p);
  $("#flip-list").append(flipContainer);
}

/**
 * Change page.
 */
function ChangePage(e,p){ // p = new page
  //var el = $('#'+ books[currentBook].id);
  var el = $('#'+ booksData[currentBook].id)
  if (p < 0){
    console.log('page neg')
  }
  if (currentPage > p) {
    currentPage==2?currentPage=1:currentPage=currentPage-2;
//      el.turn('previous');
    // el.turn("peel", "bl");
  }  else {
    currentPage==1?currentPage=2:currentPage=currentPage+2
//      el.turn('next');
    //  el.turn("peel", "br");
  }
  if (currentPage < 0){
    console.log('page neg');
    currentPage = 1

  }
  el.turn('page',currentPage);

//   document.getElementById('page_num').textContent = currentPage;

  e.preventDefault();
  e.stopPropagation();
}
/**
 * Displays previous page.
 */
function onPrevPage(e) {
  if (currentPage <= 1) {
    return;
  }

  ChangePage(e,currentPage-2)
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage(e) {
  if (currentPage >= booksData[currentBook].pages) {
    return;
  }
  ChangePage(e,currentPage+2)
}
document.getElementById('next').addEventListener('click', onNextPage);

$("#animatedModal").keydown(function(e){

  var previous = 37, next = 39, esc = 27;
  var el = $('#'+ booksData[currentBook].id);
  switch (e.keyCode) {
    case previous:
      ChangePage(e,currentPage-2)
      break;
    case next:
      ChangePage(e,currentPage+2)
      break;
    case esc:
      e.preventDefault();
      break;
  }
});
function showModalNew(e,openID){

  $("#demo01").animatedModal({
    //  $("#animatedModal").animatedModal({
    animatedIn:'lightSpeedIn',
    animatedOut:'bounceOutDown',
    color:'#3498db',
    // Callbacks
    beforeOpen: function() {
     // console.log("The animation was called");
    },
    afterOpen: function() {
     // console.log("The animation is completed");
      // test for duplicate calls ............................................. makeBook();
    },
    beforeClose: function() {
     // console.log("The animation was called");
    },
    afterClose: function() {
    //  console.log("The animation is completed. .flip-containers removed");
      $('.flip-container').remove();
      //  window.location.hash = "#works-section";
      $( 'a[href$="#works-section"]:first').trigger( "click" );
      //  $("#" + books[currentBook].id).turn("destroy").remove();
      // currentBook = -1;
    }
  });
  $("#demo01").click();
  // $("#animatedModal").click();

  //<button class="navbutton" data-book="flipintro">Intro</button>
  //console.log('open new ........modal callback ................'  )
//  $("#animatedModal").animatedModal();
  //animatedModal();


  var id='';
  currentPage = 1;
  // if (openID !== undefined)
  //   id = openID;
  // else
  //   id = e.currentTarget.dataset.book;
  // currentId = id;
  // var i = books.map(function(e) { return e.id; }).indexOf(id);
  currentBook = -1;
  $(".navbutton").removeClass('hilite'); // hide all buttons
  $(this).toggleClass( "hilite" );

 // if (i == -1) {
   var i = e.currentTarget.previousElementSibling.dataset.id;
   // booksData[i].template = booksData[i].name + ".html"
//  }
  addBook(i)
}
function showModal(e){
  // loadApp();
  $('.magazine').turn('page', 1);
  //console.log('open modal callback ................'  )
}