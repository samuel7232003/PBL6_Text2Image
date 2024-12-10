from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

from objectDetection import objectDetection_run
import uploadCloudinary
# Khởi tạo Flask app
app =  Flask(__name__)

CORS(app)

IMAGE_PATH  = "output.jpg"


@app.route("/", methods = ['POST'])
def index():
    # Lấy dữ liệu JSON từ yêu cầu
    data = request.get_json()  # data là một từ điển chứa dữ liệu JSON
    if not data:
        return jsonify({"message": "No JSON data provided"}), 400

    # Lấy văn bản từ dữ liệu JSON
    text = data.get("text", "")
    print("Start detect....")
    im = objectDetection_run(text)
    print("Finish gen....")

    im.save(IMAGE_PATH)
    url_upload = uploadCloudinary.uploadImage(IMAGE_PATH)
    print(url_upload)

    return jsonify({'url': url_upload})

if __name__ =='__main__':
    app.run(debug=False, host='0.0.0.0', port=8888, use_reloader=False)


