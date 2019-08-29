const {session} = require('./db')

const getNextBeers = query => {
  return session
    .run(
      `MATCH (b:Beer{name:$name})-[:BEER_CATEGORY|:BREWED_AT|:BEER_STYLE|:HAS_ABV]->(t)<-[:BEER_CATEGORY|:BREWED_AT|:BEER_STYLE|:HAS_ABV]-(other:Beer)-[:BREWED_AT]->(br:Brewery{state:$state})
      WITH b, br, other, count(t) AS intersection, collect(t.name) AS i
      MATCH (b)-[:BEER_CATEGORY|:BREWED_AT|:BEER_STYLE|:HAS_ABV]-(bt)
      WITH b, br, other, intersection,i, COLLECT(bt.name) AS s1
      MATCH (other)-[:BEER_CATEGORY|:BREWED_AT|:BEER_STYLE|:HAS_ABV]-(ot)
      WITH b,other, br, intersection,i, s1, COLLECT(ot.name) AS s2
      WITH b,other, br, intersection,s1,s2
      WITH b,other, br, intersection,s1+filter(x IN s2 WHERE NOT x IN s1) AS union, s1, s2
      RETURN b.name, other.name, br.name,((1.0*intersection)/SIZE(union)) AS jaccard ORDER BY jaccard DESC LIMIT 3`,
      {name: query.name, state: query.state}
    )
    .then(result => {
      session.close()
      return result.records.map(record => {
        let beer = record.get('other.name')
        let brewery = record.get('br.name')
        return {beer, brewery}
      })
    })
    .catch(error => {
      session.close()
      throw error
    })
}

module.exports = getNextBeers
