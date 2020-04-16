import { Selector, t } from 'testcafe';
import  searchComponent  from '../component-models/search.model';

class SinglePage {
  constructor() {
    this.searchComponent = searchComponent
  }
}

export default new SinglePage();