import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pickle
from flask import Flask, request, jsonify
import re

app = Flask(__name__)

# Load models and tokenizer
forward_model = tf.keras.models.load_model('forward_model.h5')
backward_model = tf.keras.models.load_model('backward_model.h5')
with open('tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

# Load X shape for padding
# We'll infer max_seq_len from the model input shape
max_seq_len = forward_model.input_shape[1]

# Helper to map index to word
index_word = {v: k for k, v in tokenizer.word_index.items()}

def clean_urdu_line(text):
    if not isinstance(text, str):
        return ""
    text = text.replace("‌", "")  # Remove invisible Unicode character (ZWNJ etc.)
    text = re.sub(r'[،۔؟!\"""؛\.-]', '', text)  # Remove Urdu-specific punctuation
    text = re.sub(r'[^\u0600-\u06FF\s]', '', text)  # Keep only Urdu characters and spaces
    return text.strip()

def generate_shayari(center_word, num_words=5):
    print("Received word:", center_word)
    center_word_clean = clean_urdu_line(center_word)
    print("Cleaned word:", center_word_clean)
    print("First 20 vocab words:", list(tokenizer.word_index.keys())[:20])
    if center_word_clean not in tokenizer.word_index:
        print(f"'{center_word_clean}' not in vocab!")
        return f"'{center_word}' لفظ ماڈل کی لغت میں نہیں ہے۔"

    def generate_forward_sequence(seed_text, num_words):
        generated = seed_text
        for _ in range(num_words):
            token_list = tokenizer.texts_to_sequences([generated])[0]
            token_list = pad_sequences([token_list], maxlen=max_seq_len, padding='pre')
            prediction = forward_model.predict(token_list, verbose=0)
            predicted_index = np.argmax(prediction)
            next_word = index_word.get(predicted_index, '')
            if not next_word:
                break
            generated += ' ' + next_word
        return generated.split()

    def generate_backward_sequence(seed_text, num_words):
        generated = seed_text
        for _ in range(num_words):
            token_list = tokenizer.texts_to_sequences([generated])[0][::-1]
            token_list = pad_sequences([token_list], maxlen=max_seq_len, padding='pre')
            prediction = backward_model.predict(token_list, verbose=0)
            predicted_index = np.argmax(prediction)
            next_word = index_word.get(predicted_index, '')
            if not next_word:
                break
            generated = next_word + ' ' + generated
        return generated.split()

    forward_words = generate_forward_sequence(center_word_clean, num_words)
    backward_words = generate_backward_sequence(center_word_clean, num_words)
    backward_words = backward_words[:-1]
    backward_words.reverse()
    final_poem = ' '.join(backward_words + [center_word_clean] + forward_words[1:])
    print("Generated poem:", final_poem)
    return final_poem

@app.route('/generate-shayari', methods=['POST'])
def generate():
    data = request.json
    word = data.get('word')
    if not word:
        return jsonify({'error': 'No word provided'}), 400
    shayari = generate_shayari(word)
    return jsonify({'shayari': shayari})

if __name__ == '__main__':
    app.run(port=5001) 