const {app} = require('electron');
const settings = require('electron-settings');
var jQuery = require('jquery');
const electron = require('electron');
const fs = require('fs-extra');
var request = require('request');
const { dialog } = require('electron')

const BrowserWindow = electron.remote.BrowserWindow;
var player = require('play-sound')(opts = {})
 const remote = electron.remote;
var order_type="";
var custom_meta_keys =  [];
var custom_meta = settings.get('custom_meta');
var {Howl, Howler} = require('howler');
var billing_details = settings.get('billing_details');
var shipping_details = settings.get('shipping_details');
var minutes_to_arrive_values = settings.get('minutes_to_arrive_values');
const path = require('path');
const fixPath = require('fix-path');
const shellPath = require('shell-path');

fixPath();

var translated ={};

//translated name
if(settings.get('translated_name')!="" && settings.get('translated_name') != undefined )
{
  translated.name = settings.get('translated_name');

}
else
{
    translated.name = "Name";


}
//translated name

//translated address
if(settings.get('translated_address')!="" && settings.get('translated_address') != undefined )
{
  translated.address = settings.get('translated_address');

}
else
{
    translated.address = "Address";


}
//translated address//

//translated postcode
if(settings.get('translated_postcode')!="" && settings.get('translated_postcode') != undefined )
{
  translated.postcode = settings.get('translated_postcode');

}
else
{
    translated.postcode = "Postal Code";


}
//translated postcode


//translated city
if(settings.get('translated_city')!="" && settings.get('translated_city') != undefined )
{
  translated.city = settings.get('translated_city');

}
else
{
    translated.city = "City";


}
//translated city


//translated notes
if(settings.get('translated_notes')!="" && settings.get('translated_notes') != undefined )
{
  translated.notes = settings.get('translated_notes');

}
else
{
    translated.notes = "Notes";


}
//translated phone

if(settings.get('translated_phone')!="" && settings.get('translated_phone') != undefined )
{
  translated.phone = settings.get('translated_phone');

}
else
{
    translated.phone = "Phone";


}
//translated phone


//translated_order_date

if(settings.get('translated_order_date')!="" && settings.get('translated_order_date') != undefined )
{
  translated.order_date = settings.get('translated_order_date');

}
else
{
    translated.order_date = "Order Date";


}
//translated order date


if(settings.get('translated_payment_method')!="" && settings.get('translated_payment_method') != undefined )
{
  translated.payment_method = settings.get('translated_payment_method');

}
else
{
    translated.payment_method = "Payment Method";


}
//translated order date


if(settings.get('translated_order_details')!="" && settings.get('translated_order_details') != undefined )
{
  translated.order_details = settings.get('translated_order_details');

}
else
{
    translated.order_details = "Order Details";


}
//translated order date




if(settings.get('translated_customer_details')!="" && settings.get('translated_customer_details') != undefined )
{
  translated.customer_details = settings.get('translated_customer_details');

}
else
{
    translated.customer_details = "Customer Details";


}
//translated order date


if(settings.get('translated_product')!="" && settings.get('translated_product') != undefined )
{
  translated.product = settings.get('translated_product');

}
else
{
    translated.product = "Product";


}
//translated order date


if(settings.get('translated_total')!="" && settings.get('translated_total') != undefined )
{
  translated.total = settings.get('translated_total');

}
else
{
    translated.total = "Total";


}
//translated order date


if(settings.get('translated_qty')!="" && settings.get('translated_qty') != undefined )
{
  translated.qty = settings.get('translated_qty');

}
else
{
    translated.qty = "QTY";


}
//translated order date

if(settings.get('translated_price')!="" && settings.get('translated_price') != undefined )
{
  translated.price = settings.get('translated_price');

}
else
{
    translated.price = "Price";


}
//translated order date

if(settings.get('translated_completed_order')!="" && settings.get('translated_completed_order') != undefined )
{
  translated.completed_order = settings.get('translated_completed_order');

}
else
{
    translated.complete_order = "Complete Order";


}

if(settings.get('translated_cancel_order')!="" && settings.get('translated_cancel_order') != undefined )
{
  translated.cancel_order = settings.get('translated_cancel_order');

}
else
{
    translated.cancel_order = "Cancel Order";


}

if(settings.get('translated_delete_order')!="" && settings.get('translated_delete_order') != undefined )
{
  translated.delete_order = settings.get('translated_delete_order');

}
else
{
    translated.delete_order = "Delete Order";


}

