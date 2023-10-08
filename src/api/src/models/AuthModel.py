from database.db import get_connection
from .entities.User import UserResponse
from flask import jsonify

class AuthModel():

  @classmethod
  def verify_user(self, data):
    try:

      connection=get_connection()
      userData = None
      
      with connection.cursor() as cursor:
        cursor.execute("""SELECT rol FROM users WHERE name = %s AND password = %s""",(data.user, data.password))
        row=cursor.fetchone()

        
        if row is not None:
          userData=UserResponse(row[0])
          
      connection.close()

      if userData is not None:
        return  userData.to_JSON()  # Si UserResponse tiene un método to_JSON
        
      else:
        return {
          'rol': 'Usuario no encontrado'  # Otra información adecuada aquí
        }, 404  # Cambié el código de estado a 404 para indicar que el usuario no se encontró
    
    except Exception as ex:
      return jsonify({'error': str(ex)}), 500
