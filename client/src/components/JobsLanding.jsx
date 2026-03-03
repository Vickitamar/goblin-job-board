import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const ThemeGlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(180deg, #0f1410 0%, #0a0e0a 50%, #060806 100%);
    min-height: 100vh;
    color: #c9b896;
  }
`

const Root = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  text-align: left;
  font-family: 'Cormorant Garamond', Georgia, serif;
`

const Header = styled.header`
  margin-bottom: 2.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid #3d2d1a;
  box-shadow: 0 1px 0 rgba(184, 134, 11, 0.15);

  h1 {
    margin: 0 0 0.35rem 0;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 2.25rem;
    font-weight: 700;
    color: #e8dcc4;
    letter-spacing: 0.08em;
    text-shadow: 0 0 20px rgba(184, 134, 11, 0.25);
  }
`

const Subtitle = styled.p`
  margin: 0;
  color: #8b9d83;
  font-size: 1.5rem;
  font-style: italic;
  letter-spacing: 0.02em;
`

const Message = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  font-style: italic;
  color: #8b9d83;
`

const ErrorMessage = styled(Message)`
  color: #b85450;
  font-style: normal;
`

const JobsList = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 0 50px;
`

const JobCard = styled.article`
  padding: 1.5rem 1.75rem;
  background: linear-gradient(145deg, #1a2118 0%, #141a12 100%);
  border: 1px solid #2d3d2d;
  border-radius: 4px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(184, 134, 11, 0.06);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(184, 134, 11, 0.4), transparent);
    border-radius: 4px 4px 0 0;
  }
`

const JobTitle = styled.h2`
  margin: 0 0 0.35rem 0;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 2.25rem;
  font-weight: 400;
  color: #e8dcc4;
  letter-spacing: 0.04em;
`

const JobCompany = styled.p`
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  font-size: 1.875rem;
  color: #b8860b;
  letter-spacing: 0.03em;
`

const JobLocation = styled.p`
  margin: 0 0 0.75rem 0;
  color: #7a9e64;
  font-size: 1.125rem;
  font-style: italic;
`

const JobDescription = styled.p`
  margin: 0 0 0.75rem 0;
  line-height: 1.6;
  color: #c4b896;
  font-size: 1.25rem;
`

const JobMeta = styled.p`
  margin: 0.3rem 0 0 0;
  font-size: 1.25rem;
  color: #c4b896;

  strong {
    color: #b8860b;
    font-weight: 600;
  }
`

const JobDate = styled.p`
  margin: 0.75rem 0 0 0;
  font-size: 1rem;
  color: #6b7a65;
  font-style: italic;
`

export default function JobsLanding() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/jobs')
        if (!res.ok) throw new Error('Failed to load jobs')
        const data = await res.json()
        setJobs(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  if (loading) return <><ThemeGlobalStyle /><Message>Loading jobs…</Message></>
  if (error) return <><ThemeGlobalStyle /><ErrorMessage>Error: {error}</ErrorMessage></>

  return (
    <>
      <ThemeGlobalStyle />
      <Root>
        <Header>
          <h1>Jobs</h1>
          <Subtitle>Browse open positions</Subtitle>
        </Header>
        <JobsList>
          {jobs.length === 0 ? (
            <Message>No jobs yet.</Message>
          ) : (
            jobs.map((job) => (
              <JobCard key={job._id}>
                <JobTitle>{job.title}</JobTitle>
                <JobCompany>{job.company}</JobCompany>
                <JobLocation>{job.location}</JobLocation>
                <JobDescription>{job.description}</JobDescription>
                <JobMeta>
                  <strong>Requirements:</strong> {job.requirements}
                </JobMeta>
                <JobMeta>
                  <strong>Salary:</strong> £{job.salary?.toLocaleString()}
                </JobMeta>
                {job.createdAt && (
                  <JobDate>
                    Posted: {new Date(job.createdAt).toLocaleDateString('en-GB')}
                  </JobDate>
                )}
              </JobCard>
            ))
          )}
        </JobsList>
      </Root>
    </>
  )
}
