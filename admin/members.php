<?php 
/*
=========================
   Mange Members Page
   Add | Delete | Edit
=========================    
*/
ob_start();
session_start();
  
    
if(isset($_SESSION['username'])){
        
     //  start mange Page 
    
     include "init.php";
    
     $pageTitle = "Members";
    
     include $tpl. "header.php";
    
     include $tpl. "nav.php"; 
    
     include  "forms.php"; 
    
    //get "data_required" like (pending members or category > item) from URL if exist, then sent it by ajax to process data and return #required-info ///////////////////////////
    
    $data_required = isset($_GET['page'])? $_GET['page'] : " "; 
     ?>
      <!--start serch field-->
      <div class="nav-wrapper" >
        <div class="input-field">
          <input id="search-user-info" type="search" class= 'search-in' data-search = '#users-table-body .table-row' required >
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons close Large">close</i>
        </div>
      </div> <!--end serch field-->
      <h1 class="center-align">Manage members</h1>
      <div class="container">
        <div class="row">
         <a id="add-btn"
            title="Add new user"
            class="btn-floating btn-large waves-effect waves-light red right" onclick="$('#add-user').modal('open');" ><i class="material-icons">add</i></a>
       </div>
      <!--in this div "required-info" requests will be saved, to send as ajax request-->
      <div class="required-info" style="display:none">
         <span id ='data_required'><?php echo $data_required; ?></span>
      </div>
      <div class= "">
      <!-- Modal Structure -->
      <!--start table users-->

      <table  class="bordered responsive-table centered " >
       <!--start Table header-->
       <thead>
          <tr>
              <th>#ID</th>
              <th id="in"><?php echo lang("FIRST_NAME" )?></th>
              <th>foto</th>
              <th><?php echo lang("EMAIL")?></th>
              <th><?php echo lang("AMOUNT")?></th>
              <th><?php echo lang("FULLNAME")?></th>
              <th><?php echo lang("ITEMS_NUM")?></th>
              <th><?php echo lang("COMMENT_TIMES" )?></th>
              <th><?php echo lang("Online" )?></th>
              <th><?php echo lang("REGISTERED")?></th>
              <th><?php echo lang("CONTROL")?></th>
          </tr>
        </thead>

        <!--End Table header-->

       <tbody id="users-table-body">

       <!--start table body-->    

       <!--table content will be sended by ajax from dbfunctions -->

       </tbody><!-- End table Body-->
      </table>
    </div>
</div>  

     <!--End table users-->

           
      <!--         Members/End Add Form-->
      
      <?php 
                 
       include $tpl."footer.php"; 
        
        
   } else { //if sission doesn't started then

 	header("Location:index.php");

 	exit();

 }

ob_end_flush();
?>