if(settings.get('translated_print_order')!="" && settings.get('translated_print_order') != undefined )
{
  translated.print_order = settings.get('translated_print_order');

}
else
{
    translated.print_order = "Print Order";


}
if(settings.get('translated_doorbell')!="" && settings.get('translated_doorbell') != undefined )
{
  translated.doorbell = settings.get('translated_doorbell');

}
else
{
    translated.doorbell = "Doorbell";


}

if(settings.get('translated_discount')!="" && settings.get('translated_discount') != undefined )
{
  translated.discount = settings.get('translated_discount');

}
else
{
    translated.discount = "Discount";


}

if(settings.get('translated_subtotal')!="" && settings.get('translated_subtotal') != undefined )
{
  translated.subtotal = settings.get('translated_subtotal');

}
else
{
    translated.subtotal = "Subtotal";


}


if(settings.get('translated_additional_comments')!="" && settings.get('translated_additional_comments') != undefined )
{
  translated.additional_comments = settings.get('translated_additional_comments');

}
else
{
    translated.additional_comments = "Additional Comments";


}

if(settings.get('translated_order_type')!="" && settings.get('translated_order_type') != undefined )
{
  translated.order_type = settings.get('translated_order_type');

}
else
{
    translated.order_type = "Order Type";


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
var translated_additional_comments =settings.get('translated_additional_comments');

if(custom_meta!=null)
{

 jQuery.each(custom_meta, function(key, value) {  
 	custom_meta_keys.push(value.meta_key);

 	  }); 
}

let order_print_window;
var current_order_data;
// renderer process


var ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('order-data', function (event,order_data) {

  console.log(event);
    console.log(order_data);
    current_order_data = order_data;

 jQuery.each(current_order_data.billing, function(key, value) {  
        var ctrl = jQuery('#billing_'+key+'');  
        switch(ctrl.prop("type")) { 
            case "radio": case "checkbox":   
                ctrl.each(function() {
                    if(jQuery(this).attr('value') == value) jQuery(this).attr("checked",value);
                });   
                break;  
            default:
                ctrl.val(value); 
        }  
    });  
 jQuery('#billing_customer_note').val(current_order_data.customer_note);
 jQuery('#total').html(current_order_data.total);
 jQuery('#order_date_text').html(current_order_data.date_created.date);
 jQuery('#payment_method_text').html(current_order_data.payment_method_title);
if(current_order_data.status=="accepting")
{
   jQuery('#accept_order').css('display', 'block');

   var minutes_to_arrive_array = minutes_to_arrive_values.split(',');

    jQuery.each(minutes_to_arrive_array, function(key, value) {  
  custom_meta_keys.push(value.meta_key);
  jQuery('.minutes-container').append(' <div class="woofood-minute"> <input type="radio" name="minutes_to_arrive" value="'+value+'" id="minutes_'+value+'"> <label for="minutes_'+value+'">'+value+'</label> </div>');
    }); 
   jQuery('.minutes-container').css('display', 'block');


}




//Translation Here///
if(translated_name!="")
 {
 jQuery('#name_label').text(translated_name);
}
if(translated_phone!="")
 {
 jQuery('#phone_label').text(translated_phone);
}
if(translated_city!="")
 {
 jQuery('#city_label').text(translated_city);
}
if(translated_postcode!="")
 {
 jQuery('#postcode_label').text(translated_postcode);
}
if(translated_notes!="")
 {
 jQuery('#notes_label').text(translated_notes);
}
if(translated_address!="")
 {
 jQuery('#address_label').text(translated_address);
}
if(translated_customer_details!="")
 {
 jQuery('#customer_details_label').text(translated_customer_details);
}
if(translated_order_details!="")
 {
 jQuery('#order_details_label').text(translated_order_details);
}
if(translated_product!="")
 {
 jQuery('#product_label').text(translated_product);
}
if(translated_price!="")
 {
 jQuery('#price_label').text(translated_price);
}
if(translated_qty!="")
 {
 jQuery('#qty_label').text(translated_qty);
}
if(translated_total!="")
 {
 jQuery('#total_label').text(translated_total);
}
if(translated_total!="")
 {
 jQuery('#order_total_label').text(translated_total);
}
if(translated_payment_method!="")
 {

 jQuery('#payment_method_label').text(translated_payment_method);
}
if(translated_order_date!="")
 {
 jQuery('#order_date_label').text(translated_order_date);
}
 if(translated_print_order!="")
 {
 	 jQuery('#print_order').text(translated_print_order);

 }

  if(translated_cancel_order!="")
 {
 	 jQuery('#cancel_order').text(translated_cancel_order);

 }
 if(translated_delete_order!="")
 {
 	 jQuery('#delete_order').text(translated_delete_order);

 }
  if(translated_complete_order!="")
 {
 	 jQuery('#complete_order').text(translated_complete_order);
 }




//Translation Here///




  jQuery.each(current_order_data.meta_data, function(meta_key, meta_value) {  
  	  	
  	  	if(meta_value.key=="woofood_order_type")
  	  	{
  	  		order_type = meta_value.value;
 			jQuery('#order_type_text').html(order_type);


  	  	}

  	  	


}); 



var html_to_insert ="";
  jQuery.each(current_order_data.line_items, function(key, value) {  
  	var extra_options;
    var tm_extra_options;
    var additional_comments =""
	var extra_options_html ="";
  	  jQuery.each(value.meta_data, function(meta_key, meta_value) {  
  	  	if(meta_value.key=="woofood_meta")
  	  	{
  	  		if(IsJsonString(meta_value.value))
          {
                      extra_options = JSON.parse(meta_value.value);

          }

  	  	}
        if(meta_value.key=="_tmcartepo_data")
        {
          
                      tm_extra_options = meta_value.value;

    

        }
        

  	  	


}); 
	 extra_options_html +="<ul style='list-style:none;width:100%;float:left;'>";

  	  //for each extra options//
  	  if(extra_options!=null)
  	  {
  	  		  jQuery.each(extra_options.extra_options, function(key,meta_value) {  
  	  	
  	  		extra_options_html += '<li>'+meta_value.name+':'+meta_value.price+'</li>';



}); 
            if(extra_options.additional_comments!=null)
      {
        additional_comments = extra_options.additional_comments;
         extra_options_html += '<li>'+translated.additional_comments+':'+additional_comments+'</li>';

      }

  	  }


       //for each tm extra options//
      if(tm_extra_options!=null)
      {
            jQuery.each(tm_extra_options, function(key,meta_value) {  
        
          extra_options_html += '<li>'+meta_value.value+'</li>';



}); 
    

      }
         //for each tm extra options//

  	  	 extra_options_html +="</ul>";

  	  //for each extra options//
html_to_insert +='<tr> <td>'+value.name+' <br/>'+extra_options_html+'<td> '+value.subtotal+' </td> <td>'+value.quantity+'</td> <td>'+value.total+'</td> </tr>'; 
//html_to_insert += ' <div class="col col-pro layout-inline"> <p>'+value.name+'</p>'+extra_options_html+' </div> <div class="col col-price col-numeric align-center "> <p>'+value.subtotal+'</p> </div> <div class="col col-qty layout-inline">  <p>'+value.quantity+'</p> </div> <div class="col col-total col-numeric">               <p>'+value.total+'</p> </div> </div>';
       
    }); 

jQuery('#order-line-items').html(html_to_insert);


});
function save_settings() {
	var email = jQuery('#email').val();
	var password = jQuery('#password').val();
	var license = jQuery('#license').val();
	var website = jQuery('#website').val();
	var check_every = jQuery('#check_every').val();
	var billing_details = jQuery('#billing_details').is(':checked');
	var shipping_details = jQuery('#shipping_details').is(':checked');

settings.set('email', email);
settings.set('password', password);
settings.set('license', license);
settings.set('website', website);
settings.set('billing_details', billing_details);
settings.set('shipping_details', shipping_details);

settings.set('check_every', check_every);


}


function print_order() {


  var order_print_html ="";


    var custom_meta_html = "";

   jQuery.each(current_order_data.meta_data, function(meta_key, meta_value) {  
      if(custom_meta_keys.includes(meta_value.key))
        {
          console.log("includessss");

          var current_meta_data = custom_meta.filter(meta_data => meta_data.meta_key == meta_value.key)[0];
          custom_meta_html += current_meta_data.meta_name+":"+meta_value.value+"<br/>";


        }

            if(settings.get('print_doorbell'))
            {

                if(meta_value.key=="doorbell")
        {
        

                  custom_meta_html += translated.doorbell+":"+meta_value.value+"<br/>";



        }

            }

            if(meta_value.key=="woofood_order_type")
        {
        

                  order_print_html += translated.order_type+":"+meta_value.value+"<br/>";



        }
        



}); 


  if (current_order_data!=null)
  {
  order_print_html +='<html>Order ID:'+current_order_data.id+'<br/> </html>';
  order_print_html +=translated.order_date+':'+current_order_data.date_created.date+'<br/> </html>';
    order_print_html +=translated.payment_method+':'+current_order_data.payment_method_title+'<br/> </html>';

    order_print_html +='<hr>';
    if(billing_details)
    {
      order_print_html +=translated.name+':'+current_order_data.billing.first_name+' '+current_order_data.billing.last_name+'<br/> ';
  order_print_html +=translated.phone+':'+current_order_data.billing.phone+'<br/> ';

  order_print_html +=translated.address+':'+current_order_data.billing.address_1+' '+current_order_data.billing.address_2+'<br/> ';
  order_print_html +=translated.city+':'+current_order_data.billing.city+'<br/> ';
  order_print_html +=translated.postcode+':'+current_order_data.billing.postcode+'<br/> ';
  order_print_html +=translated.notes+':'+current_order_data.customer_note+'<br/> ';

    }
    if(shipping_details)
  {
      order_print_html +='<hr>';

    order_print_html +=translated.name+':'+current_order_data.shipping.first_name+' '+current_order_data.shipping.last_name+'<br/> ';

  order_print_html +=translated.address+':'+current_order_data.shipping.address_1+' '+current_order_data.shipping.address_2+'<br/> ';
  order_print_html +=translated.city+':'+current_order_data.shipping.city+'<br/> ';
  order_print_html +=translated.postcode+':'+current_order_data.shipping.postcode+'<br/> ';



  }
  



  order_print_html +='<hr>';




  var html_to_insert ="";





   

      order_print_html +=  custom_meta_html;

      order_print_html +=  "<hr>";


  jQuery.each(current_order_data.line_items, function(key, value) {  
    var extra_options;
    var tm_extra_options;
  var extra_options_html ="";

      jQuery.each(value.meta_data, function(meta_key, meta_value) {  
        if(meta_value.key=="woofood_meta")
        {
          if(IsJsonString(meta_value.value))
          {
                      extra_options = JSON.parse(meta_value.value);

          }


        }

        if(meta_value.key=="_tmcartepo_data")
        {
          
                      tm_extra_options = meta_value.value;

    

        }

       


}); 

      //for each extra options//
      if(extra_options!=null)
      {
      jQuery.each(extra_options.extra_options, function(key,meta_value) {  
        
          extra_options_html += ''+meta_value.name+':'+meta_value.price+'<br/>';




}); 


      if(extra_options.additional_comments!=null)
      {
        var additional_comments = extra_options.additional_comments;
         extra_options_html += ''+translated.additional_comments+':'+additional_comments+'<br/>';

      }
 }

   //for each tm extra options//
      if(tm_extra_options!=null)
      {
            jQuery.each(tm_extra_options, function(key,meta_value) {  
        
          extra_options_html += ''+meta_value.value+'<br/>';



}); 
    

      }
         //for each tm extra options//

 order_print_html += 'x'+value.quantity+')'+value.name+'<br/>'+extra_options_html+'<hr>'+translated.subtotal+':'+value.total+"<br/><br/>";
       
    }); 
    order_print_html +='<hr>';

  order_print_html +=translated.discount+':'+current_order_data.discount_total+'<br/>';

  order_print_html +=translated.total+':'+current_order_data.total+'<br/>';

  order_print_html +='</html>';

  /* order_print_window = new BrowserWindow({'auto-hide-menu-bar':true, 'show':false});
   

     order_print_window.webContents = order_print_html;
  order_print_window.webContents.print({silent:true, printBackground:true});*/
   var printer_selected  = settings.get('printer_selected');


//if is windows//

   var order_print_text = order_print_html.replace(new RegExp("<html>", 'g'), "");
order_print_text = order_print_text.replace(new RegExp("</html>", 'g'), "");
  order_print_text = order_print_text.replace(new RegExp("<br/>", 'g'), "\n");
  order_print_text = order_print_text.replace(new RegExp("<hr>", 'g'), "---------------------------\n");
if (process.platform === "win32")
{



    var exec = require('child_process').execFile;
   exec(__dirname +'\\woofood_print.exe',['html===="'+order_print_text+'"', 'printername===='+printer_selected+''], function (err, stdout, stderr) {
    if (err) {
        throw err;
    }
    });
   var sound = new Howl({
  src: [__dirname+'\\beep-1.mp3']
});

sound.play();



  

  }
  //end if is windows
  //is mac//
  else
  {

    var appName = remote.app.getName();

    var getAppPath = path.join(remote.app.getPath('appData'), appName);


    fs.writeFile(getAppPath+'/print.txt', order_print_text,function(){
    
            
         var sound = new Howl({
  src: [__dirname+'/beep-1.mp3']
});

sound.play();





 var exec = require('child_process').exec;
           exec('lpr -P '+printer_selected+' "'+getAppPath+'/print.txt"', function (err, stdout, stderr) {
    if (err) {
        throw err;
    }
    });


          });
      
       






   
 
/*
    let win = new BrowserWindow({width: 302, height: 793,show:false});
win.once('ready-to-show', () => win.hide());
    fs.writeFile(__dirname+'/print.html', order_print_html,function(){
        win.loadURL('file://'+__dirname+'/print.html');
        win.webContents.on('ready-to-show', () => {
            //let printersInfo = win.webContents.getPrinters();
            //let printer = printersInfo.filter(printer => printer.isDefault === true)[0];
            win.webContents.print({silent: true, printBackground: true, deviceName : printer_selected},() => {
                win = null;
            });



var sound = new Howl({
  src: [__dirname+'/beep-1.mp3']
});

sound.play();





        });
    });
*/
  

  }
  //enf else if is mac



}

order_mark_as_printed(current_order_data.id);
jQuery('#accept_order').css('display', 'none');
jQuery('.minutes-container').css('display', 'none');

}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function order_mark_as_printed() {
	var website  = settings.get('website');
	var email  = settings.get('email');
	var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/update",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
	{
		url:url, 
		headers : {
            "Username" : email,
            "Password" : password,
        },
		form: {
			id:current_order_data.id,
			printed:'yes'
		}
	}, 
	function(err,httpResponse,body)
	{ 



	});



}
}

