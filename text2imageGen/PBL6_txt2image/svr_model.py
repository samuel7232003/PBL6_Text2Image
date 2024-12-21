import re

from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from text2img_model import create_pipeline, text2img
import uploadCloudinary

import sys
from googletrans import Translator # type: ignore
from rake_nltk import Rake  # type: ignore

# Khởi tạo Flask app
app =  Flask(__name__)

CORS(app)

IMAGE_PATH  = "out/output.jpg"

pipeline  = create_pipeline()

r = Rake()

def translate_text(text, src_lang='en', dest_lang='vi'):
    translator = Translator()
    translation = translator.translate(text, src=src_lang, dest=dest_lang)
    return translation.text

@app.route("/genImg", methods = ['POST'])
def index():
    # Lấy dữ liệu JSON từ yêu cầu
    data = request.get_json()  # data là một từ điển chứa dữ liệu JSON
    if not data:
        return jsonify({"message": "No JSON data provided"}), 400

    # Lấy văn bản từ dữ liệu JSON
    prompt = data.get("prompt", "")

    # Tách các đoạn bắt đầu bằng < và kết thúc bằng >
    tags = re.findall(r'<.*?>', prompt)

    # Loại bỏ các đoạn đã tách ra khỏi chuỗi gốc
    text_without_tags = re.sub(r'<.*?>', '', prompt)

    # Loại bỏ các khoảng trắng dư thừa, chỉ giữ lại phần văn bản
    text_without_tags = ' '.join(text_without_tags.split())

    translated_text = translate_text(text_without_tags, src_lang='vi', dest_lang='en')

    # Đảm bảo đầu ra được in với UTF-8
    sys.stdout.reconfigure(encoding='utf-8')

    print(f'Bản dịch: {translated_text}')

    r.extract_keywords_from_text(translated_text)
    keywords = r.get_ranked_phrases()

    prompt2 = ', '.join(keywords)
    prompt2 = prompt2 + ", " + ", ".join(tags)
    print("Key words: ", prompt2)

    print("Start gen....")

    #gen img
    im = text2img(prompt=prompt2, pipeline=pipeline)
    im.save(IMAGE_PATH)
    print("Finish gen....")

    url_upload = uploadCloudinary.uploadImage(IMAGE_PATH)
    print(url_upload)
    return jsonify({'url': url_upload})

if __name__ =='__main__':
    app.run(debug=False, host='0.0.0.0', port=8888, use_reloader=False)


