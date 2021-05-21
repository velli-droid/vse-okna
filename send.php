<?php
    // Файлы phpmailer
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host = ''; // SMTP сервера вашей почты
    $mail->Username = ''; // Логин на почте
    $mail->Password = ''; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom(''); // Адрес самой почты и имя отправителя

    // кому отправить
    $mail->addAddress('vel.boyar@gmail.com');
    
    
    $mail->isHTML(true);
    $mail->Subject = 'Заявка';

    $body = '<h1>Письмо с сайта Все окна!</h1>';


    if(trim(!empty($_POST['messenger']))){
        $body.='<p>Способ связи: '.$_POST['messenger'].'</p>';
    }
    if(trim(!empty($_POST['userName']))){
        $body.='<p>Имя: '.$_POST['userName'].'</p>';
    }
    if(trim(!empty($_POST['userEmail']))){
        $body.='<p>Телефон: '.$_POST['userPhone'].'</p>';
    }
    if(trim(!empty($_POST['userCity']))){
        $body.='<p>Город: '.$_POST['userCity'].'</p>';
    }

    $mail->Body = $body;

    // отправляем
    if(!$mail->send()) {
        $message = 'Oшибка';
    } else {
        $message = 'Данные отправлены';
    }

    $responce = ['message' => $message];
    

    header('Content-type: application/json');
    echo json_encode($responce);
?>