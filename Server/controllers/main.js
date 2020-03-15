
  
  const getTableData = (req, res, db) => {
    db.select('*').from('repair')
      .modify(function(queryBuilder){
        console.log('req.query before if:', req.query)
        if (Object.keys(req.query).length > 0) {
          const keys = Object.keys(req.query)
          const k = keys[0]
          const re = /(?<left>\w+<|>)/ //<--- regex that identifies 'price<' type of pattern caused by gte; and lte; signs
          const result = re.exec(k)
          if(result && req.query[k]){
            const left = k.slice(0,-1)
            const operator = k.charAt(k.length-1) + '='
            const right = req.query[k]
            queryBuilder.where(left, operator, right)
          } else {
            const re2 = /(?<left>\w+)(?<operator>>|<)(?<right>\d+)/ //<--- regex that matches gt; and lt; signs
            const result2 = re2.exec(k)
            if(result2){
              queryBuilder.where(result2.groups.left, result2.groups.operator, result2.groups.right)
            } else {   //<--- default when query param is used with '=', e.g. 'price=0'
              const val = req.query[k]
              queryBuilder.where(k, val);
            }
          }
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