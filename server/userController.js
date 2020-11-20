const bcrypt = require('bcrypt');
module.exports = {
  getUser: (req, res) => {
    //won't get to this point if no user is logged in bc of middleware
    res.status(200).send(req.session.user);
  },

  editUser:async (req, res) => {
   //won't get to this point if no user is logged in bc of middleware
    const db = req.app.get('db')
    const {img} = req.body 
    const {user_id} = req.session.user

    const updatedUser = await db.edit_user([user_id, img]);
    req.session.user = updatedUser[0]
    res.status(200).send(req.session.user)

  },

  login:async (req, res) => {
    const db = req.app.get('db')
    //see if a user exists
    // check the password
    // log user in (on session) and send user to front end 
    const {email, password} = req.body
    const [foundUser] = await db.find_email(email)
    if(foundUser){
      const comparePassword = foundUser.password
      const authenticated = bcrypt.compareSync(password, comparePassword)
      if(authenticated){
        delete foundUser.password;
        req.session.user = foundUser;
        res.status(200).send(req.session.foundUser)
      } else{
        res.status(401).send('email or passgourd incorrect')
      }

    } else {
      res.status(401).send('email or passgourd incorrect')
    }

  },

  register:async (req, res) => {
    const db = req.app.get('db')
    //see if user exists( we dont want it to)
    //store user on db
    //log user in (on session) and send user to front end 
    const {email, password} = req.body
    try{
      const [foundUser] = await db.find_email(email)
      if(foundUser){
        res.status(400).send('user already exists')
      } else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.register_user([email,hash])
        req.session.user = newUser;
        res.status(200).send(req.session.user)
      }
    } catch(err){ 'Database error on register function', err
    }

  },

  logout: (req, res) => {
    const db = req.app.get('db')
    req.session.destroy
    res.sendStatus(200)
  },
}

//axios.put ('/api/user/shrek.jpg')

//axios.put('/api/user?img=shrek.jpg)

//axios.put('/api/user', {img:shrek.jpg}) (multiple things, big data, semi secure data(passwords))