module.exports = {
  getAllPuns: async (req, res) => {
const db = req.app.get('db')
    const puns = await db.get_all_puns();
    res.status(200).send(puns)

  },
  getOnePun: async (req, res) => {
const db = req.app.get('db')
    const {id} = req.params
    const [pun] = await db.get_one_pun(+id);
    if(pun){
      res.status(200).send(pun)
    } else {
      res.status(404).send(`i gourdn't find anything`)
    }
  },
  addPun: async (req, res) => {
const db = req.app.get('db')
    const {content} = req.body
    const {user_id} = req.session.user

    try{
      const puns = await db.add_pun([content, user_id])

    } catch(err){
      console.log('error adding pun, bugs need squashing')
    }
  },
  editPun: async (req, res) => {
const db = req.app.get('db')
    //id refers to pun id
    const {id} = req.params
    const {content} = req.body

    try{
      const puns = await db.edit_pun([+id, content])
      res.status(200).send(puns)
    }
    catch(err){
      console.log('you cannot improve upon perfection', err);
      res.sendStatus(500)
    }

  },
  deletePun: async (req, res) => {
  const db = req.app.get('db')
  const {id} = req.params
  try{
    const puns = await db.delete_pun(+id)
    res.status(200).send(puns)
  }
  catch(err){
    console.log(`Gourdn't delete such a masterpiece`)
    res.sendStatus(500)
  }
  }
}