function cancel_order(){


change_order_status("cancelled");


}

function complete_order(){


change_order_status("completed");


}
function accept_order(){
var minutes_to_arrive = jQuery("input[name=minutes_to_arrive]:checked").val();
accept_order_minutes(minutes_to_arrive);
//change_order_status("processing");
print_order();


}

function change_order_status(status) {
	var website  = settings.get('website');
	var email  = settings.get('email');
	var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/update",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
	{
		url:url, 
		headers : {
            "Username" : email,
            "Password" : password,
        },
		form: {
			id:current_order_data.id,
			status:status
		}
	}, 
	function(err,httpResponse,body)
	{ 

		if(status =="cancelled" && JSON.parse(body)=="success")
		{
			var window = remote.getCurrentWindow();
 			window.close();

		}

		if(status =="completed" && JSON.parse(body)=="success")
		{
			var window = remote.getCurrentWindow();
 			window.close();

		}
		
		 

		


	});



}
}



function accept_order_minutes(minutes) {
  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/update",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
  {
    url:url, 
    headers : {
            "Username" : email,
            "Password" : password,
        },
    form: {
      id:current_order_data.id,
      status:"processing",
      minutes:minutes
    }
  }, 
  function(err,httpResponse,body)
  { 

    if(status =="cancelled" && JSON.parse(body)=="success")
    {
      var window = remote.getCurrentWindow();
      window.close();

    }

    if(status =="completed" && JSON.parse(body)=="success")
    {
      var window = remote.getCurrentWindow();
      window.close();

    }
    
     

    


  });



}
}


