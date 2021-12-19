db.createCollection("tipo_equipamiento",{
    validator: {
         $jsonSchema: {
                bsonType: "object",
                required: ["Nombre","MetaData","Data"]
             }
        }
    });