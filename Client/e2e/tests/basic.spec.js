import { Selector, t } from 'testcafe';
//import SinglePage from '../page-models/single-page.model';

fixture `Navigation`.page `http://localhost:3002`;

test.skip('Access to an article from the home page', async t => {
    // Test code
    await t
        .wait(10000)
        .expect(2+2).eql(4);
});

// test.skip('Get free repairs', async t => {
//     const singlePage = new SinglePage();
//     const field    = 'price'
//     const operator = '='
//     const value    = '0'
//     await singlePage.searchComponent.search(
//         field,
//         operator,
//         value
//       );
//     await t.expect((Selector('#tbl-body').find('tr').count)).eql(2);
// })


test('Type date', async t => {
    const searchButton = Selector('#search-btn');
    await t
        //.typeText(Selector('#field'), 'date')
        //.typeText(Selector('#operator'), '>')
        //.typeText(Selector('#value'), '2019-01-01')
        //.expect(Selector('#field').value).eql('date')
        .typeText(Selector('#field'), 'price')
        //.typeText(Selector('#operator'), '=')
        .typeText(Selector('#value'), '0')
        .click(searchButton)
        .wait(15000)
        .expect(2+2).eql(4)
        .expect((Selector('#tbl-body').find('tr').count)).eql(2);
});

// test('Search free repairs', async t => {
//     const fieldInput    = Selector('#field');
//     const operatorInput = Selector('#operator');
//     const valueInput    = Selector('#value');
//     const searchButton = Selector('#sarch-btn');
  
//     const field = 'price'
//     const operator = '='
//     const value = 0

//     const search = (field, operator, value) => {
//       return t
//         .typeText(fieldInput, field)
//         .typeText(operatorInput, operator)
//         .typeText(valueInput, value)
//         .click(searchButton);
//     }

//     search(field, operator, value)
// })