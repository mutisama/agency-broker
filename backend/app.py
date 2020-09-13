
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///broker.sqlite3'
app.config['SECRET_KEY'] = "random string"
db = SQLAlchemy(app)
# blueprint for auth routes in our app


with app.app_context():
    from .auth import auth as auth_blueprint
    from .list import list as list_blueprint
    from .models import Broker, Agency, AgencyDomainWhitelist
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(list_blueprint)

    db.create_all(app=app)
    db.session.commit()


if __name__ == '__main__':
    app.run()
