'use client'

export default function Error({ error, reset }) {
    return (
        <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px', margin: '20px' }}>
            <h2 style={{ color: 'red' }}>❌ 发生错误</h2>
            <p><strong>错误信息：</strong>{error.message}</p>
            <button
                onClick={() => reset()}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
            >
                重试
            </button>
        </div>
    )
}