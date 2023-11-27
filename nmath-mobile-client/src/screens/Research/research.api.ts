import axios from 'axios'
import { IResearchRequest, IResearchResponse } from './research.types'

export default function research(researchData: IResearchRequest) {
  return new Promise<IResearchResponse>((resolve, reject) => {
    return axios
      .post<IResearchResponse>(
        'http://localhost:5116/api/equation/research',
        researchData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => resolve(response.data))
      .catch((err) => reject(err))
  })
}
