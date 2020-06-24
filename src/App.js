import React from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState({ quote: []})

  async function fetchData() {
    const response = await fetch('https://quote-garden.herokuapp.com/api/v2/quotes/random')
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
                &#169;
                <script>
                  document.getElementById('copyright').appendChild(document.createTextNode(new
                  Date().getFullYear()))
                </script>
                Created by Chuck Smith -{' '}
                <a href="" target="_blank">
                  Blog
                </a>{' '}
                -{' '}
                <a href="" target="_blank">
                  Portfolio
                </a>
              </div>
            </div>
            <div className="credits__social">
              <a href="https://twitter.com/EclecticCoding" target="_blank">
                Twitter
              </a>{' '}
              |{' '}
              <a href="https://www.linkedin.com/in/dev-chuck-smith/" target="_blank">
                LinkedIn
              </a>{' '}
              |{' '}
              <a href="https://github.com/eclectic-coding" target="_blank">
                GitHub
              </a>
            </div>
          </>
        )}
        {error && <div>Has error: {error}</div>}
      </div>
    </main>
  );
}

export default App;
