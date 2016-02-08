<?php
/**
 * Created by PhpStorm.
 * User: 08es3_000
 * Date: 10/9/2015
 * Time: 6:48 PM
 */

/**
 * @param $string
 * @param $pascalCase
 * converts abc-def-ghi to AbcDefGhi
 * examples:
 * hyphenToCamelCase("user-transactions",false);  // userTransactions
 * hyphenToCamelCase("user-transactions");  // UserTransactions
 * @return string
 */
function hyphenToCamelCase($string, $pascalCase = true)
{
    return separatorToCamelCase("-", $string, $pascalCase);
}

function underscoreToCamelCase($string, $pascalCase = true)
{
    return separatorToCamelCase("_", $string, $pascalCase);
}

function separatorToCamelCase($separator, $string, $pascalCase = true)
{
    $result = str_replace(' ', '', ucwords(str_replace($separator, ' ', $string)));
    if( !$pascalCase ) $result = lcfirst($result);
    return $result;
}

function pr($obj , $label=''){
    echo "<hr><b>".$label.":</b>";
    echo "<pre>";
    print_r($obj);
    echo "</pre>";
}

function pr_exit($obj,$label=''){
    pr($obj,$label);
    exit;
}
