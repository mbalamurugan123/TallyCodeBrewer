from flask import Flask, request, jsonify
import io
import traceback
import contextlib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/')
def index():
    return 'Flask backend is running'

@app.route('/run_code', methods=['POST'])
def run_code():
    data = request.json
    code = data.get('code', '')
    
    # Restrict the global and local scope
    safe_globals = {"__builtins__": {}}  # Restrict access to built-ins
    safe_locals = {}

    stdout = io.StringIO()
    stderr = io.StringIO()

    with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
        try:
            exec(code, safe_globals, safe_locals)
        except Exception as e:
            error_message = f"Error: {str(e)}\n"
            error_traceback = traceback.format_exc()
            stderr.write(error_message + error_traceback)

    output = stdout.getvalue()
    errors = stderr.getvalue()
    
    return jsonify({
        'output': output,
        'errors': errors
    })

if __name__ == '__main__':
    app.run(debug=True)
