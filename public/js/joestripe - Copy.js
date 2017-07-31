// var products = [
//        {id:0,name: "Snowflake", price: 100, qty: 1, purchased: false},
//        {id:1,name: "Xmas", price: 145, qty: 1, purchased: false},
//        {id:2,name: "Easter", price: 21.5, qty: 1, purchased: false}
//      ]

// cartItems = cart.items.length;
// console.log("cartItems len= " + cartItems)
// console.log("initialize all products = " + JSON.stringify(cart.products,null,3))
// console.log("initialize all cart items = " + JSON.stringify(cart.items,null,3))
   
 $("#test-button").on("click", function(e){
    e.preventDefault();
     var $form = $("#joes-cart-modal")[0]
     $(this).toggleClass("btn-success btn-danger")
     test = !test; // avoid a charge to Stripe for testing
     if (test)
        { 
        $form.card_name.value = "Rocco Valentine testing"
        $form.card_card.value = "4242424242424242"
        $form.card_date.value = "11/23"
        $form.card_cvc.value = "888"
        $form.card_zip.value = "55343"
        $(this).text("Test")
    } 
     else {
        $form.reset();
         $form.card_name.value = "Test Data for testing........."
        $form.card_card.value = "4242424242424242"
        $form.card_date.value = "11/23"
        $form.card_cvc.value = "888"
        $form.card_zip.value = "55343"
        $(this).text("Prod")
    }
})
// init to test false
var test = false

/////////////////////////////////////////////
// localStorage persistence
var STORAGE_KEY = 'joesCart'
var joesStorage = {
  fetch: function () {
    var cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (!cart.items) cart.items = [];
     if (!cart.itemsObj) cart.itemsObj = {};
    // todos.forEach(function (todo, index) {
    //   todo.id = index
    // })
    // todoStorage.uid = todos.length
    return cart
  },
  save: function (cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }
}

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

