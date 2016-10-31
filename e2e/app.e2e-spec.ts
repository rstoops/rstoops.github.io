import { BoxDealPage } from './app.po';

describe('box-deal App', function() {
  let page: BoxDealPage;

  beforeEach(() => {
    page = new BoxDealPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
