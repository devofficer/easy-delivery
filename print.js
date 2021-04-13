const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs-extra');
var request = require('request');
var jQuery = require('jquery');
const settings = require('electron-settings');
const storage = require('electron-json-storage');

var all_orders_array = [];
var search_orders_array = [];
var all_new_orders_array = [];

var player = require('play-sound')(opts = {})
var urlencode = require('urlencode');
  var license_check_return ="";
var MicroModal = require('micromodal')
var custom_meta_keys =  [];
var custom_meta = settings.get('custom_meta');
var minutes_to_arrive_values = settings.get('minutes_to_arrive_values');
var print_minutes  = settings.get('print_minutes');

var translated ={};
var {Howl, Howler} = require('howler');
var billing_details = settings.get('billing_details');
var printer_copies = settings.get('printer_copies');
var deliveryboys = settings.get('deliveryboys');
var vat_options = settings.get('vat_options');
var sound_selected = settings.get('sound_selected');
var order_statuses = null;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var esc_mode = settings.get('esc_mode');
var printer_ip = settings.get('printer_ip');
var printer_port = settings.get('printer_port');
var additional_printers   = settings.get('additional_printers');
var printed_orders = [];
var all_products =null;
var Tabulator = require('tabulator-tables');

const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
//console.log(storage.getDefaultDataPath());
  storage.get('all_products', function(error, data) {
      if(JSON.stringify(data) === '{}')
      {
                    all_products = settings.get('all_products');

        storage.set('all_products', all_products, function(error) {
  if (error) throw error;
});

      }
      else
      {
        all_products = data;
      }
    console.log(data);

});

for ( const [key,value] of Object.entries( settings.get('') ) ) {
/*console.log(key);

storage.set(key, value, function(error) {
  if (error) throw error;
});*/

}


    // Print instantly. Returns success or throws error
                  // Executes all the commands. Returns success or throws error

async function print_order_new(current_order_data, minutes = null) {


}





async function print_order_esc(current_order_data, minutes = null) {




var is_clicked = false;
var printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,                                  // Printer type: 'star' or 'epson'
  interface: 'tcp://'+printer_ip+':'+printer_port,                       // Printer interface
  characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
  removeSpecialCharacters: false,  
      /*extraSpecialCharacters: {'€': 164},*/
  
                        // Removes special characters - default: false
  lineCharacter: "=",                                       // Set character for lines - default: "-"
  options:{                                                 // Additional options
    timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
  },
              width: 42 //default 48 //star mcprint 3 72mm 

});

  
 //await printer.raw(Buffer.from('\x1B' +  '\x74' + '\x30')); 
  
//printer.add(new Buffer([0x1b, 0x74, 40]));

                // Executes all the commands. Returns success or throws error



  console.log(current_order_data);
 if(current_order_data.type=="click" )
  {
    is_clicked = true;
current_order_data = all_orders_array[current_order_id];
if(!current_order_data)
{
  current_order_data = search_orders_array[current_order_id];

}
  }



  var order_print_html ="";

var order_type_html = "";
  var custom_meta_html = "";

  var time_to_deliver_html = "";
  var date_to_deliver_html = "";
var minutes_to_arrive_html = "";
var custom_meta_array = [];
   jQuery.each(current_order_data.meta_data, function(meta_key, meta_value) {  
      if(custom_meta_keys.includes(meta_value.key))
        {
          console.log("includessss");

          var current_meta_data = custom_meta.filter(meta_data => meta_data.meta_key == meta_value.key)[0];
          //custom_meta_html += current_meta_data.meta_name+":"+meta_value.value+"<br/>";


           custom_meta_html +='<tr class="details">';

             custom_meta_html +='<td><strong>'+current_meta_data.meta_name+':</strong>'+meta_value.value+'</td> ';
           custom_meta_html +='</tr>';
           custom_meta_array.push({"key":current_meta_data.meta_name, "value":meta_value.value });


        }

        if(meta_value.key=="woofood_time_to_deliver" &&  meta_value.value!="")
        {
                    
              if(current_order_data.order_type_slug =="pickup")
              {

                  time_to_deliver_html += meta_value.value;
              }
              else
              {
                                  time_to_deliver_html += meta_value.value;

              }



        }
          if(meta_value.key=="woofood_date_to_deliver" &&  meta_value.value!="")
        {
        
         if(current_order_data.order_type_slug =="pickup")
              {

                  date_to_deliver_html += meta_value.value;
                }
                else
                {
                                    date_to_deliver_html += meta_value.value;


                }



        }

        if((meta_value.key=="minutes_to_arrive" &&  meta_value.value!=""))
        {
        
        if(print_minutes)
        {
                  minutes_to_arrive_html = meta_value.value;

        }

                
              



        }






            if(settings.get('print_doorbell'))
            {

                if(meta_value.key=="doorbell")
        {


        



                   custom_meta_html +='<tr class="details">';

             custom_meta_html +='<td><strong>'+translated.doorbell+':</strong>'+meta_value.value+'</td> ';
           custom_meta_html +='</tr>';

           custom_meta_array.push({"key":translated.doorbell, "value":meta_value.value });



        }

            }

                 if(meta_value.key=="woofood_order_type" &&  meta_value.value!="")
        {
        

                  order_type_html +=  meta_value.value;



        }
        



}); 

if(minutes!=null)
{
                    minutes_to_arrive_html = minutes;

}


  if (current_order_data!=null)
  {



  order_print_html +='<html>';
  order_print_html +='<head> <meta charset="UTF-8"> <title>Receipt</title> <style>@page {     margin-top: 0cm;margin-left: 0cm; margin-right: 0cm; margin-bottom: -.5cm;     width: 70mm !important;} body{width:70mm; height:100%; } .invoice-box {width:70mm; height:100%%;margin-bottom:20px; } .invoice-box table{ font-size:'+receipt_font_size+'px;} .invoice-box table .price, .invoice-box table .qty{ width:15%;}   .invoice-box table .name{ width:70%;} .invoice-box table{width: 100%; line-height: inherit; text-align: left;}.invoice-box table td{padding: 5px; vertical-align: top;}.invoice-box table tr td:nth-child(2){text-align: left;}.invoice-box table tr.top table td{}.invoice-box table tr.top table td.title{font-size: 45px; line-height: 45px; color: #333;}.invoice-box table tr.information table td{padding-bottom: 40px;}.invoice-box table tr.heading td{font-weight:bold; color:black; border-bottom: 1px solid #ddd; font-weight: bold;}.invoice-box table tr.details td{}.invoice-box table tr.item td{border-bottom: 1px solid #eee;}.invoice-box table tr.item.last td{border-bottom: none;}.invoice-box table tr.total td:nth-child(2){border-top: 2px solid #eee; font-weight: bold;}@media only screen and (max-width: 600px){.invoice-box table tr.top table td{width: 100%; display: block; text-align: left;}.invoice-box table tr.information table td{width: 100%; display: block; text-align: center;}}/** RTL **/ .rtl{direction: rtl; font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;}.rtl table{text-align: right;}.rtl table tr td:nth-child(2){text-align: left;}</style></head>';
  order_print_html +='<body>';
    order_print_html +='<div class="invoice-box">';

  order_print_html +='<table>';
  order_print_html +='<tbody>';

 order_print_html +='<tr class="information">';
  order_print_html +='<td colspan="2">';

  order_print_html +='<table>';

  order_print_html +='<tbody>';
  order_print_html +='<tr>';
  order_print_html +='<td>';
   if(typeof receipt_image_base64!== "undefined" && receipt_image_base64!=="" )
     {
            //await printer.printImage('/Users/dimosramiotis/Desktop/agadget-small.jpg');

  order_print_html += '<img src="data:image/png;base64,' + receipt_image_base64 + '" style="max-height: 150px;width: auto;max-width: 100%;">';
    }
order_print_html +='<br/>';
  
  

if(typeof receipt_header_text!== "undefined" && receipt_header_text!=="" )
     {
      printer.alignCenter(); 
      printer.println(receipt_header_text.replace(/\n/g, "<br />"));
  order_print_html +='<div style="text-align:center;">'+receipt_header_text.replace(/\n/g, "<br />")+'</div>';
  printer.newLine();  
  printer.alignLeft();    
}
  order_print_html +='</td>';
  order_print_html +='</tr>';

  order_print_html +='</tbody>';
  order_print_html +='</table>';
  order_print_html +='</td>';
  order_print_html +='</tr>';






  
  order_print_html +='<tr class="top">';
  order_print_html +='<td colspan="2">';

  order_print_html +='<table>';

  order_print_html +='<tbody>';

  order_print_html +='<tr>';
    order_print_html +='<td>';
printer.bold(true);    

printer.leftRight(translated.order_date , current_order_data.date_created.date);                         // Prints text left and right
/*printer.table(["One", "Two", "Three"]);                     // Prints table equaly
printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:"Left", align:"LEFT", width:0.5 },
  { text:"Center", align:"CENTER", width:0.25, bold:true },
  { text:"Right", align:"RIGHT", cols:8 }
]);*/

printer.leftRight(translated.order_id, current_order_data.number);                         // Prints text left and right

  order_print_html +='<strong>'+translated.order_id+':</strong>'+current_order_data.id+'<br/>';
  order_print_html +='<strong>'+translated.order_date+':</strong>'+current_order_data.date_created.date+'<br/> ';


if(order_type_html!="")
  {    

  printer.leftRight(translated.order_type,order_type_html);                         // Prints text left and right


     // order_print_html += order_type_html;

  }

  if(date_to_deliver_html!="")
  {
      order_print_html += date_to_deliver_html;

      if(current_order_data.order_type_slug =="pickup")
              {
        printer.leftRight(translated.date_to_pickup, date_to_deliver_html);      
        }
        else{
                  printer.leftRight(translated.date_to_deliver, date_to_deliver_html);      

        }                   // Prints text left and right

  }


  if(time_to_deliver_html!="")
  {
    if(current_order_data.order_type_slug =="pickup")
              {
  order_print_html += time_to_deliver_html;
    printer.leftRight(translated.time_to_pickup, time_to_deliver_html);  
    }
    else{
      order_print_html += time_to_deliver_html;
    printer.leftRight(translated.time_to_delivery, time_to_deliver_html);  
    }  

    }                     // Prints text left and right


  order_print_html += minutes_to_arrive_html;
  if(minutes!=null)
  {
              printer.leftRight(translated.minutes_to_arrive, minutes_to_arrive_html);                         // Prints text left and right

  }


  order_print_html +='<strong>'+translated.payment_method+':</strong>'+current_order_data.payment_method_title+'<br/>';

           // printer.println(minutes_to_arrive_html);     
            printer.leftRight(translated.payment_method, current_order_data.payment_method_title);                         // Prints text left and right
                    // Prints text left and right
printer.setTextNormal();    
printer.bold(false);    

  order_print_html +='</td>';
  order_print_html +='</tr>';

  order_print_html +='</tbody>';
  order_print_html +='</table>';
  order_print_html +='</td>';
  order_print_html +='</tr>';


  if(billing_details)
  {
        printer.drawLine();   

    printer.println(translated.billing);     
    printer.drawLine();   

            printer.leftRight(translated.name, current_order_data.billing.first_name+' '+current_order_data.billing.last_name);  
            printer.leftRight(translated.phone, current_order_data.billing.phone);  

     order_print_html +='<tr class="heading">';
     order_print_html +='<td>'+translated.billing+'</td>';

     order_print_html +='</tr>';
     order_print_html +='<tr class="details">';

    order_print_html +='<td><strong>'+translated.name+":</strong> "+current_order_data.billing.first_name+' '+current_order_data.billing.last_name+'</td>';
     order_print_html +='</tr>';
          order_print_html +='<tr class="details">';

       order_print_html +='<td><strong>'+translated.phone+'</strong>: '+current_order_data.billing.phone+'</td>';
     order_print_html +='</tr>';



    if(hide_billing_address)
{

}
else
{            printer.leftRight(translated.address, current_order_data.billing.address_1+' '+current_order_data.billing.address_2);  

       order_print_html +='<tr class="details">';

    order_print_html +='<td><strong>'+translated.address+':</strong>'+current_order_data.billing.address_1+' '+current_order_data.billing.address_2+'</td>';
     order_print_html +='</tr>';

}
  if(hide_billing_city)
{

}
else
{
          printer.leftRight(translated.city, current_order_data.billing.city);  

         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.city+': </strong> '+current_order_data.billing.city+'</td> ';
       order_print_html +='</tr>';

}

  if(hide_billing_postal)
{

}
else
{
             printer.leftRight(translated.postcode, current_order_data.billing.postcode);  

           order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.postcode+': </strong> '+current_order_data.billing.postcode+'</td>';
         order_print_html +='</tr>';

}
         order_print_html +='<tr class="details">';

             printer.leftRight(translated.notes, current_order_data.customer_note);  

  order_print_html +='<td><strong>'+translated.notes+': </strong>'+current_order_data.customer_note+'</td>';
           order_print_html +='</tr>';




  }
  if(shipping_details)
  {
        printer.drawLine();   

    printer.println(translated.shipping);     
    printer.drawLine();   
       order_print_html +='<tr class="heading">';
     order_print_html +='<td>'+translated.shipping+'</td>';

     order_print_html +='</tr>';
       order_print_html +='<tr class="details">';

    order_print_html +='<td><strong>'+translated.name+': </strong>'+current_order_data.shipping.first_name+' '+current_order_data.shipping.last_name+'</td>';
         order_print_html +='</tr>';

 if(hide_shipping_address)
{

}
else
{
               printer.leftRight(translated.address, current_order_data.shipping.address_1+' '+current_order_data.shipping.address_2);  

         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.address+': </strong>'+current_order_data.shipping.address_1+' '+current_order_data.shipping.address_2+'</td> ';
           order_print_html +='</tr>';

}

 if(hide_shipping_city)
{

}
else
{
                 printer.leftRight(translated.city, current_order_data.shipping.city);  

         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.city+': </strong>'+current_order_data.shipping.city+'</td> ';
           order_print_html +='</tr>';

}

 if(hide_shipping_postal)
{

}
else
{
                   printer.leftRight(translated.postcode, current_order_data.shipping.postcode);  

         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.postcode+': </strong>'+current_order_data.shipping.postcode+'</td> ';
           order_print_html +='</tr>';

}


   




  }

  printer.println(translated.additional_information);     
    printer.drawLine();   

   order_print_html +='<tr class="heading additional">';

  order_print_html +='<td>'+translated.additional_information+'</td> ';
           order_print_html +='</tr>';




  custom_meta_array.forEach(element =>

                      printer.leftRight(element.key, element.value)



   );
      printer.drawLine();   


//printer.table([translated.qty, translated.product, translated.vat, translated.price]);      


 if(vat_options =="per_item")
          {
printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:translated.qty, align:"LEFT",width:1/10,  bold:true, },
  { text:translated.product, align:"CENTER", width:4/10, bold:true},
  { text:translated.vat, align:"RIGHT", width:2/10, bold:true },
  { text: translated.price, align:"RIGHT",  width:2/10,  bold:true},

 
]);
}
else
{
  printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:translated.qty, align:"LEFT",width:1/10, bold:true, },
  { text:translated.product, align:"CENTER", width:6/10, bold:true  },
  { text: translated.price, align:"RIGHT",  width:2/10,  bold:true},

 
]);
}


              // Prints table equaly

 /* printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:translated.qty, align:"LEFT", width:0.1, bold:true },
  { text:translated.product, align:"CENTER", width:0.7, bold:true },
  { text:translated.vat, align:"RIGHT", width:0.3, bold:true },
  { text:translated.price, align:"RIGHT", width:0.2, bold:true }

  
]);*/

      order_print_html +=  custom_meta_html;
   order_print_html +='</table>';
         order_print_html +='</tbody>';
  
         order_print_html +='<table>';
         order_print_html +='<tbody>';


         order_print_html +='<tr class="heading">';
         order_print_html +='<td class="qty">'+translated.qty+'</td>';

         order_print_html +='<td class="name">'+translated.product+'</td>';

           if(vat_options =="per_item")
          {
          order_print_html +='<td class="price">'+translated.vat+'</td>';

          }
         order_print_html +='<td class="price">'+translated.price+'</td>';
          order_print_html +='</tr>';



  var html_to_insert ="";




   

