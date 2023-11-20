import GlobalStyles from './styles/GlobalStyles'
import Heading from './ui/Heading'

function App() {
  return (
    <>
      <GlobalStyles />
      <Heading type="h1">Hello world</Heading>
      <Heading as="h2">Hello world</Heading>
      <Heading as="h3">Hello world</Heading>
    </>
  )
}

export default App
