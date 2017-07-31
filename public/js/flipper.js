/**
 * Created by Brians Desktop on 5/22/2016.
 */
// Function factory
function Flipper () {
    // var self = {
    //     make: 'Honda',
    //     model: 'Accord',
    //     color: '#cc0000',
    //     paint: function(color){
    //         self.color = color;
    //     }
    // };
    var module = {
        ratio: 1.38,
        id: '',
        init: function (id) {
            var me = this;
            this.id = id;
            // if older browser then don't run javascript
            if (document.addEventListener) {
                this.el = document.getElementById(id);
                this.resize();
                this.plugins();
              //  console.log('Initializing:' + this.el.id)
               // console.log('onInit: width: ' + this.el.style.width +  'width: ' + this.el.style.height + ' ..after');
                // on window resize, update the plugin size
                window.addEventListener('resize', function (e) {
                    // window.addEventListener('resize', function (e) {
                    var size = me.resize();
                   // console.log('page changed: w= ' + size.width + " h= " + size.height)
                    $(me.el).turn('size', size.width, size.height);
                });
            }
        },
        resize: function () {
            // reset the width and height to the css defaults
          //  console.log('width: ' + this.el.style.width +  'width: ' + this.el.style.height );
            var width = this.el.style.width.replace('px','') * 1;
            var height = this.el.style.height.replace('px','') * 1;

            if (this.el.clientWidth) {
                this.el.style.width = '';
                this.el.style.height = '';
                width = this.el.clientWidth,
                height = Math.round(width / this.ratio);
                var     padded = Math.round(document.body.clientHeight * 0.9);
                // if the height is too big for the window, constrain it
                if (height > padded) {
                    height = padded;
                    width = Math.round(height * this.ratio);
                }

                // set the width and height matching the aspect ratio
                this.el.style.width = width + 'px';
                this.el.style.height = height + 'px';
            }
         //   console.log('width: ' + this.el.style.width +  'width: ' + this.el.style.height + ' ..after');
            return {
                width: width,
                height: height
            };
        },
        plugins: function () {
            // run the plugin
            $(this.el).turn({
                gradients: true,
                elevation: 500,
                turnCorners: 'bl,br',
                // Magazine width

            //    width: 922,

                // Magazine height

            //    height: 800,
                duration: 1200,
                autoCenter: true,
                acceleration: true
            });
            $(this.el).turn('peel', 'br');
            // hide the body overflow
            document.body.className = 'hide-overflow';
        }
    };
    return module;
}
window.Flipper = Flipper;
//var myFlipper = Flipper(id);