var line_items_to_print = [];


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

   
         //for each tm extra options//

 //order_print_html += 'x'+value.quantity+' '+value.name+'<br/>'+extra_options_html+'<hr>';

 var var_total_tax ="";
          if(vat_options =="per_item")
          {
                      var_total_tax = '<td class="price">'+value.total_tax+'</td>'; 
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }
          var value_total_price = value.total;
            if(vat_options =="per_item_novat")
          {
                      value_total_price = value.total_without_tax;
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }
 
 order_print_html += '<tr class="details items">';

 order_print_html += '<td class="qty">'+value.quantity+'</td><td class="name">'+value.name+'<br/>'+extra_options_html+'</td>'+var_total_tax+'<td class="price">'+value_total_price+'</td>';

 order_print_html += '</tr>';
line_items_to_print.push([value.quantity, value.name + extra_options_html , value.total_tax, value_total_price]);

// printer.table([value.quantity, value.name + extra_options_html , value.total_tax, value.total]);                     // Prints table equaly


/*printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:value.quantity, align:"LEFT",width:0.10,  cols:2  },
  { text:value.name, align:"LEFT", width:0.40, bold:true, cols:10  },
  { text:value.total_tax, align:"RIGHT", cols:10, width:0.20 },
  { text: value.total, align:"RIGHT", cols:10, width:0.20},

 
]);*/
  
 if(vat_options =="per_item")
          {
  printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:value.quantity, align:"LEFT",width:1/10 },
  { text:value.name, align:"LEFT", width:4/10, bold:true  },
  { text:value.total_tax, align:"RIGHT", width:2/10 },
  { text: value.total, align:"RIGHT",  width:2/10},

 
]);
}
  else if(vat_options =="per_item_novat")
          {

             printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:value.quantity, align:"LEFT",width:1/10 },
  { text:value.name, align:"LEFT", width:6/10, bold:true  },
  { text: value.total_without_tax, align:"RIGHT",  width:2/10},

 
]);
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }
else
{
   printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:value.quantity, align:"LEFT",width:1/10 },
  { text:value.name, align:"LEFT", width:6/10, bold:true  },
  { text: value.total, align:"RIGHT",  width:2/10},

 
]);

}
                                      // Insers break line









   //for each extra options//
      if(extra_options!=null)
      {
     /* jQuery.each(extra_options.extra_options, function(key,meta_value) {  
        
          extra_options_html += ''+meta_value.name+':'+meta_value.price+'<br/>';




}); */



jQuery.each(extra_options.extra_options, function(current_extra_option_category_name,extra_options) { 

                if(Array.isArray(extra_options))
                {
                  if(!hide_extra_category)
                  {
                              extra_options_html += ''+current_extra_option_category_name+'<br/>';




             /*     printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:current_extra_option_category_name, align:"LEFT", width:0.40,  cols:10  },
  { text:" ", align:"RIGHT", cols:10, width:0.20 },
  { text: " ", align:"RIGHT", cols:10, width:0.20},

 
]);
*/


                   printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:current_extra_option_category_name, align:"LEFT", width:4/10  },
  { text:" ", align:"RIGHT", width:2/10 },
  { text: " ", align:"RIGHT",  width:2/10},

 
]);

                  }


                   jQuery.each(extra_options, function(key,meta_value) { 

                    if(meta_value.hide_prices)
                    {


    /*              printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:meta_value.name, align:"LEFT", width:0.40, cols:10  },
  { text:" ", align:"RIGHT", cols:10, width:0.20 },
  { text: " ", align:"RIGHT", cols:10, width:0.20},

 
]);*/



                   printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:meta_value.name, align:"LEFT", width:4/10  },
  { text:" ", align:"RIGHT", width:2/10 },
  { text: " ", align:"RIGHT",  width:2/10},

 
]);



                                                                          extra_options_html += ''+meta_value.name+'<br/>';


                    }
                    else
                    {

                        /*   printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:meta_value.name, align:"LEFT", width:0.40, cols:10  },
  { text:" ", align:"RIGHT", cols:10, width:0.20 },
  { text: meta_value.price, align:"RIGHT", cols:10, width:0.20},

 
]);*/


                               printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:meta_value.name, align:"LEFT", width:4/10  },
  { text:" ", align:"RIGHT", width:2/10 },
  { text: meta_value.price, align:"RIGHT",  width:2/10},

 
]);
                                                    extra_options_html += ''+meta_value.name+':'+meta_value.price+'<br/>';


                    }

                   

                    
        
}); 

                }
                else
                {


     /*             printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:extra_options.name, align:"LEFT", width:0.40, cols:10  },
  { text:" ", align:"RIGHT", cols:10, width:0.20 },
  { text: extra_options.price, align:"RIGHT", cols:10, width:0.20},

 
]);*/


                           printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:extra_options.name, align:"LEFT", width:4/10  },
  { text:" ", align:"RIGHT", width:2/10 },
  { text: extra_options.price, align:"RIGHT",  width:2/10},

 
]);
            extra_options_html += ''+extra_options.name+':'+extra_options.price+'<br/>';

                }
              
     


}); 





       if(extra_options.additional_comments!=null)
      {
        var additional_comments = extra_options.additional_comments;
         extra_options_html += ''+translated.additional_comments+':'+additional_comments+'<br/>';




                           printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:translated.additional_comments, align:"LEFT", width:4/10  },
  { text: additional_comments, align:"RIGHT",  width:4/10},

 
]);

      }
 }

 printer.newLine();    
 //for each extra options //

 //for each tm extra options//
      if(tm_extra_options!=null)
      {
            jQuery.each(tm_extra_options, function(key,meta_value) {  
        
          extra_options_html += ''+meta_value.value+'<br/>';



}); 
    

      }




















if(hide_subtotal)
{

}
else
{
  //order_print_html += translated.subtotal+':'+value.total+"<br/><hr>";

}
  //order_print_html += "<br/>";

    }); 
// printer.table(line_items_to_print);                     // Prints table equaly



    order_print_html +='</table>';
         order_print_html +='</tbody>';
    //order_print_html +='<hr>';
  order_print_html +='<table>';
         order_print_html +='<tbody>';

  jQuery.each(current_order_data.fee_lines, function(key, value) {
  if(value!=undefined && value!=null )  
  {     
    if(value.total!=undefined && value.name!=undefined)
    {
         // order_print_html += value.name+':'+value.total+'<br/>';

order_print_html += '<tr class="heading total">';
var vat_total_tax="";

if(vat_options =="per_item")
          {
                      vat_total_tax = '<td class="price">'+value.tax+'</td>'; 
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }


 order_print_html += '<td class="qty"></td><td class="name">'+value.name+'</td>'+vat_total_tax+'<td class="price">'+value.total+'</td>';

 order_print_html += '</tr>';
/*printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:value.name, align:"LEFT", width:0.40, bold:true, cols:10  },
  { text:value.tax, align:"RIGHT", cols:10, width:0.20 },
  { text: value.total, align:"RIGHT", cols:10, width:0.20},

 
]);*/
if(vat_options =="per_item")
          {


                           printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:value.name, align:"LEFT", width:4/10  },
  { text:value.tax, align:"RIGHT", width:2/10 },
  { text: value.total, align:"RIGHT",  width:2/10},

 
]);
}
if(vat_options =="per_item_novat")
          {

                            printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:value.name, align:"LEFT", width:6/10  },
  { text: value.total_without_tax, align:"RIGHT",  width:2/10},

 
]);

}
else
{


                            printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:value.name, align:"LEFT", width:6/10  },
  { text: value.total , align:"RIGHT",  width:2/10},

 
]);

          
}






    }


  }



  });





      

if(hide_discount)
{

}
else
{

/*  printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:value.name, align:"LEFT", width:0.40, bold:true, cols:10  },
  { text:value.tax, align:"RIGHT", cols:10, width:0.20 },
  { text: value.total, align:"RIGHT", cols:10, width:0.20},

 
]);*/


     /*           printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:value.name, align:"LEFT", bold:true, width:4/10  },
  { text:value.tax, align:"RIGHT", width:2/10 },
  { text: value.total, align:"RIGHT",  width:2/10},

 
]);*/


  printer.leftRight(translated.discount, current_order_data.discount_total);
  //order_print_html +=translated.discount+':'+current_order_data.discount_total+'<br/>';

  order_print_html += '<tr class="heading discount ">';

 order_print_html += '<td>'+translated.discount+'</td><td>'+current_order_data.discount_total+'</td>';

 order_print_html += '</tr>';

}

if(hide_total)
{

}
else
{
  var extra_td="";
  var total_vat ="";
if(vat_options =="per_item")
          {
                      extra_td = '<td></td>'; 
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }
         

 if(vat_options =="as_total")
          {




             order_print_html += '<tr class="heading total ">';


 order_print_html += '<td></td><td>'+translated.vat_included+'</td>'+extra_td+'<td>'+current_order_data.total_tax+'</td>';

 order_print_html += '</tr>';
/*
  printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:translated.vat_included, align:"LEFT", width:0.40, bold:true, cols:10  },
  { text:" ", align:"RIGHT", cols:10, width:0.20 },
  { text: current_order_data.total_tax, align:"RIGHT", cols:10, width:0.20},

 
]);*/

if(current_order_data.total_tax)
{
  
                printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:translated.vat_included, align:"LEFT", bold:true, width:4/10  },
  { text:" ", align:"RIGHT", width:2/10 },
  { text: current_order_data.total_tax, align:"RIGHT",  width:2/10},

 
]);
}



          }



           if(vat_options =="per_item_novat")
          {




             order_print_html += '<tr class="heading total ">';


 order_print_html += '<td></td><td>'+translated.vat+'</td>'+extra_td+'<td>'+current_order_data.total_tax+'</td>';

 order_print_html += '</tr>';
if(current_order_data.total_tax)
{
    /*printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:translated.vat, align:"LEFT", width:0.40, bold:true, cols:10  },
  { text:" ", align:"RIGHT", cols:10, width:0.20 },
  { text: current_order_data.total_tax, align:"RIGHT", cols:10, width:0.20},

 
]);*/




     printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:translated.vat, align:"LEFT", bold:true, width:4/10  },
  { text:" ", align:"RIGHT", width:2/10 },
  { text: current_order_data.total_tax, align:"RIGHT",  width:2/10},

 
]);


}



          }

 order_print_html += '<tr class="heading total ">';