var joesCart = {
    cart: undefined,
    stripeCard: {},
     init: function(products,storeElementId, cartButtonId, cartItemsTableId){
         var self = this;
        // alert("this = " + JSON.stringify(window.sendEvent))
        $(this).on("joes-checkout",this.purchaseItems)
        this.cart = joesStorage.fetch()
        this.storeElementId = storeElementId
        this.products = products
        this.cartButtonId = cartButtonId
        this.itemsTable = $("#"+cartItemsTableId)
        // var $addTocartBtn = $(".my-cart-icon")
// var $mycartBtn = $(".my-cart-btn")
        this.$mycartBadge = $(".my-cart-badge")
// $mycartBtn.on('click',function(e){
//   alert("add to cart............" + e.target.dataset.id)
//   //goToCartIcon($addTocartBtn)

//   joesCart.products.push(e.target.dataset.id)
//   $mycartBadge.text(joesCart.products.length);


        $('.'+storeElementId).on('click',this.addToCart.bind(this))
      //  $('#'+quantitySelect).on('change',this.changeQuantity)
       //  $('#'+storeElementId).on('click',this,this.addToCart)
        this.cartQtyTotalNew = 0
        this.cartPriceTotalNew = 0
        this.initialCartTable();
    },
    nextStepElement: '',
    nextStep: 0,
    addToCart: function(e){
   //  var self = this;
    var id = e.target.dataset.id
    var cart = this.cart;
    if (cart.itemsObj[id]){
        cart.itemsObj[id].qty++  
    } else {
        cart.itemsObj[id] = this.products[id]
    }
    this.cartQtyTotalNew++
    this.cartPriceTotalNew += this.products[id].price
     $(".cart-totals").text("Cart Items: " +this.cartQtyTotalNew + "  Total Price:  "  + this.cartPriceTotalNew)
    $(".cart-totals-summary").text("Cart Items: " +this.cartQtyTotalNew + "  Total Price:  "  + this.cartPriceTotalNew)
  //  $("#cart-button").text("Cart (" + this.cartQtyTotalNew + ")")
    this.$mycartBadge.text(this.cartQtyTotalNew);
    this.addCartItem(cart.itemsObj[id])
    },
    updateCartTotals: function(){
        var qty = 0;
        var price = 0;
        for(var key in this.cart.itemsObj){
            var item = this.cart.itemsObj[key]
           qty += item.qty
           price += item.price * item.qty
           $("tr[data-id="+ key+"]").children()[3].innerText = item.price * item.qty
        }
        this.cartQtyTotalNew = qty;
        this.cartPriceTotalNew = price;
        $(".cart-totals").text("Cart Items: " +this.cartQtyTotalNew + "  Total Price:  "  + this.cartPriceTotalNew)     
        $(".cart-totals-summary").text("Cart Items: " +this.cartQtyTotalNew + "  Total Price:  "  + this.cartPriceTotalNew)
     //   $("#cart-button").text("Cart (" + this.cartQtyTotalNew + ")")
        this.$mycartBadge.text(this.cartQtyTotalNew);
    },
    changeQuantity: function(e){
        var id = this.parentElement.parentElement.dataset.id
        var qty = +this.value;
        joesCart.cart.itemsObj[id].qty = qty;
        joesCart.updateCartTotals()
    },
    deleteItem: function(e){
        var id = this.parentElement.dataset.id
        var joesCart = e.data;
        delete joesCart.cart.itemsObj[id]
        joesCart.updateCartTotals();
        $(this).parent().remove();
    },
    purchaseItems: function(e,sel,step){
        if (step == 3){
            this.checkValid();
        } else {
            $(sel).trigger('next.m.' + step);
        }
        
    },
    initialCartTable: function(){
         var tr = `
        <tr><td>No items in cart</td></tr>
        `
        this.itemsTable.append(tr);
    },
    addCartItem: function(item){
        if ($("td").text() == 'No items in cart') $("td").parent().remove()
         var row = $("tr[data-id="+ item.id+"]")
    if ( row.length > 0){
        row.children()[3].innerText = item.qty * item.price
        row.find('.quantitySelect')[0].value = item.qty
    } else { // add new table row
      //  var table = $('#cart-items-table');
        var text  = 'My Data in td';
        var image = 'your/image.jpg'; 
        var tr = `
        <tr data-id="${item.id}"><td>${item.name}</td>
            <td>
    <label prefix="">Qty:</label><select class="quantitySelect" aria-label="Change quantity">
    <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="20">20</option><option value="30">30</option>
    </select>
                    </td>
                    <td> ${item.price} </td>
                    <td class="tot"> ${item.price * item.qty}</td>
                    <td class="delete-item">X</td>
                </tr>
        `
        this.itemsTable.append(tr);
        $('.quantitySelect').on('change',this,this.changeQuantity)
        $('.delete-item').on('click',this,this.deleteItem)
    }// end add tr
    },
    fillOutStripeCard: function($form){
        var mmyy = $form.card_date.value.split("/")
        this.stripeCard.amount = this.cartPriceTotalNew,
        this.stripeCard.name= $form.card_name.value,
        this.stripeCard.number= $form.card_card.value,
        this.stripeCard.exp_month= mmyy[0],
        this.stripeCard.exp_year= mmyy[1],
        this.stripeCard.cvc= $form.card_cvc.value,
        this.stripeCard.zip= $form.card_zip.value,
        this.stripeCard.stripeToken= null
        return this.stripeCard 
    },
    checkValid: function(e){

        


        this.stripeCard = this.fillOutStripeCard($("#joes-cart-modal")[0])

        


        var self = this;
        var valid = true;
        var errorText = ""
       // console.log("stripeCard: " + JSON.stringify(this.stripeCard,null,3))
        $("#result").text(errorText)
        $("#joes-cart-modal .form-group input").each(function(){
            var parent = this.parentElement;
        if (this.value.length == 0){
           
            errorText = "<p>" + this.placeholder + " not valid</p>"
             $("#result").append(errorText)
            $(parent).addClass("has-error")
            valid = false;
        } else {
            $(parent).removeClass("has-error")
        }

        })
        if (!valid){
            // $("#result").text(errorText)
            $("#result").show()
        }
        if (valid) {// don't verify until valid
            if (test){
                $("#result").text("Verifing Charges")
                $("#result").show()
                setTimeout(function(){
                    self.handleApi()
                },1000)
                
            } else {
                this.verifyCard()
                $("#result").text("Verifing Charges")
                $("#result").show()
        }
        }
        return false
    },
    verifyCard: function(e){
        Stripe.card.createToken({
                    name: this.stripeCard.name,
                    number: this.stripeCard.number,
                    cvc: this.stripeCard.cvc,
                    exp_month: this.stripeCard.exp_month,
                    exp_year: this.stripeCard.exp_year
                }, this.stripeResponseHandler.bind(this));
    },
    stripeResponseHandler: function(status, response){
        var self = this;
        if (response.error) { // Problem!
            self.stripeCard.cardError = response.error.message;
          //  console.log('error in getting Stripe token: ' + JSON.stringify(self.stripeCard, null, 4))
            //    // Show the errors on the form:
            $("#result").text(response.error.message)
            $("#result").show()
        } else { // Token was created!
            self.stripeCard.stripeToken = response.id;
            self.stripeCard.description = "Joes Books charge"
            self.stripeCard.cardError = null;
            // add purchased items
            var purchasedArray = [];
            for(var key in this.cart.itemsObj) {
                var item = this.cart.itemsObj[key]  
                purchasedArray.push(item.id)
            }
            self.stripeCard.purchased = purchasedArray.join()
          //  console.log('received Stripe token: ' + JSON.stringify(self.stripeCard, null, 4))
            self.handleApi()
        }
    },
    purchaseComplete: function(downloadfile){
        var downloadIndex = 0;
        for(var key in this.cart.itemsObj) {
            var urldownload = "./download/" + downloadfile[downloadIndex++]
            var item = this.cart.itemsObj[key]  
            if (item.purchased){
                // item is already purchased!!!!!!!!!!!!!!!!!!
               // alert("purchased")
            } else {
                
                item.purchased = true;
            //    console.log("purchased: " + JSON.stringify(item,null,3))
                //  <button class="btn btn-success purchased-item"> <a href="./downloads/Busplan.docx">Business Plan</a></button>
                $(".download-item").append(`<button class="btn btn-success purchased-item"> <a href="${urldownload}">${item.name}</a></button>`)
                // also add to each purchased product
              //  var p = '[data-id="'+item.id + '"]';
             // var detailButtonsEl =  $("#detail"+item.id)[0]
              $("#detail"+item.id).prepend(`<button class="btn btn-success purchased-item"> <a href="${urldownload}">Download</a></button>`)
              //   detailButtonsEl.prepend("<p>Test</p>" )
                
              //  console.log("purchased: " + JSON.stringify(this.products,null,3))
            }                       
        }
    },
    handleApi: function(e){
        // test remove real request  
            var self = this;
            if (test){
                var data = {download:"girlyear1.docx"}
             //   console.log('success testing  ');
                self.purchaseComplete(data.download)
                this.resetAll();
                thankyouEvent('#joes-cart-modal', 3)
            } else {
                $.ajax({
                    type: 'POST',
                   //url: 'https://moonstrider.com/api/charge',
                    url: 'api/charge',
                    data: this.stripeCard,
                    dataType: 'json',
                    success: function (data) {
                      //  console.log('success');
                      //  console.log(data);
                        
                        // now go to last step
                        // reset all data on the forms 
                        self.purchaseComplete(data.download)
                        self.resetAll();
                        thankyouEvent('#joes-cart-modal', 3)
                    }
                });
        }
    },
    resetAll: function(){
      //  console.log("before stripe data " + JSON.stringify(this.stripeCard, null,3))
        for( var key in this.stripeCard){
            this.stripeCard[key] = null;
        }
       //  console.log("after null stripe data " + JSON.stringify(this.stripeCard, null,3))
        var $form = $("#joes-cart-modal")[0]
         $form.reset();
         this.cart.items = []
        // $("#cart-button").text("Cart")
        this.cartQtyTotalNew = 0;
        this.$mycartBadge.text('');
        var table = $('#cart-items-table');
        table.html("")
        $(".cart-totals").text("")
        $(".cart-totals-summary").text("")
        $("#result").hide()
    }  
}

