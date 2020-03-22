
  
  const getTableData = (req, res, db) => {
    db.select('*').from('repair')
      .modify(function(queryBuilder){
        if (Object.keys(req.query).length > 0) {
          const keys = Object.keys(req.query)
          const k = keys[0]
          console.log(`|${k}|`)
          /*
          regex that identifies 'price<' or 'price>' type of pattern caused by '<=' or '>=' signs.
          '=' is being immediately used as equal sign of query parameter, leaving '<' and '>' 
          as part of whaterver is on the left of the operator. 
          To workaround it, I slice the last character of the "left" group (that would be '<' or '>'),
          add '=' to it (that's operator group), and relied on javascript to set "right" gropu to what 
          was on the right of '=' sign, which is req.query[k]
          */
          const re = /(?<left>\w+\s*<|>\s*)/ 
          const result = re.exec(k)
          if(result && req.query[k]){
            const left = k.slice(0,-1)
            const operator = k.charAt(k.length-1) + '='
            const right = req.query[k]
            queryBuilder.where(left, operator, right)
          } else {
            //regex that identifies 'date>2019-01-01' or 'date<2019-01-01' pattern
            const reDate = /(?<left>\w+\s*)(?<operator>>|<|\s*)(?<right>\s?\d{4}-\d{2}-\d{2})/
            const resultDate = reDate.exec(k)
            //regex that identifies 'price>0' or 'price<49.99' pattern
            //const reNumber = /(?<left>\w+\s*)(?<operator>>|<|\s*)(?<right>\s?\d+\.?\d{2}?)/
            const reNumber = /(?<left>\w+\s*)(?<operator>>|<|\s*)(?<right>\s?[0-9]*\.?[0-9]+$)/
            const resultNumber = reNumber.exec(k)
            //regex for contains operator, e.g. 'description contains saftey recall'
            const reText = /(?<left>\w+\s+)(?<operator>contains\s+)(?<right>.*)/ 
            const resultText = reText.exec(k)
            if (resultDate){
              left     = resultDate.groups.left
              operator = resultDate.groups.operator.trim()
              right    = resultDate.groups.right
              queryBuilder.where(left, operator, right)
            } else if(resultNumber){
              left     = resultNumber.groups.left
              operator = resultNumber.groups.operator.trim()
              right    = resultNumber.groups.right
              queryBuilder.where(left, operator, right)
            } else if(resultText){
              left     = resultText.groups.left
              operator = 'ilike'
              right    = `%${resultText.groups.right.trim()}%`
              queryBuilder.where(left, operator, right)
            }else {   //<--- default when query param is used with '=', e.g. 'price=0'
              const val = req.query[k]
              queryBuilder.where(k, val.trim());
            }
          }
        } 
      }).then(items => {
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