//printer.setTextDoubleHeight();                              // Set text to double height
//printer.setTextDoubleWidth();     
/* printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:0.10,  cols:2  },
  { text:translated.total, align:"LEFT", width:0.40, bold:true, cols:10  },
  { text:" ", align:"RIGHT", cols:10, width:0.20 },
  { text: current_order_data.total, align:"RIGHT", cols:10, width:0.20},

 
]);*/


  printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
  { text:" ", align:"LEFT",width:1/10 },
  { text:translated.total, align:"LEFT", bold:true, width:4/10  },
  { text:" ", align:"RIGHT", width:2/10 },
  { text: current_order_data.total, align:"RIGHT",  width:2/10},

 
]);
 order_print_html += '<td></td><td>'+translated.total+'</td>'+extra_td+'<td>'+current_order_data.total+'</td>';

 order_print_html += '</tr>';


  


 // order_print_html +=translated.total+':'+current_order_data.total+'<br/>';
}
  order_print_html +='</tbody>';

  order_print_html +='</table>';


  if(typeof receipt_footer_text!== "undefined" && receipt_footer_text!=="" )
     {
         order_print_html += '<table">';
           order_print_html += '<tbody">';

     order_print_html += '<tr class="details  ">';
     order_print_html += '<td>';
 
  order_print_html +='<div style="text-align:center;">'+receipt_footer_text.replace(/\n/g, "<br />")+'</div>';
       order_print_html += '</td>';

   order_print_html += '</tr>';
  order_print_html += '</tbody">';

  order_print_html += '</table">';

   printer.alignCenter(); 
      printer.println(receipt_footer_text.replace(/\n/g, "<br />"));
  order_print_html +='<div style="text-align:center;">'+receipt_footer_text.replace(/\n/g, "<br />")+'</div>';
  printer.newLine();  
  printer.alignLeft(); 


}
 
    order_print_html +='</div>';

  order_print_html +='</body>';

  order_print_html +='</html>';

     var appName = remote.app.getName();


 var getAppPath = path.join(remote.app.getPath('appData'), appName);
printer.cut(); 
  //await printer.execute();

  var buffer_saved =  printer.getBuffer();    

  console.log(buffer_saved)  ;
  //console.log(printer.getText());
//await printer.execute();



  //printer.execute();
 //console.log(buffer_saved);     
 var total_output = null;
 //var newBuffer = new Buffer();
 var total_output_array = [];
  if(is_clicked)
  {
    printer.setBuffer(buffer_saved);
   
  }
  else
  {
 for (var i = 0; i < printer_copies; i++) {
  try {
  total_output = total_output+buffer_saved;
  total_output_array.push(buffer_saved);
// printer.raw(buffer_saved);
   console.log("Print done!");
} catch (error) {
  console.log("Print failed:", error);
}

}
var buf = Buffer.concat(total_output_array);

 printer.setBuffer(buf);


  }


  await printer.execute();





 order_mark_as_printed(current_order_data.id);
     // order_print_windows[current_order_data.id].close();
     // order_print_windows.splice(current_order_data.id, 1);

    /*fs.writeFile(getAppPath+'/'+current_order_data.id+'.html', order_print_html,function(err){

          if(!err)
          {

          

        order_print_windows[current_order_data.id] = new BrowserWindow({'auto-hide-menu-bar':true, 'show':false, webPreferences: {
            nodeIntegration: true,
            devTools:false
        }});
   
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: getAppPath+'/'+current_order_data.id+'.html'
})
    // order_print_window.webContents = order_print_html;
  order_print_windows[current_order_data.id].loadURL(url);
    console.log(url);


  order_print_windows[current_order_data.id].webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  }).catch(error => {
    console.log(error)


  })
     var printer_selected  = settings.get('printer_selected');



    order_print_windows[current_order_data.id].webContents.print({ silent: true, deviceName:printer_selected, copies:printer_copies, margins:{ marginType:"printableArea"}, printBackground:true}, (success, errorType) => {
  if (success) 
{
  order_mark_as_printed(current_order_data.id);
      order_print_windows[current_order_data.id].close();
      order_print_windows.splice(current_order_data.id, 1);

      fs.unlink(getAppPath+'/'+current_order_data.id+'.html', (err) => {
  if (err) {
    console.error("here is the error");
    console.error(err);
    return
  }

  //file removed
})

}

});

});

   order_print_windows[current_order_data.id].on('closed', () => {

});


}

});*/


 








}


}























var sound = null;
if(typeof vat_options == "undefined")
  {
    vat_options = "not_visible";
  }
if(typeof sound_selected == "undefined")
  {
    sound_selected = "beep-1";
  }
 var dns = require('dns');
console.log(all_products);
if(printer_copies)
{

}
else
{
  printer_copies = 1;
}

var hide_billing_address = settings.get('hide_billing_address');
var hide_billing_city = settings.get('hide_billing_city');
var hide_billing_postal = settings.get('hide_billing_postal');

var hide_shipping_address = settings.get('hide_shipping_address');
var hide_shipping_city = settings.get('hide_shipping_city');
var hide_shipping_postal = settings.get('hide_shipping_postal');
var hide_extra_category = settings.get('hide_extra_category');



var hide_total = settings.get('hide_total');
var hide_subtotal = settings.get('hide_subtotal');
var hide_discount = settings.get('hide_discount');

var shipping_details = settings.get('shipping_details');
const path = require('path');
const fixPath = require('fix-path');
const shellPath = require('shell-path');
var order_window_already_opened = false;
var current_order_id = null;
var software_image_base64 = settings.get("software_image_base64");





var order_print_windows = [];





//translated enabled
if(settings.get('translated_enabled')!="" && settings.get('translated_enabled') != undefined )
{
  translated.enabled = settings.get('translated_enabled');

}
else
{
    translated.enabled = "Enabled";


}
//translated enabled


//translated product name
if(settings.get('translated_product_name')!="" && settings.get('translated_product_name') != undefined )
{
  translated.product_name = settings.get('translated_product_name');

}
else
{
    translated.product_name = "Product Name";


}
//translated product name


//translated image
if(settings.get('translated_image')!="" && settings.get('translated_image') != undefined )
{
  translated.image = settings.get('translated_image');

}
else
{
    translated.image = "Image";


}
//translated image


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


if(settings.get('translated_order_id')!="" && settings.get('translated_order_id') != undefined )
{
  translated.order_id = settings.get('translated_order_id');

}
else
{
    translated.order_id = "Order ID";


}

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



if(settings.get('translated_date_to_deliver')!="" && settings.get('translated_date_to_deliver') != undefined )
{
  translated.date_to_deliver = settings.get('translated_date_to_deliver');

}
else
{
    translated.date_to_deliver = "Date to Deliver";


}


if(settings.get('translated_date_to_pickup')!="" && settings.get('translated_date_to_pickup') != undefined )
{
  translated.date_to_pickup = settings.get('translated_date_to_pickup');

}
else
{
    translated.date_to_pickup = "Date to Pickup";


}


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


//translated.order_date

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

