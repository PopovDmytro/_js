var stock; //window.onload = function ()
//{
//gdStart();
//}

function gdStart() {
  //set up data
  try {
    $('.gdQtyRow').hide();
    stock = TAFFY(jsonData); //hide options that dont have any

    if (gdQueryD("Colour").length <= 1) {
      $('.gdVar1Row').hide();
    }

    if (gdQueryD("Size").length <= 1) {
      $('.gdVar2Row').hide();
    }

    if (gdQueryD("Style").length <= 1) {
      $('.gdVar3Row').hide();
    } //start the select process


    gdGetColours(); //Remove that loading div

    $('#AjaxLoading_List').fadeOut(500);

    try {
      gdGetColoursSwatch(sCol);
      SwapDetailImage(sCode, sCol);
    } catch (e) {}
  } catch (e) {
    var t = e; //something not good :(
  }
}

function gdGetColours() {
  try {
    ClearVar("gdVar1");
    ClearVar("gdVar2");
    ClearVar("gdVar3");
    $('#gdVar2').hide();
    $('#gdVar3').hide();
    $('.gdVar2Row').hide();
    $('.gdVar3Row').hide();
    var ret = gdQueryStock("Colour", "gdVar1");

    if (ret == 1) {
      gdGetSizes();
    } else if (gdColour != null && gdColour != '') {
      $('#gdVar1').val(gdColour);
      gdGetSizes();
    }
  } catch (e) {
    var t = e; //something not good :(
  }
}

function gdGetColoursSwatch(col) {
  try {
    var swatch = col.replace(/ /g, '');
    $('#gdNoStock').addClass("hidden");
    $('.DetailSwatchItem').removeClass('swatchSelected');
    $('.DetailSwatchItem[title="' + col + '"]').addClass('swatchSelected');
    $('#gdVar1').val(col);
    $('#ColourSelector').text(col.replace(/([A-Z])/g, ' $1').trim());
    ClearVar("gdVar2");
    ClearVar("gdVar3");
    $('#gdVar2').hide();
    $('#gdVar3').hide();
    $('.gdVar2Row').hide();
    $('.gdVar3Row').hide();
    var ret = gdQueryStock("Colour", "gdVar1");

    if (ret == 1) {
      gdGetSizes();
    } else if (gdColour != null && gdColour != '') {
      $('#gdVar1').val(gdColour);
      gdGetSizes();
    }
  } catch (e) {
    var t = e; //something not good :(
  }
}

function gdGetSizes() {
  try {
    ClearVar("gdVar2");
    ClearVar("gdVar3");
    $('#gdVar3').hide();
    var ret = gdQueryStock("Size", "gdVar2");

    if (ret == 1) {
      gdGetStyles();
    } else if (gdSize != null && gdSize != '') {
      $('#gdVar2').val(gdSize);
      gdGetStyles();
    }
  } catch (e) {
    var t = e; //something not good :(
  }
}

function gdGetStyles() {
  try {
    ClearVar("gdVar3");
    var ret = gdQueryStock("Style", "gdVar3");

    if (ret == 1) {
      return gdGetDetails();
    } else if (gdStyle != null && gdStyle != '') {
      $('#gdVar3').val(gdStyle);
      gdGetDetails();
    }
  } catch (e) {
    var t = e; //something not good :(
  }
}

function gdGetDetails() {
  try {
    var var1 = $('#gdVar1').val();
    var var2 = $('#gdVar2').val();
    var var3 = $('#gdVar3').val(); //db({column:"value",column2:"value"});

    if (var1 == "" || var2 == "") {
      return false;
    }

    var Results = stock({
      Colour: var1,
      Size: var2,
      Style: var3
    }).get();
    var Price = Results[0].Price;
    var SKU = Results[0].SKU;
    var oMsg = Results[0].OutStockMessage;
    var iMsg = Results[0].InStockMessage;
    var Level = Results[0].Level;
    var OnOrder = Results[0].OnOrder;
    $('#gdSKU').val(SKU);
    $('#gdPrice').html("Price &pound;" + Price.toFixed(2));

    if (Level > 0) {
      $('#gdAdd').removeClass("hidden");
      $('#emailWhenInStock').addClass("hidden");
      $('#gdNoStock').addClass("hidden");
      $('#gdStockMsg').html(iMsg);
      $('.gdQtyRow').show();
    } else if (OnOrder > 0) {
      $('#gdAdd').addClass("hidden");
      $('#emailWhenInStock').removeClass("hidden");
      $('#gdNoStock').addClass("hidden");
      $('#gdStockMsg').html(oMsg);
      $('.gdQtyRow').show();
    } else {
      $('#gdAdd').addClass("hidden");
      $('#gdNoStock').removeClass("hidden");
      $('#emailWhenInStock').addClass("hidden");
      $('#gdStockMsg').html(oMsg);
      $('.gdQtyRow').hide();
    }

    return true;
  } catch (e) {
    //something not good :(
    alert(e);
    return false;
  }
}

