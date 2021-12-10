let mongoose = require('mongoose')
const CovidScheme = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    county:String,
    state:String,
    cases:Number,
    deaths:Number
})

module.exports = mongoose.model('covidmodel', CovidScheme, 'covid_cases')
