// /api/spotify.js
// Deploy this to Vercel — it runs server-side and keeps the secret safe

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_URL     = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING   = 'https://api.spotify.com/v1/me/player/currently-playing'
const TOP_TRACKS    = 'https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=short_term'

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res   = await fetch(TOKEN_URL, {
    method:  'POST',
    headers: {
      Authorization:  `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type:    'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })
  return res.json()
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const { access_token } = await getAccessToken()

    // Try currently playing first
    const npRes  = await fetch(NOW_PLAYING, {
      headers: { Authorization: `Bearer ${access_token}` }
    })

    if (npRes.status === 200) {
      const data = await npRes.json()
      if (data.item) {
        return res.json({
          isPlaying: data.is_playing,
          title:     data.item.name,
          artist:    data.item.artists.map(a => a.name).join(', '),
          album:     data.item.album.name,
          albumArt:  data.item.album.images[1]?.url,
          songUrl:   data.item.external_urls.spotify,
        })
      }
    }

    // Fallback: top track
    const topRes  = await fetch(TOP_TRACKS, {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    const topData = await topRes.json()
    const track   = topData.items?.[0]

    return res.json({
      isPlaying: false,
      title:     track?.name     ?? 'No data',
      artist:    track?.artists?.map(a => a.name).join(', ') ?? '',
      album:     track?.album?.name ?? '',
      albumArt:  track?.album?.images[1]?.url ?? null,
      songUrl:   track?.external_urls?.spotify ?? '#',
    })
  } catch (err) {
    return res.status(500).json({ error: 'Spotify API error' })
  }
}