function gdQueryD(qField) {
  try {
    var objs = [];
    var object = {};
    var var1 = $('#gdVar1').val();
    var var2 = $('#gdVar2').val();
    var var3 = $('#gdVar3').val();

    if (var1 != "") {
      object = {};
      object["Colour"] = {};
      object["Colour"]["=="] = var1;
      objs.push(object);
    }

    if (var2 != "") {
      object = {};
      object["Size"] = {};
      object["Size"]["=="] = var2;
      objs.push(object);
    }

    if (var3 != "") {
      object = {};
      object["Style"] = {};
      object["Style"]["=="] = var3;
      objs.push(object);
    }

    switch (objs.length) {
      case 1:
        Results = stock(objs[0]).order("SizeOrder").distinct(qField);
        break;

      case 2:
        Results = stock(objs[0], objs[1]).order("StyleOrder").distinct(qField);
        break;

      case 3:
        Results = stock(objs[0], objs[1], objs[2]).order("StyleOrder").distinct(qField);
        break;

      default:
        Results = stock().order("SizeOrder").distinct(qField);
    }

    return Results;
  } catch (e) {
    //something wrong :(
    alert(e);
  }
}

function ClearVar(Options) {
  try {
    $('#gdStockMsg').html("");
    $('#gdPrice').html("");
    $('#gdSKU').val("");
    $('#' + Options).find('option').remove();

    try {
      $('#' + Options).append('<option value="">Please select</option>');
    } catch (e) {}
  } catch (e) {
    var t = e;
  }
}

function gdQueryStock(qField, Options) {
  try {
    var column = qField;
    var operator = "!=";
    var value = "";
    var object = {};
    object[column] = {};
    object[column][operator] = value;
    var Results = gdQueryD(qField);

    if (Results.length > 1) {
      $('.' + Options + 'Row').show();
      $('#' + Options).find('option').remove();

      try {
        $('#' + Options).append('<option value="">Please Select</option>');
      } catch (e) {} //add to dropdown


      $(Results).each(function (d) {
        try {
          var selectedColour = $('#gdVar1').val();
          var selectedSize = $('#gdVar2').val();

          if (selectedColour == "{empty}" || selectedColour == undefined) {
            selectedColour = "";
          }

          if (selectedSize == "{empty}" || selectedSize == undefined) {
            selectedSize = "";
          }

          var sResults;

          if (qField == "Colour") {
            sResults = stock({
              Colour: Results[d]
            }).get();
          }

          if (qField == "Size") {
            sResults = stock({
              Colour: selectedColour,
              Size: Results[d]
            }).get();
          }

          if (qField == "Style") {
            sResults = stock({
              Colour: selectedColour,
              Size: selectedSize,
              Style: Results[d]
            }).get();
          }

          var sLevel = getHighest(sResults);

          if (sLevel > 0) {
            $('#' + Options).append('<option>' + Results[d] + '</option>');
          } else {
            $('#' + Options).append('<option disabled="disabled">' + Results[d] + ' - Out of Stock</option>');
          }
        } catch (e) {}
      });
      $('#' + Options).removeAttr("disabled");
      $('#' + Options).show();
    } else {
      //hide dropdown and set value
      if (Results.length == 1) {
        var d = Results[0];
        $('#' + Options).find('option').remove();

        try {
          $('#' + Options).append('<option value="' + d + '">' + d + '</option>').val(d).hide();
        } catch (e) {}
      } else {//something wrong :(
      }
    }

    return Results.length;
  } catch (e) {
    //something wrong :(
    alert(e);
  }
}

function getHighest(array) {
  var max = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i].Level + array[i].OnOrder > max) max = array[i].Level + array[i].OnOrder;
  }

  return max;
}

