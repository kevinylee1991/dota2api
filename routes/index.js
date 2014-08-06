var express = require('express');
var http = require('http');
var https = require('https');
var router = express.Router();
var util = require('util');
var circularJson = require('circular-json');
var request = require('request');
var apiKey = require('../config').key;

var heroData = [];
var heroNames = ['', 'Anti-Mage', 'Axe', 'Bane', 'Bloodseeker', 'Crystal Maiden', 'Drow Ranger', 'Earthshaker', 'Juggernaut', 'Mirana', 'Morphling', 'Shadow Fiend', 'Phantom Lancer', 'Puck', 'Pudge', 'Razor', 'Sand King', 'Storm Spirit', 'Sven', 'Tiny', 'Vengeful Spirit', 'Windranger', 'Zeus', 'Kunkka', '', 'Lina', 'Lion', 'Shadow Shaman', 'Slardar', 'Tidehunter', 'Witch Doctor', 'Lich', 'Riki', 'Enigma', 'Tinker', 'Sniper', 'Necrophos', 'Warlock', 'Beastmaster', 'Queen of Pain', 'Venomancer', 'Faceless Void', 'Wraith King', 'Death Prophet', 'Phantom Assassin', 'Pugna', 'Templar Assassin', 'Viper', 'Luna', 'Dragon Knight', 'Dazzle', 'Clockwerk', 'Leshrac', 'Furion', 'Lifestealer', 'Dark Seer', 'Clinkz', 'Omniknight', 'Enchantress', 'Huskar', 'Night Stalker', 'Broodmother', 'Bounty Hunter', 'Weaver', 'Jakiro', 'Batrider', 'Chen', 'Spectre', 'Ancient Apparition', 'Doom', 'Ursa', 'Spirit Breaker', 'Gyrocopter', 'Alchemist', 'Invoker', 'Silencer', 'Outworld Devourer', 'Lycan', 'Brewmaster', 'Shadow Demon', 'Lone Druid', 'Chaos Knight', 'Meepo', 'Treant Protector', 'Ogre Magi', 'Undying', 'Rubick', 'Disruptor', 'Nyx Assassin', 'Naga Siren', 'Keeper of the Light', 'Io', 'Visage', 'Slark', 'Medusa', 'Troll Warlord', 'Centaur Warrunner', 'Magnus', 'Timbersaw', 'Bristleback', 'Tusk', 'Skywrath Mage', 'Abaddon', 'Elder Titan', 'Legion Commander', '', 'Ember Spirit', 'Earth Spirit', '', 'Terrorblade', 'Phoenix'];

function convert_id(id) {
    console.log(id);
    console.log(id + 76561197960265728);
    var converted = '765' + (id + 61197960265728);
    console.log(converted);
    return converted;
}

//Get hero info one time
request("https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key="+apiKey, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('heroes', body);

        JSON.parse(body).result.heroes.forEach(function(hero) {
            heroData[hero.id] = hero;
        });
    } else {
        console.log('error', error);
    }
});

/* GET home page. */
router.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        tree: 'arbol',
        head: 'cabeza'
    });
});

router.get('/hero/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    res.send({
        heroData: heroData[parseInt(req.params.id)],
        heroName: heroNames[req.params.id]
    });
});

router.get('/match-history/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    request("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v001/?key="+apiKey+"&matches_requested=10&account_id="+req.params.id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            res.send(body);
        } else {
            res.send(error);
        }
    });
});

router.get('/match-details/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    request("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v001/?key="+apiKey+"&match_id="+req.params.id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            console.log(error);
        }
    });
});

router.get('/player-summary/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('id', req.params.id)

    request("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+apiKey+"&steamids="+convert_id(parseInt(req.params.id)), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            res.send(body);
        } else {
            res.send(error);
        }
    });
});

router.get('/match-history/test/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    request("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v001/?key="+apiKey+"&matches_requested=10&account_id="+req.params.id+"&start_at_match_id=811443475", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            res.send(body);
        } else {
            res.send(error);
        }
    });
});

module.exports = router;
