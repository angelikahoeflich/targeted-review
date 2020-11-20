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
    const puns = await db.add_pun([content, user_id])
  },
  editPun: async (req, res) => {
const db = req.app.get('db')
  },
  deletePun: async (req, res) => {
const db = req.app.get('db')
  },
}
