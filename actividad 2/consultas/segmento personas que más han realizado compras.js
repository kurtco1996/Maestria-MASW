db.uso_tic_segmentos.aggregate([
    { "$match": { "$and":[
        {"MetaData.0.Codigo": "00"},
        {"MetaData.1.Codigo": "ambossexos"},
        {"MetaData.2.Codigo":{$ne: "total"}},
        {"MetaData.3.Codigo": "personasquehancompradoatravesdeinternetenlosultimos3meses" }]}},
    { "$addFields": {
        "segmento": {
            "$filter": {
              "input": "$MetaData",
              "as": "seg",
              "cond": { "$eq": [ "$$seg.Variable.Codigo", "caracteristicassocioeconomicas" ] }
            }
        }
    }},
    { "$sort": { "Data.Valor": -1 } },
    {$limit: 5}
])
