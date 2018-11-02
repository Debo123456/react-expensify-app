import React from 'react';
import { Link } from 'react-router-dom';
import {removeExpense}from '../actions/expenses.js';
import {connect} from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount, createdAt, dispatch}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>{ numeral(amount).format('$0.00') } - { moment(createdAt).format('MMMM Do, YYYY') }</p>
        <button onClick={() => {
            dispatch(removeExpense({ id: id }));
        }}>Remove</button>
    </div>
);

export default connect()(ExpenseListItem);