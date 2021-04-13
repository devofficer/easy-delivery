const {app, BrowserWindow} = require('electron');
const settings = require('electron-settings');
var jQuery = require('jquery');
const remote = require('electron').remote;
var request = require('request');

let settingsWindow;
const fs = require('fs-extra');
const path = require('path');
var receipt_font_size;
const storage = require('electron-json-storage');


function restore_defaults()
{



var appName = remote.app.getName();

// Get app directory
// on OSX it's /Users/Yourname/Library/Application Support/AppName


// Get app directory
// on OSX it's /Users/Yourname/Library/Application Support/AppName
const getAppPath = path.join(remote.app.getPath('appData'), appName);
fs.remove(getAppPath, restore_callback);
}
function restore_callback() {


      alert("App data cleared");
  // You should relaunch the app after clearing the app settings.
  remote.app.relaunch();
  remote.app.exit();


  
}
function validURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};
function validURL_2(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}
function validURL_old(myURL) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            return pattern.test(myURL);
         }


         function submit_master() {
	var master_password_set = settings.get('master_password_set');

    var typed_master = jQuery('#master_password').val();

    if(typed_master == master_password_set)
    {
    	jQuery('#master_div').css('display', 'none');
    }

  
}
function save_settings() {
	var email = jQuery('#email').val();
	var password = jQuery('#password').val();
	var license = jQuery('#license').val();
	var website = jQuery('#website').val();
	var check_every = jQuery('#check_every').val();
	var billing_details = jQuery('#billing_details').prop('toggled');
	var shipping_details = jQuery('#shipping_details').prop('toggled');
	var printer_selected = jQuery('#printer_selected').val();
	var print_doorbell = jQuery('#print_doorbell').prop('toggled');
	var minutes_to_arrive_values = jQuery('#minutes_to_arrive_values').val();
	var auto_complete_order = jQuery('#auto_complete_order').prop('toggled');
	var printer_copies = parseInt(jQuery('#printer_copies').val());
  var vat_options = jQuery('#vat_options').val();
  var sound_selected = jQuery('#sound_selected').val();
  var printer_ip = jQuery('#printer_ip').val();
  var printer_port = jQuery('#printer_port').val();
  var esc_mode = jQuery('#esc_mode').prop('toggled');
  var printer_type = jQuery('#printer_type').val();

  if(typeof printer_ip == "undefined")
  {
    printer_ip = "";
  }
  if(typeof printer_type == "undefined")
  {
    printer_type = "ESPON";
  }
   if(typeof printer_port == "undefined")
  {
    printer_ip = 9100;
  }
    if(typeof printer_port == "undefined")
  {
    esc_mode = false;
  }
 
	 receipt_font_size = parseInt(jQuery('#receipt_font_size_input').val());

	var receipt_header_text = jQuery('#receipt_header_text').val();
	var receipt_footer_text = jQuery('#receipt_footer_text').val();
	if(validURL(website) == false)
	{
		alert('Your site url is not correct. Be sure that you are including http or https on the beggining.');
	}
	if(website.includes('wp-admin'))
	{
		alert('Please do not include wp-admin on the url');

	}

	if(typeof printer_copies == "undefined" ||  printer_copies == "")
	{
		printer_copies = 1;
	}
  if((typeof check_every == "undefined") || (check_every == "") )
  {
    check_every = 10;
  }

	var hide_extra_category = jQuery('#hide_extra_category').prop('toggled');

	var hide_billing_address = jQuery('#hide_billing_address').prop('toggled');
	var hide_billing_city = jQuery('#hide_billing_city').prop('toggled');
	var hide_billing_postal = jQuery('#hide_billing_postal').prop('toggled');


	var hide_shipping_address = jQuery('#hide_shipping_address').prop('toggled');
	var hide_shipping_city = jQuery('#hide_shipping_city').prop('toggled');
	var hide_shipping_postal = jQuery('#hide_shipping_postal').prop('toggled');
	var enable_deliveryboys = jQuery('#enable_deliveryboys').prop('toggled');

  var print_minutes = jQuery('#print_minutes').prop('toggled');


var hide_subtotal = jQuery('#hide_subtotal').prop('toggled');
	var hide_total = jQuery('#hide_total').prop('toggled');
	var hide_discount = jQuery('#hide_discount').prop('toggled');

var receipt_image_base64 = jQuery('#receipt_image_base64').val();
var software_image_base64 = jQuery('#software_image_base64').val();


	var translated_name = jQuery('#translated_name').val();
	var translated_address = jQuery('#translated_address').val();
	var translated_postcode = jQuery('#translated_postcode').val();
	var translated_city = jQuery('#translated_city').val();
	var translated_notes = jQuery('#translated_notes').val();
	var translated_phone = jQuery('#translated_phone').val();
	var translated_order_date = jQuery('#translated_order_date').val();
	var translated_payment_method = jQuery('#translated_payment_method').val();
	var translated_order_details = jQuery('#translated_order_details').val();
	var translated_customer_details = jQuery('#translated_customer_details').val();
	var translated_product= jQuery('#translated_product').val();
	var translated_total= jQuery('#translated_total').val();
	var translated_qty= jQuery('#translated_qty').val();
	var translated_price= jQuery('#translated_price').val();
		var translated_complete_order= jQuery('#translated_complete_order').val();
		var translated_cancel_order= jQuery('#translated_cancel_order').val();
		var translated_delete_order= jQuery('#translated_delete_order').val();
		var translated_print_order= jQuery('#translated_print_order').val();
    var translated_vat= jQuery('#translated_vat').val();
    var translated_vat_included= jQuery('#translated_vat_included').val();

		var translated_doorbell= jQuery('#translated_doorbell').val();

		var translated_discount= jQuery('#translated_discount').val();
				var translated_subtotal= jQuery('#translated_subtotal').val();
				var translated_additional_comments= jQuery('#translated_additional_comments').val();
				var translated_order_type= jQuery('#translated_order_type').val();
				var translated_time_to_delivery= jQuery('#translated_time_to_delivery').val();

				var translated_order_id= jQuery('#translated_order_id').val();
				var translated_additional_information= jQuery('#translated_additional_information').val();
				var translated_billing= jQuery('#translated_billing').val();
				var translated_shipping= jQuery('#translated_shipping').val();
				var master_password_set= jQuery('#master_password_set').val();
        var translated_date_to_deliver= jQuery('#translated_date_to_deliver').val();
        var translated_date_to_pickup= jQuery('#translated_date_to_pickup').val();
        var translated_time_to_pickup= jQuery('#translated_time_to_pickup').val();
  var translated_image= jQuery('#translated_image').val();
  var translated_product_name= jQuery('#translated_product_name').val();
  var translated_enabled= jQuery('#translated_enabled').val();

        var translated_minutes_to_arrive= jQuery('#translated_minutes_to_arrive').val();
        var translated_status= jQuery('#translated_status').val();

settings.set('translated_name', translated_name );
settings.set('translated_address', translated_address );
settings.set('translated_postcode', translated_postcode );
settings.set('translated_city', translated_city );
settings.set('translated_notes', translated_notes );
settings.set('translated_phone', translated_phone );
settings.set('translated_order_date', translated_order_date );
settings.set('translated_payment_method', translated_payment_method );
settings.set('translated_order_details', translated_order_details );
settings.set('translated_customer_details', translated_customer_details );
settings.set('translated_product', translated_product );
settings.set('translated_total', translated_total );
settings.set('translated_qty', translated_qty );
settings.set('translated_price', translated_price );
settings.set('translated_complete_order', translated_complete_order );
settings.set('translated_cancel_order', translated_cancel_order );
settings.set('translated_delete_order', translated_delete_order );
settings.set('translated_print_order', translated_print_order );
settings.set('translated_doorbell', translated_doorbell );
settings.set('translated_discount', translated_discount );
settings.set('translated_subtotal', translated_subtotal );
settings.set('translated_additional_comments', translated_additional_comments );
settings.set('translated_order_type', translated_order_type );
settings.set('translated_time_to_delivery', translated_time_to_delivery );
settings.set('translated_order_id', translated_order_id );
settings.set('translated_additional_information', translated_additional_information );
settings.set('translated_billing', translated_billing );
settings.set('translated_shipping', translated_shipping );
settings.set('master_password_set', master_password_set );
settings.set('translated_date_to_deliver', translated_date_to_deliver );
settings.set('translated_date_to_pickup', translated_date_to_pickup );
settings.set('translated_time_to_pickup', translated_time_to_pickup );
settings.set('translated_minutes_to_arrive', translated_minutes_to_arrive );


settings.set('translated_image', translated_image );
settings.set('translated_product_name', translated_product_name );
settings.set('translated_enabled', translated_enabled );

settings.set('translated_vat', translated_vat);
settings.set('translated_vat_included', translated_vat_included);

settings.set('translated_status', translated_status );

settings.set('email', email);
settings.set('password', password);
settings.set('license', license);
settings.set('website', website);
settings.set('billing_details', billing_details);
settings.set('shipping_details', shipping_details);


settings.set('receipt_font_size', receipt_font_size);
settings.set('vat_options', vat_options);

settings.set('check_every', check_every);
settings.set('printer_selected', printer_selected);
settings.set('print_doorbell', print_doorbell);
settings.set('minutes_to_arrive_values', minutes_to_arrive_values);
settings.set('auto_complete_order', auto_complete_order);
settings.set('print_minutes', print_minutes);
settings.set('printer_type', printer_type);

settings.set('printer_copies', printer_copies);

settings.set('hide_billing_address', hide_billing_address);
settings.set('hide_billing_city', hide_billing_city);
settings.set('hide_billing_postal', hide_billing_postal);


settings.set('hide_shipping_address', hide_shipping_address);
settings.set('hide_shipping_city', hide_shipping_city);
settings.set('hide_shipping_postal', hide_shipping_postal);
settings.set('enable_deliveryboys', enable_deliveryboys);
settings.set('receipt_header_text', receipt_header_text);
settings.set('receipt_footer_text', receipt_footer_text);
settings.set('sound_selected', sound_selected);

settings.set('printer_ip', printer_ip);
settings.set('printer_port', printer_port);
settings.set('esc_mode', esc_mode);



settings.set('hide_subtotal', hide_subtotal);
settings.set('hide_total', hide_total);
settings.set('hide_discount', hide_discount);
settings.set('hide_extra_category', hide_extra_category);

settings.set('receipt_image_base64', receipt_image_base64);
settings.set('software_image_base64', software_image_base64);

}

