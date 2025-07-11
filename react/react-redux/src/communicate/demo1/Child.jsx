

export default function Child({ list }) {
    return (
        <div className="bd">
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}
