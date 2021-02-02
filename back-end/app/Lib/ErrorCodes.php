<?php
namespace App\Lib;

abstract class ErrorCodes {
    const COD_SUBMITTED_SUCCESSFULLY = '2010'; # 2010 - was submitted successfully with return.
    const COD_PARAMETERS_NOT_EXPECTED = '3010'; # 3010 - paramenters not expected
    const COD_INFO_NOT_FOUND = '3031'; # 3031 - Info not found
    const COD_ERROR_NOT_IDENTIFIED = '4040'; # 4040 - Error not identified
    const COD_ERROR_IDENTIFIED = '4041'; # 4041 - Error identified
}