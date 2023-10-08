from flask import  Blueprint, request, jsonify
#Utils
from utils.function_jwt import write_token,validate_token
#Entities
from models.entities.User import UserResive
#Models
from models.AuthModel import AuthModel


main = Blueprint('routes_auth', __name__)

@main.route('/logintest', methods=["POST"])
def logintest():
  try:
    data = request.get_json()
    if data['user']== "fidelsalazar990923@gmail.com" and data['password']=="1234":
        token =  write_token(data=request.get_json())
        print('token', token)
        token_str = token.decode("utf-8")        
        return jsonify({
            'status':'ok',
            'rol': 'admin',
            'token':token_str
        })
    if data['user']=="danicgd@gmail.com" and data['password']=="1234":
        return jsonify({
            'status':'ok',
            'rol': 'user'
        })
    else:
        response = jsonify({
            "message":"User not found"
        })
        response.status_code = 404
        return response
  except Exception as ex:
    return jsonify({'message': str(ex) }),500

@main.route('/login', methods=["POST"])
def login():
  try:

    dataRequest = request.get_json()
    print(dataRequest)

    name = dataRequest['user']
    password = dataRequest['password']

    data = UserResive(name, password)
    
    affected_rol = AuthModel.verify_user(data)
    print(affected_rol)

    affected_token = write_token(data=request.get_json())
    print('token', affected_token)

    if affected_rol != None:
      return jsonify({
        'status':'ok',
        'data': {
          'rol' : affected_rol['rol'],
          'token' : affected_token
        }
      })
    else:
      return jsonify({'status': 'error'}), 401

  except Exception as ex:
      raise Exception(ex)

@main.route('/verify/token')
def verify():
  print(request.headers['Authorization'])
  token = request.headers['Authorization'].split(" ")[1]
  validate = validate_token(token, output=True)
  print(validate)
  return jsonify(validate), 200
    

