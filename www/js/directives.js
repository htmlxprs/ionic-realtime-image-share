/**
 * Created by Sandeep on 29/08/14.
 */
angular.module('com.htmlxprs.imageShare.directives',[]).directive('browseFile',['$rootScope','USER',function($rootScope,USER){
    return {
        scope:{

        },
        replace:true,
        restrict:'AE',
        link:function(scope,elem,attrs){

            scope.browseFile=function(){
                document.getElementById('browseBtn').click();
            }

            angular.element(document.getElementById('browseBtn')).on('change',function(e){

               var file=e.target.files[0];

               angular.element(document.getElementById('browseBtn')).val('');

               var fileReader=new FileReader();

               fileReader.onload=function(event){
                   $rootScope.$broadcast('event:file:selected',{image:event.target.result,sender:USER.name});
               }

               fileReader.readAsDataURL(file);
            });

        },
        templateUrl:'views/browse-file.html'
    }
}]).directive('chatList',['$rootScope','SOCKET_URL',function($rootScope,SOCKET_URL){
    return{
        replace:true,
        restrict:'AE',
        scope:{

        },
        link:function(scope,elem,attrs){

            var socket=io(SOCKET_URL);

            scope.messages=[];

            $rootScope.$on('event:file:selected',function(event,data){

                socket.emit('event:new:image',data);

                scope.$apply(function(){
                    scope.messages.unshift(data);
                });

            });

            socket.on('event:incoming:image',function(data){

                scope.$apply(function(){
                    scope.messages.unshift(data);
                });

            });

        },
        templateUrl:'views/chat-list.html'
    }
}]);