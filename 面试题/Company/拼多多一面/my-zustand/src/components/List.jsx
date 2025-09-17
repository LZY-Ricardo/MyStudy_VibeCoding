import  useListStore  from '../store/index2'

export default function List() {
    const { data } = useListStore((state) => state)
    // const { count, updateCount } = useTestStore()

    // console.log(useListStore.getState());
    
  return (
      <div>
          {/* <h2>当前计数: {count}</h2> */}
          {/* <button onClick={() => updateCount(count + 1)}>增加计数</button> */}
          <ul>
              {
                  data.map((item, index) => {
                      return <li key={index}>{item}</li>
                  })
              }
          </ul>
    </div>
  )
}
