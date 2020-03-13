import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { stringify } from 'query-string';

class SearchForm extends React.Component {
    state = {
      field: '',
      operator: '=',
      value: ''
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }

    submitSearchForm = e => {
        console.log("submitted search")
        e.preventDefault()
        // ????
        fetch(`http://localhost:3000/crud?${this.state.field}=${this.state.value}`,{
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }     
        }

        )
        .then(data => data.text())
  .then((text) => {
    console.log('request succeeded with JSON response', text)
  }).catch(function (error) {
    console.log('request failed', error)
  });
        
    }

    componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
          const { id, description, price, date } = this.props.item
          this.setState({ id, description, price, date })
        }
    }

    render(){
        return (

          <Form onSubmit={ this.submitSearchForm }>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
            </FormGroup>
            <Button>Search</Button>
          </Form>        
        )
    }

}

export default SearchForm