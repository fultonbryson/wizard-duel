from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

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
        fields = ('player_name', 'player_health_total', "player_match_id")

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
        fields = ('match_format', 'match_start_health')

match_schema = MatchSchema()

# CREATE
@app.route('/api/player', methods=["POST"])
def create_player():
    player_name = request.json['player_name']
    player_health_total = 0
    player_match_id = 0

    new_player = Player(player_name, player_health_total, player_match_id)

    db.session.add(new_player)
    db.session.commit()

    player = Player.query.get(new_player.id)

    return player_schema.jsonify(player)

# READ
# UPDATE
# DELETE

if __name__ == '__main__':
    app.run(debug=True)