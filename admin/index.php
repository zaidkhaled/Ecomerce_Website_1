<?php 
 ob_start();
 session_start();

 $nonav = "";

 $pageTitle = "Admin Login";

 if(isset($_SESSION['username'])){//check if Admin alrady logined

    header("Location:dashboard.php");// redirect to dachbord.

 }
 
 include "init.php"; 

 if ($_SERVER['REQUEST_METHOD'] == 'POST'){ //check if user coming from Http Request.
     
     $userName = $_POST['user'];
     
     $hashedpass = sha1($_POST['pass']);

     $stmt=$con->prepare("SELECT
                             *
                          FROM 
                             users 
                          WHERE 
                             username = ? 
                          AND 
                             password = ? 
                          And 
                             GroupID != 0
                          LIMIT 1");

     $stmt->execute([$userName,$hashedpass]);
     
     $row = $stmt->fetch();
     
     $count= $stmt->rowCount();
     
      //check if user is alrady exist in Database.
     
     if($count > 0){      //check if the user is admin, if yes then 
         
         
         //fetch all user info, it should be helpful, in case that user want to edit his personal data "for edit form".
         
         $_SESSION['username'] = $userName; // Registering the sesstion name.
         
         $_SESSION['ID'] = $row['userID']; // Registering the sesstion ID.
         
         $_SESSION['pass'] = $row['password']; // Registering the sesstion ID pass.
         
         $_SESSION['Email'] = $row['Email']; // Registering the sesstion  Email.
         
         $_SESSION['fullname'] = $row['fullname']; // Registering the sesstion fullname.
        
         header("Location:dashboard.php");// redirect to dachbord.
         
         
         exit();

     }
 }


if(!isset($nonav)){ 
   include $tpl."nav.php";  
}
   include $tpl. "header.php"; 
?> 
     <h1 class="center-align">Admin login</h1>
     <form action="<?php $_SERVER['PHP_SELF']?>" method="post" class="col s12 login-form">
            
       <div class="row">
         <div class="input-field col s10 m4 push-s1  push-m4">
              <i class="material-icons prefix">account_circle</i>
              <input    id="icon_telephone"
                        type="text"
                        class="validate"
                        name="user" 
                        autocomplete="off"
                        value="<?php if (isset($userName)){echo $userName;}?>">
              <label for="first_name"><?php echo lang('FIRST_NAME')?></label>
          </div>
        </div>  

        <div class="row">
           <div class="input-field col s10 m4 push-s1  push-m4">    
               <i class="material-icons prefix">border_color</i>
               <input   id="icon_telephone"
                        type="password" 
                        class="validate"
                        name="pass"
                        limit='3'
                        autocomplete = "new-password" 
                        value="<?php if (isset($password)){echo $password;}?>">
                 <label for="icon_telephone"><?php echo lang('PASSWORD')?></label>
           </div>
       </div> 
         
        <div class="row">
            <button class="btn waves-effect waves-light col s4 m2 push-s4 push-m5  " type="submit" name="action"><?php echo lang('LOG_IN')?>
                <i class="material-icons right">send</i>
            </button> 
          </div>         
     </form>
    
    
<?php 

include $tpl."footer.php";
ob_end_flush();
?>