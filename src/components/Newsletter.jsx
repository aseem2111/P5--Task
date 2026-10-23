
import { useState } from 'react'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
     const response = await fetch(
  'http://localhost:5050/api/newsletter/subscribe',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  }
);

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Subscription failed.')
      }

      setMessage(data.message || 'Successfully subscribed!')
      setEmail('')
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h2>Subscribe to DEV@Deakin</h2>
        <p>
          Get the latest articles, tutorials and developer
          resources delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="subscribe-container">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          <p role="status" aria-live="polite">{message}</p>
        </form>
      </div>
    </section>
  )
}

export default Newsletter

