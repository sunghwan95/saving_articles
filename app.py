import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.mydata


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/post", methods=["POST"])
def post_article():
    receive_url = request.form["give_url"]
    receive_comment = request.form["give_comment"]

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    article_url = requests.get(receive_url, headers=headers)
    soup = BeautifulSoup(article_url.text, "html.parser")

    og_title = soup.select_one("meta[property='og:title']")["content"]
    og_image = soup.select_one("meta[property='og:image']")["content"]
    og_url = soup.select_one("meta[property='og:url']")["content"]
    og_desc = soup.select_one("meta[property='og:description']")["content"]

    doc = {
        "title": og_title,
        "image": og_image,
        "url": og_url,
        "desc": og_desc,
        "comment": receive_comment
    }

    db.articles.insert_one(doc)

    return jsonify({"result": "success"})


@app.route("/read", methods=["GET"])
def show_articles():
    data = list(db.articles.find({}, {"_id": False}))
    return jsonify({"result": "success", "info": data})


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
