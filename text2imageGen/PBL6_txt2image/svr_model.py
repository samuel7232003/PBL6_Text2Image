from flask import Flask, request, render_template, jsonify
from text2img_model import create_pipeline, text2img
import uploadCloudinary

# Khởi tạo Flask app
app =  Flask(__name__)

IMAGE_PATH  = "out/output.jpg"

pipeline  = create_pipeline()

@app.route("/genImg", methods = ['POST'])
def index():
    # Lấy dữ liệu JSON từ yêu cầu
    data = request.get_json()  # data là một từ điển chứa dữ liệu JSON
    if not data:
        return jsonify({"message": "No JSON data provided"}), 400

    # Lấy văn bản từ dữ liệu JSON
    prompt = data.get("prompt", "")

    print("Start gen....")

    #gen img
    im = text2img(prompt=prompt, pipeline=pipeline)
    im.save(IMAGE_PATH)
    print("Finish gen....")

    url_upload = uploadCloudinary.uploadImage(IMAGE_PATH)
    print(url_upload)
    return jsonify({'url': url_upload})

if __name__ =='__main__':
    app.run(debug=False, host='0.0.0.0', port=8888, use_reloader=False)


