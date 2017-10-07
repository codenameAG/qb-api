var getQueryParam = function(query){
    var arrParam = window.location.search.split('&');
    for(var i=0; i < arrParam.length; i++){
        var keyValue = arrParam[i].split('=');
        if(keyValue[0].toLocaleLowerCase() == query.toLocaleLowerCase()){
            return keyValue[1];
        }
    }
}
// }
// var getQueryParameter = function (query)
// {
//     var arrParams = window.location.search.split('&');
//     for (var i = 0; i < arrParams.length; i++) 
//     {
//         var parameter = arrParams[i].split('=');
//         if (parameter[0] == query) 
//         {
//             return parameter[1];
//         }
//     }
// }