function add_meta_key()
{
	var new_meta_key = jQuery('#new_meta_key').val();
	var new_meta_name = jQuery('#new_meta_name').val();

	var custom_meta = settings.get('custom_meta');
	if(custom_meta== null)
	{
			custom_meta = [];


	}
	
	if(new_meta_key!="" && new_meta_name!="")
		{
			custom_meta.push({meta_key:new_meta_key, meta_name:new_meta_name});


		}

		settings.set('custom_meta', custom_meta);

refresh_meta();
jQuery('#new_meta_key').val("");
jQuery('#new_meta_name').val("");

}

function add_printer()
{
  var new_printer = jQuery('#new_printer').val();
  var new_printer_copies = parseInt(jQuery('#new_printer_copies').val());

  var custom_meta = settings.get('additional_printers');
  if(custom_meta== null)
  {
      custom_meta = [];


  }
  
  if(new_meta_key!="" && new_meta_name!="")
    {
      custom_meta.push({printer:new_printer, copies:new_printer_copies});


    }

    settings.set('additional_printers', custom_meta);

refresh_printers();

jQuery("#new_printer").val(0).prop("toggled", true);
jQuery("#new_printer_copies").val(0).prop("toggled", true);
jQuery("#new_printer_mode").val(0).prop("toggled", true);


}
function remove_meta_key()
{
	  var meta_key = this.getAttribute("key");
	  var custom_meta = settings.get('custom_meta');
    custom_meta = custom_meta.filter(function( obj ) {
  return obj.meta_key !== meta_key;
});

    settings.set('custom_meta', custom_meta);
refresh_meta();

}