if(settings.get('translated_complete_order')!="" && settings.get('translated_complete_order') != undefined )
{
  translated.complete_order = settings.get('translated_complete_order');

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


if(settings.get('translated_vat')!="" && settings.get('translated_vat') != undefined )
{
  translated.vat = settings.get('translated_vat');

}
else
{
    translated.vat = "VAT";


}

if(settings.get('translated_vat_included')!="" && settings.get('translated_vat_included') != undefined )
{
  translated.vat_included = settings.get('translated_vat_included');

}
else
{
    translated.vat_included = "VAT Included";


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

if(settings.get('translated_time_to_delivery')!="" && settings.get('translated_time_to_delivery') != undefined )
{
   translated.time_to_delivery  = settings.get('translated_time_to_delivery');

}
else
{
    translated.time_to_delivery = "Time To Deliver";


}


if(settings.get('translated_time_to_pickup')!="" && settings.get('translated_time_to_pickup') != undefined )
{
   translated.time_to_pickup  = settings.get('translated_time_to_pickup');

}
else
{
    translated.time_to_pickup = "Time To Pickup";


}



if(settings.get('translated_billing')!="" && settings.get('translated_billing') != undefined )
{
   translated.billing  = settings.get('translated_billing');

}
else
{
    translated.billing = "Billing";


}

if(settings.get('translated_shipping')!="" && settings.get('translated_shipping') != undefined )
{
   translated.shipping  = settings.get('translated_shipping');

}
else
{
    translated.shipping = "Shipping";


}

if(settings.get('translated_additional_information')!="" && settings.get('translated_additional_information') != undefined )
{
   translated.additional_information  = settings.get('translated_additional_information');

}
else
{
    translated.additional_information = "Additional Information";


}


if(settings.get('translated_minutes_to_arrive')!="" && settings.get('translated_minutes_to_arrive') != undefined )
{
   translated.minutes_to_arrive  = settings.get('translated_minutes_to_arrive');

}
else
{
    translated.minutes_to_arrive = "Minutes";


}


if(settings.get('translated_status')!="" && settings.get('translated_status') != undefined )
{
   translated.status  = settings.get('translated_status');

}
else
{
    translated.status = "Status";


}




if(custom_meta!=null)
{

 jQuery.each(custom_meta, function(key, value) {  
  custom_meta_keys.push(value.meta_key);

    }); 
}

let print_win;
let save_pdf_path;

let order_window;
let settings_window;
let current_order_window;
var check_every  = settings.get('check_every');
var receipt_font_size  = settings.get('receipt_font_size');

var receipt_image_base64 = settings.get("receipt_image_base64");
var receipt_footer_text = settings.get("receipt_footer_text");
var receipt_header_text = settings.get("receipt_header_text");

   if( (typeof check_every == "undefined") || ( check_every == "" ) )
   {
  check_every = 10;

   }

    if(typeof receipt_font_size === "undefined")
   {
  receipt_font_size = 18;

   }








 function license_check()
{
get_products();
 


  var license  = settings.get('license');
     var website  = settings.get('website');
     var url = "https://www.wpslash.com/licensing/envato-license-check.php?purchase_code="+license+"&domain="+urlencode(website);
  if (license!="")
  {
    request(
    {
        url : url
    },
    function (error, response, body) {
      if(error)
      {
                           alert("Check Your Internet Connection");

      }

        // Do more stuff with 'body' here
        if(body!="")
        {
          if(body=="invalid")
          {
            alert('Invalid License. Correct it on Settings and restart the app');

            return_result = "invalid";
             license_check_return = return_result;

          }
          else if (body=="activated")
          {

              return_result = "activated";


   get_orders();
 
setInterval(function() {
  get_orders();
}, parseInt(check_every*1000));
          

          }
          else if(body=="already-active")
          {
              return_result =  "already-active";

       let choice_selected =   dialog.showMessageBox(null, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'License is already Active on Other Website. Do you want to transfer the licese to this website ?'
      });
                  
       console.log(choice_selected);



choice_selected.then(function(data){
  console.log(data);


if(data.response == 0)
  {
    request(
    {
        url : "https://www.wpslash.com/licensing/de-authorize-license.php?purchase_code="+license
    },
    function (error, response, body) {

        // Do more stuff with 'body' here
        if(body!="")
        {
          if(body=="deleted")
          {

           license_check();

          }
         
          else
          {
             alert('Unknown reponse');


          }


        }
        

        else
        
        {

         

        }
        
      



    }

);

  }
});
















          }
          else
          {
              return_result =  "unknown";


          }


        }
        

        else
        
        {

         

        }
        
        

/*order_window = new BrowserWindow({'auto-hide-menu-bar':true});
   order_window.webContents ="<html><body>dddddd</body></html>";

  order_window.show();*/




    }

);





  }
  //end if license is not empty//

  else
  {


  }


}
//end license_check function

var settings_window_opened =false;
function get_orders(search = null, page = null) {
   if(sound!=null)
  {
    sound.stop();
    sound = null;
  }
  all_new_orders_array = [];
  var search_term = "";
  if (search == null)
  {
      get_force_disabled_status();

  }
  else
  {
    search_term = search;
  }
   var email  = settings.get('email');
   var password  = settings.get('password');
   var license  = settings.get('license');
   var website  = settings.get('website');

  if((email!="") && (password!=""))
  {
    if(search_term)
    {
        jQuery('.woofood-loading').addClass("show");

          url = website+"/wp-json/woofood/v1/orders?s="+urlencode(search_term);

          if(page>0)
          {
                      url = url+"&page="+page;

          }
          else
          {
            page = 1;
          }

    }
    else
    {
                url = website+"/wp-json/woofood/v1/orders";

    }
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
        followAllRedirects: true,

        headers : {
            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        }
    },
    function (error, response, body) {
      console.log(error);
        // Do more stuff with 'body' here
        if(response!=null)
        {
            jQuery('.woofood-loading').removeClass("show");

          console.log(error);
          console.log(body);

          var all_orders = JSON.parse(response.body.trim());
          console.log(all_orders);
          if(search == null)
          {
            //jQuery('#orders tbody').html("");

          }
          else
          {
                                                            jQuery('.pagination-search').html("");


for (i = 1; i <= all_orders.max_num_pages; i++) {
  var extra_class  = "";
  if(i == page)
  {
    extra_class  = "current_page";
  }
                                                jQuery('.pagination-search').append("<x-button class='"+extra_class +"''><x-label>"+i+"</x-label></x-button>");

}
if(page>0)
{
  jQuery( this ).addClass("current_page");

}



                                                

            all_orders = all_orders.posts;

                        jQuery('#search-orders tbody').html("");

          }
          if(all_orders.length < 1 )
          {                 if(!search)
            {
               jQuery('#orders tbody').html("");
            }
                                   

          }
        if(body!=null && Array.isArray(all_orders))
        {

        all_orders.forEach(function(element) {
          console.log(element);
    

 ////check if order is printed////
 var order_printed = false;
  var deliveryboy = 0;
  var deliveryboy_name = "";
  var order_type = "";

 element.meta_data.forEach(function(current_meta) {

if(current_meta.key=="printed" || printed_orders.includes(element.id))
{
  order_printed = true;

}

if(current_meta.key=="wf_deliveryboy")
{
  deliveryboy = current_meta.value;

     jQuery.each(deliveryboys, function(key, value) {  

      if(value.data.ID == deliveryboy )
      {
        deliveryboy_name = value.data.display_name;
      }
    }); 

}


if(current_meta.key=="woofood_order_type")
{
  order_type = current_meta.value;
 

}

 
});


//if is not search
 if(search == null)
 {


 if(order_printed==false && element.status=="processing")
 {
 

  
 var sound_processing = new Howl({
  src: [__dirname+'/'+sound_selected+'.mp3']
});
 sound_processing.play();


  if(esc_mode)
  {

      print_order_esc(element);
    

  }
  else
  {
          print_order(element);

  }

   





 }


  if(order_printed==false && element.status=="accepting")
 {
  if(sound==null)
  {
      sound = new Howl({
  src: [__dirname+'/'+sound_selected+'.mp3'],
  autoplay: true,
  loop: true,
});

  }
 



var order_id = element.id;
  current_order_id = element.id;
console.log(order_id);
  open_order(element);
     




 }
 }//if is not search

 if(search == null)
 {

    all_new_orders_array[element.id] = element;

if(JSON.stringify(all_orders_array[element.id]) != JSON.stringify(element ))
{
  console.log(element);
    if(jQuery('#orders tbody tr[order_id="'+element.id+'"]').length)
    {
      jQuery('#orders tbody tr[order_id="'+element.id+'"]').remove();
    }
   jQuery('#orders tbody').append("<tr order_id='"+element.id+"'><td>"+element.number+"</td><td>"+order_type+"</td><td class='list-status "+element.status+"'>"+element.status_nice+"</td><td>"+element.billing.first_name+" "+element.billing.last_name +"</td><td>"+deliveryboy_name+"</td><td>"+element.total+"</td></tr>");
              
    all_orders_array[element.id] = element;


}
/* if(!all_orders.includes(all_orders_array[element.id]))
  {
              jQuery('#orders tbody tr[order_id="'+element.id+'"]').remove();


  }*/

/*jQuery( all_orders_array ).each(function() {
 //var order_id_each = parseInt(jQuery( this ).attr('order_id'));
  if(!all_orders.includes(jQuery(this)))
  {
              jQuery('#orders tbody tr[order_id="'+jQuery(this).id+'"]').remove();


  }



  });*/
 ////check if order is printed////



}
else
{
  jQuery('#search-orders tbody').append("<tr order_id='"+element.id+"'><td>"+element.number+"</td><td>"+order_type+"</td><td class='list-status "+element.status+"'>"+element.status_nice+"</td><td>"+element.billing.first_name+" "+element.billing.last_name +"</td><td>"+deliveryboy_name+"</td><td>"+element.total+"</td></tr>");

      search_orders_array[element.id] = element;

}



});




 if(search == null)
 {

        jQuery( "#orders tbody tr" ).each(function() {
 var order_id_each = parseInt(jQuery( this ).attr('order_id'));
  if(!all_new_orders_array[order_id_each])
  {
              jQuery('#orders tbody tr[order_id="'+order_id_each+'"]').remove();


  }



  });
      }





    }
    else
    {

      alert(body);

    }


        }
        

        else
        
        {
          if(settings_window_opened ==false)
          {
             open_settings();
          settings_window_opened =true;

          }
         

        }
        
        

/*order_window = new BrowserWindow({'auto-hide-menu-bar':true});
   order_window.webContents ="<html><body>dddddd</body></html>";

  order_window.show();*/


        
    }
);

  }
  else
  {
    alert('Complete all the details');
   

  }


}

jQuery(document).ready(function() 
  {
    jQuery(document).on("change", '#delivery_force_disabled', function() {

      console.log(jQuery(this).val())


    });


  });

function get_products() {

  var all_categories = null;

  storage.get('all_categories', function(error, data) {
    if (error) throw error;
    if(JSON.stringify(data) === '{}')
    {
      all_categories = settings.get('all_categories');

      storage.set('all_categories', all_categories, function(error) {
        if (error) throw error;

        populate_products(all_categories);



      });

    }
    else
    {
      all_categories = data;

      populate_products(all_categories);
    }


  });



}


function populate_products(all_categories)
{


   if(all_categories)
 {
      
var cat_tabs_output = "";
var cat_tabs_content_output = "";
 all_categories.data.forEach(function(current_category) {

  cat_tabs_output +=' <div class="tab-item" id="cat-'+current_category.cat_id+'"> <span class="icon"></span>'+current_category.name+'</div>';

  cat_tabs_content_output +='<div class="tab-content" id="cat-'+current_category.cat_id+'">';
 
     current_category.products.forEach(function(current_product) {
      var additional_classes = "";
      if(current_product.is_enabled)
      {
        additional_classes =" available";
      }
      else
      {
                additional_classes =" unavailable";

      }

      cat_tabs_content_output +='<div class="product-wrapper '+current_product.id+'  '+additional_classes+'" id="'+current_product.id+'">';
      if(current_product.image_url)
      {
             cat_tabs_content_output +='<div class="product-image"><img src="'+current_product.image_url+'"/></div>';

      }

      cat_tabs_content_output +='<div class="product-title">'+current_product.name+'</div>';

      cat_tabs_content_output +='</div>';


     });

     cat_tabs_content_output +='</div>';

  

  });
//end for each category//

 jQuery('#products-tab .tab-group').html(cat_tabs_output);
 jQuery('#products-tab .tabs-content').html(cat_tabs_content_output);


 }
}


