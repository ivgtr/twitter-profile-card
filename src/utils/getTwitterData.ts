import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const userShowEndoPoint = 'https://api.twitter.com/1.1/users/show.json'

const requestTwitterData = <T>(id: string): Promise<T> => {
  const headers = {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN as string}`
  }

  const params = {
    screen_name: id
  }

  return new Promise((resolve, reject) => {
    axios
      .get(userShowEndoPoint, { headers, params })
      .then<T>((response) => response.data)
      .then((result) => {
        return resolve(result)
      })
      .catch(async (err) => {
        return reject(err.response)
      })
  })
}

export async function getTwitterData<T>({ id }: { id: string }): Promise<T> {
  const result = await requestTwitterData<T>(id)
  return result
}
