import {useNavigate} from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
        <div>
            <h2>Home Page</h2>
            <button onClick={() => {navigate('/user?id=1')}}>去用户页面</button>
        </div>
        

    )
}

export default Home;