function close_window()
{
	var window = remote.getCurrentWindow();
 			window.close();
}

function delete_order() {

	

	var website  = settings.get('website');
	var email  = settings.get('email');
	var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/delete",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
	{
		url:url, 
		headers : {
            "Username" : email,
            "Password" : password,
        },
		form: {
			id:current_order_data.id,
		}
	}, 
	function(err,httpResponse,body)
	{ 

		if(JSON.parse(body)=="deleted")
		{
			var window = remote.getCurrentWindow();
 			window.close();

		}
		
		 

		


	});



}


}

document.addEventListener('DOMContentLoaded', function() {
 // print_win = new BrowserWindow({'auto-hide-menu-bar':true});
 // print_win.loadURL('file://' + __dirname + '/print.html');
 // print_win.show();

  //print_win.webContents.on('did-finish-load', function() {
    document.getElementById('print_order').addEventListener('click', print_order);
        document.getElementById('cancel_order').addEventListener('click', cancel_order);
        document.getElementById('delete_order').addEventListener('click', delete_order);
        document.getElementById('complete_order').addEventListener('click', complete_order);
                document.getElementById('accept_order').addEventListener('click', accept_order);

       // document.getElementById('close_window').addEventListener('click', close_window);

    //document.getElementById('print_order').addEventListener('click', print_order);


    console.log('ready');
	 var email  = settings.get('email');
	 var password  = settings.get('password');
var license  = settings.get('license');
	 var website  = settings.get('website');
	 var check_every  = settings.get('check_every');
	 var billing_details  = settings.get('billing_details');
	 var shipping_details  = settings.get('shipping_details');

console.log(email);
console.log(password);



  

});

