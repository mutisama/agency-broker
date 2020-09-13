from flask import Blueprint, render_template, redirect, url_for, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import Broker
from .app import db

auth = Blueprint('auth', __name__)


@auth.route('/signup', methods=['POST'])
def signup_post():
    firstName = request.json.get('firstName')
    lastName = request.json.get('lastName')
    email = request.json.get('email')
    address = request.json.get('address')

    # if this returns a user, then the email already exists in database
    user = Broker.query.filter_by(email=email).first()

    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        return ('Email address already exists')

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = Broker(firstname=firstName, lastname=lastName,
                      email=email, address=address)

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return ('User has signed up')
