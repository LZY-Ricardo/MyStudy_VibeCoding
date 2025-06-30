function List(props) {
    console.log(props.data)
    return(
        <ul>
            {
                props.data.map((item) => <li key={item.id}>{item.name}</li>)
            }
        </ul>
    )
}

export default List;