function remove_printer()
{
    var meta_key = this.getAttribute("key");
    console.log(meta_key);
    var custom_meta = settings.get('additional_printers');
    console.log(custom_meta);
    custom_meta = custom_meta.filter(function( obj ) {
  return obj.printer !== meta_key;
});

    settings.set('additional_printers', custom_meta);
refresh_printers();

}
function close_window()
{
	var window = remote.getCurrentWindow();
 			window.close();
}
function refresh_meta()
{
		 var custom_meta  = settings.get('custom_meta');
		 var html_for_meta ="";
	if(custom_meta!=null)
	{

		 jQuery.each(custom_meta, function(key, value) {  

//html_for_printers +='<option value="'+current_printer.name+'">'+current_printer.name+'</option>';



html_for_meta += ' <x-box> <x-input id="prin" value="'+value.meta_key+'"> <x-label>Meta Key</x-label> </x-input> <x-input id="meta_name" value="'+value.meta_name+'"> <x-label>Name</x-label> </x-input> <x-button class="remove_meta_key" key="'+value.meta_key+'"> <x-icon name="delete" ></x-icon> </x-button> </x-box>';

}); 

   jQuery('#meta_div').html(html_for_meta);

   var all_remove_classes =     document.getElementsByClassName('remove_meta_key');
		for (var i = 0; i < all_remove_classes.length; i++) {
    all_remove_classes[i].addEventListener('click', remove_meta_key, false);
}


	}



}


