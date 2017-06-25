from flask import Flask, request, redirect
import time
import twilio.twiml
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client

app = Flask(__name__)

lat = 0
lon = 0
user = 'Your car'
client = Client("AC4e7890114509da5929a4bc79ebf8bdc0",
		"47ee8d75ad0e2973601122c2a65d7b7c")

@app.route("/", methods=['GET', 'POST'])
def hello_monkey():
	global lat
	global lon
	global user
	global client
	resp = MessagingResponse()
	if request.values.get('From', None) == None:
		lat = request.values.get('lat', 0)
		lon = request.values.get('lon', 0)
		user = request.values.get('user', 'Your car')
	elif (request.values.get('From', None) != "GM Car" or
		request.values.get('speed', None) == None):
		resp.message('' + user + ' is located here:' +
			' https://www.google.ca/maps/@' +
			str(lat) + "," + str(lon) + ',15z')
	else:
		client.messages.create(to = '+16475153544',
			from_= '+16473609652',
			body=('' + str(request.values.get('user', None)) +
			' is driving at ' +
			str(request.values.get('speed', None)) + ' km/h.'))
		return None
	return str(resp)

if __name__ == '__main__':
	app.run(debug=True)
