from math import cos, sqrt
from geopy.geocoders import Nominatim
from flask import Blueprint, render_template, redirect, url_for, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import Broker, AgencyDomainWhitelist, Agency
from .app import db
import sys
import json
auth = Blueprint('auth', __name__)
geolocator = Nominatim(user_agent="backend")
R = 6371000  # radius of the Earth in m


def get_location(address):
    location = geolocator.geocode(address)
    return location.longitude, location.latitude


def get_address(location):
    location = geolocator.reverse(location)
    return location.address


def get_distance(lon1, lat1, lon2, lat2):
    x = (lon2 - lon1) * cos(0.5*(lat2+lat1))
    y = (lat2 - lat1)
    return R * sqrt(x*x + y*y)


@auth.route('/signup', methods=['POST'])
def signup_post():
    firstName = request.json.get('firstname')
    lastName = request.json.get('lastname')
    email = request.json.get('email')
    brokerLocation = request.json.get('location')
    domain = email.split('@')[1]
    address = get_address(brokerLocation)

    # if this returns a user, then the email already exists in database
    user = Broker.query.filter_by(email=email).first()
    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        return ('Email address already exists')

    # if this returns null, then the email is not in the whitelist
    whitelist = AgencyDomainWhitelist.query.filter_by(
        domain=domain).all()

    if whitelist is None:
        return ('Email is not whitelisted')

    agents = Agency.query.filter_by(
        domain=domain).all()

    agencyId = None

    agentsLength = len(agents)

    if agentsLength > 1:
        nearestLocation = 0
        locationArray = []
        distanceArray = []

        for agent in agents:
            loc = get_location(agent.address)
            locationArray.append(loc)
        for location in locationArray:
            distance = get_distance(
                location[0], location[1], brokerLocation[0], brokerLocation[1])
            distanceArray.append(distance)
        nearestIndex = min(range(len(distanceArray)),
                           key=distanceArray.__getitem__)
        #agencyId = agents[0].as_dict().id
        selectedAgent = agents[nearestIndex].as_dict()
        agencyId = selectedAgent['id']
        print(agents[0].as_dict(), agencyId, file=sys.stdout)
    elif agentsLength == 1:
        selectedAgent = agents[0].as_dict()
        agencyId = selectedAgent['id']

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = Broker(firstname=firstName, lastname=lastName, agencyId=agencyId,
                      email=email, address=address)

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return ('User has signed up')