function populate_live_categories()
{
	var all_categories_live = [];
	 var email  = settings.get('email');
   var password  = settings.get('password');
   var license  = settings.get('license');
   var website  = settings.get('website');

  if((email!="") && (password!=""))
  {

    url = website+"/wp-json/woofood/v1/products/categories",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
                followAllRedirects: true,

        headers : {
                "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        }
    },
    function (error, response, body) {
        // Do more stuff with 'body' here
        if(response!=null)
        {
          var all_categories = JSON.parse(response.body);

          var all_products = [];



all_categories_live = all_categories;

   if(all_categories_live)
 {
      
var cat_tabs_output = "";
var cat_tabs_content_output = "";
 all_categories_live.forEach(function(current_category) {

  cat_tabs_output +=' <div class="product-category-box" id="cat-'+current_category.term_id+'" cat-id="'+current_category.term_id+'">'+current_category.name+'</div>';

  cat_tabs_content_output +='<div class="tab-content" id="cat-'+current_category.term_id+'">';
 
   /*  current_category.products.forEach(function(current_product) {
      var additional_classes = "";
      if(current_product.is_enabled)
      {
        additional_classes =" available";
      }
      else
      {
                additional_classes =" unavailable";

      }

      cat_tabs_content_output +='<div class="product-wrapper '+current_product.id+'  '+additional_classes+'" id="'+current_product.id+'">';
      if(current_product.image_url)
      {
             cat_tabs_content_output +='<div class="product-image"><img src="'+current_product.image_url+'"/></div>';

      }

      cat_tabs_content_output +='<div class="product-title">'+current_product.name+'</div>';

      cat_tabs_content_output +='</div>';


     });*/

     cat_tabs_content_output +='</div>';

  

  });
//end for each category//

 //jQuery('#search-products-tab .tab-group').html(cat_tabs_output);
 jQuery('#search-products-tab .product-categories').html(cat_tabs_output);


 }



        

        }
        

        else
        
        {
        
         

        }
        



        
    }
);

  }









}


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function print_order(current_order_data, minutes = null) {



  console.log(current_order_data);
 if(current_order_data.type=="click" )
  {
current_order_data = all_orders_array[current_order_id];
if(!current_order_data)
{
  current_order_data = search_orders_array[current_order_id];

}
  }




  var order_print_html ="";

var order_type_html = "";
  var custom_meta_html = "";

  var time_to_deliver_html = "";
  var date_to_deliver_html = "";
var minutes_to_arrive_html = "";
   jQuery.each(current_order_data.meta_data, function(meta_key, meta_value) {  
      if(custom_meta_keys.includes(meta_value.key))
        {
          console.log("includessss");

          var current_meta_data = custom_meta.filter(meta_data => meta_data.meta_key == meta_value.key)[0];
          //custom_meta_html += current_meta_data.meta_name+":"+meta_value.value+"<br/>";


           custom_meta_html +='<tr class="details">';

             custom_meta_html +='<td><strong>'+current_meta_data.meta_name+':</strong>'+meta_value.value+'</td> ';
           custom_meta_html +='</tr>';


        }

        if(meta_value.key=="woofood_time_to_deliver" &&  meta_value.value!="")
        {
                    
              if(current_order_data.order_type_slug =="pickup")
              {

                  time_to_deliver_html += '<strong>'+translated.time_to_pickup+": </strong>"+meta_value.value+"<br/>";
              }
              else
              {
                                  time_to_deliver_html += '<strong>'+translated.time_to_delivery+": </strong>"+meta_value.value+"<br/>";

              }



        }
          if(meta_value.key=="woofood_date_to_deliver" &&  meta_value.value!="")
        {
        
         if(current_order_data.order_type_slug =="pickup")
              {

                  date_to_deliver_html += '<strong>'+translated.date_to_pickup+": </strong>"+meta_value.value+"<br/>";
                }
                else
                {
                                    date_to_deliver_html += '<strong>'+translated.date_to_deliver+": </strong>"+meta_value.value+"<br/>";


                }



        }

        if((meta_value.key=="minutes_to_arrive" &&  meta_value.value!=""))
        {
        
        if(print_minutes)
        {
                  minutes_to_arrive_html = '<strong>'+translated.minutes_to_arrive+": </strong>"+meta_value.value+"<br/>";

        }

                
              



        }






            if(settings.get('print_doorbell'))
            {

                if(meta_value.key=="doorbell")
        {
        



                   custom_meta_html +='<tr class="details">';

             custom_meta_html +='<td><strong>'+translated.doorbell+':</strong>'+meta_value.value+'</td> ';
           custom_meta_html +='</tr>';



        }

            }

                 if(meta_value.key=="woofood_order_type" &&  meta_value.value!="")
        {
        

                  order_type_html +=  '<strong>'+translated.order_type+":</strong>"+meta_value.value+"<br/>";



        }
        



}); 

if(minutes!=null)
{
                    minutes_to_arrive_html = '<strong>'+translated.minutes_to_arrive+": </strong>"+minutes+"<br/>";

}


  if (current_order_data!=null)
  {

  order_print_html +='<html>';
  order_print_html +='<head> <meta charset="utf-8"> <title>Receipt</title> <style> .invoice-box table{ font-size:'+receipt_font_size+'px;} .invoice-box table .price, .invoice-box table .qty{ width:15%;}   .invoice-box table .name{ width:70%;} .invoice-box table{width: 100%; line-height: inherit; text-align: left;}.invoice-box table td{padding: 5px; vertical-align: top;}.invoice-box table tr td:nth-child(2){text-align: left;}.invoice-box table tr.top table td{}.invoice-box table tr.top table td.title{font-size: 45px; line-height: 45px; color: #333;}.invoice-box table tr.information table td{padding-bottom: 40px;}.invoice-box table tr.heading td{background: white; color:black; border-bottom: 1px solid #ddd; font-weight: bold;}.invoice-box table tr.details td{}.invoice-box table tr.item td{border-bottom: 1px solid #eee;}.invoice-box table tr.item.last td{border-bottom: none;}.invoice-box table tr.total td:nth-child(2){border-top: 2px solid #eee; font-weight: bold;}@media only screen and (max-width: 600px){.invoice-box table tr.top table td{width: 100%; display: block; text-align: left;}.invoice-box table tr.information table td{width: 100%; display: block; text-align: center;}}/** RTL **/ .rtl{direction: rtl; font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;}.rtl table{text-align: right;}.rtl table tr td:nth-child(2){text-align: left;}</style></head>';
  order_print_html +='<body>';
  order_print_html +='<div class="invoice-box">';

  order_print_html +='<table>';
  order_print_html +='<tbody>';

 order_print_html +='<tr class="information">';
  order_print_html +='<td colspan="2">';

  order_print_html +='<table>';

  order_print_html +='<tbody>';
  order_print_html +='<tr>';
  order_print_html +='<td>';
   if(typeof receipt_image_base64!== "undefined" && receipt_image_base64!=="" )
     {
  order_print_html += '<img src="data:image/png;base64,' + receipt_image_base64 + '" style="max-height: 150px;width: auto;max-width: 100%;">';
    }
order_print_html +='<br/>';
  
  

if(typeof receipt_header_text!== "undefined" && receipt_header_text!=="" )
     {
  order_print_html +='<div style="text-align:center;">'+receipt_header_text.replace(/\n/g, "<br />")+'</div>';
}
  order_print_html +='</td>';
  order_print_html +='</tr>';

  order_print_html +='</tbody>';
  order_print_html +='</table>';
  order_print_html +='</td>';
  order_print_html +='</tr>';






  
  order_print_html +='<tr class="top">';
  order_print_html +='<td colspan="2">';

  order_print_html +='<table>';

  order_print_html +='<tbody>';

  order_print_html +='<tr>';
    order_print_html +='<td>';

  order_print_html +='<strong>'+translated.order_id+':</strong>'+current_order_data.number+'<br/>';
  order_print_html +='<strong>'+translated.order_date+':</strong>'+current_order_data.date_created.date+'<br/> ';


if(order_type_html!="")
  {
      order_print_html += order_type_html;

  }

  if(date_to_deliver_html!="")
  {
      order_print_html += date_to_deliver_html;

  }



  order_print_html += time_to_deliver_html;

  order_print_html += minutes_to_arrive_html;


  order_print_html +='<strong>'+translated.payment_method+':</strong>'+current_order_data.payment_method_title+'<br/>';
  order_print_html +='</td>';
  order_print_html +='</tr>';

  order_print_html +='</tbody>';
  order_print_html +='</table>';
  order_print_html +='</td>';
  order_print_html +='</tr>';


  if(billing_details)
  {
     order_print_html +='<tr class="heading">';
     order_print_html +='<td>'+translated.billing+'</td>';

     order_print_html +='</tr>';
     order_print_html +='<tr class="details">';

    order_print_html +='<td><strong>'+translated.name+":</strong> "+current_order_data.billing.first_name+' '+current_order_data.billing.last_name+'</td>';
     order_print_html +='</tr>';
          order_print_html +='<tr class="details">';

       order_print_html +='<td><strong>'+translated.phone+'</strong>: '+current_order_data.billing.phone+'</td>';
     order_print_html +='</tr>';



    if(hide_billing_address)
{

}
else
{
       order_print_html +='<tr class="details">';

    order_print_html +='<td><strong>'+translated.address+':</strong>'+current_order_data.billing.address_1+' '+current_order_data.billing.address_2+'</td>';
     order_print_html +='</tr>';

}
  if(hide_billing_city)
{

}
else
{
         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.city+': </strong> '+current_order_data.billing.city+'</td> ';
       order_print_html +='</tr>';

}

  if(hide_billing_postal)
{

}
else
{
           order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.postcode+': </strong> '+current_order_data.billing.postcode+'</td>';
         order_print_html +='</tr>';

}
         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.notes+': </strong>'+current_order_data.customer_note+'</td>';
           order_print_html +='</tr>';




  }
  if(shipping_details)
  {
       order_print_html +='<tr class="heading">';
     order_print_html +='<td>'+translated.shipping+'</td>';

     order_print_html +='</tr>';
       order_print_html +='<tr class="details">';

    order_print_html +='<td><strong>'+translated.name+': </strong>'+current_order_data.shipping.first_name+' '+current_order_data.shipping.last_name+'</td>';
         order_print_html +='</tr>';

 if(hide_shipping_address)
{

}
else
{
         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.address+': </strong>'+current_order_data.shipping.address_1+' '+current_order_data.shipping.address_2+'</td> ';
           order_print_html +='</tr>';

}

 if(hide_shipping_city)
{

}
else
{
         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.city+': </strong>'+current_order_data.shipping.city+'</td> ';
           order_print_html +='</tr>';

}

 if(hide_shipping_postal)
{

}
else
{
         order_print_html +='<tr class="details">';

  order_print_html +='<td><strong>'+translated.postcode+': </strong>'+current_order_data.shipping.postcode+'</td> ';
           order_print_html +='</tr>';

}


   




  }

   order_print_html +='<tr class="heading additional">';

  order_print_html +='<td>'+translated.additional_information+'</td> ';
           order_print_html +='</tr>';


      order_print_html +=  custom_meta_html;
   order_print_html +='</table>';
         order_print_html +='</tbody>';
  
         order_print_html +='<table>';
         order_print_html +='<tbody>';


         order_print_html +='<tr class="heading">';
         order_print_html +='<td class="qty">'+translated.qty+'</td>';

         order_print_html +='<td class="name">'+translated.product+'</td>';

           if(vat_options =="per_item")
          {
          order_print_html +='<td class="price">'+translated.vat+'</td>';

          }
         order_print_html +='<td class="price">'+translated.price+'</td>';
          order_print_html +='</tr>';



  var html_to_insert ="";




   




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
     /* jQuery.each(extra_options.extra_options, function(key,meta_value) {  
        
          extra_options_html += ''+meta_value.name+':'+meta_value.price+'<br/>';




}); */



jQuery.each(extra_options.extra_options, function(current_extra_option_category_name,extra_options) { 

                if(Array.isArray(extra_options))
                {
                  if(!hide_extra_category)
                  {
                              extra_options_html += ''+current_extra_option_category_name+'<br/>';

                  }


                   jQuery.each(extra_options, function(key,meta_value) { 

                    if(meta_value.hide_prices)
                    {
                                                                          extra_options_html += ''+meta_value.name+'<br/>';


                    }
                    else
                    {
                                                    extra_options_html += ''+meta_value.name+':'+meta_value.price+'<br/>';


                    }

                   

                    
        
}); 

                }
                else
                {
            extra_options_html += ''+extra_options.name+':'+extra_options.price+'<br/>';

                }
              
     


}); 





       if(extra_options.additional_comments!=null)
      {
        var additional_comments = extra_options.additional_comments;
         extra_options_html += ''+translated.additional_comments+':'+additional_comments+'<br/>';

      }
 }
 //for each extra options //

 //for each tm extra options//
      if(tm_extra_options!=null)
      {
            jQuery.each(tm_extra_options, function(key,meta_value) {  
        
          extra_options_html += ''+meta_value.value+'<br/>';



}); 
    

      }
         //for each tm extra options//

 //order_print_html += 'x'+value.quantity+' '+value.name+'<br/>'+extra_options_html+'<hr>';

 var var_total_tax ="";
  var var_total_item_amounts =value.total;

          if(vat_options =="per_item")
          {
                      var_total_tax = '<td class="price">'+value.total_tax+'</td>'; 
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }

          if(vat_options =="per_item_novat")
          {
                      var_total_item_amounts = value.total_without_tax;
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }
 
 order_print_html += '<tr class="details items">';

 order_print_html += '<td class="qty">'+value.quantity+'</td><td class="name">'+value.name+'<br/>'+extra_options_html+'</td>'+var_total_tax+'<td class="price">'+var_total_item_amounts+'</td>';

 order_print_html += '</tr>';

  


  //order_print_html += "<br/>";

    }); 
         order_print_html +='</tbody>';

    order_print_html +='</table>';
    //order_print_html +='<hr>';
  order_print_html +='<table>';
         order_print_html +='<tbody>';






         if(hide_subtotal)
{

}
else
{
  //order_print_html += translated.subtotal+':'+value.total+"<br/><hr>";

  /* order_print_html += '<tr class="heading discount ">';

 order_print_html += '<td></td><td>'+translated.subtotal+'</td><td>'+'</td>';

 order_print_html += '</tr>';*/

}


  jQuery.each(current_order_data.fee_lines, function(key, value) {
  if(value!=undefined && value!=null )  
  {     
    if(value.total!=undefined && value.name!=undefined)
    {
         // order_print_html += value.name+':'+value.total+'<br/>';

order_print_html += '<tr class="heading total">';
var vat_total_tax="";

if(vat_options =="per_item")
          {
                      vat_total_tax = '<td class="price">'+value.tax+'</td>'; 
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }


 order_print_html += '<td class="qty"></td><td class="name">'+value.name+'</td>'+vat_total_tax+'<td class="price">'+value.total+'</td>';

 order_print_html += '</tr>';

    }


  }



  });




      

if(hide_discount)
{

}
else
{
  //order_print_html +=translated.discount+':'+current_order_data.discount_total+'<br/>';

  order_print_html += '<tr class="heading discount ">';

 order_print_html += '<td></td><td>'+translated.discount+'</td><td>'+current_order_data.discount_total+'</td>';

 order_print_html += '</tr>';

}

if(hide_total)
{

}
else
{
  var extra_td="";
  var total_vat ="";
if(vat_options =="per_item")
          {
                      extra_td = '<td></td>'; 
                      //  jQuery('.tax_label_header').css('display', 'table-cell');
          }
         

 if(vat_options =="as_total")
          {




             order_print_html += '<tr class="heading total ">';

             if(current_order_data.total_tax)
             {
               order_print_html += '<td></td><td>'+translated.vat_included+'</td>'+extra_td+'<td>'+current_order_data.total_tax+'</td>';

             }

 order_print_html += '</tr>';


          }

           if(vat_options =="per_item_novat")
          {




             order_print_html += '<tr class="heading total ">';


 order_print_html += '<td></td><td>'+translated.vat+'</td>'+extra_td+'<td>'+current_order_data.total_tax+'</td>';

 order_print_html += '</tr>';


          }

 order_print_html += '<tr class="heading total ">';


 order_print_html += '<td></td><td>'+translated.total+'</td>'+extra_td+'<td>'+current_order_data.total+'</td>';

 order_print_html += '</tr>';


  


 // order_print_html +=translated.total+':'+current_order_data.total+'<br/>';
}
  order_print_html +='</tbody>';

  order_print_html +='</table>';


  if(typeof receipt_footer_text!== "undefined" && receipt_footer_text!=="" )
     {
         order_print_html += '<table">';
           order_print_html += '<tbody">';

     order_print_html += '<tr class="details  ">';
     order_print_html += '<td>';
 
  order_print_html +='<div style="text-align:center;">'+receipt_footer_text.replace(/\n/g, "<br />")+'</div>';
       order_print_html += '</td>';

   order_print_html += '</tr>';
  order_print_html += '</tbody">';

  order_print_html += '</table">';


}

 
    order_print_html +='</div>';

  order_print_html +='</body>';

  order_print_html +='</html>';

     var appName = remote.app.getName();


 var getAppPath = path.join(remote.app.getPath('appData'), appName);


    fs.writeFile(getAppPath+'/'+current_order_data.id+'.html', order_print_html,function(err){

          if(!err)
          {

            jQuery.each(additional_printers, function(key, value) {


 order_print_windows[current_order_data.id+"_"+key] = new BrowserWindow({'auto-hide-menu-bar':true, 'show':false, webPreferences: {
            nodeIntegration: true,
            devTools:false
        }});
   
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: getAppPath+'/'+current_order_data.id+'.html'
})
    // order_print_window.webContents = order_print_html;
  order_print_windows[current_order_data.id+"_"+key].loadURL(url);



  order_print_windows[current_order_data.id+"_"+key].webContents.on('did-finish-load', () => {

        order_print_windows[current_order_data.id+"_"+key].webContents.print({ silent: true, deviceName:value.printer, copies:value.copies, margins:{ marginType:"none"}, printBackground:true}, (success, errorType) => {

        

 order_print_windows[current_order_data.id+"_"+key].close();
      order_print_windows.splice(current_order_data.id+"_"+key, 1);

});
      });






  });

          

        order_print_windows[current_order_data.id] = new BrowserWindow({'auto-hide-menu-bar':true, 'show':false, webPreferences: {
            nodeIntegration: true,
            devTools:false
        }});
   
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: getAppPath+'/'+current_order_data.id+'.html'
})
    // order_print_window.webContents = order_print_html;
  order_print_windows[current_order_data.id].loadURL(url);
    console.log(url);


  order_print_windows[current_order_data.id].webContents.on('did-finish-load', () => {
  // Use default printing options
 /* win.webContents.printToPDF({}).then(data => {
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  }).catch(error => {
    console.log(error)


  })*/
     var printer_selected  = settings.get('printer_selected');



 



    order_print_windows[current_order_data.id].webContents.print({ silent: true, deviceName:printer_selected, copies:printer_copies, margins:{ marginType:"printableArea"}, printBackground:true}, (success, errorType) => {
  if (success) 
{
  order_mark_as_printed(current_order_data.id);

   

  
      order_print_windows[current_order_data.id].close();
      order_print_windows.splice(current_order_data.id, 1);





      fs.unlink(getAppPath+'/'+current_order_data.id+'.html', (err) => {
  if (err) {
    console.error("here is the error");
    console.error(err);
    return
  }

  //file removed
});

}






});

});

   order_print_windows[current_order_data.id].on('closed', () => {

});


}

});


 









