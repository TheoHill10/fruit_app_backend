const db = require('../database/db')

//OOP - object-oriented programming
class Fruit { //like a blueprint for making objects, when using it many times
    constructor(fruit){ //constructing the blueprint
        this.id = fruit.id;
        this.name = fruit.fruit_name;
        this.genus = fruit.genus;
        this.family = fruit.family;
        this.order = fruit.fruit_nameorder;
        this.nutritions = fruit.nutritions;
    } //this is everything our API has

    static async showAll() {
        const response = await db.query('SELECT * FROM fruits; ORDER BY fruit_name')
        return response.rows.map(fruit => new Fruit(fruit))
    }

    static async show(name){
        const response = await db.query('SELECT * FROM fruits WHERE LOWER(fruit_name) = $1;', [name]) 
        //const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name) same as above line but the above line is in SQL
        if (response.rows.length != 1){
            throw 'This fruit does not exist'
        } else {
            return new Fruit(response.rows[0])
        }
    }
    
    static async create(data){
        if (!data.name){
            throw 'A fruit needs a name'
        }
        const exisitng = await db.query('SELECT * FROM fruits WHERE LOWER(fruits_name = $1;', [data.name.toLowerCase()])
        if (exisitng.rows.length > 0){
            throw 'The fruit already exists'
        }
        const response = await db.query('INSERT INTO fruits (fruit_name, genus, family, fruit_order, nutritions) VALUE ($1, $2, $3, $4, $5) RETURNING *;', [data.name, data.genus, data.family, data.order, data.nutritions])
        return new Fruit(response.rows[0])
    }
// these are all static because they are dealing with all the fruits
    async update(data){
        const name = data.name || this.name 
        const family = data.family || this.family
        const response = await db.query('UPDATE fruits SET fruit_name = $1, family = $2 WHERE id = $3 RETURNING *;', [name, family, this.id])

        return new Fruit(response.rows[0])
        //const updateFruit = fruits.find(fruit => fruit.name.toLowerCase() == this.name.toLowerCase())
        //if (updateFruit){
        //    if (data.name) updateFruit.name = data.name
        //    if (data.family) updateFruit.family = data.family

        //    return new Fruit(updateFruit)
        //} else {
        //    throw 'Fruit not found'
        //}
    }

    async destroy(){
        await db.query('DELETE FROM fruits WHERE id = $1;', [this.id]) //$1 is a placeholder for [this.id]

        //const deletedFruit = fruits.find(fruit => fruit.name.toLowerCase() == this.name.toLowerCase())
        //if (deletedFruit){
        //    const index = fruits.indexOf(deletedFruit)
        //    fruits.splice(index, 1)
        //} else {
        //    throw 'Fruit not found'
        //}
    }
}

module.exports = Fruit





//const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name) // changing the names in the json to lowercase
//    if (fruit == undefined) {
//        res.status(404).send('The fruit does not exisit')
//    } else {
//        res.status(200).send(fruit)
//    }
//    // res.send(req.params.name) //route parameters identify which response you want and are required. Grabs information from the route (so name or id of what the person has entered)
//    //.name just sends the name and not it as an object
//}


