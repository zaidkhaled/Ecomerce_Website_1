/*global $*/

$(function () {
    
    "use strict";
     
     $('#select-user').material_select(); //trigger  select field
    $(".button-collapse").sideNav(); //trigger sidenav for phones
    
    $('.modal').modal(); //trigger  msg or show form before some actions in website "confirm"
    
   
    
    /* <=============define impotant functions ====================> */

                
    
  // ajax function
    
    function post(value) {
        
//        var name         = "",
//            email        = "",
//            fname        = "",
//            pass1        = "",
//            pass2        = "",
//            Description  = "",
//            price        = "",
//            madeIn       = "",
//            $stus        = "",
//            cateId       = "",
//            tags         = "",
//            foto         = "",
//            comment      = "";
//        console.log('yse');
        var fData = new FormData(),
            
            $where = value.data("place"),
            
            $do = value.data("do"),
        
            $id = value.data("id");
        
        fData.append("ajxdo", $do);
        
        fData.append("ajxID", $id);

        
        if ($do === "update-user-info") {
            fData.append("ajxName", $("#update-name").val());
            fData.append("ajxEmail", $("#update-email").val());
            fData.append("ajxFname", $("#update-fName").val());
            
        } else if ($do === "change_pass") {
            
            fData.append("ajxPass1", $("#pass1").val());   
            fData.append("ajxPass2", $("#pass2").val());   
            $('.password-fields').slideUp();
            
        } else if ($do === "insert_item" || $do === "edit_item") {

//            $('.progress').show(300);
            
            // get new values from "item add form " and send them to 'functionsdb.php' and insert them into database
            fData.append("ajxName", $('#item-name').val());
            fData.append("ajxDescription", $('#item-descrp').val());
            fData.append("ajxPrice", $('#item-price').val());
            fData.append("ajxMadeIn", $("#made-in").val());
            fData.append("ajxTags", $("#tags").val());
            fData.append("ajxStatus", $('#select-status option:selected').val());
            fData.append("ajxCateId", $('#select-cate option:selected').val());
            
            // send fotos just with add item form 

            if ($do === "insert_item") {

                // len is number of imgs


                if ($("#item-main-img").attr("len") > 0) {

                    fData.append("main_foto", $("#item-main-img")[0].files[0]);

                }


                var i = 0, len = $("#items-fotos").attr('len');

                if (len > 7) {

                    alert("foto shuld not be more than 8 fotos");

                    fData.delete();

                } else {

                    var progressWidth = parseInt($(".progress").css('width')),

                        part = progressWidth / len;

                    for (i; i < len; i++) {


                        var nameOfFoto = $("#items-fotos")[0].files[i].name,

                            value = i + 1;

                        $(".progress .determinate").css("width", (value * part) + "px");

                        // sent just imgs, which user did not delete    

                        if (deletingImgs.indexOf(nameOfFoto) === -1) {

                            fData.append(nameOfFoto, $("#items-fotos")[0].files[i]);

                        } 

                    }
                }
            }
            

            
            
            //        empty inputs after ajax call
            
            $(".progress .determinate").css("width", "0px");
            
            $("#main-item-foto .user-foto").remove();
            
//            $("form .items-fotos-preview .delete-img").each(function () { $(this).remove(); });
            
//            $('.addItemForm .input, #item-descrp').each(function () { $(this).val(""); });

            // reset selectors inputs

//            $('select').prop('selectedIndex', -1);

//            $('select').material_select(); // materialze requirement
                     
               

          
        } else if ($do === "add_comment") {
            
            fData.append("ajxComment", $("#item-comment").val()); 
            
            fData.append("ajxID", $("#item-id").val()); 
            
            $("#item-comment").val("");
            
            $('.add-comment').slideUp();
            
        } else if ($do === "check_foto" || $do === "change_user_foto") {
    
            
            if ($("#user-img").attr("len") > 0) {
                   
                fData.append("foto", $("#user-img")[0].files[0]);
                
            } else {
                    
                fData.delete();
            }

            
        } 
       
        

        $.ajax({
            
            url : "dbfunctions.php",
//            url : "fm.php",
            
            type : "POST",
            
            data : fData,
            
            processData : false,
            
            contentType : false
//            {
//                
//                ajxdo          : $do,
//                ajxID          : $id,
//                ajxName        : name,
//                ajxEmail       : email,
//                ajxFname       : fname,
//                ajxPass1       : pass1,
//                ajxPass2       : pass2,
//                ajxDescription : Description,
//                ajxCateId      : cateId,
//                ajxTags        : tags,
//                ajxStatus      : $stus,
//                ajxMadeIn      : madeIn,
//                ajxPrice       : price,
//                ajxComment     : comment,
//                ajxFoto        : foto,
//                ajxdata        : $data
        
//            }
            
        }).done(function (e) {
           
            $($where).html(e);
//            $("#rst").html(e);
            
        }).fail(function () {
            
            alert("fail fail");
            
        });
    }
   
    // ajax call for user department
    
    $(document).on("click", ".ajax-click", function () {
    
        post($(this));
        
    });
    
    $(document).on("submit", ".ajax-form", function (e) {
        e.preventDefault();
        post($(this));
        
    });
    

    
 // if inputFile in add item form change do this 
    
    $('#items-fotos').on("change", function (e) {
        
        var  files = e.target.files;
        
        // set how many fotos are they, if more then 8 show rong
        
        if ($(this).attr('len') > 7) {
            
            $("#input-fotos-path").addClass("invalid");
            $("form .items-fotos-preview").addClass("preview-fotos");
            
            
        } else {
           
            $("input-fotos-path").removeClass("invalid");
            $("form .items-fotos-preview").removeClass("preview-fotos");
        }
        
        $("form .items-fotos-preview .delete-img").each(function () { $(this).remove(); });
        $("form .items-fotos-preview h5 ").remove();
        
        // show all uploaded fotos in item form
        
        $.each(files, function (i, file) {  
         
            var reader = new FileReader();
        
            reader.readAsDataURL(file);
              
            reader.onload = function (e) {
               
                var template = "<img class ='delete-img' title= 'delete' foto-name = '" + file.name + "' style='width:85px;height:95px;' src='" + e.target.result + "'>"; 
                 
                $("form .items-fotos-preview").append(template); // show foto
                  
            }; 
            
        });

    });
    
    $('.nav-click-show').on("click", function () {
        $($(this).data('hide')).hide(10);
        $($(this).data('show')).toggle(500);
        
    });
    
    $("#search-icon").on('click', function() {
         $('.search-nav').show().animate({
             display : "block",
             width : "60%"
         }, 500);
    });
    
    $("#search-icon-sm").on('click', function(){
         $('#search-nav-sm').slideToggle().focos();
    });
    
   $(".search-nav, #search-nav-sm ").on('keyup', function() {
       
        if($(this).val().length > 2){
            $($(this).data('show')).show();
        } else {
            $($(this).data('show')).hide();
        }

   });
    

    // prepare deleting item img array
    
    var deletingImgs = [];
    
    // add deleting fotos to deletingImgs array and and set imgs num in inputFile attr to now if num is acceptable
    
    $(document).on('click', "form .items-fotos-preview .delete-img", function () {
        
        // push name of deleting foto 
        
        deletingImgs.push($(this).attr('foto-name'));
        
        $(this).remove();
        
        
        if ($(".imgs-preview .delete-img").length <= 7) {
            
            $(".file-path").removeClass("invalid");
            
            $("#imgs").attr('len', $(".imgs-preview .delete-img").length);
            $("form .items-fotos-preview").removeClass("preview-fotos");
        } 
        
    });
    
    
    // show the user foto functions 
    
    function fotoReader(foto) {
        
        var previewPlace = foto.getAttribute("preview"),
            
            removeContent = foto.getAttribute("remove");
        
        
        if (foto.files && foto.files[0]) {
            
            var reader = new FileReader();
            
            reader.onloadend = function (e) {
                
                var template = "<img class ='user-foto responsive-img' style='width:120px;height:144px;'  foto-name = '' src='" + e.target.result + "'>";
                
                $(removeContent).remove();
                
                $(previewPlace).append(template); // show foto
                
            };
            
            reader.readAsDataURL(foto.files[0]);
           
        } 
        
    }

    // show foto in add new user form 
   

    $("form .user-img").on('change', function () {fotoReader(this); post($(this)); }); 
    $(" .item-main-img").on('change', function () {fotoReader(this); }); 
                    /* <============= start login page ====================> */
    

    // show login input if user click on login in logReg page and show register form when user ckick on 
    
    $('.form-title').each(function () {
        
        $(this).on("click", function () {
            
            $(this).addClass('title-selected').siblings().removeClass('title-selected');

            $($(this).data('title')).addClass("selected").siblings("form").removeClass('selected');
        });
        
    });

//    start navbar
    $(".cate-menu").on("mouseover", function () {
        $(this).dropdown({ hover: false });
    });
    
//    end navbar
    
/*    $('.formy').submit(function () {
        
        return false;
    });*/
    
             /* <============= end login Register page ====================> */
    
    
    
             
    
    // show  item comment when user click on item name 
    
    $(".item-name").on('click', function () {
       
        $(this).siblings(".items-comment").slideToggle();
    });
    
      

    
    
    // slideToggel the password fields when user click on password-change
    
    $(".password-change").on('click', function () {
        
        $('.password-fields').slideToggle();
    });
    
    
    
    // slideToggel for add new item form in profile page 
    $('#add-item-btn').on('click', function () {
       
        $('.addItemForm').slideToggle();
    });
    
    // do not refresh the page on submit
//    $('.foto-uplaod').on("submit", function () {
//        
//       if ($("#foto_file").val() !== ""){
//            
//            $('.foto-uplaod').modal('close');
//        }
//        
//        var form_data = new FormData(this);
//        
//        post("", "updata_foto", "99", form_data);
//        
//        return false;
//    });
//   
//    $(".foto-uplaod .modal-footer input").on("click", function() {
//        
//        if ($("#foto_file").val() !== ""){
//            
//            $('.foto-uplaod').modal('close');
//        }
//    });
    
//$('.foto-uplaod').submit( function( e ) {
//      return false();
//    $.ajax( {
//      url: 'dbfunctions.php',
//      type: 'GET',
//      data: { ajx : new FormData(this) },
//
//    }).done(function (e) {
//            
//            $("#foto").html(e);
//            
//        }).fail(function () {
//            
//            alert("fail fail");
//            
//        });
//  
//  });    
    
    
    /* <============= End profile page ====================> */
    
    
    /* <============= start item  page ====================> */
    
    
    // condition to make edit on item directly after page load
    
    if (location.href.indexOf("item") > -1 && location.href.indexOf("edit") > -1) {
        
        // check if update-btn already exist, which means this item belongs to this user 
        
        if ($(".details .update-btn").length > 0) {

            $(".details .update-btn").click();
        }
        
    }
    
    $('#plus-comment-btn').on("click", function () {
        
        $($(this).data("target")).slideToggle();
        
    });
    
    $('#item-comment').on('keyup', function () {
        
        if ($("#item-comment").val().length > 0) {
            
            $("#add-comment-btn").removeAttr("disabled");
            
        } else {
            
            $("#add-comment-btn").attr("disabled", "true");
        }
    });
                   /* <============= end item  page ====================> */
    
});  //ende

