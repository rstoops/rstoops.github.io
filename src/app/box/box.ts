export class Box {

    // Production
    // private clientId: string = 'ooxx1uzqrd1ajz918rxb3np2v0l7plfg';
    // private clientSecret: string = 'MvWOa5Xb4pi3ipexL2nL0dsqbAvCQ4v3';

    // Testing
    private clientId: string = 'jl4mc75psi3ot2sxkfbry7n4n4x1w4nm';
    private clientSecret: string = 'jjGCFQwWbC5AZnCzHYEk2c0FHcSBQSkw';

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

    getDealTypesFolderName(): string {
        return this.dealTypesFolderName;
    }

    getDealsFolderName(): string {
        return this.dealsFolderName;
    }
}
