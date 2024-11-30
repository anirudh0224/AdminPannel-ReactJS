import { useNavigate } from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate()
    let token = localStorage.getItem('isLoggedIn')
    if (!token) {
        navigate('/')
    }
    return (
        <>
            <div className="b1-33" style={{ margin: '10px', textAlign: 'center', padding: '10px' }}> <h1 style={{ margin: '20px', fontWeight: '600' }}>Total Category</h1> <h1 style={{ margin: '20px', fontSize: '40px' }}>6</h1> </div>
            <div className="b1-33" style={{ margin: '10px', textAlign: 'center', padding: '10px' }}> <h1 style={{ margin: '20px', fontWeight: '600' }}>Total Sub Category</h1> <h1 style={{ margin: '20px', fontSize: '40px' }}>0</h1> </div>
            <div className="b1-33" style={{ margin: '10px', textAlign: 'center', padding: '10px' }}> <h1 style={{ margin: '20px', fontWeight: '600' }}>Total Q & A</h1> <h1 style={{ margin: '20px', fontSize: '40px' }}>0</h1> </div>

        </>
    )
}

export default Dashboard

