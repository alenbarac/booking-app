import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Heading from './ui/Heading'
import Row from './ui/Row'

function App() {
  return (
    <>
      <GlobalStyles />
      <Row type="vertical">
        <Heading type="h1">Hello world</Heading>
      </Row>
      <div>
        <Heading as="h2">Hello world</Heading>
      </div>
      <Row type="vertical">
        <Heading as="h3">Hello world</Heading>
        <Heading as="h3">Hello world</Heading>
      </Row>

      <Row type="horizontal">
        <Button variation="primary" size="medium">
          Check in
        </Button>

        <Button variation="danger" size="small">
          Kick out
        </Button>

        <Button>Check out</Button>
      </Row>
    </>
  )
}

export default App
