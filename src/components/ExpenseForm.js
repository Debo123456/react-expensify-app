import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            description: props.expense ? props.expense.description : '',
            amount:  props.expense ? (props.expense.amount / 100).toString() : '',
            note:  props.expense ? props.expense.note : '', 
            createdAt:  props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false, 
            error: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);

    }

    onChangeHandler(e) {
        const update = {[e.target.name]: e.target.value}
        this.setState(() => {
            return update;
        });
    }

    onAmountChange(e) {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=> ({ amount }));
        }
    }

    onDateChange = (createdAt) => {
        if (createdAt){
            this.setState(() =>({
            createdAt
            }));
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() =>({
            calendarFocused: focused
        }));
    }

    submitHandler(evt) {
        evt.preventDefault();
        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({
                error: 'Please provide description and amount'
            }));
        } else{
            this.props.onSubmit({
                description: this.state.description, 
                note: this.state.note, 
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf()
            });

            this.setState(() => ({
                error: ''
            }));
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form>
                    <input  
                        name="description"
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange = {this.onChangeHandler}
                    />

                    <input  
                        name= "amount"
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange = {this.onAmountChange}
                    />

                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        id={uuid()}
                    />

                    <textarea  
                        name="note"
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange = {this.onChangeHandler}
                    >
                    </textarea>

                    <button 
                        type="submit" 
                        onClick={this.submitHandler}
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        );
    }
}

export default connect()(ExpenseForm);