function refresh_printers()
{
     var additional_printers  = settings.get('additional_printers');
     console.log(additional_printers);
     var html_for_meta ="";
  if(additional_printers!=null)
  {

     jQuery.each(additional_printers, function(key, value) {  

//html_for_printers +='<option value="'+current_printer.name+'">'+current_printer.name+'</option>';



html_for_meta += ' <x-box> <x-input id="printer" value="'+value.printer+'"> <x-label>Primter Name</x-label> </x-input> <x-input id="printer_copies" value="'+value.copies+'"> <x-label>Copies</x-label> </x-input> <x-button class="remove_printer" key="'+value.printer+'"> <x-icon name="delete" ></x-icon> </x-button> </x-box>';

}); 

   jQuery('#printers_div').html(html_for_meta);

   var all_remove_classes =     document.getElementsByClassName('remove_printer');
    for (var i = 0; i < all_remove_classes.length; i++) {
    all_remove_classes[i].addEventListener('click', remove_printer, false);
}


  }



}


function get_products() {
   var email  = settings.get('email');
   var password  = settings.get('password');
   var license  = settings.get('license');
   var website  = settings.get('website');

  if((email!="") && (password!=""))
  {

    url = website+"/wp-json/woofood/v1/products?nocache&nocachingatall",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
        headers : {
                "Cache-Control": "no-cache",

            "Username" : email,
            "Password" : password,
        }
    },
    function (error, response, body) {
      console.log(body);
        // Do more stuff with 'body' here
        if(response!=null)
        {
          var all_categories = JSON.parse(response.body);

          var all_products = [];



all_categories.data.forEach(function(current_category) {


 
     current_category.products.forEach(function(current_product) {

     	           all_products[current_product.id] = current_product;

      


     });


  

  });



 storage.set('all_products', all_products, function(error) {
 // if (error) throw error;
});
  
 storage.set('all_categories', all_categories, function(error) {
 // if (error) throw error;
});
        

        }
        

        else
        
        {
        
         

        }
        



        
    }
);

  }
  else
  {
    alert('Complete all the details');
  }


}


function remove_logo() {

	 var _out = '';
     //render/display
     var _target = document.getElementById('receipt_image_container');
     _target.innerHTML = _out;
     document.getElementById("receipt_image_base64").value = _out;


}
function remove_logo_software() {

   var _out = '';
     //render/display
     var _target = document.getElementById('software_image_container');
     _target.innerHTML = _out;
     document.getElementById("software_image_base64").value = _out;


}

