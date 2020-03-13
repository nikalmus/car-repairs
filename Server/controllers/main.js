/*   const getTableData = (req, res, db) => {
    if (req.query){
      db.select('*').from('repair').where(req.query)
      .then(items => {
        if(items.length){
          console.log(`found ${items.length} items`)
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
    }
    else{
      db.select('*').from('repair')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
    }
  } */

  const getTableData = (req, res, db) => {
    db.select('*').from('repair')
      .modify(function(queryBuilder){
        console.log(req.query)
        if (Object.keys(req.query).length > 0) {
          console.log("query params exist")
          console.log(req.query)
          let k = ''
          let val = ''
          for (const key in req.query) {
            k = key
            val = req.query[key]
            console.log(`val: ${val}, key: ${k}`)
          }
          queryBuilder.where(k, val);
        } 
      }).then(items => {
        console.log("outside of if")
          if(items.length){
            console.log(`found ${items.length} items`)
            res.json(items)
          } else {
            res.json({dataExists: 'false'})
         }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  const queryById = (req, res, db) => {
    id = req.params.id
    db.select('*').from('repair').where({id:id})
      .then(items => {
        if(items.length){
          console.log(`found ${items.length} items`)
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  const queryByField = (req, res, db) => {
    db.select('*').from('repair').where(req.query)
      .then(items => {
        if(items.length){
          console.log(`found ${items.length} items`)
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  const queryTableDataByTag = (req, res, db, tag) => {
    db.select('*').from('repair').where({tag:tag})
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  const queryTableDataByTerm = (req, res, db, searchTerm) => {
    db.select('*').from('repair').where('repair.description', 'LIKE', `%${searchTerm}%`)
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const postTableData = (req, res, db) => {
    const { description, price, date } = req.body
    db('repair').insert({description, price, date})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putTableData = (req, res, db) => {
    const { id, description, price, date } = req.body
    db('repair').where({id}).update({description, price, date})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('repair').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData,
    queryById
  }