import React from 'react'

function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState({ quote: [] })

  async function fetchData() {
    const response = await fetch(
      'https://quote-garden.herokuapp.com/api/v2/quotes/random'
    )
    response
      .json()
      .then((response) => {
        setData(response)
        setIsLoading(true)
        setError(false)
      })
      .catch(() => {
        setIsLoading(false)
        setError(true)
      })
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      <div className="card">
        <h1>Random Quote</h1>
        {!isLoading ? (
          <p>Loading ... </p>
        ) : (
          <>
            <div className="card__quote">{data.quote.quoteText}</div>
            <div className="card__author">{data.quote.quoteAuthor}</div>
            <div className="card__button">
              <button className="btn btn__primary" onClick={fetchData}>
                Get Quote
              </button>
            </div>
            <div>
              <div id="copyright" className="credits">
                &#169; {new Date().getFullYear()}{' '}
                Created by Chuck Smith -{' '}
                <a
                  href="https://www.eclecticsaddlebag.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>{' '}
                -{' '}
                <a
                  href="https://chucksmith.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </div>
            </div>
            <div className="credits__social">
              <a
                href="https://twitter.com/EclecticCoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{' '}
              |{' '}
              <a
                href="https://www.linkedin.com/in/dev-chuck-smith/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{' '}
              |{' '}
              <a
                href="https://github.com/eclectic-coding"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </>
        )}
        {error && <div>Has error: {error}</div>}
      </div>
    </main>
  )
}

export default App