function get_logo() {

	const dialogOptions = {
  filters: [
    { name: "PNG Image", extensions: ["png"] },
  ],
  properties: ["openFile"]
};

	/*remote.dialog.showOpenDialog(dialogOptions, fileName => {
    if (fileName !== undefined) {
      console.log(fileName);
    }
  });*/

	remote.dialog.showOpenDialog({
  properties: ['openFile'],
   filters: [
    { name: "PNG Image", extensions: ["png"] },
  ],
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)

if(result.filePaths.length)
{

 var _img = fs.readFileSync(result.filePaths[0]).toString('base64');
     //example for .png
     var _out = '<img src="data:image/png;base64,' + _img + '" style="width:100%;" />';
     //render/display
     var _target = document.getElementById('receipt_image_container');
     _target.innerHTML = _out;
     document.getElementById("receipt_image_base64").value = _img;

     
}


}).catch(err => {
  console.log(err)
})

	}



  function get_logo_software() {

  const dialogOptions = {
  filters: [
    { name: "PNG Image", extensions: ["png"] },
  ],
  properties: ["openFile"]
};

  /*remote.dialog.showOpenDialog(dialogOptions, fileName => {
    if (fileName !== undefined) {
      console.log(fileName);
    }
  });*/

  remote.dialog.showOpenDialog({
  properties: ['openFile'],
   filters: [
    { name: "PNG Image", extensions: ["png"] },
  ],
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)

if(result.filePaths.length)
{

 var _img = fs.readFileSync(result.filePaths[0]).toString('base64');
     //example for .png
     var _out = '<img src="data:image/png;base64,' + _img + '" style="width:100%;" />';
     //render/display
     var _target = document.getElementById('software_image_container');
     _target.innerHTML = _out;
     document.getElementById("software_image_base64").value = _img;

     
}


}).catch(err => {
  console.log(err)
})

  }

function get_deliveryboys() {
   var email  = settings.get('email');
   var password  = settings.get('password');
   var license  = settings.get('license');
   var website  = settings.get('website');

  if((email!="") && (password!=""))
  {

    url = website+"/wp-json/woofood/v1/deliveryboys?nocache&nocachingatall",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
        headers : {
                "Cache-Control": "no-cache",

            "Username" : email,
            "Password" : password,
        }
    },
    function (error, response, body) {
        // Do more stuff with 'body' here
        if(response!=null)
        {
        	var deliveryboys = JSON.parse(response.body);

settings.set('deliveryboys', deliveryboys );
console.log(deliveryboys);

        }


        	});
}

}

