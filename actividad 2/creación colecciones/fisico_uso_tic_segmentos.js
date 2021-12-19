db.createCollection("uso_tic_segmentos",{
    validator: {
         $jsonSchema: {
                bsonType: "object",
                required: ["Nombre","MetaData","Data"]
             }
        }
    });