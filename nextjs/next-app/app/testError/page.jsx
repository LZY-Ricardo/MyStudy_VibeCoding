'use client'

import React, { useState } from 'react'


export default async function DashboardPage(props) {
    const [error, setError] = useState(false)

    const handleGetError = () => {
        setError(true)
    }
    return (
        <>
            {
                error ? Error() : <button onClick={handleGetError}>Get Error</button>
            }
        </>
    )
}
