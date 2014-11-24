from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
@app.route('/index/')
def index():
	return render_template('index.html')

@app.route('/dressage/')
def dressage():
	return render_template('dressage.html')

@app.route('/engineer/')
def engineer():
	return render_template('engineer.html')

@app.route('/ceramics/')
def ceramics():
	return render_template('ceramics.html')


if __name__ == '__main__':
	app.run(debug=True)