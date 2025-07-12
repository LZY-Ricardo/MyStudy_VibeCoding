import './todoList.css'
import { useSelector, useDispatch } from 'react-redux'
import { addList, changeDone, deleteItem } from '../../store/modules/todoListStore'
import { useRef } from 'react'

function App() {
  const { list } = useSelector((state) => state.todoList)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const handleAddList = () => {
    const inputValue = inputRef.current.value
    const index = list[list.length - 1]?.id || 0
    if (inputValue === '') {
      inputRef.current.placeholder = '请输入内容(不能为空)！！！'
      setTimeout(() => {
        inputRef.current.placeholder = ''
      }, 1000)
      return
    }
    const item = {
      id: index + 1,
      name: inputValue,
      done: false
    }
    dispatch(addList(item))
    inputRef.current.value = ''
  }
  const handleChangeDone = (id) => (e) => {
    const checked = e.target.checked;
    console.log(id, checked);
    dispatch(changeDone({ id, done: checked }))
  }
  const handleDelete = (id) => {
    dispatch(deleteItem(id))
  }
  const handleToggleAll = (e) => {
    const checked = e.target.checked
    list.forEach((item) => {
      dispatch(changeDone({ id: item.id, done: checked }))
    })
  }

  const isAllChecked = list.length > 0 && list.filter(item => !item.done).length === 0
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddList()
            }
          }}
          ref={inputRef}
        />
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" checked={isAllChecked} onChange={handleToggleAll}/>
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {/* <li className="todo">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>learn react</label>
              <button className="destroy"></button>
            </div>
          </li>
          <li className="todo completed">
            <div className="view">
              <input className="toggle" type="checkbox" defaultChecked={true} />
              <label>learn react</label>
              <button className="destroy"></button>
            </div>
          </li> */}
          {
            list.map((item) => (
              <li key={item.id} className={item.done === true ? 'todo completed' : 'todo'}>
                <div className="view">
                  <input className="toggle" type="checkbox" checked={item.done} onChange={handleChangeDone(item.id)} />
                  <label>{item.name}</label>
                  <button className="destroy" onClick={() => handleDelete(item.id)}></button>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    </section>
  )
}

export default App