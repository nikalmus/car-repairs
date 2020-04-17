import { Selector, t } from 'testcafe'

class TableRowComponent {
    constructor() {
        this.table = Selector('#tbl-body') 
    }
    getRow = (rowIndex)        => this.table.find('tr').nth(rowIndex)
    getCell = (row, cellIndex) => row.find('td').nth(cellIndex)
    
}

export default new TableRowComponent();