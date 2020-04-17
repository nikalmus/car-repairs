import { Selector, t } from 'testcafe';
import  searchComponent  from '../component-models/search.model';
import  tableRowComponent  from '../component-models/table-row.model';

class SinglePage {
  constructor() {
    this.searchComponent   = searchComponent
    this.tableRowComponent = tableRowComponent
  }
}

export default new SinglePage();