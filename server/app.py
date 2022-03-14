from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(26), unique=False)
    player_health_total = db.Column(db.Integer, unique=False)
    player_match_id = db.Column(db.Integer, unique=False)

    def __init__(self, player_name, player_health_total, player_match_id):
        self.player_name = player_name
        self.player_health_total = player_health_total
        self.player_match_id = player_match_id

class PlayerSchema(ma.Schema):
    class Meta:
        fields = ('id','player_name', 'player_health_total', "player_match_id")

player_schema = PlayerSchema()
players_schema = PlayerSchema(many=True)    


class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    match_format = db.Column(db.String(20), unique=False)
    match_start_health = db.Column(db.Integer, unique=False)

    def __init__(self, match_format, match_start_health):
        self.match_format = match_format
        self.match_start_health = match_start_health

class MatchSchema(ma.Schema):
    class Meta:
        fields = ('id', 'match_format', 'match_start_health')

match_schema = MatchSchema()


# CREATE
@app.route('/api/player', methods=["POST"])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def create_player():
    player_name = request.json['player_name']
    player_health_total = 0
    player_match_id = 0

    new_player = Player(player_name, player_health_total, player_match_id)

    db.session.add(new_player)
    db.session.commit()

    player = Player.query.get(new_player.id)

    return player_schema.jsonify(player)


@app.route('/api/match', methods=["POST"])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def create_match():
    match_format = request.json['match_format']
    match_start_health = request.json['match_start_health']

    new_match = Match(match_format, match_start_health)

    db.session.add(new_match)
    db.session.commit()

    match = Match.query.get(new_match.id)

    return match_schema.jsonify(match)

# READ
@app.route('/api/players/<match_id>', methods=['GET'])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def get_roster(match_id):
    roster = Player.query.filter(Player.player_match_id == match_id)
    result = players_schema.dump(roster)

    return jsonify(result)


@app.route('/api/matches/<match_id>', methods=['GET'])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def get_match(match_id):
    match = Match.query.get(match_id)
    
    return match_schema.jsonify(match)


# UPDATE
@app.route('/api/player-match/<player_id>', methods=["PUT"])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def set_player_match_id(player_id):
    player = Player.query.get(player_id)
    player_match_id = request.json['player_match_id']

    player.player_match_id = player_match_id

    db.session.commit()

    return player_schema.jsonify(player)


@app.route('/api/player-health/<player_id>', methods=["PUT"])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def set_player_health_total(player_id):
    player = Player.query.get(player_id)
    player_health_total = request.json['player_health_total']

    player.player_health_total = player_health_total

    db.session.commit()

    return player_schema.jsonify(player)


# DELETE
@app.route('/api/players/<match_id>', methods=["DELETE"])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def delete_players(match_id):
    players = Player.query.filter(Player.player_match_id == match_id)

    for player in players:
        db.session.delete(player)

    db.session.commit()

    return "Successfully deleted players"


@app.route('/api/matches/<match_id>', methods=["DELETE"])
@cross_origin(origin='*' , headers=['access-control-allow-origin','Content- Type'])
def delete_match(match_id):
    match = Match.query.get(match_id)
    db.session.delete(match)
    db.session.commit()

    return "Match successfully deleted"


if __name__ == '__main__':
    app.run(debug=True)