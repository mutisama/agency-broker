#from . import db

from .app import db


class AgencyDomainWhitelist(db.Model):
    # primary keys are required by SQLAlchemy
    tablename = "agency_domain_whitelist"

    id = db.Column(db.Integer, primary_key=True)
    domain = db.Column(db.String(100))


class Agency(db.Model):
    tablename = "agency"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(1000))
    domain = db.Column(db.String(1000))
    address = db.Column(db.String(100))


class Broker(db.Model):
    tablename = "broker"

    id = db.Column(db.Integer, primary_key=True)
    agencyId = db.Column(db.Integer, db.ForeignKey('agency.id'))
    firstname = db.Column(db.String(1000))
    lastname = db.Column(db.String(1000))
    email = db.Column(db.String(100), unique=True)
    address = db.Column(db.String(100))