function gdAddToBasket(upsell) {
  try {
    if ($('#gdSKU').val() != "") {
      var SKU = $('#gdSKU').val();
      var Qty = $('#gdQty').val();
      $.ajax({
        url: '/Page/StockUpdate/?SKU=' + SKU
      });
      $.ajax({
        url: '/Basket/AddStockAjax/?sku=' + SKU + '&Qty=' + Qty + '&GenieAdd=' + genieAdd,
        type: 'GET',
        cache: false,
        async: true,
        success: function (d) {
          try {
            $('#AddToBasketMessage').html($(d).find("Message").text());

            if ($(d).find('successfully added')) {
              $.ajax({
                url: "/Basket/MiniBasket/?ShowSub2=true&_d=" + new Date().getTime(),
                type: "GET",
                success: function (dhtml) {
                  $($('.MiniBasket_Container')[0]).html(dhtml);
                  dropMiniBasket();
                },
                cache: false
              });

              if (upsell == true) {
                $('#AddToBasketMessage').html($(d).find("Message").text() + ' <a title="basket" href="javascript:void(0)" onclick="closeBasketModal(true);">View basket</a>');
                location.href = location.href;
              } else {
                $('#AddToBasketMessage').html($(d).find("Message").text() + ' <a title="basket" href="javascript:void(0)" onclick="closeBasketModal(true);">View basket</a>');
              }

              $('#AddToBasketMessage').removeClass("alert-danger").removeClass("alert-info").addClass("alert-success alert").show().delay(10000).fadeOut(400);

              if ($(window).width() < 1000) {
                $('html, body').animate({
                  scrollTop: $("#AddToBasketMessage").offset().top
                }, 'slow');
              }
            } else {
              $('#AddToBasketMessage').removeClass("alert-danger").removeClass("alert-info").addClass("alert-success alert");
            }
          } catch (e) {
            alert(e);
          }

          try {
            $('#gdVar1').val("");
            $('#gdVar2').val("");
            $('#gdVar3').val(""); //$('#gdVar2').hide("");
            //$('#gdVar3').hide("");

            $('.DetailSwatchItem').removeClass('swatchSelected');
            $('#ColourSelector').text("");
            gdStart();
          } catch (e) {
            alert(e);
          }
        }
      });
    } else {
      ShowSelectOptionsMsg();
    }
  } catch (e) {
    //something wrong :(
    alert(e);
  }
}

function gdAddToBasket_BasketAjax() {
  try {
    if ($('#gdSKU').val() != "") {
      var SKU = $('#gdSKU').val();
      var Qty = gdQty;
      $.ajax({
        url: '/Basket/AddStockAjax/?sku=' + SKU + '&Qty=' + Qty + '&GenieAdd=' + genieAdd,
        type: 'GET',
        cache: false,
        async: true,
        success: function (d) {
          try {
            $('#AddToBasketMessage').html($(d).find("Message").text());

            if ($(d).find('successfully added')) {
              $('#AddToBasketMessage').html('This Item Has Been Successfully Added To Your Basket <a title="basket" href="/basket">View basket</a>');
              $('#AddToBasketMessage').removeClass("alert-danger").removeClass("alert-info").addClass("alert-success alert").show().delay(10000).fadeOut(400);
              $('#SpecialOffer_Container').hide();
              $('#AjaxLoading_List').fadeIn();
              location.href = "/Basket";
            } else {
              $('#AddToBasketMessage').removeClass("alert-danger").removeClass("alert-info").addClass("alert-success alert");
            }
          } catch (e) {
            alert(e);
          }
        }
      });
    } else {
      ShowSelectOptionsMsg();
    }
  } catch (e) {
    //something wrong :(
    alert(e);
  }
}

function ShowSelectOptionsMsg() {
  $('#AddToBasketMessage').html('Please ensure you have selected your product options');
  $('#AddToBasketMessage').addClass("alert-danger").addClass("alert-info").addClass("alert-success alert").show().delay(10000).fadeOut(400);
}

function gdReplaceItem(lineId) {
  refreshOnModalClose = true;
  $.ajax({
    url: '/basket/updatebasketline',
    data: {
      ItemID: lineId,
      Qty: 0
    },
    cache: false,
    type: 'GET',
    success: function (d) {
      if (d.toString().toLowerCase() == "true") {
        gdAddToBasketFromBasket();
      } else {
        alert("Oops, there's been an unexpected error, please try again!");
      }
    }
  });
}

function gdAddToBasketFromBasket() {
  try {
    if ($('#gdSKU').val() != "") {
      var SKU = $('#gdSKU').val();
      var Qty = $('#gdQty').val();
      var Price = $('#gdPrice').html();
      var Size = $('#gdVar2').val(); //Set message

      $('#basket-line-edit-modal-body').html('<div class="row"><div class="col-xs-12 text-center">Updating basket, please wait...</div></div>');
      $.ajax({
        url: '/basket/AddStockAjaxv2/?sku=' + SKU + '&Qty=' + Qty,
        type: 'GET',
        cache: false,
        async: true,
        success: function (d) {
          try {
            var outerTop = '<div class="row"><div class="col-xs-12 text-center">';
            var outerBottom = '</div></div>';
            $('#basket-line-edit-modal-body').html(outerTop + "Your basket has been updated" + '<br /><br /><button class="btn btn-default" type="button" onclick="location.reload()">OK</button>' + outerBottom);
          } catch (e) {}
        }
      });
    } else {
      alert("Please select options.");
    }
  } catch (e) {//something wrong :(
  }
}