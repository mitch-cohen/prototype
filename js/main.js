
var app = angular.module('app',['ui']);


var documentParser=function(){
    var _tokens =[];


   return {
       parse: function($v){
           var $str=$v || "";
           console.log($str);
           _.each(_tokens,function(t){
               var pattern = new RegExp("\\["+ t.pattern+"\\]","gi");

               console.log(pattern);
               $str = $str.replace(pattern, t.value);
           });
           return $str;
       },
       addToken:function(tkn){
           tkn=$.extend({pattern:"",value:""},tkn);
           _tokens[_tokens.length] = tkn;
           //console.log(_tokens);
       },
       getTokens: function(){
           return _tokens;
       }

   };


};

function templateCntl($scope){

    var oDP = documentParser();
    $scope.fields = oDP.getTokens();
    $scope.parse=function($str){
        console.log('val: '+$str);
        return oDP.parse($str);
    };
    $scope.add=function(){
        oDP.addToken($scope.new_field);
        $scope.fields  = oDP.getTokens();
        $scope.new_field={};
    };


}
app.directive("htmloutput",function($rootScope){
    return {
        scope: { model:"=", parse:"&"},
        replace: false,
        compile:function (tElement, tAttrs, transclude) {

                var preview=$('<div class="preview">' +
                    '<h2>Preview</h2>' +
                    '</div>'),iframe=$('<iframe></iframe>');
                preview.append(iframe);
                tElement.append(preview);

            return function (scope, iElement, iAttrs, controller) {
                var iFrameDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
                tElement.find('.preview:eq(1)').remove();
                scope.$parent.$watch('content',function(v){
                    var content = scope.parse()(v||'');
                    iFrameDoc.write(content);

                    var head=$(iFrameDoc).find('head');
                    head.append('<link href="/css/preview.css" rel="stylesheet">');
                    iFrameDoc.close();
                    //console.log(head);
                });
            };
        }
    };
});