export class Box {
    private clientId: string = 'ooxx1uzqrd1ajz918rxb3np2v0l7plfg';
    private state: string = '&state=thisisatest';
    private url: string = 'https://account.box.com/api/oauth2/authorize?response_type=code&client_id=';
    private clientSecret: string = 'MvWOa5Xb4pi3ipexL2nL0dsqbAvCQ4v3';
    private redirect: string = '&redirect_uri=https://rstoops.github.io/token';
    private dealTypesFolderName: string = 'Folder Templates';
    private dealsFolderName: string = 'Deals';

    folderTemplateId: string;
    folderDealsId: string;

    getTokenUrl(): string {
        return this.url + this.clientId + this.redirect + this.state;
    }

    getClientSecret(): string {
        return this.clientSecret;
    }

    getClientId(): string {
        return this.clientId;
    }

    getRedirect() {
        return  this.redirect;
    }

    getDealTypesFolderName() : string {
        return this.dealTypesFolderName;
    }

    getDealsFolderName() : string {
        return this.dealsFolderName;
    }
}