/* var order_print_text = order_print_html.replace(new RegExp("<html>", 'g'), "");
 // var order_print_text = order_print_html;
order_print_text = order_print_text.replace(new RegExp("</html>", 'g'), "");
  order_print_text = order_print_text.replace(new RegExp("<br/>", 'g'), "\n");
  order_print_text = order_print_text.replace(new RegExp("<hr>", 'g'), "---------------------------\n");*/



  //order_print_text = jQuery(order_print_text).text();





/*  var i_copy;
for (i_copy = 0; i_copy < printer_copies; i_copy++) { 
 

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
      



  }
  //enf else if is mac
 }//end for each copies*/








}

}


function sync_products() {
   var email  = settings.get('email');
   var password  = settings.get('password');
   var license  = settings.get('license');
   var website  = settings.get('website');

  if((email!="") && (password!=""))
  {

    url = website+"/wp-json/woofood/v1/products",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
                followAllRedirects: true,

        headers : {
                "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        }
    },
    function (error, response, body) {
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



         /* settings.set('all_products', all_products );

          settings.set('all_categories', all_categories );*/
        

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

function order_mark_as_printed(order_id) {
      console.log("function running");

  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');
  var auto_complete_order  = settings.get('auto_complete_order');

  if((email!="") && (password!=""))
  {
    

    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
if(auto_complete_order)
{
      url = website+"/wp-json/woofood/v1/orders/update",

  request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {

            'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      id:order_id,
      printed:'yes',
      status:'completed'
    }
  }, 
  function(err,httpResponse,body)
  { 
     if(body =="success")
    {
      printed_orders.push(order_id);
    }
    console.log(err);
    console.log(httpResponse);
    console.log(body);



  });

}
else
{
      url = website+"/wp-json/woofood/v1/orders/update",

  request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      id:order_id,
      printed:'yes'
    }
  }, 
  function(err,httpResponse,body)
  { 
    if(body =="success")
    {
      printed_orders.push(order_id);
    }

   console.log(err);
    console.log(httpResponse);
    console.log(body);

  });
}





}
}

function getPDFPrintSettings() {
  var option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4',
  };

  var layoutSetting = document.getElementById("layout-settings");
  option.landscape =
    layoutSetting.options[layoutSetting.selectedIndex].value == 'Landscape';
  var pageSizeSetting = document.getElementById("page-size-settings");
  option.pageSize =
    pageSizeSetting.options[pageSizeSetting.selectedIndex].text;
  var marginsSetting = document.getElementById("margin-settings");
  option.marginsType =
    parseInt(marginsSetting.options[marginsSetting.selectedIndex].value);

  option.printBackground = document.getElementById("print-background").checked;
  option.printSelectionOnly = document.getElementById(
    "print-selection").checked;
  return option;
}

function print() {
  //console.log("gebugger working");
  get_orders();
  //get_orders();
  if (print_win)
    //print_win.webContents.print();
  //directly print //
  print_win.webContents.print({silent:true, printBackground:true});

}

function open_settings() {
  settings_window = new BrowserWindow({'auto-hide-menu-bar':true ,webPreferences: {
            nodeIntegration: true,
           // devTools:true,
                  enableRemoteModule: true

        } });
   settings_window.loadURL('file://' + __dirname + '/settings.html');


  settings_window.show();


}




function savePDF() {
  if (!print_win) {
    dialog.showErrorBox('Error', "The printing window isn't created");
    return;
  }
  dialog.showSaveDialog(print_win, {}, function(file_path) {
    if (file_path) {
      print_win.webContents.printToPDF(getPDFPrintSettings(), function(err, data) {
        if (err) {
          dialog.showErrorBox('Error', err);
          return;
        }
        fs.writeFile(file_path, data, function(err) {
          if (err) {
            dialog.showErrorBox('Error', err);
            return;
          }
          save_pdf_path = file_path;
          document.getElementById('output-log').innerHTML =
            "<p> Write PDF file: " + save_pdf_path + " successfully!</p>";
        });
      });
    }
  });
}


function search_orders()
{
  var query = jQuery('.woofood-search').val();
  get_orders(query);

}


function key_down(e) {
  console.log(e);
   // e = e || window.event;
   if (e.key === 'Enter') {
      search_orders();
    }
  }

function viewPDF() {
  if (!save_pdf_path) {
    dialog.showErrorBox('Error', "You should save the pdf before viewing it");
    return;
  }
  shell.openItem(save_pdf_path);
}
jQuery(document).ready(function(){

  jQuery(document).on("click", ".tab-item", function() {

    var t = jQuery(this).attr('id');

  if(!jQuery(this).hasClass('active')){ 

  //this is the start of our condition 

  if(jQuery(this).parent().parent().hasClass('products')){ 

        jQuery('#products-tab .tab-item.active').removeClass('active');

         jQuery('#products-tab .tabs-content .tab-content').removeClass('show');
    jQuery(this).addClass('active');           

    jQuery('#products-tab  .tabs-content #'+t).addClass('show');



  }
  else
  {
        jQuery('.tab-item.active').removeClass('active');
         jQuery('.tabs-content .tab-content').removeClass('show');
    jQuery(this).addClass('active');           

    jQuery('.tabs-content #'+t).addClass('show');

  }

   

 }

  });











//new code//


  jQuery(document).on("click", ".product-category-box", function() {

woofood_product_search_input
jQuery('#woofood_product_search_input').val("");
    var t = jQuery(this).attr('cat-id');

    		jQuery('.product-category-box').removeClass('active');
        	jQuery(this).addClass("active");




var all_products_for_category = [];
	 var email  = settings.get('email');
   var password  = settings.get('password');
   var license  = settings.get('license');
   var website  = settings.get('website');

 /* if((email!="") && (password!=""))
  {

    url = website+"/wp-json/woofood/v1/products/categories/"+t,
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
                followAllRedirects: true,

        headers : {
                "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        }
    },
    function (error, response, body) {
        // Do more stuff with 'body' here
        if(response!=null)
        {
          var all_products_for_category = JSON.parse(response.body);

        



   if(all_products_for_category)
 {
      





var table = new Tabulator("#search-products", {
    data:all_products_for_category, //set initial table data
      pagination:"remote", //enable remote pagination
    ajaxURL:  website+"/wp-json/woofood/v1/products/categories/"+t, //set url for ajax request
    ajaxParams:{token:"ABC123"}, //set any standard parameters to pass with the request
    paginationSize:5, //optional parameter to request a certain number of rows per page
    paginationInitialPage:2, //optional parameter to set the initial page to load
    columns:[
            {title:"ID", field:"id"},

      {title:"Image", field:"image_url", formatter:"image", formatterParams:{
    height:"50px",
    width:"50px",
}},
        {title:"Name", field:"name"},
      
        {title:"Price", field:"price_html", formatter:"html"},
                {title:"Enabled", field:"is_enabled"}

       
    ],
});








 }



        

        }
        

        else
        
        {
        
         

        }
        



        
    }
);

  }


*/




var table = new Tabulator("#search-products", {
    data:all_products_for_category, //set initial table data
     pagination:"remote", //enable remote pagination
    ajaxURL:  website+"/wp-json/woofood/v1/products/categories/"+t, //set url for ajax request
    ajaxConfig:{
        method:"GET", //set request type to Position
        headers: {
            "Content-type": 'application/json; charset=utf-8', //set specific content type
             "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    },
layout:"fitColumns",
    columns:[
            {title:"ID", field:"id"},

      {title:translated.image, field:"image_url", formatter:"image", formatterParams:{
    height:"50px",
    width:"50px",
}},
        {title:translated.product_name, field:"name"},
      
        {title:translated.price,  field:"price_html", formatter:"html"},
        {title:translated.enabled, field:"is_enabled",  formatter : "tickCross", formatterParams: {
        allowTruthy: true,
        allowEmpty : true,
      }, editorParams:dateEditor,  editor:"tickCross", cellEdited: function( cell ) {
        var data =  cell.getData();
        var row = cell.getRow();
    console.log(data);

enable_disable_product_api(data.id, data.is_enabled);

 

    }

    }

       
    ],
});








  });




//new code//




//Create Date Editor
var dateEditor = function(cell){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = cell.getValue();

    var row = cell.getRow();
    console.log(row.getData());
   // console.log(cellValue);
    input = document.createElement("input");

    input.setAttribute("type", "checkbox");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

   

    function onChange(){
        if(input.value != cellValue){
            success(input.value);
            alert("changed");
        }else{
            //cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function(e){
        if(e.keyCode == 13){
            onChange();
        }

        if(e.keyCode == 27){
            cancel();
        }
    });

    return input;
};





 jQuery(document).on("click", "#search_orders_btn", function() {
    		jQuery('.product-category-box').removeClass('active');

    var search = jQuery('#woofood_product_search_input').val();

    		




var all_products_for_category = [];
	 var email  = settings.get('email');
   var password  = settings.get('password');
   var license  = settings.get('license');
   var website  = settings.get('website');

 /* if((email!="") && (password!=""))
  {

    url = website+"/wp-json/woofood/v1/products/categories/"+t,
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : url,
                followAllRedirects: true,

        headers : {
                "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        }
    },
    function (error, response, body) {
        // Do more stuff with 'body' here
        if(response!=null)
        {
          var all_products_for_category = JSON.parse(response.body);

        



   if(all_products_for_category)
 {
      





var table = new Tabulator("#search-products", {
    data:all_products_for_category, //set initial table data
      pagination:"remote", //enable remote pagination
    ajaxURL:  website+"/wp-json/woofood/v1/products/categories/"+t, //set url for ajax request
    ajaxParams:{token:"ABC123"}, //set any standard parameters to pass with the request
    paginationSize:5, //optional parameter to request a certain number of rows per page
    paginationInitialPage:2, //optional parameter to set the initial page to load
    columns:[
            {title:"ID", field:"id"},

      {title:"Image", field:"image_url", formatter:"image", formatterParams:{
    height:"50px",
    width:"50px",
}},
        {title:"Name", field:"name"},
      
        {title:"Price", field:"price_html", formatter:"html"},
                {title:"Enabled", field:"is_enabled"}

       
    ],
});








 }



        

        }
        

        else
        
        {
        
         

        }
        



        
    }
);

  }


*/




var table = new Tabulator("#search-products", {
    data:all_products_for_category, //set initial table data
      pagination:"remote", //enable remote pagination
    ajaxURL:  website+"/wp-json/woofood/v1/products/search/"+search, //set url for ajax request
     ajaxConfig:{
        method:"GET", //set request type to Position
        headers: {
            "Content-type": 'application/json; charset=utf-8', //set specific content type
             "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    },
layout:"fitColumns",
    columns:[
            {title:"ID", field:"id"},

      {title:translated.image, field:"image_url", formatter:"image", formatterParams:{
    height:"50px",
    width:"50px",
}},
        {title:translated.product_name, field:"name"},
      
        {title:translated.price, field:"price_html", formatter:"html"},
                {title:translated.enabled, field:"is_enabled",  formatter : "tickCross", formatterParams: {
        allowTruthy: true,
        allowEmpty : true,
      }, editorParams:dateEditor,  editor:"tickCross", cellEdited: function( cell ) {
        var data =  cell.getData();
        var row = cell.getRow();
    console.log(data);

enable_disable_product_api(data.id, data.is_enabled);

      /*  if( cell.getValue() ) {
          $.ajax({
            type        : 'POST',
            url         : '/api/checks',
            contentType : 'application/json',
            data        : JSON.stringify({
              doctype : 'OrderDetail',
              doc_id  : data.id,
            }),
            success     : function( res ) {
              data.checked     =  res.id;
              cell._cell.value =  res.id;
            },
          });
        }*/


    }

    }

       
    ],
});








  });

















  jQuery(document).on("click", ".product-wrapper", function() {

        var product_id = jQuery(this).attr('id');
        var product_data = all_products[product_id];


     //total_html +='<x-button id="open_reports" class="pull-left"><x-box><x-icon name="settings"></x-icon><x-label>'+value.data.display_name+'</x-label></x-box></x-button>';
    




          total_html = '<div style="text-align:center;">';
          if(product_data.is_enabled)
          {
                      total_html += '<x-button id="disable_product" pr-id="'+product_data.id+'" class="pull-left"><x-box><x-icon name="settings"></x-icon><x-label>Disable Product</x-label></x-box></x-button>';

          }
          else
          {
                      total_html += '<x-button id="enable_product" pr-id="'+product_data.id+'"  class="pull-left"><x-box><x-icon name="settings"></x-icon><x-label>Enable Product</x-label></x-box></x-button>';


          }
          total_html += '</div>';


        jQuery('#product_modal main').html(total_html);
if(product_data.is_enabled)
          {
                  document.getElementById('disable_product').addEventListener('click', disable_product);
                }
                else
                {

                  document.getElementById('enable_product').addEventListener('click', enable_product);
                }


        jQuery('#product_modal .modal__title').html(product_data.name);


          MicroModal.show('product_modal');
          


      });

jQuery(document).on("click", ".search-orders .pagination-search x-button", function() {

jQuery( this ).addClass("current_page");
     var page_number = parseInt(jQuery( this ).text());
  var search_term = jQuery(".woofood-search").val();



  get_orders(search_term,page_number);



 



   });

jQuery("#orders").on("click", "tr", function() {

   
       /*var order_id = jQuery( this ).attr("order_id");
    current_order_window = new BrowserWindow({'auto-hide-menu-bar':true, show: false, x:100, y:100, width: 1024, height: 768});
   current_order_window.loadURL('file://' + __dirname + '/order.html');

current_order_window.once('show',function(){
                   current_order_window.webContents.send('order-data', all_orders_array[order_id]);

});
current_order_window.on('close', function() {
  order_window_already_opened = false;*/

/////////////////////////////////////////
     //new code start//


  var order_id = jQuery( this ).attr("order_id");
  var current_order_data = all_orders_array[order_id];
  open_order(current_order_data);

    //new code end//
//////////////////////////////////////
 //});


           //current_order_window.show();

           /*current_order_window.once("ready-to-show", () => {

  current_order_window.show();
    order_window_already_opened = true;

});*/



 



   });





jQuery("#search-orders").on("click", "tr", function() {


   
       /*var order_id = jQuery( this ).attr("order_id");
    current_order_window = new BrowserWindow({'auto-hide-menu-bar':true, show: false, x:100, y:100, width: 1024, height: 768});
   current_order_window.loadURL('file://' + __dirname + '/order.html');

current_order_window.once('show',function(){
                   current_order_window.webContents.send('order-data', all_orders_array[order_id]);

});
current_order_window.on('close', function() {
  order_window_already_opened = false;*/

/////////////////////////////////////////
     //new code start//


  var order_id = jQuery( this ).attr("order_id");
  var current_order_data = search_orders_array[order_id];
  open_order(current_order_data);

    //new code end//
//////////////////////////////////////
 //});


           //current_order_window.show();

           /*current_order_window.once("ready-to-show", () => {

  current_order_window.show();
    order_window_already_opened = true;

});*/



 



   });



});
document.addEventListener('DOMContentLoaded', function() {
 // get_order_statuses();
  license_check();
 // print_win = new BrowserWindow({'auto-hide-menu-bar':true});
 // print_win.loadURL('file://' + __dirname + '/print.html');
 // print_win.show();
 if(esc_mode) {
    document.getElementById('print_order').addEventListener('click', print_order_esc);


 }
else
{
      document.getElementById('print_order').addEventListener('click', print_order);

}


        document.getElementById('cancel_order').addEventListener('click', cancel_order);
        document.getElementById('delete_order').addEventListener('click', delete_order);
        document.getElementById('complete_order').addEventListener('click', complete_order);
        document.getElementById('accept_order').addEventListener('click', accept_order);
        document.getElementById('assign_delivery').addEventListener('click', assign_delivery);
        document.getElementById('open_reports').addEventListener('click', open_reports);
        document.getElementById('search_orders_btn').addEventListener('click', search_orders);

        document.getElementById('woofood_search_input').addEventListener('keypress', key_down);
        document.getElementById('search-products-tab').addEventListener('click', populate_live_categories);


       // document.getElementById('delivery_force_disabled').addEventListener('click', delivery_force_disabled, false);

var checkbox = document.querySelector("#delivery_force_disabled");

checkbox.addEventListener( 'click', function() {
    if(this.toggled) {
      console.log("checked");
      delivery_force_disabled("enable");
        // Checkbox is checked..
    } else {
      console.log("uncheked");
            delivery_force_disabled("disable");

        // Checkbox is not checked..
    }
});

if(software_image_base64 !="undefined" && software_image_base64 !="" )
{
  jQuery('.logo-link img').attr('src', 'data:image/png;base64,' + software_image_base64 );
}


var checkbox_2 = document.querySelector("#pickup_force_disabled");

checkbox_2.addEventListener( 'click', function() {
    if(this.toggled) {
      console.log("checked");
      pickup_force_disabled("enable");
        // Checkbox is checked..
    } else {
      console.log("uncheked");
            pickup_force_disabled("disable");

        // Checkbox is not checked..
    }
});

  //print_win.webContents.on('did-finish-load', function() {
   // document.getElementById('print_button').addEventListener('click', print);

        document.getElementById('settings_button').addEventListener('click', open_settings);



jQuery(".order_id_label").text(translated.order_id);
jQuery(".order_type_label").text(translated.order_type);
jQuery(".customer_name_label").text(translated.customer_details);
jQuery(".order_total_label").text(translated.total);
jQuery(".order_status_label").text(translated.status);


    
 // });
  /*print_win.on('closed', function() {
    print_win = null;
  });*/
});






/*
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
}*/

function fetch_reports(){

var selected_date_from = jQuery('#date_from').val();
var selected_date_to = jQuery('#date_to').val();
var deliveryboy = jQuery('#delivery_boy_selected').val();




  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/reports",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      date_from:selected_date_from,
      date_to:selected_date_to,
      deliveryboy:deliveryboy
    }
  }, 
  function(err,httpResponse,body)
  { 
    console.log(httpResponse.body);
    var response =  JSON.parse(httpResponse.body);

var html_to_insert ='<tr> <td>'+response.delivery_name+'</td> <td>'+response.date_from+'</td><td> '+response.date_to+' </td> <td>'+response.total+'</td></tr>'; 
jQuery('#deliveryboy-items').html(html_to_insert);
    //console.log(httpResponse.body);
    
     

    


  });



}


}



