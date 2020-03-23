import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SearchForm extends React.Component {
    state = {
      field: '',
      operator: '=',
      value: ''
    }

    onChange = e => {
        console.log('e.target.name', [e.target.name], 'e.target.value', e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    submitSearchForm = e => {
        console.log("submitted search")
        e.preventDefault()
        fetch(`http://localhost:3000/crud?${this.state.field} ${this.state.operator} ${this.state.value}`,{
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }     
        })
        .then(response => response.json())
         .then(items => {
            if(Array.isArray(items)) {
                this.props.filterState(items)
                this.props.toggle()
              } else {
                console.log('Oh noes! failure')
              }
            })
            .catch(err => console.log(err))
    }

    componentDidMount(){
        console.log("componentDidMount")
        console.log('this.props.items', this.props.items)
        if(this.props.item){
          const { id, description, price, date } = this.props.item
          this.setState({ id, description, price, date })
        }
    }

    render(){
        return (

          <Form onSubmit={ this.submitSearchForm }>
            <FormGroup>
              <Label for="field">Field</Label>
              <Input type="text" name="field" 
                                 id="field" 
                                 onChange={this.onChange} 
                                 value={this.state.field === null ? '' : this.state.field} />
              <Label for="columnName">Operator</Label>
              <Input type="text" name="operator" 
                                 id="operator" 
                                 onChange={this.onChange} 
                                 value={this.state.operator === null ? '' : this.state.operator} />
              <Label for="columnName">Value</Label>
              <Input type="text" name="value" 
                                 id="value" 
                                 onChange={this.onChange} 
                                 value={this.state.value === null ? '' : this.state.value} />
            </FormGroup>
            <Button>Search</Button>
          </Form>        
        )
    }

}

export default SearchForm