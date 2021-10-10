import { collect } from './collect'

collect()
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