function disable_product(){


var product_id = jQuery( this ).attr("pr-id");
console.log(product_id);



  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/products/edit",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      product_id:product_id,
      is_enabled:false,
    }
  }, 
  function(err,httpResponse,body)
  { 
    
    console.log(httpResponse.body);
    var response =  JSON.parse(httpResponse.body);
if(response.status == false)
{
  jQuery('.product-wrapper.'+product_id).removeClass("available");
jQuery('.product-wrapper.'+product_id).addClass("unavailable");
all_products[product_id].is_enabled = false;
MicroModal.close();
}


    //console.log(httpResponse.body);
    
     
//sync_products();
    


  });



}



}

function enable_product(){


var product_id = jQuery( this ).attr("pr-id");
console.log(product_id);



  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/products/edit",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      product_id:product_id,
      is_enabled:true,
    }
  }, 
  function(err,httpResponse,body)
  { 
    console.log(httpResponse.body);
    var response =  JSON.parse(httpResponse.body);
if(response.status == true)
{
  jQuery('.product-wrapper.'+product_id).removeClass("unavailable");
jQuery('.product-wrapper.'+product_id).addClass("available");
all_products[product_id].is_enabled = true;
MicroModal.close();

}


    //console.log(httpResponse.body);
    
     

    
   // sync_products();


  });



}



}


function enable_disable_product_api(product_id, bool){



console.log(product_id);



  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/products/edit",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      product_id:product_id,
      is_enabled:bool,
    }
  }, 
  function(err,httpResponse,body)
  { 
   
    var response =  JSON.parse(httpResponse.body);
if(response.status == true)
{
  

}



  });



}



}

function fetch_reports(){

var selected_date_from = jQuery('#date_from').val();
var selected_date_to = jQuery('#date_to').val();
var deliveryboy = jQuery('#delivery_boy_selected').val();




  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/reports",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      date_from:selected_date_from,
      date_to:selected_date_to,
      deliveryboy:deliveryboy
    }
  }, 
  function(err,httpResponse,body)
  { 
    console.log(httpResponse.body);
    var response =  JSON.parse(httpResponse.body);

var html_to_insert ='<tr> <td>'+response.delivery_name+'</td> <td>'+response.date_from+'</td><td> '+response.date_to+' </td> <td>'+response.total+'</td></tr>'; 
jQuery('#deliveryboy-items').html(html_to_insert);
    //console.log(httpResponse.body);
    
     

    


  });



}


}



function cancel_order(){


change_order_status("cancelled");


}

function complete_order(){


change_order_status("completed");


}


function custom_status_change(e){
 console.log(e.target);
    if(e.target.getAttribute('status')){

        change_order_status(e.target.getAttribute('status').toString().replace("wc-", ""));

    }

//change_order_status("completed");


}
function accept_order(){
  if(sound!=null)
  {
    sound.stop();
    sound = null;
  }
var minutes_to_arrive = jQuery("input[name=minutes_to_arrive]:checked").val();
accept_order_minutes(minutes_to_arrive, current_order_id);
//change_order_status("processing");
if(all_orders_array[current_order_id].payment_method =="cod")
{
  if(esc_mode)
  {
     print_order_esc(all_orders_array[current_order_id], minutes_to_arrive);

  }
  else
  {
     print_order(all_orders_array[current_order_id], minutes_to_arrive);

  }
  
}




}

function delivery_force_disabled(status)
{
  
force_disable_change("delivery", status);
 console.log()
/* if(checkbox.checked === true)
 {
  console.log("checked");
 }
 else
 {
    console.log("uncheked");

 }*/

 /* console.log(event);
  console.log("working");*/

}


function pickup_force_disabled(status)
{

force_disable_change("pickup", status);
 console.log()
/* if(checkbox.checked === true)
 {
  console.log("checked");
 }
 else
 {
    console.log("uncheked");

 }*/

 /* console.log(event);
  console.log("working");*/

}


function assign_delivery(){
var deliveryboy = jQuery("input[name=assign_delivery]:checked").val();
assign_delivery_boy(deliveryboy, current_order_id);
//change_order_status("processing");
 //print_order(all_orders_array[current_order_id]);




}

function change_order_status(status) {
  if(sound!=null)
  {
    sound.stop();
    sound = null;
  }
  
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
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      id:current_order_id,
      status:status
    }
  }, 
  function(err,httpResponse,body)
  { 

    /*if(status =="cancelled" && JSON.parse(body)=="success")
    {
                 MicroModal.close('order_modal');


    }

    if(status =="completed" && JSON.parse(body)=="success")
    {
                MicroModal.close('order_modal');

    }*/
         MicroModal.close('order_modal');

    
     

    


  });



}
}





function force_disable_change(order_type, status) {
  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/force_disable",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request.post(
  {
    url:url, 
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      order_type:order_type,
      status:status
    }
  }, 
  function(err,httpResponse,body)
  { 

  });



}
}



function get_order_statuses() {

  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/statuses",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request(
  {
    url:url, 
            followAllRedirects: true,

    headers : {

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        }
  }, 
  function(err,httpResponse,body)
  { 
    

    var response  = JSON.parse(body);
    order_statuses = response;
    


  });



}
}



function get_force_disabled_status() {
  var website  = settings.get('website');
  var email  = settings.get('email');
  var password  = settings.get('password');

  if((email!="") && (password!=""))
  {
    

    url = website+"/wp-json/woofood/v1/orders/force_disable_status",
    //auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


request(
  {
    url:url, 
            followAllRedirects: true,

    headers : {

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        }
  }, 
  function(err,httpResponse,body)
  { 
    

    var response  = JSON.parse(body);
    console.log(response);
    if(response.delivery == "1")
    {
      var checkbox = document.querySelector("#delivery_force_disabled");
checkbox.toggled = true;

    }
    if(response.pickup == "1")
    {
         var checkbox = document.querySelector("#pickup_force_disabled");
checkbox.toggled = true;
      
    }
    if(response.delivery == "0")
    {
         var checkbox = document.querySelector("#delivery_force_disabled");
checkbox.toggled = false;

    }
    if(response.pickup == "0")
    {
         var checkbox = document.querySelector("#pickup_force_disabled");
checkbox.toggled = false;
    }
    
     

    


  });



}
}


