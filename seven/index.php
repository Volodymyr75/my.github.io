<?php
/**

 * This example shows how to handle a simple contact form.
 */
$msg = '';

if (array_key_exists('name', $_POST)) {
        //Limit length and strip HTML tags
        $name = substr(strip_tags($_POST['name']), 0, 255);
   

	if (array_key_exists('last-name', $_POST)) {
	        //Limit length and strip HTML tags
	        $last_name = substr(strip_tags($_POST['last-name']), 0, 255);
	    } else {
	        $last_name = '';
	    }

	if (array_key_exists('tel', $_POST)) {
	        //Limit length and strip HTML tags
	        $tel = substr(strip_tags($_POST['tel']), 0, 255);
	    } else {
	        $tel = '';
	    }




	if (array_key_exists('method', $_POST)) {
	        $method = $_POST['method'];
	        $to = '-';
	        
	        if ($_POST['method'] == 'new-post') {
	        	if (array_key_exists('to', $_POST)) {
			        $to = $_POST['to'];
			        
			    } else {
			        $to = '';
			    }
	        }  
	    } else {
	        $method = '';
	    }


	if (array_key_exists('insure', $_POST)) {
	        $insure = $_POST['insure'];
	       
	    } else {
	        $insure = '';
	    }


	if (array_key_exists('userfile', $_FILES) && array_key_exists('userfile1', $_FILES)) {
	    // Create a message
	    // This should be somewhere in your include_path
	    require 'PHPMailer/PHPMailerAutoload.php';

	    $mail = new PHPMailer;
	    $mail->setFrom('homer.strem@gmail.com', 'First Last');
	    $mail->addAddress('strembov@gmail.com','John Doe');
	    $mail->Subject = 'PHPMailer file sender';
	    $mail->setLanguage('ru', 'PHPMailer/language/');
	    $mail->Body = <<<EOT
					Имя: {$name}
					Фамилия: {$last_name}
					Телефон: {$tel}
					Страховка на: {$insure} дней
					Способ оплаты:{$method}
					Отделение: {$to}
EOT;
	    //Attach multiple files one by one
	    $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile']['name']));
	    $uploadfile1 = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile1']['name']));
	    if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile) && move_uploaded_file($_FILES['userfile1']['tmp_name'], $uploadfile1)) {
	    $mail->addAttachment($uploadfile, 'My uploaded file.jpg');
	     $mail->addAttachment($uploadfile1, 'My uploaded file1.jpg');

	    if (!$mail->send()) {
	        $msg .= "Mailer Error: " . $mail->ErrorInfo;
		    } else {
		        $msg .= "Message sent!";
		    }

		}else {
		        $msg = 'Не выбраны файлы для отравки ';
		    }
	}
} 
 // else {
 //        $name = '';
 //    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact form</title>
    <link rel="stylesheet" type="text/css" href="style.min.css">
    
</head>
<body>
<h1>Contact us</h1>
<?php if (!empty($msg)) {
    echo "<h2>$msg</h2>";
} ?>

     <main class="main">
            <form  class="form" action="" method="post" name="form" enctype="multipart/form-data">
               <fieldset>
                    <div class="form__block-first">
                       <input class="input" type="text" name="name" value="" id="name" required placeholder="Имя *">
                       <input class="input" type="text" name="last-name" value="" id="last-name" required placeholder="Фамилия *">
                       <input class="input" type="text" name="tel" value="" id="tel" required placeholder="Телефон *">
                   </div>
               </fieldset>
                    <fieldset><div class="form__block-second">
                            <label>Страховка</label>
                            <div class="form__radio-buttons">
                                <input id="insure-1" name="insure" type="radio" value="180" checked>
                                <label for="insure-1">180/365</label>
                                <input id="insure-2" name="insure" type="radio" value="90">
                                <label for="insure-2">90/365</label>
                                <input id="insure-3" name="insure" type="radio" value="60">
                                <label for="insure-3">60/365</label>
                            </div>
                        </div> </fieldset>
                    <fieldset>
                        <div class="form__block-third">   
                            <label for="passport">Паспорт</label>
                            <input type="hidden" name="MAX_FILE_SIZE" value="100000"><input name="userfile" type="file" id="passport"  accept="image/jpeg,image/png"><br>
                            <label for="regist">Прописка</label>
                            <input type="hidden" name="MAX_FILE_SIZE" value="100000"><input name="userfile1" type="file" id="regist" accept="image/jpeg,image/png">
                                                
                        </div>
                    </fieldset>
               
                	<fieldset>
                         <div class="form__block-fourth" >
                                                <input id="online" name="method" type="radio" value="online">
                                                <label for="online">Оплата онлайн</label><br>
                                               <input id="new-post" name="method" type="radio" value="new-post" checked>
                                                <label for="new-post">Новая Почта</label><br>
                                                <label for="to">Выберите отделение</label>
                                                    <select name="to" id="to">
                                                        <option value="1">Первое</option>
                                                        <option value="2" selected="selected">Второе</option>
                                                        <option value="3">Третье</option>
                                                    </select><br>
                                                <input type="submit" value="Отправить">
                                                
                                            </div>
                    </fieldset>
                    
              
            </form>
        </main>

</body>
</html>