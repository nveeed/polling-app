<?php
require_once __DIR__ . "/helper.php";
class PageGenerator{
    public $name;
    public $dir;
    public $moduleName;
    private $appJsFilePath;

    public function __construct($name)
    {
        $this->name = $name;
        $this->dir = __DIR__."/../pages/$name";
        $this->moduleName = hyphenToCamelCase($name);
        $this->appJsFilePath = __DIR__."/../app.js";
    }

    public function generate()
    {
        // create directory
        if(!file_exists($this->dir)) mkdir($this->dir);
        // create html file
        $this->generateFile($this->dir."/$this->name.html",$this->moduleName." Page..");
        // create js file
        $this->generateFile($this->dir."/$this->name.js",$this->getJsFileContents());
        // insert in app.js, module dependency
        $this->insertModuleDependency();
        // insert in app.js, codekit declaration
        $this->insertCodeKitDeclaration();
        // insert in app.js, route declaration
        //$this->insertRouteDeclaration(); // no need for this bcz we already added route in the js file
    }

    private function insertRouteDeclaration()
    {
        $content = file_get_contents($this->appJsFilePath);
        pr($content,"app.js before");
        $moduleContent = "when('/".$this->name."', {
            controller: '".$this->moduleName."Ctrl',
            templateUrl: 'pages/".$this->name."/".$this->name.".html'
        }).";
        echo "Route to append: $moduleContent<br>";
        echo "pos: ".strpos($content,$moduleContent)."<br>";
        if( strpos($content,$moduleContent) === false ) {
            $placeHolder = "// append more pages here";
            $content = str_replace($placeHolder, $moduleContent."\n\t\t".$placeHolder, $content);
            file_put_contents($this->appJsFilePath, $content);
        }
    }

    private function insertModuleDependency()
    {
        $content = file_get_contents($this->appJsFilePath);
        pr($content,"app.js before");
        $moduleContent = "'{$this->moduleName}'";
        echo "Module to append: $moduleContent<br>";
        echo "pos: ".strpos($content,$moduleContent)."<br>";
        if( strpos($content,$moduleContent) === false ) {
            $placeHolder = "// append more modules here";
            $content = str_replace($placeHolder, ",\n\t".$moduleContent.$placeHolder, $content);
            file_put_contents($this->appJsFilePath, $content);
        }
    }

    private function insertCodeKitDeclaration()
    {
        $content = file_get_contents($this->appJsFilePath);
        $fileName = "pages/$this->name/$this->name.js";
        echo "File Name to append: $fileName<br>";
        echo "pos: ".strpos($content,$fileName)."<br>";
        if( strpos($content,$fileName) === false ){
            $placeHolderStr = "// append more files here";
            $fileContent = '// @codekit-append "'.$fileName.'"';
            $content = str_replace($placeHolderStr,$fileContent."\n".$placeHolderStr,$content);
            file_put_contents($this->appJsFilePath,$content);
        }
        pr($content,"app.js after");
    }

    private function generateFile($file,$content)
    {
        file_put_contents($file,$content);
        echo "generated file: ".$file."<br>";
    }

    private function getJsFileContents(){
        $output = "'use strict';

angular.module('{$this->moduleName}', ['ngRoute'])

.config(['\$routeProvider', function(\$routeProvider) {
  \$routeProvider.when('/{$this->name}', {
    templateUrl: 'pages/{$this->name}/{$this->name}.html',
    controller: '{$this->moduleName}Ctrl'
  });
}])

.controller('{$this->moduleName}Ctrl', [function() {

}]);";
        return $output;
    }

}

$generator = new PageGenerator("");
if( !empty($_POST['name']) )
{
    $generator = new PageGenerator($_POST['name']);
    $generator->generate();
}
?>
<form method="post">
    <input type="text" name="name" value="<?=$generator->name?>"/>
    <button type="submit">Generate</button>
</form>