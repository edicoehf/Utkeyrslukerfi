import React from 'react'

// would consider using container class from bootstrap instead of wrapper
const Container = ({ children }) => <div className='wrapper'> {children} </div>

export default Container
