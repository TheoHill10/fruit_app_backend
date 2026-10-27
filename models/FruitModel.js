const fruits = require('../fruits.json')

//OOP - object-oriented programming
class Fruit { //like a blueprint for making objects, when using it many times
    constructor(fruit){ //constructing the blueprint
        this.genus = fruit.genus;
        this.name = fruit.name;
        this.id = fruit.id;
        this.family = fruit.family;
        this.order = fruit.order;
        this.nutritions = fruit.nutritions;
    } //this is everything our API has

    static showAll() {
        return fruits.map(q => new Fruit(q))
    }

    static show(name){
        const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name)
        if (fruit){
            return new Fruit(fruit)
        } else {
            throw 'This fruit does not exist'
        }
    }
    
    static create(data){
        const newFruit = data
        if (!data.name){
            throw 'A fruit needs a name'
        }
        const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == data.name.toLowerCase())
        if (fruit){
            throw 'The fruit already exists'
        } else{
            newFruit['id'] = Math.max(...fruits.map(fruit => fruit.id)) + 1
            fruits.push(newFruit)
            return new Fruit(newFruit)
        }
    }
// these are all static because they are dealing with all the fruits
    update(data){
        const updateFruit = fruits.find(fruit => fruit.name.toLowerCase() == this.name.toLowerCase())
        if (updateFruit){
            if (data.name) updateFruit.name = data.name
            if (data.family) updateFruit.family = data.family
            if (data.id) updateFruit.id = data.id

            return new Fruit(updateFruit)
        } else {
            throw 'Fruit not found'
        }
    }

    destroy(){
        const deletedFruit = fruits.find(fruit => fruit.name.toLowerCase() == this.name.toLowerCase())
        if (deletedFruit){
            const index = fruits.indexOf(deletedFruit)
            fruits.splice(index, 1)
        } else {
            throw 'Fruit not found'
        }
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


