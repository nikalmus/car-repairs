import { Selector, t } from 'testcafe';
import singlePage from '../page-models/single-page.model';

fixture `Navigation`
  .page `http://localhost:3002`
  .afterEach( async t => {
    /* delay for demo purposes */
    await t.wait(1000).expect(2+2).eql(4); 
    await t.eval(() => location.reload(true));
  });       



test('Get free repairs by price = 0', async t => {
    const field    = 'price'
    const operator = '='
    const value    = '0'
    await singlePage.searchComponent.search(
        field,
        operator,
        value
      );
    await t
        .expect((Selector('#tbl-body').find('tr').count)).eql(2);
});

test('Get free repairs where description contains recall', async t => {
    const field    = 'description'
    const operator = 'contains'
    const value    = 'recall'
    await singlePage.searchComponent.search(
        field,
        operator,
        value
      );
    await t
        .expect((Selector('#tbl-body').find('tr').count)).eql(2);
});

test('Get repairs that contain words air filter', async t => {
    const field1    = 'description'
    const operator1 = 'contains'
    const value1    = 'air filter'
    await singlePage.searchComponent.search(
        field1,
        operator1,
        value1
      );
    await t
        .expect((Selector('#tbl-body').find('tr').count)).eql(3);
        
        
    const field2    = 'description'
    const operator2 = 'contains'
    const value2    = 'cabin air filter'
    await singlePage.searchComponent.search(
        field2,
        operator2,
        value2
      );
    await t
        .expect((Selector('#tbl-body').find('tr').count)).eql(1);
});

test('Get reparirs made after certain date', async t => {
    const field    = 'date'
    const operator = '>='
    const value    = '2019-09-16'
    await singlePage.searchComponent.search(
        field,
        operator,
        value
      );
    await t
        .expect((Selector('#tbl-body').find('tr').count)).eql(4);
})

