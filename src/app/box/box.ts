export class Box {
    private clientId: string = 'ooxx1uzqrd1ajz918rxb3np2v0l7plfg';
    private clientSecret: string = 'MvWOa5Xb4pi3ipexL2nL0dsqbAvCQ4v3';
    private redirect: string = '&redirect_uri=https://boxappdemo.cloudapp.net:8443/box-deal';
    private dealTypesFolderName: string = 'Folder Templates';
    private dealsFolderName: string = 'Deals';

    folderTemplateId: string;
    folderDealsId: string;

    getClientSecret(): string {
        return this.clientSecret;
    }

    getClientId(): string {
        return this.clientId;
    }

    getRedirect() {
        return this.redirect;
    }

    getDealTypesFolderName(): string {
        return this.dealTypesFolderName;
    }

    getDealsFolderName(): string {
        return this.dealsFolderName;
    }
}
