from flask import Flask, jsonify, request, make_response, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://pairtree:pairtree@localhost:5432/to_do_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    
    def serialize(self):
        return {
                'id': self.id,
                'email': self.email,
            }


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(240), nullable=True)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat(),
            'user_id': self.user_id,
        }

with app.app_context():
    db.create_all()
    user_query = User.query.filter_by(email='demo@pairtree.com').first()

    if user_query:
        user = user_query
    else:
        user = User(email='demo@pairtree.com', password='ReallyStrongPassword')
        db.session.add(user)
        db.session.commit()

    task_query = Task.query.filter_by(title='Hire Ryan plz').first()
    
    if not task_query:
        task = Task(title='Hire Ryan plz', description='He will work incredibly hard', user_id=user.id)
        db.session.add(task)
        db.session.commit()
        


@app.get('/<int:user_id>')
def user_tasks(user_id):
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([t.serialize() for t in tasks])

@app.get('/logout')
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'})

@app.post('/login')
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not password:
        return make_response(jsonify({'message': 'Invalid email or password'}), 401)

    if password != user.password:
        return make_response(jsonify({'message': 'Invalid email or password'}), 401)

    session['user_id'] = user.id

    return jsonify(user.serialize())

@app.get('/check_session')
def check_session():
  user_id = session.get('user_id')
  return jsonify({'user_id': user_id})

if __name__ == '__main__':
    app.run()
