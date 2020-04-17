
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
    const originalDescription = 'Performed power steering fluid flush'
    const editedDescription = 'Flushed power steering fluid'
    const key = '6'

    const row = await singlePage.tableRowComponent.getRowByKey(key)
    //const cell = await singlePage.tableRowComponent.getCell(row, 0)
    //await t.expect(cell.textContent).eql(originalDescription)
    await t
        .click(row.find("button").withExactText('Edit'))
        .setNativeDialogHandler(() => true)
        .click('#description')
        .wait(2000).expect(2+2).eql(4)
        .pressKey('ctrl+a delete')
        .typeText(Selector('#description'), editedDescription)
        .wait(2000).expect(2+2).eql(4)
        .click('#submit-btn')
    
    await t.eval(() => location.reload(true));    
    const editedRow = await singlePage.tableRowComponent.getRowByKey(key)
    const editedCell = await singlePage.tableRowComponent.getCell(editedRow, 0)
    await t.expect(editedCell.textContent).eql(editedDescription)
    await t.hover(editedRow.find("button").withExactText('Edit'))
  })