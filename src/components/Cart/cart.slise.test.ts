
import { cartActions, cartReducer, initialStateType } from "./catr.slice"

let startState:initialStateType;

beforeEach(() => {
const startItems=[
    {
        count: 2,
        id: 2,
        name: 'jacket',
        color:{
            id: 1,
            name: 'yellow',
            images: ['a','s'],
            price: '22',
            description: 'some desc',
            size: {id: 1, label: 'xl', number: 44  }
        }
}, {
        count: 4,
        id: 1,
        name: 'short',
        color:{
            id: 3,
            name: 'yellow',
            images: ['a','s'],
            price: '33',
            description: 'some desc',
            size: {id: 2, label: 's', number: 46  }
        }
    }]
    startState = {
        totalPrice: 6,
        totalCount: 176,
        items:startItems
    }
});
test("correct item should be removed", () => {
    const item=  {
        count: 2,
        id: 2,
        name: 'jacket',
        color:{
            id: 1,
            name: 'yellow',
            images: ['a','s'],
            price: '22',
            description: 'some desc',
            size: {id: 1, label: 'xl', number: 44  }
        }
    }
const action = cartActions.removeItem({product:item})
    const endState = cartReducer(startState,action)

expect(endState.items.length).toBe(1)
expect(endState.totalCount).toBe(4)
expect(endState.totalPrice).toBe(132)
});
test("correct item should change count, and should change total price", () => {
    const item=  {
        count: 2,
        id: 2,
        name: 'jacket',
        color:{
            id: 1,
            name: 'yellow',
            images: ['a','s'],
            price: '22',
            description: 'some desc',
            size: {id: 1, label: 'xl', number: 44  }
        }
    }
    const action = cartActions.minusItem({product:item})
    const endState = cartReducer(startState,action)

    expect(endState.items.length).toBe(2)
    expect(endState.totalCount).toBe(5)
    expect(endState.totalPrice).toBe(154)
});
test("correct item should add to state", () => {
    const item=  {
        count: 1,
        id: 3,
        name: 't-short',
        color:{
            id: 4,
            name: 'blue',
            images: ['a','s'],
            price: '10',
            description: 'some desc',
            size: {id: 1, label: 'xl', number: 44  }
        }
    }
    const action = cartActions.addItem({product:item})
    const endState = cartReducer(startState,action)

    expect(endState.items.length).toBe(3)
    expect(endState.totalCount).toBe(7)
    expect(endState.totalPrice).toBe(186)
});

test("after adding the same item, should change count item, total price and total count", () => {
    const item=  {
        count: 1,
        id: 2,
        name: 'jacket',
        color:{
            id: 1,
            name: 'yellow',
            images: ['a','s'],
            price: '22',
            description: 'some desc',
            size: {id: 1, label: 'xl', number: 44  }
        }
    }
    const action = cartActions.addItem({product:item})
    const endState = cartReducer(startState,action)

    expect(endState.items.length).toBe(2)
    expect(endState.items[0].count).toBe(3)
    expect(endState.totalCount).toBe(7)
    expect(endState.totalPrice).toBe(198)
});