document.addEventListener('DOMContentLoaded', function() {
 // print_win = new BrowserWindow({'auto-hide-menu-bar':true});
 // print_win.loadURL('file://' + __dirname + '/print.html');
 // print_win.show();

  //print_win.webContents.on('did-finish-load', function() {
    document.getElementById('save_settings').addEventListener('click', save_settings);
  	    document.getElementById('submit_master').addEventListener('click', submit_master);

        document.getElementById('fetch_deliveryboys').addEventListener('click', get_deliveryboys);
        //document.getElementById('fetch_products').addEventListener('click', get_products);
        document.getElementById('select_receipt_logo').addEventListener('click', get_logo);
        document.getElementById('remove_receipt_logo').addEventListener('click', remove_logo);

           document.getElementById('select_software_logo').addEventListener('click', get_logo_software);
        document.getElementById('remove_software_logo').addEventListener('click', remove_logo_software);

    document.getElementById('add_meta_key').addEventListener('click', add_meta_key);
    document.getElementById('restore_defaults').addEventListener('click', restore_defaults);

    document.getElementById('add_printer').addEventListener('click', add_printer);


    console.log('ready');
	 var email  = settings.get('email');
	 var password  = settings.get('password');
var license  = settings.get('license');
	 var website  = settings.get('website');
	 var check_every  = settings.get('check_every');
     var vat_options  = settings.get('vat_options');
     var sound_selected  = settings.get('sound_selected');

	 var billing_details  = settings.get('billing_details');
	 var shipping_details  = settings.get('shipping_details');
	 var printer_selected  = settings.get('printer_selected');
	 var custom_meta  = settings.get('custom_meta');
	 var print_doorbell  = settings.get('print_doorbell');
	 var minutes_to_arrive_values  = settings.get('minutes_to_arrive_values');
	 var auto_complete_order  = settings.get('auto_complete_order');
	 var hide_extra_category  = settings.get('hide_extra_category');
	 var receipt_header_text  = settings.get('receipt_header_text');

	 var receipt_footer_text  = settings.get('receipt_footer_text');

	 var hide_billing_postal  = settings.get('hide_billing_postal');
	 var hide_billing_city  = settings.get('hide_billing_city');
	 var hide_billing_address  = settings.get('hide_billing_address');

	  var hide_shipping_postal  = settings.get('hide_shipping_postal');
	 var hide_shipping_city  = settings.get('hide_shipping_city');
	 var hide_shipping_address  = settings.get('hide_shipping_address');
		 receipt_font_size = settings.get('receipt_font_size');
	  var hide_total  = settings.get('hide_total');
	 var hide_discount  = settings.get('hide_discount');
	 var hide_subtotal  = settings.get('hide_subtotal');
	 var printer_copies  = settings.get('printer_copies');
	 	 var receipt_image_base64  = settings.get('receipt_image_base64');
     var software_image_base64  = settings.get('software_image_base64');
   var printer_type  = settings.get('printer_type');

     var printer_ip  = settings.get('printer_ip');
     var printer_port  = settings.get('printer_port');
     var esc_mode  = settings.get('esc_mode');

       var print_minutes  = settings.get('print_minutes');


	 	 if(typeof receipt_font_size === "undefined")
   {
  receipt_font_size = "18";

   }

     if(typeof esc_mode === "undefined")
   {
  esc_mode = false;

   }
    if(typeof printer_ip === "undefined")
   {
  printer_ip = "";

   }
    if(typeof printer_port === "undefined")
   {
  printer_port = 9100;

   }

   if(typeof printer_type === "undefined")
   {
  printer_type = "EPSON";

   }

	 	 if(typeof receipt_image_base64!== "undefined")
	 	 {
	 	 	     var imgstring = '<img src="data:image/png;base64,' + receipt_image_base64 + '" style="width:100%;" />';

jQuery('#receipt_image_container').html(imgstring);
jQuery('#receipt_image_base64').val(receipt_image_base64);



	 	 }

      if(typeof software_image_base64!== "undefined")
     {
           var imgstring = '<img src="data:image/png;base64,' + software_image_base64 + '" style="width:100%;" />';

jQuery('#software_image_container').html(imgstring);
jQuery('#software_image_base64').val(software_image_base64);



     }

 if(typeof sound_selected === "undefined")
     {
          sound_selected ="beep-1";


     }

	 if(printer_copies)
	 {

	 }
	 else
	 {
	 	printer_copies =1;
	 }

   if(vat_options)
   {

   }
   else
   {
    vat_options ="not_visible";
   }

var translated_name = settings.get('translated_name');
var translated_address =settings.get('translated_address');
var translated_postcode =settings.get('translated_postcode');
var translated_city =settings.get('translated_city');
var translated_notes =settings.get('translated_notes');
var translated_phone =settings.get('translated_phone');
var translated_order_date =settings.get('translated_order_date');
var translated_payment_method =settings.get('translated_payment_method');
var translated_order_details =settings.get('translated_order_details');
var translated_customer_details =settings.get('translated_customer_details');
var translated_product =settings.get('translated_product');
var translated_total =settings.get('translated_total');
var translated_qty =settings.get('translated_qty');
var translated_price =settings.get('translated_price');
var translated_complete_order =settings.get('translated_complete_order');
var translated_cancel_order =settings.get('translated_cancel_order');
var translated_delete_order =settings.get('translated_delete_order');
var translated_print_order =settings.get('translated_print_order');
var translated_doorbell =settings.get('translated_doorbell');
var translated_discount =settings.get('translated_discount');
var translated_subtotal =settings.get('translated_subtotal');
var translated_additional_comments =settings.get('translated_additional_comments');
var translated_order_type =settings.get('translated_order_type');
var translated_time_to_delivery =settings.get('translated_time_to_delivery');
var translated_order_id =settings.get('translated_order_id');
var translated_additional_information =settings.get('translated_additional_information');
var translated_billing =settings.get('translated_billing');
var translated_shipping =settings.get('translated_shipping');
var translated_date_to_deliver =settings.get('translated_date_to_deliver');
var translated_date_to_pickup =settings.get('translated_date_to_pickup');
var translated_time_to_pickup =settings.get('translated_time_to_pickup');
var translated_minutes_to_arrive =settings.get('translated_minutes_to_arrive');
var translated_status =settings.get('translated_status');

var translated_image =settings.get('translated_image');
var translated_product_name =settings.get('translated_product_name');
var translated_enabled =settings.get('translated_enabled');

var translated_vat = settings.get('translated_vat');
var translated_vat_included = settings.get('translated_vat_included');
var enable_deliveryboys =settings.get('enable_deliveryboys');
	 var master_password_set  = settings.get('master_password_set');

	 if(master_password_set=="" ||master_password_set== undefined )

{
jQuery('#master_div').css('display', 'none');


}

jQuery('#translated_date_to_deliver').val(translated_date_to_deliver);
jQuery('#translated_date_to_pickup').val(translated_date_to_pickup);

jQuery('#translated_name').val(translated_name);
jQuery('#translated_address').val(translated_address);
jQuery('#translated_postcode').val(translated_postcode);
jQuery('#translated_city').val(translated_city);
jQuery('#translated_notes').val(translated_notes);
jQuery('#translated_phone').val(translated_phone);
jQuery('#translated_order_date').val(translated_order_date);
jQuery('#translated_payment_method').val(translated_payment_method);
jQuery('#translated_order_details').val(translated_order_details);
jQuery('#translated_customer_details').val(translated_customer_details);
jQuery('#translated_product').val(translated_product);
jQuery('#translated_total').val(translated_total);
jQuery('#translated_qty').val(translated_qty);
jQuery('#translated_price').val(translated_price);
jQuery('#translated_complete_order').val(translated_complete_order);
jQuery('#translated_cancel_order').val(translated_cancel_order);
jQuery('#translated_delete_order').val(translated_delete_order);
jQuery('#translated_print_order').val(translated_print_order);
jQuery('#translated_doorbell').val(translated_doorbell);
jQuery('#translated_discount').val(translated_discount);
jQuery('#translated_subtotal').val(translated_subtotal);
jQuery('#translated_additional_comments').val(translated_additional_comments);
jQuery('#translated_order_type').val(translated_order_type);
jQuery('#translated_time_to_delivery').val(translated_time_to_delivery);
jQuery('#translated_order_id').val(translated_order_id);
jQuery('#receipt_header_text').val(receipt_header_text);
jQuery('#receipt_footer_text').val(receipt_footer_text);
jQuery('#translated_time_to_pickup').val(translated_time_to_pickup);
jQuery('#translated_minutes_to_arrive').val(translated_minutes_to_arrive);
jQuery('#translated_status').val(translated_status);

jQuery('#translated_image').val(translated_image);
jQuery('#translated_product_name').val(translated_product_name);
jQuery('#translated_enabled').val(translated_enabled);

jQuery('#translated_vat').val(translated_vat);
jQuery('#translated_vat_included').val(translated_vat_included);

jQuery('#translated_additional_information').val(translated_additional_information);
jQuery('#translated_billing').val(translated_billing);
jQuery('#translated_shipping').val(translated_shipping);
jQuery('#master_password_set').val(master_password_set);

jQuery('#printer_ip').val(printer_ip);
jQuery('#printer_port').val(printer_port);

console.log(email);
jQuery('#email').val(email);
jQuery('#password').val(password);
jQuery('#license').val(license);
jQuery('#website').val(website);
jQuery("#check_every").val(check_every).prop("toggled", true);
jQuery('#esc_mode').prop("toggled", esc_mode);

jQuery('#billing_details').prop("toggled", billing_details);
jQuery('#shipping_details').prop("toggled", shipping_details);
jQuery('#print_doorbell').prop("toggled", print_doorbell);
jQuery('#minutes_to_arrive_values').val( minutes_to_arrive_values);
jQuery('#auto_complete_order').prop("toggled", auto_complete_order);
jQuery('#enable_deliveryboys').prop("toggled", enable_deliveryboys);
jQuery("#receipt_font_size_input").val(receipt_font_size).prop("toggled", true);
jQuery("#vat_options").val(vat_options).prop("toggled", true);
jQuery("#sound_selected").val(sound_selected).prop("toggled", true);

jQuery("#printer_copies").val(printer_copies).prop("toggled", true);

jQuery('#hide_total').prop("toggled", hide_total);
jQuery('#hide_discount').prop("toggled", hide_discount);
jQuery('#hide_subtotal').prop("toggled", hide_subtotal);

jQuery('#hide_billing_address').prop("toggled", hide_billing_address);
jQuery('#hide_billing_city').prop("toggled", hide_billing_city);
jQuery('#hide_billing_postal').prop("toggled", hide_billing_postal);
jQuery('#hide_extra_category').prop("toggled", hide_extra_category);
jQuery('#print_minutes').prop("toggled", print_minutes);




jQuery("#new_printer").val(0).prop("toggled", true);
jQuery("#new_printer_copies").val(0).prop("toggled", true);
jQuery("#new_printer_mode").val(0).prop("toggled", true);


jQuery('#hide_shipping_address').prop("toggled", hide_shipping_address);
jQuery('#hide_shipping_city').prop("toggled", hide_shipping_city);
jQuery('#hide_shipping_postal').prop("toggled", hide_shipping_postal);


jQuery("#new_printer_mode").on('change', function(e)

{
   var optionSelected = jQuery(this).find("option:selected");
     var valueSelected  = optionSelected.val();
     var textSelected   = optionSelected.text();
     if(jQuery(this).val() =="esc_pos")
     {
         jQuery('#new_printer_ip').css('display', 'block');
         jQuery('#new_printer_port').css('display', 'block');
         jQuery('#new_printer').css('display', 'none');

     }
     else
     {
         jQuery('#new_printer_ip').css('display', 'none');
         jQuery('#new_printer_port').css('display', 'none');
         jQuery('#new_printer').css('display', 'block');
     }
  

});

console.log(password);
	let current_window = remote.getCurrentWindow();
  let printersInfo = current_window.webContents.getPrinters();

  var html_for_printers = "";
   jQuery.each(printersInfo, function(key,current_printer) {  

//html_for_printers +='<option value="'+current_printer.name+'">'+current_printer.name+'</option>';

html_for_printers += '<x-menuitem value="'+current_printer.name+'"> <x-label>'+current_printer.name+'</x-label> </x-menuitem>';
}); 
   jQuery('#printer_selected x-menu').append(html_for_printers);
jQuery("#printer_selected").val(printer_selected).prop("toggled", true);
jQuery("#printer_type").val(printer_type).prop("toggled", true);
   jQuery('#new_printer x-menu').append(html_for_printers);

var html_for_meta ="";
	if(custom_meta!=null)
	{


		 jQuery.each(custom_meta, function(key, value) {  

//html_for_printers +='<option value="'+current_printer.name+'">'+current_printer.name+'</option>';



html_for_meta += ' <x-box> <x-input id="meta_key" value="'+value.meta_key+'"> <x-label>Meta Key</x-label> </x-input> <x-input id="meta_name" value="'+value.meta_name+'"> <x-label>Name</x-label> </x-input> <x-button class="remove_meta_key" key="'+value.meta_key+'"> <x-icon name="delete" ></x-icon> </x-button> </x-box>';

}); 

   jQuery('#meta_div').append(html_for_meta);
		var all_remove_classes =     document.getElementsByClassName('remove_meta_key');
		for (var i = 0; i < all_remove_classes.length; i++) {
    all_remove_classes[i].addEventListener('click', remove_meta_key, false);
}


	}

refresh_printers();




 // console.log(printersInfo);
           // let printer = printersInfo.filter(printer => printer.isDefault === true)[0];

});

