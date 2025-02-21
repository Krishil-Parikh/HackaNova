import openai
import cv2
import mediapipe as mp
from flask import Flask, request, jsonify

app = Flask(__name__)

openai.api_key = ""

# Streak & Score Tracking
user_data = {
    "score": 0,
    "current_streak": 0,
    "highest_streak": 0
}

# MediaPipe Hand Tracking
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# Function to Generate ISL Quiz
def generate_isl_quiz():
    prompt = """
    Generate a multiple-choice ISL quiz with one question about signs and one question that requires a gesture.
    Format:
    Question 1: <question_text>
    A) <option_1>
    B) <option_2>
    C) <option_3>
    D) <option_4>
    Correct Answer: <correct_option>
    
    Gesture Task: "Show the ISL sign for 'Hello'"
    Required Gesture: "Raise your hand with an open palm"
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    
    quiz_text = response["choices"][0]["message"]["content"]
    return quiz_text

# Function to Process Hand Gesture (Example: Detect Raised Hand for "Hello")
def detect_gesture(frame):
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Example: Check if hand is raised (landmark positions)
            wrist = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST]
            middle_finger_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]

            if middle_finger_tip.y < wrist.y:  # If the middle finger tip is above the wrist
                return True  # Gesture Detected

    return False  # No Gesture Detected

# API Endpoint: Get Quiz
@app.route('/get_quiz', methods=['GET'])
def get_quiz():
    quiz = generate_isl_quiz()
    return jsonify({"quiz": quiz, "score": user_data["score"], "highest_streak": user_data["highest_streak"]})

# API Endpoint: Submit Answer
@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    data = request.json
    user_answer = data.get("answer")
    correct_answer = data.get("correct_answer")

    if user_answer == correct_answer:
        user_data["score"] += 10
        user_data["current_streak"] += 1
        user_data["highest_streak"] = max(user_data["highest_streak"], user_data["current_streak"])
    else:
        user_data["current_streak"] = 0  # Reset Streak

    return jsonify({"score": user_data["score"], "current_streak": user_data["current_streak"], "highest_streak": user_data["highest_streak"]})

# API Endpoint: Check Gesture via Webcam
@app.route('/check_gesture', methods=['GET'])
def check_gesture():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        if detect_gesture(frame):
            cap.release()
            return jsonify({"gesture_detected": True})
        
        cv2.imshow("Gesture Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    return jsonify({"gesture_detected": False})

@app.route('/')
def home():
    return "Welcome to the ISL Quiz API! Available routes: /get_quiz, /submit_answer, /check_gesture"


if __name__ == '__main__':
    app.run(debug=True)