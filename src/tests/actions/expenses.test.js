import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('Should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
}) ;

test('Should setup edit expense action object', () => {
    const action = editExpense({id: '456abc', 
                                updates: {
                                    description: 'Water Bill'
                                }});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '456abc',
        updates: {
            description: 'Water Bill'
        }
    });
}) ;

test('Should setup add expense action object with provided values', () => {
 const action = addExpense(expenses[2]);
 expect(action).toEqual({
     type: 'ADD_EXPENSE',
     expense: expenses[2]
 });
});

test('Should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense:  {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Should add expense with default to database and store', () => {

});

// test('Should setup add expense action object with default values', () => {
//     const defaultExpense = {
//         description:'',
//         note: '',
//         amount: 0,
//         createdAt: 0
//     };
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expenses: {
//             ...defaultExpense,
//             id: expect.any(String)
//         }
//     });
// });