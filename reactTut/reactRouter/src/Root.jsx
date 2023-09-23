
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
    <Header />
    <Outlet /> {/* outlet is a placeholder for the child routes dynamically passing different routes keeping the header and footer constant*/}
    <Footer />
    </>
  )
}

export default Root