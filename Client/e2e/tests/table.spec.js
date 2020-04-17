
import { Selector, t } from 'testcafe';
import singlePage from '../page-models/single-page.model';

fixture `Navigation`
  .page `http://localhost:3002`
  .afterEach( async t => {
    /* delay for demo purposes */
    await t.wait(1000).expect(2+2).eql(4); 
    await t.eval(() => location.reload(true));
  });

  test('Find specific row by index', async t => {
    const promisedRow  = await singlePage.tableRowComponent.getRow(2)
    const row          = await promisedRow.textContent
    console.log(row)
    const promisedCell = await singlePage.tableRowComponent.getCell(promisedRow, 2)
    const cell         = await promisedCell.textContent
    console.log(cell)
    const promisedCellButtons = await singlePage.tableRowComponent.getCell(promisedRow, 3)
    const buttonCell          = await promisedCellButtons.textContent
    console.log(buttonCell)

    // want to edit 'Performed power steering fluid flush'
    const editedDescription = 'Flushed power steering fluid'
    //await t.click(page.rowItem.withExactText('foobar').find("button").withExactText('Delete'))
    await t.click(promisedRow.find("button").withExactText('Edit'))
    await t
        .setNativeDialogHandler(() => true)
        .click('#description')
        .pressKey('ctrl+a delete')
        .typeText(Selector('#description'), editedDescription)
        .click('#submit-btn')

  })