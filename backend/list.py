from .models import Broker, AgencyDomainWhitelist, Agency
from flask import Blueprint
from .app import db
import sys
import json
from flask import jsonify
from sqlalchemy import text
list = Blueprint('list', __name__)


@list.route('/list', methods=['GET'])
def list_get():
    sql = text(
        'SELECT broker.firstname,broker.lastname,broker.address,broker.email,agency.domain,agency.title FROM broker INNER JOIN agency ON broker.agencyId=agency.id')
    result = db.engine.execute(sql)

    dict, array = {}, []
    for rowproxy in result:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            dict = {**dict, **{column: value}}
        array.append(dict)

    return jsonify(array)