function accept_order_minutes(minutes, current_order_id) {
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
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      id:current_order_id,
      status:"processing",
      minutes:minutes
    }
  }, 
  function(err,httpResponse,body)
  { 
    console.log(body);

    if(JSON.parse(body)=="success")
    {
           MicroModal.close('order_modal');


    }

    if( JSON.parse(body)=="success")
    {
           MicroModal.close('order_modal');


    }

    if(JSON.parse(body)=="success")
    {
     // var window = remote.getCurrentWindow();
      //window.close();
      MicroModal.close('order_modal');

    }
    
     

    


  });



}
}



function assign_delivery_boy(deliveryboy, current_order_id) {
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
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

            "Cache-Control": "no-cache",
            "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      id:current_order_id,
      deliveryboy:deliveryboy
    }
  }, 
  function(err,httpResponse,body)
  { 
    console.log(body);

    if(JSON.parse(body)=="success")
    {
           MicroModal.close('order_modal');


    }

    if( JSON.parse(body)=="success")
    {
           MicroModal.close('order_modal');


    }

    if(JSON.parse(body)=="success")
    {
     // var window = remote.getCurrentWindow();
      //window.close();
      MicroModal.close('order_modal');

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
            followAllRedirects: true,

    headers : {
                   'Accept': '*/*',

      "Cache-Control": "no-cache",
                  "User-Agent": "AutoPrint-Software",

            "Username" : email,
            "Password" : password,
        },
    form: {
      id:current_order_id,
    }
  }, 
  function(err,httpResponse,body)
  { 

    if(JSON.parse(body)=="deleted")
    {
            MicroModal.close('order_modal');


    }
    
     

    


  });



}


}


function open_reports()
{ 
  var total_html = "";

       total_html += '<div class="deliveryboys-title" style="width:100%;float:ledft"><h4 id="pick_dates_title">Scegli le date</h4></div>';
             total_html += '<x-box>';

       total_html += '<x-dateselect id="date_from"><x-label>Da</x-label></x-dateselect>';
       total_html += ' <x-dateselect id="date_to"><x-label>A</x-label></x-dateselect>';

             total_html += '</x-box>';

       
       total_html += '</div>';

       total_html += '<div class="deliveryboys-title" style="width:100%;"><h4> </h4></div>';

     total_html += '<div class="deliveryboys-reports" style="width:100%;">';
     total_html += '<x-radios id="delivery_boy_selected">';







   jQuery.each(deliveryboys, function(key, value) {  

    total_html +='<x-box><x-radio id="first-radio" value="'+value.data.ID+'"></x-radio> <x-label for="first-radio" id="label-1">'+value.data.display_name+'</x-label></x-box>';


     //total_html +='<x-button id="open_reports" class="pull-left"><x-box><x-icon name="settings"></x-icon><x-label>'+value.data.display_name+'</x-label></x-box></x-button>';
    
    }); 
    total_html +='<x-box><x-radio id="first-radio" value="all"></x-radio> <x-label for="first-radio" id="label-1">Totale</x-label></x-box>';


        total_html += '</x-radios>';

        total_html += '</div>';
          total_html += '<div style="text-align:center;">';

              total_html += '<x-button id="fetch_reports" class="pull-left"><x-box><x-icon name="settings"></x-icon><x-label>Genera Report</x-label></x-box></x-button>';
          total_html += '</div>';


total_html += '<table class="table"> <thead> <tr> <th><abbr id="deliveryboy_label">Punto Vendita</abbr></th> <th><abbr id="date_from_label">Da</abbr></th> <th><abbr id="date_to_label">A</abbr></th> <th><abbr id="total_label">Total</abbr></th> </tr> </thead> <tbody id="deliveryboy-items"> </tbody> </table>';


  jQuery('#reports_modal main').html(total_html);
   MicroModal.show('reports_modal');
           document.getElementById('fetch_reports').addEventListener('click', fetch_reports);


}


function open_order(current_order_data)
{
  console.log(current_order_data);
current_order_id = current_order_data.id;
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
 jQuery('.modal__title').text(current_order_data.number);

 jQuery('#billing_customer_note').val(current_order_data.customer_note);
 jQuery('#total').html(current_order_data.total);
 jQuery('#order_date_text').html(current_order_data.date_created.date);

 jQuery('#payment_method_text').html(current_order_data.payment_method_title);
 jQuery('.status-buttons').html("");


if(current_order_data.status=="accepting")
{
   jQuery('#accept_order').css('display', 'block');

   var minutes_to_arrive_array = minutes_to_arrive_values.split(',');
    jQuery('.minutes-container').html("");

    jQuery.each(minutes_to_arrive_array, function(key, value) {  
  custom_meta_keys.push(value.meta_key);
  jQuery('.minutes-container').append(' <div class="woofood-minute"> <input type="radio" name="minutes_to_arrive" value="'+value+'" id="minutes_'+value+'"> <label for="minutes_'+value+'">'+value+'</label> </div>');
    }); 
   jQuery('.minutes-container').css('display', 'block');


}
else
{
     jQuery('#accept_order').css('display', 'none');

     jQuery('.minutes-container').css('display', 'none');

     if(order_statuses)
     {


     if(Object.keys(order_statuses).length != 0)
 {
  jQuery.each(order_statuses, function(key, value) {  
    if(key!="wc-pending" && key!="wc-completed" && key!="wc-accepting" && key!="wc-processing" && key!="wc-completed" && key!="wc-failed" && key!="wc-refunded" && key!="wc-on-hold" && key!="wc-cancelled" )
    {
       var button =  '<button class="custom_status_change button '+key+'"  status="'+key+'">'+value+'</button>';
      jQuery('.status-buttons').append(button);  
    }

      

    }); 
      jQuery('.status-buttons').addClass("show");  

      var elements = document.getElementsByClassName("custom_status_change");


      document.querySelectorAll('.custom_status_change').forEach(function(item) {
  item.addEventListener('click',custom_status_change);
   });
      
/*for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', custom_status_change);
}*/


     /* Array.from(elements).forEach(function(element) {
      element.addEventListener('click', custom_status_change);
    });*/

              //document.getElementById('custom_status_change').addEventListener('click', custom_status_change);


 }
 else
 {
        jQuery('.status-buttons').removeClass("show");  

 }
 }


}
var deliveryboy = 0;
var deliveryboy_name = "";

 current_order_data.meta_data.forEach(function(current_meta) {



if(current_meta.key=="wf_deliveryboy")
{
  deliveryboy = current_meta.value;

     jQuery.each(deliveryboys, function(key, value) {  

      if(value.data.ID == deliveryboy )
      {
        deliveryboy_name = value.data.display_name;
      }
    }); 

}

 
});


if(current_order_data.status=="processing" && deliveryboys )
{
   jQuery('#assign_delivery').css('display', 'block');

   var minutes_to_arrive_array = minutes_to_arrive_values.split(',');
    jQuery('.deliveryboys-container').html("");

    jQuery.each(deliveryboys, function(key, value) {  
      if(value.data.ID == deliveryboy)
      {
         jQuery('.deliveryboys-container').append(' <div class="woofood-minute"> <input type="radio" name="assign_delivery" value="'+value.data.ID+'" id="deliveryboy_'+value.data.ID+'" checked> <label for="deliveryboy_'+value.data.ID+'">'+value.data.display_name+'</label> </div>');

      }
      else
      {
         jQuery('.deliveryboys-container').append(' <div class="woofood-minute"> <input type="radio" name="assign_delivery" value="'+value.data.ID+'" id="deliveryboy_'+value.data.ID+'"> <label for="deliveryboy_'+value.data.ID+'">'+value.data.display_name+'</label> </div>');
 
      }
    }); 
   jQuery('.deliveryboys-container').css('display', 'block');


}



console.log(translated);
//Translation Here///
if(translated.name!="")
 {
 jQuery('#name_label').text(translated.name);
}
if(translated.phone!="")
 {
 jQuery('#phone_label').text(translated.phone);
}
if(translated.city!="")
 {
 jQuery('#city_label').text(translated.city);
}
if(translated.postcode!="")
 {
 jQuery('#postcode_label').text(translated.postcode);
}
if(translated.notes!="")
 {
 jQuery('#notes_label').text(translated.notes);
}
if(translated.address!="")
 {
 jQuery('#address_label').text(translated.address);
}
if(translated.customer_details!="")
 {
 jQuery('#customer_details_label').text(translated.customer_details);
}
if(translated.order_details!="")
 {
 jQuery('#order_details_label').text(translated.order_details);
}
if(translated.product!="")
 {
 jQuery('#product_label').text(translated.product);
}
if(translated.price!="")
 {
 jQuery('#price_label').text(translated.price);
}
if(translated.qty!="")
 {
 jQuery('#qty_label').text(translated.qty);
}
if(translated.order_type!="")
 {
 jQuery('#order_type_label').text(translated.order_type);

}

if(translated.time_to_delivery!="")
 {
  if(current_order_data.order_type_slug == "pickup")
  {
     jQuery('#time_to_delivery_label').text(translated.time_to_pickup);

  }
  else
  {
      jQuery('#time_to_delivery_label').text(translated.time_to_delivery);

  }

}

if(translated.date_to_deliver!="")
 {

  if(current_order_data.order_type_slug == "pickup")
  {
     jQuery('#date_to_deliver_label').text(translated.date_to_pickup);

  }
  else
  {
      jQuery('#date_to_deliver_label').text(translated.date_to_deliver);

  }
}
if(translated.total!="")
 {
 jQuery('#order_total_label').text(translated.total);
}
if(translated.payment_method!="")
 {

 jQuery('#payment_method_label').text(translated.payment_method);
}
if(translated.order_date!="")
 {
 jQuery('#order_date_label').text(translated.order_date);
}
 if(translated.print_order!="")
 {
   jQuery('#print_order').text(translated.print_order);

 }

  if(translated.cancel_order!="")
 {
   jQuery('#cancel_order').text(translated.cancel_order);

 }
 if(translated.delete_order!="")
 {
   jQuery('#delete_order').text(translated.delete_order);

 }
  if(translated.complete_order!="")
 {
   jQuery('#complete_order').text(translated.complete_order);
 }




//Translation Here///




  jQuery.each(current_order_data.meta_data, function(meta_key, meta_value) {  
        
        if(meta_value.key=="woofood_order_type")
        {
          order_type = meta_value.value;
      jQuery('#order_type_text').html(order_type);


        }
        if(meta_value.key=="woofood_time_to_deliver")
        {
          time_to_delivery = meta_value.value;
  jQuery('#time_to_delivery_text').text(time_to_delivery);


        }
         if(meta_value.key=="woofood_date_to_deliver")
        {
         var date_to_deliver = meta_value.value;
  jQuery('#date_to_deliver_text').text(date_to_deliver);


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
            jQuery.each(extra_options.extra_options, function(current_extra_option_category_name,extra_options) { 

                if(Array.isArray(extra_options))
                {
                  if(!hide_extra_category)
                  {
                              extra_options_html += '<li>'+current_extra_option_category_name+'</li>';

                  }


                   jQuery.each(extra_options, function(key,meta_value) { 
                    if(meta_value.hide_prices)
                    {
                                extra_options_html += '<li>'+meta_value.name+'</li>';

                    }
                    else
                    {
                                                      extra_options_html += '<li>'+meta_value.name+':'+meta_value.price+'</li>';

                    }
        
}); 

                }
                else
                {
            extra_options_html += '<li>'+extra_options.name+':'+extra_options.price+'</li>';

                }
              
     


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
          var var_total_tax ="";
          if(vat_options =="per_item")
          {
                      var_total_tax = '<td>'+value.total_tax+'</td>'; 
                        jQuery('.tax_label_header').css('display', 'table-cell');
          }

      //for each extra options//
html_to_insert +='<tr> <td>'+value.name+' <br/>'+extra_options_html+'<td> '+value.product_price_with_tax+' </td> <td>'+value.quantity+'</td>'+var_total_tax+'<td>'+value.total+'</td> </tr>'; 
//html_to_insert += ' <div class="col col-pro layout-inline"> <p>'+value.name+'</p>'+extra_options_html+' </div> <div class="col col-price col-numeric align-center "> <p>'+value.subtotal+'</p> </div> <div class="col col-qty layout-inline">  <p>'+value.quantity+'</p> </div> <div class="col col-total col-numeric">               <p>'+value.total+'</p> </div> </div>';
       
    }); 


  jQuery.each(current_order_data.fee_lines, function(key, value) {
  if(value!=undefined && value!=null )  
  {     
    if(value.total!=undefined && value.name!=undefined)
    {
       var var_total_tax ="";
          if(vat_options =="per_item")
          {
                      var_total_tax = '<td>'+value.tax+'</td>'; 
                        //jQuery('.tax_label_header').css('display', 'block');
          }
          
        //  order_print_html += value.name+':'+value.total+'<br/>';
html_to_insert +='<tr> <td>'+value.name+'<td> '+value.total+' </td> <td>1</td>'+var_total_tax+'<td>'+value.total+'</td> </tr>'; 


    }


  }



  });

jQuery('#order-line-items').html(html_to_insert);
 MicroModal.show('order_modal');

}
