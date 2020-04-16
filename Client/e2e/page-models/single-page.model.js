import { Selector, t } from 'testcafe';
import { SearchComponent } from '../component-models/search.model';

class SinglePage {
  constructor() {
    this.searchComponent = new SearchComponent()
  }
}

export default new SinglePage();