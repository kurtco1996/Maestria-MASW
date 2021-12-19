db.tipo_equipamiento.aggregate([
    { "$match": { "$and":[{"MetaData.Codigo": "viviendasconalguntipodeordenador"},{"Data.NombrePeriodo": "2021" }]}},
    { "$addFields": {
        "order": {
            "$filter": {
              "input": "$Data",
              "as": "d",
              "cond": { "$eq": [ "$$d.NombrePeriodo", "2021" ] }
            }
        }
    }},
    { "$sort": { "order": -1 } },
    {$limit: 5}
])