$("#test-button").click()

var joesStore  = {
    init: function(products,cart,storeElementId, cartButtonId){
        this.cart = joesCart.cart;
        this.createStore(products, storeElementId)
    },
    createStore: function(products, storeElementId){
        var store = document.getElementById(storeElementId)
        function addProduct(product, index, array){
            var saleItem = document.createElement('div')
            saleItem.innerHTML = `<p> ${product.name} <button class='btn btn-danger btn-xs' data-id='${product.id}'>Add to Cart</button></p>`
            store.appendChild(saleItem)
        }
        products.forEach(addProduct)
    },
    renderStore: function(table){
     }
}

$(document).ready(function(){
    joesCart.init(booksData, "my-cart-btn","my-cart-icon","cart-items-table")
  // joesStore.init(products, joesCart, "store","cart-button")
});

// ****************  checkout code  ******************************
  $("#result").hide()
sendEvent = function(sel, step) {
    if (step == 3){
         $(joesCart).trigger('joes-checkout',[sel,step] )
//        if( !checkValid()){
// //alert("invalid")
//         $("#result").show()
//         return;
//        }
//         $("#result").hide()
//        //alert("card valid")
    } else {
         $(sel).trigger('next.m.' + step);
     }
}// END joesCart
thankyouEvent = function(sel, step) {
    $(sel).trigger('next.m.' + step);
}
 
 
