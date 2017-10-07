var config = {
    ClientId: "Q0cE3IAtWnq7XPnjngh7FhnLXzMCPblWA5xAjLby8fflslC84K",
    ClientSecret: "NwAydMD5rG4nA0eoyOnVCtAwLYEmB24Fr5aTxs0o",
    RedirectUri: "http://localhost:9000/return.html",
    AccountBaseUri: "sandbox-quickbooks.api.intuit.com",
    AppState: "security_token%3D138r5719ru3e1%26url%3D"
};
var oauthConfig = {
    ConnectUri: "https://appcenter.intuit.com/connect/oauth2",
    TokenUri: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer"
};

var authLogin = function () {
    console.log('qb auth init!');
    var uri = oauthConfig.ConnectUri +
        "?client_id=" + config.ClientId +
        "&response_type=code" +
        "&scope=com.intuit.quickbooks.accounting" +
        "&redirect_uri=" + config.RedirectUri +
        "&state=" + config.AppState + config.RedirectUri;
    console.log(uri);
    $(location).attr('href', uri);
    // getCall(uri, authLoginSuccess);
};
var setCodes = function () {
    console.log("setting codes.");
    var codes = {
        state: getQueryParam("state"),
        code: getQueryParam("code"),
        realmId: getQueryParam("realmid")
    };

    console.log('response codes:');
    console.log(codes);
    authBearerCall(codes);
};


var authBearerCall_Success = function (data) {
    console.log(data);
};
var authBearerCall = function (codes) {
    var token = $.base64.encode(config.ClientId + ":" + config.ClientSecret);
    var data = "grant_type=authorization_code" +
        "&code=" + codes.code +
        "&redirect_uri=" + "https://www.getpostman.com/oauth2/callback";//config.RedirectUri;
    console.log(token);
    console.log(data);

    $.ajax({
        type: "POST",
        url: oauthConfig.TokenUri,
        accepts: 'application/json',
        data: data,
        async: false,
        crossDomain: true,
        contentType: "application/x-www-form-urlencoded",
        // headers: {
        //     // "Authorization": "Basic " + token
        //     "Access-Control-Allow-Origin": "*"
        //   },
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Authorization", "Basic " + token);
        },
        success: function (data) {
            //console.log('getCall data');
            //console.log(data);
            authBearerCall_Success(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        }
    });
};