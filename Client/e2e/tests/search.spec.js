import { Selector, t } from 'testcafe';
import singlePage from '../page-models/single-page.model';

fixture `Navigation`.page `http://localhost:3002`;


test('Get free repairs', async t => {
    const field    = 'price'
    const operator = '='
    const value    = '0'
    await singlePage.searchComponent.search(
        field,
        operator,
        value
      );
    await t.expect((Selector('#tbl-body').find('tr').count)).eql(2);
})

