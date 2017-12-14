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
	        echo $msg .= "Mailer Error: " . $mail->ErrorInfo;
		    } else {
		        echo $msg .= "Message sent!";
		    }

		}else {
		       echo $msg = 'Не выбраны файлы для отравки ';

		    }
	}
} 
 // else {
 //        $name = '';
 //    }
?>
