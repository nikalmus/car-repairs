import { Selector, t } from 'testcafe'

class TableRowComponent {
    constructor() {
        this.table = Selector('#tbl-body') 
    }
    getRow = (idx)        => this.table.find('tr').nth(idx)
    getRowByText = (txt) =>  this.table.find('tr').withText(txt)
    getRowByKey  = (key) => this.table.find('th').withExactText(key).parent(0)
    getCell = (row, cellIndex) => row.find('td').nth(cellIndex)
    
}

export default new TableRowComponent();