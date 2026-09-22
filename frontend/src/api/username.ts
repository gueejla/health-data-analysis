// Good endpoint for random generation (in this case basic words for a default username)
const WORDS_ENDPOINT = 'https://generate-random.org/api/v1/generate/strings'

interface WordGenerationResponse {
  success: boolean
  data?: unknown
}

export async function generateUsername(): Promise<string> {
  const params = new URLSearchParams({
    type: 'words',
    count: '1',
    word_count: '2',
  })
  const response = await fetch(`${WORDS_ENDPOINT}?${params}`)

  if (!response.ok) {
    throw new Error(`Username generation failed: ${response.status}`)
  }

  const body = (await response.json()) as WordGenerationResponse
  const phrase =
    Array.isArray(body.data) && typeof body.data[0] === 'string'
      ? body.data[0]
      : null
    console.log(phrase)
  const username = phrase
    ?.trim()
    .split(/\s+/g)
    .map((word) => {
      word = word.toLowerCase()
      const firstLetter = word.charAt(0).toUpperCase()
      return firstLetter + word.slice(1)
    })
    .join('')
    .concat(String(Math.floor(Math.random() * 90) + 10))

  if (!body.success || !username) {
    throw new Error('Username generation returned an invalid response')
  }

  return username
}
