<?php
namespace App\Lib;
/**
 * Class to return the API's default array.
 * 
 * The JSON return structure:
 * 
 * {
 * 
 *      success: [true/false],
 * 
 *      code: [error code of ErrorCodes]
 * 
 *      message: [string with a desired message],
 * 
 *      data: [array with GET data = return what was asked],
 * 
 *      ...
 * 
 *      [/$params]: [array with additional information]
 * 
 * }
 * 
 * How to use:
 * 
 * dataPrepare::errorMessage(
 * 
 *      "The following parameters were not expected",
 * 
 *      ErrorCodes::COD_PARAMETERS_NOT_EXPECTED,
 * 
 *      array(
 * 
 *          "parameters" => $callback
 * 
 *      ),
 * 
 *      $data
 * )
 * 
 * Return codes: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
 */
final class dataPrepare {
    private static $_forbidenNames = ['code', 'msg', 'data', 'success'];

    private static function getMessage($success, $message, $code, $params=[], $data=[]) {
        $retArr = array(
            "success" => $success,
            "code" => $code,
            "msg"  => $message,
        );

        if(is_array($data) && count($data) > 0){
            $retArr['data'] = $data;
        }

        if(is_array($params)){
            foreach($params as $name => $value){
                if(!in_array($name, dataPrepare::$_forbidenNames)){
                    $retArr[$name] = $value;
                }
            }
        }
        // ========================================

        return $retArr;
    }

    public static function successMessage($message, $code, $params=[], $data=[]) {
        return dataPrepare::getMessage(
            true,
            $message,
            $code,
            $params,
            $data
        );
    }

    public static function errorMessage($message, $code, $params=[], $data=[]) {
        return dataPrepare::getMessage(
            false,
            $message,
            $code,
            $params,
            $data
        );
    }
}