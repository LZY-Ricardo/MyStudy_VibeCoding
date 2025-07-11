import { createSlice } from "@reduxjs/toolkit";

const todoList = createSlice({
    name: 'todoList',
    initialState: {
        list: [
            {
                id: 1,
                name: '学习react',
                done: true
            },
            {
                id: 2,
                name: '学习vue',
                done: false
            },
        ]
    },
    reducers: {
        addList(state, action) {
            console.log(action);
            state.list.push(action.payload)
        },
        changeDone(state, action) {
            console.log(action);
            const {id, done} = action.payload
            const item = state.list.find((item) => item.id === id)
            if (item) {
                item.done = done
            }
        },
        deleteItem(state, action) {
            console.log(action);
            const index = state.list.findIndex((item) => item.id === action.payload)
            if (index !== -1) {
                state.list.splice(index, 1)
            }
        }
    }
})

const { addList, changeDone, deleteItem } = todoList.actions
export { addList, changeDone, deleteItem }

export default todoList.reducer