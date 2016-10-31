export var Box = (function () {
    function Box() {
        this.clientId = 'ooxx1uzqrd1ajz918rxb3np2v0l7plfg';
        this.state = '&state=thisisatest';
        this.url = 'https://account.box.com/api/oauth2/authorize?response_type=code&client_id=';
        this.clientSecret = 'MvWOa5Xb4pi3ipexL2nL0dsqbAvCQ4v3';
        this.redirect = '&redirect_uri=https://rstoops.github.io/token';
        this.dealTypesFolderName = 'Folder Templates';
        this.dealsFolderName = 'Deals';
    }
    Box.prototype.getTokenUrl = function () {
        return this.url + this.clientId + this.redirect + this.state;
    };
    Box.prototype.getClientSecret = function () {
        return this.clientSecret;
    };
    Box.prototype.getClientId = function () {
        return this.clientId;
    };
    Box.prototype.getRedirect = function () {
        return this.redirect;
    };
    Box.prototype.getDealTypesFolderName = function () {
        return this.dealTypesFolderName;
    };
    Box.prototype.getDealsFolderName = function () {
        return this.dealsFolderName;
    };
    return Box;
}());
//# sourceMappingURL=C:/development/projects/MSI/box-deal/src/app/box/box.js.map