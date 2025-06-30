// import './App.css'

// function App() {
//   const name = 'Ricardo'
//   const songs = [
//     {id: 1, name: '素颜'},
//     {id: 2, name: '晴天'},
//     {id: 3, name: '爱在西元前'},
//     {id: 4, name: '光年之外'},
//     {id: 5, name: '天外来物'}
//   ]
//   const flag = true
//   const styleObj = {
//     color: 'green'
//   }

//   return (
//     <div className="App">
//       <h1>Hello {name}!</h1>
//       {/* <ul>
//         {
//           songs.map((item, index) => {
//             return (
//               <li key={item.id}>{index + 1}.{item.name}</li>
//             )
//           })
//         }
//       </ul> */}

//       {/* <h3>{flag ? 'react 真有意思!' : 'react 真无趣!'}</h3>
//       <div>{flag ? <span>react 真好玩</span> : null}</div> */}

//       {/* <div style={{color: 'pink'}}>Sakura最好了</div>
//       <div style={styleObj}>4月24日, 和Sakura去东京天空树, 世界上最温暖的地方</div>
//       <div className="content">4月25日, 和Sakura去明治神宫, 有人在那里举办婚礼</div> */}

//       <div>
//         <p className={flag ? 'title' : ''}>十万张花票</p>
//       </div>
//     </div>
//   )
// }

// export default App;

import List from './components/List'
function App() { // 根组件 父组件
  const songs = [
    {id: 1, name: '素颜'},
    {id: 2, name: '晴天'},
    {id: 3, name: '爱在西元前'},
    {id: 4, name: '光年之外'},
    {id: 5, name: '天外来物'}
  ]

  return (
    <div>
      <h1>Hello Ricardo</h1>
      {/* list */}
      <List data={songs}></List>
    </div>
  )
}
export default App;